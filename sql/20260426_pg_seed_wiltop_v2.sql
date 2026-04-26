-- 102 Wiltop Rd — Seed Data for New Homeowner Schema
-- Run AFTER 20260426_pg_homeowner_schema.sql

-- ─── Profile (Sean as project owner) ──────────────────────────
insert into public.profiles (id, full_name, email, phone, role, plan_type) values
  ('00000000-0000-4000-8000-000000000001', 'Sean Shallis', 'sean@theshallisgroup.com', '973-461-6955', 'investor', 'pro')
on conflict (email) do nothing;

-- ─── Property ─────────────────────────────────────────────────
insert into public.properties (id, owner_id, name, address, city, state, zip, property_type, beds, baths, square_feet) values
  ('00000000-0000-4000-8000-000000000010', '00000000-0000-4000-8000-000000000001',
   '102 Wiltop Rd', '102 Wiltop Rd', 'Livingston', 'NJ', '07039',
   'split-level', 4, 2.5, 2200)
on conflict do nothing;

-- ─── Project ──────────────────────────────────────────────────
insert into public.projects (id, property_id, project_name, project_status, project_type, purchase_price, arv_estimate, resale_estimate, target_start_date, target_completion_date, target_sale_date, hold_months, cost_of_capital_rate, selling_cost_rate, contingency_rate) values
  ('00000000-0000-4000-8000-000000000100', '00000000-0000-4000-8000-000000000010',
   '102 Wiltop Rd — Full Renovation', 'active', 'renovation',
   345000, 595000, 575000,
   '2026-02-01', '2026-07-01', '2026-08-01',
   6, 0.085, 0.045, 0.10)
on conflict do nothing;

-- ─── Vendors ──────────────────────────────────────────────────
insert into public.vendors (id, owner_id, vendor_name, trade_type, notes, preferred_vendor) values
  ('00000000-0000-4000-8000-000000001001', '00000000-0000-4000-8000-000000000001', 'Empire Today', 'Flooring', 'Flooring contract — carpet & resilient', false),
  ('00000000-0000-4000-8000-000000001002', '00000000-0000-4000-8000-000000000001', 'Cleanout Crew', 'Demolition', 'Carpet removal + junk cleanout', false),
  ('00000000-0000-4000-8000-000000001003', '00000000-0000-4000-8000-000000000001', 'TBD Landscaper', 'Landscaping', 'Getting quotes — $35-37.5K range', false),
  ('00000000-0000-4000-8000-000000001004', '00000000-0000-4000-8000-000000000001', 'Kitchen Tune-Up', 'Cabinets', 'Cabinet refacing option', false),
  ('00000000-0000-4000-8000-000000001005', '00000000-0000-4000-8000-000000000001', 'Direct Refinisher', 'Flooring', 'Hardwood refinishing — skip GC markup', true)
on conflict do nothing;

-- ─── Estimates ────────────────────────────────────────────────
-- Empire flooring estimate
insert into public.estimates (id, project_id, vendor_id, category_id, estimate_title, estimate_amount, estimate_status, estimate_date, notes) values
  ('00000000-0000-4000-8000-000000002001', '00000000-0000-4000-8000-000000000100',
   '00000000-0000-4000-8000-000000001001',
   (select id from public.project_categories where name = 'Carpet & Resilient'),
   'Empire Today — Flooring Package', 4364.32, 'accepted', '2026-03-15',
   'Carpet + resilient flooring for bedrooms and common areas')
on conflict do nothing;

-- Cleanout estimate
insert into public.estimates (id, project_id, vendor_id, category_id, estimate_title, estimate_amount, estimate_status, estimate_date, notes) values
  ('00000000-0000-4000-8000-000000002002', '00000000-0000-4000-8000-000000000100',
   '00000000-0000-4000-8000-000000001002',
   (select id from public.project_categories where name = 'Demolition'),
   'Cleanout — Carpet Removal + Junk', 1100.00, 'accepted', '2026-02-20',
   'Old carpet removal, debris hauling, dumpster rental')
on conflict do nothing;

-- Landscaping estimate
insert into public.estimates (id, project_id, vendor_id, category_id, estimate_title, estimate_amount, estimate_status, estimate_date, notes) values
  ('00000000-0000-4000-8000-000000002003', '00000000-0000-4000-8000-000000000100',
   '00000000-0000-4000-8000-000000001003',
   (select id from public.project_categories where name = 'Landscaping'),
   'Landscaping — Full Package', 36250.00, 'under_review', '2026-04-10',
   'Curb appeal package. Range: $35K-$37.5K. Needs ROI analysis.')
