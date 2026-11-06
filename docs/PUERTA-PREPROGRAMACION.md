# Fixora Balance — Puerta de preprogramación

**Versión:** 1.0  
**Fecha:** 6 de noviembre de 2026  
**Estado:** preparación documental avanzada; todavía no autoriza empezar implementación funcional ni migraciones.

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

## 2. Bloqueos que sí requieren decisión antes de iniciar el código de producto

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

## 4. Auditoría preliminar del repositorio

Observado mediante GitHub al 6 de noviembre de 2026:
- Repositorio público y rama por defecto main.
- Solo se confirmó main como rama listada.
- Búsqueda de código para package.json, Expo/React Native, migraciones Supabase y workflows no devolvió archivos.
- Las rutas comunes .github/workflows/ci.yml, ci.yaml, test.yml, security.yml, .github/dependabot.yml, LICENSE y CODE_OF_CONDUCT.md devolvieron 404 en la inspección.
- Después de esa inspección se añadieron SECURITY.md y .gitignore.
- No se encontró evidencia de workflow CI en las búsquedas efectuadas; aún no existe evidencia de CI ejecutándose.
- No se pudo inspeccionar desde las acciones disponibles la configuración privada de GitHub Settings, secrets, reglas de protección, Actions permissions ni el historial completo.

Por lo tanto:
- No declarar activos Secret Scanning, Push Protection, Dependabot, CodeQL, reglas de main ni permisos mínimos de Actions.
- Los runners públicos gratuitos no generan ahorro mientras no exista workflow que ejecute CI.
- No subir secretos ni datos reales.
- Antes de fuente ejecutable, decidir licencia/visibilidad, agregar workflows seguros y verificar Settings directamente en GitHub. SECURITY.md y .gitignore ya están añadidos.

## 5. Orden exacto de preparación para programar

### P0 — Cierre de decisiones
- [ ] Resolver licencia y estrategia público/privado del código.
- [ ] Elegir canal piloto de compras.
- [ ] Definir versiones mínimas de Android/iOS.
- [ ] Confirmar semántica de los tres dispositivos Plus.
- [ ] Aprobar política de sincronización, retención y borrado.
- [ ] Confirmar mercado e idioma iniciales.

### P1 — Preparación técnica
- [ ] Crear estructura del monorepo solo después de revisar convenciones y stack final.
- [ ] Definir contratos de dominio y adaptadores.
- [ ] Crear proyecto Supabase remoto exclusivo para Fixora Balance, después de confirmar organización y coste; verificar ref/proyecto antes de cualquier migración.
- [x] Definir estrategia Supabase + PostgreSQL remoto + SQLite local y política migration-first en ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md.
- [ ] Definir ambientes local, staging y producción.
- [ ] Configurar CI con permisos mínimos, SHA completo y sin secretos en PR externos.
- [ ] Definir estrategia de pruebas unitarias, integración, E2E y dispositivos físicos.
- [ ] Revisar threat model y esquema de datos con pruebas RLS.

### P2 — Inicio controlado de implementación
- [ ] Núcleo de dominio, sesiones, objetivos y hábitos.
- [ ] Persistencia local y sincronización mínima.
- [ ] Autenticación y perfiles.
- [ ] UI Free y Plus sin checkout real.
- [ ] Entitlements de prueba en backend, sin confiar en flags del cliente.
- [ ] Compras sandbox después de seleccionar canal/proveedor.
- [ ] No ejecutar migraciones en producción durante desarrollo.

## 6. Criterio para declarar “listos para programar”

La fase documental queda cerrada cuando los seis puntos P0 estén decididos, la licencia/visibilidad esté resuelta, el stack y las versiones mínimas estén fijados, el proyecto Supabase remoto de desarrollo esté identificado sin ambigüedad, el stack local pueda reconstruir el esquema y el esquema de datos pase revisión de autorización. Todas las migraciones deberán estar versionadas y probadas localmente.

La primera tarea de código será un spike vertical pequeño y verificable, no construir toda la app de golpe: iniciar app, probar navegación, persistencia local, sesión de enfoque y pruebas automatizadas; después revisar en Android/iOS antes de ampliar alcance.

## 7. Fuentes de seguridad base

- Supabase Production Security Checklist: https://supabase.com/docs/guides/security/production-checklist
- GitHub Actions security hardening: https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions
- OWASP MASVS/MASTG: https://mas.owasp.org/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

