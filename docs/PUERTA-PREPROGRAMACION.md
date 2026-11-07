# Fixora Balance — Puerta de preprogramación

**Versión:** 1.0  
**Fecha:** 6 de noviembre de 2026  
**Estado:** prototipo local de enfoque/hábitos/objetivos implementado; CI de calidad/Supabase local aprobado en `42402767905`; iOS Simulator Release compilado, instalado, abierto y capturado (`42400815021`); APK Android Release generado y verificado (`42402768006`), con arranque AVD pendiente por timeout. No autoriza beta ni lanzamiento.

Este documento es la lista de control final para convertir el plan en ejecución. Distingue decisiones ya aceptadas, recomendaciones de trabajo y bloqueos reales.

## 1. Decisiones ya aceptadas o definidas para el plan

| Tema | Estado | Alcance |
|---|---|---|
| Marca/producto | Provisional | Fixora Balance, producto de Fixora Dynamics |
| Visión | Definida | Bienestar, enfoque, hábitos, progreso consciente, privacidad y protección familiar |
| Arquitectura base | Propuesta aprobada para prototipar | React Native + Expo + TypeScript; Swift/Kotlin para capacidades nativas; Supabase propuesto |
| MVP funcional | Recomendación registrada | Free + Plus Personal; Protección y Family después de validar APIs y políticas |
| Precios piloto MXN | Aceptados como base de trabajo | No definitivos, no publicados, no habilitan cobros |
| Prueba | Diseño recomendado | 14 días; solo funciones lanzadas; reglas específicas por canal pendientes |
| Backend de derechos | Regla no negociable | Backend + ledger como autoridad; cliente nunca concede premium |
| Privacidad | Principios definidos | Minimización; no mensajes, teclas, fotos ni historial completo |
| Repositorio | Estado observado | Público, rama main; no hay decisión de licencia ni auditoría completa de Settings |

## 2. Bloqueos que sí requieren decisión antes de cerrar el MVP y publicarlo

| Bloqueo | Recomendación de trabajo | Por qué importa |
|---|---|---|
| Licencia/visibilidad del código | Mantener repositorio público solo si se acepta exponer código; decidir licencia propietaria con asesoría o separar documentación pública y código privado antes de subir fuente ejecutable | Actualmente no se encontró LICENSE; un repo público sin licencia no equivale a una estrategia clara de propiedad intelectual |
| Sistemas operativos mínimos | Definir versiones mínimas Android/iOS después de un spike de compatibilidad con dispositivos disponibles | Determina APIs, dependencias, pruebas y configuración Expo |
| Primer canal de publicación | Mantener arquitectura preparada para Android/iOS, pero elegir un canal piloto para compra y soporte primero | Evita integrar y probar tres ciclos de pago simultáneamente |
| Proveedor web | Stripe candidato; comparar Mercado Pago en sandbox y elegir uno solo | No crear pagos reales ni tablas finales sin estados/eventos definidos |
| Política de sincronización y retención | Confirmar qué datos viven localmente, qué se sincroniza y plazos de retención/borrado | Afecta privacidad, RLS, offline y modelo de datos |
| Política de dispositivos MVP | Confirmar si el límite Plus de 3 dispositivos cuenta instalaciones activas, simultáneas o registradas | Define revocación, recuperación y prevención de abuso |

Los límites de Family, el entitlement Apple Family Controls, VPN/DNS, protección infantil, proveedor definitivo y fiscalidad no bloquean el inicio del núcleo Free + Plus; sí bloquean esas funciones y su comercialización.

## 3. Decisiones recomendadas que no deben convertirse en hechos sin aprobación

1. Lanzamiento inicial de producto en español de México y mercado de México.
2. App móvil primero; web administrativa solo cuando exista una necesidad concreta.
3. Free sin tarjeta ni prueba obligatoria.
4. Plus mensual/anual como primer SKU premium.
5. Prueba de 14 días aplicada al producto realmente disponible; si solo existe Plus, no presentar Balance Completo como si estuviera disponible.
6. Un proveedor de compra por canal y una sola integración web al inicio.
7. No lanzar Protección/Family hasta superar matriz nativa, revisión legal y pruebas físicas.

## 4. Auditoría actualizada del repositorio

Observado en GitHub al 6 de noviembre de 2026:
- Repositorio público; la única rama listada es main.
- Existe .github/workflows/quality.yml con permissions: contents: read; las acciones directas quedan fijadas por SHA completo y ambos checkouts usan persist-credentials: false.
- CI run 42313449617 pasó pnpm install --frozen-lockfile, Expo Doctor 20/20, TypeScript, 27 pruebas Vitest, bundles JS Android/iOS y Supabase local/pgTAP.
- No se ha auditado la configuración privada de GitHub Settings, Secret Scanning, Push Protection, Dependabot, CodeQL, reglas de protección ni permisos de colaboradores. No declarar estos controles activos sin verificación.
- No hay licencia LICENSE confirmada; la decisión de propiedad intelectual sigue abierta.
- No se han detectado secretos en los archivos revisados en esta sesión, pero esto no sustituye un escaneo histórico completo ni Secret Scanning.
- No se modificó Supabase remoto durante esta revisión.

