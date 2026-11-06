# Fixora Balance — Estado y bitácora del proyecto

**Última actualización:** 6 de noviembre de 2026  
**Rama:** main  
**Fase:** núcleo local de enfoque, hábitos y objetivos semanales implementado; CI de etapa 2 aprobado; CI final de etapa 3 pendiente; pruebas físicas y Expo Doctor pendientes.

Este archivo es la bitácora resumida para retomar el proyecto sin confundir planificación con trabajo implementado. Cada sesión debe actualizar fecha, estado, cambios documentales, decisiones y siguientes pasos.

---

## 1. Estado actual verificado

- Repositorio: https://github.com/carlo-magno-11/Fixora-Balance
- Visibilidad: público.
- Rama por defecto observada: main.
- Los documentos principales se consultaron en GitHub antes de actualizarlos.
- Se añadieron la propuesta comercial/precios piloto y la política de seguridad del repositorio público.
- Se actualizaron README, plan maestro, monetización y registro de decisiones.
- Scaffold Expo SDK 58 y primera experiencia de enfoque escritos en `main`.
- Dominio de sesiones, hábitos y objetivos con pruebas Vitest; TypeScript y Vitest pasaron para la etapa 2; la etapa 3 y la cola de escrituras esperan CI final.
- Exportación JavaScript para Android e iOS pasa en GitHub Actions; no equivale a build nativo ni prueba física.
- Persistencia SQLite local con migraciones versionadas 001–003: sesiones, hábitos y objetivos; actualización v1→v3 aún pendiente de prueba física.
- `pnpm-lock.yaml` generado y versionado; CI usa `pnpm install --frozen-lockfile`.
- `supabase/config.toml` y workflow Supabase CLI 3.0.0 añadidos.
- CI local Supabase/pgTAP pasó en GitHub Actions para las etapas 1 y 2; el workflow reconstruye la migración y prueba el event trigger mediante fixtures hosted-only.
- No se han creado productos reales en App Store Connect, Google Play, Stripe, Mercado Pago o RevenueCat.
- Supabase remoto sigue sin tablas de negocio, perfiles ni usuarios; no se aplicaron migraciones de hábitos/objetivos al proyecto remoto.
- Se añadieron .gitignore y SECURITY.md.
- No se ha verificado toda la configuración de GitHub Settings, Actions, secrets, reglas de rama o historial completo.

## 2. Documentos rectores

1. [README](../README.md) — punto de entrada.
2. [Plan maestro](PLAN-MAESTRO.md) — visión, arquitectura, seguridad, etapas.
3. [Monetización y licencias](MONETIZACION-Y-LICENCIAS.md) — modelo de compra y derechos.
4. [Propuesta comercial y precios](PROPUESTA-COMERCIAL-Y-PRECIOS.md) — precios piloto, simulaciones y proveedores.
5. [Seguridad del repositorio público](SEGURIDAD-REPOSITORIO-PUBLICO.md) — decisión de visibilidad y controles.
6. [Registro de decisiones](REGISTRO-DE-DECISIONES.md) — decisiones, hipótesis y revisiones.
7. [Puerta de preprogramación](PUERTA-PREPROGRAMACION.md) — bloqueos reales y secuencia de ejecución.
8. [Política de seguridad](../SECURITY.md) — reporte coordinado de vulnerabilidades.
9. [Estrategia Supabase y migraciones](ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md) — PostgreSQL, SQLite, entornos y regla migration-first.
10. [Implementación etapa 1](IMPLEMENTACION-ETAPA-1.md) — enfoque y SQLite.
11. [Implementación etapa 2](IMPLEMENTACION-ETAPA-2-HABITOS.md) — hábitos locales.
12. [Implementación etapa 3](IMPLEMENTACION-ETAPA-3-OBJETIVOS.md) — objetivos semanales.
13. [Investigación de hábitos y progreso](INVESTIGACION-HABITOS-PROGRESO.md) — patrones open source y reglas anti-daño.

## 3. Decisiones de trabajo vigentes

