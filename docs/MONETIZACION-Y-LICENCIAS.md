# Fixora Balance — Monetización, paquetes, pruebas y licencias

**Versión:** 1.0  
**Fecha:** 6 de noviembre de 2026  
**Estado:** propuesta recomendada para validar; no hay productos ni cobros configurados.

---

## 1. Decisión comercial principal

Fixora Balance tendrá un catálogo modular y un sistema central de derechos.

El usuario podrá empezar con Free, comprar un módulo individual, añadir otro módulo después, cambiar a un paquete completo y ampliar la capacidad de su plan cuando necesite más dispositivos o miembros familiares.

**Regla innegociable:** un usuario no paga dos veces por el mismo derecho y período. Al pasar de módulos separados al paquete completo, el sistema calcula los derechos ya activos y solo cobra la diferencia que corresponda, o programa un cambio para el siguiente ciclo cuando el prorrateo inmediato no sea posible o no sea transparente.

Separar tres conceptos:
- Producto comercial: lo que el cliente compra.
- Derecho/entitlement: lo que puede usar.
- Plan de facturación: cuánto, cuándo y mediante qué proveedor paga.

Un producto puede conceder varios derechos; varios productos pueden conceder el mismo derecho. Esta separación permite cambiar precios y paquetes sin reescribir la lógica de acceso.

---

## 2. Catálogo propuesto

Los nombres son de trabajo. La matriz exacta de funciones y límites se debe validar con el coste real de soporte y las capacidades técnicas.

| Oferta | Qué incluye | Modalidad propuesta |
|---|---|---|
| **Free** | Objetivos básicos, sesiones simples, pausas y resumen básico | Gratis permanente |
| **Plus Personal** | Enfoque avanzado, horarios, límites, hábitos, estadísticas ampliadas y personalización | Suscripción mensual/anual |
| **Protección Personal** | DNS, listas de protección, privacidad y controles personales ampliados | Add-on mensual/anual |
| **Family** | Perfiles familiares, reglas, filtros, informes y controles parentales | Suscripción mensual/anual |
| **Balance Completo** | Plus + Protección Personal + Family y futuras funciones incluidas explícitamente | Suscripción mensual/anual |
| **Extensión de capacidad** | Dispositivos/miembros adicionales por encima del límite base | Add-on recurrente |

### Decisiones deliberadas
- Free debe ser útil; no una demo que inutilice la aplicación.
- Plus Personal es el primer paquete premium recomendado para el lanzamiento inicial.
- Protección Personal y Family no deben venderse antes de validar permisos, calidad del filtrado y soporte por plataforma.
- Balance Completo debe mostrar exactamente qué incluye y sus límites.
- Las extensiones no desbloquean funciones que el SO no permita.
- No ofrecer lifetime de DNS, listas actualizadas, nube o funciones con coste recurrente hasta tener un fondo de mantenimiento y una política sostenible.
- No vender “bloqueo total de anuncios” ni “control parental infalible”.

### Compra separada vs paquete

Ejemplo conceptual:
- La persona compra Plus Personal.
- Un mes después compra Protección Personal.
- Más adelante decide pasar a Balance Completo.

En la conversión a Completo:
1. Mostrar los derechos que ya tiene.
2. Mostrar el precio completo y el crédito aplicable por período no consumido.
3. Mostrar si el cambio es inmediato o empieza en la siguiente renovación.
4. Evitar que suscripciones antiguas y la nueva sigan cobrando a la vez.
5. Conservar historial y comprobantes.
6. Confirmar el cambio solo después de que el proveedor confirme la transacción.

No cancelar anticipadamente la compra anterior hasta tener confirmación suficiente de que la nueva compra se completó, para no dejar al usuario sin acceso. En compras de tiendas, cambios y prorrateos están sujetos a las capacidades y reglas de cada tienda.

---

## 3. Prueba gratuita de 14 días

### Recomendación

Ofrecer una **prueba integral de 14 días de Balance Completo**, una sola vez por cuenta elegible. La prueba incluye las funciones premium que estén realmente listas y permitidas en el dispositivo. No incluir funciones experimentales ni prometer filtros/bloqueos que no hayan superado pruebas.

