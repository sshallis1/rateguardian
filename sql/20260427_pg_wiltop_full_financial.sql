-- 102 Wiltop Rd — Full Financial Model Update
-- Run after seed data. Updates project with acquisition price, budget, and adds carrying cost projections.

-- Update project with full financial model
update public.pg_projects set
  purchase_price = 345000,
  total_budget = 75000,
  notes = 'Residential fix & flip (split-level). Acquisition: $345K. Reno budget: $55-75K. Carrying costs ~$20-25K (6mo @ ~8.5%). Cost of sale: 4-5%. Target resale: $550-595K. Projected profit: $85-130K. ROI: 18-28%. Annualized: 36-56%. This is the founding Project Guardian case study.',
  meta = jsonb_build_object(
    'acquisition_price', 345000,
    'estimated_reno_low', 55000,
    'estimated_reno_high', 75000,
    'carrying_cost_monthly', 3500,
    'hold_months', 6,
    'carrying_cost_total', 21000,
    'cost_of_sale_pct', 0.045,
    'projected_total_investment_low', 440000,
    'projected_total_investment_high', 465000,
    'projected_profit_low', 85000,
    'projected_profit_high', 130000,
    'roi_low', 0.18,
    'roi_high', 0.28,
    'annualized_roi_low', 0.36,
    'annualized_roi_high', 0.56,
    'property_type', 'split-level',
    'strategy', 'fix_and_flip',
    'case_study', true,
    'guardian_flywheel', 'Project Guardian (execute) → sell to buyer → Rate Guardian (optimize mortgage) → Home Guardian (lifetime monitoring) → repeat'
  )
where id = 'a1b2c3d4-0001-4000-8000-000000000001';

-- Update milestones with current status based on Sean's prompt
update public.pg_milestones set status = 'completed'
where project_id = 'a1b2c3d4-0001-4000-8000-000000000001'
  and name in ('Demolition & Cleanout', 'Utilities Transfer');

update public.pg_milestones set status = 'completed'
where project_id = 'a1b2c3d4-0001-4000-8000-000000000001'
  and name = 'Painting — Interior';

update public.pg_milestones set status = 'in_progress'
where project_id = 'a1b2c3d4-0001-4000-8000-000000000001'
  and name in ('Flooring — Hardwood Refinish', 'Kitchen Cabinets');

-- Add new milestones for staging and listing
insert into public.pg_milestones (project_id, name, phase, status, sort_order, notes) values
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Staging', 'punch_list', 'pending', 15, 'Professional staging for listing photos and showings'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Listing Photos & Marketing', 'punch_list', 'pending', 16, 'Professional photos, virtual tour, MLS listing prep'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'List for Sale', 'complete', 'pending', 17, 'Target: $575K (test market). Go-to-market strategy from 10X House Selling Secrets.'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Close & Guardian Handoff', 'complete', 'pending', 18, 'Buyer onboarded into Rate Guardian (mortgage optimization) + Home Guardian (property monitoring). The flywheel begins.')
on conflict do nothing;

-- Add budget line items as pending payments (projected costs)
insert into public.pg_payments (project_id, amount, category, vendor, payment_method, bucket, notes) values
  ('a1b2c3d4-0001-4000-8000-000000000001', 15000, 'Cabinets', 'TBD — awaiting 3 quotes', null, 'pending', 'Kitchen cabinet scope: refacing ($10-20K) vs mid-remodel ($25-50K). Getting quotes from Kitchen Tune-Up, Homestyle, Zook/Capra.'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 5000, 'Counters / Backsplash', 'TBD', null, 'pending', 'Dependent on cabinet decision'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 8000, 'Bathroom', 'TBD', null, 'pending', 'Keep it simple — vanity, fixtures, tile. Two bathrooms.'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 3500, 'Flooring / Materials', 'TBD — direct refinisher', null, 'pending', 'Hardwood refinishing. Hire direct (skip GC markup 15-25%).'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 2000, 'Trim / Hardware', 'TBD', null, 'pending', null),
  ('a1b2c3d4-0001-4000-8000-000000000001', 5000, 'Appliances', 'TBD', null, 'pending', 'Kitchen appliance package'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 3000, 'Plumbing', 'TBD', null, 'pending', 'Kitchen + bath connections'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 2000, 'Electrical', 'TBD', null, 'pending', 'Panel updates, outlets, fixtures'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 1500, 'HVAC', 'TBD', null, 'pending', 'Duct cleanup + filter replacement'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 5000, 'Landscaping', 'TBD', null, 'pending', 'ROI-driven curb appeal only'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 21000, 'Other', 'Carrying costs', null, 'at_risk', '6 months @ ~$3,500/mo (loan interest + taxes + insurance + utilities)'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 25000, 'Other', 'Cost of sale', null, 'at_risk', '~4.5% of $575K target. Agent commission + closing costs + transfer tax.')
on conflict do nothing;
