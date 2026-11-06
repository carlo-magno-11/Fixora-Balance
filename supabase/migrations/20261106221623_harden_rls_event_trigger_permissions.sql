-- Harden the platform-managed DDL event-trigger function.
-- The event trigger remains registered and continues to enable RLS on new public tables.
-- Its function body and event-trigger registration are intentionally unchanged.
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;