- Mantener Fixora-Balance público mientras el contenido sea documentación y código que aceptemos publicar. Revaluar antes de incorporar secretos, propiedad intelectual confidencial o despliegues sensibles.
- Precios piloto en México: Plus $79/$799; Protección $49/$499; Family $109/$1,099; Completo $179/$1,799; extensión +3 dispositivos $29/$299 MXN (mensual/anual). Aprobados como base inicial de trabajo, no definitivos ni publicados.
- Prueba integral de 14 días, una vez por cuenta elegible, con conversión transparente al plan elegido.
- Stripe Billing como candidato web; Mercado Pago como alternativa a comparar.
- StoreKit e IAP en iOS; Google Play Billing en Android. No asumir catálogo modular acumulable sin prototipo de compras y cambios de plan.
- RevenueCat se evaluará como capa de integración, no como reemplazo del ledger de derechos de Fixora.
- Backend como autoridad de compras y entitlements; eventos verificados e idempotentes.
- No lifetime para módulos con costes recurrentes en esta fase.

## 4. Pendientes que bloquean cerrar el MVP y publicar

### Producto y negocio
- [x] Aceptar precios piloto como base inicial de trabajo; revisar y ajustar antes de publicación.
- [x] Definir recomendación de MVP: Free + Plus Personal; Protección y Family quedan en fases posteriores hasta validar APIs, permisos, políticas y riesgos.
- [ ] Confirmar semántica del límite Plus de tres dispositivos; Family (3 perfiles/5 dispositivos) queda pendiente para su fase.
- [ ] Definir exactamente qué incluye cada módulo y qué no.
- [ ] Validar demanda/disposición de pago con usuarios reales.
- [ ] Decidir mercados e idiomas iniciales.

### Compras y licencias
- [ ] Construir matriz completa SKU → entitlements → límites → plataforma.
- [ ] Probar en Apple Sandbox el catálogo, grupos, prueba, upgrades y cancelación sin doble cobro.
- [ ] Probar Google Play Billing en entorno de prueba.
- [ ] Comparar Stripe y Mercado Pago con el mismo conjunto de escenarios.
- [ ] Elegir proveedor web.
- [ ] Definir reembolsos, contracargos, grace period y política de vencimiento.
- [ ] Validar impuestos, CFDI y obligaciones con contador/asesor fiscal.

### Plataforma y privacidad
- [ ] Validar APIs/entitlements nativos de iOS y Android en dispositivos reales.
- [ ] Confirmar qué funciones pueden lanzarse en ambas plataformas.
- [ ] Completar threat model y modelo de datos.
- [ ] Definir política de privacidad y evaluación legal de funciones infantiles.
- [ ] Decidir licencia del repositorio y estrategia público/privado para código ejecutable.

### GitHub y seguridad
- [ ] Verificar Dependency Graph, Dependabot, Secret Scanning y Push Protection.
- [ ] Verificar Actions permissions y workflows; actualmente no se ha auditado la configuración completa.
- [ ] Definir reglas de protección para main.
- [ ] Revisar colaboradores, GitHub Apps, tokens y secretos.
- [ ] Establecer política de CI y límites de gasto.
- [ ] Confirmar qué documentación y código pueden permanecer públicos.

La lista de bloqueos y criterio exacto de salida está en [PUERTA-PREPROGRAMACION.md](PUERTA-PREPROGRAMACION.md).

## 5. Próxima secuencia recomendada

1. Resolver las decisiones de catálogo y límites.
2. Revisar matriz SKU/derechos y escenarios de upgrades/downgrades por canal; resolver límites de dispositivos y beneficiarios.
3. Probar técnicamente las compras Sandbox sin cobros reales.
4. Validar APIs nativas críticas de iOS/Android.
5. Cerrar seguridad, privacidad y licencia.
6. Revisar y aprobar la arquitectura y el esquema de datos antes de crear migraciones.
7. Solo entonces iniciar el código de la aplicación y las migraciones de desarrollo.

## 6. Bitácora de sesiones

### 2026-11-06 — Nueva referencia Supabase compartida; acceso aún no autorizado en la integración
**Dato recibido**
- El responsable compartió la URL de proyecto `https://emacfszktufyqtfgzunl.supabase.co`.
- La referencia extraída de esa URL es `emacfszktufyqtfgzunl`; se registra como el destino propuesto para Fixora Balance, sin asumir que su nombre, organización, plan o configuración ya están verificados.

