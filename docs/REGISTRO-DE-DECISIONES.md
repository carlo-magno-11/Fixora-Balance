# Fixora Balance — Registro de decisiones

**Última actualización:** 6 de noviembre de 2026

Este registro separa decisiones de trabajo, hipótesis y asuntos sin resolver. Una propuesta no se considera implementada por aparecer aquí.

| ID | Tema | Decisión / estado | Justificación | Revisión necesaria |
|---|---|---|---|---|
| FB-001 | Nombre | Fixora Balance, provisional | Coherente con Fixora Dynamics | Búsqueda IMPI/WIPO, dominios y tiendas |
| FB-002 | Producto | Bienestar digital + enfoque + hábitos + privacidad + protección familiar | Propuesta más amplia que un bloqueador | Validar con usuarios |
| FB-003 | Gamificación | Progreso consciente, flexible y opcional | Evitar culpa y dependencia digital | Pruebas UX |
| FB-004 | Plataforma | React Native + Expo + TypeScript con módulos nativos Swift/Kotlin | Reutilizar UI sin negar diferencias de SO | Prototipos nativos |
| FB-005 | Backend | Supabase/PostgreSQL/RLS/Edge Functions | Derechos centralizados | Threat model y diseño de datos |
| FB-006 | Arquitectura | Motor de dominio + adaptadores nativos | Separar reglas de producto de APIs específicas | Validar contratos |
| FB-007 | Monetización | Catálogo modular + derechos atómicos | Comprar por separado y ampliar sin duplicar derechos | Cerrar catálogo y precios |
| FB-008 | Prueba | 14 días de Balance Completo, una vez por cuenta elegible | Evitar pruebas repetidas por módulo | Validar conversión y reglas de tienda |
| FB-009 | Prueba y pago | Consentimiento claro al precio posterior; método según proveedor/canal | Reducir abuso y cobros sorpresa | Evaluar tarjeta requerida vs prueba web sin tarjeta |
| FB-010 | Paquetes | Free, Plus Personal, Protección Personal, Family, Balance Completo, extensiones | Modularidad y paquete integral | Definir límites/costos |
| FB-011 | Lifetime | No ofrecer al inicio para servicios con coste recurrente | Riesgo de pasivo de soporte/infraestructura | Revaluar con modelo financiero |
| FB-012 | Pagos móviles | Apple IAP / Google Play Billing para compras digitales dentro de sus apps, salvo excepción validada | Cumplimiento de políticas | Revisión de storefront antes de release |
| FB-013 | Web | Stripe Billing candidato; Mercado Pago como alternativa local a comparar | Cobros recurrentes y métodos locales | Prueba de integración y coste neto |
| FB-014 | Agregador | Evaluar RevenueCat para IAP/entitlements y web | Reducir mantenimiento | Comparar coste, cobertura y dependencia |
| FB-015 | Seguridad de compra | Backend como autoridad; webhooks verificados e idempotentes; ledger de derechos | Evitar acceso regalado/cobros dobles | Pruebas sandbox y auditoría |
| FB-016 | Privacidad | Minimizar datos; no capturar mensajes, teclas, fotos ni navegación completa | Riesgo y confianza | Revisión legal cuando aplique |
| FB-017 | Alcance inicial | Primero bienestar/enfoque/progreso; filtros y Family después de validar APIs | Reduce riesgo técnico | Prototipos en equipos reales |
| FB-018 | Repositorio | carlo-magno-11/Fixora-Balance, rama main | Proyecto separado de Fixora-Dynamics y EYESITE | Visibilidad actual: pública |

## Hipótesis abiertas
1. La prueba integral de 14 días convertirá mejor que pruebas separadas por módulo.
2. Plus Personal será el primer paquete premium con demanda suficiente.
3. Family y Protección Personal justifican suscripción por sus costes y mantenimiento.
4. RevenueCat reducirá trabajo de integración lo suficiente para compensar dependencia y coste.
5. La tarjeta requerida durante la prueba no reducirá excesivamente la activación.

