# Fixora Balance — Threat model inicial

**Versión:** 1.0 | **Fecha:** 6 de noviembre de 2026  
**Estado:** análisis preliminar STRIDE y abuso; no sustituye pentest.

## 1. Activos

Cuentas/sesiones; objetivos, hábitos e historial; transacciones y derechos premium; dispositivos; grupos familiares y datos infantiles (fase posterior); configuración DNS; secretos de backend/pagos; logs, backups y artefactos CI.

## 2. Actores y límites de confianza

Usuario legítimo; cliente modificado/automatizado; cuenta comprometida; miembro familiar/dispositivo no autorizado; proveedor y webhooks; administrador/soporte; dependencia/acción CI comprometida; sistema operativo/fabricante.

Límites: dispositivo/API, app/SO, backend/proveedor, cuenta/familia, repo/CI y administrador/datos sensibles.

## 3. Amenazas y controles

| Amenaza | Impacto | Control | Prueba |
|---|---|---|---|
| IDOR entre usuarios | Fuga de datos | RLS y autorización por objeto | Usuario A accede a IDs de B |
| Exposición de SQLite local | Fuga de hábitos/objetivos si el sandbox o backup se compromete | Minimizar datos; evaluar SQLCipher con clave en Keychain/Keystore, verificación cipher_version, clave en cada conexión y plan de migración/backup | Extracción controlada, restore y pérdida de clave |
| Escalada de rol/JWT | Administración ilegítima | Roles server-side, MFA, grants mínimos | JWT/rol manipulado |
| Premium falso desde cliente | Pérdida de ingreso | Entitlements server-side y ledger | Alterar estado local/API |
| Webhook falso/repetido | Derechos falsos/doble extensión | Firma, timestamp, event ID único e idempotencia | Firma inválida/replay |
| Eventos fuera de orden | Acceso incorrecto | Máquina de estados y consulta de proveedor | Cancelación y renovación tardía |
| Doble suscripción | Cobro duplicado | Orquestación y detección entre canales | Plus→Completo |
| Robo de sesión | Toma de cuenta | Almacenamiento seguro, expiración y revocación | Reuso tras logout |
| Abuso de prueba | Costes no pagados | Elegibilidad server-side y señales proporcionales | Repetición cuenta/canal |
| Fuga por logs | Exposición de datos | Redacción, allowlist y retención | Escaneo de logs |
| Abuso familiar | Control indebido | Tutor autorizado, transparencia, revocación y auditoría | Cambio de tutor/dispositivo |
| Falso positivo DNS | Bloqueo legítimo | Allowlist, explicación y rollback | Dominios críticos |
| VPN manipulada | Pérdida de confianza | No monetizar tráfico, cifrado y disclosure | Captura/revisión de tráfico |
| Accesibilidad abusiva | Vigilancia/rechazo tienda | Evitar si no es esencial; alcance mínimo | Revisión de política |
| Supply-chain CI | Compromiso de release | SHA completo, permisos mínimos y revisión | PR externo sin secretos |
| Secretos en historial | Toma de servicios | Escaneo, push protection y rotación | Escaneo ramas/tags/blobs |
| Abuso interno | Cambios ilegítimos | MFA, roles separados y audit log | Ajuste sin rol/razón |
| Borrado accidental | Pérdida de datos | Backups y restore drill | Restauración probada |

## 4. Baseline obligatorio

- OWASP MASVS móvil y MASTG para pruebas.
- OWASP ASVS para API/panel; OWASP Top 10 como mapa, no checklist suficiente.
- RLS deny-by-default y pruebas negativas.
- Autorización por objeto server-side.
- Rate limits en login, OTP, recuperación, pruebas, webhooks y endpoints de coste.
- Idempotencia de comandos/eventos.
- TLS, almacenamiento seguro y secretos fuera de cliente/Git/artefactos.
- Logs sin secretos ni contenido sensible.
- Dependencias fijadas y escaneadas.
- Proceso de divulgación de vulnerabilidades.
- Exportación, eliminación y retención definidos.

## 5. Menores

Consentimiento parental cuando aplique; transparencia para el menor; no leer mensajes, teclas, fotos ni vigilancia secreta; acceso de soporte limitado y auditado; minimizar identificadores; evaluación legal por país; no usar datos infantiles para anuncios o perfilado comercial.

