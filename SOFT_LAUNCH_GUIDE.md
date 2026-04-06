# Rate Guardian — Soft Launch Guide
## Monday, April 6, 2026 — Launch Day

> Start-of-day playbook. Follow in order. Total time: ~90 minutes if everything goes smoothly.

---

## Current State (as of Sunday night)

**Backend (production):**
- ✅ AI routing agent live at `/api/rg/webhook`
- ✅ All 6 ops endpoints green (status, holiday, drain, heartbeat, health-check, notify)
- ✅ GHL PIT (Private Integration) token working on v2 API
- ✅ 10 of 16 RG workflows published in GHL
- ✅ C2S Physician Follow-Up tested live (placed real call to Ronnie White)
- ✅ Scanners throttled (200ms delay, ~80% fewer API calls)
- ✅ Vercel production: https://shallis-site.vercel.app

**Frontend (new as of tonight):**
- ✅ Homepage rebuilt — new hero, 3 Cs, ARM paradigm flip, 5-ingredient moat, Guardian spoke section
- ✅ Rate Guardian landing page (`/rate-guardian`)
- ✅ Ask Rosie chat page (`/rate-guardian/ask-rosie`) — streaming AI, AI Gateway + Claude
- ✅ About page with full bio + frameworks
- ✅ Coming-soon pages for Health, Trade, Time, Wealth Guardian with waitlist capture
- ✅ Spoke nav header across all pages
- ✅ Build passes clean (24 routes, 0 errors)

**Open items from Sunday:**
- ⏳ 9 voicemails need recording by Sean (~5 min total)
- ⏳ 6 RG workflows still in draft in GHL
- ⏳ C2S time-of-day carve-out (8am-8pm) + holiday gate still TODO
- ⏳ 168-contact master registry CSV staged but not released

---

## Phase 1 — Morning Coffee Checks (15 minutes)

### Step 1: Confirm Vercel auto-deployed last night's work
```bash
cd ~/claude/shallis-site
git status
git log --oneline -10
```

If the new frontend isn't committed yet:
```bash
git add -A
git commit -m "feat: rebuild homepage + Ask Rosie chat + Guardian spoke pages

New pages:
- Homepage with ARM paradigm flip + 5-ingredient moat + savings score
- Rate Guardian landing
- Ask Rosie chat (streaming via AI Gateway + Claude)
- About page
- Coming-soon pages (Health, Trade, Time, Wealth Guardian)

New components:
- SpokeNav (global header)
- SavingsScore (Credit Karma style circle)
- GuardianCard (spoke display)
- GearVisualization (hero SVG)
- ComingSoonLayout + WaitlistForm
- Footer, TrustBar, shadcn-style Button/Card/Badge/Input

Backend:
- /api/rosie/chat — streaming chat with Claude via AI Gateway
- /api/waitlist — email capture for coming-soon spokes

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
git push origin main
```

Then watch the deploy:
```bash
# Open in browser
start https://vercel.com/sean-shallis-projects/shallis-site
```

### Step 2: Smoke-test all 6 ops endpoints
```bash
TOKEN="$CRON_SECRET"  # from .env.local
BASE="https://shallis-site.vercel.app/api/rg"

# Should all return 200
curl -s "$BASE/health" | jq
curl -s "$BASE/ops/status?token=$TOKEN" | jq
curl -s -X POST "$BASE/ops/heartbeat" -H "Authorization: Bearer $TOKEN" | jq
```

**Expected:** 6/6 green. If any fail, check Vercel logs and stop here — do not launch.

### Step 3: Verify the new homepage loads
Open in browser:
- https://shallis-site.vercel.app/ — should show new hero ("Rosie Watches Your Rate")
- https://shallis-site.vercel.app/rate-guardian — landing page
- https://shallis-site.vercel.app/rate-guardian/ask-rosie — chat interface
- https://shallis-site.vercel.app/about — bio
- https://shallis-site.vercel.app/health-guardian — coming soon page

**Smoke test Rosie:** type "Hi Rosie" in the chat. She should stream a response within 2-3 seconds. If she errors out, check the `/api/rosie/chat` logs — likely `VERCEL_OIDC_TOKEN` missing or expired.

---

## Phase 2 — Record Voicemails (20 minutes)

Scripts are at `~/claude/voicemail-scripts-rg.md`. Total 9 VMs:

- **Physician set (3):** Day 1, Day 2, Day 3 — for LeverageRx leads
- **Generic set (3):** Day 1, Day 2, Day 3 — for everyone else
- **Re-engagement (3):** Quarterly cycle — past clients, COIs, dormant

**How to record:**
1. Use iPhone Voice Memos
2. Quiet room, phone 6 inches away, landscape mode
3. Read once to warm up, record once for real
4. AirDrop to Mac → drag into GHL media library
5. Tag filenames clearly: `rg_vm_physician_day1.m4a`, etc.

**Upload to GHL:**
- Settings → Media Library → upload all 9
- Note the URLs — paste into the matching workflow voicemail drop steps

---

## Phase 3 — Finish GHL Workflow Internals (25 minutes)

6 workflows still in draft:
1. **BASE TEMPLATE** — don't publish, this is a cloning source
2. **Ask Rosie Flow** — wire to `/api/rosie/chat` (new today)
3. **Rate Drop Alert** — trigger on `RG_Rate_Drop_Detected` tag
4. **Evaluate Refi** — trigger from Dispatcher, write `RG_Refi_Score`
5. **Set Opportunity Score** — internal scoring pass
6. **LeadSource LeverageRX Integration** — email parser → contact create

