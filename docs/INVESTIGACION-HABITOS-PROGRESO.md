# Fixora Balance — Investigación de hábitos y progreso consciente

**Fecha:** 6 de noviembre de 2026  
**Estado:** investigación y propuesta de diseño; no implementa XP, rachas ni recompensas.  
**Propósito:** informar la siguiente etapa sin copiar código de terceros ni convertir la app en una fuente de presión.

## 1. Repositorios investigados en GitHub

| Proyecto | Estrellas observadas | Licencia reportada por GitHub | Uso de la investigación |
|---|---:|---|---|
| [Loop Habit Tracker — iSoron/uhabits](https://github.com/iSoron/uhabits) | 10,395 | GPL-3.0 | Referencia de flexibilidad de frecuencia, registro histórico y score de hábito |
| [Habitica — HabitRPG/habitica](https://github.com/HabitRPG/habitica) | 14,294 | NOASSERTION | Referencia conceptual de separar hábitos, tareas diarias, pendientes y recompensas |

Conteos y metadatos consultados el 6 de noviembre de 2026; pueden cambiar.

### 1.1 Loop Habit Tracker

Se inspeccionaron README, `Habit.kt`, `Frequency.kt`, `Score.kt` y pruebas de puntuación.

Observaciones útiles:
- Modela frecuencia como una razón numerador/denominador, no únicamente como “diario” o “semanal”.
- Su documentación pública describe horarios flexibles, por ejemplo varias repeticiones en una semana o días alternos.
- El score suaviza la evolución con el historial: una omisión no destruye automáticamente el progreso previo.
- Mantiene separación entre entidad de hábito, frecuencia, entradas, puntuación y rachas.

**Límite de reutilización:** el repositorio declara GPL-3.0. No copiar ni adaptar su código, fórmula, tests o implementación visual dentro de Fixora Balance sin un análisis formal de compatibilidad de licencia y aprobación. Esta investigación se limita a conceptos de producto y separación de responsabilidades.

### 1.2 Habitica

Se inspeccionó el modelo de tareas y la clasificación de tipos `habit`, `daily`, `todo` y `reward`.

Observaciones útiles:
- Distinguir una acción repetible de una tarea con fecha o una recompensa evita mezclar conceptos.
- La recompensa debe ser una capa separada de la fuente de actividad.
- La gamificación es una decisión de experiencia y no debe dictar el modelo base de hábitos.

**Límite de reutilización:** GitHub reporta licencia `NOASSERTION`; no se reutilizará código ni assets. Se toma únicamente la separación conceptual como referencia de diseño.

## 2. Decisión de producto recomendada

Adoptar **progreso consciente**, no una mecánica de “no rompas la cadena”.

1. Un día de descanso o una omisión no resta puntos ya ganados.
2. No usar mensajes de culpa, alarmas insistentes, castigos ni pérdida total de racha.
3. Mostrar cumplimiento contra la meta elegida, no contra un ideal universal.
4. Permitir frecuencia flexible. La primera UI solo implementa meta semanal de 1–7; horarios por días concretos y días alternos quedan para una ampliación posterior.
5. Separar actividad fuente (sesión o check-in) de recompensas derivadas.
6. El usuario puede desactivar XP/insignias sin perder sus hábitos ni historial.
7. El éxito del producto no se medirá por minutos dentro de Fixora Balance, aperturas o notificaciones atendidas.

## 3. Modelo de eventos propuesto

Las fuentes de actividad deben ser verificables y tener identidad estable:

| Fuente | Evento candidato | Identidad idempotente | Condición |
|---|---|---|---|
| Enfoque | `focus_session_completed` | ID de sesión | La sesión alcanzó estado completed |
| Hábito | `habit_completed` | ID estable hábito + fecha local | Existe check-in persistido |
| Corrección | `source_event_reversed` | ID del evento fuente | El evento fuente fue deshecho/anulado |

No otorgar puntos por abrir la app, tocar botones repetidamente, tiempo en pantalla sin objetivo, notificaciones o datos de uso de otras aplicaciones.

### 3.1 Idempotencia y reversión

- Cada evento de progreso referencia una fuente real.
- La unicidad debe impedir que un reintento offline duplique XP.
- Deshacer un check-in debe retirar su contribución sin borrar el historial de auditoría si ya se sincronizó.
- Repetir un check-in después de deshacerlo requiere una política explícita de reactivación o nueva revisión de la fuente; no sumar puntos por reintentos.
- Los totales y niveles son proyecciones recalculables desde eventos, no la fuente de verdad.
- Los eventos remotos se validan en backend; el cliente nunca puede otorgarse derechos comerciales o alterar saldos remotos.

## 4. XP y recompensas: asuntos aún sin decisión

No se fijan puntos, umbrales, niveles, límites diarios ni catálogo de insignias en esta etapa. Antes de hacerlo se requiere:
- Definir qué significa una sesión útil y qué duraciones son elegibles.
- Definir cómo se computan hábitos con metas semanales, pausas, omisiones y cambios de zona horaria.
- Decidir si el XP local es provisional y cómo se reconcilia con sincronización.
- Probar que las recompensas no incentiven sesiones excesivas ni uso compulsivo.
- Probar accesibilidad, lenguaje y opción de desactivar gamificación.

## 5. Siguiente diseño de dominio

Antes de implementar recompensas:
1. Añadir objetivos personales y decidir si un objetivo agrupa hábitos o sesiones; evitar duplicar un hábito como objetivo.
2. Definir eventos de dominio para sesiones completadas y check-ins.
3. Especificar reversión, idempotencia y cambio de zona horaria.
4. Crear un resumen semanal derivado de datos fuente.
5. Diseñar XP como proyección opcional y recalculable.
6. Añadir tests de duplicados, deshacer, reintento offline, cambio de semana, fecha límite y usuario desactivando gamificación.

## 6. Referencias

- Loop Habit Tracker: https://github.com/iSoron/uhabits
- Modelo de frecuencia: https://github.com/iSoron/uhabits/blob/dev/uhabits-core/src/commonMain/kotlin/org/isoron/uhabits/core/models/Frequency.kt
- Modelo de puntuación: https://github.com/iSoron/uhabits/blob/dev/uhabits-core/src/commonMain/kotlin/org/isoron/uhabits/core/models/Score.kt
- Modelo de hábito: https://github.com/iSoron/uhabits/blob/dev/uhabits-core/src/commonMain/kotlin/org/isoron/uhabits/core/models/Habit.kt
- Habitica: https://github.com/HabitRPG/habitica
- Modelo de tareas Habitica: https://github.com/HabitRPG/habitica/blob/develop/website/server/models/task.js