**Verificación efectuada**
- Se volvió a consultar la lista de organizaciones y proyectos a través de la integración Supabase conectada. Continúa mostrando únicamente la organización `carlo-magno-11's Org` y los proyectos EYESITE/eyesite-security-test ya documentados.
- Se intentó consultar directamente el proyecto por la referencia `emacfszktufyqtfgzunl`; Supabase respondió `You do not have permission to perform this action`.
- Por tanto, el enlace identifica un destino, pero la integración actual no tiene permiso verificable para leer sus detalles. No se puede afirmar todavía que el proyecto esté accesible desde esta conexión.

**Límites de seguridad aplicados**
- No se ejecutó SQL, no se consultaron tablas, no se leyeron claves, no se aplicaron migraciones y no se cambió configuración.
- No se usaron ni modificaron los proyectos EYESITE.
- No se pidió ni se debe compartir aquí una service_role key, secret key, contraseña de base de datos o token personal.

**Siguiente paso necesario**
- Reautorizar la integración Supabase con la cuenta/organización que contiene el proyecto y conceder permisos mínimos de lectura del proyecto y base de datos para poder auditarlo.
- En Supabase, revisar el token de acceso de la integración y su alcance; la documentación actual permite tokens acotados por proyecto y permiso. No pegar tokens en el chat.
- Una vez que la conexión pueda leer el proyecto, verificar nombre, organización, plan/estado, región, migraciones, tablas, extensiones, funciones y asesores de seguridad antes de diseñar o aplicar la primera migración de Fixora Balance.

### 2026-11-06 — Aprobación de precios piloto y cierre documental previo a programación
**Trabajo realizado**
- El responsable del producto aprobó los precios MXN propuestos como referencia inicial de trabajo, sujetos a revisión antes de publicación.
- Confirmada la recomendación de MVP: Free + Plus Personal; Protección y Family continúan en la visión, pero quedan condicionados a prototipos nativos, permisos, políticas y revisión legal.
- Creados ALCANCE-MVP-Y-CRITERIOS-ACEPTACION.md, MATRIZ-CATALOGO-ENTITLEMENTS.md, MATRIZ-CAPACIDADES-NATIVAS.md, MODELO-DATOS-Y-ARQUITECTURA.md, THREAT-MODEL-INICIAL.md y PUERTA-PREPROGRAMACION.md.
- Añadidos .gitignore y SECURITY.md; no se añadió licencia ni workflow CI porque la licencia/estrategia de código y la estructura ejecutable siguen pendientes.
- Actualizados README, PLAN-MAESTRO, MONETIZACION-Y-LICENCIAS, PROPUESTA-COMERCIAL-Y-PRECIOS, REGISTRO-DE-DECISIONES y ESTADO-Y-BITACORA para reflejar el nuevo estado.
- Revisadas fuentes oficiales Apple Family Controls, Google Play VpnService y Supabase Production Security Checklist.

**Decisiones**
- Precios piloto aceptados como base, no finales ni publicados.
- MVP funcional prioriza Free + Plus; Protección/Family quedan para fases posteriores con puertas explícitas.
- No iniciar migraciones hasta cerrar los límites de dispositivos, canal/proveedor inicial, retención y autorización de datos.

**Pendientes críticos**
- Resolver si los dispositivos personales del tutor cuentan dentro de los cinco dispositivos Family.
- Elegir plataforma/canal inicial y confirmar mínimos de iOS/Android.
- Auditar Settings, workflows, permisos de Actions, secretos, licencia y protección de main.
- Prototipos UsageStats, FamilyControls y VpnService antes de activar funciones dependientes.
- Validar fiscalidad, privacidad infantil, términos y reembolsos con asesoría adecuada.

## 6. Bitácora de sesiones

### 2026-11-06 — Modelo comercial y decisión de repositorio
**Trabajo realizado**
- Revisado el modelo Free, módulos individuales, Balance Completo, extensión y prueba de 14 días.
- Investigados precios de Opal, ScreenZen y Ohana como referencias de mercado.
- Revisadas tarifas públicas de Stripe y Mercado Pago.
- Revisados RevenueCat, App Store subscriptions, Apple subscription groups, App Store Small Business Program y tarifas Google Play.
- Revisada documentación de GitHub Actions billing y seguridad de repositorios públicos.
- Confirmado que Fixora-Balance aparece público y con main como rama por defecto.
- Comprobados los cuatro documentos anteriores antes de actualizarlos.
- Creados PROPUESTA-COMERCIAL-Y-PRECIOS.md y SEGURIDAD-REPOSITORIO-PUBLICO.md.
- Actualizados README, PLAN-MAESTRO, MONETIZACION-Y-LICENCIAS y REGISTRO-DE-DECISIONES.
- Corregidas las simulaciones netas de Stripe tras revisar la aritmética de las comisiones.

