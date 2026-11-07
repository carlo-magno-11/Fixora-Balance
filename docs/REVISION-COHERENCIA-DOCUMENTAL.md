# Fixora Balance — Revisión de coherencia documental

**Fecha de revisión:** 6 de noviembre de 2026  
**Repositorio:** carlo-magno-11/Fixora-Balance  
**Rama:** main  
**Propósito:** mapa verificable de los documentos rectores y reconciliación con el estado real del código, CI y Supabase.

Esta revisión se basa en la lectura de los 18 documentos de docs/ y en la comparación con README.md, package.json, app.json, .github/workflows/quality.yml, migraciones y código local. No convierte propuestas comerciales o técnicas en decisiones aprobadas si los documentos las mantienen como pendientes.

## 1. Documentos revisados y función

| Documento | Función dentro del proyecto |
|---|---|
| [PLAN-MAESTRO](PLAN-MAESTRO.md) | Fuente de verdad de visión, principios, arquitectura y roadmap estratégico. |
| [PUERTA-PREPROGRAMACION](PUERTA-PREPROGRAMACION.md) | Puertas de decisión y condiciones para prototipo, beta y publicación. |
| [ALCANCE-MVP-Y-CRITERIOS-ACEPTACION](ALCANCE-MVP-Y-CRITERIOS-ACEPTACION.md) | Qué entra en Free + Plus y qué evidencia acepta cada entrega. |
| [SISTEMA-DISENO-UX](SISTEMA-DISENO-UX.md) | Colorimetría, jerarquía, navegación, componentes y accesibilidad. |
| [MODELO-DATOS-Y-ARQUITECTURA](MODELO-DATOS-Y-ARQUITECTURA.md) | Límites de dominio, entidades y responsabilidades de datos. |
| [THREAT-MODEL-INICIAL](THREAT-MODEL-INICIAL.md) | Amenazas, activos, límites de confianza y controles antes de backend/funciones sensibles. |
| [ESTRATEGIA-SUPABASE-Y-MIGRACIONES](ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md) | Supabase, SQLite, entornos, migraciones, RLS y pruebas SQL. |
| [MATRIZ-CAPACIDADES-NATIVAS](MATRIZ-CAPACIDADES-NATIVAS.md) | Límites de Android/iOS, permisos, entitlements y degradación segura. |
| [MATRIZ-CATALOGO-ENTITLEMENTS](MATRIZ-CATALOGO-ENTITLEMENTS.md) | SKUs, derechos, límites, upgrades y anti doble cobro. |
| [MONETIZACION-Y-LICENCIAS](MONETIZACION-Y-LICENCIAS.md) | Modelo comercial, trial, canales y licencias. |
| [PROPUESTA-COMERCIAL-Y-PRECIOS](PROPUESTA-COMERCIAL-Y-PRECIOS.md) | Precios piloto y supuestos financieros; no autoriza publicación/cobro. |
| [INVESTIGACION-HABITOS-PROGRESO](INVESTIGACION-HABITOS-PROGRESO.md) | Referencias open source y principios de progreso no punitivo. |
| [SEGURIDAD-REPOSITORIO-PUBLICO](SEGURIDAD-REPOSITORIO-PUBLICO.md) | Visibilidad, secretos, Actions y controles de GitHub. |
| [REGISTRO-DE-DECISIONES](REGISTRO-DE-DECISIONES.md) | Decisiones, hipótesis, pendientes y sustituciones. |
| [ESTADO-Y-BITACORA](ESTADO-Y-BITACORA.md) | Continuidad operativa y evidencia de cada sesión. |
| [IMPLEMENTACION-ETAPA-1](IMPLEMENTACION-ETAPA-1.md) | Corte técnico 2.1: enfoque y SQLite. |
| [IMPLEMENTACION-ETAPA-2-HABITOS](IMPLEMENTACION-ETAPA-2-HABITOS.md) | Corte técnico 2.2: hábitos locales. |
| [IMPLEMENTACION-ETAPA-3-OBJETIVOS](IMPLEMENTACION-ETAPA-3-OBJETIVOS.md) | Corte técnico 2.3: objetivos semanales. |

## 2. Reglas rectoras que se mantienen

1. Fixora Balance es bienestar digital, enfoque, hábitos, privacidad y protección familiar; no debe convertirse en otra fuente de distracción ni en un bloqueador que prometa capacidades imposibles.
2. Progreso no punitivo: descanso/omisiones no borran progreso; XP debe ser opcional; solo eventos verificables pueden generar recompensas.
3. MVP de salida recomendado: Free + Plus Personal. Protección y Family permanecen en fases posteriores hasta validar APIs, permisos, políticas y riesgos.
4. Backend como autoridad para Auth, compras y entitlements. El cliente nunca concede derechos Premium.
5. SQLite local mantiene el núcleo offline; Supabase remoto se usa solo cuando modelo, RLS, idempotencia, retención y migraciones estén revisados.
6. Todas las modificaciones SQL compartidas deben pasar por migraciones versionadas, reconstrucción local y pgTAP. No se aplicaron migraciones de hábitos/objetivos a Supabase remoto.
7. No afirmar que el control de apps, Family Controls, VPN/DNS o bloqueo universal está disponible antes de pruebas y permisos específicos de cada plataforma.
8. Los precios MXN son base piloto, no precios definitivos ni autorización de cobro.

## 3. Reconciliaciones documentales necesarias

### 3.1 Roadmap estratégico vs. nombres de implementación

El Plan Maestro define Etapa 2 como núcleo de bienestar y Etapa 3 como progreso consciente. Los archivos históricos de implementación usan “etapa 2 hábitos” y “etapa 3 objetivos”. Para evitar confusión, quedan interpretados como cortes técnicos dentro de la Etapa 2 estratégica:

- 2.1: enfoque/temporizador.
- 2.2: hábitos locales.
- 2.3: objetivos semanales.

La Etapa 3 estratégica sigue pendiente: historial de eventos, puntos/XP, niveles, insignias, reversión y reconciliación offline. No declarar terminada por tener objetivos semanales.

### 3.2 Estado del CI

- Run 42308655770: CI de hábitos/objetivos, TypeScript, Vitest, bundles JS Android/iOS, Supabase local y pgTAP aprobado.
- Run 42312021727: Expo Doctor 20/20, TypeScript, Vitest, bundles JS Android/iOS y Supabase local/pgTAP aprobados; instalación sin warnings de peer dependencies. Se usó temporalmente para generar el lockfile.
- Run 42312724248: instalación pnpm install --frozen-lockfile con lockfile up to date, Expo Doctor 20/20, TypeScript, Vitest, bundles JS Android/iOS, Supabase local y pgTAP; ambos jobs success. Este es el CI reproducible del lockfile.
- Run 42313449617: la versión actual de Inicio/Hoy, la actualización posterior al guardado SQLite y los doce tests de contraste se validaron con instalación congelada; 27 tests, Expo Doctor 20/20, TypeScript, bundles JS Android/iOS y Supabase local/pgTAP pasaron.
- Ninguno de esos runs acredita build nativo, E2E ni pruebas físicas.

### 3.3 Supabase remoto verificado

- Organización Fixora-Balance, plan Free.
- Proyecto emacfszktufyqtfgzunl, región us-east-1, PostgreSQL 17.11, ACTIVE_HEALTHY.
- Una migración remota de hardening del event trigger.
- Cero tablas públicas, cero usuarios Auth, cero buckets y cero Edge Functions.
- Advisors de seguridad, rendimiento y salud: cero lints.
- El proyecto remoto no contiene aún tablas de negocio; no crear Auth/sync ni aplicar migraciones de hábitos/objetivos sin diseño y revisión.

### 3.4 Dirección visual y contraste

La paleta v0.1 es borgoña #6E0D25, verde bosque #315C4B, crema #F6F3ED y dorado #C99B58. El dorado se reserva para ornamento (2.28:1 sobre crema). Ya se incorporó #8B632D como token de texto dorado y textSecondary #6E685F; app/index.tsx usa el token semántico y src/theme/tokens.test.ts verifica doce pares WCAG AA. Inicio/Hoy ya muestra resúmenes reales desde SQLite. Sigue pendiente la auditoría visual completa y la validación física.

## 4. Decisiones que siguen abiertas (no completar por inferencia)

- Licencia y estrategia público/privado del código ejecutable.
- Versiones mínimas de Android/iOS y matriz de dispositivos de prueba.
- Canal piloto de compra, proveedor web y condiciones reales de las tiendas.
- Semántica del límite de tres dispositivos Plus.
- Retención, borrado, sincronización y política de zona horaria.
- Mercado/idioma inicial y revisión legal/fiscal.
- Límites Family y elegibilidad de entitlements.
- Permisos/entitlements nativos de Protección y Family.

## 5. Próxima secuencia técnica

1. Preparar development builds y probar migración SQLite v1→v3, background y reinicio en dispositivos Android/iOS.
2. Completar auditoría visual y accesibilidad de todas las pantallas en dispositivos.
3. Diseñar historial/eventos verificables, idempotencia y reversión antes de XP.
4. Diseñar Auth/perfiles/sincronización con RLS y pgTAP; no aplicar migraciones remotas sin revisión.
5. Cerrar decisiones de licencia, versiones mínimas, canal, retención y dispositivos antes de beta/publicación.

## 6. Límite de esta revisión

Esta auditoría confirma lectura y contraste documental con el estado observado en GitHub y Supabase. No sustituye pruebas físicas, revisión legal, auditoría completa de GitHub Settings, análisis histórico de secretos, pentest ni aprobación de publicación.


## 7. Actualización de evidencia nativa — 7 de noviembre de 2026

El inventario actual de `docs/` contiene 21 archivos Markdown. La revisión base del 6 de noviembre cubrió los 18 documentos rectores enumerados en la sección 1; los documentos añadidos después se integran a la bitácora y al protocolo de QA, sin reescribir retrospectivamente aquella revisión.

- [Run nativo 42400815021](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42400815021): iOS Simulator Release compilado, verificado, instalado, abierto y capturado; Android Release APK compilado y applicationId verificado. El job Android de ese run solo cubría empaquetado, no instalación/arranque en emulador.
- [Run Android QA 42402768006](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42402768006): compilación y verificación del APK aprobadas; el AVD se creó, pero no apareció un dispositivo ADB dentro de 300 segundos. No se ejecutaron instalación, lanzamiento ni captura Android.
- [CI de calidad y base local 42402767905](https://github.com/carlo-magno-11/Fixora-Balance/actions/runs/42402767905): TypeScript, Vitest, Expo Doctor, bundles Android/iOS y migraciones Supabase locales/pgTAP aprobados.
- El workflow Android se actualizó en commit `e89bd40` para ampliar el timeout ADB a 600 segundos, conservar logs detallados y cargar un artefacto diagnóstico incluso si el arranque falla. El run de esa corrección está pendiente de resultado.
- El proyecto Supabase remoto permanece sin tablas de negocio; no se aplicaron migraciones ni se modificaron datos remotos.

La distinción de estados queda fijada: build nativo iOS no equivale a prueba funcional completa; APK Android generado no equivale a instalación/arranque; CI local no equivale a Supabase remoto; simulador no equivale a dispositivo físico; ninguno equivale a aprobación de tienda.
