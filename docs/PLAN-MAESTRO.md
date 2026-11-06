# Fixora Balance — Plan maestro del producto

**Versión:** 1.0  
**Fecha:** 6 de noviembre de 2026  
**Marca matriz:** Fixora Dynamics  
**Repositorio:** carlo-magno-11/Fixora-Balance  
**Estado:** implementación inicial del núcleo de enfoque en curso; la primera vertical slice está escrita pero aún no validada en ejecución.

---

## 1. Resumen ejecutivo

Fixora Balance será una aplicación de bienestar digital, enfoque, hábitos, privacidad y protección familiar. No debe limitarse a bloquear aplicaciones ni convertirse en otra fuente de distracción. Su propuesta es ayudar a las personas a decidir cómo quieren usar la tecnología, sostener objetivos realistas y crear entornos digitales más saludables.

La estrategia es construir una plataforma modular con una experiencia personal coherente. El núcleo debe funcionar por sí mismo; después, el usuario podrá ampliar su experiencia con módulos individuales o un paquete integral. El acceso se administrará mediante una capa central de derechos (entitlements/licencias), no mediante condiciones visuales ni banderas locales del cliente.

### Propuesta de valor
- Recuperar tiempo de atención sin demonizar el uso de tecnología.
- Construir hábitos digitales saludables con acompañamiento empático.
- Aplicar límites y bloqueos configurables y proporcionales.
- Proteger a menores y familias con controles transparentes.
- Reducir rastreadores, dominios maliciosos y publicidad basada en dominios cuando la plataforma lo permita.
- Permitir que el usuario empiece gratis, pruebe funciones premium y amplíe solo lo que necesita.

### Diferenciación buscada
Combinar bienestar y enfoque contextual, hábitos y progreso no punitivo, protección familiar comprensible, privacidad y filtrado, y compras modulares claras. Esta diferenciación es una hipótesis que debe validarse con entrevistas, pruebas de prototipo, retención y conversión; no se considera ventaja demostrada todavía.

---

## 2. Problema y oportunidad

La distracción digital no se resuelve siempre con un bloqueo rígido. Puede relacionarse con hábitos, cansancio, estrés, falta de objetivos, diseño persuasivo de aplicaciones o necesidades reales de trabajo y estudio.

Un bloqueador puro puede interrumpir actividades útiles, crear frustración, ser desactivado cuando más se necesita apoyo y no ayudar a construir alternativas saludables.

Fixora Balance debe ofrecer fricción gradual y acompañamiento, con controles explícitos y sin culpabilizar. No se presentará como terapia ni sustituirá atención profesional.

---

## 3. Pilares funcionales

### 3.1 Bienestar y enfoque
- Sesiones de concentración configurables.
- Horarios y límites por aplicación/categoría, según capacidades del SO.
- Pausas conscientes y recordatorios.
- Objetivos personales y rutinas.
- Estadísticas útiles: cumplimiento de metas, tendencias y distribución de tiempo, evitando juicios morales.
- Modos progresivos:
  - Suave: recordatorio contextual.
  - Moderado: pausa o espera antes de abrir.
  - Estricto: bloqueo en horarios o sesiones.
  - Profundo: fricción reforzada y autorización/demora configurable.
  - Familiar: política administrada por tutor.
- Excepciones para emergencias, llamadas, contactos prioritarios y aplicaciones esenciales.

### 3.2 Progreso consciente y gamificación
- XP por cumplir objetivos elegidos, no por reducir indiscriminadamente el tiempo de pantalla.
- Misiones cortas, insignias y niveles.
- Rachas flexibles y recuperación después de pausas.
- Compañero/mascota y cosméticos opcionales.
- Desafíos personales y metas realistas.
- Opción para desactivar gamificación.