**Decisiones**
- Mantener público por ahora con política estricta de no secretos.
- Definir precios piloto en MXN como hipótesis de validación, no precios definitivos.
- Prueba única de 14 días.
- Diferenciar modelo de compras web y de tiendas móviles.
- No empezar código funcional hasta cerrar puertas pendientes.

**Riesgos abiertos**
- No se ha auditado el historial completo ni Settings de GitHub.
- No se ha confirmado la elegibilidad Apple Small Business ni el contrato real de proveedores.
- El catálogo modular de iOS requiere pruebas Sandbox antes de comprometer UX y cobros.
- Precios y límites requieren validación de costes y usuarios.

---

### 2026-11-06 — Decisión de arquitectura de datos y control de migraciones

**Investigación y verificación**
- Consultada la documentación oficial de Supabase sobre local development workflow, migrations, pgTAP, Auth, entornos remotos y backups.
- Consultada la organización Supabase conectada: aparecen proyectos EYESITE, pero no existe un proyecto identificado como Fixora Balance.
- No se consultó ni modificó el esquema de proyectos EYESITE.

**Decisiones de trabajo**
- Supabase/PostgreSQL será el backend central de Balance; SQLite será almacenamiento local/offline.
- Todas las modificaciones de esquema y permisos deben quedar en migraciones SQL versionadas antes de aplicarse a entornos compartidos.
- Las operaciones de usuario en tiempo real no crean una migración por evento: se guardan como datos operativos y, para pagos/derechos/admin, en ledger/auditoría idempotente.
- Flujo: crear migración con CLI, probar localmente, pgTAP/RLS, revisar, commit, dry-run remoto y despliegue aprobado.
- No reutilizar EYESITE ni otro producto Fixora; no crear proyecto remoto ni ejecutar SQL en esta etapa.

**Trabajo realizado**
- Creado ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md.
- Actualizados modelo de datos, puerta de preprogramación y README.

**Pendiente**
- Confirmar organización y coste antes de crear proyecto remoto dedicado Fixora Balance.
- Instalar/verificar Supabase CLI y Docker en entorno de desarrollo.
- Resolver P0 restantes y luego crear primera migración de perfiles/preferencias con pruebas RLS.

### 2026-11-06 — Reanudación de ejecución y verificación de organización Supabase

**Solicitud del responsable**
- Se indicó continuar con la ejecución del plan y se proporcionó el nombre `Fixora-Balance` como referencia de la organización Free recién preparada.

**Verificación efectuada**
- Se consultó nuevamente la lista de organizaciones mediante la conexión Supabase activa.
- La conexión solo devuelve la organización `carlo-magno-11's Org` con ID `iihmpoccnyrphzrngrvo`.
- La lista de proyectos devuelve únicamente `terrenos Yucatan` (ref `xhvpvpvtkdgnnxdwdrkn`) y `eyesite-security-test` (ref `dclaebknyalimmtgppeg`).
- No se recibió una organización identificada como `Fixora-Balance`, ni un proyecto `fixora-balance-dev`.
- Se volvió a inspeccionar el repositorio: solo existe la rama `main`; no se localizaron `package.json`, configuración Expo, `supabase/config.toml`, migraciones ni workflows CI.

**Límites de seguridad aplicados**
- No se creó proyecto Supabase dentro de la organización Pro, porque no es el destino Free indicado y puede generar cargos.
- No se ejecutó SQL ni se aplicaron migraciones en ninguno de los proyectos existentes.
- No se publicó código ejecutable en el repositorio público mientras la estrategia de licencia/visibilidad del código siga sin resolverse.
- La arquitectura migration-first y la separación Supabase/SQLite permanecen como decisiones documentadas.

