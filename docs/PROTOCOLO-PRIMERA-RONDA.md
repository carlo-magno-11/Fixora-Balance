# Fixora Balance — Protocolo de primera ronda de pruebas

**Versión:** 1.0  
**Fecha:** 9 de noviembre de 2026  
**Estado:** Quality del HEAD `fc96bf69b4d7e2ef8fe49392ad629234ec9d051e` aprobado; Native QA del mismo HEAD aún no está completo. iOS Simulator seguía compilando al último chequeo y Android falló al descargar Kotlin con HTTP 504. Las pruebas funcionales de flujos y persistencia siguen pendientes.  
**Alcance:** núcleo local del MVP: Inicio/Hoy, Enfoque, Hábitos y Objetivos semanales.

Este protocolo separa pruebas automatizadas, pruebas de simulador y pruebas en dispositivos físicos. Una compilación exitosa no equivale a una prueba funcional completa ni a aprobación de App Store o Google Play.

## 1. Reglas de evidencia

Cada prueba debe registrar:
- ID y caso de prueba.
- Commit y número de build.
- Plataforma, modelo de dispositivo/simulador y versión del sistema operativo.
- Estado inicial y datos de prueba sintéticos.
- Pasos reproducibles.
- Resultado esperado y resultado observado.
- Evidencia (captura, vídeo o log) sin datos personales.
- Estado: pendiente, aprobado, fallido o bloqueado.
- Incidencia vinculada y commit correctivo, si aplica.

No marcar un caso como aprobado solo porque el código compila o porque el test unitario relacionado pasa.

## 2. Puerta 0 — artefactos

| ID | Verificación | Criterio de salida | Estado |
|---|---|---|---|
| BLD-01 | APK Android QA | APK Release no vacío, instalable y con applicationId esperado | **Bloqueado por infraestructura** — en Native QA run 42566420774, la descarga de `kotlin-compiler-embeddable:2.2.21` respondió HTTP 504. No se generó ni verificó APK para el HEAD actual. Reintento pendiente |
| BLD-02 | App iOS Simulator | Bundle .app válido con bundle identifier esperado | **Pendiente en HEAD actual** — run 42566420774 seguía en `Build iOS Simulator app` al último chequeo. El run anterior 42564303502 sí produjo un `.app` válido para un commit anterior, pero no sustituye esta ejecución |
| BLD-03 | Inicio iOS Simulator | La app se instala, abre y genera captura de pantalla funcional | **Pendiente en HEAD actual** — depende de que BLD-02 termine correctamente en run 42566420774. La evidencia anterior del run 42564303502 solo aplica a su commit histórico |
| BLD-04 | Integridad de artefactos | Descarga de artefactos desde GitHub Actions y hash registrado | **Aprobado para iOS Simulator Release** — artefacto `fixora-balance-ios-simulator-qa`, ID `13650954561`, descargado; SHA-256 local coincide con el digest GitHub `b6de503f62f4a230bd0ddde7e767a76e144c2f8996ea9d03693ef239d9eb4f1f`. ZIP incluye `.app` y captura `fixora-home-ios.png`. Retención hasta 23-nov-2026 |

## 3. Pruebas funcionales del núcleo