on conflict do nothing;

-- ─── Estimate Line Items (Empire) ─────────────────────────────
insert into public.estimate_line_items (estimate_id, item_name, description, quantity, unit, unit_cost) values
  ('00000000-0000-4000-8000-000000002001', 'Carpet — Bedrooms', 'Plush carpet with pad, installed', 800, 'sqft', 3.25),
  ('00000000-0000-4000-8000-000000002001', 'Resilient — Kitchen/Entry', 'LVP flooring, installed', 400, 'sqft', 4.41)
on conflict do nothing;

-- ─── Expenses (Confirmed Paid) ────────────────────────────────
insert into public.expenses (project_id, vendor_id, category_id, expense_date, amount, payment_status, payment_method, notes) values
  ('00000000-0000-4000-8000-000000000100',
   '00000000-0000-4000-8000-000000001001',
   (select id from public.project_categories where name = 'Carpet & Resilient'),
   '2026-03-20', 4364.32, 'paid', 'check', 'Empire Today flooring — full payment'),
  ('00000000-0000-4000-8000-000000000100',
   '00000000-0000-4000-8000-000000001002',
   (select id from public.project_categories where name = 'Demolition'),
   '2026-02-25', 1100.00, 'paid', 'check', 'Cleanout + carpet removal'),
  ('00000000-0000-4000-8000-000000000100',
   null,
   (select id from public.project_categories where name = 'Painting'),
   '2026-03-10', 3500.00, 'paid', 'check', 'Interior painting — full house'),
  ('00000000-0000-4000-8000-000000000100',
   null,
   (select id from public.project_categories where name = 'Miscellaneous'),
   '2026-02-15', 1992.68, 'paid', 'check', 'Supplies, permits, misc startup costs');

-- ─── Budgets (Planned vs Actual) ──────────────────────────────
insert into public.budgets (project_id, category_id, planned_amount, actual_amount, notes)
select
  '00000000-0000-4000-8000-000000000100',
  pc.id,
  case pc.name
    when 'Purchase Price' then 345000
    when 'Buying Costs' then 8000
    when 'Holding Costs' then 21000
    when 'Selling Costs' then 25875
    when 'Financing Costs' then 0
    when 'Demolition' then 1100
    when 'Cabinets & Countertops' then 20000
    when 'Doors & Trim' then 2000
    when 'Carpet & Resilient' then 4500
    when 'Hardwood Flooring' then 3500
    when 'Painting' then 3500
    when 'Appliances' then 5000
    when 'Plumbing' then 3000
    when 'HVAC' then 1500
    when 'Electrical' then 2000
    when 'Landscaping' then 5000
    when 'Miscellaneous' then 2000
    else 0
  end,
  case pc.name
    when 'Purchase Price' then 345000
    when 'Demolition' then 1100
    when 'Carpet & Resilient' then 4364.32
    when 'Painting' then 3500
    when 'Miscellaneous' then 1992.68
    else 0
  end,
  case pc.name
    when 'Cabinets & Countertops' then 'Refacing ($10-20K) vs mid-remodel ($25-50K). Getting 3 quotes.'
    when 'Landscaping' then 'ROI-driven curb appeal only. Full quote at $35-37.5K — need to scope down.'
    when 'Holding Costs' then '6 months @ ~$3,500/mo (loan interest + taxes + insurance + utilities)'
    when 'Selling Costs' then '~4.5% of $575K target resale'
    else null
  end
from public.project_categories pc
where pc.name in ('Purchase Price', 'Buying Costs', 'Holding Costs', 'Selling Costs', 'Financing Costs', 'Demolition', 'Cabinets & Countertops', 'Doors & Trim', 'Carpet & Resilient', 'Hardwood Flooring', 'Painting', 'Appliances', 'Plumbing', 'HVAC', 'Electrical', 'Landscaping', 'Miscellaneous');

-- ─── Tasks ────────────────────────────────────────────────────
insert into public.tasks (project_id, title, status, priority, description) values
  ('00000000-0000-4000-8000-000000000100', 'Get 3 cabinet quotes', 'in_progress', 'high', 'Kitchen Tune-Up, Homestyle, Zook/Capra — refacing vs remodel'),
  ('00000000-0000-4000-8000-000000000100', 'Hardwood refinishing — hire direct', 'todo', 'high', 'Skip GC markup (15-25%). Find direct refinisher.'),
  ('00000000-0000-4000-8000-000000000100', 'Scope landscaping to ROI items only', 'todo', 'normal', 'Full package at $35-37.5K is overkill. Target $5K curb appeal.'),
  ('00000000-0000-4000-8000-000000000100', 'Bathroom vanity + fixtures', 'todo', 'normal', 'Two bathrooms — keep it simple, clean, modern'),
  ('00000000-0000-4000-8000-000000000100', 'Appliance package — compare suppliers', 'todo', 'normal', 'Check supplier-direct pricing vs retail'),
  ('00000000-0000-4000-8000-000000000100', 'Schedule staging', 'todo', 'low', 'Professional staging for listing photos and showings'),
  ('00000000-0000-4000-8000-000000000100', 'Listing photos + marketing prep', 'todo', 'low', '10X House Selling Secrets go-to-market strategy');

