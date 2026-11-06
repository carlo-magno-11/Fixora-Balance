begin;

select plan(3);

select ok(
  not has_function_privilege('anon', 'public.rls_auto_enable()', 'EXECUTE'),
  'anon cannot execute the RLS event-trigger function'
);

select ok(
  not has_function_privilege('authenticated', 'public.rls_auto_enable()', 'EXECUTE'),
  'authenticated cannot execute the RLS event-trigger function'
);

select ok(
  exists (
    select 1
    from pg_event_trigger
    where evtname = 'ensure_rls'
      and evtfoid = 'public.rls_auto_enable()'::regprocedure
  ),
  'the automatic RLS event trigger remains registered'
);

select * from finish();

rollback;