| ID | Área | Pasos principales | Resultado esperado | Estado |
|---|---|---|---|---|
| FOC-01 | Enfoque 15 min | Iniciar, dejar terminar y consultar historial | Una sesión completa, duración y fecha coherentes | Pendiente |
| FOC-02 | Enfoque 25 min | Iniciar, pausar, reanudar y terminar | El tiempo pausado no cuenta como enfoque | Pendiente |
| FOC-03 | Enfoque 50 min | Iniciar y finalizar | Sesión completa persistida | Pendiente |
| FOC-04 | Persistencia | Cerrar la app durante una sesión y volver a abrir | La sesión se recupera según la política de timestamps | Pendiente |
| FOC-05 | Sesión incompleta | Cancelar una sesión antes de completarla | No se contabiliza como sesión completada | Pendiente |
| HAB-01 | Crear hábito | Crear un hábito con nombre y frecuencia válida | Aparece en lista y persiste al reiniciar | Pendiente |
| HAB-02 | Check-in | Marcar hábito como completado | Resumen diario/semanal refleja el evento una sola vez | Pendiente |
| HAB-03 | Deshacer check-in | Deshacer la marca | El resumen vuelve al valor anterior sin duplicados | Pendiente |
| HAB-04 | Repetición | Intentar registrar dos veces el mismo check-in permitido | No hay duplicación accidental | Pendiente |
| GOA-01 | Crear objetivo | Crear objetivo semanal de sesiones de enfoque | Objetivo visible con meta y progreso inicial correcto | Pendiente |
| GOA-02 | Progreso enfoque | Completar sesiones asociadas | Progreso aumenta según la fuente real de datos | Pendiente |
| GOA-03 | Progreso hábitos | Completar hábitos asociados | Progreso aumenta según eventos persistidos | Pendiente |
| GOA-04 | Semana nueva | Simular o probar el límite de semana local | El cálculo respeta el inicio de semana definido y zona horaria | Pendiente |
| HOM-01 | Inicio/Hoy | Abrir Inicio con datos vacíos | Estados vacíos claros, sin métricas ficticias | Pendiente |
| HOM-02 | Inicio/Hoy | Crear objetivos, hábitos y sesiones | Tarjetas muestran valores reales y se actualizan al volver | Pendiente |
| HOM-03 | Error de datos | Forzar error de lectura local | Mensaje y acción de reintento; no muestra éxito falso | Pendiente |

## 4. Persistencia, migraciones y resiliencia

| ID | Verificación | Criterio de salida | Estado |
|---|---|---|---|
| DB-01 | Instalación limpia | SQLite se crea en la versión esperada y tablas/índices existen | Pendiente |
| DB-02 | Migración v1→v3 | Datos de sesiones preexistentes se conservan tras migrar | Pendiente |
| DB-03 | Migración v2→v3 | Hábitos y datos previos se conservan; migración repetida no duplica | Pendiente |
| DB-04 | Escrituras concurrentes | Guardar y borrar rápidamente no resucita registros borrados | Pendiente |
| DB-05 | Cierre forzado | Cerrar durante escritura y reabrir no corrompe la base | Pendiente |
| DB-06 | Sin conexión | El núcleo local funciona en modo avión | Pendiente |
| DB-07 | Actualización | Instalar versión nueva sobre versión previa conserva datos | Pendiente |
| DB-08 | Zona horaria | Cambiar zona horaria no altera eventos históricos de forma inesperada | Pendiente |

## 5. Interfaz, accesibilidad y estabilidad

| ID | Verificación | Criterio de salida | Estado |
|---|---|---|---|
| UX-01 | Contraste | Texto normal y componentes cumplen WCAG AA aplicable | Pendiente |
| UX-02 | Texto grande | La interfaz admite escalado sin cortar acciones críticas | Pendiente |
| UX-03 | VoiceOver | Orden de lectura, etiquetas y controles son utilizables | Pendiente |
| UX-04 | TalkBack | Orden de lectura, etiquetas y controles son utilizables | Pendiente |
| UX-05 | Áreas táctiles | Controles principales son cómodos y no se solapan | Pendiente |
| UX-06 | Teclado | Formularios siguen visibles y utilizables con teclado abierto | Pendiente |
| UX-07 | Orientación y tamaños | No hay desbordamientos en tamaños soportados | Pendiente |
| UX-08 | Reduce Motion | No hay animaciones esenciales que ignoren la preferencia del sistema | Pendiente |
| STB-01 | Lanzamiento repetido | Abrir/cerrar repetidamente no produce crash | Pendiente |
| STB-02 | Background/foreground | Cambiar de app y regresar no pierde estado persistido | Pendiente |
| STB-03 | Memoria y batería | No se observa consumo anómalo durante una sesión típica | Pendiente |

## 6. Matriz de dispositivos

Primera ronda:
- iOS Simulator: al menos un iPhone de tamaño estándar y una versión actual del runtime.
- Android Emulator: al menos un perfil Pixel/AOSP con API objetivo del build.
- iPhone físico: versión mínima elegida y versión actual disponible.
- Android físico: un dispositivo Pixel/AOSP o equivalente; ampliar después a Samsung y Xiaomi.

La lista de modelos/versiones reales se completará cuando se confirme qué dispositivos están disponibles. No asumir compatibilidad física a partir de simuladores.

## 7. Puerta de salida de la primera ronda