-- ─── Local Comparisons (Benchmarks) ──────────────────────────
insert into public.local_comparisons (project_id, category_id, user_estimate_amount, local_market_low, local_market_high, guardian_target_amount, potential_savings, recommendation)
select
  '00000000-0000-4000-8000-000000000100',
  pc.id,
  case pc.name
    when 'Carpet & Resilient' then 4364.32
    when 'Demolition' then 1100
    when 'Landscaping' then 36250
    when 'Cabinets & Countertops' then 20000
    when 'Painting' then 3500
    when 'Hardwood Flooring' then 3500
    else 0
  end,
  case pc.name
    when 'Carpet & Resilient' then 3200
    when 'Demolition' then 800
    when 'Landscaping' then 3500
    when 'Cabinets & Countertops' then 8000
    when 'Painting' then 2800
    when 'Hardwood Flooring' then 2500
    else 0
  end,
  case pc.name
    when 'Carpet & Resilient' then 5500
    when 'Demolition' then 1500
    when 'Landscaping' then 8000
    when 'Cabinets & Countertops' then 35000
    when 'Painting' then 5000
    when 'Hardwood Flooring' then 5000
    else 0
  end,
  case pc.name
    when 'Carpet & Resilient' then 3800
    when 'Demolition' then 1000
    when 'Landscaping' then 5000
    when 'Cabinets & Countertops' then 15000
    when 'Painting' then 3200
    when 'Hardwood Flooring' then 3000
    else 0
  end,
  case pc.name
    when 'Carpet & Resilient' then 564
    when 'Demolition' then 100
    when 'Landscaping' then 31250
    when 'Cabinets & Countertops' then 5000
    when 'Painting' then 300
    when 'Hardwood Flooring' then 500
    else 0
  end,
  case pc.name
    when 'Carpet & Resilient' then 'Price is within market range. Accepted.'
    when 'Demolition' then 'Fair price for the scope. Accepted.'
    when 'Landscaping' then 'OVERPAY ALERT: Full package at $36K is 4-7x typical curb appeal budget. Scope down to ROI-driving items only: fresh mulch, trimming, power wash, front plantings. Target $5K.'
    when 'Cabinets & Countertops' then 'Get 3 quotes. Refacing ($10-20K) may deliver 80% of the visual impact at 40% of the cost of a full remodel.'
    when 'Painting' then 'Competitive price for full interior. Good deal.'
    when 'Hardwood Flooring' then 'Hire a direct refinisher — skip the GC markup (15-25% savings). Get 2 quotes.'
    else null
  end
from public.project_categories pc
where pc.name in ('Carpet & Resilient', 'Demolition', 'Landscaping', 'Cabinets & Countertops', 'Painting', 'Hardwood Flooring');

-- ─── Savings Cases (Story Cards) ──────────────────────────────
insert into public.savings_cases (title, category, original_estimate, final_cost, savings_percent, time_saved_description, story_notes, publishable) values
  ('Cabinet Refacing vs Full Remodel', 'Cabinets & Countertops', 35000, 15000, 57,
   'Completed in 5 days vs 3-4 weeks for full remodel',
   'Sean to provide full story details. Key theme: refacing delivered 80% of visual impact at 40% of full remodel cost. Homeowner avoided 3 weeks of kitchen downtime.',
   false),
  ('Bath Fitter vs Full Bathroom Gut', 'Tiling', 18000, 6500, 64,
   'Completed in 2 days vs 2-3 weeks',
   'Sean to provide full story details. Key theme: surface-level refresh vs unnecessary gut job. Contractor initially scoped full demo when surfaces were structurally sound.',
   false),
  ('All-in-One GC vs Specialist Trades', 'Miscellaneous', 85000, 52000, 39,
   'Completed in roughly half the time',
   'Sean to provide full story details. Key theme: "Master of None" GC marked up every sub 20-30%. Hiring specialist trades directly saved $33K and work was done faster because each trade owned their timeline.',
   false);
