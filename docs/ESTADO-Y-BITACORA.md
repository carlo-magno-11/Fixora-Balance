# Fixora Balance — Estado y bitácora del proyecto

**Última actualización:** 6 de noviembre de 2026  
**Rama:** main  
**Fase:** definición de producto y decisiones previas a implementación.

Este archivo es la bitácora resumida para retomar el proyecto sin confundir planificación con trabajo implementado. Cada sesión debe actualizar fecha, estado, cambios documentales, decisiones y siguientes pasos.

---

## 1. Estado actual verificado

- Repositorio: https://github.com/carlo-magno-11/Fixora-Balance
- Visibilidad: público.
- Rama por defecto observada: main.
- Los documentos principales se consultaron en GitHub antes de actualizarlos.
- Se añadieron la propuesta comercial/precios piloto y la política de seguridad del repositorio público.
- Se actualizaron README, plan maestro, monetización y registro de decisiones.
- No se ha comenzado la implementación de la aplicación.
- No se han creado productos reales en App Store Connect, Google Play, Stripe, Mercado Pago o RevenueCat.
- No se han creado migraciones ni tablas de facturación.
- No se ha verificado toda la configuración de GitHub Settings, Actions, secrets, reglas de rama o historial completo.

## 2. Documentos rectores

1. [README](../README.md) — punto de entrada.
2. [Plan maestro](PLAN-MAESTRO.md) — visión, arquitectura, seguridad, etapas.
3. [Monetización y licencias](MONETIZACION-Y-LICENCIAS.md) — modelo de compra y derechos.
4. [Propuesta comercial y precios](PROPUESTA-COMERCIAL-Y-PRECIOS.md) — precios piloto, simulaciones y proveedores.
5. [Seguridad del repositorio público](SEGURIDAD-REPOSITORIO-PUBLICO.md) — decisión de visibilidad y controles.
6. [Registro de decisiones](REGISTRO-DE-DECISIONES.md) — decisiones, hipótesis y revisiones.
7. [Puerta de preprogramación](PUERTA-PREPROGRAMACION.md) — bloqueos reales y secuencia para iniciar código.

## 3. Decisiones de trabajo vigentes

- Mantener Fixora-Balance público mientras el contenido sea documentación y código que aceptemos publicar. Revaluar antes de incorporar secretos, propiedad intelectual confidencial o despliegues sensibles.
- Precios piloto en México: Plus $79/$799; Protección $49/$499; Family $109/$1,099; Completo $179/$1,799; extensión +3 dispositivos $29/$299 MXN (mensual/anual). Aprobados como base inicial de trabajo, no definitivos ni publicados.
- Prueba integral de 14 días, una vez por cuenta elegible, con conversión transparente al plan elegido.
- Stripe Billing como candidato web; Mercado Pago como alternativa a comparar.
- StoreKit e IAP en iOS; Google Play Billing en Android. No asumir catálogo modular acumulable sin prototipo de compras y cambios de plan.
- RevenueCat se evaluará como capa de integración, no como reemplazo del ledger de derechos de Fixora.
- Backend como autoridad de compras y entitlements; eventos verificados e idempotentes.
- No lifetime para módulos con costes recurrentes en esta fase.

## 4. Pendientes que bloquean comenzar la implementación funcional

### Producto y negocio
- [x] Aceptar precios piloto como base inicial de trabajo; revisar y ajustar antes de publicación.
- [x] Definir recomendación de MVP: Free + Plus Personal; Protección y Family quedan en fases posteriores hasta validar APIs, permisos, políticas y riesgos.
- [ ] Confirmar semántica del límite Plus de tres dispositivos; Family (3 perfiles/5 dispositivos) queda pendiente para su fase.
- [ ] Definir exactamente qué incluye cada módulo y qué no.
- [ ] Validar demanda/disposición de pago con usuarios reales.
- [ ] Decidir mercados e idiomas iniciales.

### Compras y licencias
- [ ] Construir matriz completa SKU → entitlements → límites → plataforma.
- [ ] Probar en Apple Sandbox el catálogo, grupos, prueba, upgrades y cancelación sin doble cobro.
- [ ] Probar Google Play Billing en entorno de prueba.
- [ ] Comparar Stripe y Mercado Pago con el mismo conjunto de escenarios.
- [ ] Elegir proveedor web.
- [ ] Definir reembolsos, contracargos, grace period y política de vencimiento.
- [ ] Validar impuestos, CFDI y obligaciones con contador/asesor fiscal.

### Plataforma y privacidad
- [ ] Validar APIs/entitlements nativos de iOS y Android en dispositivos reales.
- [ ] Confirmar qué funciones pueden lanzarse en ambas plataformas.
- [ ] Completar threat model y modelo de datos.
- [ ] Definir política de privacidad y evaluación legal de funciones infantiles.
- [ ] Decidir licencia del repositorio y estrategia público/privado para código ejecutable.