Reglas anti-daño:
- No perder todo el progreso por fallar un día.
- No usar cajas de botín, apuestas, recompensas aleatorias pagadas ni mecánicas manipuladoras.
- No premiar estar constantemente dentro de Fixora.
- No convertir estadísticas en vergüenza o presión.
- Las notificaciones deben ayudar a cerrar la app, no provocar aperturas repetidas.

### 3.3 Protección familiar
- Grupo familiar con tutor/administrador y perfiles.
- Reglas por perfil, edad orientativa y dispositivo.
- Horarios, categorías de contenido y listas permitidas/bloqueadas.
- Solicitud de permiso para instalar/usar aplicaciones, solo donde el SO lo permita.
- Resúmenes y alertas configurables.
- Excepciones de emergencia y acceso a servicios esenciales.
- Información visible para los menores sobre qué controles están activos.

Edades orientativas de configuración (no categorías legales universales): 5–8, 9–12, 13–15 y 16–17; el tutor podrá ajustar reglas. Antes del lanzamiento se requiere revisión legal de privacidad infantil, consentimiento y obligaciones de cada mercado.

No prometer detección total de imágenes, videos, mensajes privados o contenido dentro de redes sociales; control total de todas las aplicaciones; vigilancia secreta ni lectura de mensajes/teclas; ni bloqueos imposibles de evadir.

### 3.4 Privacidad y navegación limpia
- Filtrado DNS por categorías: dominios adultos, apuestas, malware, phishing, rastreadores y listas personalizadas.
- SafeSearch cuando sea compatible.
- Protección de navegador mediante integraciones compatibles.
- Listas y excepciones familiares.
- Explicación de qué se filtra y cómo desactivarlo cuando el usuario tenga autoridad.

Límite técnico: DNS puede bloquear muchos dominios publicitarios y rastreadores, pero no puede retirar de forma fiable anuncios servidos desde el mismo dominio que el contenido (por ejemplo, ciertos anuncios integrados en plataformas de video o redes sociales). Nunca vender “bloqueo del 100 % de anuncios”.

### 3.5 Acompañamiento inteligente
- Mensajes empáticos y configurables.
- Horarios de silencio y límite de frecuencia.
- Notificaciones suspendidas durante sesiones de enfoque.
- Recordatorios de descanso y objetivos.
- Recomendaciones basadas en datos mínimos y señales locales cuando sea posible.
- Sin culpa, amenazas, afirmaciones de actividad no verificada ni perfiles publicitarios.

---

## 4. Usuarios y modos de uso

1. Persona que desea concentrarse y administrar hábitos.
2. Estudiante o profesional que necesita sesiones y límites.
3. Familia que desea filtros y reglas transparentes.
4. Usuario preocupado por rastreadores, dominios maliciosos y anuncios.
5. Usuario que comienza con funciones gratuitas y compra solo módulos que necesita.

No diseñar una sola experiencia que trate a todos como niños ni imponer controles parentales sobre adultos.

---

## 5. Producto modular y experiencia gratuita

La aplicación se organizará en módulos funcionales y derechos de acceso independientes. El usuario podrá usar una base gratuita útil, comprar un módulo individual, añadir otro módulo posteriormente, cambiar a un paquete integral, conservar los derechos que ya pagó al ampliar y restaurar compras al cambiar de dispositivo o reinstalar.

La matriz exacta de productos, prueba de 14 días, extensiones y reglas de prorrateo está en MONETIZACION-Y-LICENCIAS.md.

---

## 6. Arquitectura técnica propuesta

### 6.1 Principio
El motor de dominio decide las políticas; adaptadores nativos ejecutan las capacidades permitidas por cada sistema operativo. La interfaz no debe contener lógica crítica de permisos, licencias, cobros ni seguridad.

### 6.2 Stack propuesto
- Aplicación: React Native + Expo + TypeScript estricto.
- Navegación: Expo Router.
- Android: Kotlin para capacidades nativas.
- iOS: Swift para capacidades nativas.
- Backend: Supabase (Auth, PostgreSQL, RLS, Edge Functions).
- Datos locales: SQLite.
- Secretos del dispositivo: Keychain/Android Keystore.
- Estado remoto: TanStack Query.
- Estado de interfaz: Zustand, limitado a UI.
- Validación: Zod.
- Pruebas: Vitest, pruebas nativas, integración y E2E.
- CI: GitHub Actions.

