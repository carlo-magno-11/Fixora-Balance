-- Local-only simulation of the hosted Supabase DDL event trigger.
-- Hosted projects provide this platform-managed function; the local CLI image does not.
-- This fixture is applied to the disposable local database before project migrations.
CREATE OR REPLACE FUNCTION public.rls_auto_enable()
RETURNS event_trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
DECLARE
  command record;
BEGIN
  FOR command IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag = 'CREATE TABLE'
      AND schema_name = 'public'
      AND object_type = 'table'
  LOOP
    EXECUTE pg_catalog.format(
      'ALTER TABLE %s ENABLE ROW LEVEL SECURITY',
      command.object_identity
    );
  END LOOP;
END;
$$;

CREATE EVENT TRIGGER ensure_rls
  ON ddl_command_end
  EXECUTE FUNCTION public.rls_auto_enable();