### GitHub y seguridad
- [ ] Verificar Dependency Graph, Dependabot, Secret Scanning y Push Protection.
- [ ] Verificar Actions permissions y workflows; actualmente no se ha auditado la configuración completa.
- [ ] Definir reglas de protección para main.
- [ ] Revisar colaboradores, GitHub Apps, tokens y secretos.
- [ ] Establecer política de CI y límites de gasto.
- [ ] Confirmar qué documentación y código pueden permanecer públicos.

La lista de bloqueos y criterio exacto de salida está en [PUERTA-PREPROGRAMACION.md](PUERTA-PREPROGRAMACION.md).

## 5. Próxima secuencia recomendada

1. Resolver las decisiones de catálogo y límites.
2. Revisar matriz SKU/derechos y escenarios de upgrades/downgrades por canal; resolver límites de dispositivos y beneficiarios.
3. Probar técnicamente las compras Sandbox sin cobros reales.
4. Validar APIs nativas críticas de iOS/Android.
5. Cerrar seguridad, privacidad y licencia.
6. Revisar y aprobar la arquitectura y el esquema de datos antes de crear migraciones.
7. Solo entonces iniciar el código de la aplicación y las migraciones de desarrollo.

## 6. Bitácora de sesiones

### 2026-11-06 — Aprobación de precios piloto y cierre documental previo a programación
**Trabajo realizado**
- El responsable del producto aprobó los precios MXN propuestos como referencia inicial de trabajo, sujetos a revisión antes de publicación.
- Confirmada la recomendación de MVP: Free + Plus Personal; Protección y Family continúan en la visión, pero quedan condicionados a prototipos nativos, permisos, políticas y revisión legal.
- Creados ALCANCE-MVP-Y-CRITERIOS-ACEPTACION.md, MATRIZ-CATALOGO-ENTITLEMENTS.md, MATRIZ-CAPACIDADES-NATIVAS.md, MODELO-DATOS-Y-ARQUITECTURA.md, THREAT-MODEL-INICIAL.md y PUERTA-PREPROGRAMACION.md.
- Actualizados README, PLAN-MAESTRO, MONETIZACION-Y-LICENCIAS, PROPUESTA-COMERCIAL-Y-PRECIOS, REGISTRO-DE-DECISIONES y ESTADO-Y-BITACORA para reflejar el nuevo estado.
- Revisadas fuentes oficiales Apple Family Controls, Google Play VpnService y Supabase Production Security Checklist.

**Decisiones**
- Precios piloto aceptados como base, no finales ni publicados.
- MVP funcional prioriza Free + Plus; Protección/Family quedan para fases posteriores con puertas explícitas.
- No iniciar migraciones hasta cerrar los límites de dispositivos, canal/proveedor inicial, retención y autorización de datos.

**Pendientes críticos**
- Resolver si los dispositivos personales del tutor cuentan dentro de los cinco dispositivos Family.
- Elegir plataforma/canal inicial y confirmar mínimos de iOS/Android.
- Auditar Settings, workflows, permisos de Actions, secretos, licencia y protección de main.
- Prototipos UsageStats, FamilyControls y VpnService antes de activar funciones dependientes.
- Validar fiscalidad, privacidad infantil, términos y reembolsos con asesoría adecuada.

## 6. Bitácora de sesiones

### 2026-11-06 — Modelo comercial y decisión de repositorio
**Trabajo realizado**
- Revisado el modelo Free, módulos individuales, Balance Completo, extensión y prueba de 14 días.
- Investigados precios de Opal, ScreenZen y Ohana como referencias de mercado.
- Revisadas tarifas públicas de Stripe y Mercado Pago.
- Revisados RevenueCat, App Store subscriptions, Apple subscription groups, App Store Small Business Program y tarifas Google Play.
- Revisada documentación de GitHub Actions billing y seguridad de repositorios públicos.
- Confirmado que Fixora-Balance aparece público y con main como rama por defecto.
- Comprobados los cuatro documentos anteriores antes de actualizarlos.
- Creados PROPUESTA-COMERCIAL-Y-PRECIOS.md y SEGURIDAD-REPOSITORIO-PUBLICO.md.
- Actualizados README, PLAN-MAESTRO, MONETIZACION-Y-LICENCIAS y REGISTRO-DE-DECISIONES.
- Corregidas las simulaciones netas de Stripe tras revisar la aritmética de las comisiones.

**Decisiones**
- Mantener público por ahora con política estricta de no secretos.
- Definir precios piloto en MXN como hipótesis de validación, no precios definitivos.
- Prueba única de 14 días.
- Diferenciar modelo de compras web y de tiendas móviles.
- No empezar código funcional hasta cerrar puertas pendientes.

**Riesgos abiertos**
- No se ha auditado el historial completo ni Settings de GitHub.
- No se ha confirmado la elegibilidad Apple Small Business ni el contrato real de proveedores.
- El catálogo modular de iOS requiere pruebas Sandbox antes de comprometer UX y cobros.
- Precios y límites requieren validación de costes y usuarios.

---

## 7. Regla de continuidad

No afirmar que algo está implementado solo porque está descrito. No modificar ramas, visibilidad, servicios de pago, bases de datos o configuración de producción sin inspección previa y autorización adecuada. Cada cambio sustancial debe actualizar este archivo, el plan maestro y el registro de decisiones.
