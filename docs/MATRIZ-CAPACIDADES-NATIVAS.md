# Fixora Balance — Matriz de capacidades nativas iOS y Android

**Versión:** 1.0 | **Investigación:** 6 de noviembre de 2026  
**Estado:** investigación documental; no hay prototipos físicos ni entitlements solicitados.

## 1. Principio

React Native + Expo + TypeScript es la capa compartida, no un sustituto de APIs nativas. Cada capacidad sensible requiere contrato de plataforma y adaptador Swift/Kotlin, con estados explícitos de permiso, disponibilidad y limitación. No asumir equivalencia entre sistemas operativos.

## 2. Matriz inicial

| Capacidad | Android | iOS | Estado |
|---|---|---|---|
| Sesiones, objetivos | Lógica propia | Lógica propia | MVP |
| Recordatorios | Notificaciones locales | UserNotifications | MVP, sujeto a permiso |
| Estadísticas de uso | UsageStatsManager + acceso especial | Screen Time APIs y autorizaciones | Prototipo; no bloquea núcleo |
| Bloqueo de apps | No hay API universal; accesibilidad sujeta a política | FamilyControls + ManagedSettings + DeviceActivity | Fase posterior |
| Filtrado DNS | VpnService | Network Extension/opciones autorizadas | Fase posterior |
| Familia | Permisos/APIs específicas | FamilyControls y Family Sharing | Fase posterior |
| Gestión empresarial | DevicePolicyManager en dispositivos administrados | MDM | No confundir con app de consumo |

## 3. Android

**UsageStatsManager**
- Requiere acceso especial concedido por usuario en Ajustes.
- Explicar datos consultados, propósito y revocación.
- Probar diferencias por fabricante, reinicio, ahorro de batería y revocación.
- Si no hay permiso, mantener el núcleo y degradar estadísticas dependientes.

**AccessibilityService**
- No usar como API general para bloquear cualquier aplicación.
- Solo evaluar si la función central cumple política de Google Play y divulgación/consentimiento requeridos.
- No leer mensajes, formularios, credenciales ni contenido de pantalla.
- Preferir alternativas menos intrusivas cuando sean suficientes.

**VpnService**
- Google Play limita su uso a apps cuya función principal sea VPN o escenarios permitidos, incluidos algunos casos de control parental, seguimiento de uso o seguridad.
- Requiere divulgación destacada y consentimiento para tratamiento sensible; cifrado del tráfico hasta endpoint del túnel cuando aplique.
- Prohibido manipular/redirigir tráfico de otras apps para monetización.
- Probar DNS seguro, IPv4/IPv6, cambios de red, VPN concurrente, batería y fabricantes.

## 4. iOS

**FamilyControls / ManagedSettings / DeviceActivity**
- FamilyControls requiere entitlement.
- Para distribuir por TestFlight/App Store, el titular de Apple Developer debe solicitar aprobación del entitlement de distribución.
- Cada extensión Screen Time incluida requiere solicitud correspondiente.
- El control de menores requiere aprobación del tutor en el grupo Family Sharing; el modo individual requiere autorización del propietario.
- DeviceActivity puede ejecutar eventos programados dentro de los límites del sistema.
- No prometer control universal ni acceso irrestricto a identificadores de apps/webs.

**Network Extension**
- No asumir que filtrado DNS/VPN está disponible para toda app de consumo.
- Identificar entitlement, distribución, consentimiento y limitaciones exactas antes de vender Protección Personal.

## 5. Contratos nativos

- UsageInsightsProvider: disponibilidad, permiso, intervalo y métricas agregadas.
- AppRestrictionProvider: capacidades, autorización, aplicar/quitar política y resultado.
- NetworkProtectionProvider: disponibilidad, consentimiento, estado y errores.
- FamilyAuthorizationProvider: tutor, perfil autorizado, alcance y expiración.

Estados tipados: supported, unsupported, permission_required, entitlement_required, restricted_by_policy, temporarily_unavailable, failed. La ausencia de datos nunca significa permiso concedido.

## 6. Pruebas físicas mínimas

Android: Pixel/AOSP, Samsung One UI, Xiaomi/HyperOS; versiones mínima y actual; permisos concedidos/revocados, reinicio, actualización, ahorro de batería, offline y VPN concurrente.

iOS: iPhone con versión mínima y actual; cuenta individual y Family Sharing; entitlement de desarrollo/distribución; app principal y extensiones; autorización concedida/denegada/revocada.

No fijar versiones mínimas hasta decidir dispositivos objetivo y soporte.

## 7. Fuentes oficiales

- Apple Family Controls entitlement: https://developer.apple.com/documentation/FamilyControls/requesting-the-family-controls-entitlement
- Apple Configuring Family Controls: https://developer.apple.com/documentation/Xcode/configuring-family-controls
- Apple Family Controls: https://developer.apple.com/documentation/familycontrols
- Apple Managed Settings / Family Sharing: https://developer.apple.com/documentation/managedsettings/connectionwithframeworks
- Google Play VpnService policy: https://support.google.com/googleplay/android-developer/answer/18265346
- Google Play sensitive permissions/APIs: https://support.google.com/googleplay/android-developer/answer/16558241?hl=es

## 8. Bloqueos de fase posterior

Prototipo UsageStats; revisión de elegibilidad AccessibilityService; prototipo y solicitud FamilyControls; prototipo VpnService/Network Extension; medición batería/compatibilidad; definir degradación por SO. Hasta entonces el MVP se mantiene en enfoque, hábitos y progreso que no dependen de bloquear otras apps.