Expo Go no será suficiente para capacidades nativas de bloqueo, Screen Time o VPN. Se necesitarán development builds, módulos nativos y posiblemente config plugins. No diseñar suponiendo que todo puede resolverse en JavaScript.

### 6.3 Estructura objetivo

~~~text
fixora-balance/
├── apps/
│   ├── mobile/
│   └── admin/
├── packages/
│   ├── core-domain/
│   ├── focus-engine/
│   ├── habit-engine/
│   ├── reward-engine/
│   ├── notification-engine/
│   ├── family-engine/
│   ├── protection-engine/
│   ├── entitlement-engine/
│   ├── platform-contracts/
│   ├── ui/
│   └── shared-config/
├── native/
│   ├── android/
│   └── ios/
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── tests/
├── docs/
└── tests/
    ├── integration/
    ├── e2e/
    └── security/
~~~

Es una estructura objetivo, no una obligación de crear todas las carpetas desde el primer día. Se adoptará cuando el diseño de módulos y dependencias esté validado.

### 6.4 Capacidades por plataforma

**iOS**
- Investigar y validar FamilyControls, ManagedSettings y DeviceActivity.
- La distribución de capacidades de Screen Time depende de entitlement/aprobación de Apple y autorización del usuario/tutor.
- Evaluar Network Extension para filtrado de red; revisar entitlement y restricciones.
- No asumir que una app de consumo puede aplicar administración empresarial.

**Android**
- UsageStatsManager para datos de uso con permiso.
- AccessibilityService solo si la función cumple políticas y justificación permitida; no usarlo como atajo para vigilancia.
- VpnService para filtrado DNS/local cuando proceda, con consentimiento y políticas de Google Play.
- DevicePolicyManager/Lock Task solo para escenarios de dispositivo administrado/dedicado; no equivale a control total en un teléfono personal.

Cada capacidad tendrá una ficha con API, permisos, versiones, fabricantes, límites, consumo de batería, política de tienda, alternativa degradada y pruebas físicas.

---

## 7. Backend, identidad y derechos de acceso

### 7.1 Principios
- El backend es la autoridad de los derechos comprados.
- El cliente nunca se concede premium por cambiar una variable local.
- Nunca incluir claves privilegiadas/service role en la aplicación.
- RLS en tablas expuestas.
- MFA para administración.
- Auditoría de cambios de productos, precios, licencias y excepciones.
- Las compras y derechos deben sobrevivir a reinstalaciones.
- Separar cuenta, grupo familiar, dispositivo, compra, suscripción y derecho.

### 7.2 Componentes de dominio
Identidad y perfiles; grupos familiares y miembros; dispositivos y sesiones autorizadas; catálogo comercial y versiones de precios; transacciones y eventos de proveedores; suscripciones y períodos; derechos por módulo; pruebas promocionales y elegibilidad; extensiones y cambios de paquete; reembolsos, contracargos y disputas; registro de auditoría y soporte.

### 7.3 Fuente de verdad
El estado local puede mantener una copia temporal para funcionamiento offline, pero debe tener caducidad, renovarse con backend, no crear derechos ni extender fechas, degradarse de forma segura si no puede verificarse y respetar períodos de gracia autorizados. No bloquear funciones esenciales de emergencia.

---

## 8. Seguridad y privacidad

### 8.1 Minimización
No recopilar conversaciones, teclas, fotos, mensajes privados ni historial completo de navegación. Mantener datos detallados de uso en el dispositivo cuando sea posible; sincronizar únicamente lo necesario para funciones solicitadas.

