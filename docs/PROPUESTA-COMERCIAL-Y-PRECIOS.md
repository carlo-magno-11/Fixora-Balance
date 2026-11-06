# Fixora Balance — Propuesta comercial y precios piloto

**Versión:** 1.0  
**Fecha:** 6 de noviembre de 2026  
**Mercado inicial supuesto:** México, precios en MXN  
**Estado:** precios piloto aceptados como base inicial de trabajo; no definitivos, no publicados y sin autorización para crear productos ni cobrar.

## 1. Recomendación ejecutiva

Propongo un catálogo con tres módulos comprables por separado, un paquete integral y una extensión de capacidad. La suscripción debe financiar mantenimiento, actualizaciones, filtrado y soporte continuos; por eso no recomiendo licencias de por vida para estos módulos.

**Precios piloto recomendados (MXN):**

| Producto | Mensual | Anual | Ahorro anual aproximado |
|---|---:|---:|---:|
| Plus Personal | $79 | $799 | 15.7 % |
| Protección Personal | $49 | $499 | 15.1 % |
| Family | $109 | $1,099 | 16.0 % |
| Balance Completo | $179 | $1,799 | 16.2 % frente a 12 pagos mensuales |
| Extensión +3 dispositivos | $29 | $299 | 14.1 % |

Los importes han sido aceptados por el responsable del producto como precios piloto iniciales para diseño, simulaciones y validación. No son precios definitivos ni una autorización para publicarlos o cobrar. Antes del lanzamiento se probarán con entrevistas, landing page, disposición de pago y análisis de costes reales. Mostrar siempre el total anual cobrado, no solo su equivalente mensual.

### Por qué estos precios
- Opal publica $99.99 USD al año y $19.99 USD al mes para Pro. Es un referente internacional, no una equivalencia directa para México.
- ScreenZen ofrece una alternativa gratuita financiada por donaciones, lo que demuestra presión competitiva de opciones sin suscripción.
- En la App Store mexicana, Ohana muestra varios productos familiares y una suscripción mensual de $199 MXN. Es una referencia de categoría, no una comparación funcional exacta.
- Fixora quedaría en una franja de entrada accesible, pero debe sostener costes reales de filtrado, soporte y mantenimiento.

Fuentes: https://opalapp.com/pricing · https://screenzen.co/ · https://apps.apple.com/mx/app/control-parental-de-ohana/id1613169688

## 2. Qué compra cada persona

### Free — $0
- Objetivos y sesiones básicas.
- Pausas conscientes.
- Resumen simple.
- Recordatorios configurables limitados.
- Datos locales y exportación básica cuando se implemente.

Debe seguir siendo útil; no bloquear lo esencial para forzar el pago.

### Plus Personal — $79/mes o $799/año
- Sesiones y horarios avanzados.
- Límites y reglas personales avanzadas, sujetos al sistema operativo.
- Hábitos, estadísticas ampliadas y progreso consciente.
- Personalización y rutinas.
- Hasta 3 dispositivos personales como límite comercial inicial propuesto, sujeto a pruebas de sincronización y soporte.

### Protección Personal — $49/mes o $499/año
- Filtrado DNS y listas de protección compatibles.
- Bloqueo de dominios de rastreo, phishing y malware.
- Categorías de navegación elegibles, con contenido adulto solo donde la capacidad técnica y las reglas de plataforma lo permitan.
- Listas permitidas/bloqueadas y excepciones.
- Hasta 3 dispositivos protegidos como límite inicial propuesto.

No prometer eliminación de todos los anuncios ni filtrado de contenido dentro de cualquier aplicación.

### Family — $109/mes o $1,099/año
- Un administrador/tutor.
- Hasta 3 perfiles infantiles.
- Hasta 5 dispositivos administrados en total.
- Reglas por perfil, horarios, filtros, solicitudes y resúmenes.
- Transparencia visible para los menores y controles de privacidad.
- Los límites son hipótesis comerciales que deben validarse con pruebas técnicas y entrevistas.

Family no incluye automáticamente todos los derechos avanzados de Plus y Protección Personal. Esa separación evita solapamientos y permite explicar qué aporta Balance Completo.

