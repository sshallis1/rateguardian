# Rate Guardian Engine

This repository contains the shared engine logic and supporting libraries used by the Rate Guardian Next.js V8 App Router deployment.

- Engine orchestration and helpers live under `lib/engine` and power the Supabase-backed monitoring and alerting flows.
- `lib/supabase.ts` safely bootstraps a Supabase client with a stub when environment variables are missing so builds continue until configuration is provided.
- SQL schema definitions live under `sql/` for database migrations and reference.

Legacy Vercel serverless functions (the old `/api` directory and `vercel.json`) have been removed; App Router handlers in `app/api/*/route.ts` are managed in the main Next.js application.

## Development

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your environment before invoking modules that issue Supabase queries.