¿Por qué una prueba integral y no 14 días por cada módulo?
- Evita que una misma persona encadene pruebas gratuitas para usar todos los módulos indefinidamente.
- Permite entender el valor completo del producto.
- Simplifica elegibilidad, soporte y medición.
- Reduce la posibilidad de abuso por múltiples compras de prueba.

### Flujo recomendado
1. El usuario crea y verifica su cuenta.
2. Se explica duración, alcance, fecha de finalización y precio posterior.
3. El usuario elige el plan al que se convertirá al terminar (mensual o anual) y confirma explícitamente la renovación.
4. El proveedor de pago valida/adjunta el método requerido por la plataforma.
5. Se activa el derecho de prueba durante exactamente 14 días.
6. Enviar avisos claros antes de finalizar (por ejemplo, 3 días y 24 horas antes, si el usuario acepta notificaciones/email).
7. Si cancela antes del vencimiento, no debe generarse el cobro posterior; el acceso permanece hasta la fecha final cuando el proveedor así lo permita.
8. Si no cancela, el proveedor intenta el primer cobro al concluir la prueba.
9. Si el cobro falla, aplicar el estado de gracia definido por el proveedor; no marcarlo como pagado.

La pantalla debe decir de forma destacada:
- “14 días gratis”.
- “Después: [precio y periodicidad exactos]”.
- Fecha y hora local de fin.
- Que se renovará automáticamente si no cancela.
- Dónde cancelar.
- Qué funciones dejan de estar disponibles al terminar.
- Que cancelar la prueba evita el cobro, según las reglas de la plataforma.

No ocultar precio posterior ni usar botones confusos. El consentimiento a la conversión debe quedar registrado.

### Antiabuso sin castigar a familias legítimas
- Una prueba integral por cuenta comercial verificada.
- Verificación de correo.
- Identificador de elegibilidad en servidor.
- Señales proporcionadas: historial de prueba, cuenta de tienda, método de pago tokenizado/fingerprint que entregue el proveedor, límites de creación y patrones anómalos.
- No usar fingerprinting invasivo ni recopilar contactos, mensajes o historial de navegación para detectar abuso.
- No bloquear automáticamente a todos los miembros de una familia por compartir dispositivo o medio de pago.
- Revisión manual y canal de apelación para falsos positivos.
- Códigos promocionales con duración y elegibilidad explícitas, sin resetear contador de prueba.

No es posible impedir el fraude al 100 %. El objetivo es que repetir cuentas no sea una vía sencilla de obtener acceso indefinido y que las defensas sean proporcionales y auditables.

### ¿Prueba sin tarjeta o con tarjeta?

**Recomendación inicial:** prueba vinculada a un método de pago y a una elección clara de plan. Reduce abuso y coincide con flujos habituales de suscripción. No cobrar durante los 14 días. La interfaz debe advertir que algunos proveedores pueden realizar una autorización/verificación temporal.

Matices:
- Apple y Google tienen mecanismos y reglas propios para ofertas de prueba.
- Google Play indica que verifica que exista un método de pago válido y que puede aparecer una retención temporal; quien cancela durante la prueba no paga al finalizar.
- En web se puede configurar una prueba sin método de pago, pero eso aumenta el abuso y requiere una política diferente.
- Si las pruebas de conversión muestran que exigir tarjeta reduce demasiado la activación, evaluar una prueba web sin tarjeta con controles de abuso y sin conversión automática. No mezclar modelos sin etiquetar su origen y condiciones.

### No conceder prueba por cada add-on

La prueba integral cubre todos los módulos premium elegibles una vez. Comprar un módulo nuevo después no reinicia ni amplía automáticamente los 14 días. Promociones adicionales requieren códigos controlados y auditados.

---

## 4. Extensiones y ampliaciones

La palabra “extensión” debe cubrir dos necesidades diferentes y el producto debe nombrarlas claramente.

### A. Añadir un módulo
Ejemplo: una persona tiene Plus y añade Protección Personal. El backend agrega el derecho de protección y registra el producto/período que lo financia.

### B. Ampliar capacidad
Ejemplo: Family incluye hasta N perfiles y M dispositivos (valores pendientes de validación). La extensión permite más miembros/dispositivos. Debe cobrarse de forma recurrente mientras se utilice la capacidad adicional.

No vender extensiones de tiempo manuales para reactivar indefinidamente un producto vencido sin pago. Un cupón de soporte puede extender acceso como compensación, pero debe quedar como concesión administrativa con motivo, responsable, fecha y auditoría.

