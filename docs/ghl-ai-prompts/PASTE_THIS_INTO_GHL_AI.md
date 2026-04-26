Build me a workflow called "TG | Brief | VIP Preview Launch"

Folder: Trade Guardian

Trigger: Tag Added — TG_Brief_VIP_Preview
Re-enrollment: OFF (run once per contact)

Step 1 — Wait until next Monday at 7:30 AM Eastern Time.

Step 2 — Send Email
Subject: Something new — you're getting first look
From Name: Sean Shallis

Body:
Hey {{contact.first_name}},

You're one of my best clients, so I wanted to give you a sneak peek at something I've been building.

It's called the Trade Guardian Brief — a short weekly intelligence report that connects mortgage rates to financial markets. The kind of thing I wish someone had given me 20 years ago.

Here's why I think you'll care:

Rates just hit their lowest point in weeks. The 30-year fixed dropped to 6.13%. The 15-year is at 5.63%. ARMs are at 5.25%. Meanwhile, the 10-year Treasury climbed to 4.31% on geopolitical tension — and that divergence won't last.

This Week's Headlines:

Fed meets Wednesday — Powell's press conference at 2pm ET. No rate change expected, but his language will signal whether cuts are closer than the market thinks.

Biggest housing data week of the quarter — Case-Shiller, Housing Starts, Building Permits, and New Home Sales all drop Tuesday-Wednesday.

Five Mag 7 earnings — Amazon, Google, Meta, Microsoft, Apple. If tech disappoints, money rotates into rate-sensitive sectors.

Lock or Float? If you're 30+ days out, float. Inside 21 days, lock. Wednesday is the hinge point.

What This Means For You:

Buying? Float if you have time. This week could push rates lower.
Own a home? If your rate is above 6.75%, the refi math is starting to work. Rosie can run your numbers — just reply.
Investing? Rate-sensitive plays (TLT, KRE, ITB) are the setup. Wednesday afternoon is the trigger.
Know someone who needs this? Forward this email. I'll add them.

I'm sending this to a small group of funded clients first. If it's valuable, I'll keep it coming weekly. If not, just tell me — no hard feelings.

Reply to this email if you want me to watch any of this for your specific situation.

— Sean

Sean Shallis | Private Wealth Mortgage Strategist | NMLS #2362814
This is general market commentary and does not constitute personalized investment or mortgage advice. Past performance does not guarantee future results.

Step 3 — Wait for contact to reply to the email in Step 2. Timeout: 72 hours.

IF REPLY within 72 hours:
Step 4A.1 — Add Tag: TG_Brief_Interested
Step 4A.2 — Add Tag: TG_Brief_Subscriber
Step 4A.3 — Internal Notification to Sean: "TG Brief reply from {{contact.first_name}} {{contact.last_name}}: {{contact.last_message}}"
Step 4A.4 — Add Note: "Replied to TG Brief VIP Preview. Tagged TG_Brief_Interested + TG_Brief_Subscriber."
Step 4A.5 — End workflow.

IF NO REPLY after 72 hours:
Step 4B.1 — Wait 2 days.
Step 4B.2 — Send Email
Subject: Did you catch this? 30-year just hit 6.13%
From Name: Sean Shallis

Body:
Hey {{contact.first_name}},

Quick follow-up — I sent you a market brief on Monday and wanted to make sure it didn't get buried.

The short version:

30-year fixed just dropped to 6.13% — lowest in weeks
The Fed meets today/tomorrow — Powell's language could push rates lower
If your current rate is above 6.75%, the refi math is starting to work

I'm sharing this with a small group of my best clients before opening it up. Takes 3 minutes to read, comes once a week, and you can opt out anytime.

Want in? Just reply "YES" and I'll add you to the weekly list.

Or if you'd rather not hear about it, no worries at all — just ignore this and I won't follow up again.

— Sean

Sean Shallis | Private Wealth Mortgage Strategist | NMLS #2362814

Step 4B.3 — Wait for contact to reply to the email in Step 4B.2. Timeout: 72 hours.

IF REPLY within 72 hours:
Step 5A.1 — Add Tag: TG_Brief_Interested
Step 5A.2 — Add Tag: TG_Brief_Subscriber
Step 5A.3 — Internal Notification to Sean: "TG Brief follow-up reply from {{contact.first_name}} {{contact.last_name}}: {{contact.last_message}}"
Step 5A.4 — Add Note: "Replied to TG Brief follow-up. Tagged TG_Brief_Subscriber."
Step 5A.5 — End workflow.

IF NO REPLY after 72 hours:
Step 5B.1 — Add Note: "TG Brief VIP Preview — no reply to initial or follow-up. Do not re-enroll. Review for future manual outreach."
Step 5B.2 — End workflow.

Settings: All emails business hours only 8am-6pm ET. No Add to Workflow steps. Publish immediately.
