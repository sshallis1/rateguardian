# GHL AI Workflow Builder Prompt — 10X Personal Success Formula Delivery

**Trigger tag:** `rg_source_10x_formula` (created in GHL on 2026-04-20)
**Lead source:** seanshallis.com homepage "Beyond the Mortgage" section, 10X Formula modal
**Lead magnet:** 10X Personal Success Formula™ (PDF, uploaded to GHL Sub-Account → Media)

---

## Before You Paste — 1 thing to swap

PDF URL is already wired in (GHL Media: `https://assets.cdn.filesafe.space/Mymg9zFjvZ8ognhb9J1Q/media/69e6bea0774ef96b9bde1e87.pdf`).

1. `[NURTURE_TAG]` → pick which nurture this routes into at the end:
   - `rg_accom_nurtured` (existing 7-day physician nurture — works if audience is mostly medical)
   - `rg_10x_nurtured` (create new, if you want a dedicated agent/investor/personal-dev soap opera)
2. That's it. Everything else is ready to paste.

---

## PASTE THIS INTO GHL AI WORKFLOW BUILDER

Build a workflow called "RG | Lead Magnet | 10X Personal Success Formula" with the following specifications:

**Trigger:** Contact Tag Added = "rg_source_10x_formula"

**Workflow Settings:**
- Stop on response: ON
- Allow re-entry: OFF
- From Name: Sean Shallis
- From Email: sean@theshallisgroup.com

**Steps in order:**

Step 1: If/Else condition — check if contact has tag "RG_Manual_Owned"
- If YES → End workflow (stop/exit)
- If NO → Continue to next step

Step 2: Wait 1 minute

Step 3: Send SMS with this exact message:
"Hey {{contact.first_name}} — Sean here. 👊

Thanks for grabbing the 10X Personal Success Formula™.

Here's your download link: https://assets.cdn.filesafe.space/Mymg9zFjvZ8ognhb9J1Q/media/69e6bea0774ef96b9bde1e87.pdf

Save it, read it, and DM me back with the one habit you're committing to first. That's where it starts.

- Sean"

Step 4: Wait 3 minutes

Step 5: Send Email
- Subject: "{{contact.first_name}}, here's your 10X Personal Success Formula™"
- Body:
"Hi {{contact.first_name}},

Thanks for grabbing the 10X Personal Success Formula™ — here's your copy:

👉 Download: https://assets.cdn.filesafe.space/Mymg9zFjvZ8ognhb9J1Q/media/69e6bea0774ef96b9bde1e87.pdf

A quick note on why I built this.

After 30 years in private wealth mortgage lending — $1B+ in transactions with physicians, agents, investors, and leaders — I've seen one pattern over and over: the people who compound real wealth aren't the smartest or the best connected. They're the ones running a simple, repeatable daily operating system.

The 10X Formula is that system, distilled. It's what I use. It's what I coach clients and business partners through. And it pairs with whatever you're already building — a medical practice, a real estate portfolio, a growing brokerage, a family.

Read it once. Pick one habit. Start tomorrow.

And when you're ready to see what leverage looks like on the financial side — whether that's a primary home, an investment property, or rethinking the mortgage you already have — I'm one phone call away.

👉 Book 20 minutes: https://link.seanshallis.com/widget/bookings/usb_20m

To your next 10X,

Sean Shallis
Private Wealth Mortgage Strategist | U.S. Bank
NMLS #2362814
O: (973) 457-2278 | M: (973) 461-6955
sean.shallis@usbank.com"

Step 6: Wait 2 days

Step 7: If/Else condition — check if contact has tag "RG_Manual_Owned"
- If YES → End workflow (stop/exit)
- If NO → Continue to next step

Step 8: Send SMS with this exact message:
"{{contact.first_name}} — quick check in. Did the 10X Formula land?

One question most people don't ask themselves: what's the ONE leverage point in your financial life you haven't pulled yet?

Sometimes it's the mortgage. Sometimes it's real estate. Sometimes it's just a plan.

Want to talk it through? 20 min, no pitch: https://link.seanshallis.com/widget/bookings/usb_20m

- Sean"

Step 9: Wait 3 days

Step 10: Add tag "[NURTURE_TAG]" to the contact (this hands them off to the long-form nurture soap opera)

Step 11: Remove tag "rg_new_lead_submitted" from the contact (so the dispatcher knows they're handed off)

Save as DRAFT — do not publish until [NURTURE_TAG] is filled in.

---

## After Publishing — Quick Verification

1. Create a test contact with email/phone you control
2. Apply tag `rg_source_10x_formula` manually
3. Confirm:
   - SMS arrives within 1–2 minutes with the real PDF link
   - Email arrives 3 minutes after SMS
   - PDF link opens the document from GHL media (not a broken link)
   - After 2 days, follow-up SMS fires
   - After 5 total days, nurture tag is added and handoff happens

## Related Files

- Intake API: `app/api/leads/10x-formula/route.ts` — adds `rg_source_10x_formula` + `rg_sms_consent` + `rg_lead_magnet_personal_development` on form submit
- Modal component: `components/brand/TenXFormulaModal.tsx`
- Homepage section: `components/brand/BeyondMortgageSection.tsx`
- PDF drop zone (fallback, if not hosting on GHL Media): `public/downloads/10x-personal-success-formula.pdf`