## 6. Riesgos residuales

Un usuario con control físico del dispositivo puede revocar permisos o desinstalar en muchos escenarios. APIs varían por versión/fabricante. DNS no ve ni elimina todo contenido/anuncio integrado. El abuso de pruebas no se elimina sin fricción o datos adicionales. Controles familiares deben equilibrar seguridad, autonomía y privacidad.

## 7. Prioridad

**P0 antes de cuentas:** RLS, auth/session, secretos, autorización server-side, export/borrado y logs seguros.

**P0 antes de compras:** proveedor verificado, idempotencia, ledger, conciliación, doble cobro y restauración.

**P0 antes de Family/Protection:** entitlements nativos, consentimiento, políticas de tienda, revisión legal, batería, privacidad y falsos positivos.

## 8. Referencias

- OWASP MASVS/MASTG: https://mas.owasp.org/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Supabase Production Security Checklist: https://supabase.com/docs/guides/security/production-checklist
- GitHub Actions security hardening: https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions

## 9. Criterio de cierre

No cerrar este threat model hasta revisar arquitectura implementada, flujos, dependencias, permisos, datos e integraciones y demostrar pruebas. Cada riesgo debe tener dueño, severidad, mitigación y evidencia de cierre.


## 10. Hallazgo de almacenamiento local — pendiente antes de beta

El proyecto usa Expo SQLite estándar y no ha habilitado SQLCipher. Las tablas locales contienen historial de enfoque y texto libre de hábitos/objetivos, que puede revelar información personal. No se considera una vulnerabilidad explotable demostrada en el estado actual, pero sí un control de almacenamiento pendiente antes de introducir datos reales.

La documentación de Expo SDK 58 confirma que SQLCipher es compatible con iOS y Android, no con Expo Go ni web. Para activarlo correctamente se requiere:
1. Configurar useSQLCipher=true y generar builds nativos.
2. Crear una clave aleatoria y guardarla en SecureStore (Keychain/Android Keystore); nunca hardcodearla ni registrarla.
3. Verificar PRAGMA cipher_version y fallar de forma segura si el binario no contiene SQLCipher; PRAGMA key puede ser ignorado por SQLite estándar.
4. Aplicar la clave a cada conexión, incluida la conexión separada creada por withExclusiveTransactionAsync.
5. Diseñar migración explícita de bases de datos plaintext y comportamiento de backup/restore/pérdida de clave.
6. Decidir la política web, porque SQLCipher no está disponible en web.

No activar SQLCipher con un cambio aislado de config: sin clave, migración y pruebas puede bloquear o perder datos locales. El almacenamiento local actual se mantiene para prototipo y no se declara pre-beta aprobado.

Fuentes:
- https://mas.owasp.org/MASVS/05-MASVS-STORAGE/
- https://mas.owasp.org/MASWE/MASVS-STORAGE/MASWE-0001/
- https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/
- https://docs.expo.dev/versions/v58.0.0/sdk/securestore/
- https://github.com/expo/expo/blob/main/packages/expo-sqlite/skills/expo-sqlite/references/web-and-config.md


## 11. Control de integridad SQLite — 8 de noviembre de 2026

Se identificó una discrepancia entre la configuración y el aislamiento transaccional: el arranque habilitaba `PRAGMA foreign_keys = ON` en la conexión principal, pero las migraciones usaban `withExclusiveTransactionAsync`, que abre una conexión separada. Expo documenta que esa conexión no hereda la configuración de claves foráneas y que el pragma no puede activarse dentro de una transacción.

Corrección propuesta en rama de revisión: ejecutar las migraciones con `withTransactionAsync` sobre la conexión configurada. Es seguro durante el arranque actual porque `getLocalDatabase()` no entrega la conexión a repositorios hasta que la promesa de inicialización termina. Además, se rechazan versiones de esquema futuras o inválidas para evitar downgrade destructivo/incompatible.

**Estado:** cambio sujeto a CI y revisión; no se considera cerrado hasta añadir una prueba SQLite de integración que verifique el rechazo efectivo de una referencia huérfana en Android/iOS.
