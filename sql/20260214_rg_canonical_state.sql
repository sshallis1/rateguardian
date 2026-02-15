-- Guardian OS Core Infrastructure v1
create extension if not exists pgcrypto;

-- Legacy compatibility: retire prior denormalized profile table.
drop table if exists public.rg_loan_profiles cascade;

create table if not exists public.rg_contacts (
  id uuid primary key default gen_random_uuid(),
  ghl_contact_id text not null unique,
  first_name text null,
  last_name text null,
  email text null,
  phone text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rg_properties (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.rg_contacts(id) on delete cascade,
  property_fingerprint text not null,
  target_property_use text null,
  target_property_type text null,
  target_property_state text null,
  target_city text null,
  target_county text null,
  first_time_home_buyer boolean null,
  raw jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(contact_id, property_fingerprint)
);

create table if not exists public.rg_loans (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.rg_properties(id) on delete cascade,
  loan_fingerprint text not null,
  lead_source text null,
  loan_type_raw text null,
  loan_product_normalized text null,
  loan_amount numeric null,
  down_payment_amount numeric null,
  home_value_est numeric null,
  current_rate numeric null,
  market_rate numeric null,
  rate_lock_date date null,
  loan_start_date date null,
  arm_adjustment_date date null,
  credit_score integer null,
  household_income numeric null,
  hero_eligibility text null,
  hero_category text null,
  loan_shopping_status text null,
  scenario text null,
  notes_short text null,
  notes_internal text null,
  rosie_status text null,
  rosie_optin boolean null,
  rosie_path text null,
  rosie_reason text null,
  rosie_error text null,
  rate_variable text null,
  raw jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique(property_id, loan_fingerprint)
);

create table if not exists public.rg_threshold_versions (
  id uuid primary key default gen_random_uuid(),
  version_name text not null unique,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  activated_at timestamptz null,
  meta jsonb not null default '{}'::jsonb
);

create table if not exists public.rg_thresholds (
  id uuid primary key default gen_random_uuid(),
  threshold_version_id uuid not null references public.rg_threshold_versions(id) on delete cascade,
  threshold_key text not null,
  threshold_value numeric not null,
  created_at timestamptz not null default now(),
  unique(threshold_version_id, threshold_key)
);

create table if not exists public.rg_classifications (
  id uuid primary key default gen_random_uuid(),
  alert_id uuid not null references public.alerts(id) on delete cascade,
  contact_id uuid not null references public.rg_contacts(id) on delete cascade,
  property_id uuid not null references public.rg_properties(id) on delete cascade,
  loan_id uuid not null references public.rg_loans(id) on delete cascade,
  threshold_version_id uuid not null references public.rg_threshold_versions(id),
  hash_signature text not null,
  opportunity boolean not null,
  decision text not null,
  reason text not null,
  rule_id text not null,
  threshold_snapshot jsonb not null,
  evaluated_at timestamptz not null default now(),
  meta jsonb null,
  unique(hash_signature)
);

create unique index if not exists rg_threshold_versions_single_active_idx
  on public.rg_threshold_versions((is_active)) where is_active;
create index if not exists rg_properties_contact_idx on public.rg_properties(contact_id);
create index if not exists rg_loans_property_idx on public.rg_loans(property_id);
create index if not exists rg_classifications_alert_idx on public.rg_classifications(alert_id);
