# Fixora Balance — Implementación de la primera etapa

**Fecha:** 6 de noviembre de 2026  
**Rama:** main  
**Estado:** CI integral aprobado en run 42312724248 (pnpm install --frozen-lockfile, Expo Doctor 20/20, TypeScript, Vitest, bundles JS Android/iOS, Supabase local y pgTAP); persistencia SQLite requiere prueba física.

## 1. Alcance entregado en el repositorio

Se inició la aplicación nativa con Expo SDK 58, React Native 0.88.1, React 19.3, TypeScript 6 y Expo Router 58. La selección se basa en la versión estable de Expo disponible al iniciar esta etapa y en la matriz oficial de paquetes del SDK.

Archivos principales:
- `package.json`: scripts de ejecución, TypeScript y pruebas.
- `app.json`: identidad provisional, deep-link scheme y plugins.
- `app/_layout.tsx`: layout raíz.
- `app/index.tsx`: primera pantalla de bienvenida y sesión de enfoque.
- `src/domain/focus/focus-session.ts`: reglas puras de inicio, pausa, reanudación, finalización y cálculo de tiempo.
- `src/domain/focus/focus-session.test.ts`: pruebas de transiciones y límites.
- `src/infrastructure/local/database.ts`: apertura y migración versionada de SQLite.
- `src/infrastructure/local/migrations/001_create_focus_sessions.ts`: primera migración local SQLite.
- `src/infrastructure/local/focus-session-repository.ts`: persistencia local de sesiones.
- `pnpm-lock.yaml`: resolución reproducible de dependencias.
- `supabase/config.toml`: configuración local con PostgreSQL 17.
- `.github/workflows/quality.yml`: Expo Doctor (versión fijada 1.21.6), TypeScript, pruebas de dominio, bundles Android/iOS y pruebas locales de Supabase/pgTAP.
- `supabase/migrations/20261106221629_harden_rls_event_trigger_permissions.sql`: primera migración remota para restringir permisos de una función de evento DDL.

## 2. Comportamiento de la primera vertical slice

- Selección de sesión de 15, 25 o 50 minutos.
- Inicio, pausa, reanudación y finalización.
- El tiempo se calcula contra marcas temporales, no contando ticks del temporizador; al volver de segundo plano no se regala tiempo.
- La última sesión se guarda localmente en SQLite y se restaura al abrir la app.
- Si la app se cierra durante una sesión, al volver se calcula el tiempo real transcurrido.
- No se sincroniza el historial a la nube todavía.
- La pantalla no muestra estadísticas inventadas ni puntos/rachas falsos.
- La gamificación todavía no está conectada; primero se define el origen válido de eventos para no premiar actividad fabricada.

## 3. Límite explícito

Esta entrega no significa que la app esté lista para usuarios o tiendas. TypeScript, Vitest y exportación JavaScript Android/iOS sí se ejecutaron en GitHub Actions y pasaron. Expo Doctor se ejecutó y pasó 20/20 en CI run 42312021727. No se han ejecutado builds nativos ni pruebas físicas. La conexión a Supabase se ha auditado, pero Auth, perfiles, sincronización y permisos de usuario aún no están implementados.

El lockfile ya está generado y versionado. El workflow instala con `pnpm install --frozen-lockfile`. La reconstrucción local de Supabase y pgTAP pasó en GitHub Actions para las etapas 1, 2 y 3; el run `42308655770` confirmó éxito de TypeScript, Vitest, bundles JS Android/iOS y pgTAP. El workflow ahora incluye Expo Doctor `1.21.6`; su resultado posterior al cambio debe verificarse por separado.

## 4. Próximas tareas

1. Expo Doctor se añadió al workflow `quality.yml` con versión fijada `1.21.6`; revisar el resultado de CI y corregir los hallazgos que reporte. Preparar builds nativos/dev clients.
2. Probar migraciones SQLite v1→v3, background, reinicio y restauración en dispositivos físicos.
3. Añadir pruebas de integración del repositorio SQLite y manejo de errores/migraciones fallidas.
4. Revisar el historial local y agregados de objetivos con sesiones completadas.
5. Diseñar objetivos/hábitos sincronizables, timezone, cola idempotente y conflictos antes de enviar datos.
6. Diseñar primera migración remota de perfiles/preferencias/hábitos/objetivos con RLS y pgTAP; no aplicar hasta revisión de seguridad.
7. Implementar Auth cuando el esquema y el trigger de perfil estén revisados.
8. Definir progreso/XP desde eventos fuente verificables, con reversión y gamificación opcional.
9. Prototipar APIs nativas de control de aplicaciones por separado; no prometer bloqueo universal.

## 5. Base tecnológica investigada

- Expo SDK 58 estable, React Native 0.88.1 y React 19.3.
- Expo Router 58, SQLite 58 y TypeScript 6.
- Supabase/PostgreSQL 17 para cuenta y sincronización opcional.
- SQLite local para sesiones y trabajo offline.
- Dominio puro TypeScript, sin importar React Native ni Supabase.
- GitHub Actions con permisos de solo lectura.

Referencias:
- https://expo.dev/changelog/sdk-58
- https://docs.expo.dev/versions/v58.0.0/sdk/router/
- https://docs.expo.dev/versions/latest/sdk/sqlite/
- https://supabase.com/docs/guides/local-development/cli-workflows


## Alineación Expo SDK 58 — 6 de noviembre de 2026

- app.json ya no declara newArchEnabled ni android.edgeToEdgeEnabled; Expo Doctor rechazaba ambas propiedades en el esquema actual.
- React Native se alineó a 0.88.1; react-native-safe-area-context a ~5.11.1; @react-native/metro-config a 0.88.1 como devDependency/override para resolver el peer dependency.
- Expo Doctor 20/20 pasó sin issues y pnpm install no reportó peer dependency warnings en run 42312021727.
- El lockfile actualizado se incorpora al commit actual. CI run 42312724248 confirmó pnpm install --frozen-lockfile con lockfile up to date.
