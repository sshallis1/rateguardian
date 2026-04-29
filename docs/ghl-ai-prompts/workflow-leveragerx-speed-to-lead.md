# GHL AI Workflow Builder Prompt — LeverageRx Speed-to-Lead (v2)

Copy and paste this into the GHL AI Workflow Builder:

---

Build a workflow called **"RG | LeverageRx | Speed-to-Lead v2"** with the following specifications:

## Overview
When a LeverageRx lead lands in GHL, immediately attempt to connect Sean with the lead via phone. If Sean connects, he handles the call personally. If he doesn't pick up, fall back to voicemail drop + SMS + email sequence. Sean always gets an internal SMS notification with full lead details first.

## Trigger
- **Contact Tag Added** = `rg_source_leveragerx`

## Workflow Settings
- Stop on response: ON (inbound SMS or email from contact stops the workflow)
- Allow re-entry: OFF
- From Name: Sean Shallis
- From Email: sean.shallis@usbank.com

---

## STEP 1: Internal Notification to Sean (Immediate)

**Action:** Send Internal SMS to `+19734616955`

**Message:**
```
🚨 NEW LEVERAGERX LEAD

Name: {{contact.first_name}} {{contact.last_name}}
Phone: {{contact.phone}}
Email: {{contact.email}}
State: {{contact.state}}
Loan Type: {{contact.custom_field.loan_type}}
Loan Amount: {{contact.custom_field.loan_amount}}
Property Type: {{contact.custom_field.property_type}}
Credit Score: {{contact.custom_field.credit_score_range}}
Timeline: {{contact.custom_field.timeline}}
Source: LeverageRx
Notes: {{contact.custom_field.intake_notes}}

ACTION: Phone ringing in 30 sec — pick up to connect live.
```

## STEP 2: Wait 30 seconds
(Gives Sean time to see the notification and prepare)

## STEP 3: Time Window Check (If/Else)

**Condition:** Current time is between 8:00 AM and 8:00 PM in Account Timezone (America/New_York)

### IF YES (Within Business Hours) → Continue to Step 4
### IF NO (Outside Business Hours) → Go to Step 10 (skip call, go straight to SMS/email)

## STEP 4: Call Sean (Connect-to-Lead)