### Reglas de cambio
- Upgrade: el usuario ve crédito del tiempo no consumido, nuevo precio y fecha de renovación.
- Downgrade: por defecto se programa para el siguiente ciclo para evitar pérdida inesperada de funciones a mitad de período.
- Cancelación: conserva acceso hasta fin del período pagado, salvo reembolso/contracargo o regla legal/proveedor distinta.
- Reembolso: ajustar derechos de acuerdo con el resultado confirmado del proveedor y la política publicada.
- Cambio entre web y tienda: no crear doble suscripción; identificar el origen de facturación y guiar al usuario a administrar/cancelar en el proveedor correcto.
- No hacer prorrateo propio si el proveedor no confirma importe y fecha. En ese caso, programar el cambio para la siguiente renovación o mostrar un flujo específico aprobado.

---

## 5. Arquitectura de cobros recomendada

### 5.1 Una capa de derechos independiente del proveedor

El backend mantendrá un catálogo de productos y derechos atómicos, por ejemplo:
- focus_advanced
- habit_advanced
- insights_plus
- privacy_dns
- family_profiles
- family_controls
- extra_device_slot

Los nombres son identificadores técnicos provisionales. La aplicación pregunta al backend qué derechos están activos; no deduce permisos a partir del nombre del plan ni de una compra local.

### 5.2 Proveedores por canal

**iOS**
- Para funciones digitales consumidas en la app, diseñar inicialmente con Apple In-App Purchase / StoreKit.
- Incluir restauración de compras.
- Mostrar duración, precio total localizado, contenido, renovación y condiciones de prueba.
- No insertar enlaces ni llamadas a checkout externo salvo que se confirme que una excepción/entitlement regional aplica y se cumplan sus condiciones.
- **Riesgo de catálogo que debe resolverse en prototipo:** las suscripciones de una misma Subscription Group se comportan como opciones de nivel (upgrade/downgrade/crossgrade), no como módulos acumulables independientes. Para vender add-ons acumulables puede requerirse separar grupos de suscripción o usar otra combinación de productos no consumibles/no renovables cuando corresponda. Eso puede permitir varias suscripciones simultáneas y complica el paso a Balance Completo, prorrateos y cancelaciones. No publicar un catálogo iOS hasta probar en Sandbox la compra de dos módulos, la conversión al paquete, restauración y prevención de doble cobro. RevenueCat organiza productos y entitlements, pero no elimina estas reglas de StoreKit/App Store.

**Android / Google Play**
- Para funcionalidades digitales de la app distribuida en Play, usar Google Play Billing salvo una excepción o programa aplicable y aprobado.
- Mostrar precio y condiciones consistentes con Play Billing.
- Implementar estados de gracia, retención y cancelación del ciclo de vida.

**Web**
- Evaluar Stripe Billing como primera opción de checkout recurrente.
- Mercado Pago puede ser alternativa para métodos locales y suscripciones en México; comparar API, webhooks, contracargos, métodos, conciliación y soporte antes de decidir.
- Evitar integrar dos procesadores web al mismo tiempo en la primera versión.

**Capa de integración**
- Evaluar RevenueCat para unificar compras móviles, derechos, ofertas, webhooks y, si encaja, Billing web.
- Su catálogo distingue productos, entitlements y offerings. Puede reducir trabajo de integración, pero añade dependencia y coste al crecer.
- Mantener el modelo de derechos propio en Supabase para que RevenueCat no sea la única fuente de verdad de la cuenta, el grupo familiar o los permisos de dispositivos.
- Antes de contratar, verificar precios vigentes, cobertura de casos de uso, límites, migración y exportación de datos.

### 5.3 Decisión recomendada para MVP comercial
1. No construir un procesador propio.
2. Diseñar abstracción interna de compras y derechos desde el principio.
3. Probar sandbox con RevenueCat + StoreKit + Google Play Billing.
4. Probar Stripe Billing en web como candidato.
5. Lanzar primero el canal web o móvil según el primer mercado y la política de tienda, sin inventar excepciones.
6. Mantener una tabla de origen de compra: Apple, Google, Stripe u otro proveedor.
7. No habilitar un proveedor hasta probar compra, renovación, cancelación, reembolso, restauración y conciliación.

