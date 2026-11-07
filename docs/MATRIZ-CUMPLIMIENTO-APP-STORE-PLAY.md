# Fixora Balance — Puerta de cumplimiento para App Store y Google Play

**Versión:** 1.0  
**Fecha de revisión:** 6 de noviembre de 2026  
**Estado:** requisitos incorporados al plan; no equivale a certificación ni aprobación de las tiendas.

## 1. Objetivo y regla de lanzamiento

Fixora Balance debe superar una revisión técnica, de privacidad, seguridad, contenido, pagos y experiencia antes de solicitar publicación en Apple App Store o Google Play. La compilación correcta no implica aprobación. Las políticas cambian y se deben volver a consultar en cada release.

El MVP inicial se limita a enfoque, hábitos, objetivos y progreso local. No se anunciarán funciones de bloqueo, VPN/DNS, monitoreo de uso ni controles familiares hasta que existan prototipos nativos, permisos/entitlements aprobados, pruebas físicas y revisión de políticas para cada plataforma.

## 2. Requisitos transversales obligatorios

- La app debe abrir, navegar y completar sus flujos principales sin bloqueos ni datos de demostración engañosos.
- Toda función anunciada debe estar disponible y funcionar en la versión enviada. Eliminar placeholders, pantallas vacías, botones sin acción y métricas ficticias.
- Probar en dispositivos reales y versiones compatibles; registrar modelos, versión del SO, build, pasos, resultados y evidencia.
- Política de privacidad pública, accesible desde la app y desde la ficha de tienda. Debe explicar datos recogidos, finalidad, terceros, retención, eliminación y contacto.
- Pedir solo permisos estrictamente necesarios, en el momento en que se necesita la función. Explicar antes el propósito; ofrecer alternativa cuando sea posible y respetar la revocación.
- Si se habilita creación de cuenta, implementar eliminación de cuenta y de datos desde la app. Para Google Play también publicar un recurso web funcional para solicitar la eliminación y registrar su URL en Play Console.
- Formularios de privacidad y Data safety deben coincidir con el comportamiento real, SDKs, backend, logs y política publicada.
- No recolectar mensajes, teclas, fotos, contenido privado ni historial completo de navegación. No introducir SDKs publicitarios o analíticos sin revisión de privacidad.
- Soporte/contacto, descripción, capturas, icono, clasificación por edad y metadatos completos y veraces.
- Proporcionar a revisores un modo demo o cuenta de revisión cuando existan funciones protegidas por cuenta, sin exponer datos reales.
- Documentar cifrado, exportación y eliminación de datos, retención legal y respuesta a incidentes.
- Comprobar accesibilidad, escalado de texto, lector de pantalla, contraste, áreas táctiles, Reduce Motion, orientación y distintos tamaños de pantalla.

## 3. Apple App Store — lista de control

### Antes de enviar
- [ ] Apple Developer Program activo y titularidad/legal entity resuelta.
- [ ] Bundle ID definitivo, certificados/perfiles y capacidades revisados.
- [ ] Build Release firmado; instalación limpia y actualización desde versión anterior probadas.
- [ ] App Store Connect: nombre, subtítulo, descripción, palabras clave, categoría, edad, soporte, privacidad, capturas y contacto.
- [ ] URL de política de privacidad y declaraciones App Privacy completas y consistentes.
- [ ] Si hay creación de cuenta, eliminación iniciable dentro de la app y proceso backend probado.
- [ ] Si hay compras digitales o desbloqueo de Plus dentro de iOS, integrar StoreKit / In-App Purchase según las reglas aplicables al storefront. No dirigir a pagos externos salvo excepción/entitlement expresamente aplicable.
- [ ] Suscripción: precio, duración, renovación, contenido y condiciones visibles antes de confirmar; restauración y gestión/cancelación comprensibles.
- [ ] Notas de revisión explican los flujos, permisos, capacidades nativas y datos de prueba; demo account funcional si se requiere.
- [ ] Cumplir IPv6-only, ciclo de vida, enlaces, privacidad y comportamiento del sistema.
- [ ] TestFlight interno y externo; resolver crashes y feedback antes de revisión final.