**Action:** Call User (Sean Shallis)
- Phone number to call Sean: `+19734616955`
- Whisper message to Sean: "New LeverageRx lead. {{contact.first_name}} {{contact.last_name}}. Press 1 to connect."
- If Sean presses 1: Bridge call to `{{contact.phone}}`
- Timeout: 20 seconds (if Sean doesn't answer within 20 sec, move to next step)

## STEP 5: If/Else — Did Sean Connect?

**Condition:** Call status = "completed" AND duration > 30 seconds

### IF YES (Sean Connected — Spoke with Lead) → Go to Step 6
### IF NO (Sean Didn't Pick Up or Short Call) → Go to Step 7

---

## STEP 6: Sean Connected — Skip Voicemail, Continue with Nurture

**6a.** Add tag: `rg_call_connected`
**6b.** Set custom field `RG_Last_Call_Outcome` = "connected_live"
**6c.** Wait 5 minutes
**6d.** Send SMS to lead:
```
Hey {{contact.first_name}} — great chatting! As mentioned, I'm going to have Rosie start watching rates for your scenario. You'll be the first to know when a window opens.

Here's my direct line anytime: (973) 461-6955

Talk soon,
Sean
```
**6e.** Wait 1 hour
**6f.** Send Email to lead:
- Subject: "{{contact.first_name}}, great connecting today"
- Body:
```
Hi {{contact.first_name}},

Thanks for taking the time to chat. I'm looking forward to helping you navigate this.

As I mentioned, I've got Rosie monitoring your scenario now — free, no strings. When a savings window opens or rates move favorably for your situation, you'll hear from me first.

In the meantime, here are a few things that might be helpful:

• Save my contact: https://seanshallis.com/connect
• Check your Savings Score anytime: https://seanshallis.com/rate-guardian/ask-rosie
• Book a follow-up if anything comes up: https://link.seanshallis.com/widget/bookings/usb_20m

Looking forward to getting this right for you and your family.

Sean Shallis
Mortgage Loan Originator | U.S. Bank
NMLS #2362814
O: (973) 457-2278 | M: (973) 461-6955
sean.shallis@usbank.com
```
**6g.** Add tag: `RG-Manual`
**6h.** Add tag: `rg_lifecycle_conversation`
**6i.** Move opportunity to "Contacted / In Conversation"
**6j.** END workflow.

---

## STEP 7: Sean Didn't Connect — Voicemail Drop + Sequence

**7a.** Add tag: `rg_call_no_answer_internal` (tracks that Sean missed it)
**7b.** Send Internal SMS to `+19734616955`:
```
⚠️ Missed LeverageRx connect — {{contact.first_name}} {{contact.last_name}}. Falling back to voicemail + SMS sequence. Call them back when you can: {{contact.phone}}
```

## STEP 8: Call Lead — Voicemail Drop

**Action:** Call contact `{{contact.phone}}`
- If voicemail detected → Drop pre-recorded voicemail (Ringless Voicemail or Voicemail Drop)
- Voicemail file: [Sean's LeverageRx intro VM — to be recorded]
- If live answer → Bridge to Sean (unlikely at this point, but handle gracefully)
- Max ring: 25 seconds

## STEP 9: Set Call Outcome

**If voicemail dropped:**
- Add tag: `rg_call_voicemail`
- Set `RG_Last_Call_Outcome` = "voicemail_dropped"

**If no answer (no VM):**
- Add tag: `rg_call_no_answer`
- Set `RG_Last_Call_Outcome` = "no_answer"

---

## STEP 10: SMS to Lead (Immediate after VM or if outside hours)

**Action:** Send SMS
```
Hey {{contact.first_name}} — Sean Shallis here, U.S. Bank mortgage. I saw your inquiry come through and wanted to reach out personally.

I specialize in physician loans and can typically get you better terms than what the marketplace shows. Quick question — are you buying or refinancing?

Reply anytime, I'm here. — Sean
```

## STEP 11: Wait 10 minutes

## STEP 12: Send Email to Lead

**Subject:** "{{contact.first_name}}, saw your rate inquiry — quick thought"

**Body:**
```
Hi {{contact.first_name}},

Sean Shallis here — Mortgage Loan Originator at U.S. Bank (NMLS #2362814). I saw your inquiry come through and wanted to reach out directly.

Here's the thing most people don't realize about marketplace leads: the rates you see are often teaser numbers. What actually matters is the full structure — rate + fees + credits + loan type + timing.

That's where I come in. With 30+ years and over $1B in closed transactions, I've seen every scenario. And I've built an AI system (Rosie) that monitors your rate daily — for free, forever — so you never miss a window.

A few things I can help with right now:

✅ Physician loan programs: $0 down, no PMI, student loan-friendly DTI
✅ Rate comparison: what the marketplace quoted vs. what I can actually do
✅ Strategy session: 20 min, no obligation, no pressure

Book a quick call: https://link.seanshallis.com/widget/bookings/usb_20m

Or just reply to this email — I read everything personally.

Sean Shallis
Mortgage Loan Originator | U.S. Bank
NMLS #2362814
O: (973) 457-2278 | M: (973) 461-6955
sean.shallis@usbank.com
seanshallis.com
```

## STEP 13: Wait 1 day

## STEP 14: Quiet Hours Gate
- Wait until business hours in contact timezone (8am–8pm)
- Wait until business hours in account timezone (8am–8pm ET)

## STEP 15: SMS Follow-Up #2
```
{{contact.first_name}} — Sean again. No pressure, just checking if you had a chance to see my message. If the timing isn't right, I'm happy to just have Rosie watch rates for you in the background. Free, no strings. Want me to set that up? — Sean
```

## STEP 16: Wait 2 days

## STEP 17: Quiet Hours Gate (repeat)

## STEP 18: SMS Follow-Up #3
```
{{contact.first_name}} — last note from me. If you'd rather just have someone watching rates quietly in the background (no calls, no pressure), reply WATCH and I'll set it up. Free forever. Otherwise, I'm here whenever you're ready. — Sean
```

## STEP 19: Wait 3 days

## STEP 20: Email Follow-Up #2

**Subject:** "Still here if you need me, {{contact.first_name}}"

**Body:**
```
Hi {{contact.first_name}},

Just a quick follow-up. I know timing is everything with mortgages — and sometimes the timing just isn't right yet.

No pressure from my end. But I did want you to know that I've set up Rosie to monitor rates for your scenario. If something moves favorably, you'll hear from me.

In the meantime:
• Free rate check anytime: https://seanshallis.com/rate-guardian/ask-rosie
• Book a call when ready: https://link.seanshallis.com/widget/bookings/usb_20m

Wishing you the best,
Sean
```

## STEP 21: Add tag `rg_leveragerx_sequence_complete`

## STEP 22: END workflow

---

## Tags Used
| Tag | Purpose |
|-----|---------|
| `rg_source_leveragerx` | Trigger — lead came from LeverageRx |
| `rg_call_connected` | Sean spoke with lead live |
| `rg_call_voicemail` | Voicemail dropped to lead |
| `rg_call_no_answer` | No answer, no voicemail |
| `rg_call_no_answer_internal` | Sean missed the connect call |
| `RG-Manual` | Fires engaged nurture sequence |
| `rg_lifecycle_conversation` | Pipeline stage update |
| `rg_leveragerx_sequence_complete` | Finished cold sequence |

---

## Notes
- The "Call Sean first" approach = speed to lead. You're not calling the lead cold — you're seeing the intel, picking up YOUR phone, and getting bridged live.
- If Sean misses it: automated fallback handles the lead immediately (no delay)
- Stop on response: any inbound SMS/email from the lead halts automation — Sean takes over manually.
- Pre-recorded voicemail still needs to be recorded (BLOCK pending from Sean).