### Balance Completo — $179/mes o $1,799/año
- Plus Personal.
- Protección Personal.
- Family.
- Límites combinados: hasta 5 dispositivos administrados y 3 perfiles infantiles, además de las reglas de dispositivos personales que se definan en la matriz final.
- Una sola suscripción y una sola pantalla de gestión.

Ahorro frente a comprar los tres módulos:
- Mensual: $79 + $49 + $109 = $237; Completo $179; ahorro $58 (24.5 %).
- Anual: $799 + $499 + $1,099 = $2,397; Completo $1,799; ahorro $598 (24.9 %).

### Extensión de capacidad — +3 dispositivos
- $29/mes o $299/año.
- Solo disponible para planes que ya incluyen el derecho base correspondiente.
- Se cobra mientras la capacidad adicional esté activa.
- No es un desbloqueo permanente ni una compra de por vida.
- No lanzar hasta comprobar costes de sincronización, soporte y límites nativos.

No propongo vender perfiles infantiles adicionales en el primer catálogo: primero validemos el modelo de tres perfiles y cinco dispositivos.

## 3. Prueba de 14 días

**Recomendación:** una prueba de 14 días de Balance Completo, una sola vez por cuenta elegible y por ecosistema de compra cuando el proveedor lo permita.

- Debe incluir únicamente las funciones premium realmente lanzadas y probadas.
- El usuario elige desde el inicio mensual ($179) o anual ($1,799).
- Se informa claramente fecha de fin, precio posterior, periodicidad y renovación automática.
- Se requiere método de pago en la oferta con renovación automática, según las reglas del proveedor.
- No se cobra durante los 14 días.
- Avisos opcionales a 3 días y 24 horas antes del fin.
- Cancelar antes de la fecha indicada impide el cobro posterior; el acceso continúa hasta el final de la prueba cuando las reglas del proveedor lo permitan.
- Una prueba no se reinicia por añadir módulos, cambiar de dispositivo ni cambiar de plan.
- En la web, usar una sola elegibilidad de prueba por cuenta verificada y señales antiabuso proporcionadas, sin fingerprinting invasivo.
- En tiendas, respetar elegibilidad y ofertas introductorias que determinen Apple/Google; la cuenta Fixora por sí sola no anula la elegibilidad de la tienda.

No activar una prueba automática para perfiles infantiles sin que el tutor comprenda y acepte las reglas. En el primer lanzamiento, si Family aún no está validado, la prueba integral se limita a los módulos que sí estén lanzados.

## 4. Arquitectura de catálogo y derechos

Separar:
1. **SKU/producto comercial:** Plus mensual, Plus anual, Family, Completo, extensión.
2. **Entitlements/derechos:** focus_advanced, habit_advanced, insights_plus, privacy_dns, family_profiles, family_controls, extra_device_slots.
3. **Suscripción/transacción:** quién cobró, cuánto, moneda, ciclo, estado y referencia del proveedor.
4. **Asignación:** qué cuenta, grupo familiar o dispositivo consume cada derecho.

El backend conserva un ledger auditable de concesiones y revocaciones. El cliente nunca crea derechos por sí solo.

### Regla de upgrade
Si alguien compra Plus y después quiere Completo:
- Mostrar derechos actuales y nuevo contenido.
- Calcular crédito solo cuando el proveedor garantice importe, fecha y prorrateo.
- Si no existe prorrateo seguro, programar el cambio para la siguiente renovación o ejecutar un flujo de cancelación/alta con confirmación clara.
- No mantener dos cobros por el mismo derecho de manera inadvertida.
- No cancelar la compra anterior hasta confirmar el cambio nuevo o tener un plan de transición que preserve el acceso.

### Regla de downgrade
- Programar para el siguiente ciclo por defecto.
- No eliminar datos ni configuraciones.
- Informar qué funciones dejan de estar activas y cuándo.
- No reducir silenciosamente protecciones familiares críticas; avisar al tutor y diseñar una transición segura.

## 5. Decisión importante: web vs tiendas móviles

La intención comercial es permitir módulos independientes y paquete integral en todos los canales, pero no debemos prometer la misma mecánica hasta probarla.

### Web
Stripe Billing es el candidato inicial recomendado por su API, gestión de suscripciones, pruebas y prorrateos. Su tarifa publicada en México muestra 3.6 % + MXN 3 por tarjeta nacional y Stripe Billing 0.7 % del volumen de Billing. La tarifa excluye IVA y otros métodos/tarjetas pueden tener cargos distintos.

