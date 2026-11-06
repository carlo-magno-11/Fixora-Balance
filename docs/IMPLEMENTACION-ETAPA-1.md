# Fixora Balance — Implementación de la primera etapa

**Fecha:** 6 de noviembre de 2026  
**Rama:** main  
**Estado:** scaffold y primera experiencia de enfoque escritos; validación de ejecución pendiente.

## 1. Alcance entregado en el repositorio

Se inició la aplicación nativa con Expo SDK 58, React Native 0.88, React 19.3, TypeScript 6 y Expo Router 58. La selección se basa en la versión estable de Expo disponible al iniciar esta etapa y en la matriz oficial de paquetes del SDK.

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
- `.github/workflows/quality.yml`: verificación TypeScript y pruebas de dominio.
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

Esta entrega no significa que la app esté lista para usuarios o tiendas. No se han ejecutado TypeScript, Vitest, Expo Doctor, build nativo ni pruebas físicas. La conexión a Supabase se ha auditado, pero Auth, perfiles, sincronización y permisos de usuario aún no están implementados.

La instalación debe completarse con el gestor de paquetes en un entorno con acceso al registro npm y generar/confirmar el lockfile antes de considerar CI reproducible. El workflow inicial instala sin modo frozen como puente de bootstrap; no debe convertirse en la política final de releases.

## 4. Próximas tareas

1. Ejecutar instalación de dependencias y generar pnpm-lock.yaml.
2. Ejecutar typecheck, pruebas, Expo Doctor y bundle Android/iOS.
3. Corregir todos los errores detectados y obtener CI verde.
4. Añadir manejo de errores/migraciones locales y pruebas de reinicio/background.
5. Añadir objetivos y hábitos con repositorios SQLite y pruebas.
6. Crear primera migración de perfiles/preferencias Supabase con RLS y pgTAP.
7. Implementar Auth cuando el esquema y el trigger de perfil estén revisados.
8. Definir sincronización con cola idempotente y conflictos antes de enviar datos.
9. Prototipar APIs nativas de control de aplicaciones por separado; no prometer bloqueo universal.

## 5. Base tecnológica investigada

- Expo SDK 58 estable, React Native 0.88 y React 19.3.
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