### 8.2 Controles
- OWASP MASVS y MASTG para seguridad móvil.
- OWASP ASVS para backend/web.
- Threat modeling antes de implementar permisos sensibles.
- Validación de webhooks y firmas.
- Idempotencia y protección contra repetición de eventos.
- Rate limits, control de abuso y registro de auditoría.
- Gestión segura de secretos.
- Pruebas de RLS, autorización y escalada de privilegios.
- Exportación y borrado de datos.
- Política de retención definida.
- Proceso de respuesta a incidentes y vulnerabilidades.

### 8.3 Protección infantil
La protección infantil requiere evaluación legal y de tiendas antes de recopilar datos o lanzar perfiles infantiles. Aplicar privacidad por defecto, transparencia, consentimiento parental donde corresponda y retención mínima. No usar datos infantiles para publicidad.

---

## 9. Modelo comercial resumido

- Free: núcleo básico de enfoque, pausas y objetivos; suficiente para probar el valor real.
- Plus: experiencia personal avanzada de enfoque, hábitos, estadísticas y personalización.
- Protección Personal: filtrado y privacidad ampliados, cuando la capacidad técnica esté validada.
- Family: perfiles, reglas y protección familiar para un número definido de miembros/dispositivos.
- Balance Completo: paquete con todos los módulos comerciales elegibles.
- Extensiones: módulos adicionales o capacidad adicional; no vender derechos que la plataforma no pueda cumplir.

El catálogo será modular, pero el acceso se resolverá por derechos atómicos y un ledger central. El usuario no debe pagar dos veces por el mismo derecho en el mismo período. No ofrecer “de por vida” para funciones con costes continuos de servidores, listas de filtrado o mantenimiento sin evaluación financiera.

Los precios piloto de la propuesta comercial han sido aceptados como base inicial de trabajo. No son definitivos ni están publicados. Antes de abrir ventas se validarán unit economics, impuestos, comisiones, margen, proveedor y disposición de pago.

---

## 10. Métricas

- Activación: usuarios que configuran y completan una primera sesión útil.
- Retención a 7/30/90 días.
- Sesiones completadas y objetivos cumplidos.
- Uso de pausas y límites con baja tasa de desactivación frustrada.
- Conversión de prueba a pago, separada por plataforma y paquete.
- Cancelaciones, reembolsos y contracargos.
- Ingresos netos después de comisiones, impuestos, reembolsos y soporte.
- Fallos de restauración y discrepancias de derechos.
- Batería, estabilidad y tasa de permisos denegados.
- Incidentes de privacidad/seguridad.

No medir el éxito solo por minutos dentro de la aplicación ni por notificaciones abiertas.

---

## 11. Roadmap y puertas de salida

### Etapa 0 — Definición (actual)
Producto, usuarios, propuesta de valor y límites; modelo de compra y prueba; investigación de APIs y políticas; arquitectura, seguridad y privacidad.

**Salida:** decisiones centrales documentadas y riesgos críticos visibles.

### Etapa 1 — Validación UX y técnica
Entrevistas y prototipo; pruebas de usabilidad; viabilidad de APIs nativas en dispositivos reales; diseño de pantallas de compra; pruebas sandbox de compra/restauración sin cobrar usuarios.

**Salida:** demostrar permisos, flujo de compra, restauración y derechos antes de construir el producto completo.

### Etapa 2 — Núcleo de bienestar
Onboarding, objetivos, sesiones, pausas, horarios y estadísticas básicas; persistencia local y sincronización opcional; notificaciones controlables.

### Etapa 3 — Progreso consciente
XP, misiones, insignias, compañero y rachas flexibles; pruebas para evitar patrones compulsivos.

### Etapa 4 — Protección y familia
Filtrado DNS, perfiles, reglas y controles parentales; revisión de privacidad infantil y políticas de tiendas; compatibilidad por fabricante y consumo de batería.

### Etapa 5 — Comercialización y lanzamiento
Compras reales por plataforma; webhooks, conciliación, soporte, reembolsos y contracargos; auditoría de seguridad y privacidad; pruebas físicas y publicación.

