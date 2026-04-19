# GHL AI Workflow Builder Prompt — Workflow 1

Copy and paste this into the GHL AI Workflow Builder:

---

Build a workflow called "RG | Event | ACCOM Lead Capture" with the following specifications:

**Trigger:** Contact Tag Added = "rg_source_accom"

**Workflow Settings:**
- Stop on response: ON
- Allow re-entry: OFF
- From Name: Sean Shallis
- From Email: sean@theshallisgroup.com

**Steps in order:**

Step 1: If/Else condition — check if contact has tag "RG_Manual_Owned"
- If YES → End workflow (stop/exit)
- If NO → Continue to next step

Step 2: Add contact to pipeline "Consumer Purchase/Refinance" at stage "New or Re Engage"

Step 3: Wait 2 minutes

Step 4: Send SMS with this exact message:
"Hey {{contact.first_name}}, this is Rosie from Sean Shallis's team at U.S. Bank.

Thanks for stopping by at ACCOM! I'm now watching your rate — if there's a savings opportunity, I'll catch it.

Sean will be in touch shortly with your personalized strategy. In the meantime, you can book a private call anytime: https://link.seanshallis.com/widget/bookings/usb_20m

- Rosie 🐶📉"

Step 5: Wait 5 minutes

Step 6: Send Email
- Subject: "{{contact.first_name}}, here's what most physicians miss about their mortgage"
- Body:
"Hi {{contact.first_name}},

Great connecting at ACCOM. I'm Sean Shallis — Private Wealth Mortgage Strategist with U.S. Bank and the creator of Rate Guardian.

Here's the uncomfortable truth: most medical professionals are overpaying on their mortgage and don't know it. Between student loan treatment, physician-specific programs, and rate timing — there are blind spots everywhere.

That's why I built Rosie — an AI that watches your rate daily and alerts you the moment a savings window opens. No cost. No strings. Just clarity.

Here's what I can help with:

✅ Physician loan programs with $0 down
✅ Rate optimization and lock timing strategies
✅ Student loan treatment that most lenders get wrong
✅ Refinance breakeven analysis (so you never refi too early)

Want to see exactly where you stand? Let's do a 20-minute private strategy call.

👉 Book here: https://link.seanshallis.com/widget/bookings/usb_20m

Looking forward to helping you see what you've been missing.

Sean Shallis
Private Wealth Mortgage Strategist | U.S. Bank
NMLS #2362814
O: (973) 457-2278 | M: (973) 461-6955
sean.shallis@usbank.com"

Step 7: Add tag "rg_accom_nurtured" to the contact

Save as DRAFT — do not publish.
