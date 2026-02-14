-- Canonical Rate Guardian data model + deterministic classification storage.

create extension if not exists pgcrypto;

create table if not exists public.rg_contacts (
  id uuid primary key default gen_random_uuid(),
  contact_id text not null unique,
  first_name text null,
  last_name text null,
  email text null,
  phone text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rg_loan_profiles (
  id uuid primary key default gen_random_uuid(),
  contact_id text not null references public.rg_contacts(contact_id),
  lead_source text null,
  target_property_use text null,
  target_property_type text null,
  target_property_state text null,
  target_city text null,
  target_county text null,
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
  first_time_home_buyer boolean null,
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
  unique(contact_id)
);

create table if not exists public.rg_classifications (
  id uuid primary key default gen_random_uuid(),
  alert_id uuid not null unique references public.alerts(id) on delete cascade,
  contact_id text not null,
  loan_profile_id uuid null references public.rg_loan_profiles(id),
  opportunity boolean not null,
  decision text not null,
  reason text not null,
  rule_id text not null,
  threshold_snapshot jsonb not null,
  evaluated_at timestamptz not null default now(),
  meta jsonb null
);

create index if not exists rg_classifications_contact_id_idx on public.rg_classifications(contact_id);
create index if not exists rg_loan_profiles_contact_id_idx on public.rg_loan_profiles(contact_id);