Cada hipótesis debe tener una prueba y una métrica antes de convertirse en hecho.

## Registro de cambios
Añadir una fila por decisión nueva o modificación. No borrar decisiones previas: marcarlas como sustituidas y explicar por qué.


| FB-019 | Repositorio público | Mantener público durante la fase documental y de prototipo no sensible | Runners estándar públicos de Actions son gratuitos; permite revisiones | Decidir licencia y verificar secretos, Actions, reglas de rama antes de código sensible |
| FB-020 | Precios piloto | Sustituido por FB-027: los importes quedan aceptados como base de trabajo, no definitivos | Propuesta inicial competitiva y paquete completo ~25 % inferior a módulos separados | Validar disposición de pago, costes, impuestos y comisiones antes de publicación |
| FB-021 | Prueba | 14 días de Balance Completo, una vez por cuenta elegible y canal | Experiencia integral y menor abuso que pruebas repetidas por módulo | Verificar ofertas introductorias, requisitos de pago y elegibilidad de tiendas |
| FB-022 | Web billing | Stripe Billing candidato principal; Mercado Pago alternativa a comparar | API, prorrateo y métodos locales | Sandbox comparativo; elegir un único procesador web para MVP |
| FB-023 | Compras móviles modulares | No asumir catálogo apilable idéntico a web; validar grupos de suscripción Apple y Google Play Billing | Evitar doble cobro y derechos duplicados | Prototipo Sandbox antes de fijar catálogo de tiendas |
| FB-024 | Derechos | Separar SKU, entitlement, transacción, suscripción y asignación | Evitar que el cliente conceda funciones o que se cobre dos veces | Cerrar matriz de derechos y modelo de datos |
| FB-025 | Extensión | Extensión recurrente +3 dispositivos; no lifetime | La capacidad y soporte generan costes continuos | Validar coste real y límite nativo |
| FB-026 | Bitácora | Actualizar plan maestro, monetización y registro de decisiones con cada cambio importante | Mantener continuidad y trazabilidad | Revisar estado en cada sesión |


| FB-027 | Precios piloto — aprobación de trabajo | Se aceptan los importes MXN propuestos como base inicial para diseño, simulaciones y validación; no son definitivos ni autorizan publicación/cobro | Mantener un punto de partida accesible sin regalar el trabajo; ajustar con evidencia de costes y disposición de pago | Revisión obligatoria antes de lanzamiento comercial |
| FB-028 | MVP inicial | Priorizar Free + Plus Personal; Protección y Family permanecen en la visión, pero pasan a fases posteriores hasta validar APIs, permisos, políticas y riesgos | Reduce riesgo y permite probar valor central antes de prometer funciones nativas sensibles | Prototipos físicos, entrevistas y revisión de tiendas |
| FB-029 | Documentación previa a código | Incorporar alcance MVP, matriz de derechos, capacidades nativas, modelo de datos y threat model antes de migraciones | Evitar decisiones improvisadas y falsa equivalencia entre plataformas | Revisar cada documento durante diseño técnico |

| FB-030 | Puerta de preprogramación | No iniciar código funcional hasta resolver los bloqueos P0 definidos en PUERTA-PREPROGRAMACION.md | Evitar que la arquitectura, licencia, canal o datos se decidan a mitad de implementación | Revisar checklist antes del primer commit de app |

| FB-031 | Backend y base de datos | Supabase/PostgreSQL como backend central; SQLite local para offline/cache/cola de sincronización | Aprovechar Auth, RLS, Storage y Edge Functions sin perder resiliencia offline ni acoplar dominio al proveedor | Prototipo local y pruebas de sincronización |
| FB-032 | Gobierno de base de datos | Migration-first imperativo: todo cambio de esquema/permisos/configuración SQL versionado antes de aplicarse a entornos compartidos | Reproducibilidad, auditoría, revisión de seguridad y evitar drift entre GitHub y Supabase | CI reconstruible, pgTAP/RLS y dry-run remoto |
| FB-033 | Datos runtime vs migraciones | Las operaciones de usuarios no generan una migración por evento; se guardan como datos de negocio y ledger/auditoría según sensibilidad | Las migraciones cambian estructura; los eventos registran actividad de negocio. Separar ambas cosas evita historial de migraciones inutilizable | Diseñar tablas operativas, idempotencia y retención |
| FB-034 | Entorno Supabase Balance | No reutilizar proyectos EYESITE ni el proyecto de otro producto Fixora; crear proyecto exclusivo para Balance tras cotizar coste y confirmar organización | Evitar contaminación de proyectos y riesgo de borrar/modificar datos ajenos | Confirmación de organización/coste antes de provisionar |

