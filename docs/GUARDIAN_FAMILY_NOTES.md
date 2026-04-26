# Guardian Family Notes

> Last updated: 2026-04-26

---

## Platform Overview

The Guardian Family is a spoke-and-hub ecosystem with Rosie AI at the center. Each "Guardian" is a vertical product that monitors, protects, or optimizes a domain of the user's life. All spokes feed data back to Rosie, who sees the full picture.

---

## Spokes

### Rate Guardian (LIVE)
- **Status**: Live, production
- **What it does**: AI-powered mortgage monitoring. Rosie watches rates multiple times a day, detects savings opportunities, and routes leads through GHL workflows.
- **Key surfaces**: `/rate-guardian`, `/rate-guardian/ask-rosie`, `/rg/dashboard`
- **Backend**: GHL webhook -> Claude routing agent -> egress -> ops crons
- **Notes**:

### Project Guardian (LIVE)
- **Status**: Live, production (portal + API)
- **What it does**: AI renovation management. Budget tracking, payment ledger, contractor management, milestone tracking, cost estimation.
- **Key surfaces**: `/project-guardian` (marketing only), `/portal/projects/*` (all UI)
- **Backend**: Supabase CRUD via `/api/pg/*`, Clerk auth
- **Rule**: Project Guardian UI = Portal Only. `/project-guardian` is the marketing/spoke page. All project CRUD lives behind Clerk at `/portal/projects/*`. No token-auth pages. No exceptions.

### Health Guardian (COMING SOON)
- **Status**: Coming soon page + waitlist
- **What it does**: Vitals monitoring, pattern matching, preventative opportunities, med interactions, family dashboard.
- **Key surfaces**: `/health-guardian`
- **Notes**:

### Time Guardian (COMING SOON)
- **Status**: Coming soon page + waitlist
- **What it does**: Protect deep work, task priority scoring, decision fatigue detection, calendar intelligence, ADHD-friendly.
- **Key surfaces**: `/time-guardian`
- **Notes**:

### Trade Guardian (BRIEF LAUNCHING)
- **Status**: Content product launching (Daily Brief). Full platform still coming soon.
- **What it does**: Phase 1 = Market + Rate Brief (email/SMS/LinkedIn). Phase 2 = 4-lens conviction scoring platform.
- **Key surfaces**: `/trade-guardian` (coming soon page), GHL email campaigns, LinkedIn
- **Tags**: `TG_` prefix (TG_Brief_Subscriber, TG_Brief_Interested, etc.)
- **Rule**: Trade Guardian Brief is a CONTENT product. No new code, no new APIs, no dashboards. Sean writes manually. Tech product comes later.

### Wealth Guardian (COMING SOON)
- **Status**: Coming soon page + waitlist
- **What it does**: Unified view of mortgage/investments/tax/cash, continuous optimization, cross-signal triggers, tax harvesting, estate planning.
- **Key surfaces**: `/wealth-guardian`
- **Notes**:

---

## Shared Infrastructure

| Layer | Technology | Notes |
|-------|-----------|-------|
| Auth | Clerk | Portal protection, tier system (free/pro) |
| Database | Supabase (PostgreSQL) | Direct JS client, no ORM |
| AI | Claude Sonnet 4.6 via Vercel AI Gateway | Routing agent + Rosie chat |
| CRM | GoHighLevel v2 | Bidirectional field sync, 80+ custom fields, tag management |
| TTS | ElevenLabs | Rosie voice output |
| Hosting | Vercel | Next.js 16, Turbopack dev |
| Analytics | Vercel Analytics + SpeedInsights | |

---

## Domain Boundaries

| Domain | Pages | API | Owner |
|--------|-------|-----|-------|
| Rate Guardian | `/rate-guardian` + `/rg/dashboard` | `/api/rg/*` | Lead routing, monitoring, ops |
| Project Guardian | `/portal/projects` | `/api/pg/*` | Renovation CRUD (portal only) |
| SeanShallis | `/`, `/about`, `/connect`, `/event/*` | `/api/leads/*`, `/api/waitlist` | Marketing + lead gen |
| Rosie | `/rate-guardian/ask-rosie` | `/api/rosie/*` | Shared AI layer (chat, widget, booth, TTS) |

## Cross-Spoke Connections

- All spokes share Rosie as the AI brain
- Rate Guardian and Project Guardian both live in the same repo and portal
- Coming-soon spokes use shared `ComingSoonLayout` + `WaitlistForm` components
- `lib/brand.ts` defines all 6 spokes with status (`live` / `soon` / `future`)
- Portal dashboard shows all Guardian products with status badges

---

## Open Questions

-
-
-

---

## Decision Log

| Date | Decision | Context |
|------|----------|---------|
| 2026-04-26 | Project Guardian = portal only. KEEP `/portal/projects` and `/portal/projects/[id]`. DELETE `/project-guardian/projects/*` (legacy token-auth pages). `/project-guardian` stays as marketing page only. | Audit found two parallel implementations with different auth (token vs Clerk). Portal is canonical. |
| 2026-04-26 | Deleted legacy `api/` directory (10 files). All replaced by `app/api/rg/*`. Confirmed GHL webhook hits `/api/rg/webhook`. Updated CLAUDE.md and stale hint in rate-scan route. | Vercel serves both `api/` and `app/api/` — legacy endpoints were still deployable but orphaned. |
| 2026-04-26 | Trade Guardian Brief launch sprint complete. 5 docs created: execution plan, template, first draft brief, distribution copy, GHL checklist. Content product only — no code changes. | First monetizable Trade Guardian surface. Publisher exclusion, no SEC registration needed. |
