-- Project Guardian — Homeowner-Facing Schema
-- Replaces investor-centric pg_* tables with comprehensive renovation intelligence platform
-- Run in Supabase SQL editor

create extension if not exists "uuid-ossp";

-- ─── Profiles ─────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key default uuid_generate_v4(),
  full_name text,
  email text unique,
  phone text,
  role text default 'homeowner',
  plan_type text default 'free',
  created_at timestamptz default now()
);

-- ─── Properties ───────────────────────────────────────────────
create table if not exists public.properties (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  property_type text,
  beds numeric,
  baths numeric,
  square_feet numeric,
  created_at timestamptz default now()
);

-- ─── Projects ─────────────────────────────────────────────────
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid references public.properties(id) on delete cascade,
  project_name text not null,
  project_status text default 'planning',
  project_type text default 'renovation',
  purchase_price numeric default 0,
  arv_estimate numeric default 0,
  resale_estimate numeric default 0,
  target_start_date date,
  target_completion_date date,
  target_sale_date date,
  hold_months numeric default 6,
  cost_of_capital_rate numeric default 0.10,
  selling_cost_rate numeric default 0.05,
  contingency_rate numeric default 0.10,
  created_at timestamptz default now()
);

-- ─── Project Categories ───────────────────────────────────────
create table if not exists public.project_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  sort_order int default 0
);

insert into public.project_categories (name, sort_order) values
  ('Purchase Price', 1),
  ('Buying Costs', 2),
  ('Holding Costs', 3),
  ('Selling Costs', 4),
  ('Financing Costs', 5),
  ('Demolition', 6),
  ('Framing & Drywall', 7),
  ('Cabinets & Countertops', 8),
  ('Doors & Trim', 9),
  ('Carpet & Resilient', 10),
  ('Hardwood Flooring', 11),
  ('Tiling', 12),
  ('Painting', 13),
  ('Appliances', 14),
  ('Plumbing', 15),
  ('HVAC', 16),
  ('Electrical', 17),
  ('Landscaping', 18),
  ('Miscellaneous', 99)
on conflict do nothing;

-- ─── Budgets ──────────────────────────────────────────────────
create table if not exists public.budgets (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  category_id uuid references public.project_categories(id),
  planned_amount numeric default 0,
  actual_amount numeric default 0,
  notes text,
  created_at timestamptz default now()
);

-- ─── Vendors ──────────────────────────────────────────────────
create table if not exists public.vendors (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references public.profiles(id) on delete cascade,
  vendor_name text not null,
  trade_type text,
  contact_name text,
  phone text,
  email text,
  website text,
  rating numeric,
  preferred_vendor boolean default false,
  discount_available boolean default false,
  notes text,
  created_at timestamptz default now()
);

-- ─── Estimates ────────────────────────────────────────────────
create table if not exists public.estimates (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  vendor_id uuid references public.vendors(id),
  category_id uuid references public.project_categories(id),
  estimate_title text,
  estimate_amount numeric default 0,
  estimate_status text default 'received',
  estimate_date date,
  document_url text,
  notes text,
  created_at timestamptz default now()
);

-- ─── Estimate Line Items ──────────────────────────────────────
create table if not exists public.estimate_line_items (
  id uuid primary key default uuid_generate_v4(),
  estimate_id uuid references public.estimates(id) on delete cascade,
  item_name text,
  description text,
  quantity numeric default 1,
  unit text,
  unit_cost numeric default 0,
  total_cost numeric generated always as (quantity * unit_cost) stored
);

-- ─── Expenses ─────────────────────────────────────────────────
create table if not exists public.expenses (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  vendor_id uuid references public.vendors(id),
  category_id uuid references public.project_categories(id),
  expense_date date default current_date,
  amount numeric not null default 0,
  payment_status text default 'unpaid',
  payment_method text,
  receipt_url text,
  notes text,
  created_at timestamptz default now()
);

-- ─── Tasks ────────────────────────────────────────────────────
create table if not exists public.tasks (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  vendor_id uuid references public.vendors(id),
  title text not null,
  description text,
  status text default 'todo',
  priority text default 'normal',
  due_date date,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- ─── Project Files ────────────────────────────────────────────
create table if not exists public.project_files (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  file_name text,
  file_type text,
  file_url text,
  category text,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- ─── Project Photos ───────────────────────────────────────────
create table if not exists public.project_photos (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  photo_url text not null,
  photo_type text default 'progress',
  room_or_area text,
  description text,
  created_at timestamptz default now()
);

-- ─── Conversations ────────────────────────────────────────────
create table if not exists public.conversations (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  conversation_type text default 'chat',
  summary text,
  created_at timestamptz default now()
);

create table if not exists public.conversation_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender text not null,
  message text not null,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- ─── Local Comparisons ────────────────────────────────────────
create table if not exists public.local_comparisons (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects(id) on delete cascade,
  category_id uuid references public.project_categories(id),
  user_estimate_amount numeric default 0,
  local_market_low numeric default 0,
  local_market_high numeric default 0,
  guardian_target_amount numeric default 0,
  potential_savings numeric default 0,
  recommendation text,
  created_at timestamptz default now()
);

-- ─── Savings Cases ────────────────────────────────────────────
create table if not exists public.savings_cases (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text,
  original_estimate numeric,
  final_cost numeric,
  savings_amount numeric generated always as (original_estimate - final_cost) stored,
  savings_percent numeric,
  time_saved_description text,
  story_notes text,
  publishable boolean default false,
  created_at timestamptz default now()
);

-- ─── ROI Summary View ─────────────────────────────────────────
create or replace view public.project_roi_summary as
select
  p.id as project_id,
  p.project_name,
  p.purchase_price,
  p.resale_estimate,
  p.selling_cost_rate,
  coalesce(sum(e.amount), 0) as actual_spend,
  (p.purchase_price * p.cost_of_capital_rate * (p.hold_months / 12.0)) as estimated_carry_cost,
  (p.resale_estimate * p.selling_cost_rate) as estimated_selling_cost,
  (
    p.resale_estimate
    - p.purchase_price
    - coalesce(sum(e.amount), 0)
    - (p.purchase_price * p.cost_of_capital_rate * (p.hold_months / 12.0))
    - (p.resale_estimate * p.selling_cost_rate)
  ) as projected_profit
from public.projects p
left join public.expenses e on e.project_id = p.id
group by p.id;

-- ─── Indexes ──────────────────────────────────────────────────
create index if not exists idx_properties_owner on public.properties(owner_id);
create index if not exists idx_projects_property on public.projects(property_id);
create index if not exists idx_budgets_project on public.budgets(project_id);
create index if not exists idx_vendors_owner on public.vendors(owner_id);
create index if not exists idx_estimates_project on public.estimates(project_id);
create index if not exists idx_estimate_line_items_estimate on public.estimate_line_items(estimate_id);
create index if not exists idx_expenses_project on public.expenses(project_id);
create index if not exists idx_tasks_project on public.tasks(project_id);
create index if not exists idx_project_files_project on public.project_files(project_id);
create index if not exists idx_project_photos_project on public.project_photos(project_id);
create index if not exists idx_conversations_profile on public.conversations(profile_id);
create index if not exists idx_conversation_messages_convo on public.conversation_messages(conversation_id);
create index if not exists idx_local_comparisons_project on public.local_comparisons(project_id);
