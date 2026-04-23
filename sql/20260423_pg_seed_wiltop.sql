-- Seed: 102 Wiltop Rd Project
-- Run after 20260423_pg_project_guardian.sql

-- Use a fixed UUID so we can reference it in payments and milestones
insert into public.pg_projects (
  id, name, address, city, state, county, zip,
  status, phase, project_type,
  resale_target_low, resale_target_high,
  notes
) values (
  'a1b2c3d4-0001-4000-8000-000000000001',
  '102 Wiltop Rd',
  '102 Wiltop Rd',
  'Netcong',
  'NJ',
  'Morris',
  null,
  'active',
  'finish',
  'flip',
  550000,
  595000,
  'Residential flip — interior finish phase. Capital deployed toward paint, flooring, cleanout.'
) on conflict (id) do nothing;

-- Contractors
insert into public.pg_contractors (id, project_id, name, trade, notes) values
  ('a1b2c3d4-0002-4000-8000-000000000001', 'a1b2c3d4-0001-4000-8000-000000000001', 'Advanced Professional Painting Corp.', 'painting', 'Invoice #000136'),
  ('a1b2c3d4-0002-4000-8000-000000000002', 'a1b2c3d4-0001-4000-8000-000000000001', 'NJ Estates Services', 'cleanout', 'Service / cleanout / ops support'),
  ('a1b2c3d4-0002-4000-8000-000000000003', 'a1b2c3d4-0001-4000-8000-000000000001', 'Autopilot / Stripe', 'materials', 'Flooring materials supplier')
on conflict (id) do nothing;

-- Confirmed payments
insert into public.pg_payments (project_id, amount, category, vendor, payment_method, payment_date, invoice_ref, bucket, notes) values
  ('a1b2c3d4-0001-4000-8000-000000000001', 1100.00, 'Flooring / Materials', 'Autopilot / Stripe', 'stripe', '2026-04-01', null, 'confirmed', 'Subtotal $1,149, discount -$64.57, tax $15.57'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 7107.00, 'Painting', 'Advanced Professional Painting Corp.', 'invoice', '2026-04-01', '#000136', 'confirmed', null),
  ('a1b2c3d4-0001-4000-8000-000000000001', 2750.00, 'Service / Cleanout / Ops', 'NJ Estates Services', 'check', '2026-04-21', null, 'confirmed', null);

-- Milestones
insert into public.pg_milestones (project_id, name, phase, status, sort_order) values
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Demolition & Cleanout', 'demo', 'completed', 1),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Utilities Transfer', 'demo', 'completed', 2),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Painting — Interior', 'finish', 'in_progress', 3),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Flooring — Hardwood Refinish', 'finish', 'in_progress', 4),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Kitchen Cabinets', 'finish', 'pending', 5),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Counters & Backsplash', 'finish', 'pending', 6),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Bathroom Upgrades', 'finish', 'pending', 7),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Trim & Hardware', 'finish', 'pending', 8),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Appliances', 'finish', 'pending', 9),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Plumbing', 'rough', 'pending', 10),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'HVAC / Duct Cleanup', 'rough', 'pending', 11),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Landscape Improvements', 'finish', 'pending', 12),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Final Walkthrough', 'punch_list', 'pending', 13),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Punch List', 'punch_list', 'pending', 14);
