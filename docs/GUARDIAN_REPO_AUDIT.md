# Guardian Repo Audit

> Generated: 2026-04-26
> Repo: `shallis-site` (Next.js 16 + React 19 + TypeScript + Tailwind)
> Production: https://shallis-site.vercel.app
> Source files: ~120 (excl. node_modules, .next)

---

## 1. All App Routes / Pages

### Root
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/` | `app/page.tsx` | SSR | Homepage. Hero, physician programs, Savings Score, Rate Guardian reveal, Guardian Family spokes, enterprise section, testimonials, CTA |
| `/about` | `app/about/page.tsx` | SSR | Sean's bio. Timeline (Army Rangers -> mortgage -> AI), frameworks, credentials, CTA |
| `/connect` | `app/connect/page.tsx` | SSR | Connection hub. 5 persona paths, quick-action buttons (call/email/save contact) |

### Rate Guardian
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/rate-guardian` | `app/rate-guardian/page.tsx` | SSR | RG spoke page. Savings Score, Three Cs, Five-Ingredient Moat, CTA |
| `/rate-guardian/ask-rosie` | `app/rate-guardian/ask-rosie/page.tsx` | CSR | Full-screen Ask Rosie chat interface |

### Project Guardian
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/project-guardian` | `app/project-guardian/page.tsx` | SSR | PG spoke page. Feature grid, cost estimator, CTA |
| `/project-guardian/projects` | `app/project-guardian/projects/page.tsx` | CSR | **Legacy** project list (token auth via URL param) |
| `/project-guardian/projects/[id]` | `app/project-guardian/projects/[id]/page.tsx` | CSR | **Legacy** project detail (token auth, dark theme) |

### Guardian Family (Coming Soon)
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/health-guardian` | `app/health-guardian/page.tsx` | SSR | ComingSoonLayout + waitlist |
| `/time-guardian` | `app/time-guardian/page.tsx` | SSR | ComingSoonLayout + waitlist |
| `/trade-guardian` | `app/trade-guardian/page.tsx` | SSR | ComingSoonLayout + waitlist |
| `/wealth-guardian` | `app/wealth-guardian/page.tsx` | SSR | ComingSoonLayout + waitlist |

### Auth (Clerk)
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/sign-in` | `app/(auth)/sign-in/[[...sign-in]]/page.tsx` | SSR | Clerk SignIn component |
| `/sign-up` | `app/(auth)/sign-up/[[...sign-up]]/page.tsx` | SSR | Clerk SignUp component |

### Portal (Protected via Clerk middleware)
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/portal` | `app/(portal)/portal/page.tsx` | SSR | Dashboard. Welcome + tier badge, Guardian products grid |
| `/portal/profile` | `app/(portal)/portal/profile/page.tsx` | SSR | Clerk UserProfile + current plan card |
| `/portal/projects` | `app/(portal)/portal/projects/page.tsx` | SSR | Project list with tier-based limits |
| `/portal/projects/new` | `app/(portal)/portal/projects/new/page.tsx` | CSR | New project form |
| `/portal/projects/[id]` | `app/(portal)/portal/projects/[id]/page.tsx` | CSR | Project detail (light theme, portal-styled) |

