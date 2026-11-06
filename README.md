# Fixora Balance

**Producto de Fixora Dynamics**  
**Lema provisional:** Recupera el control de tu vida digital.

Fixora Balance busca ayudar a las personas a recuperar atención, construir hábitos digitales saludables, proteger su privacidad y acompañar a las familias con controles transparentes.

**Estado: prototipo técnico inicial.**

La primera experiencia de enfoque ya está escrita y pasa TypeScript, pruebas de dominio y exportación JavaScript para Android/iOS en GitHub Actions. No está lista para usuarios: faltan pruebas locales de migraciones, dispositivos físicos, autenticación, sincronización, hábitos, recompensas, notificaciones y compras.

## Documento rector
- [Plan maestro del producto](docs/PLAN-MAESTRO.md)
- [Modelo comercial, paquetes, pruebas y pagos](docs/MONETIZACION-Y-LICENCIAS.md)
- [Propuesta comercial y precios piloto](docs/PROPUESTA-COMERCIAL-Y-PRECIOS.md)
- [Seguridad del repositorio público](docs/SEGURIDAD-REPOSITORIO-PUBLICO.md)
- [Política de reporte de vulnerabilidades](SECURITY.md)
- [Estado y bitácora del proyecto](docs/ESTADO-Y-BITACORA.md)
- [Registro de decisiones](docs/REGISTRO-DE-DECISIONES.md)
- [Alcance MVP y criterios de aceptación](docs/ALCANCE-MVP-Y-CRITERIOS-ACEPTACION.md)
- [Catálogo y matriz de derechos](docs/MATRIZ-CATALOGO-ENTITLEMENTS.md)
- [Capacidades nativas iOS/Android](docs/MATRIZ-CAPACIDADES-NATIVAS.md)
- [Arquitectura y modelo de datos](docs/MODELO-DATOS-Y-ARQUITECTURA.md)
- [Estrategia Supabase y migraciones](docs/ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md)
- [Threat model inicial](docs/THREAT-MODEL-INICIAL.md)
- [Puerta de preprogramación](docs/PUERTA-PREPROGRAMACION.md)

## Implementación actual

Consulta [Implementación etapa 1](docs/IMPLEMENTACION-ETAPA-1.md) para conocer los archivos creados, el comportamiento ya escrito y las pruebas que faltan. El lockfile ya está versionado. TypeScript, Vitest y bundles Android/iOS pasaron en CI. La validación local de Supabase/pgTAP sigue en ajuste; no hay builds nativos ni pruebas físicas.

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
- Fase: primera vertical slice de implementación; validación técnica todavía pendiente.
- Existe scaffold Expo SDK 58 / React Native 0.88 / React 19.3 / TypeScript 6 / Expo Router 58.
- La pantalla inicial contiene un temporizador de enfoque funcional con pausa/reanudación y persistencia local SQLite.
- `pnpm-lock.yaml` está versionado y CI usa instalación frozen.
- TypeScript, Vitest y exportación JS Android/iOS han pasado en GitHub Actions.
- El workflow de Supabase local/pgTAP se está ajustando para simular un event trigger que existe en hosted, pero no en el contenedor local por defecto.
- Proyecto Supabase dedicado: `emacfszktufyqtfgzunl`, organización Free `Fixora-Balance`, región `us-east-1`, PostgreSQL 17.11, estado `ACTIVE_HEALTHY`.
- Primera migración remota aplicada y alineada con el historial: `20261106221629_harden_rls_event_trigger_permissions`.
- No hay todavía tablas de negocio, perfiles ni usuarios; Auth, sincronización y compras no están implementados.

La documentación del plan maestro define alcance, arquitectura, seguridad, privacidad, plataformas, monetización, etapas y criterios de salida. Cualquier cambio sustancial debe justificarse y registrarse antes de convertirse en implementación.
