# Fixora Balance — Catálogo y matriz SKU → entitlements

**Versión:** 1.0 | **Fecha:** 6 de noviembre de 2026  
**Estado:** modelo de dominio propuesto. Precios piloto aceptados como base de trabajo, no publicados.

## 1. Separación obligatoria

- SKU: qué se vende y cómo se factura.
- Entitlement: derecho técnico atómico.
- Transacción/suscripción: evidencia del proveedor y período.
- Asignación: cuenta, grupo o dispositivo beneficiario.
- Límite: cantidad máxima permitida.
- Oferta de tienda: ID externo específico de Apple, Google o web.

El nombre del paquete nunca debe ser la autoridad de acceso. El backend calcula derechos vigentes desde concesiones verificadas.

## 2. Catálogo piloto México (MXN)

| SKU | Mensual | Anual | Estado |
|---|---:|---:|---|
| free | $0 | $0 | Base permanente |
| plus_personal | $79 | $799 | Precio piloto aceptado |
| protection_personal | $49 | $499 | Aceptado; no lanzar aún |
| family | $109 | $1,099 | Aceptado; no lanzar aún |
| balance_complete | $179 | $1,799 | Aceptado; sujeto a disponibilidad real de módulos |
| extra_device_3 | $29 | $299 | Aceptado; aplazado |

Los importes son una referencia aprobada para diseño, pruebas de sensibilidad y modelo financiero. No son precios definitivos, oferta pública ni autorización para crear productos o cobrar. Antes de publicar recalcular costes, impuestos, comisiones, soporte, infraestructura, conversión y percepción de valor.

## 3. Derechos atómicos

| Derecho | Función |
|---|---|
| focus_basic | Sesiones y objetivos básicos |
| focus_advanced | Sesiones, horarios y reglas avanzadas |
| habits_basic | Seguimiento básico |
| habits_advanced | Rutinas y hábitos avanzados |
| insights_basic | Resumen simple |
| insights_plus | Estadísticas y tendencias ampliadas |
| progress_basic | Progreso básico |
| progress_plus | Misiones, niveles, insignias y personalización |
| reminders_basic | Recordatorios básicos |
| reminders_advanced | Programación/frecuencia avanzada |
| privacy_dns | Protección DNS compatible |
| privacy_lists | Listas y categorías |
| family_profiles | Perfiles familiares |
| family_controls | Reglas y horarios familiares |
| family_requests | Solicitudes/aprobaciones |
| extra_device_slots | Capacidad adicional |

## 4. Matriz de asignación

| SKU | Derechos |
|---|---|
| free | focus_basic, habits_basic, insights_basic, progress_basic, reminders_basic |
| plus_personal | focus_advanced, habits_advanced, insights_plus, progress_plus, reminders_advanced |
| protection_personal | privacy_dns, privacy_lists |
| family | family_profiles, family_controls, family_requests |
| balance_complete | Unión de Plus + Protección + Family |
| extra_device_3 | extra_device_slots |

Family no concede Plus automáticamente a cada miembro, salvo que el producto final lo diga explícitamente. Los derechos de Protección y Family se definen ahora, pero quedan fuera del MVP.

## 5. Límites piloto propuestos

- Plus/Protección: hasta 3 dispositivos personales por titular.
- Family: 1 tutor, hasta 3 perfiles infantiles y 5 dispositivos administrados.
- Completo: no sumar límites ambiguos.
- Extensión +3: solo sobre límite base correspondiente, recurrente y nunca lifetime.

**Pendiente bloqueante:** definir si los dispositivos personales del tutor cuentan dentro de los cinco dispositivos Family o si Completo permite cinco familiares más tres personales. No asumir ocho dispositivos ni vender extensión hasta resolverlo.

## 6. Reglas anti doble cobro

1. Evaluar derechos por beneficiario, alcance y período.
2. No cobrar dos productos por el mismo derecho y período sin consentimiento claro.
3. Al cambiar a Completo, usar prorrateo/crédito solo si proveedor confirma importe y fecha.
4. Si no hay prorrateo fiable, programar cambio al siguiente ciclo o pedir confirmación explícita.
5. No cancelar producto anterior antes de confirmar transición que preserve acceso.
6. Detectar suscripciones de otro canal y evitar crear una segunda silenciosamente.
7. Reembolsos/disputas revierten derechos de forma trazable.
8. Promociones tienen vigencia, elegibilidad y fuente.

## 7. Restricciones por canal

**Apple:** comenzar con niveles de suscripción claros; probar compra, cambio, cancelación, restauración y doble cobro en Sandbox antes de módulos acumulables.

**Google Play:** probar base plans, ofertas, reemplazo, gracia, pausa, cancelación, reembolso y restauración.

**Web:** un solo procesador en MVP; Stripe candidato inicial y Mercado Pago comparativo en sandbox.

## 8. Reglas backend

- Catálogo versionado por vigencia, canal, región y moneda.
- Índice único por proveedor + event_id.
- Idempotencia en checkout y webhooks.
- No confiar en SKU, precio, moneda ni estado enviados por cliente.
- Caché local con expiración; offline no extiende períodos.
- Ajustes manuales con MFA, rol, motivo y auditoría.
- Conservar historial financiero y de derechos.

## 9. Pruebas obligatorias

Free sin compra; Plus mensual/anual; prueba de 14 días única; Plus→Completo; compra de módulo adicional; cambio entre canales; renovación; fallo/gracia; cancelación; reembolso/disputa; webhook duplicado/fuera de orden; dispositivo excedente; restauración; expiración con datos conservados; manipulación de entitlement desde cliente.

## 10. Cierre antes de SQL

Aprobar límites/beneficiarios, primer canal, comportamiento de tiendas, fiscalidad/reembolsos, threat model y esquema relacional. Solo entonces convertir esta matriz en catálogo ejecutable.