No fijar fechas hasta medir complejidad real de permisos nativos y validación en dispositivos.

---

## 12. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| APIs o entitlements no aprobados | Prototipo nativo temprano y plan degradado |
| Bloqueo inconsistente entre fabricantes | Matriz de dispositivos y pruebas físicas |
| Consumo de batería | Medición desde prototipo y límites de frecuencia |
| Falsos positivos en DNS | Categorías transparentes, excepciones y soporte |
| Publicidad integrada no bloqueable | No prometer 100 % |
| Abuso de pruebas gratuitas | Una prueba integral por cuenta comercial y señales antiabuso proporcionales |
| Cobros duplicados o derechos incorrectos | Ledger, webhooks idempotentes y conciliación |
| Políticas de tienda cambiantes | Revisión antes de cada lanzamiento |
| Exceso de alcance | Lanzar primero el núcleo de bienestar |
| Datos sensibles | Minimización, procesamiento local y retención corta |

---

## 13. Criterios para aceptar cambios al plan

Un cambio se acepta cuando resuelve un problema real o reduce un riesgo medible; tiene evidencia o hipótesis explícita y método para validarla; no contradice políticas ni leyes aplicables; no degrada privacidad/seguridad sin mitigación; documenta impacto en arquitectura, precio, UX, soporte y roadmap; y no presenta hipótesis como hecho.

Cada decisión importante debe registrarse en REGISTRO-DE-DECISIONES.md.

---

## 14. Fuentes principales

- Documento del usuario sobre Opal: punto de partida sobre atención, bloqueo, gamificación y oportunidad; no evidencia auditada de rentabilidad.
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Google Play Payments policy: https://support.google.com/googleplay/android-developer/answer/9858738
- Apple Family Controls: https://developer.apple.com/documentation/familycontrols
- Expo development builds: https://docs.expo.dev/develop/development-builds/introduction/
- OWASP MASVS: https://mas.owasp.org/MASVS/
- OWASP MASTG: https://mas.owasp.org/MASTG/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- AdGuard Home DNS limitations: https://github.com/AdguardTeam/AdGuardHome/wiki/Hosts-Blocklists
- RevenueCat entitlements: https://www.revenuecat.com/docs/getting-started/entitlements
- RevenueCat products and offerings: https://www.revenuecat.com/docs/projects/configuring-products

Las políticas y tarifas cambian. Volver a verificar fuentes oficiales antes de implementar o publicar.


## 15. Actualización comercial y decisión de repositorio — 6 de noviembre de 2026

La propuesta de precios piloto se encuentra en [PROPUESTA-COMERCIAL-Y-PRECIOS.md](PROPUESTA-COMERCIAL-Y-PRECIOS.md). Valores propuestos para validar en México: Plus Personal $79 MXN/mes o $799/año; Protección Personal $49/mes o $499/año; Family $109/mes o $1,099/año; Balance Completo $179/mes o $1,799/año; extensión de tres dispositivos $29/mes o $299/año. **Precios piloto aprobados como base de trabajo por el responsable del producto; no son precios definitivos ni están publicados.** Antes de publicar se validarán disposición de pago, coste real, impuestos, tarifas de proveedor y límites técnicos.

La prueba recomendada es una sola prueba de 14 días de Balance Completo por cuenta elegible y canal de compra, con método de pago cuando el proveedor lo requiera, consentimiento explícito de renovación, precio posterior visible y sin reinicios por añadir módulos.

La arquitectura comercial debe separar productos/SKUs, derechos atómicos, transacciones, suscripciones y asignación a cuentas/dispositivos. El backend mantiene el ledger y verifica eventos del proveedor. El cliente nunca concede acceso premium.

