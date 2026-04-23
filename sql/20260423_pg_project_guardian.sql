-- Project Guardian — Core Schema
-- AI-powered renovation project management

create table if not exists public.pg_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  state text,
  county text,
  zip text,
  status text not null default 'active',
  phase text,
  project_type text,
  purchase_price numeric,
  resale_target_low numeric,
  resale_target_high numeric,
  total_budget numeric,
  notes text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pg_contractors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.pg_projects(id) on delete cascade,
  name text not null,
  trade text,
  phone text,
  email text,
  rating integer,
  notes text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pg_payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.pg_projects(id) on delete cascade,
  contractor_id uuid references public.pg_contractors(id) on delete set null,
  amount numeric not null,
  category text not null,
  vendor text not null,
  payment_method text,
  payment_date date,
  invoice_ref text,
  bucket text not null default 'confirmed',
  notes text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pg_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.pg_projects(id) on delete cascade,
  name text not null,
  phase text,
  status text not null default 'pending',
  target_date date,
  completed_date date,
  sort_order integer not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists pg_payments_project_idx on public.pg_payments(project_id);
create index if not exists pg_payments_bucket_idx on public.pg_payments(bucket);
create index if not exists pg_contractors_project_idx on public.pg_contractors(project_id);
create index if not exists pg_milestones_project_idx on public.pg_milestones(project_id);