Mercado Pago es una alternativa importante para México. Su página pública de suscripciones muestra 3.19 % + IVA con disponibilidad inmediata o 2.89 % + IVA en 10 días; la documentación API permite configurar pruebas, reintentos y prorrateo. Confirmar contrato, método, API y tarifa efectiva antes de elegir.

Recomendación: empezar con un solo procesador web, no mantener Stripe y Mercado Pago simultáneamente desde el primer MVP. Probar ambos en sandbox y elegir por tasa de aprobación, métodos de pago, reintentos, conciliación, soporte y coste neto.

### iOS
Para desbloquear funciones digitales dentro de la app, diseñar con StoreKit / In-App Purchase, salvo excepción regional y entitlement confirmado.

Apple permite una suscripción por usuario dentro de cada grupo de suscripción; los productos del mismo grupo se ordenan como niveles y el cambio de nivel tiene reglas propias. Se pueden ofrecer suscripciones junto con compras a la carta, pero no debemos asumir que el catálogo modular recurrente puede apilarse como en Stripe.

**Recomendación para iOS:** en el primer lanzamiento comercial, usar una suscripción de niveles claramente definidos (por ejemplo, Plus y Completo) y no activar la compra acumulativa de módulos recurrentes hasta que una prueba Sandbox demuestre un recorrido sin doble facturación. Evaluar Family como nivel o producto separado solo después de validar el modelo de grupos y la experiencia de cambio. La compra de módulos a la carta puede quedar para una fase posterior si no se puede implementar de manera clara y conforme.

### Android
Usar Google Play Billing para productos digitales dentro de la app, salvo excepción aprobada. Probar suscripciones, base plans, ofertas, cambios, grace period, cancelación y restauración. No asumir que Google Play Billing funciona igual que Stripe.

### Compras multiplataforma
Apple permite en ciertos términos que una app multiplataforma reconozca compras hechas en otros canales, siempre que esos productos también estén disponibles como IAP y se respeten las reglas de comunicación y compra. No usar esto como excusa para poner un enlace de checkout web dentro de la app sin revisión de la política del storefront.

### RevenueCat
Evaluarlo como capa de integración para StoreKit y Google Play Billing. Su precio público indica sin coste hasta USD 2,500 de ingresos mensuales monitorizados y luego 1 % del volumen monitorizado, sujeto a términos vigentes. No reemplaza nuestro catálogo de dominio ni el ledger de auditoría.

## 6. Simulación de ingresos netos (solo referencia)

### Web con Stripe
Ejemplo de tarjeta nacional, usando 3.6 % + $3 de Payments y 0.7 % de Stripe Billing sobre el volumen de suscripciones:

| Producto | Precio | Neto aproximado antes de impuestos y costes operativos |
|---|---:|---:|
| Plus mensual | $79 | $72.60 |
| Protección mensual | $49 | $43.89 |
| Family mensual | $109 | $101.31 |
| Completo mensual | $179 | $168.30 |
| Plus anual | $799 | $761.64 |
| Protección anual | $499 | $474.54 |
| Family anual | $1,099 | $1,048.74 |
| Completo anual | $1,799 | $1,718.64 |

Cálculo ilustrativo: precio menos 3.6 % y $3 de procesamiento, menos 0.7 % de Billing. No es cotización ni payout garantizado. No incluye IVA/impuestos, conversión, reembolsos, contracargos, soporte, infraestructura ni otros métodos.

### Web con Mercado Pago
Con tarifa pública de 3.19 % + IVA (asumiendo IVA del 16 % sobre la comisión, supuesto que debe confirmar contador y liquidación del proveedor), la comisión efectiva ilustrativa sería ~3.70 %:
- $79 → comisión aprox. $2.93; antes de otros costes quedarían $76.07.
- $179 → comisión aprox. $6.62; quedarían $172.38.
La modalidad de 10 días publica 2.89 % + IVA. Confirmar si la tarifa aplica igual a la integración API y al método elegido.