**For each:**
- Open workflow in GHL
- Verify trigger tag / webhook is correct
- Verify every branch ends with `RG_Rosie_Status = Completed` or `Needs Data`
- Run the pre-flight checklist (10 items — see `rate-guardian.md` memory)
- Publish

**Critical: C2S time-of-day carve-out**
On the "Make a Call" step in Physician Follow-Up and Base Template:
- Add "Wait until" condition: hour is between 8 AM and 8 PM (contact's timezone)
- Add "Skip" condition: today is a federal US holiday (use Ops Holiday mode)

---

## Phase 4 — Dry Run with 1 Test Contact (10 minutes)

Use the "RG Test Contact" from last week (or create a new one):
- First name: Test
- Last name: Launch
- Email: sean.shallis+test@usbank.com
- Phone: your own mobile
- Tag: `rg_new_lead_submitted`
- Custom fields: `RG_Persona_Type = Physician`, `RG_Lead_Source = LeverageRX`

**Watch the pipeline fire:**
1. Dispatcher picks it up → writes `RG_Rosie_Status = In Progress`
2. Webhook hits `/api/rg/webhook` → Claude routes → decision logged
3. Dispatcher reads decision → writes `RG_Rosie_Path`, `RG_Loan_Product_Type`, `RG_Rosie_Status = Completed`
4. Result Routing reads the completed status → branches to Physician Follow-Up
5. Physician Follow-Up starts the 3-day sequence — but FIRST call is blocked by your time carve-out if outside window
6. You should get the first SMS/voicemail in your own phone

**If anything misfires:** stop, fix, re-test. Do NOT release the 168-contact cohort until a clean dry run.

---

## Phase 5 — Release the 168-Contact Soft Launch Cohort (15 minutes)

**Only proceed if Phases 1-4 all green.**

1. Open the master registry CSV at `~/claude/data/rg-master-registry.csv`
2. In GHL → Contacts → Bulk Actions → Import CSV
3. Map columns to custom fields (use `lib/rg/field-map.ts` as reference)
4. **Important:** do NOT tag them with `rg_new_lead_submitted` yet — that would fire the dispatcher on all 168 at once
5. Import first, verify counts, then apply tags in batches of 25-50 over the next few days

**Recommended cadence:**
- Monday: 25 contacts (physicians only — LeverageRx set)
- Tuesday: 25 contacts (physicians continued)
- Wednesday: 50 contacts (consumer refi set)
- Thursday: 50 contacts (final batch)
- Friday: monitor, no new releases

---

## Phase 6 — Monitor + Respond (ongoing all day)

### Dashboard URL
```
https://shallis-site.vercel.app/rg/dashboard?token=$CRON_SECRET
```

### Watch for:
- **Ops Notify alerts** → tagged `rg_opportunity_alert` in GHL
- **Needs Data queue** → contacts stuck in the engine, usually missing loan amount or current rate
- **Error queue** → `RG_Rosie_Error` field populated; check Vercel logs
- **Replies coming in** → GHL inbox, respond within 15 minutes if possible

### Dispositions (post-call buttons)
The 7 disposition buttons are at `https://shallis-site.vercel.app/rg/disposition?contact=<ID>&action=<ACTION>`:
- `spoke-engaged`, `spoke-booked`, `spoke-not-interested`
- `call-back`, `lost`, `dnc`, `long-term-follow-up`

Bookmark these in GHL for 1-click post-call logging.

---

## If Something Breaks

**Webhook failing:** Check Vercel Function logs for `/api/rg/webhook`. Most common: expired `VERCEL_OIDC_TOKEN` (re-run `vercel env pull`).

**GHL API 401:** PIT token expired or scopes changed. Regenerate at GHL → Settings → Integrations → Private Integrations → Rate Guardian.

**Workflow loop:** Check Dispatcher trigger — should NOT fire on status/path/product field changes. If it does, you'll see rapid-fire runs in the logs. Pause Dispatcher, fix the trigger, re-enable.

**Rosie chat errors:** `/api/rosie/chat` depends on AI Gateway OIDC. If it 500s, re-run `vercel env pull` locally and redeploy, or manually set `AI_GATEWAY_API_KEY` as a fallback.

**Need to kill outbound fast:** Hit Holiday Mode from the dashboard. Everything queues until you hit Pickup.

---

## Success Criteria (End of Day Monday)

- [ ] All 6 ops endpoints green all day
- [ ] Phase 1-4 completed clean
- [ ] At least 25 physician contacts released through Dispatcher
- [ ] First SMS + VM flight recorded in GHL
- [ ] Zero workflow loops or silent failures
- [ ] Dashboard shows "Active" all day
- [ ] At least 1 reply or conversation started

---

## Tuesday Morning (April 7) Bonus

If Monday goes well, Tuesday's priorities:
1. Wire `seanshallis.com` domain to the Vercel project (GoDaddy API key needed)
2. Generate OG images for the new pages
3. Polish the AskRosie chat — add the 4-stage intent flow (buying/shopping/refi/monitor)
4. Start the ask-rosie-ai component port (IntroSlides, RatesWidget, SavingsScoreWidget)

---

**You've got this. Rosie's ready. Sean's ready. It's launch day.**

— Claude