**Siguiente desbloqueo**
- Actualizar/reautorizar la conexión Supabase con acceso a la organización Free `Fixora-Balance` (o proporcionar su ID exacto y asegurar que la conexión autenticada sea miembro).
- Verificar organización, plan y coste del proyecto `fixora-balance-dev` antes de provisionarlo.
- Resolver la política de publicación del código antes de introducir fuente ejecutable en el repositorio público.
- En paralelo, preparar especificación de núcleo Free + Plus y contratos de dominio sin exponer código propietario ni modificar bases de datos ajenas.

## 7. Regla de continuidad

No afirmar que algo está implementado solo porque está descrito. No modificar ramas, visibilidad, servicios de pago, bases de datos o configuración de producción sin inspección previa y autorización adecuada. Cada cambio sustancial debe actualizar este archivo, el plan maestro y el registro de decisiones.


### 2026-11-06 — Conexión correcta, auditoría Supabase y primera implementación

**Conexión correcta**
- Se detectaron dos cuentas Supabase conectadas; la primera, identificador de cuenta `link_6aa4ee94be90819186074001d683a997`, es la que tiene la organización `Fixora-Balance`. La segunda no tenía permisos para este proyecto. No se debe confundir la cuenta elegida con la organización Pro anterior.
- Organización `Fixora-Balance`, ID `fnufjydflegirzatihec`, plan Free.
- Proyecto `emacfszktufyqtfgzunl`, nombre actual `carlo-magno-11's Project`, región `us-east-1`, PostgreSQL 17.11, estado `ACTIVE_HEALTHY`.

**Auditoría de solo lectura previa**
- Esquema `public`: cero tablas base, cero vistas, cero políticas y una función.
- `auth.users`: cero filas. Storage buckets: cero. Edge Functions: cero.
- Historial remoto inicial: cero migraciones.
- Extensiones instaladas: cinco (incluyendo pgcrypto, uuid-ossp, pg_stat_statements, supabase_vault y plpgsql).
- Hay siete event triggers de plataforma; `ensure_rls` usa `public.rls_auto_enable()`.
- Security Advisor encontró dos warnings por permisos EXECUTE de anon/authenticated en esa función SECURITY DEFINER, aunque es de tipo event_trigger. Se comprobó que no puede invocarse como función normal por PostgREST debido al tipo de retorno; aun así, se endurecieron permisos explícitamente.

**Migración remota de hardening**
- Se creó y guardó primero el SQL en GitHub: `supabase/migrations/20261106221629_harden_rls_event_trigger_permissions.sql`.
- Se aplicó mediante el mecanismo de migraciones Supabase, no mediante SQL Editor.
- La API registró versión remota `20261106221629`; el archivo local se alineó a esa versión. El nombre descriptivo almacenado por la API conserva la cadena enviada originalmente, pero la versión coincide.
- Verificación posterior: anon EXECUTE=false, authenticated EXECUTE=false, service_role EXECUTE=true; event trigger `ensure_rls` continúa registrado.
- Security, Performance y Health Advisors devuelven cero hallazgos después de la corrección.
- Nota de proceso: esta primera migración se creó desde la integración GitHub/Supabase porque no había un workspace local con Supabase CLI disponible. A partir de la preparación del workspace, las siguientes migraciones deberán generarse y probarse con Supabase CLI local antes de aplicar a remoto.

**Implementación escrita**
- Se añadió scaffold Expo SDK 58, Expo Router, TypeScript y scripts.
- Se añadió pantalla inicial de enfoque con sesiones de 15/25/50 minutos, pausa/reanudación/finalización.
- Se añadió dominio puro y pruebas Vitest.
- Se añadió migración SQLite local versionada y repositorio para restaurar/guardar sesiones.
- Se añadió workflow GitHub Actions para typecheck y pruebas.
- Se creó [IMPLEMENTACION-ETAPA-1.md](IMPLEMENTACION-ETAPA-1.md).

**Pendiente de verificación**
- No se ha ejecutado pnpm install ni generado lockfile.
- No se han ejecutado TypeScript, Vitest, Expo Doctor, build nativo ni pruebas físicas; no declarar CI verde hasta leer la ejecución real.
- Revisar dependencias/peer versions del SDK 58, corregir cualquier incompatibilidad y generar pnpm-lock.yaml.
- Revisar permisos y configuración GitHub Settings; el repo sigue público y sin decisión de licencia.
- Implementar objetivos/hábitos, manejo de errores SQLite, Auth/perfiles y primera migración de usuario con RLS.
- No implementar pagos ni permisos Family/Protection todavía.