### Tiendas
- Apple Small Business Program: 15 % si Fixora resulta elegible y está aceptado; de lo contrario, el régimen de suscripciones puede dejar 70 % de proceeds durante el primer año de servicio pagado y 85 % después, menos impuestos y ajustes.
- Google Play: para mercados que siguen el esquema anterior a la expansión regional de 2026, las suscripciones auto-renovables se publican al 15 %. Confirmar storefront y términos vigentes al lanzamiento.
- RevenueCat puede añadir coste después del umbral de MTR publicado.

No mezclar comisión de tienda con la comisión del procesador web; son canales diferentes.

## 7. ¿Qué proveedor recomiendo?

| Canal | Recomendación actual | Por qué | Condición para aprobar |
|---|---|---|---|
| iOS | StoreKit + evaluar RevenueCat | Cumplimiento y gestión de renovaciones | Sandbox con cambios y restauración |
| Android | Play Billing + evaluar RevenueCat | Cumplimiento y ciclo de suscripción | Sandbox con eventos, gracia y reembolso |
| Web México | Stripe Billing como candidato | API, prorrateo, portal y control del ciclo | Comparación real contra Mercado Pago |
| Alternativa web | Mercado Pago | Métodos locales y suscripciones | Validar API, webhooks y conciliación |

No elegir proveedor solo por porcentaje de comisión. Medir aprobación, fraude, contracargos, soporte, payout, conciliación y conversión.

## 8. Reglas de protección de ingresos

- El backend define precio, moneda, producto y elegibilidad.
- Webhook firmado, autenticado, idempotente y tolerante a eventos fuera de orden.
- No conceder acceso por URL de retorno ni por una variable del cliente.
- No duplicar transacciones por doble clic o reintento.
- Ledger inmutable de concesiones y revocaciones.
- Conciliación diaria entre proveedor, suscripciones, transacciones, reembolsos y liquidaciones.
- Ajustes administrativos con MFA, motivo y auditoría.
- Secretos solo en servidor/gestor de secretos; nunca en bundle móvil o repositorio.
- Pruebas de pago pendiente, renovación fallida, disputa, reembolso, webhook repetido, replay y cambio de plan.
- No retirar acceso por una demora interna de webhook sin consultar el estado real del proveedor.
- No usar pruebas o promociones para conceder derechos ilimitados.

## 9. Puertas de decisión antes de programar

1. **Precios piloto:** aceptados como base de trabajo; recalcular antes de publicación con costes, impuestos, comisiones, margen y validación de usuarios.
2. Confirmar si el lanzamiento inicial es Free + Plus, o si también sale Protección.
3. Confirmar límites de 3 dispositivos personales, 3 perfiles infantiles y 5 dispositivos Family.
4. Probar el catálogo real en App Store Connect Sandbox y Play Billing test.
5. Elegir un procesador web tras prueba técnica Stripe vs Mercado Pago.
6. Aprobar el diseño de la prueba de 14 días por canal.
7. Definir política de reembolso, impuestos, CFDI y obligaciones fiscales con asesoría profesional.
8. Cerrar la matriz exacta de entitlements.
9. Aprobar threat model y modelo de datos.
10. Actualizar el plan maestro y el registro de decisiones antes de crear migraciones.

## 10. Fuentes consultadas

- GitHub Actions billing: https://docs.github.com/en/actions/concepts/billing-and-usage
- Stripe México: https://stripe.com/mx/pricing
- Stripe Billing México: https://stripe.com/mx/billing/subscriptions
- Mercado Pago suscripciones y tarifas: https://www.mercadopago.com.mx/herramientas-para-vender/suscripciones
- Mercado Pago API: https://www.mercadopago.com.mx/developers/es/docs/subscriptions/overview
- RevenueCat pricing: https://www.revenuecat.com/pricing
- Apple App Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Apple Subscription Groups: https://developer.apple.com/help/app-store-connect/reference/in-app-purchases-and-subscriptions/auto-renewable-subscription-information
- Apple subscriptions: https://developer.apple.com/app-store/subscriptions/
- Apple Small Business Program: https://developer.apple.com/app-store/small-business-program/
- Google Play service fees: https://support.google.com/paymentscenter/answer/112622?hl=en
- Opal pricing: https://opalapp.com/pricing
- ScreenZen: https://screenzen.co/
- Ohana App Store México: https://apps.apple.com/mx/app/control-parental-de-ohana/id1613169688

Revisar tarifas, impuestos y políticas de nuevo antes de abrir ventas.