### Riesgos específicos de Fixora
- FamilyControls requiere entitlement de desarrollo y entitlement de distribución solicitado/aprobado por Apple. Las extensiones Screen Time pueden requerir solicitudes separadas.
- No prometer bloqueo universal ni presentar APIs Screen Time como disponibles antes de autorización, entitlement y prueba real.
- Network Extension/filtrado requiere identificar entitlement y uso permitido antes de implementarlo o anunciarlo.
- Si se usa inicio de sesión social de terceros como acceso principal, revisar obligación de ofrecer opción equivalente compatible con las reglas de Apple. El inicio de sesión propio no activa por sí solo esa obligación.
- No forzar permisos de notificaciones, uso, Screen Time o seguimiento para acceder a funciones que no dependen de ellos.
- No incluir funciones ocultas, inactivas o no documentadas en el binario enviado.

## 4. Google Play — lista de control

### Antes de enviar
- [ ] Cuenta Play Console verificada, identidad y datos de contacto correctos.
- [ ] Android App Bundle firmado, versionado y compatible con el target API requerido en la fecha de envío.
- [ ] Probar instalación limpia, actualización, proceso de recuperación, reinicio y diferentes fabricantes.
- [ ] Ficha de tienda completa, capturas reales, clasificación IARC, audiencia objetivo y declaraciones de contenido.
- [ ] Política de privacidad pública y sección Data safety veraz y consistente con app, SDKs, backend y terceros.
- [ ] Si se crean cuentas, eliminación accesible dentro de la app y página web externa para solicitarla; borrar los datos asociados según política y declarar retenciones legítimas.
- [ ] Compras digitales y suscripciones integradas mediante Google Play Billing cuando corresponda; precios, renovación, prueba, cancelación y restauración explicados.
- [ ] Declarar permisos sensibles y APIs; completar formularios, videos y divulgaciones que Google Play solicite.
- [ ] Probar en Play internal testing y closed testing antes de producción; resolver pre-launch report y crashes.
- [ ] Revisar target API, SDKs, permisos, contenido y políticas justo antes de cada release.

### Riesgos específicos de Fixora
- AccessibilityService no se usará como atajo para bloquear otras apps. Solo se evaluará si es elegible, esencial, claramente divulgado y aprobado conforme a la política vigente.
- UsageStats requiere acceso especial del usuario; explicar propósito y alternativa cuando se deniegue.
- VpnService solo se considerará en los casos admitidos por política; requiere función elegible, divulgación destacada, consentimiento y controles de seguridad. No redirigir/manipular tráfico para monetización.
- Protección familiar y funciones dirigidas a menores requieren revisar Families Policy, audiencia objetivo, privacidad infantil, consentimiento parental y declaraciones correspondientes.
- No declarar bloqueo, detección o filtrado completo cuando el SO o la tecnología no lo garantice.

## 5. Plan de pruebas y primera visualización funcional

### Fase A — ya aprobada en CI
- [x] TypeScript.
- [x] 27 pruebas Vitest.
- [x] Expo Doctor 20/20.
- [x] Bundles JavaScript Android e iOS.
- [x] Supabase local, migraciones y pgTAP.
- [x] Lockfile reproducible con instalación congelada.

### Fase B — primera prueba visual/funcional
Se inicia cuando haya un development build o una ruta de ejecución compatible y el artefacto esté disponible. El objetivo es que el equipo pueda abrir la app y recorrer Inicio/Hoy, Enfoque, Hábitos y Objetivos.

- [ ] Obtener build Android instalable (APK/AAB de prueba).
- [ ] Obtener build iOS para simulador o TestFlight según firma/cuenta disponible.
- [ ] Instalar en Android físico y iPhone físico.
- [ ] Registrar capturas y video de flujos principales.
- [ ] Probar crear/editar/completar hábitos y objetivos; temporizador 15/25/50, pausa/reanudación, background, cierre forzado, reinicio y recuperación SQLite.
- [ ] Verificar estados vacíos, errores, carga, accesibilidad, contraste, teclado, áreas táctiles y texto grande.
- [ ] Confirmar persistencia tras actualizar la app y migración SQLite v1→v3 con datos previos.
- [ ] Verificar consumo de batería, memoria y estabilidad básica.

### Fase C — pruebas de aceptación MVP
- [ ] E2E de flujos principales.
- [ ] Pruebas de accesibilidad en VoiceOver y TalkBack.
- [ ] Matriz Android (Pixel/AOSP, Samsung y Xiaomi) y versiones elegidas.
- [ ] Matriz iOS (versión mínima y actual; iPhone y iPad si se soporta).
- [ ] Pruebas de red intermitente, modo avión, cambio de zona horaria y hora de verano.
- [ ] Pruebas de seguridad móvil/API, privacidad, exportación y borrado.
- [ ] Prueba beta con usuarios, feedback y corrección de bloqueadores.