### Event (ACCOM 2026)
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/event/accom` | `app/event/accom/page.tsx` | SSR | Conference landing. Hero, physician programs, enterprise, funnel, testimonials |
| `/event/accom/booth` | `app/event/accom/booth/page.tsx` | CSR | Live Rosie booth demo |
| `/event/accom/scan` | `app/event/accom/scan/page.tsx` | CSR | QR scan entry point |
| `/event/accom/qr` | `app/event/accom/qr/page.tsx` | SSR | QR code display/download (4 codes) |
| `/event/accom/cards` | `app/event/accom/cards/page.tsx` | CSR | 4-up double-sided print cards |
| `/event/accom/resources` | `app/event/accom/resources/page.tsx` | SSR | Resource hub (brochures, programs, testimonials) |

### Ops (Internal)
| Route | File | Type | Description |
|-------|------|------|-------------|
| `/rg/dashboard` | `app/rg/dashboard/page.tsx` | CSR | RG Command Center. Holiday mode, held leads, pickup/EOD/drain actions (token auth via URL param) |

**Total pages: 24**

---

## 2. All API Routes

### Rate Guardian Intake (`/api/rg/intake/`)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/rg/intake/askrosie` | POST | Progressive lead capture from Ask Rosie chat |
| `/api/rg/intake/accom` | POST | ACCOM conference funnel lead capture |
| `/api/rg/intake/leveragerx` | POST | LeverageRx portal scrape + GHL intake |

### Rate Guardian Webhook (`/api/rg/`)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/rg/webhook` | POST | GHL webhook receiver -> Claude routing agent -> writes RoutingDecision back |
| `/api/rg/health` | GET | System health check |

### Rate Guardian Egress (`/api/rg/egress/`)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/rg/egress/call-window-check` | POST | Validates 8am-8pm in operator + contact TZ, weekdays, holiday-aware |
| `/api/rg/egress/follow-up` | POST | Manual disposition (spoke/booked/not-interested/callback/nurture/manual-owned/release) |
| `/api/rg/egress/result-routing` | POST | Routes scoring results to GHL workflow (reads path, never writes) |

### Rate Guardian Ops (`/api/rg/ops/`)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/rg/ops/status` | GET | Real-time system status (token auth) |
| `/api/rg/ops/heartbeat` | POST | Cron: every 6h, re-evaluates due contacts |
| `/api/rg/ops/health-check` | POST | Cron: every 12h, detects stuck/stale records |
| `/api/rg/ops/rate-scan` | POST | Cron: scheduled rate monitoring scan |
| `/api/rg/ops/drain` | POST | Manually release held leads |
| `/api/rg/ops/holiday` | POST | Enable/disable holiday mode |
| `/api/rg/ops/notify` | POST | Send notifications (SMS/email) |

### Rosie AI (`/api/rosie/`)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/rosie/chat` | POST | Streaming chat (Claude Sonnet 4.6 via AI Gateway) |
| `/api/rosie/widget` | POST | Embeddable widget chat (same brain, different context) |
| `/api/rosie/booth` | POST | Event booth demo chat |
| `/api/rosie/speak` | POST | Text-to-speech (ElevenLabs) |

### Project Guardian (`/api/pg/`)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/pg/projects` | GET, POST | List/create projects (Clerk auth) |
| `/api/pg/projects/[id]` | GET, PATCH | Get/update project |
| `/api/pg/contractors` | GET, POST | List/create contractors |
| `/api/pg/contractors/[id]` | PATCH | Update contractor |
| `/api/pg/milestones` | GET, POST | List/create milestones |
| `/api/pg/milestones/[id]` | PATCH | Update milestone |
| `/api/pg/payments` | GET, POST | List/create payments |
| `/api/pg/payments/[id]` | PATCH | Update payment |