### 2026-11-06 — CI de aplicación y preparación de Supabase local

- Añadido `pnpm-lock.yaml` mediante instalación controlada en GitHub Actions; la verificación usa ahora `--frozen-lockfile`.
- Verificación CI completada con éxito: TypeScript, Vitest, export Android e iOS.
- Configuración local `supabase/config.toml` generada con Supabase CLI 3.0.0 y PostgreSQL 17 para igualar hosted.
- Se detectó que la función `public.rls_auto_enable()` es una infraestructura event-trigger disponible en hosted, pero no viene en el contenedor local estándar. No se modificó la migración ya aplicada. Se creó un fixture de pruebas fuera de `supabase/tests` para simular el helper hosted y probar el hardening localmente.
- Se creó `supabase/seed.sql` vacío intencionalmente para que el flujo local sea reproducible sin datos inventados.
- CI local ya consigue arrancar Supabase; está pendiente terminar de aplicar el fixture como sentencias separadas, ejecutar migraciones y pgTAP.



### 2026-11-06 — Dirección visual y tokens de diseño v0.1

**Inspección real**
- Confirmado repositorio público `carlo-magno-11/Fixora-Balance`, rama por defecto `main`; solo se encontró esa rama.
- Revisado el código actual de `app/index.tsx`: la pantalla principal concentra la UI y mantenía la paleta dentro del archivo.
- Confirmado en Supabase proyecto `emacfszktufyqtfgzunl`: una migración remota, cero tablas de negocio y cero hallazgos en Security, Performance y Health Advisors.
- La ejecución GitHub Actions más reciente consultada antes del refactor fue exitosa para el commit `47020ecca9b702b1cdc99509d9331bcc58c4a54f`. Los cambios visuales posteriores todavía requieren su propia ejecución CI.

**Investigación open source**
- Revisados react-native-reusables (8.7k estrellas, MIT), gluestack-ui (5.3k, MIT), Shopify Restyle (3.4k, MIT) y Wix React Native UI Lib (7.1k, MIT).
- Decisión: no incorporar una librería completa ni añadir NativeWind/Uniwind en esta fase. Adoptar tokens semánticos y componentes propios con React Native StyleSheet; consultar las librerías como referencia selectiva.

**Trabajo guardado en GitHub/main**
- Creado `docs/SISTEMA-DISENO-UX.md` con dirección creativa, colorimetría, tipografía, escala, navegación, componentes, accesibilidad y referencias open source.
- Creado `src/theme/tokens.ts` como fuente tipada de colores, espaciado, radios, tipografía y tiempos de movimiento.
- Refactorizada la pantalla inicial para consumir tokens, retirar colores hexadecimales locales y usar verde bosque como acción principal, manteniendo borgoña como firma de marca.
- Añadido el enlace al sistema visual en README.

**Pendiente de verificación**
- Esperar CI de los cambios de tema y pantalla; no declarar TypeScript/tests/build validados para estos commits hasta leer el run correspondiente.
- Validar contraste WCAG 2.2 AA, estados y tamaño táctil; revisar visualmente iOS, Android y web.
- Separar componentes compartidos y dividir Inicio/Enfoque cuando el flujo funcional y navegación estén definidos.
- El sistema visual v0.1 es una dirección de prototipo, no un bloqueo definitivo de marca.


### 2026-11-06 — Etapa 2: hábitos locales y continuidad UX

**Revalidación antes de escribir**
- Confirmada rama única `main` y commit base de diseño `aff85cd867047b85355e025bb7ec4d57896a8ae0`.
- GitHub Actions del commit de diseño terminó con éxito: TypeScript, Vitest, export Android/iOS y reconstrucción Supabase local con pgTAP.
- Supabase dedicado `emacfszktufyqtfgzunl` consultado en modo lectura: estado `ACTIVE_HEALTHY`, PostgreSQL 17.11, una migración remota `20261106221629`, cero tablas públicas de negocio y cero lints en Security, Performance y Health.
- No se aplicaron cambios SQL al proyecto remoto.

