# GHL Runbook — Dual-TZ Call Window + RG_Manual_Owned Kill-Switch

**Created:** 2026-04-07
**Status:** Code shipped to production (`cedebd8` on main). GHL UI work pending.
**Author:** Sean + Claude
**Estimated time:** 20–30 min total. Step 1 alone is ~60 seconds.

---

## Why this runbook exists

Three problems to fix in GHL:

1. **Dr. Wang re-fire** — Manually editing a contact re-triggers Master Dispatcher as if it were a brand-new lead.
2. **Off-hours calls** — Leads were getting calls at 8:12pm, 12:27am, 12:44am EST because there is no time-of-day gate. Need 8a–8p in BOTH operator TZ AND lead's local TZ (intersection, not union).
3. **No master kill-switch** — When Sean manually engages a lead, there's no single way to stop ALL automated comms (calls, SMS, emails, drips, newsletter).

The code fixes are already deployed. This runbook is the GHL UI work to make them active.

---

## What's already shipped (no action needed)

- ✅ `POST /api/rg/egress/call-window-check` — dual-TZ gate, 8a–8p both zones, weekdays only, holiday-aware, fails closed, returns `defer_until_iso`
- ✅ `RG_Manual_Owned` tag constant + auto-apply on Engaged/Booked/Callback dispositions
- ✅ New `manual_owned` and `release_manual` actions on `/api/rg/egress/follow-up`
- ✅ Gate-check blocks workflow re-entry while `RG_Manual_Owned` is present
- ✅ CLAUDE.md updated with the workflow contract

Live endpoints:
- `https://shallis-site.vercel.app/api/rg/egress/call-window-check`
- `https://shallis-site.vercel.app/api/rg/egress/follow-up`

---

# 🟥 STEP 1 — Lock Master Dispatcher trigger (fixes Dr. Wang re-fire)

**Time:** 60 seconds
**Why:** Right now the workflow is firing on field/tag updates, so every time you manually edit a contact it re-runs the new-lead sequence. We want it to fire only on actual new leads.

1. GHL → **Automation → Workflows**
2. Open **"Master Dispatcher"**
3. Click the **trigger box at the top**
4. **Delete every trigger that says:**
   - ❌ "Contact Tag" (any kind)
   - ❌ "Custom Field Changed" / "Contact Field Updated"
   - ❌ "Note Added" / "Task Added"
   - ❌ "Opportunity Status Changed" (unless you explicitly want it)
5. **Keep / add ONLY these two triggers:**
   - ✅ **"Contact Created"** → Filter: `Lead Source` *is one of* → check all RG sources (LeverageRX, Website, etc.)
   - ✅ **"Inbound Webhook"** → URL: `https://shallis-site.vercel.app/api/rg/webhook` (already correct)
6. Click **Save** at top-right
7. Make sure the workflow toggle is **Publish ON** (top-right, blue)

**✅ Verify:** Open Dr. Wang's contact → edit any field → save. The workflow should NOT trigger.

---

# 🟧 STEP 2 — Add `RG_Manual_Owned` exit gate to every outbound workflow

**Time:** ~2 min per workflow. Do Master Dispatcher first; the rest can be tomorrow.
**Why:** Master kill-switch. Tag a contact `RG_Manual_Owned` and ALL automated comms stop instantly.

**Workflows that need this gate:**

- [ ] Master Dispatcher (do first)
- [ ] Result Routing
- [ ] C2S Physician Follow-Up
- [ ] Activation
- [ ] Pipeline Logic
- [ ] Internal Notify
- [ ] Contact Followup 3-Day (if exists)
- [ ] Any email drip / SMS / newsletter / quarterly reengage workflow

**For EACH workflow:**

1. Open the workflow
2. Click the **"+"** button between the **trigger** and the **first action**
3. Choose **"If/Else"**
4. **Branch A** (the "if" branch):
   - Condition: **Contact has tag** → `RG_Manual_Owned`
   - Then: **End workflow** (Goal Event → End, or just leave empty)
5. **Branch B** (the "else" branch):
   - Connect to whatever was the original first action
6. Save → Publish

**Shortcut:** Once done on Master Dispatcher, copy the If/Else node and paste it into the others.

**✅ Verify:** Pick a test contact → add tag `RG_Manual_Owned` → trigger workflow manually. Should exit immediately.

---

# 🟨 STEP 3 — Wire `call-window-check` before every call/VM/SMS

**Time:** ~5 min per workflow with calls
**Why:** Enforces 8a–8p in BOTH operator and lead TZ, weekdays only, holiday-aware. Server is source of truth.

