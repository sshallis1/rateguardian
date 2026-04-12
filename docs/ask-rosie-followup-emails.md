# Ask Rosie Follow-Up — 4-Email Drip Sequence

**Workflow**: RG | Egress | Ask Rosie Flow Follow-Up
**Trigger**: Tag `rg_landing_askrosie`
**Cadence**: Day 0 (immediate), Day 2, Day 5, Day 10
**Audience**: Anyone who chatted with Rosie on the website and submitted their info
**Tone**: Warm, personal, Rosie-forward. Not salesy. The value sells itself.
**From**: Sean Shallis (sean.shallis@usbank.com)

---

## Email 1 — Immediate (Day 0)

**Subject:** Rosie's got her eyes on your rate

**Body:**

{{contact.first_name}},

You just met Rosie — and she's already doing what she does best: watching.

Here's what happens next:

1. Rosie monitors rates that apply to your situation — multiple times a day
2. If she spots a savings opportunity, she flags it immediately
3. I review it personally and reach out only when there's something worth your time

No spam. No "just checking in." Just a guardian doing her job.

If you have questions in the meantime, reply to this email or call me directly: (973) 457-2278. I pick up.

Sean Shallis
Private Wealth Mortgage Strategist | U.S. Bank
NMLS #2362814

P.S. Rosie was named after my dog — a breed that's been guarding flocks for centuries. Watching over people isn't a feature we bolted on. It's in her nature.

---

## Email 2 — Day 2

**Subject:** The one thing most homeowners can't see

**Body:**

{{contact.first_name}},

Here's something I've learned in 30 years of mortgage strategy:

Most people can't see through the fog.

Rates, fees, credits, lender margins, ARM resets, break-even points — it's a wall of noise designed to make you default to "just give me the 30-year fixed."

That default costs families thousands. Sometimes tens of thousands.

Rosie cuts through the fog. She watches the numbers so you can see the opportunity clearly — what I call **Clarity**.

And clarity changes everything. When you can see what's actually happening with rates, you stop guessing and start making moves that build wealth.

That's what Rosie and I do together. She watches. I strategize. You save.

If you want to talk through your specific situation, grab 15 minutes with me:
[Book a Call with Sean →]

Sean Shallis
Private Wealth Mortgage Strategist | U.S. Bank

---

## Email 3 — Day 5

**Subject:** Why I tell my clients to take the ARM

**Body:**

{{contact.first_name}},

I'm about to say something most mortgage professionals won't:

**The lowest rate is almost always a short-term ARM.**

I know — your gut just tightened. 2008. Adjustable rates. Bad memories.

But here's what's different now:

When Rosie is monitoring your rate multiple times a day, and I can refinance you in 30 days when the market shifts — the ARM becomes the smart play. Not the risky one.

Think about it: the only reason ARMs were dangerous is because nobody was watching. You locked in, your lender disappeared, and you were on your own when the reset hit.

With Rate Guardian, you're never on your own. Rosie watches. I act. You save.

**The safest strategy isn't the longest lock — it's the one that's watched.**

Want to see what an ARM strategy could save you? Reply to this email with your current rate and loan amount. I'll run the numbers personally.

Sean Shallis
Private Wealth Mortgage Strategist | U.S. Bank

---

## Email 4 — Day 10

**Subject:** Still here. Still watching.

**Body:**

{{contact.first_name}},

Quick note — Rosie hasn't stopped.

Since you first chatted with her, she's been checking rates that apply to your profile. That's what she does. No breaks, no vacations, no "I'll circle back Monday."

Most loan officers disappear after closing. I'm the one who shows up before, during, and after — because the mortgage isn't the finish line. It's the starting line for building wealth.

Here's my direct line: **(973) 457-2278**

Whether you're ready to move now or just want someone watching the numbers for when the right moment hits — Rosie and I aren't going anywhere.

Sean Shallis
Private Wealth Mortgage Strategist | U.S. Bank
NMLS #2362814

P.S. Rate Guardian monitoring is free. Forever. No strings. If that sounds too good to be true, call me and I'll explain why it's the smartest business decision I've ever made.

---

## GHL Implementation Notes

- **Workflow trigger**: Tag `rg_landing_askrosie` added
- **Gate**: Must NOT have `RG_Manual_Owned` tag (standard kill-switch)
- **Stop on reply**: Yes — if they reply to any email, stop the drip and notify Sean
- **Personalization tokens**: `{{contact.first_name}}` (standard GHL merge field)
- **CTA links**: Use GHL tracking links with UTM: `?utm_source=rosie_drip&utm_medium=email&utm_campaign=askrosie_followup&utm_content=email_{1-4}`
- **Book a Call link**: Sean's Calendly or GHL booking page (needs URL from Sean)
