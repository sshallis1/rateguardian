# GHL AI Workflow Builder Prompt — Website Lead Speed-to-Lead

Copy and paste this into the GHL AI Workflow Builder:

---

Build a workflow called **"RG | Website | Speed-to-Lead"** with the following specifications:

## Overview
When a lead comes in from the website (Ask Rosie chat, booking form, contact form, or Savings Score email gate), immediately notify Sean with full context and attempt a live connect. Same logic as LeverageRx workflow but with website-specific messaging.

## Trigger
- **Contact Tag Added** = `rg_source_website`

(This tag should be applied by the website intake API at `/api/rg/intake/askrosie` when a lead submits their info through Rosie or any site form.)

## Workflow Settings
- Stop on response: ON
- Allow re-entry: OFF
- From Name: Sean Shallis
- From Email: sean.shallis@usbank.com

---

## STEP 1: Internal Notification to Sean (Immediate)

**Action:** Send Internal SMS to `+19734616955`

**Message:**
```
🌐 NEW WEBSITE LEAD

Name: {{contact.first_name}} {{contact.last_name}}
Phone: {{contact.phone}}
Email: {{contact.email}}
State: {{contact.state}}
Source Page: {{contact.custom_field.source_page}}
Intent: {{contact.custom_field.intent_signals}}
Savings Score: {{contact.custom_field.savings_score}}
Notes: {{contact.custom_field.rosie_conversation_summary}}

ACTION: Phone ringing in 30 sec — pick up to connect live.
```

## STEP 2: Wait 30 seconds

## STEP 3: If/Else — Does Contact Have Phone Number?

**Condition:** `{{contact.phone}}` is not empty

### IF NO (email only — no phone) → Go to Step 20 (email-only sequence)
### IF YES → Continue to Step 4

## STEP 4: Time Window Check

**Condition:** Current time between 8:00 AM and 8:00 PM in Account Timezone (America/New_York)

### IF YES → Continue to Step 5
### IF NO → Go to Step 10 (skip call, go to SMS/email)

## STEP 5: Call Sean (Connect-to-Lead)

**Action:** Call User (Sean Shallis)
- Phone: `+19734616955`
- Whisper: "Website lead. {{contact.first_name}} {{contact.last_name}}. Savings Score {{contact.custom_field.savings_score}}. Press 1 to connect."
- If Sean presses 1: Bridge to `{{contact.phone}}`
- Timeout: 20 seconds

## STEP 6: If/Else �� Did Sean Connect?

**Condition:** Call status = "completed" AND duration > 30 seconds

### IF YES → Go to Step 7
### IF NO → Go to Step 8

---

## STEP 7: Sean Connected — Personalized Follow-Through

**7a.** Add tag: `rg_call_connected`
**7b.** Set `RG_Last_Call_Outcome` = "connected_live"
**7c.** Wait 5 minutes
**7d.** Send SMS:
```
{{contact.first_name}} — great chatting! Rosie is officially watching your rate now. You'll be the first to know when something moves.

My direct line: (973) 461-6955
Your Savings Score anytime: seanshallis.com/rate-guardian/ask-rosie

— Sean
```
**7e.** Wait 1 hour
**7f.** Send Email:
- Subject: "You're on Rosie's radar, {{contact.first_name}}"
- Body:
```
Hi {{contact.first_name}},

Thanks for chatting with Rosie — and for taking my call. You're officially on the radar.

Here's what happens now:
1. Rosie monitors rates for your scenario — multiple times per day
2. If a savings window opens, I'll reach out personally
3. No cost, no obligation, no pressure — ever

Helpful links:
• Save my contact: https://seanshallis.com/connect
• Book a follow-up anytime: https://link.seanshallis.com/widget/bookings/usb_20m
• Check your score: https://seanshallis.com/rate-guardian/ask-rosie

Looking forward to helping you and your family.

Sean Shallis
Mortgage Loan Originator | U.S. Bank
NMLS #2362814
O: (973) 457-2278 | M: (973) 461-6955
sean.shallis@usbank.com
```
**7g.** Add tags: `RG-Manual`, `rg_lifecycle_conversation`
**7h.** Move opportunity to "Contacted / In Conversation"
**7i.** END workflow.

---

## STEP 8: Sean Missed — Voicemail + Fallback

**8a.** Send Internal SMS to `+19734616955`:
```
⚠️ Missed website lead connect — {{contact.first_name}}. Auto-sequence active. Call back: {{contact.phone}}
```
**8b.** Call contact — voicemail drop
**8c.** Set outcome tags (same logic as LeverageRx workflow steps 8-9)

## STEP 9: Set Call Outcome (voicemail or no answer)

---

## STEP 10: SMS to Lead

