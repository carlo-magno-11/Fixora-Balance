CREATE EVENT TRIGGER ensure_rls
  ON ddl_command_end
  EXECUTE FUNCTION public.rls_auto_enable();