### Other
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/leads/10x-formula` | POST | 10X Formula PDF download lead capture -> GHL |
| `/api/waitlist` | POST | Guardian product waitlist signup |

**Total API routes: 25**

---

## 3. Auth System (Clerk)

### Setup
- **Provider**: Clerk (`@clerk/nextjs` ^7.2.7)
- **Root wrapper**: `ClerkProvider` in `app/layout.tsx`
- **Middleware**: `middleware.ts` — protects `/portal(.*)` routes via `clerkMiddleware`

### Auth Utilities (`lib/auth.ts`)
- `getCurrentUser()` — returns `{ id, email, firstName, lastName, tier }` or null
- `requireAuth()` — throws if not authenticated, returns `userId`
- `getUserTier()` — reads `publicMetadata.tier` from Clerk, defaults to `"free"`

### Auth Patterns in Use
| Pattern | Where | How |
|---------|-------|-----|
| Clerk middleware | `/portal/*` | `auth.protect()` on matched routes |
| Clerk server auth | Portal pages, PG API routes | `requireAuth()` or `getCurrentUser()` |
| Clerk + CRON_SECRET dual-auth | `lib/pg/auth.ts` | Clerk JWT first, falls back to `CRON_SECRET` header |
| Token via URL param | `/rg/dashboard`, `/project-guardian/projects/*` | `?token=` query param (no Clerk) |
| No auth | All public pages, `/api/rg/webhook`, `/api/rosie/*` | Open access |

### Tier System (`lib/membership.ts`)
- **Free**: 1 project, basic features
- **Pro**: 10 projects, contractor tools, document vault, priority support

---

## 4. Database Usage (Supabase)

### Client
- **Package**: `@supabase/supabase-js` ^2.100.1
- **Init**: `lib/supabase.ts` — singleton with `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- **Safety**: Stub client returned if env vars missing (prevents build crash)
- **ORM**: None (direct Supabase JS queries)

### Tables

#### Rate Guardian (`rg_*`)
- `contacts` — 50+ custom fields (RG_Rosie_Status, RG_Lead_Source, RG_Persona_Type, loan details, etc.)
- `alerts` — Rate Guardian alert history
- `rate_alerts` — Alert tracking
- `rate_opportunities` — Opportunity history
- `rg_run_ledger` — Engine run audit trail

#### Project Guardian (`pg_*`)
- `pg_projects` — Renovation projects (name, address, budget, phase, resale target, user_id)
- `pg_payments` — Payment tracking (vendor, amount, category, method, bucket: confirmed/pending/at_risk)
- `pg_contractors` — Contractor management (name, trade, phone, status)
- `pg_milestones` — Phase tracking (name, status: pending/in_progress/completed, dates)

### Migrations (`sql/`)
- `20260214_rg_canonical_state.sql` — RG canonical state table
- `20260423_pg_project_guardian.sql` — PG tables creation
- `20260423_pg_seed_wiltop.sql` — Seed data (102 Wiltop Rd)
- `20260425_pg_add_user_id.sql` — Add user_id column to PG tables
- `rg_run_ledger.sql` — Run ledger table

### Type Definitions
- `types/supabase.ts` — Generated Supabase types (Database interface)
- `types/payloads.ts` — Lead payload types
- `types/shims.d.ts` — Type shims

### Legacy Supabase Edge Functions (`supabase/functions/`)
- `alerts-insert/index.ts` — Deno edge function for alert insertion (deprecated)
- `rg-dispatch-classify/index.ts` — Deno edge function for classification dispatch (deprecated)

---

## 5. Current Features Implemented

### Live Features
1. **Homepage / Marketing Site** — Full landing with physician lending programs, enterprise section, testimonials
2. **Rate Guardian Lead Routing** — GHL webhook -> Claude AI routing agent -> field/tag updates -> GHL workflows
3. **Ask Rosie Chat** — AI chat (Claude Sonnet 4.6), progressive lead capture, intent scoring, value injection
4. **Rosie Chat Widget** — Floating widget with voice input (speech recognition) + TTS (ElevenLabs)
5. **Lead Intake Funnels** — Ask Rosie, ACCOM conference, LeverageRx, 10X Formula
6. **Call Window Enforcement** — Dual-timezone 8am-8pm gate, weekday-only, holiday-mode aware
7. **Manual Disposition System** — Quick-action buttons for call outcomes, RG_Manual_Owned kill-switch
8. **Holiday Mode** — Enable/disable via ops dashboard, held leads queue + drain
9. **Ops Dashboard** — Real-time status, pickup/EOD/drain controls (token-protected)
10. **ACCOM 2026 Conference Suite** — Landing, booth mode, QR scan, printable cards, resource hub
11. **Clerk Auth + Portal** — Sign-in/up, protected portal, tier system (free/pro)
12. **Project Guardian CRUD** — Projects, payments, contractors, milestones (Clerk-authed API)
13. **Cost Estimator** — Interactive renovation cost calculator (sqft, type, region)
14. **Savings Score Display** — Circular progress indicator (0-100, color-coded)
15. **Guardian Family Spokes** — Coming-soon pages with waitlist for Health, Time, Trade, Wealth
16. **About / Connect Pages** — Bio, timeline, persona-based routing
17. **10X Formula Lead Magnet** — Modal capture -> PDF delivery via GHL
18. **Waitlist System** — Email signup for future products
19. **Rate Guardian Crons** — Heartbeat (6h), health-check (12h), rate-scan (scheduled)
20. **GHL Integration** — Bidirectional field sync, 80+ custom fields, tag management, rate limiting

### Scaffolded but Not Complete
- **Rosie Engine** (`lib/engine/`) — Background rate monitoring (computeOpportunity, createAlerts, fetchContacts, etc.) — partially built, referred to as "legacy" in CLAUDE.md
- **Rules Engine** (`lib/rg/RulesEngine.ts`) — Loan classification by rate delta + product thresholds
- **Rate Comparison Widget** (`components/interactive/RateComparisonWidget.tsx`) — UI exists, unclear if wired
- **Savings Calculator** (`components/interactive/SavingsCalculator.tsx`) — UI exists, unclear if wired

---

## 6. Feature Ownership Map

### Rate Guardian
| Area | Files |
|------|-------|
| **Core Logic** | `lib/rg/router-agent.ts`, `lib/rg/ghl-client.ts`, `lib/rg/field-map.ts`, `lib/rg/types.ts`, `lib/rg/timezone.ts`, `lib/rg/RulesEngine.ts`, `lib/rg/holiday-mode.ts` |
| **Legacy Engine** | `lib/engine/computeOpportunity.ts`, `lib/engine/createAlerts.ts`, `lib/engine/fetchContacts.ts`, `lib/engine/logger.ts`, `lib/engine/productLogic.js`, `lib/engine/runEngine.ts`, `lib/engine/runLedger.ts`, `lib/engine/sendWebhook.ts` |
| **API Routes** | `app/api/rg/webhook/`, `app/api/rg/intake/*`, `app/api/rg/egress/*`, `app/api/rg/ops/*`, `app/api/rg/health/` |
| **Pages** | `app/rate-guardian/page.tsx`, `app/rate-guardian/ask-rosie/page.tsx`, `app/rg/dashboard/page.tsx` |
| **Components** | `components/chat/AskRosieChat.tsx`, `components/chat/ProgressiveCapture.tsx`, `components/chat/RosieChatWidget.tsx`, `components/chat/SavingsScoreTeaser.tsx`, `components/chat/ValueInjection.tsx`, `components/brand/SavingsScore.tsx` |
| **Legacy Vercel Functions** | `api/engine.ts`, `api/webhook.ts`, `api/intake.ts`, `api/fetch-alerts.ts`, `api/cron-daily.ts`, `api/classify-test-contacts.ts`, `api/record-health.ts`, `api/rosie-alert.ts`, `api/supabase-alert.ts`, `api/test-engine.ts` |
| **Supabase Edge (deprecated)** | `supabase/functions/alerts-insert/`, `supabase/functions/rg-dispatch-classify/` |

### SeanShallis.com (Personal Brand / Marketing)
| Area | Files |
|------|-------|
| **Pages** | `app/page.tsx` (homepage), `app/about/page.tsx`, `app/connect/page.tsx` |
| **Components** | `components/brand/SpokeNav.tsx`, `components/brand/Footer.tsx`, `components/brand/TrustBar.tsx`, `components/brand/BeyondMortgageSection.tsx`, `components/brand/GearVisualization.tsx`, `components/brand/GuardianCard.tsx`, `components/brand/TenXFormulaModal.tsx`, `components/brand/WaitlistForm.tsx`, `components/connect/ConnectRouter.tsx`, `components/interactive/SavingsCalculator.tsx`, `components/interactive/RateComparisonWidget.tsx` |
| **Config** | `lib/brand.ts` (GUARDIANS, BRAND constants), `lib/utils.ts` |
| **Event** | `app/event/accom/*` (6 pages), `components/event/*` (7 components) |

### Project Guardian
| Area | Files |
|------|-------|
| **Pages** | `app/project-guardian/page.tsx`, `app/project-guardian/projects/page.tsx` (legacy), `app/project-guardian/projects/[id]/page.tsx` (legacy), `app/(portal)/portal/projects/page.tsx`, `app/(portal)/portal/projects/new/page.tsx`, `app/(portal)/portal/projects/[id]/page.tsx` |
| **API** | `app/api/pg/projects/`, `app/api/pg/payments/`, `app/api/pg/contractors/`, `app/api/pg/milestones/` |
| **Lib** | `lib/pg/db.ts`, `lib/pg/auth.ts`, `lib/pg/types.ts`, `lib/membership.ts` |
| **Components** | `components/interactive/CostEstimator.tsx`, `components/portal/GuardianProductCard.tsx`, `components/portal/PortalNav.tsx` |

### Ask Rosie (AI Chat)
| Area | Files |
|------|-------|
| **API** | `app/api/rosie/chat/`, `app/api/rosie/widget/`, `app/api/rosie/booth/`, `app/api/rosie/speak/` |
| **Components** | `components/chat/AskRosieChat.tsx`, `components/chat/RosieChatWidget.tsx`, `components/chat/ProgressiveCapture.tsx`, `components/chat/SavingsScoreTeaser.tsx`, `components/chat/ValueInjection.tsx` |
| **Lib** | `lib/rosie/system-prompt.ts`, `lib/chat/intent-detector.ts` |
| **Pages** | `app/rate-guardian/ask-rosie/page.tsx`, `app/event/accom/booth/page.tsx` |

### Guardian Family (Coming Soon)
| Area | Files |
|------|-------|
| **Pages** | `app/health-guardian/page.tsx`, `app/time-guardian/page.tsx`, `app/trade-guardian/page.tsx`, `app/wealth-guardian/page.tsx` |
| **Shared** | `components/brand/ComingSoonLayout.tsx`, `components/brand/WaitlistForm.tsx` |

### Portal (Cross-cutting)
| Area | Files |
|------|-------|
| **Layout** | `app/(portal)/layout.tsx` |
| **Pages** | `app/(portal)/portal/page.tsx`, `app/(portal)/portal/profile/page.tsx` |
| **Components** | `components/portal/PortalNav.tsx`, `components/portal/GuardianProductCard.tsx` |
| **Lib** | `lib/auth.ts`, `lib/membership.ts` |

---

## 7. Duplicated Logic / Pages

### CRITICAL: Project Guardian Projects — Two Parallel Implementations

| Legacy (token auth) | Portal (Clerk auth) |
|---------------------|---------------------|
| `app/project-guardian/projects/page.tsx` | `app/(portal)/portal/projects/page.tsx` |
| `app/project-guardian/projects/[id]/page.tsx` | `app/(portal)/portal/projects/[id]/page.tsx` |
| Token via `?token=` URL param | Clerk middleware + `requireAuth()` |
| Dark theme, standalone | Light theme, portal layout |
| No tier limits | Tier-based project limits |

**Impact**: Two separate UIs for the same data. The legacy `/project-guardian/projects/*` pages use token-based auth and bypass Clerk entirely. The portal versions are the intended production path.

**Recommendation**: Deprecate and remove `/project-guardian/projects/*` (legacy token-auth pages). Keep `/project-guardian/page.tsx` as the marketing/spoke page only.

### Legacy Vercel Functions (`api/` top-level)

The `api/` directory at the project root contains **10 legacy Vercel Functions** using the old `VercelRequest/VercelResponse` pattern:

| File | Purpose | Replacement |
|------|---------|-------------|
| `api/engine.ts` | Run Rosie engine | `app/api/rg/ops/heartbeat` |
| `api/webhook.ts` | GHL webhook receiver | `app/api/rg/webhook` |
| `api/intake.ts` | Lead intake | `app/api/rg/intake/*` |
| `api/fetch-alerts.ts` | Relay Supabase alerts | `app/api/rg/ops/*` |
| `api/cron-daily.ts` | Daily cron | `app/api/rg/ops/heartbeat` + `health-check` |
| `api/classify-test-contacts.ts` | Test classification | No replacement needed (test utility) |
| `api/record-health.ts` | Health recording | `app/api/rg/health` |
| `api/rosie-alert.ts` | Rosie alert relay | `app/api/rg/ops/notify` |
| `api/supabase-alert.ts` | Supabase alert relay | `app/api/rg/ops/notify` |
| `api/test-engine.ts` | Engine test runner | No replacement needed (test utility) |

**Impact**: These are orphaned. The Next.js App Router routes (`app/api/rg/*`) are the active versions. The legacy `api/` files may still be deployed by Vercel (it serves both `api/` and `app/api/` directories).

**Recommendation**: Delete the entire `api/` directory. If any cron jobs still hit these endpoints, update them to the `app/api/rg/ops/*` equivalents.

### Legacy Supabase Edge Functions (`supabase/functions/`)

| File | Status |
|------|--------|
| `supabase/functions/alerts-insert/index.ts` | Deprecated (Deno, uses Supabase edge runtime) |
| `supabase/functions/rg-dispatch-classify/index.ts` | Deprecated (replaced by `router-agent.ts`) |

**Recommendation**: Delete `supabase/functions/` entirely.

### Legacy Engine (`lib/engine/`)

8 files implementing the original Rosie monitoring engine. CLAUDE.md labels this "Legacy Rosie engine (being retired)". The newer routing logic lives in `lib/rg/router-agent.ts` and the ops crons.

**Recommendation**: Audit which engine functions are still called by active code paths. If none, archive or delete.

### Rosie Chat API — Three Similar Endpoints

| Endpoint | System Prompt Context | Difference |
|----------|----------------------|------------|
| `/api/rosie/chat` | `"ask-rosie"` | Full chat for Ask Rosie page |
| `/api/rosie/widget` | `"widget"` (likely) | Floating widget overlay |
| `/api/rosie/booth` | `"booth"` (likely) | Event booth demo mode |

These likely share 90%+ of their logic, differing only in the system prompt variant passed to `getRosieSystemPrompt()`. Not necessarily a problem if the prompt variants are meaningfully different, but worth verifying they're not just copy-pasted route files.

### `build/index.html`

A static HTML file titled "Rate Guardian Engine API" — appears to be a leftover from an earlier standalone API deployment. Serves no purpose in the Next.js app.

**Recommendation**: Delete `build/` directory.

---

## 8. Unclear or Unused Code

### Possibly Unused
| Item | Location | Concern |
|------|----------|---------|
| `lib/engine/productLogic.js` | Legacy engine | Only `.js` file in a TypeScript project. Likely orphaned |
| `lib/rg/RulesEngine.ts` | RG core | Classification engine — unclear if any active route calls `classify()` |
| `components/interactive/RateComparisonWidget.tsx` | Interactive | May not be wired to any page or data source |
| `components/interactive/SavingsCalculator.tsx` | Interactive | May not be wired to any page or data source |
| `components/event/RosieStory.tsx` | Event | Unclear if rendered anywhere |
| `docs/leveragerx-gmail-trigger.js` | Docs | Google Apps Script — reference only, not part of build |
| `tests/rg-core.test.ts` | Tests | Only test file. No test runner configured (no vitest/jest in deps). `tsx` in devDeps may run it manually |
| `types/shims.d.ts` | Types | May contain outdated module shims |
| Default SVGs | `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` | Next.js starter template leftovers |

### Needs Clarification
| Item | Question |
|------|----------|
| `app/rg/dashboard/page.tsx` | Token auth via URL param — is this intentionally outside the portal? Should it be behind Clerk? |
| `/project-guardian/projects/*` | Legacy token-auth pages — are any GHL workflows or external links pointing here? |
| `lib/normalizer.ts` | `normalizeLead()` — which intake routes actually use this? |
| `.env.supabase` | Separate from `.env.local` — is this used by any process? |
| `DEPLOYMENT.md`, `DESIGN-CONCEPTS.md`, `SOFT_LAUNCH_GUIDE.md` | Root markdown files — current or stale? |

---

## 9. Suggested Folder Structure

The current structure is mostly clean. Here's a tightened version that removes legacy code, clarifies boundaries, and groups by domain:

```
shallis-site/
|
|-- app/
|   |-- (auth)/
|   |   |-- sign-in/[[...sign-in]]/page.tsx
|   |   |-- sign-up/[[...sign-up]]/page.tsx
|   |
|   |-- (portal)/
|   |   |-- layout.tsx
|   |   |-- portal/
|   |       |-- page.tsx                    # Dashboard
|   |       |-- profile/page.tsx
|   |       |-- projects/
|   |           |-- page.tsx                # Project list
|   |           |-- new/page.tsx            # New project form
|   |           |-- [id]/page.tsx           # Project detail
|   |
|   |-- (marketing)/                        # NEW: group route for public pages
|   |   |-- page.tsx                        # Homepage (move from app/page.tsx)
|   |   |-- about/page.tsx
|   |   |-- connect/page.tsx
|   |   |-- rate-guardian/
|   |   |   |-- page.tsx
|   |   |   |-- ask-rosie/page.tsx
|   |   |-- project-guardian/
|   |   |   |-- page.tsx                    # Marketing only (no projects/ sub-routes)
|   |   |-- health-guardian/page.tsx
|   |   |-- time-guardian/page.tsx
|   |   |-- trade-guardian/page.tsx
|   |   |-- wealth-guardian/page.tsx
|   |
|   |-- (event)/                            # NEW: group route for events
|   |   |-- event/accom/
|   |       |-- page.tsx
|   |       |-- booth/page.tsx
|   |       |-- scan/page.tsx
|   |       |-- qr/page.tsx
|   |       |-- cards/page.tsx
|   |       |-- resources/page.tsx
|   |
|   |-- (ops)/                              # NEW: group route for internal tools
|   |   |-- rg/dashboard/page.tsx           # Consider moving behind Clerk
|   |
|   |-- api/
|   |   |-- rg/                             # Rate Guardian API (unchanged)
|   |   |   |-- webhook/route.ts
|   |   |   |-- health/route.ts
|   |   |   |-- intake/
|   |   |   |   |-- askrosie/route.ts
|   |   |   |   |-- accom/route.ts
|   |   |   |   |-- leveragerx/route.ts
|   |   |   |-- egress/
|   |   |   |   |-- call-window-check/route.ts
|   |   |   |   |-- follow-up/route.ts
|   |   |   |   |-- result-routing/route.ts
|   |   |   |-- ops/
|   |   |       |-- status/route.ts
|   |   |       |-- heartbeat/route.ts
|   |   |       |-- health-check/route.ts
|   |   |       |-- rate-scan/route.ts
|   |   |       |-- drain/route.ts
|   |   |       |-- holiday/route.ts
|   |   |       |-- notify/route.ts
|   |   |-- rosie/                          # Rosie AI API (unchanged)
|   |   |   |-- chat/route.ts
|   |   |   |-- widget/route.ts
|   |   |   |-- booth/route.ts
|   |   |   |-- speak/route.ts
|   |   |-- pg/                             # Project Guardian API (unchanged)
|   |   |   |-- projects/route.ts
|   |   |   |-- projects/[id]/route.ts
|   |   |   |-- payments/route.ts
|   |   |   |-- payments/[id]/route.ts
|   |   |   |-- contractors/route.ts
|   |   |   |-- contractors/[id]/route.ts
|   |   |   |-- milestones/route.ts
|   |   |   |-- milestones/[id]/route.ts
|   |   |-- leads/
|   |   |   |-- 10x-formula/route.ts
|   |   |-- waitlist/route.ts
|   |
|   |-- layout.tsx
|   |-- globals.css
|
|-- components/
|   |-- brand/                              # (unchanged — 10 components)
|   |-- chat/                               # (unchanged — 5 components)
|   |-- connect/                            # (unchanged — 1 component)
|   |-- event/                              # (unchanged — 7 components)
|   |-- interactive/                        # (unchanged — 3 components)
|   |-- portal/                             # (unchanged — 2 components)
|   |-- ui/                                 # (unchanged — 5 components)
|
|-- lib/
|   |-- auth.ts                             # Clerk auth helpers
|   |-- brand.ts                            # GUARDIANS, BRAND constants
|   |-- membership.ts                       # Tier features
|   |-- normalizer.ts                       # Lead payload normalization
|   |-- supabase.ts                         # DB client
|   |-- utils.ts                            # cn(), formatCurrency(), formatRate()
|   |-- chat/
|   |   |-- intent-detector.ts
|   |-- pg/
|   |   |-- auth.ts
|   |   |-- db.ts
|   |   |-- types.ts
|   |-- rg/
|   |   |-- field-map.ts
|   |   |-- ghl-client.ts
|   |   |-- holiday-mode.ts
|   |   |-- router-agent.ts
|   |   |-- RulesEngine.ts
|   |   |-- timezone.ts
|   |   |-- types.ts
|   |-- rosie/
|       |-- system-prompt.ts
|
|-- types/
|   |-- supabase.ts
|   |-- payloads.ts
|
|-- sql/                                    # DB migrations (keep)
|-- public/                                 # Static assets (clean up starter SVGs)
|-- docs/                                   # Documentation
|-- tests/                                  # Tests (needs test runner setup)
|
|-- DELETED:
|   |-- api/                                # Legacy Vercel Functions (10 files)
|   |-- build/                              # Static HTML leftover
|   |-- supabase/functions/                 # Deprecated Deno edge functions
|   |-- lib/engine/                         # Legacy engine (8 files, if confirmed unused)
|   |-- app/project-guardian/projects/      # Legacy token-auth project pages
|   |-- types/shims.d.ts                    # If no longer needed
|   |-- public/file.svg, globe.svg, etc.    # Next.js starter leftovers
```

### Key Changes in Suggested Structure
1. **Delete `api/`** (top-level) — 10 legacy Vercel Functions replaced by `app/api/rg/*`
2. **Delete `build/`** — orphaned static HTML
3. **Delete `supabase/functions/`** — deprecated Deno edge functions
4. **Delete `app/project-guardian/projects/*`** — legacy token-auth pages (portal versions are canonical)
5. **Archive or delete `lib/engine/`** — 8 files labeled "being retired" in CLAUDE.md
6. **Add route groups** `(marketing)`, `(event)`, `(ops)` — logical grouping, no URL change
7. **Clean `public/`** — remove Next.js starter SVGs (file.svg, globe.svg, next.svg, vercel.svg, window.svg)

---

## Summary Stats

| Metric | Count |
|--------|-------|
| App pages | 24 |
| API routes | 25 |
| Components | 33 |
| Lib modules | 22 |
| Type files | 3 |
| SQL migrations | 5 |
| Legacy files (deletable) | ~23 |
| Total source files | ~120 |
| Dependencies (prod) | 14 |
| Dependencies (dev) | 9 |
