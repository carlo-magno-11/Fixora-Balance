# Fixora Balance — Alcance del MVP y criterios de aceptación

**Versión:** 1.0 | **Fecha:** 6 de noviembre de 2026  
**Estado:** propuesta de trabajo; requiere validación UX y prototipos nativos.

## 1. Objetivo

Lanzar primero una experiencia útil de bienestar digital: enfoque, objetivos, hábitos, pausas y progreso consciente. La visión de privacidad/protección familiar permanece en el plan, pero no se simulará como terminada ni se venderá antes de validar APIs, permisos, políticas y soporte.

## 2. Incluido en el MVP funcional

- Onboarding que explica propósito, permisos y limitaciones.
- Registro, inicio/cierre de sesión y recuperación segura.
- Perfil personal, preferencias e idioma inicial español (México).
- Objetivos, rutinas y sesiones de enfoque configurables.
- Pausas conscientes y recordatorios con frecuencia y silencio configurables.
- Historial y estadísticas básicas con datos mínimos.
- Hábitos y progreso consciente: XP, niveles, insignias y rachas flexibles; gamificación opcional y no punitiva.
- Plan Free útil sin tarjeta ni suscripción.
- Plus Personal, con derechos premium calculados por backend.
- Cuenta, estado de plan, restauración/gestión de compra según canal.
- Exportación y eliminación de datos, con reglas de retención legales.
- Ayuda, guía de uso y explicaciones de privacidad.
- Telemetría mínima de calidad sin mensajes, teclas, fotos ni navegación completa.

## 3. Fuera del MVP inicial, pero dentro de la visión posterior

- VPN/DNS, filtrado de categorías y listas de protección.
- Bloqueo universal de aplicaciones.
- Perfiles infantiles, administración remota y reportes familiares.
- Lectura de mensajes, teclado, fotos o contenido privado.
- IA que analice contenido privado o perfile psicológicamente.
- Suscripciones modulares acumulables en tiendas antes de probar StoreKit/Play Billing.
- Más de un procesador web.

Protección y Family pasan a fases posteriores, no se eliminan del producto.

## 4. Planes iniciales

**Free:** objetivos y sesiones básicas, pausas, resumen simple y recordatorios básicos.

**Plus Personal:** sesiones/horarios avanzados, hábitos y estadísticas ampliadas, rutinas y personalización. Límite piloto de tres dispositivos personales, pendiente de prueba física y sincronización.

No mostrar Protección, Family ni Balance Completo como comprables en una plataforma hasta que sus funciones prometidas estén disponibles y verificadas en esa plataforma.

## 5. Degradación por plataforma

- El núcleo de enfoque y hábitos debe funcionar sin permisos especiales.
- Si el usuario deniega acceso de uso, explicar la limitación y conservar funciones no dependientes.
- Si solo se puede notificar, no afirmar que se bloqueó una app.
- En iOS no declarar controles Screen Time hasta contar con entitlement de distribución y autorización.
- En Android no declarar VPN/DNS ni accesibilidad hasta validar políticas, divulgación y consentimiento.

## 6. Criterios de aceptación

**Cuenta/datos:** aislamiento entre usuarios; cierre de sesión revoca sesión; exportación y eliminación probadas; ningún secreto privilegiado en cliente.

**Enfoque:** sesiones toleran cierre inesperado; pausa/reanudación/finalización idempotentes; zonas horarias correctas; silencio configurable.

**Progreso:** XP derivado de eventos válidos; no fabricable desde UI; racha flexible; gamificación desactivable.

**Compras:** Free accesible sin pago; cliente no concede Plus; eventos de proveedor verificados; restauración/cancelación/expiración/reembolso correctos; webhooks repetidos no duplican derechos; cambio de plan no duplica cobros; total anual y renovación visibles.

**Seguridad:** RLS en todas las tablas expuestas; pruebas negativas de autorización; logs sin secretos ni datos sensibles; threat model actualizado.

## 7. Puertas de salida

1. Pruebas de usabilidad y accesibilidad.
2. Pruebas de dominio, persistencia y sincronización.
3. Pruebas físicas Android/iOS de funciones anunciadas.
4. Compras Sandbox por canal habilitado.
5. Restauración y conciliación.
6. Revisión OWASP móvil y API/web.
7. Términos, privacidad, consentimiento y soporte revisados.
8. Permisos y fichas de tienda validados.
9. Rendimiento, batería y estabilidad aceptables.
10. Aprobación del responsable del producto.

## 8. Orden de construcción propuesto

1. Repositorio, CI y controles de seguridad.
2. Núcleo de dominio y contratos de plataforma.
3. Persistencia local, autenticación y backend.
4. Onboarding, perfil, objetivos y sesiones.
5. Hábitos, estadísticas y progreso.
6. Derechos Free/Plus y cuenta.
7. Compra sandbox por canal seleccionado.
8. QA, seguridad y pruebas físicas.

No crear migraciones ni código nativo de Family/VPN durante el MVP sin ficha técnica y aprobación específicas.