| FB-035 | Proyecto Supabase de desarrollo | Proyecto dedicado `emacfszktufyqtfgzunl` en organización Free `Fixora-Balance`, región us-east-1, PostgreSQL 17.11 | Aislamiento de EYESITE y control de coste | Vigilar límites/pausas del plan Free y preparar backup/export y restore antes de datos importantes |
| FB-036 | Base móvil | Expo SDK 58, React Native 0.88, React 19.3, Expo Router 58, TypeScript 6 y SQLite local | SDK 58 es estable y alinea librerías nativas con iOS 27; dominio separado de infraestructura | Lockfile, Expo Doctor, CI, builds y pruebas físicas |
| FB-037 | Primer vertical slice | Sesión de enfoque local con 15/25/50 min, pausa/reanudación y restauración SQLite | Validar el flujo central sin depender de permisos nativos ni backend | Pruebas reales de background, reinicio, errores y accesibilidad |
| FB-038 | Seguridad del event trigger | Revocar EXECUTE de PUBLIC, anon y authenticated sobre `public.rls_auto_enable()`; mantener `ensure_rls` activo | Reduce superficie de permisos; el advisor ya no reporta warning y el trigger conserva función | Añadir la misma prueba a reconstrucción local y verificar en cada migración futura |


## DEC-UX-001 — Sistema visual propio antes de adoptar una UI library

**Fecha:** 6 de noviembre de 2026  
**Estado:** aceptada para prototipo v0.1; pendiente de validación visual.

**Contexto:** la pantalla inicial contenía colores definidos localmente y todavía no existía una especificación coherente de colorimetría, tipografía, espaciado, componentes y navegación.

**Decisión:** establecer la dirección creativa “calma activa”; formalizar borgoña como firma de marca, verde bosque como acción primaria, crema como superficie y dorado como acento. Centralizar los valores en `src/theme/tokens.ts` y mantener componentes propios con React Native StyleSheet.

**Investigación:** se consultaron react-native-reusables, gluestack-ui, Shopify Restyle y Wix React Native UI Lib (todos con más de 1,000 estrellas al momento de la revisión; licencias MIT verificadas en las referencias indicadas en el documento de diseño). Se adoptan patrones, no una dependencia completa.

**Consecuencias:** no añadir NativeWind/Uniwind ni una UI library completa antes de probar compatibilidad, coste de migración y necesidad real. Los tokens son fuente de verdad para estilos; los componentes visuales no contendrán colores arbitrarios.

**Validación pendiente:** contraste WCAG 2.2 AA, estados accesibles, tamaños táctiles, Reduce Motion y pruebas visuales iOS/Android/web. La paleta no se declara definitiva hasta completar estas pruebas.


## DEC-UX-002 — Hábitos locales antes de sincronización

**Fecha:** 6 de noviembre de 2026  
**Estado:** aceptada para MVP local; pendiente de pruebas físicas.

**Decisión:** introducir hábitos diarios y semanales en SQLite. La frecuencia diaria equivale a siete objetivos semanales; la frecuencia semanal admite metas de una a siete veces. Cada check-in se identifica por hábito y fecha local, con unicidad por día; deshacer es una acción explícita.

**Justificación:** validar el valor y la persistencia del módulo sin añadir Auth, sincronización ni tablas remotas antes de aprobar RLS y resolución de conflictos.

