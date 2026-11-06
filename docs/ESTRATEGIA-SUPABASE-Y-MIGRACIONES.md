# Fixora Balance — Estrategia Supabase, base de datos y migraciones

**Versión:** 1.0  
**Fecha:** 6 de noviembre de 2026  
**Estado:** proyecto Supabase Free creado y auditado; una migración de hardening aplicada. El esquema de negocio sigue vacío.

## 1. Decisión de arquitectura

Fixora Balance utilizará **Supabase como backend administrado y PostgreSQL como base de datos central**, acompañado de almacenamiento local SQLite en cada dispositivo.

Supabase no sustituye la arquitectura de la aplicación. Aporta PostgreSQL, Auth, APIs, RLS, Storage, Realtime y Edge Functions. La lógica de negocio seguirá separada en módulos de dominio y casos de uso.

### Componentes

| Componente | Responsabilidad | Qué no debe hacer |
|---|---|---|
| PostgreSQL (Supabase) | Datos de cuenta, preferencias sincronizadas, objetivos/hábitos sincronizados, catálogo, transacciones, derechos, dispositivos y auditoría | Guardar cada evento de interfaz o telemetría innecesaria |
| Supabase Auth | Identidad, credenciales, sesiones, recuperación y proveedores de autenticación | Ser nuestra tabla de perfiles/roles de negocio |
| RLS | Autorizar acceso a filas por usuario/beneficiario | Sustituir reglas de negocio o validar compras |
| Edge Functions | Webhooks, operaciones privilegiadas, conciliación y comandos que no deben confiar en el cliente | Convertirse en un monolito con toda la lógica |
| Supabase Storage | Archivos necesarios con políticas privadas por defecto | Guardar datos de actividad que deben ser locales |
| SQLite local | Operación offline, sesiones recientes, hábitos y cola de sincronización | Ser autoridad de suscripciones o derechos Premium |
| Keychain/Keystore | Tokens y secretos locales de sesión mediante almacenamiento seguro | Guardar secretos de servidor o service_role |

Supabase Auth usa PostgreSQL internamente y entrega JWT que pueden trabajar junto con RLS. La autenticación y la autorización siguen siendo responsabilidades distintas.

## 2. Qué datos van en cada lugar

### Supabase / PostgreSQL

**Identidad y cuenta**
- profiles: perfil de producto vinculado a auth.users.
- user_preferences: idioma, zona horaria, preferencias y configuración de privacidad.

**Bienestar**
- focus_goals: objetivos sincronizados.
- focus_sessions: sesiones que el usuario decida sincronizar.
- habits: hábitos.
- habit_events: cumplimiento y cambios de hábitos.
- progress_events: eventos válidos que generan progreso.
- reward_balances: proyección recalculable del progreso.

**Comercial y acceso**
- catalog_products, catalog_prices, product_entitlements.
- billing_customers, billing_events, purchase_transactions, subscriptions.
- entitlement_grants, entitlement_ledger, trial_eligibility.
- devices y futuras asignaciones familiares.

**Operación y seguridad**
- audit_events: cambios administrativos y operaciones sensibles.
- Registros técnicos mínimos, sin secretos ni contenido privado.

### SQLite en el dispositivo

- Sesiones en curso y recientes.
- Objetivos/hábitos necesarios para funcionar sin conexión.
- Cola de sincronización con identificadores idempotentes.
- Preferencias no sensibles y caché de lectura.
- Datos de uso del dispositivo que no necesitan salir del teléfono.

La sincronización enviará solo los datos que aporten valor real. El usuario deberá poder entender y controlar qué se sincroniza.

### No recopilar

No almacenar mensajes, pulsaciones de teclado, fotos privadas, contenido de pantalla ni historial completo de navegación. Las métricas de uso de apps, si se aprueban en una fase posterior, deberán minimizarse y justificarse por función y política de plataforma.

## 3. Entornos y aislamiento

**Entorno 1 — Local**
- Supabase CLI + Docker.
- Base local reconstruible desde cero.
- Datos sintéticos exclusivamente.
- Lugar principal para crear, probar y depurar migraciones.

**Entorno 2 — Desarrollo remoto**
- Proyecto Supabase dedicado exclusivamente a Fixora Balance.
- Datos ficticios; nunca usuarios reales.
- Integraciones de desarrollo y pruebas de Auth/Edge Functions.
- No reutilizar proyectos de EYESITE ni el proyecto reservado a otro producto Fixora.

**Entorno 3 — Producción**
- Proyecto separado, credenciales y accesos restringidos.
- No se crea hasta tener MVP probado, política de privacidad, backup/restore y plan de operación.
- Migraciones aplicadas mediante despliegue aprobado, nunca desde el equipo de desarrollo de forma improvisada.

**Staging:** se añadirá como proyecto separado cuando haya necesidad real de probar un candidato de release con datos sintéticos y configuración casi idéntica a producción. No crear ramas remotas de Supabase sin revisar coste y aislamiento; las ramas pueden tener cómputo y facturación propios.