**Restricción multiplataforma:** no asumir que la venta modular recurrente se implementa igual en web, iOS y Android. Apple limita a una suscripción activa por grupo y requiere diseño de niveles; las combinaciones modulares deben probarse en Sandbox para evitar dobles cobros. Google Play Billing también debe probarse con su ciclo de vida. La web puede ofrecer el catálogo más flexible, sujeto a políticas de tienda al mostrar/permitir compras externas.

**Repositorio:** se mantiene público por ahora para aprovechar runners estándar gratuitos de GitHub Actions y facilitar revisiones. Esto solo es aceptable mientras se publique contenido no sensible, se decida la licencia y se verifiquen escaneo de secretos, dependencias, permisos de Actions y protección de ramas. La política está en [SEGURIDAD-REPOSITORIO-PUBLICO.md](SEGURIDAD-REPOSITORIO-PUBLICO.md). No se ha auditado aún toda la configuración de Settings.

El alcance del primer MVP y sus criterios están en [ALCANCE-MVP-Y-CRITERIOS-ACEPTACION.md](ALCANCE-MVP-Y-CRITERIOS-ACEPTACION.md). La matriz SKU→derechos está en [MATRIZ-CATALOGO-ENTITLEMENTS.md](MATRIZ-CATALOGO-ENTITLEMENTS.md). La viabilidad por sistema operativo se documenta en [MATRIZ-CAPACIDADES-NATIVAS.md](MATRIZ-CAPACIDADES-NATIVAS.md); el diseño lógico en [MODELO-DATOS-Y-ARQUITECTURA.md](MODELO-DATOS-Y-ARQUITECTURA.md); la estrategia Supabase/migraciones en [ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md](ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md); y los riesgos en [THREAT-MODEL-INICIAL.md](THREAT-MODEL-INICIAL.md).

La puerta de preparación y bloqueos previos al código se mantiene en [PUERTA-PREPROGRAMACION.md](PUERTA-PREPROGRAMACION.md). La bitácora viva se mantiene en [ESTADO-Y-BITACORA.md](ESTADO-Y-BITACORA.md). Toda redirección sustancial debe actualizar este plan y el registro de decisiones antes de implementarse.


## 15. Ejecución inicial — 6 de noviembre de 2026

Se inició la primera vertical slice en `main`: scaffold Expo SDK 58/React Native 0.88, layout Expo Router, temporizador de enfoque con estados explícitos, dominio TypeScript puro, persistencia local SQLite versionada y pruebas de dominio. Se agregó workflow inicial de TypeScript y pruebas. Los detalles y límites están en [IMPLEMENTACION-ETAPA-1.md](IMPLEMENTACION-ETAPA-1.md).

El proyecto Supabase dedicado ya existe en la organización Free `Fixora-Balance`, ref `emacfszktufyqtfgzunl`, región `us-east-1`, PostgreSQL 17.11. El esquema de negocio público está vacío. Se aplicó una migración de hardening de permisos al event trigger automático de RLS; el Security Advisor quedó sin hallazgos después de verificar permisos y registro del event trigger.

**No está terminada la etapa:** faltan instalación/lockfile, ejecución de typecheck y pruebas, Expo Doctor, builds y validación en dispositivos físicos. Auth, perfiles, sincronización, hábitos, recompensas y compras siguen pendientes. Family/Protection y bloqueo nativo siguen fuera del MVP hasta validar APIs, permisos y requisitos legales.


---

## 16. Dirección visual y experiencia de usuario — 6 de noviembre de 2026

Se incorpora [SISTEMA-DISENO-UX.md](SISTEMA-DISENO-UX.md) como guía de diseño del producto. La dirección propuesta es **calma activa**: superficies cálidas, jerarquía editorial, acciones claras, progreso no punitivo y una identidad propia.

La colorimetría v0.1 formaliza los colores ya presentes en el prototipo: borgoña como firma de marca, verde bosque como acción principal, crema como base y dorado como acento de reconocimiento. Se añadieron tokens TypeScript y la pantalla inicial empezó a consumirlos. Esta propuesta no se considera identidad final hasta validar contraste, accesibilidad y pruebas visuales en dispositivos.