Por lo tanto:
- Mantener datos sintéticos y no incluir secretos.
- La política de Actions se aplica al workflow; Settings de GitHub siguen como verificación manual pendiente.
- Resolver licencia/visibilidad antes de beta o publicar código que se quiera mantener propietario.

## 5. Orden exacto de preparación para programar

### P0 — Cierre de decisiones
- [ ] Resolver licencia y estrategia público/privado del código.
- [ ] Elegir canal piloto de compras.
- [ ] Definir versiones mínimas de Android/iOS.
- [ ] Confirmar semántica de los tres dispositivos Plus.
- [ ] Aprobar política de sincronización, retención y borrado.
- [ ] Confirmar mercado e idioma iniciales.

### P1 — Preparación técnica
- [x] Crear repositorio y estructura inicial de aplicación; el monorepo completo sigue siendo innecesario hasta que existan más paquetes.
- [ ] Definir contratos de dominio y adaptadores.
- [x] Crear proyecto Supabase remoto exclusivo de desarrollo en organización Free; ref `emacfszktufyqtfgzunl`, región `us-east-1`, estado `ACTIVE_HEALTHY`.
- [x] Definir estrategia Supabase + PostgreSQL remoto + SQLite local y política migration-first en ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md.
- [ ] Definir ambientes local, staging y producción.
- [x] Crear scaffold inicial Expo SDK 58 y dominio de enfoque.
- [x] Añadir persistencia local SQLite versionada para sesiones de enfoque.
- [x] Añadir workflow inicial de calidad.
- [x] Generar lockfile y ejecutar TypeScript, Vitest y bundles Android/iOS en CI.
- [x] Completar CI local de Supabase/pgTAP (runs 42308655770 y 42312021727).
- [x] Ejecutar Expo Doctor (20/20 en run 42312021727).
- [ ] Preparar builds nativos y validar en dispositivos físicos.
- [x] Preparar Supabase CLI/Docker local y reconstrucción de esquema en CI.
- [x] Configurar CI con permisos mínimos, SHA completo y checkouts sin credenciales persistentes; no se pasan secretos.
- [ ] Definir estrategia de pruebas unitarias, integración, E2E y dispositivos físicos.
- [ ] Revisar threat model y esquema de datos con pruebas RLS.

### P2 — Inicio controlado de implementación
- [x] Núcleo local de dominio, sesiones, objetivos y hábitos.
- [x] Persistencia local SQLite versionada (v1→v3); [ ] sincronización mínima.
- [ ] Autenticación y perfiles.
- [ ] UI Free y Plus sin checkout real.
- [ ] Entitlements de prueba en backend, sin confiar en flags del cliente.
- [ ] Compras sandbox después de seleccionar canal/proveedor.
- [ ] No ejecutar migraciones en producción durante desarrollo.

## 6. Criterio para declarar “listos para programar”

La puerta de planificación autorizó el prototipo local, no una beta ni un lanzamiento. El núcleo de enfoque/hábitos/objetivos está implementado; run 42312021727 pasó Expo Doctor 20/20, TypeScript, Vitest, bundles JS Android/iOS y Supabase local/pgTAP. El lockfile actualizado está versionado y la instalación congelada pasó en CI run 42312724248.

La siguiente puerta es validar builds nativos y SQLite v1→v3 en dispositivos físicos. La licencia/visibilidad, versiones mínimas, canal comercial, semántica de dispositivos y retención siguen abiertos. Auth/sincronización requieren modelo, RLS y pgTAP revisados. No se habilitarán bloqueos nativos ni compras antes de sus pruebas específicas.

## 7. Fuentes de seguridad base

- Supabase Production Security Checklist: https://supabase.com/docs/guides/security/production-checklist
- GitHub Actions security hardening: https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
- OWASP MASVS/MASTG: https://mas.owasp.org/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/



## 8. Actualización 7 de noviembre de 2026 — Evidencia de builds nativos

- [x] Crear workflow de build nativo iOS y Android para QA.
- [x] Crear workflow Android separado con aceptación de licencias del SDK dentro del runner temporal, autorizada por el responsable.
- [x] Preparar protocolo de primera ronda: [PROTOCOLO-PRIMERA-RONDA.md](PROTOCOLO-PRIMERA-RONDA.md).
- [x] CI integral run [42398660364](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42398660364) aprobado.
- [ ] Run [42398660326](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42398660326): build iOS de simulador aún no verificado como completo; Android de ese run falló por licencias antes de compilar.
- [ ] Nuevo workflow Android: confirmar APK y su artefacto antes de marcar build Android aprobado.
- [ ] Instalar y ejecutar en simuladores; después repetir en teléfonos físicos.

**Criterio:** la puerta de preprogramación no se cierra con el CI JS. Requiere artefactos nativos verificables, ejecución del app bundle, pruebas de persistencia/migración y validación física. Esta actualización no autoriza beta ni publicación.