En la consulta actual de la organización solo aparecen proyectos existentes de EYESITE; no aparece un proyecto llamado Fixora Balance. No se ha inspeccionado ni modificado el esquema de esos proyectos.

## 4. Regla estricta de migraciones

**Toda modificación del esquema, permisos SQL, RLS, funciones, triggers, vistas, índices, constraints, extensiones, buckets/policies gestionadas por SQL y catálogo estático versionado deberá tener su migración correspondiente antes de aplicarse a un entorno compartido.**

No se harán cambios estructurales manuales desde el Dashboard/SQL Editor en remoto. El Dashboard se puede usar para lectura, observabilidad y configuración operativa controlada, pero no para introducir cambios de esquema fuera de Git.

### Flujo obligatorio

1. Crear archivo con Supabase CLI: supabase migration new nombre_descriptivo.
2. Editar el SQL de la migración y revisar el diff.
3. Incluir pruebas pgTAP/RLS para el cambio.
4. Aplicar localmente con supabase db reset o el flujo local equivalente.
5. Ejecutar supabase test db.
6. Revisar supabase db lint/advisors y rendimiento cuando aplique.
7. Verificar que una base limpia se reconstruye desde todas las migraciones.
8. Commit de migración + pruebas + tipos/documentación afectados.
9. En PR, revisar SQL, grants, RLS, locks, datos afectados y reversibilidad.
10. En desarrollo remoto: supabase db push --dry-run y revisar salida; después aplicar explícitamente.
11. Antes de producción: backup/restore comprobado, aprobación manual, ventana de despliegue y plan de recuperación.
12. Verificar supabase migration list y pruebas de humo después de aplicar.

No usar db reset --linked en producción. No usar --include-seed en producción. Los comandos remotos deben identificar explícitamente el proyecto destino y su ref; jamás confiar solo en el proyecto enlazado por defecto.

### Convención de nombres

YYYYMMDDHHMMSS_descripcion_en_snake_case.sql

El timestamp debe generarlo supabase migration new; no inventar manualmente timestamps. Una migración aplicada no se edita para corregirla: crear una nueva migración correctiva. No reescribir historia compartida.

### Regla adicional del proyecto

Para Fixora Balance se adopta el enfoque **imperativo, migration-first**: escribir cada cambio directamente en el archivo SQL creado por CLI. No combinar simultáneamente supabase/schemas/ declarativos con migraciones imperativas, para evitar dos fuentes de verdad.

## 5. Qué significa “cada movimiento queda registrado”

Hay que separar dos clases de cambios:

**A. Cambios de estructura/configuración**
- Crear o alterar tablas/columnas.
- Crear índices, funciones, triggers, policies, permisos y vistas.
- Modificar catálogo base, permisos o configuración declarativa SQL.

Estos sí se registran en archivos de migración versionados.

**B. Operaciones normales de usuarios**
- Crear una sesión de enfoque.
- Marcar un hábito como completado.
- Cambiar preferencias.
- Renovar una suscripción o recibir un webhook.
- Conceder/revocar un entitlement a una cuenta.

Estas son escrituras de datos en tiempo de ejecución y no deben generar una migración por cada usuario o evento. Se registrarán en las tablas operativas correspondientes, con claves idempotentes, timestamps y auditoría para operaciones sensibles. Las compras y los derechos tendrán un ledger append-only. Las migraciones describen cómo cambia la estructura; los registros de negocio describen qué ocurrió en la aplicación.

## 6. Seguridad obligatoria de PostgreSQL/Supabase

- RLS activado en cada tabla de un esquema expuesto.
- Políticas específicas por operación y beneficiario; no basta TO authenticated.
- USING y WITH CHECK en UPDATE cuando corresponda para impedir reasignación de propietario.
- No usar user_metadata editable para roles/autorización.
- No exponer service_role ni claves secretas en cliente.
- Preferir SECURITY INVOKER; cualquier SECURITY DEFINER debe estar justificada, aislada en esquema no expuesto, con search_path fijo, grants mínimos y revisión.
- Vistas revisadas por bypass de RLS; usar security_invoker cuando corresponda.
- RPC y funciones con permisos mínimos y validación server-side.
- Webhooks verificados, idempotentes y tolerantes a eventos fuera de orden.
- Rate limits y validación de inputs en endpoints sensibles.
- Pruebas de usuario A contra datos de usuario B, escalada de rol, IDOR, replay y cambios de propietario.
- Generar tipos TypeScript desde el esquema local después de cambios.

## 7. Estrategia de pruebas y recuperación

- pgTAP para constraints, triggers y RLS.
- Pruebas de integración con cliente Supabase usando usuarios distintos.
- Reconstrucción completa local desde cero en CI.
- Datos seed sintéticos y deterministas; nunca copiar datos de producción.
- Verificar backup y restauración antes de producción.
- En plan gratuito, exportaciones lógicas periódicas fuera de Supabase y prueba de restauración. En planes con backups automáticos/PITR, revisar retención y coste real del plan.
- No considerar un backup válido hasta demostrar que se puede restaurar.