---

## 6. Protección contra cobros incorrectos y acceso regalado

### 6.1 Flujo de compra seguro
1. Cliente solicita comprar un identificador de producto permitido.
2. Backend comprueba que el producto está activo y corresponde a región/plataforma.
3. Backend crea sesión/orden con idempotency key o inicia flujo oficial de tienda.
4. Usuario confirma pago en proveedor.
5. Backend recibe webhook/servidor de tienda.
6. Verifica firma, origen, entorno, cuenta, producto, importe, moneda, estado y referencia.
7. Registra evento con ID único antes de procesarlo.
8. Consulta/valida transacción con proveedor cuando proceda.
9. Actualiza suscripción y derechos dentro de una transacción de base de datos.
10. Devuelve estado actualizado al cliente.
11. Emite confirmación y deja trazabilidad.

Nunca conceder acceso premium únicamente porque el usuario volvió a la app después del checkout, la URL de retorno dice “success”, el cliente envió payment_success=true, se recibió un webhook sin verificar o el usuario mostró un código/captura no validada.

### 6.2 Webhooks y eventos repetidos
- Verificar firma criptográfica según proveedor.
- Rechazar eventos con firma inválida.
- Guardar ID de evento único y proveedor.
- Procesar idempotentemente: recibir dos veces el mismo evento no duplica derecho ni extiende fecha dos veces.
- Tolerar eventos fuera de orden; consultar estado actual con proveedor cuando exista ambigüedad.
- Reintentar fallos transitorios con cola y backoff.
- Registrar eventos no procesables para revisión.
- No confiar en el orden de llegada.
- Separar webhook recibido, validado, aplicado y conciliado.

### 6.3 Libro de derechos (entitlement ledger)

Cada concesión registra:
- Usuario o grupo beneficiario.
- Derecho exacto.
- Producto que lo originó.
- Proveedor y referencia externa.
- Fecha de inicio y fin.
- Estado: pendiente, prueba, activo, gracia, cancelado al final, vencido, reembolsado, revocado o disputa.
- Evento de origen.
- Motivo y auditoría.

Los derechos se derivan de transacciones verificadas y reglas del catálogo. Nunca borrar el historial de una compra para “arreglar” un error; registrar una reversión compensatoria.

### 6.4 Estados de suscripción
Estados de dominio propuestos:
- pending: checkout iniciado, sin confirmación.
- trialing: prueba vigente.
- active: período pagado y vigente.
- grace_period: renovación fallida, acceso temporal según política.
- cancel_at_period_end: cancelación solicitada, derechos hasta fecha final.
- past_due: cobro fallido fuera de gracia.
- expired: terminó el período.
- refunded: proveedor confirmó reembolso y política aplicada.
- disputed: contracargo/disputa en curso.
- revoked: acceso revocado por proveedor, fraude confirmado o decisión administrativa auditada.

Los nombres del proveedor no deben copiarse ciegamente: crear máquina de estados propia y mapear eventos oficiales.

### 6.5 Reglas de seguridad del catálogo
- El cliente no puede elegir precio ni duración.
- Backend resuelve precio desde IDs del catálogo.
- No permitir cantidad arbitraria, moneda no habilitada o producto retirado.
- Guardar versión de precio/terms aceptada.
- Toda promoción tiene fecha, cupo, elegibilidad y límite.
- Un código no puede canjearse dos veces.
- Concesiones administrativas requieren rol, MFA, motivo y auditoría.
- No usar service role en el cliente.
- Pruebas automáticas para doble clic, replay, webhook duplicado, evento tardío, pago fallido, refund y cambio de producto.

---

## 7. Reembolsos, contracargos y errores

- Publicar política de reembolso legible y acorde a ley/tienda.
- Para App Store/Google Play, el reembolso se solicita y decide conforme a mecanismos de tienda; sincronizar resultado.
- Para web, usar portal/proceso del procesador y registrar resolución.
- Ante contracargo, marcar disputed, preservar evidencia y limitar acceso según política proporcional; no borrar datos.
- Si proveedor confirma reembolso total, retirar derechos financiados por esa transacción desde fecha efectiva definida por proveedor/política.
- Si reembolso parcial, resolver explícitamente qué producto/período queda cubierto.
- Si cobro duplicado, reembolsar el duplicado y mantener el derecho cubierto por el pago válido.
- Mantener soporte humano y número de caso.
- Nunca penalizar a un usuario por fallo interno de conciliación.

