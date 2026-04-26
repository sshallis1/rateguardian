# GHL AI Workflow Build Prompt — TG | Brief | VIP Preview Launch

> Paste this ENTIRE prompt into GHL's AI Workflow Builder (or follow step-by-step manually).
> This creates the complete Trade Guardian Brief VIP Preview workflow for 29 tagged funded clients.

---

## PROMPT FOR GHL AI:

Build me a workflow called **"TG | Brief | VIP Preview Launch"** with the following specs:

### TRIGGER
- **Trigger type**: Tag Added
- **Tag**: `TG_Brief_VIP_Preview`
- **Run once per contact**: Yes (do not re-enroll)

---

### STEP 1 — Wait Until Send Window
- **Action**: Wait
- **Wait until**: Next Monday at 7:30 AM Eastern Time
- **Why**: We send the brief Monday morning after reviewing live market data

---

### STEP 2 — Send VIP Preview Email
- **Action**: Send Email
- **Subject**: Something new — you're getting first look
- **From name**: Sean Shallis
- **Reply-to**: Sean's email

**Email body (HTML-friendly, paste into GHL email builder):**

---

Hey {{contact.first_name}},

You're one of my best clients, so I wanted to give you a sneak peek at something I've been building.

It's called the **Trade Guardian Brief** — a short weekly intelligence report that connects mortgage rates to financial markets. The kind of thing I wish someone had given me 20 years ago.

Here's why I think you'll care:

**Rates just hit their lowest point in weeks.** The 30-year fixed dropped to 6.13%. The 15-year is at 5.63%. ARMs are at 5.25%. Meanwhile, the 10-year Treasury climbed to 4.31% on geopolitical tension — and that divergence won't last.

**This Week's Headlines:**

• **Fed meets Wednesday** — Powell's press conference at 2pm ET. No rate change expected, but his language will signal whether cuts are closer than the market thinks.

• **Biggest housing data week of the quarter** — Case-Shiller, Housing Starts, Building Permits, and New Home Sales all drop Tuesday-Wednesday.

• **Five Mag 7 earnings** — Amazon, Google, Meta, Microsoft, Apple. If tech disappoints, money rotates into rate-sensitive sectors.

• **Lock or Float?** If you're 30+ days out, float. Inside 21 days, lock. Wednesday is the hinge point.

**What This Means For You:**

• **Buying?** Float if you have time. This week could push rates lower.
• **Own a home?** If your rate is above 6.75%, the refi math is starting to work. Rosie can run your numbers — just reply.
• **Investing?** Rate-sensitive plays (TLT, KRE, ITB) are the setup. Wednesday afternoon is the trigger.
• **Know someone who needs this?** Forward this email. I'll add them.

I'm sending this to a small group of funded clients first. If it's valuable, I'll keep it coming weekly. If not, just tell me — no hard feelings.

**Reply to this email if you want me to watch any of this for your specific situation.**

— Sean

Sean Shallis | Private Wealth Mortgage Strategist | NMLS #2362814
This is general market commentary and does not constitute personalized investment or mortgage advice. Past performance does not guarantee future results.

---

### STEP 3 — Wait for Reply (72 hours)
- **Action**: Wait for Condition
- **Condition**: Contact replies to email
- **Timeout**: 72 hours
- **If reply received**: Go to Step 4A (Reply Path)
- **If no reply (timeout)**: Go to Step 4B (No Reply Path)

---

### STEP 4A — REPLY PATH

#### Step 4A.1 — Add Interested Tag
- **Action**: Add Tag
- **Tag**: `TG_Brief_Interested`

#### Step 4A.2 — Add Subscriber Tag
- **Action**: Add Tag
- **Tag**: `TG_Brief_Subscriber`

#### Step 4A.3 — Internal Notification
- **Action**: Send Internal Notification (Email or SMS to Sean)
- **Message**: "TG Brief reply from {{contact.first_name}} {{contact.last_name}}: {{contact.last_message}}. Reply personally."

#### Step 4A.4 — Add Contact Note
- **Action**: Add Note
- **Note**: "Replied to TG Brief VIP Preview on {{date}}. Response: {{contact.last_message}}. Tagged TG_Brief_Interested + TG_Brief_Subscriber."

#### Step 4A.5 — End (Reply Path)
- **Action**: End workflow
- **Note**: Sean replies personally — no automated follow-up

---

### STEP 4B — NO REPLY PATH

#### Step 4B.1 — Wait 2 Days
- **Action**: Wait
- **Duration**: 2 days (sends on Wednesday or Thursday)

#### Step 4B.2 — Send Soft Follow-Up Email
- **Action**: Send Email
- **Subject**: Did you catch this? 30-year just hit 6.13%
- **From name**: Sean Shallis

**Email body:**

---

Hey {{contact.first_name}},

Quick follow-up — I sent you a market brief on Monday and wanted to make sure it didn't get buried.

The short version:

• 30-year fixed just dropped to **6.13%** — lowest in weeks
• The Fed meets **today/tomorrow** — Powell's language could push rates lower
• If your current rate is above **6.75%**, the refi math is starting to work

I'm sharing this with a small group of my best clients before opening it up. Takes 3 minutes to read, comes once a week, and you can opt out anytime.