## 8. Orden de las primeras migraciones (propuesta)

Las migraciones no se crean todavía. Orden propuesto, sujeto a revisión de esquema:

1. profiles y user_preferences, con RLS y pruebas.
2. focus_goals y focus_sessions.
3. habits y habit_events.
4. progress_events y proyección de progreso.
5. Catálogo mínimo Free/Plus y entitlements.
6. Ledger de compras/derechos y elegibilidad de trial, cuando proveedor/canal estén elegidos.
7. Dispositivos y límites Plus, cuando su semántica esté aprobada.

No crear ahora tablas de Family, DNS/VPN o bloqueo de aplicaciones: se diseñarán cuando las capacidades y consentimientos correspondientes estén validados.

## 9. Herramientas y comandos previstos

- Supabase CLI, versión fijada y documentada.
- Docker para el stack local.
- Supabase Studio local para inspección, no para cambios manuales sin migración.
- GitHub para versionar migraciones, pruebas, configuración y tipos.
- CI ejecutará reconstrucción limpia, pruebas SQL y análisis estático; no tendrá acceso de escritura a producción.
- El despliegue remoto requerirá un environment protegido y aprobación manual.

Los comandos definitivos se verificarán con supabase --help y la versión instalada antes de automatizarlos.

## 10. Situación real a 6 de noviembre de 2026

- Organización: `Fixora-Balance`, ID `fnufjydflegirzatihec`, plan Free.
- Proyecto: `emacfszktufyqtfgzunl`, región `us-east-1`, PostgreSQL 17.11, estado `ACTIVE_HEALTHY`.
- Esquema public: cero tablas, cero vistas, cero políticas y una función de evento DDL.
- Auth users: cero. Storage buckets: cero. Edge Functions: cero.
- Historial remoto: una migración, versión `20261106221629`, nombre `20261106221623_harden_rls_event_trigger_permissions`.
- Archivo de GitHub alineado por versión: `supabase/migrations/20261106221629_harden_rls_event_trigger_permissions.sql`.
- La migración revoca EXECUTE de PUBLIC, anon y authenticated sobre `public.rls_auto_enable()`; se verificó que `ensure_rls` sigue registrado y que los permisos anon/authenticated son false.
- Security, Performance y Health Advisors: cero hallazgos después de la migración.
- Se inició scaffold Expo SDK 58 y primera vertical slice; ver [IMPLEMENTACION-ETAPA-1.md](IMPLEMENTACION-ETAPA-1.md).

**Limitación operativa:** la primera migración se versionó desde la integración GitHub/Supabase porque no había un workspace local con CLI disponible. Se ajustó el nombre de archivo a la versión que devolvió el historial remoto. Las siguientes migraciones deberán generarse desde Supabase CLI local, reconstruirse en Docker, probarse con pgTAP y revisarse antes de aplicarse a remoto. No ejecutar `db push` hasta que el baseline y el historial hayan sido reconciliados por CLI.

**No hacer todavía:** crear perfiles/usuarios sin trigger revisado; añadir catálogo de pagos; crear Family/Protection; activar funciones Edge sin caso de uso y threat model; tocar proyectos EYESITE.

## 11. Fuentes oficiales consultadas

- Local development workflow: https://supabase.com/docs/guides/local-development/cli-workflows
- Local database migrations: https://supabase.com/docs/guides/local-development/database-migrations
- Database testing / pgTAP: https://supabase.com/docs/guides/database/testing
- Supabase Auth architecture: https://supabase.com/docs/guides/auth/architecture
- Supabase architecture: https://supabase.com/docs/guides/getting-started/architecture
- Running commands against local and hosted projects: https://supabase.com/docs/guides/local-development/local-and-hosted-projects
- Production maturity model: https://supabase.com/docs/guides/deployment/maturity-model
- Database backups: https://supabase.com/docs/guides/platform/backups
- Supabase security product guide: https://supabase.com/docs/guides/security/product-security


## 12. Reproducibilidad local y fixture de plataforma

El proyecto ahora incluye `supabase/config.toml` generado con Supabase CLI 3.0.0 y `db.major_version = 17`. El proyecto hosted tiene una función de evento DDL `public.rls_auto_enable()` y el event trigger `ensure_rls`, pero el contenedor local estándar no los instala automáticamente. La migración remota de hardening ya está aplicada y no debe editarse.

Para probar la migración localmente, CI desactiva temporalmente la aplicación automática de migraciones al iniciar el stack, crea el helper hosted mediante dos fixtures SQL separados (una sentencia por llamada a `supabase db query --file`), vuelve a habilitar migraciones, ejecuta `supabase migration up` y luego `supabase test db`. Los fixtures viven en `supabase/fixtures/`, fuera del directorio que pgTAP descubre. El fixture nunca se despliega a hosted.

La primera ejecución encontró que `supabase db query --file` no admite varias sentencias en una misma llamada; se dividió la creación de función y la creación del event trigger en archivos separados. La siguiente ejecución debe confirmar que la migración y pgTAP pasan de extremo a extremo.
