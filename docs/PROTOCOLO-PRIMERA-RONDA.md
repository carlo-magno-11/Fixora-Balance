# Fixora Balance — Protocolo de primera ronda de pruebas

**Versión:** 1.0  
**Fecha:** 7 de noviembre de 2026  
**Estado:** preparado; pruebas funcionales pendientes de artefactos nativos y ejecución en simuladores/dispositivos.  
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
| BLD-01 | APK Android debug | Archivo no vacío, instalable y con applicationId esperado | **Pendiente** — intento inicial detenido por licencia SDK; workflow Android con aceptación autorizada preparado, falta evidencia de ejecución |
| BLD-02 | App iOS Simulator | Bundle .app válido con bundle identifier esperado | **Aprobado** — run 42398660326; bundle ID `com.fixoradynamics.balance` verificado |
| BLD-03 | Inicio iOS Simulator | La app se instala, abre y genera captura de pantalla | **En curso** — run 42398660326; paso de instalación/lanzamiento/captura aún activo |
| BLD-04 | Integridad de artefactos | Descarga de artefactos desde GitHub Actions y hash registrado | Pendiente |

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