```
Hey {{contact.first_name}} — Sean Shallis here. Rosie told me you checked in. I'd love to look at your numbers personally and see what's possible.

Are you buying, refinancing, or just want someone watching your rate? Reply anytime. — Sean
```

## STEP 11: Wait 10 minutes

## STEP 12: Send Email

**Subject:** "{{contact.first_name}}, your Savings Score + what's next"

**Body:**
```
Hi {{contact.first_name}},

Thanks for chatting with Rosie. She's sharp — but I like to follow up personally because every situation has nuance an algorithm can't catch.

Here's what I noticed about your scenario:
- You may qualify for programs most people don't know exist
- Timing matters — and I have Rosie watching daily so you don't miss a window
- One conversation with me could save you thousands over the life of your loan

Want to do a quick 20-minute strategy session? No obligation, no pressure — just clarity.

Book here: https://link.seanshallis.com/widget/bookings/usb_20m

Or just reply to this email. I read everything personally.

Sean Shallis
Mortgage Loan Originator | U.S. Bank
NMLS #2362814
O: (973) 457-2278 | M: (973) 461-6955
sean.shallis@usbank.com
seanshallis.com
```

## STEP 13: Wait 1 day

## STEP 14: Quiet Hours Gate

## STEP 15: SMS Follow-Up #2
```
{{contact.first_name}} — quick follow-up from Sean. Did you get a chance to see the message? No pressure — if the timing isn't right, I can just have Rosie keep watching in the background. Free forever. — Sean
```

## STEP 16: Wait 2 days

## STEP 17: Quiet Hours Gate

## STEP 18: SMS Follow-Up #3 (Last Touch)
```
{{contact.first_name}} — last note. Reply WATCH and I'll keep monitoring your rate quietly. No calls, no pressure. Otherwise, my door is always open when you're ready. — Sean
```

## STEP 19: Add tag `rg_website_sequence_complete` → END workflow.

---

## STEP 20: Email-Only Sequence (No Phone Number)

For leads who only provided email (Savings Score gate, no phone captured):

**20a.** Send Email:
- Subject: "Your Savings Score is ready, {{contact.first_name}}"
- Body:
```
Hi {{contact.first_name}},

Thanks for chatting with Rosie — your Savings Score is locked in and she's now monitoring your rate daily.

I'm Sean Shallis — the human behind the AI. I've been helping families navigate mortgage decisions for 30+ years, and I'd love to take a personal look at your numbers.

Quick question: are you buying, refinancing, or just keeping an eye on things?

Hit reply — I read everything personally. Or if you'd rather talk:
• Book 20 min: https://link.seanshallis.com/widget/bookings/usb_20m
• Call me: (973) 457-2278

Sean Shallis
Mortgage Loan Originator | U.S. Bank
NMLS #2362814
sean.shallis@usbank.com
seanshallis.com
```

**20b.** Wait 2 days

**20c.** Send Email:
- Subject: "One thing most people miss about their mortgage"
- Body:
```
Hi {{contact.first_name}},

Quick thought: the average homeowner overpays $47,000+ in interest over the life of their loan. Not because they got a bad rate — but because no one was watching when a better window opened.

That's literally why I built Rosie. She watches. I act. You save.

If you want me to take a deeper look at your situation, reply with a few details:
- Current rate (or what you've been quoted)
- Approximate loan amount
- Buying or refinancing?

No obligation. Just clarity.

Sean
```

**20d.** Wait 3 days

**20e.** Send Email:
- Subject: "Still watching for you, {{contact.first_name}}"
- Body:
```
Hi {{contact.first_name}},

Just a note — Rosie is actively monitoring rates for your scenario. If something moves, you'll hear from me.

No action needed on your end. But if you ever want to chat, my calendar is always open: https://link.seanshallis.com/widget/bookings/usb_20m

Best,
Sean
```

**20f.** Add tag `rg_website_email_sequence_complete` → END workflow.

---

## Tags Used
| Tag | Purpose |
|-----|---------|
| `rg_source_website` | Trigger — lead from seanshallis.com |
| `rg_call_connected` | Sean spoke with lead live |
| `rg_call_voicemail` | Voicemail dropped |
| `rg_call_no_answer` | No answer |
| `rg_call_no_answer_internal` | Sean missed connect |
| `RG-Manual` | Fires engaged nurture |
| `rg_lifecycle_conversation` | Pipeline update |
| `rg_website_sequence_complete` | Full sequence done (with phone) |
| `rg_website_email_sequence_complete` | Email-only sequence done |

---

## Integration Note — Website Intake API

The existing `/api/rg/intake/askrosie` endpoint should:
1. Create/update the contact in GHL
2. Set custom fields: `source_page`, `intent_signals`, `savings_score`, `rosie_conversation_summary`
3. Add tag: `rg_source_website`
4. This triggers the workflow automatically

No mention of LeverageRx or any third-party source appears in any lead-facing communication.