**Código añadido en main**
- Dominio de hábitos con frecuencia diaria/semanal, metas semanales, validación de fecha y check-in con identidad idempotente.
- Pruebas Vitest para creación, entradas inválidas, fecha calendario imposible, identidad de check-in y semana local iniciada en lunes.
- Prueba aislada del DDL en SQLite 3.46.1: conserva tabla previa, valida check-in y unicidad, rechaza meta diaria inválida. No equivale a prueba de Expo SQLite ni dispositivo.
- Migración SQLite local 002 para `habits` y `habit_completions`, con FK, constraints, índices y unicidad por hábito/día.
- Repositorio SQLite para crear/listar, registrar cumplimiento idempotente y deshacer.
- Ruta `/habits` con creación, selección de frecuencia, meta semanal, avance de semana y cumplimiento diario.
- Componentes compartidos `SurfaceCard`, `PrimaryButton`, `SectionHeading` y `EmptyState` que consumen los tokens de diseño.
- Inicio enlaza a Hábitos. El reinicio/cambio de duración de una sesión elimina la fila SQLite anterior para evitar restaurar una sesión que el usuario terminó.

**Documentación**
- Creado `docs/IMPLEMENTACION-ETAPA-2-HABITOS.md`.
- Actualizados README, Plan Maestro, Implementación etapa 1, esta bitácora y registro de decisiones.

**Validación pendiente**
- CI de la etapa 2 aún debe terminar para confirmar TypeScript, Vitest, bundles Android/iOS y pgTAP.
- Probar actualización SQLite v1→v2 conservando sesiones existentes y desde instalación limpia.
- Probar creación/check-in/deshacer/reinicio en dispositivos físicos.
- No hay XP, rachas, insignias, objetivos, Auth, sincronización ni tablas remotas de negocio implementadas.


### 2026-11-06 — Investigación de progreso y recompensas

- Inspeccionados en GitHub Loop Habit Tracker (10,395 estrellas, GPL-3.0) y Habitica (14,294 estrellas, licencia NOASSERTION).
- Se revisaron modelos de frecuencia, score, hábito y tipos de tarea. La investigación se limita a patrones conceptuales; no se copió código ni assets.
- Creado `docs/INVESTIGACION-HABITOS-PROGRESO.md`.
- Decisión propuesta: progreso no punitivo; descansos y omisiones no borran puntos ganados; XP opcional y desactivable.
- No se implementa XP todavía. Faltan eventos fuente, idempotencia, reversión, zona horaria y reglas offline.


### 2026-11-06 — Etapa 3: objetivos semanales

**Trabajo en main**
- Añadido dominio de objetivos semanales con dos métricas: sesiones completadas y check-ins de hábitos.
- Añadidas pruebas de dominio para creación, normalización y límites.
- Creada migración SQLite 003 y actualizado el gestor de base local a versión 3.
- Añadido repositorio de objetivos con agregación semanal basada en sesiones completadas y check-ins reales.
- Añadida pantalla `/goals` para crear metas y ver avance calculado, sin progreso editable.
- Añadidos accesos desde Inicio y Hábitos.
- Corregido el reinicio de enfoque: una sesión completada se conserva para el historial y las metas semanales; solo se elimina una sesión en curso/pausada terminada anticipadamente.
- Creado `docs/IMPLEMENTACION-ETAPA-3-OBJETIVOS.md`.

**Validación local aislada**
- En SQLite 3.46.1 se comprobó la consulta de agregación para ambas métricas y la conservación de filas de sesiones/hábitos. No sustituye CI ni prueba de Expo SQLite.

**Pendiente**
- CI del commit final de etapa 3.
- Prueba física de migración SQLite desde v1/v2 y creación/avance de objetivos.
- Edición/archivo de objetivos y asociación directa a hábitos siguen fuera de esta primera versión.
- XP, niveles, rachas, insignias, Auth y sincronización remota siguen pendientes.


**Corrección adicional de consistencia local**
- Se detectó posible carrera entre el guardado asíncrono de una sesión y su eliminación al terminarla anticipadamente.
- Se añadió una cola de escrituras serializada, con pruebas de orden y recuperación tras error, y se conectó al repositorio de sesiones.
- Las sesiones completadas se conservan para que objetivos semanales puedan medirlas; las sesiones canceladas se eliminan después de cualquier guardado anterior en cola.
