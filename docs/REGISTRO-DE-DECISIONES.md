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