La primera ronda se considera aprobada solo cuando:
1. BLD-01 a BLD-04 tienen evidencia.
2. Todos los casos críticos FOC, HAB, GOA y HOM pasan en al menos un simulador por plataforma.
3. DB-01 a DB-08 se verifican en el entorno correspondiente, sin pérdida de datos.
4. Los bloqueos de accesibilidad/estabilidad críticos se resuelven o se documentan con decisión explícita.
5. Se repiten pruebas críticas tras los commits correctivos.

La prueba física, el TestFlight, Google Play Internal Testing y la revisión de tienda son puertas posteriores. Ninguna aprobación de CI debe presentarse como aprobación de Apple o Google.


## 8. Evidencia de revisión visual — 9 de noviembre de 2026

Artefacto: workflow run `42564303502`, commit `e0c3e868e3874f82819e6b88d009e98f9a80131b`, iOS Simulator Release.

- Se descargó el artefacto de GitHub Actions y se verificó localmente el SHA-256 contra el digest publicado por GitHub.
- La captura muestra la pantalla inicial: identidad Fixora Balance, fondo marfil, acento vino, verde para acción primaria, encabezado de bienvenida y tarjeta de Enfoque con 25 minutos seleccionados.
- La jerarquía visual es legible en el tamaño capturado y el botón principal tiene una presencia clara. No se observa en esta única captura evidencia suficiente para evaluar scroll completo, tamaños dinámicos, VoiceOver, TalkBack, contraste medido o estados de error.
- La parte inferior de la captura corta el comienzo de la siguiente sección porque la pantalla continúa desplazándose; no se registra como defecto por sí solo.
- Esta revisión es visual, no funcional. No se marcaron como aprobados FOC/HAB/GOA/HOM ni DB-01 a DB-08.

Evidencia binaria: artefacto `fixora-balance-ios-simulator-qa` (ID `13650954561`), captura `fixora-home-ios.png`.

## 9. Actualización de la ronda nativa — 9 de noviembre de 2026

Commit evaluado: `fc96bf69b4d7e2ef8fe49392ad629234ec9d051e`.

- Quality run [42566420781](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42566420781): **success**. Pasaron TypeScript, pruebas de dominio, auditoría de dependencias, Expo Doctor, validación de configuración, smoke test SQLite, bundles Android/iOS y Supabase local/pgTAP.
- Native QA run [42566420774](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42566420774): Android **failure** al descargar `kotlin-compiler-embeddable:2.2.21` por HTTP 504; el log no muestra un error de código de la app, pero no existe APK verificable para este commit. iOS seguía en compilación en el último chequeo; no se marca como aprobado.
- La prueba SQLite de Python ejecuta el DDL en SQLite del sistema y verifica estáticamente el código de inicialización. No ejecuta el módulo nativo Expo SQLite. Las pruebas Vitest del guard validan la función pura, no el comportamiento de una conexión nativa.
- No se aprobaron FOC/HAB/GOA/HOM ni DB-01 a DB-08 a partir de CI o de capturas históricas.

Enlaces: [Quality](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42566420781) · [Native QA](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42566420774).


## 10. Evidencia iOS y bloqueo Android — 9 de noviembre de 2026

HEAD evaluado: `4b0977e85e3d844b8527555bf051477ac576fc17`.

- [Native QA run 42567673242](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42567673242): iOS Simulator Release **aprobado como build + instalación + arranque + captura**. Artefacto `fixora-balance-ios-simulator-qa` (ID `13653116425`) contiene `.app` y `fixora-home-ios.png`.
- Android Release QA **no aprobado**: `assembleRelease` no pudo resolver `kotlin-compiler-embeddable` 2.2.21 y 2.2.0 por HTTP 504. No se generó APK, por lo que no se ejecutan BLD Android de instalación/arranque.
- El artefacto/captura iOS se inspeccionó: Inicio se muestra y el temporizador presenta 25:00. Esta inspección no marca FOC/HAB/GOA/HOM como aprobados.
- El smoke test SQLite existente no equivale a integración Expo SQLite. DB-01 a DB-08 siguen pendientes de verificación nativa/funcional según corresponda.
- Se añadió cache Gradle OSS al workflow; nuevo HEAD `648a5e3d9181916bd1bf89d68339f9a573b8402d`. Sus runs de Quality y Native QA están en curso y deben revisarse antes de actualizar estados.

La ronda no se considera aprobada hasta obtener Android Release reproducible, completar integración SQLite nativa, recorrer los flujos críticos en ambos simuladores y validar dispositivos físicos disponibles.