**Consecuencias:** el progreso es local y no se atribuye XP ni rachas en esta etapa. La sincronización futura debe respetar timezone, idempotencia, borrado y conflictos multi-dispositivo.

**Validación:** CI de la etapa 2, migración SQLite v1→v2 con datos previos, instalación limpia y pruebas en Android/iOS físicos.

## FB-039 — Primera vertical slice de hábitos

Se aprueba como alcance local inicial la creación de hábitos diarios/semanales, meta semanal, check-in diario y resumen semanal. La funcionalidad se mantiene offline-first en SQLite; no se concede XP ni se sincroniza hasta definir eventos y RLS.

## FB-040 — Identidad idempotente de cumplimiento

Cada cumplimiento usa la clave compuesta hábito + fecha local y una restricción única en SQLite. Las operaciones de check-in no duplican eventos; deshacer es explícito. La futura sincronización debe preservar esta identidad y documentar reglas de timezone.


## DEC-UX-003 — Progreso consciente, no punitivo

**Fecha:** 6 de noviembre de 2026  
**Estado:** aceptada como dirección de producto; fórmula de XP pendiente.

**Decisión:** las omisiones y descansos no restan puntos ganados ni destruyen el historial. Las metas se evalúan contra la frecuencia que eligió el usuario. La gamificación será opcional y desactivable. Las recompensas se derivarán de eventos fuente verificables, nunca de aperturas, notificaciones o tiempo de uso de Fixora Balance.

**Investigación:** se inspeccionaron patrones de Loop Habit Tracker (GPL-3.0) y Habitica (NOASSERTION). No se copiará código ni assets; consultar `docs/INVESTIGACION-HABITOS-PROGRESO.md`.

**Pendiente:** definir eventos, idempotencia, reversión, zona horaria, reconciliación offline, puntos, niveles y pruebas antiabuso antes de implementar XP.


## DEC-UX-004 — Objetivos semanales derivados de datos fuente

**Fecha:** 6 de noviembre de 2026  
**Estado:** implementada localmente; pendiente CI final y prueba física.

**Decisión:** distinguir objetivo (resultado semanal medible), hábito (acción repetible) y sesión de enfoque (bloque de concentración). La primera versión mide sesiones completadas o check-ins de hábitos. El progreso se calcula desde SQLite, no se edita manualmente.

**Consecuencias:** objetivos semanales empiezan lunes local; meta de 1–100. No se añade XP ni sincronización. Los objetivos se mantienen independientes de hábitos hasta que pruebas UX justifiquen una relación explícita.

**Validación:** CI, migración SQLite v1→v3 con datos previos, instalación limpia y pruebas físicas Android/iOS.


## DEC-TECH-001 — Serializar guardado y eliminación de sesiones locales

**Fecha:** 6 de noviembre de 2026  
**Estado:** implementada; CI pendiente.

**Decisión:** ejecutar en una cola FIFO los guardados y eliminaciones de sesiones de enfoque. Un fallo no debe bloquear operaciones posteriores.

**Motivo:** evitar que un upsert iniciado antes de que el usuario termine una sesión vuelva a insertar la fila después de un DELETE. Las sesiones completadas se conservan para historial y metas; las sesiones incompletas terminadas por el usuario se eliminan.

**Validación:** pruebas unitarias de orden de operaciones y recuperación tras fallo; CI y prueba física pendientes.


## DEC-TECH-002 — Expo Doctor como puerta de CI

**Fecha:** 6 de noviembre de 2026  
**Estado:** incorporado al workflow; ejecución pendiente de verificar.

**Decisión:** ejecutar `pnpm dlx expo-doctor@1.21.6` en GitHub Actions después de instalar dependencias y antes de TypeScript/Vitest.

**Motivo:** detectar desajustes de dependencias Expo, configuración y problemas comunes de proyecto de forma reproducible, sin depender únicamente de una revisión manual o de la exportación JS.

**Límite:** Expo Doctor no reemplaza builds nativos, pruebas E2E ni validación física. No actualizar paquetes automáticamente como consecuencia de un warning; revisar cada hallazgo y corregirlo de forma controlada.
