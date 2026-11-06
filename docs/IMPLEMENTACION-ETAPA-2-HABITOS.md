# Fixora Balance — Subetapa técnica 2.2: hábitos locales

**Fecha:** 6 de noviembre de 2026  
**Rama:** `main`  
**Estado:** CI de hábitos aprobado en 42308655770; Expo Doctor 20/20 y CI integral aprobados en 42312021727; prueba física y migración SQLite en Expo pendientes.

**Correspondencia de roadmap:** este corte técnico pertenece a la Etapa 2 estratégica (núcleo de bienestar), no a la Etapa 3 estratégica (progreso consciente).

## 1. Objetivo

Entregar la primera experiencia real de hábitos dentro del MVP, sin adelantar sincronización ni recompensas. El usuario puede crear hábitos, elegir frecuencia, marcar cumplimiento diario y consultar el avance de la semana. Los datos permanecen en SQLite.

## 2. Alcance implementado en el repositorio

- `src/domain/habits/habit.ts`: entidades y reglas puras de creación, validación de frecuencia/meta, fecha local y evento idempotente de cumplimiento.
- `src/domain/habits/habit.test.ts`: pruebas para normalización, entradas inválidas, fecha imposible, identidad estable de check-in y semana que inicia lunes.
- `src/infrastructure/local/migrations/002_create_habits.ts`: segunda migración SQLite; crea hábitos y cumplimientos, constraints, FK con cascade y claves únicas por hábito/día.
- `src/infrastructure/local/database.ts`: migración local actualizada de versión 1 a 2 sin recrear la base ni eliminar las sesiones existentes.
- `src/infrastructure/local/habit-repository.ts`: repositorio SQLite para crear/listar hábitos, registrar check-in idempotente y deshacerlo.
- `app/habits.tsx`: pantalla de hábitos con creación, frecuencia diaria/semanal, metas de 1–7 veces, progreso semanal y registro de hoy.
- `src/components/ui/SurfaceCard.tsx`, `PrimaryButton.tsx`, `SectionHeading.tsx`, `EmptyState.tsx`: primeros componentes compartidos con tokens semánticos.
- `app/index.tsx`: acceso a Hábitos desde Inicio y corrección del reinicio de sesión para borrar el registro persistido; se muestra aviso cuando falla el almacenamiento.

## 3. Reglas de producto y datos

- Frecuencia diaria equivale a una meta de siete cumplimientos por semana.
- Frecuencia semanal permite una meta de una a siete veces; el selector ofrece todas las opciones 1–7.
- La fecha de cumplimiento usa el calendario local del dispositivo; la semana comienza el lunes.
- Cada hábito solo puede tener un cumplimiento por día. La identidad estable `habitId:YYYY-MM-DD` y la restricción UNIQUE evitan duplicados.
- Marcar como hecho es idempotente; deshacer es una operación explícita.
- Las metas semanales cuentan eventos locales dentro del intervalo de lunes a hoy.
- No se generan XP, rachas, insignias ni estadísticas históricas en esta etapa.
- Los hábitos se almacenan localmente; todavía no se sincronizan ni se respaldan en Supabase.
- El borrado de un hábito no está expuesto en UI; la FK define cascade para una futura operación de borrado controlada.

## 4. Seguridad y privacidad

- Las consultas SQLite usan parámetros enlazados.
- El esquema valida longitud, frecuencia, rangos, claves de fecha y relaciones.
- No se solicita permiso de uso del dispositivo ni se recopila actividad de otras aplicaciones.
- No se envían hábitos a Supabase.
- La futura migración remota requiere diseño de RLS propietario, pruebas negativas multiusuario, timestamps y estrategia de conflictos antes de aplicarse.

## 5. Validación

- Pruebas unitarias del dominio añadidas a Vitest.
- Prueba aislada del DDL en SQLite 3.46.1: conserva una tabla previa de sesiones, acepta un check-in válido, ignora el duplicado, rechaza meta diaria distinta de siete y hace cumplir unicidad hábito/día. Esta prueba no sustituye la migración Expo SQLite ni la prueba física.
- CI GitHub Actions run `42308655770`: los trabajos `TypeScript and domain tests` y `Local Supabase migrations and pgTAP` finalizaron `success`; el primero completó TypeScript, Vitest y bundles JavaScript Android/iOS. Esta validación no equivale a build nativo ni prueba física.
- El workflow actual reconstruye Supabase y ejecuta pgTAP; no prueba SQLite nativo.
- La migración SQLite y la navegación deben probarse en development build/dispositivo real antes de declarar la persistencia física verificada.
- Expo Doctor 20/20 pasó en run 42312021727; no se declaran build nativo, E2E ni validación de App Store/Play Store.

## 6. Pendientes siguientes

1. Probar migración SQLite v1→v3 y flujos de hábitos en development build/dispositivos físicos.
2. Probar migración SQLite desde versión 1 con sesiones existentes y desde instalación limpia.
3. Probar creación, cumplimiento, deshacer, reinicio de app y persistencia en Android/iOS físicos.
4. Añadir manejo de errores y validación de integridad en el repositorio SQLite.
5. Diseñar objetivos personales y cómo se relacionan con hábitos sin duplicar conceptos.
6. Diseñar progreso/XP únicamente a partir de eventos verificables; definir idempotencia y recalculabilidad antes de mostrar recompensas.
7. Después de aprobar modelo y RLS, preparar migración remota de perfiles/preferencias/hábitos con pgTAP. No aplicar hasta completar revisión de seguridad.