### Reconciliación financiera
Comparar periódicamente órdenes internas, transacciones del proveedor, webhooks, suscripciones activas, reembolsos y contracargos, depósitos/payouts recibidos, comisiones, impuestos y ajustes.

La facturación bruta no equivale al dinero que llega al banco. Reportar por separado bruto, comisiones, impuestos, reembolsos, contracargos, reservas y neto liquidado.

---

## 8. Distribución del dinero y márgenes

No repartir ingresos por porcentaje fijo entre módulos o equipos todavía. Primero definir costos y obligaciones.

Por transacción calcular:
**Ingreso neto = importe cobrado - impuestos indirectos - comisión del proveedor - reembolso/contracargo - otros costes transaccionales**

Después medir coste de infraestructura por usuario activo, coste de listas/filtrado y actualizaciones, soporte, adquisición, mantenimiento iOS/Android, reservas para reembolsos y contracargos, obligaciones fiscales y margen de contribución por paquete y canal.

Los payouts no necesariamente son instantáneos; dependen del procesador, país, riesgo, calendario y retenciones. No prometer fechas de depósito hasta que proveedor y cuenta estén aprobados.

### Referencias de tarifas consultadas (no cotización contractual)
- Stripe México publica tarifa estándar de tarjeta nacional de 3.6 % + MXN 3 por transacción exitosa; tarjetas internacionales y conversión pueden sumar cargos; precios publicados excluyen IVA. Revisar: https://stripe.com/mx/pricing
- Stripe Billing publica un coste de 0.7 % del volumen de Billing en su página de precios de México; confirmar aplicabilidad al contrato/cuenta y cargos adicionales: https://stripe.com/mx/pricing
- Mercado Pago México publica para una modalidad de suscripciones tarifas que dependen del tiempo de disponibilidad del dinero, con ejemplos de 3.19 % + IVA o 2.89 % + IVA; confirmar tarifa real de API y método: https://www.mercadopago.com.mx/herramientas-para-vender/suscripciones
- Paddle se presenta como Merchant of Record y publica 5 % + USD 0.50 por checkout; puede simplificar impuestos internacionales, pero no asumir que es más barato o cubre todos los casos de tienda móvil: https://www.paddle.com/pricing
- Apple Small Business Program puede reducir comisión a 15 % para desarrolladores elegibles bajo sus condiciones: https://developer.apple.com/app-store/small-business-program/
- Google Play tiene tarifas y programas que pueden variar por tipo de producto, país y elegibilidad; revisar términos vigentes: https://support.google.com/googleplay/android-developer/answer/112622

Estas tarifas son referencias públicas observadas el 6 de noviembre de 2026, no una simulación completa ni asesoría fiscal. Impuestos mexicanos, CFDI, retenciones, IVA de servicios digitales y tratamiento de ingresos requieren validación con contador/asesor fiscal.

---

## 9. Transparencia para el usuario

Cada pantalla de compra debe mostrar nombre del paquete/módulo, funciones incluidas y excluidas, límites de miembros y dispositivos, precio total, moneda y periodicidad, si es pago único o renovación automática, fecha del próximo cobro, condiciones de la prueba, qué pasa al cancelar, qué sucede con datos y configuraciones al vencer, dónde administrar/cancelar, restaurar compras, términos, privacidad y política de reembolso.

Nunca usar precio “por mes” como elemento principal si se cobra el año completo sin mostrar el total anual de forma prominente.

---

## 10. Reglas al vencer

- Los datos y configuraciones no se eliminan al vencer.
- Los derechos premium dejan de estar activos según fecha confirmada.
- Se conserva Free.
- Se informa qué funciones pasan a modo limitado.
- No se borra historial de enfoque ni perfiles por falta de pago.
- Protección de menores: no desactivar reglas críticas silenciosamente. Diseñar transición y avisos al tutor, con evaluación legal y de seguridad.
- En filtrado, la política de degradación debe ser segura y transparente: no afirmar que se mantiene protección si el servicio dejó de estar activo.

---

## 11. Datos y entidades sugeridas (diseño, no migración)