### Fase D — prepublicación
- [ ] Compras Sandbox: StoreKit y Play Billing; cancelación, reembolso, renovación, restauración y eventos duplicados.
- [ ] Auditoría de permisos, SDKs, privacidad y formularios de tienda.
- [ ] Prueba de instalación/actualización desde canal de beta.
- [ ] Revisión legal de términos, privacidad, suscripciones y menores.
- [ ] Revisión final de metadatos y notas de revisión.
- [ ] Aprobación explícita del responsable del producto.


## 5A. Configuración de builds ya preparada

El repositorio incluye eas.json con tres perfiles:
- preview: distribución interna y APK instalable Android para QA.
- ios-simulator: variante del perfil preview para simulador iOS.
- production: perfil de distribución de tienda con incremento automático de versión.

El workflow de calidad valida la estructura básica de estos perfiles. Esto no crea un build ni enlaza el repositorio con una cuenta EAS. Para ejecutar builds cloud se requiere iniciar sesión y enlazar el proyecto; para iOS físico/TestFlight se requieren credenciales y membresía/capacidades Apple correspondientes. No se debe subir ningún build a tienda desde esta fase.

## 6. Qué puede ejecutar el equipo de desarrollo y qué necesita hardware/cuentas

Automatizable desde CI: TypeScript, unitarias, integración local, migraciones, pgTAP, exportación de bundles, análisis de dependencias, escaneo de secretos y parte de E2E.

Requiere build y entorno real: instalación nativa, SQLite real, segundo plano, reinicios, notificaciones, permisos, batería, diferencias por fabricante, VoiceOver/TalkBack, compras sandbox y capacidades Screen Time/VPN.

Requiere titular/cuenta del usuario: Apple Developer Program, solicitud de entitlements, certificados/accesos de App Store Connect, Google Play Console, firma/distribución, contratos fiscales/comerciales y envío final a revisión. El equipo puede preparar artefactos, listas y notas, pero no puede garantizar aprobación ni sustituir al titular, hardware o aprobación de Apple/Google.

## 7. Criterio de aprobación interna

No marcar "Listo para App Store/Google Play" hasta que todas las listas obligatorias estén completas, las pruebas físicas pasen, las declaraciones de privacidad reflejen el producto real, no haya defectos P0/P1 abiertos y el responsable autorice la presentación. La decisión final pertenece a Apple y Google.

## 8. Fuentes oficiales revisadas el 6 de noviembre de 2026

- Apple App Review Guidelines (última actualización indicada: 16 de octubre de 2026): https://developer.apple.com/app-store/review/guidelines/
- Apple: actualización de App Review Guidelines, 16 de octubre de 2026: https://developer.apple.com/news/?id=92th7e5i
- Apple Family Controls entitlement: https://developer.apple.com/documentation/FamilyControls/requesting-the-family-controls-entitlement
- Google Play Developer Program Policy: https://support.google.com/googleplay/android-developer/answer/18265346
- Google Play sensitive permissions and APIs: https://support.google.com/googleplay/android-developer/answer/16558241?hl=es
- Google Play User Data / Data safety: https://support.google.com/googleplay/android-developer/answer/10144311
- Google Play account deletion: https://support.google.com/googleplay/android-developer/answer/13327111

**Nota:** las políticas son dinámicas. Esta matriz es una puerta interna de trabajo, no asesoría legal ni garantía de aprobación.


## 6. Actualización de ejecución — 7 de noviembre de 2026

La puerta Fase A continúa aprobada en CI. Se añadieron workflows nativos para generar APK Android de QA y app iOS para simulador. El primer intento Android quedó bloqueado por licencias del SDK antes de generar APK; se autorizó su aceptación en un runner efímero y se creó un flujo Android separado. La compilación iOS superó prebuild, CocoaPods y resolución del esquema de la app, pero el resultado final de build, instalación, lanzamiento y captura seguía pendiente en la última comprobación.

El protocolo de ejecución está en [PROTOCOLO-PRIMERA-RONDA.md](PROTOCOLO-PRIMERA-RONDA.md). La matriz de pruebas sigue pendiente hasta que cada caso tenga evidencia real. Los builds de CI, aun cuando pasen, no constituyen aprobación de Apple App Review ni Google Play review; se mantienen las listas de privacidad, metadatos, permisos, compras, firma, TestFlight e internal testing.
