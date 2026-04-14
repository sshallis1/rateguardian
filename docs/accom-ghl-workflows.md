# ACCOM Conference — GHL Workflow Build Specs

**Conference**: ACCOM 2026 (Sean leaves Saturday April 19)
**QR Funnel URL**: https://shallis-site.vercel.app/event/accom

---

## Tags to Create in GHL (if not already present)

- `rg_source_accom`
- `rg_qr_event`
- `rg_stage_buyer`
- `rg_stage_shopper`
- `rg_stage_optimizer`
- `rg_persona_physician`
- `rg_accom_nurtured`

---

## WORKFLOW 1: ACCOM Lead Capture

**Name**: `RG | Event | ACCOM Lead Capture`
**Trigger**: Tag Added → `rg_source_accom`

### Settings
- Timezone: Account Timezone
- Time Window: 8:00 AM – 8:00 PM
- Stop on response: ON
- Allow re-entry: OFF
- From Name: Sean Shallis
- From Email: sean@theshallisgroup.com

### Steps

**Step 1**: If/Else → Contact has tag `RG_Manual_Owned`
- YES → End workflow
- NO → Continue

**Step 2**: Add to Pipeline
- Pipeline: Consumer Purchase/Refinance
- Stage: New or Re Engage

**Step 3**: Wait 2 minutes (let routing agent finish)

**Step 4**: SMS — Rosie Intro
```
Hey {{contact.first_name}}, this is Rosie from Sean Shallis's team at U.S. Bank.

Thanks for stopping by at ACCOM! I'm now watching your rate — if there's a savings opportunity, I'll catch it.

Sean will be in touch shortly with your personalized strategy. In the meantime, you can book a private call anytime: https://link.seanshallis.com/widget/bookings/usb_20m

- Rosie 🐶📉
```

**Step 5**: Wait 5 minutes

**Step 6**: Email — Authority + Value

**Subject**: `{{contact.first_name}}, here's what most physicians miss about their mortgage`

**Body**:
```
Hi {{contact.first_name}},

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
sean.shallis@usbank.com
```

**Step 7**: Add tag → `rg_accom_nurtured`

---

## WORKFLOW 2: ACCOM Segment Follow-Up

**Name**: `RG | Event | ACCOM Segment Follow-Up`
**Trigger**: Tag Added → `rg_accom_nurtured`

### Settings
- Same as Workflow 1

### Steps

**Step 1**: Wait 1 day

**Step 2**: If/Else → Contact has tag `rg_stage_buyer`

**BUYER Branch**:

SMS:
```
{{contact.first_name}}, quick note from Sean at U.S. Bank. Physician loan programs can get you into a home with $0 down and no PMI — even with student loans.

Want me to run the numbers? Takes 5 min: https://link.seanshallis.com/widget/bookings/usb_20m
```

**Step 3**: If/Else → Contact has tag `rg_stage_shopper`

**SHOPPER Branch**:

SMS:
```
{{contact.first_name}}, Sean from U.S. Bank here. If you're actively shopping, the difference between the right and wrong rate strategy can be $200-$400/month on a physician loan.

Let's make sure you're not leaving money on the table: https://link.seanshallis.com/widget/bookings/usb_20m
```

**Step 4**: If/Else → Contact has tag `rg_stage_optimizer`

**OPTIMIZER Branch**:

SMS:
```
{{contact.first_name}}, Rosie here 🐶 Just a heads up — I'm now monitoring your rate daily. If a savings window opens, you'll be the first to know.

In the meantime, Sean can run a free savings analysis on your current mortgage: https://link.seanshallis.com/widget/bookings/usb_20m
```

---

## WORKFLOW 3: ACCOM 7-Day Nurture

**Name**: `RG | Event | ACCOM 7-Day Nurture`
**Trigger**: Tag Added → `rg_accom_nurtured`

### Settings
- Same as Workflow 1

### Steps

**Step 1**: Wait 2 days

**Step 2**: Email — Value Drop

**Subject**: `The 3 blind spots I see in every physician's mortgage`

**Body**:
```
{{contact.first_name}},

After 30 years and $1B+ in transactions, I've seen the same three mistakes over and over:

1. Wrong loan product — Physician loans exist for a reason. Most lenders default to conventional and cost you thousands.

2. Bad rate timing — Locking too early or too late can mean $150-$300/month. Rosie watches this for you, daily.

3. Ignoring the refi window — The average physician who refinanced at the right time saved $247/month. The ones who didn't? Still overpaying.

Which one of these might apply to you?

👉 Let's find out in 20 minutes: https://link.seanshallis.com/widget/bookings/usb_20m

Sean Shallis
Private Wealth Mortgage Strategist | U.S. Bank
```

**Step 3**: Wait 2 days

**Step 4**: SMS — Podcast Value
```
{{contact.first_name}}, if you want to hear how other physicians are saving $200-400/mo on their mortgage — check out The Loan Doctor podcast. New episodes weekly. 🎙️

Sean
```

**Step 5**: Wait 3 days

**Step 6**: Email — Final CTA

**Subject**: `Last thing — your mortgage strategy session`

**Body**:
```
{{contact.first_name}},

I wanted to reach out one more time from ACCOM.

Rosie is still watching your rate — that never stops. But the personalized strategy session I offered at the conference is something I can only do for a limited number of physicians each month.

If you're buying, shopping, or just want to know if you're overpaying — this is the fastest way to find out.

👉 Book your 20-minute session: https://link.seanshallis.com/widget/bookings/usb_20m

No cost. No commitment. Just clarity.

Talk soon,
Sean

P.S. — 73% of the physicians I work with discover they're overpaying within the first 5 minutes of our call.
```

**Step 7**: Remove from workflow

---

## QR CODES TO GENERATE

| QR Code | URL | Purpose |
|---------|-----|---------|
| Main Funnel | `https://shallis-site.vercel.app/event/accom` | Primary booth QR |
| Booking | `https://link.seanshallis.com/widget/bookings/usb_20m` | Direct booking |
| Ask Rosie | `https://shallis-site.vercel.app/rate-guardian/ask-rosie` | Chat with Rosie |
| Podcast | (The Loan Doctor URL) | Podcast subscription |

---

## TRACKING CHECKLIST

- [ ] QR scan count (use UTM: `?utm_source=accom&utm_medium=qr&utm_campaign=booth`)
- [ ] Form submissions (Vercel logs + GHL contact count with `rg_source_accom` tag)
- [ ] Booking rate (GHL calendar events from ACCOM contacts)
- [ ] SMS open/reply rate
- [ ] Email open/click rate

---

*Generated by Claude Code — April 14, 2026*