La investigación de componentes open source recomienda adoptar patrones y arquitectura de tokens de react-native-reusables, gluestack-ui, Shopify Restyle y Wix React Native UI Lib, pero evitar una migración de estilo o dependencia completa en esta etapa. La implementación inicial seguirá con React Native StyleSheet y componentes propios, sin sumar NativeWind/Uniwind por ahora.

**Siguiente puerta UX:** separar componentes reutilizables, rediseñar Inicio/Hoy, definir navegación solo para módulos con contenido real y probar accesibilidad/contraste antes de ampliar el alcance funcional.


---

## 17. Implementación etapa 2 — hábitos locales — 6 de noviembre de 2026

Se añadió la primera vertical slice de hábitos locales, documentada en [IMPLEMENTACION-ETAPA-2-HABITOS.md](IMPLEMENTACION-ETAPA-2-HABITOS.md). El usuario puede crear hábitos diarios o semanales, definir metas de 1–7 cumplimientos semanales, marcar/deshacer el cumplimiento de hoy y consultar el conteo de la semana. Los datos permanecen en SQLite y no se sincronizan todavía.

La base local avanza de versión 1 a 2 con migración incremental; la migración nueva crea tablas `habits` y `habit_completions`, constraints, índices y unicidad por hábito/día. Se añadieron reglas puras y pruebas Vitest, primeros componentes compartidos con tokens y acceso desde Inicio.

Se corrigió además el reinicio de una sesión de enfoque para eliminar su fila persistida, evitando que reaparezca al reabrir la aplicación.

**Límites:** no hay XP, rachas, insignias, objetivos ni sincronización remota en esta etapa. La ejecución CI posterior a estos cambios y la prueba SQLite en dispositivo aún deben confirmarse. La siguiente puerta es validar CI y migración local desde instalaciones existentes antes de avanzar a progreso/recompensas o diseñar la migración Supabase con RLS.


---

## 18. Investigación de hábitos y progreso consciente — 6 de noviembre de 2026

Se incorpora [INVESTIGACION-HABITOS-PROGRESO.md](INVESTIGACION-HABITOS-PROGRESO.md), basada en inspección de repositorios GitHub de referencia. Loop Habit Tracker (10,395 estrellas observadas, GPL-3.0) aporta conceptos de frecuencia flexible y progreso no destructivo; Habitica (14,294 estrellas observadas, licencia reportada NOASSERTION) aporta separación conceptual entre hábitos, tareas y recompensas. No se copiará código ni assets de esos repositorios.

La decisión de producto es evitar una mecánica punitiva de rachas. Un descanso no resta puntos ya ganados; las metas se evalúan contra el objetivo elegido por el usuario; XP debe ser opcional y desactivable.

Antes de programar XP/insignias deben definirse eventos fuente verificables, identidad idempotente, reversión de check-ins, zona horaria, reconciliación offline y recalculabilidad de saldos. No se fijan valores de puntos ni niveles todavía.


---

## 19. Implementación etapa 3 — objetivos semanales — 6 de noviembre de 2026

Se añade [IMPLEMENTACION-ETAPA-3-OBJETIVOS.md](IMPLEMENTACION-ETAPA-3-OBJETIVOS.md). Un objetivo se define como resultado semanal medible, distinto de un hábito (acción repetible) y de una sesión de enfoque (bloque de concentración).

La primera versión permite medir sesiones completadas o check-ins de hábitos. El progreso se calcula desde registros SQLite y no se puede editar manualmente. Se añadió dominio, pruebas, migración local 003, repositorio, pantalla `/goals` y accesos desde Inicio y Hábitos. La base local pasa a versión 3 sin borrar sesiones ni hábitos.

No se implementan XP, rachas, insignias ni sincronización remota. La siguiente puerta es CI y prueba física de actualización SQLite v1→v3; después se diseña historial/eventos antes de gamificación.
