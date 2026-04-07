# Rate Guardian™ — Project Instructions

## What This Is
AI-powered mortgage monitoring system. Rosie (backend intelligence) detects savings/risk; C2S (frontend activation) routes leads and controls outbound. This repo hosts the Vercel/Next.js layer — AI routing agent, GHL integration, ops monitoring.

## Production
- **URL**: https://shallis-site.vercel.app
- **Vercel project**: sean-shallis-projects/shallis-site
- **Repo**: github.com/sshallis1/rateguardian

## Architecture
```
GHL Webhook → /api/rg/webhook → Claude routing agent (routeLead)
  → writes RoutingDecision back to GHL custom fields + tags
  → GHL workflows handle outbound (voicemails, emails, SMS)

Crons:
  /api/rg/ops/heartbeat     — every 6h, re-evaluates due contacts
  /api/rg/ops/health-check  — every 12h, detects stuck/stale records
  /api/fetch-alerts          — every 15m, relays Supabase alerts (legacy)
```

## Key Directories
- `lib/rg/` — Rate Guardian core (router-agent, ghl-client, field-map, types)
- `lib/engine/` — Legacy Rosie engine (being retired)
- `app/api/rg/` — Next.js API routes (webhook, egress, ops, health)
- `api/` — Legacy Vercel Functions (fetch-alerts, webhook, intake, engine)
- `sql/` — Database migrations (rg_* canonical tables)
- `supabase/` — Legacy edge functions (deprecated)

## Stack
- Next.js 16 + React 19 + TypeScript + Tailwind
- Vercel AI SDK + Anthropic Claude Sonnet 4.6 (via AI Gateway)
- GoHighLevel v1 API (CRM, workflows, outbound)
- Supabase (PostgreSQL — alerts, contacts, rate data)
- Turbopack (dev), Vercel Functions (prod)

## GHL Conventions
- All tags prefixed with `RG_`
- Custom fields mapped in `lib/rg/field-map.ts` (80+ fields, bidirectional ID ↔ name)
- Workflow naming: `RG | {Layer} | {Name}` (Engine, Ops, Egress, Intake, Ingress)

## Architectural Rules
- Rosie Engine **decides** → Egress **routes** → Ops **monitors** → C2S **communicates**
- NEVER mix engine logic with communication logic
- Dispatcher must NOT trigger from status/path/product field changes (prevents loops)
- Duplicate-run guard: if RG_Rosie_Status = In Progress → stop
- Every branch must end with Completed or Needs Data (no silent exits)
- Result Routing reads path, never writes it

## Environment Variables
- `GHL_API_KEY` — GoHighLevel API key
- `GHL_LOCATION_ID` — GHL location/sub-account ID
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — database
- `VERCEL_OIDC_TOKEN` — AI Gateway auth (auto-provisioned)
- Secrets live in `.env.local` (gitignored) only

## Safety
- Never commit `.env.local` or expose API keys
- Never push to main without confirmation
- Never trigger outbound to contacts without RG_Rosie_Status = Completed gate
- DNC and opt-out checks are mandatory before any outbound

## GHL Workflow Contract — MANDATORY for every outbound workflow

Every GHL workflow that sends a call, voicemail, SMS, or email MUST start with these two gates, in order:

1. **Manual ownership gate** (kill-switch)
   - `IF contact has tag "RG_Manual_Owned" → EXIT WORKFLOW`
   - This is the master switch. When Sean speaks with a lead, disposition endpoints set this tag automatically. Once set, no automation touches the contact except backend rate monitoring.

2. **Call window gate** (timing)
   - Before any call/SMS/voicemail step, POST to `/api/rg/egress/call-window-check` with `{ contactId, contactTimezone }`.
   - If `allowed: false`, use the returned `defer_until_iso` as the next Wait step's target time.
   - The endpoint enforces 8am–8pm in BOTH operator (Sean / America/New_York) AND contact timezones, weekdays only, holiday-mode aware. **Fails closed.**

**Master Dispatcher trigger rule**: trigger ONLY on contact creation (with `RG_Lead_Source` set) or inbound `/api/rg/webhook`. NEVER trigger on field updates — that causes Dr. Wang–style re-fire loops on manual contact edits.

## Disposition endpoints (manual call outcomes)

Sean's quick-action buttons in GHL POST to `/api/rg/egress/follow-up`. All "I spoke with them" outcomes apply `RG_Manual_Owned` automatically:

- `action: "disposition", disposition: "Spoke - Engaged"` → blitz off, manual owned, monitoring on
- `action: "disposition", disposition: "Spoke - Booked"` → blitz off, manual owned, booked
- `action: "disposition", disposition: "Spoke - Not Interested"` → opt out
- `action: "callback_later"` → blitz off, manual owned, log only
- `action: "long_term_nurture"` → blitz off, monitoring on, capture competitor
- `action: "manual_owned"` → master kill-switch (use from a phone-friendly Quick Action)
- `action: "release_manual"` → hand contact back to automation

## Session Continuity
- `/eod` — write session summary to `.claude/sessions/`
- `/pickup` — read latest session and brief on where we left off

## Owner
Sean T. Shallis — Private Wealth Mortgage Strategist | NMLS #2362814
This is co-founder level work. Treat it that way.
