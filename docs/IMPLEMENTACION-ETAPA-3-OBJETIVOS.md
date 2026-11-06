# Fixora Balance — Subetapa técnica 2.3: objetivos semanales

**Fecha:** 6 de noviembre de 2026  
**Rama:** `main`  
**Estado:** objetivos locales y CI aprobados en 42308655770; Expo Doctor 20/20 y CI integral aprobados en 42312021727; prueba física y migración SQLite v1→v3 pendientes.

**Correspondencia de roadmap:** este corte técnico pertenece a la Etapa 2 estratégica. La Etapa 3 estratégica (progreso consciente, historial y recompensas) sigue pendiente.

## 1. Definición de producto

Un objetivo es un resultado medible semanal. No sustituye un hábito:
- **Objetivo:** resultado que el usuario quiere alcanzar durante la semana.
- **Hábito:** acción repetible que puede registrarse cada día.
- **Sesión de enfoque:** bloque de concentración que puede contribuir a una métrica.

La primera versión ofrece dos métricas verificables: sesiones de enfoque completadas y cumplimientos de hábitos. No se permite editar el progreso manualmente.

## 2. Alcance implementado

- `src/domain/goals/goal.ts`: entidad, métricas y validación de objetivo semanal.
- `src/domain/goals/goal.test.ts`: pruebas de creación, normalización y límites.
- `src/infrastructure/local/migrations/003_create_goals.ts`: tercera migración SQLite, con tabla, constraints e índice.
- `src/infrastructure/local/database.ts`: migración incremental local a versión 3.
- `src/infrastructure/local/goal-repository.ts`: creación y resumen semanal calculado desde datos fuente.
- `src/infrastructure/local/write-queue.ts` y su prueba: serialización de escrituras y eliminaciones de sesiones para evitar que un guardado asíncrono vuelva a insertar una sesión terminada antes de tiempo.
- `app/goals.tsx`: pantalla para crear objetivos y consultar progreso real.
- `app/index.tsx`: acceso a objetivos desde Inicio.
- `app/habits.tsx`: navegación entre hábitos y objetivos.

## 3. Reglas de medición

- Todos los objetivos son semanales y comienzan el lunes local.
- Métrica `focus_sessions`: cuenta filas de sesiones cuyo estado es `completed` y cuya última actualización (momento de finalización persistida) cae dentro de la semana local.
- Métrica `habit_completions`: cuenta check-ins únicos entre el lunes y el día local actual.
- El valor mostrado procede de SQLite; la UI no puede incrementarlo por sí sola.
- La meta admite de 1 a 100 unidades por semana.
- Los objetivos no generan XP ni recompensas todavía.
- Los objetivos y datos fuente permanecen locales; no se sincronizan a Supabase.

## 4. Seguridad y consistencia

- SQL parametrizado.
- Constraints de título, métrica, rango y timestamps.
- El progreso se deriva de sesiones/check-ins persistidos.
- Guardados y eliminaciones de sesiones se ejecutan en orden de invocación; un fallo no bloquea escrituras posteriores.
- La finalización de una sesión se reconoce por el estado de dominio `completed`; sesiones pausadas o descartadas no cuentan.
- No se añade una migración remota ni tablas de negocio a Supabase.
- La futura sincronización debe resolver identidad de usuario, zona horaria, duplicados, reversión y RLS antes de habilitar datos remotos.

## 5. Validación

- Pruebas de dominio añadidas a Vitest.
- Prueba aislada de consulta agregada en SQLite 3.46.1: métricas de sesiones y hábitos devuelven los conteos esperados y conservan los registros fuente. Esta prueba no sustituye CI ni ejecución de la migración dentro de Expo SQLite.
- CI GitHub Actions run `42308655770`: `TypeScript and domain tests` y `Local Supabase migrations and pgTAP` finalizaron `success`. Se completaron TypeScript, Vitest, bundles JavaScript Android/iOS, reconstrucción Supabase local y pgTAP. No equivale a build nativo ni a prueba física.
- Pendiente prueba física de migración desde versión 2 y desde instalación limpia.

## 6. Pendientes siguientes

1. Expo Doctor 20/20 ya pasó en 42312021727; preparar development builds y probar migraciones SQLite v1→v3 en Android/iOS físicos.
2. Probar migraciones SQLite v1→v3 conservando sesiones/hábitos.
3. Probar creación de objetivos y agregados en Android/iOS.
4. Diseñar edición/archivo de objetivos y relación opcional objetivo-hábito solo si pruebas de usuario lo justifican.
5. Diseñar historial y progreso agregado antes de XP.
6. Definir eventos de dominio e idempotencia/reversión para recompensas; no fijar puntos hasta validar que no incentiven uso compulsivo.
