-- Project Guardian: Add user_id column for Clerk auth scoping
-- Run against Supabase SQL editor

ALTER TABLE pg_projects ADD COLUMN IF NOT EXISTS user_id text;

CREATE INDEX IF NOT EXISTS idx_pg_projects_user_id ON pg_projects (user_id);

-- Backfill Sean's projects with his Clerk user ID
-- Replace 'user_XXXXX' with actual Clerk user_id after first sign-in
-- UPDATE pg_projects SET user_id = 'user_XXXXX' WHERE user_id IS NULL;
