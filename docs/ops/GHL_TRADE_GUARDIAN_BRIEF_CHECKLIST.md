# GHL Setup Checklist — Trade Guardian Brief

> Execute in GHL. Do NOT automate paid subscription billing yet.
> All Trade Guardian tags use `TG_` prefix (not `RG_`).

---

## Tags to Create

- [ ] `TG_Brief_Interested` — Contact replied or indicated interest in the brief
- [ ] `TG_Brief_Subscriber` — Actively receiving the free weekly brief
- [ ] `TG_Brief_Unsubscribed` — Opted out of the brief
- [ ] `TG_Brief_Daily_Interested` — Replied "DAILY" or expressed interest in paid tier
- [ ] `TG_Brief_Daily_Subscriber` — Paying daily subscriber (manual tracking for now)
- [ ] `TG_Brief_Referral_Partner` — Referral partner receiving the partner version

---

## SmartLists to Create

### TG Brief — Active Subscribers
- **Filter**: Has tag `TG_Brief_Subscriber` AND does NOT have tag `TG_Brief_Unsubscribed`
- **Use**: Weekly brief email send list

### TG Brief — Daily Interested
- **Filter**: Has tag `TG_Brief_Daily_Interested`
- **Use**: Outreach list when daily tier launches

### TG Brief — Referral Partners
- **Filter**: Has tag `TG_Brief_Referral_Partner`
- **Use**: Partner version distribution

### TG Brief — Engaged (Opened 2+ Issues)
- **Filter**: Has tag `TG_Brief_Subscriber` AND email open count >= 2 on TG Brief emails
- **Use**: Candidates for paid tier upsell

---

## Email Campaign Setup

- [ ] Create email template: **TG Brief — Weekly Issue**
  - Use copy from `docs/marketing/TRADE_GUARDIAN_BRIEF_DISTRIBUTION_COPY.md` (Section 2)
  - Header: "Trade Guardian Brief" with date
  - Footer: Standard disclaimer + unsubscribe link
  - Unsubscribe action: Remove `TG_Brief_Subscriber`, add `TG_Brief_Unsubscribed`

- [ ] Create email template: **TG Brief — Welcome**
  - Sent when `TG_Brief_Subscriber` tag is added
  - Brief intro: what to expect, frequency, how to reply
  - Include link to first issue

- [ ] Create email template: **TG Brief — Referral Partner Version**
  - Same content, different CTA (refer clients, not personal action)
  - Use copy from Distribution doc Section 5

---

## SMS Drafts

- [ ] Create SMS template: **TG Brief — Weekly Delivery**
  - Template: `This week's Trade Guardian Brief is live. Rates [DIRECTION], 10Y at [YIELD], and [KEY SIGNAL]. 3-min read: [LINK]`
  - Send to: `TG_Brief_Daily_Subscriber` only (daily tier perk)

- [ ] Create SMS template: **TG Brief — Opt-In**
  - Template: `Hey [FIRST NAME] — I'm sending a free weekly brief that connects mortgage rates to market signals. Want in? Reply YES. — Sean`
  - Manual send only — do NOT automate

---

## Manual Reply Tracking

When a contact replies to a brief:

1. **"YES" / "I want in" / "Add me"**
   - Add tag: `TG_Brief_Subscriber`
   - Add note: "Opted into TG Brief on [DATE]"

2. **"DAILY" / "I'm in" (paid interest)**
   - Add tag: `TG_Brief_Daily_Interested`
   - Add note: "Interested in daily TG Brief on [DATE]"
   - Reply personally (do NOT automate paid onboarding)

3. **Unsubscribe / "Stop" / "Remove me"**
   - Remove tag: `TG_Brief_Subscriber`
   - Add tag: `TG_Brief_Unsubscribed`
   - Add note: "Unsubscribed from TG Brief on [DATE]"

4. **Question / engagement reply**
   - Add tag: `TG_Brief_Interested` (if not already tagged)
   - Add note: "Engaged with TG Brief — [summary of question]"
   - Reply personally

---

## Custom Fields (Optional — Add If Useful)

- [ ] `TG_Brief_Interest_Level` — Text field: Hot / Warm / Cold
- [ ] `TG_Brief_Start_Date` — Date field: When they subscribed
- [ ] `TG_Brief_Paid_Start_Date` — Date field: When they started paying (manual entry)

---

## What NOT to Do

- Do NOT create automated workflows for paid subscription billing
- Do NOT create automated reply sequences (all replies are manual for now)
- Do NOT add TG tags to RG workflows (keep domains separate)
- Do NOT trigger any RG automation from TG tags
- Do NOT send the brief to contacts with `TG_Brief_Unsubscribed` tag

---

## Tagging Convention Reference

| Prefix | Domain | Example |
|--------|--------|---------|
| `RG_` | Rate Guardian | `RG_Manual_Owned`, `RG_Rosie_Status` |
| `TG_` | Trade Guardian | `TG_Brief_Subscriber`, `TG_Brief_Daily_Interested` |
| `PG_` | Project Guardian (future) | Reserved |

Keep domains clean. No cross-contamination.