**Want in? Just reply "YES" and I'll add you to the weekly list.**

Or if you'd rather not hear about it, no worries at all — just ignore this and I won't follow up again.

— Sean

Sean Shallis | Private Wealth Mortgage Strategist | NMLS #2362814

---

#### Step 4B.3 — Wait for Reply (72 hours)
- **Action**: Wait for Condition
- **Condition**: Contact replies to email
- **Timeout**: 72 hours
- **If reply received**: Go to Step 5A
- **If no reply**: Go to Step 5B

---

### STEP 5A — FOLLOW-UP REPLY PATH

#### Step 5A.1 — Add Tags
- **Action**: Add Tag
- **Tags**: `TG_Brief_Interested`, `TG_Brief_Subscriber`

#### Step 5A.2 — Internal Notification
- **Action**: Send Internal Notification
- **Message**: "TG Brief follow-up reply from {{contact.first_name}} {{contact.last_name}}: {{contact.last_message}}"

#### Step 5A.3 — Add Note
- **Action**: Add Note
- **Note**: "Replied to TG Brief follow-up on {{date}}. Tagged TG_Brief_Subscriber."

#### Step 5A.4 — End

---

### STEP 5B — NO REPLY TO FOLLOW-UP (Silent Exit)

#### Step 5B.1 — Add Note
- **Action**: Add Note
- **Note**: "TG Brief VIP Preview — no reply to initial or follow-up. Do not re-enroll. Review for future manual outreach."

#### Step 5B.2 — End
- **Action**: End workflow
- **Do NOT**: Remove `TG_Brief_VIP_Preview` tag (they stay on the VIP list for future manual sends)
- **Do NOT**: Add to any automated sequence

---

## WORKFLOW SETTINGS

| Setting | Value |
|---------|-------|
| **Workflow name** | TG \| Brief \| VIP Preview Launch |
| **Folder** | Trade Guardian |
| **Trigger** | Tag Added: `TG_Brief_VIP_Preview` |
| **Re-enrollment** | OFF (run once per contact) |
| **Stop on reply** | Only within Wait for Condition steps |
| **Business hours** | All emails send during business hours (8am-6pm ET) |
| **Publish** | YES — publish immediately after build |

---

## VISUAL WORKFLOW MAP

```
[Tag Added: TG_Brief_VIP_Preview]
    |
    v
[Wait until Monday 7:30am ET]
    |
    v
[Send Email: VIP Preview Brief]
    |
    v
[Wait 72h for Reply]
   /              \
REPLY            NO REPLY
  |                  |
  v                  v
[+Tag: Interested] [Wait 2 days]
[+Tag: Subscriber]    |
[Notify Sean]         v
[Add Note]     [Send Follow-Up Email]
[END]                 |
                      v
                [Wait 72h for Reply]
                /              \
            REPLY           NO REPLY
              |                |
              v                v
        [+Tag: Interested]  [Add Note]
        [+Tag: Subscriber]  [END - Silent]
        [Notify Sean]
        [Add Note]
        [END]
```

---

## STEP-BY-STEP MANUAL BUILD (if GHL AI doesn't nail it)

If you need to build this by hand instead of using GHL AI:

1. **Go to**: Automation > Workflows > + Create Workflow
2. **Name it**: `TG | Brief | VIP Preview Launch`
3. **Create folder**: "Trade Guardian" (keep TG workflows separate from RG)
4. **Set trigger**: Click trigger > Tag Added > select `TG_Brief_VIP_Preview`
5. **Disable re-enrollment**: Toggle OFF "Allow re-entry"
6. **Add Step 1**: Wait > Wait Until > Next Monday > 7:30 AM > Eastern Time
7. **Add Step 2**: Send Email > paste subject + body from above > set From Name
8. **Add Step 3**: Wait > Wait for Condition > Reply to Email > Timeout 72h
9. **Branch YES (reply)**:
   - Add Tag: `TG_Brief_Interested`
   - Add Tag: `TG_Brief_Subscriber`
   - Internal Notification > SMS to Sean > include contact name + message
   - Add Note > paste note template
10. **Branch NO (timeout)**:
    - Wait > 2 days
    - Send Email > paste follow-up subject + body
    - Wait > Wait for Condition > Reply > Timeout 72h
    - Branch YES: same as step 9
    - Branch NO: Add Note > "No reply, silent exit" > End
11. **Review**: Click through each step, verify merge fields render
12. **Publish**: Toggle to Published

---

## IMPORTANT NOTES

- **Update rate numbers Monday morning** before 7:30am if data has changed materially. Edit the email step directly in the workflow.
- **Do NOT add an "Add to Workflow" step** inside this workflow — that caused the LeverageRx double-fire bug.
- **29 contacts are already tagged** — they will enter the workflow immediately upon publish. The Wait step holds them until Monday 7:30am.
- **After this launch batch**: Future VIP additions will enter the same workflow when tagged. Keep re-enrollment OFF so nobody gets the VIP intro twice.
- **Track opens/replies** in GHL email stats + log results in `docs/ops/TRADE_GUARDIAN_BRIEF_DAY1_RESULTS.md`