**For every workflow with a Call / Voicemail / SMS action** (mainly C2S Physician Follow-Up):

**Insert this BEFORE each call/SMS/VM action:**

1. Click **"+"** above the call/SMS action
2. Choose **"Webhook"** action
3. Configure:
   - **Method:** `POST`
   - **URL:** `https://shallis-site.vercel.app/api/rg/egress/call-window-check`
   - **Headers:** `Content-Type: application/json`
   - **Body (JSON):**
     ```json
     {
       "contact_id": "{{contact.id}}",
       "channel": "call"
     }
     ```
     *(use `"voicemail"` or `"sms"` for those actions)*
4. **Save webhook step**
5. Right after the webhook → add an **"If/Else"**:
   - **Branch A — allowed:** `webhook.allowed` *equals* `true` → continues to the call/SMS
   - **Branch B — blocked:** `webhook.allowed` *equals* `false` → **"Wait until"** → use `{{webhook.defer_until_iso}}` → then loop back to the webhook step

**✅ Verify:** Trigger the workflow at 9pm EST. Webhook should return `allowed: false` with `defer_until_iso = next morning 8a in contact TZ`. Workflow should sit and wait.

---

# 🟩 STEP 4 — Add 4 Quick Action buttons on the contact card

**Time:** ~5 min total
**Why:** Mobile-friendly disposition + kill-switch. One tap from your phone after a call.

GHL → **Settings → Custom Menu Links** (or "Quick Actions" depending on GHL version)

Add these 4 webhook actions (all hit the same endpoint with different bodies):

| Button | Body |
|---|---|
| 🟢 **Spoke — Engaged** | `{"contact_id":"{{contact.id}}","action":"disposition","disposition":"Spoke - Engaged"}` |
| 📅 **Spoke — Booked** | `{"contact_id":"{{contact.id}}","action":"disposition","disposition":"Spoke - Booked"}` |
| 🔴 **Spoke — Not Interested** | `{"contact_id":"{{contact.id}}","action":"disposition","disposition":"Spoke - Not Interested"}` |
| ⛔ **I Got This** | `{"contact_id":"{{contact.id}}","action":"manual_owned"}` |

**All buttons:**
- **URL:** `https://shallis-site.vercel.app/api/rg/egress/follow-up`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

---

# 📋 Recommended order of operations

1. **Step 1** (60 sec) — stops Dr. Wang re-fires immediately ⚠️ **DO FIRST**
2. **Step 2 on Master Dispatcher only** (2 min) — biggest kill-switch coverage
3. Test: tag a contact `RG_Manual_Owned`, confirm nothing fires
4. **Step 4** (4 buttons, 5 min) — gives you the mobile workflow
5. **Step 3** (call window) — most tedious, deploy is live so do it last
6. **Step 2 on remaining workflows** — can do over coffee tomorrow

---

# 🔧 Quick test commands (for Claude to run after each step)

```bash
# Test call-window-check (should return allowed: false outside hours)
curl -X POST https://shallis-site.vercel.app/api/rg/egress/call-window-check \
  -H "Content-Type: application/json" \
  -d '{"contact_id":"<TEST_CONTACT_ID>","channel":"call"}'

# Test manual_owned action (should add RG_Manual_Owned tag)
curl -X POST https://shallis-site.vercel.app/api/rg/egress/follow-up \
  -H "Content-Type: application/json" \
  -d '{"contact_id":"<TEST_CONTACT_ID>","action":"manual_owned"}'

# Test release_manual (should remove the tag)
curl -X POST https://shallis-site.vercel.app/api/rg/egress/follow-up \
  -H "Content-Type: application/json" \
  -d '{"contact_id":"<TEST_CONTACT_ID>","action":"release_manual"}'
```

---

# 📂 File references

- **Code:** `app/api/rg/egress/call-window-check/route.ts`
- **Code:** `app/api/rg/egress/follow-up/route.ts`
- **Tag constant:** `lib/rg/types.ts` (`MANUAL_OWNED_TAG`)
- **Holiday list:** `lib/rg/holiday-mode.ts`
- **Contract:** `CLAUDE.md` in repo root (workflow contract section)
- **Commit:** `cedebd8` on `main`

---

# 🆘 If something breaks

- Workflows still firing on Manual_Owned contacts → screenshot the workflow's trigger panel and send to Claude
- Calls still firing off-hours → check Vercel logs for `call-window-check` endpoint, confirm GHL is actually hitting it
- Endpoint returns 500 → check `RG_Master_Token` env var in Vercel, check Vercel function logs
