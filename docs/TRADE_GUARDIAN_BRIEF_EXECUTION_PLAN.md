# Trade Guardian Brief — Execution Plan

> Created: 2026-04-26
> Status: Ready for Sean's review
> Phase: Pre-launch (content product, not software product)

---

## 1. Product Summary

The **Trade Guardian Private Client Market + Rate Brief** is a daily/weekly intelligence email combining mortgage rate analysis with macro market signals. It's the first monetizable surface for Trade Guardian — no dashboard, no API, no code changes required.

**What it is**: A curated daily brief that connects mortgage rates to market signals, written from Sean's CIO-level perspective. It positions Sean as the person who sees BOTH the rate world and the market world — and can translate one to the other.

**What it is NOT**: A trading platform, a stock-picking service, or a registered investment advisory product. This is content under the publisher exclusion.

**Revenue model**:
- Free tier: Weekly digest (lead gen + authority builder)
- Paid tier: Daily brief with deeper analysis ($29-49/mo or $299-499/yr)
- Upsell: 1-on-1 strategy calls, mortgage origination from engaged readers

---

## 2. Target Audience

| Segment | Why They Care | How They Find It |
|---------|---------------|------------------|
| **Existing Rate Guardian contacts** | Already trust Sean on rates, want the bigger picture | GHL email to existing list |
| **Physician clients / prospects** | High earners who invest AND have mortgages | Cross-sell from RG intake |
| **Referral partners** (realtors, financial advisors) | Want to sound smart to their clients | Direct outreach, LinkedIn |
| **Sean's personal network** | Know him, trust him, will share | Direct send + LinkedIn |
| **Conference contacts (ACCOM, future events)** | Met Sean, want ongoing value | Post-event nurture sequence |

**Primary persona**: High-earning professional (physician, executive, business owner) who has a mortgage AND invests. They don't have time to watch rates AND markets. Sean does both.

---

## 3. Distribution Plan

### Week 1-2: Soft Launch (Free)
- Send to existing GHL contacts with `RG_` tags (warm list)
- Post to LinkedIn (Sean's profile)
- Share via personal network

### Week 3-4: Grow the List
- Add opt-in to seanshallis.com (waitlist form already exists on `/trade-guardian`)
- Add brief signup CTA to Ask Rosie chat flow
- Cross-promote in Rate Guardian email sequences

### Month 2: Monetize
- Introduce paid daily tier
- Free tier stays as weekly digest
- Paid tier gets: daily brief, deeper analysis, Sean's personal watchlist, priority strategy calls

### Channels
| Channel | Format | Frequency |
|---------|--------|-----------|
| Email (GHL) | Full brief | Daily (paid) / Weekly (free) |
| SMS (GHL) | 2-3 sentence summary + link | Daily (paid only) |
| LinkedIn | Condensed version | 2-3x/week |
| Podcast (Loan Doctor) | Weekly brief review | Weekly |

---

## 4. Seven-Day Launch Checklist

| Day | Task | Owner | Status |
|-----|------|-------|--------|
| 1 | Sean reviews this execution plan + template | Sean | [ ] |
| 2 | Sean writes first brief using template (Brief #001) | Sean | [ ] |
| 3 | Set up GHL tags (TG_Brief_Interested, TG_Brief_Subscriber, TG_Brief_Unsubscribed) | Sean/Claude | [ ] |
| 3 | Create GHL SmartList for brief subscribers | Sean/Claude | [ ] |
| 4 | Load email template into GHL campaign | Sean | [ ] |
| 4 | Write + schedule first email send to warm list | Sean | [ ] |
| 5 | Post LinkedIn version | Sean | [ ] |
| 5 | Send SMS teaser to top 20 contacts | Sean | [ ] |
| 6 | Review engagement (opens, replies, clicks) | Sean | [ ] |
| 7 | Write Brief #002, iterate on format based on feedback | Sean | [ ] |

---

## 5. What NOT to Build

- No dashboard or portal pages
- No new API routes
- No new database tables
- No data feed integrations (Polygon, FRED, etc.) — that's Phase 1 of the full Trade Guardian build
- No automated brief generation (Sean writes these manually at first)
- No paid subscription billing (manual tracking only for now)
- No changes to the live site or Rate Guardian workflows
- No SEC/FINRA registration (publisher exclusion covers general commentary)

**The brief is a CONTENT product.** The tech product comes later, informed by what readers actually want.

---

## 6. Required Assets

### Already Done (this sprint)
- [x] Brief template (`docs/templates/TRADE_GUARDIAN_DAILY_BRIEF_TEMPLATE.md`)
- [x] First draft brief (`docs/briefs/TRADE_GUARDIAN_DAILY_BRIEF_001.md`)
- [x] Distribution copy — email, SMS, LinkedIn, referral partner (`docs/marketing/TRADE_GUARDIAN_BRIEF_DISTRIBUTION_COPY.md`)
- [x] GHL task checklist (`docs/ops/GHL_TRADE_GUARDIAN_BRIEF_CHECKLIST.md`)

### Sean Needs to Create
- [ ] First real brief with live market data (replace placeholders in Brief #001)
- [ ] GHL email template (use the email copy from distribution doc)
- [ ] LinkedIn profile update mentioning Trade Guardian Brief
- [ ] Headshot or branded image for brief header (optional — can reuse existing)

### Future (Not Now)
- Landing page on seanshallis.com (update `/trade-guardian` from coming-soon to brief signup)
- Automated brief generation via Claude + data feeds
- Paid subscription billing via Stripe

---

## 7. Open Questions

| # | Question | Impact | Default If No Answer |
|---|----------|--------|---------------------|
| 1 | Daily or 3x/week to start? | Cadence sets expectations | Start 3x/week (M/W/F), go daily when it's dialed in |
| 2 | Free-only at launch, or paid from day 1? | Revenue vs. list growth | Free for 2 weeks, then introduce paid tier |
| 3 | Should the brief mention specific tickers? | Regulatory compliance | Yes, but as "watching" not "recommending" — publisher exclusion covers this |
| 4 | Should referral partners get a different version? | Content strategy | Same brief, different CTA (refer clients vs. act on it yourself) |
| 5 | Does Sean want to record a 2-min audio version? | Differentiation | Not for launch. Add later if demand exists |
| 6 | Should Ask Rosie mention the brief in chat? | Cross-sell | Yes — add a soft mention after rate check completion |
| 7 | Compliance attorney review needed before launch? | Legal risk | Low risk under publisher exclusion, but $500 consult is worth it |

---

## Regulatory Note

This brief operates under the **publisher exclusion** (Investment Advisers Act of 1940, Section 202(a)(11)(D)):
- General commentary on markets and rates — NOT personalized investment advice
- No "buy this" or "sell this" directed at specific portfolios
- Use "watching" / "considering" / "monitoring" language, not "recommending"
- Add standard disclaimer to every brief
- If/when Sean wants to personalize (e.g., "based on YOUR portfolio"), that requires RIA registration (Series 65 + SEC filing, ~$15-25K)

**Recommended**: $500-1K compliance attorney consult before first paid subscriber.
