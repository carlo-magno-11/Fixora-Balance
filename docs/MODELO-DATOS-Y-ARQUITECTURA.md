# Fixora Balance — Arquitectura de dominio y modelo de datos preliminar

**Versión:** 1.0 | **Fecha:** 6 de noviembre de 2026  
**Estado:** diseño lógico, no SQL ni migración ejecutable.

## 1. Objetivos

Separar reglas de React Native, Supabase y APIs nativas; impedir que el cliente sea autoridad de licencias/permisos; mantener Free útil sin permisos especiales; desacoplar Protección y Family; poder cambiar proveedor de pagos; minimizar datos personales y procesar localmente cuando sea posible. Supabase/PostgreSQL será backend central y SQLite será persistencia local offline. El flujo migration-first y la separación de datos se detallan en [ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md](ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md).

## 2. Capas

1. Presentation: Expo Router, componentes y accesibilidad.
2. Application: casos de uso y orquestación.
3. Domain: entidades, políticas, reglas, eventos y contratos sin infraestructura.
4. Infrastructure: Supabase, SQLite, notificaciones, pagos y analítica mínima.
5. Platform adapters: Swift/Kotlin y contratos TypeScript.

Las dependencias apuntan hacia el dominio. El dominio no importa Supabase, React Native ni SDK de pagos.

## 3. Módulos lógicos

identity, focus, habits, progress, reminders, insights, catalog, billing, entitlements, devices, family, protection y audit. Family/Protection se implementan después de sus gates.

## 4. Entidades relacionales preliminares

| Entidad | Campos conceptuales | Regla |
|---|---|---|
| profiles | id, display_name, locale, created_at | FK auth.users |
| user_preferences | user_id, timezone, reminder_settings, gamification_enabled | Datos mínimos |
| focus_goals | id, user_id, title, target, schedule, archived_at | RLS propietario |
| focus_sessions | id, user_id, started_at, ended_at, status | No registrar apps innecesarias |
| habits | id, user_id, title, cadence, archived_at | RLS propietario |
| habit_events | id, habit_id, occurred_at, event_type | Validar relación |
| progress_events | id, user_id, event_type, source_id, occurred_at | Fuente auditable de XP |
| reward_balances | user_id, xp_total, level | Derivable/recalculable |
| catalog_products | id, sku, status, version | Admin-only |
| catalog_prices | id, product_id, region, currency, amount_minor, interval, validity | Importe entero en unidad menor |
| product_entitlements | product_id, entitlement_key, limit_value | Admin-only |
| billing_customers | id, user_id, provider, external_customer_id | Índice único |
| billing_events | id, provider, event_id, received_at, verified_at, processed_at, payload_digest, status | No exponer payload |
| purchase_transactions | id, user_id, provider, external_transaction_id, amount_minor, currency, status | Referencia única |
| subscriptions | id, user_id, provider, external_subscription_id, product_id, status, period_start, period_end | Máquina de estados |
| entitlement_grants | id, beneficiary_type, beneficiary_id, entitlement_key, source_transaction_id, starts_at, ends_at, status | Proyección |
| entitlement_ledger | id, grant_id, action, reason, source_event_id, created_at | Append-only |
| trial_eligibility | id, user_id, ecosystem, consumed_at, source | Unicidad por cuenta/ecosistema |
| devices | id, user_id, platform, installation_key_hash, last_seen_at, revoked_at | No guardar secreto recuperable |
| audit_events | id, actor_id, action, target_type, target_id, reason, created_at | Admin/MFA |

Family y Protection requieren reglas RLS propias y no se añaden al MVP sin resolver consentimiento, autorización y retención.

## 5. Reglas de datos

La base remota no debe convertirse en un registro exhaustivo de actividad del dispositivo. SQLite mantiene sesiones en curso, cola de sincronización, caché y datos offline; PostgreSQL recibe únicamente datos necesarios para sincronización, cuenta, catálogo y derechos. No se enviarán mensajes, pulsaciones, fotos ni historial completo de navegación.

- UUID internos; timestamps UTC.
- Importes en enteros de unidad menor y moneda ISO.
- Separar estado del proveedor y estado del dominio.
- Evento externo procesado una sola vez por clave única.
- Payloads de webhook no expuestos a usuarios; retención mínima.
- No registrar tokens, URL de recuperación, mensajes ni navegación.
- Datos detallados de uso permanecen localmente cuando sea posible.
- RLS en cada tabla expuesta y pruebas negativas.
- Catálogo, ledger, eventos de pago y auditoría sin escrituras directas del cliente.
- Operaciones financieras/derechos solo server-side.
- Borrado respeta obligaciones contables y retiene lo estrictamente legal.

## 6. Autoridad y consistencia

Auth gestiona identidad; proveedor confirma cobro; backend verifica y traduce eventos; ledger conserva concesiones/revocaciones; proyección de derechos se recalcula desde eventos verificados. Cliente mantiene caché temporal, nunca autoridad. SQLite guarda sesiones/hábitos offline y sincroniza con control de versiones/conflictos. XP se valida o recalcula desde eventos.

## 7. Orden de migraciones propuesto — no ejecutar todavía

1. perfiles y preferencias.
2. objetivos, sesiones y hábitos.
3. progreso e insights agregados.
4. catálogo y derechos.
5. billing inbox, transacciones y suscripciones.
6. dispositivos/asignaciones.
7. Family y Protection tras sus puertas técnicas y legales.

Cada migración requiere pgTAP/RLS, índices, constraints, rollback y revisión de impacto. Usar un proyecto Supabase dedicado a Fixora Balance, nunca EYESITE ni otro producto. El archivo SQL se crea con Supabase CLI y se versiona antes de aplicar cambios a entornos compartidos. Consultar [ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md](ESTRATEGIA-SUPABASE-Y-MIGRACIONES.md).

## 8. Seguridad de arquitectura

RLS deny-by-default; evitar políticas permisivas; funciones SECURITY DEFINER solo cuando sea necesario con search_path fijo y grants mínimos; no usar service_role en cliente; MFA y roles separados; webhooks firmados/idempotentes; pruebas de aislamiento multiusuario, IDOR, escalada y replay; revisar vistas/RPC además de tablas.

## 9. Fuentes

- Supabase Production Security Checklist: https://supabase.com/docs/guides/security/production-checklist
- Supabase Secure configuration: https://supabase.com/docs/guides/security/product-security
- OWASP MASVS/MASTG: https://mas.owasp.org/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/

## 10. Pendientes antes de SQL

Zona horaria/sincronización offline; beneficiario y límites de dispositivos; retención/borrado; canal/proveedor inicial; threat model; revisión del esquema y pruebas de autorización; crear proyecto remoto dedicado a Balance tras confirmar organización/coste.
