# Fixora Balance

**Producto de Fixora Dynamics**  
**Lema provisional:** Recupera el control de tu vida digital.

Fixora Balance busca ayudar a las personas a recuperar atención, construir hábitos digitales saludables, proteger su privacidad y acompañar a las familias con controles transparentes.

**Estado: prototipo técnico inicial.**

La experiencia local de enfoque, hábitos y objetivos está implementada. El run `42313449617` pasó con instalación `pnpm install --frozen-lockfile`: Expo Doctor (20/20), TypeScript, 27 pruebas Vitest, bundles JavaScript Android/iOS y Supabase local/pgTAP; sin avisos de peer dependencies. Inicio/Hoy muestra ahora progreso real desde SQLite. No está lista para usuarios: faltan builds nativos, pruebas físicas, Auth, sincronización, recompensas, notificaciones y compras.

## Documento rector
- [Plan maestro del producto](docs/PLAN-MAESTRO.md)
- [Sistema visual y dirección UX](docs/SISTEMA-DISENO-UX.md)
- [Investigación de hábitos y progreso consciente](docs/INVESTIGACION-HABITOS-PROGRESO.md)
- [Modelo comercial, paquetes, pruebas y pagos](docs/MONETIZACION-Y-LICENCIAS.md)
- [Propuesta comercial y precios piloto](docs/PROPUESTA-COMERCIAL-Y-PRECIOS.md)
- [Seguridad del repositorio público](docs/SEGURIDAD-REPOSITORIO-PUBLICO.md)
- [Política de reporte de vulnerabilidades](SECURITY.md)
- [Estado y bitácora del proyecto](docs/ESTADO-Y-BITACORA.md)
- [Revisión de coherencia documental](docs/REVISION-COHERENCIA-DOCUMENTAL.md)
- [Registro de decisiones](docs/REGISTRO-DE-DECISIONES.md)
- [Alcance MVP y criterios de aceptación](docs/ALCANCE-MVP-Y-CRITERIOS-ACEPTACION.md)
- [Catálogo y matriz de derechos](docs/MATRIZ-CATALOGO-ENTITLEMENTS.md)
- [Capacidades nativas iOS/Android](docs/MATRIZ-CAPACIDADES-NATIVAS.md)
- [Arquitectura y modelo de datos](docs/MODELO-DATOS-Y-ARQUITECTURA.md)
- [Estrategia Supabase y migraciones](docs/ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md)
- [Threat model inicial](docs/THREAT-MODEL-INICIAL.md)
- [Puerta de preprogramación](docs/PUERTA-PREPROGRAMACION.md)

## Implementación actual

Consulta las implementaciones [etapa 1](docs/IMPLEMENTACION-ETAPA-1.md), [etapa 2](docs/IMPLEMENTACION-ETAPA-2-HABITOS.md) y [etapa 3](docs/IMPLEMENTACION-ETAPA-3-OBJETIVOS.md). El CI de etapas 2 y 3 pasó en el run `42308655770`; no hay builds nativos ni pruebas físicas declaradas.

## Principios
1. Bienestar antes que tiempo de pantalla: distinguir uso útil de uso problemático.
2. Autonomía y acompañamiento, no culpa ni dependencia de la app.
3. Protección familiar transparente; nunca vigilancia secreta.
4. Privacidad por diseño y minimización de datos.
5. Compras claras, restaurables y verificables; nunca desbloqueos basados solo en el cliente.
6. Capacidades reales por sistema operativo: no prometer bloqueos imposibles.
7. Separar decisiones aprobadas, hipótesis y asuntos pendientes de validación.

## Estado actual
- Repositorio: carlo-magno-11/Fixora-Balance (público; decisión documentada y sujeta a revisión de seguridad/IP).
- Rama principal confirmada: main
- Fase: núcleo local de enfoque, hábitos y objetivos; Expo Doctor y CI integral pasaron en run `42312724248` con lockfile congelado.
- Existe scaffold Expo SDK 58 / React Native 0.88 / React 19.3 / TypeScript 6 / Expo Router 58.
- La pantalla inicial contiene un temporizador de enfoque con pausa/reanudación y persistencia SQLite.
- La pantalla Hábitos permite crear hábitos diarios/semanales y registrar cumplimiento local.
- La pantalla Objetivos permite medir metas semanales desde sesiones completadas y check-ins persistidos; no hay XP ni sincronización remota.
- `pnpm-lock.yaml` está versionado y CI usa instalación frozen.
- CI run `42308655770`: TypeScript, Vitest, bundles JavaScript Android/iOS y Supabase local/pgTAP pasaron.
- El workflow local Supabase/pgTAP reconstruye la migración remota y prueba el event trigger hosted mediante fixtures; la ejecución más reciente para la etapa 1 pasó.
- Proyecto Supabase dedicado: `emacfszktufyqtfgzunl`, organización Free `Fixora-Balance`, región `us-east-1`, PostgreSQL 17.11, estado `ACTIVE_HEALTHY`.
- Primera migración remota aplicada y alineada con el historial: `20261106221629_harden_rls_event_trigger_permissions`.
- No hay todavía tablas de negocio, perfiles ni usuarios; Auth, sincronización y compras no están implementados.

La documentación del plan maestro define alcance, arquitectura, seguridad, privacidad, plataformas, monetización, etapas y criterios de salida. Cualquier cambio sustancial debe justificarse y registrarse antes de convertirse en implementación.
