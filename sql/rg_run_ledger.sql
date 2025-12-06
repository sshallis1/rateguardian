-- Run ledger for engine executions
create table if not exists public.rg_run_ledger (
  run_id uuid primary key default gen_random_uuid(),
  started_at timestamptz default now(),
  completed_at timestamptz,
  contacts_processed int default 0,
  opportunities_found int default 0,
  alerts_sent int default 0,
  status text default 'started',
  last_error text
);

-- Dead letter storage for failed webhooks
create table if not exists public.rg_webhook_dead_letter (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid,
  payload jsonb,
  attempts int default 0,
  last_error text,
  created_at timestamptz default now()
);