- catalog_products: productos y canal/plataforma.
- catalog_prices: moneda, importe, intervalo, vigencia y versión.
- product_entitlements: derechos concedidos por producto.
- customers: relación usuario/proveedor.
- purchase_transactions: transacciones verificadas.
- subscriptions: estado y período.
- entitlement_grants: concesiones por derecho.
- entitlement_ledger: movimientos inmutables de concesión/revocación.
- trial_eligibility: elegibilidad y prueba consumida.
- billing_events: inbox de webhooks con unicidad por proveedor y event_id.
- billing_reconciliation_runs: resultados de conciliación.
- family_seats: miembros/dispositivos asignados.
- admin_adjustments: ajustes manuales con responsable y motivo.

Las migraciones se diseñarán después de cerrar catálogo, flujos y proveedor. No crear tablas por intuición ni tocar una base de datos ajena al proyecto.

---

## 12. Pruebas obligatorias antes de cobrar

1. Compra exitosa.
2. Cancelación antes de pagar.
3. Pago pendiente y pago asíncrono.
4. Webhook duplicado.
5. Webhook fuera de orden.
6. Firma inválida.
7. Reintento de proveedor.
8. Renovación exitosa.
9. Renovación fallida y gracia.
10. Cancelación al final del ciclo.
11. Reembolso total y parcial.
12. Contracargo.
13. Restauración tras reinstalar.
14. Cambio de dispositivo.
15. Compra en web y acceso en móvil sujeto a política.
16. Módulo individual → módulo adicional.
17. Módulos separados → Balance Completo.
18. Upgrade/downgrade con y sin prorrateo.
19. Cuenta familiar con varios miembros.
20. Intento de repetir prueba.
21. Código promocional usado dos veces.
22. Diferencias de moneda/precio.
23. Cliente offline con derechos expirados.
24. Fallo temporal del backend.
25. Ajuste administrativo con MFA y auditoría.

No activar producción hasta pasar pruebas sandbox y conciliación de punta a punta.

---

## 13. Preguntas que deben cerrarse antes de definir precios

- ¿Cuál es el límite base de dispositivos y miembros de Family?
- ¿Family incluye Plus Personal para el administrador y todos los miembros?
- ¿Protección Personal será independiente o requerirá Plus?
- ¿Qué funciones son locales y cuáles generan coste de servidor continuo?
- ¿El primer lanzamiento comercial será web, Android o iOS?
- ¿Qué países y monedas se habilitan primero?
- ¿Qué proveedor se elige para cada canal?
- ¿Qué margen mínimo se requiere después de impuestos y comisiones?
- ¿Se permitirá prueba sin tarjeta en web?
- ¿Qué política de reembolso se publicará?
- ¿Qué condiciones permiten una concesión promocional?

No publicar precios ni activar cobros hasta cerrar los puntos que alteren margen, obligaciones legales o experiencia de compra.

---

## 14. Fuentes oficiales y técnicas

### Tiendas y compras
- Apple App Review Guidelines, 3.1 Payments: https://developer.apple.com/app-store/review/guidelines/
- Apple IAP y restauración: https://developer.apple.com/documentation/storekit/restoring-purchased-products
- Apple suscripciones y prueba transparente: https://developer.apple.com/app-store/subscriptions/
- Google Play Payments policy: https://support.google.com/googleplay/android-developer/answer/9858738
- Google Play subscription lifecycle y grace period: https://developer.android.com/google/play/billing/lifecycle/subscriptions
- Google Play trial behavior: https://developer.android.com/google/play/billing/subscriptions

### Integración y derechos
- RevenueCat products, entitlements y offerings: https://www.revenuecat.com/docs/projects/configuring-products
- RevenueCat entitlements: https://www.revenuecat.com/docs/getting-started/entitlements
- RevenueCat offerings: https://www.revenuecat.com/docs/offerings/overview
- RevenueCat pricing: https://www.revenuecat.com/pricing
- Stripe México pricing: https://stripe.com/mx/pricing
- Mercado Pago subscriptions API: https://www.mercadopago.com.mx/developers/es/docs/subscriptions/overview
- Paddle pricing: https://www.paddle.com/pricing

Apple y Google actualizan sus políticas y programas por territorio. El diseño de compra debe revisarse para México y cada storefront objetivo antes de enviar la app a revisión.
