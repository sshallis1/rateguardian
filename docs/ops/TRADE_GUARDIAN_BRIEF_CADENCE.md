# Trade Guardian Brief — Publishing Cadence

> Master schedule for all TG Brief communications.
> Updated: 2026-04-27

---

## Weekly Schedule

| Day | Type | Send Time | Content |
|-----|------|-----------|---------|
| **Monday** | **Week Ahead Brief** | 7:30am ET | Full brief: rates, markets, 5 signals, opportunity radar, client action notes. Refreshed with live data at 7:00am. |
| **Tuesday** | Market Day | Mid-day ONLY if volatility trigger hit | Flash update only (see trigger rules below) |
| **Wednesday** | Market Day | Mid-day ONLY if volatility trigger hit | Flash update only |
| **Thursday** | Market Day | Mid-day ONLY if volatility trigger hit | Flash update only |
| **Friday** | Market Day | Mid-day ONLY if volatility trigger hit | Flash update only |
| **Saturday** | **Weekly Recap** | 9:00am ET | "This Week in 3 Minutes" — what happened, what mattered, what changed. Scorecard format. |
| **Sunday** | **Week Preview** | 7:00pm ET | "What We're Watching This Week" — key events, data releases, earnings, thesis for the week. Sets the stage for Monday's full brief. |

### Market Holidays
- **Holiday (market closed)**: Send "What We're Watching" preview (same as Sunday format) at 7:00pm ET the night before market reopens.
- **Half-day sessions**: Treat as normal market day but no mid-day flash (low liquidity = noise).

---

## Saturday: Weekly Recap Format

**Subject line rotation:**
- "This week in 3 minutes"
- "What rates and markets did this week"
- "Your weekly scorecard"

**Structure:**

```
# Trade Guardian Weekly Recap
## Week of [DATE RANGE]

## The Scoreboard
| Metric | Monday Open | Friday Close | Change | Verdict |
|--------|-------------|--------------|--------|---------|
| 30-Year Fixed | X.XX% | X.XX% | +/- bps | Better / Worse / Flat |
| 10-Year Treasury | X.XX% | X.XX% | +/- bps | |
| S&P 500 | X,XXX | X,XXX | +/- % | |
| VIX | XX.X | XX.X | +/- | Calmer / More nervous |

## What Happened (3-5 bullets)
- [Biggest rate move and why]
- [Key market event]
- [Housing data takeaway]
- [What the Fed said/did]
- [Wildcard]

## What It Meant For You
- Buyers: [1 sentence]
- Homeowners: [1 sentence]
- Investors: [1 sentence]

## My Call vs Reality
[Did Monday's thesis play out? Be honest. Builds credibility.]

## The Bottom Line
[1 sentence takeaway for the week]
```

---

## Sunday: Week Preview Format

**Subject line rotation:**
- "What I'm watching this week"
- "5 things that matter this week"
- "Your Monday morning head start"

**Structure:**

```
# What We're Watching This Week
## Week of [DATE RANGE]

## The Setup
[3-4 sentences. What's the macro backdrop heading into the week?]

## 5 Things That Matter
1. [Event/data + date + why it matters for rates and markets]
2. [Event/data + date + why it matters]
3. [Event/data + date + why it matters]
4. [Event/data + date + why it matters]
5. [Event/data + date + why it matters]

## My Bias Going In
- Rates: [Expecting higher / lower / flat — and why]
- Markets: [Risk-on / risk-off / mixed — and why]
- Lock/Float: [Preliminary lean before Monday data]

## What I'm Telling Clients
[1-2 sentences. The dinner-party version.]
```

---

## Weekly NLP Offer (Once Per Week)

### Purpose
Soft conversion touchpoint. Not a hard sell. Use NLP framing to present value, create curiosity, and invite action.

### When
- **Rotate day**: Tuesday, Wednesday, or Thursday (never Monday/Saturday/Sunday — those are pure value)
- **Frequency**: Exactly once per week
- **Channel**: Email only (not SMS — SMS stays pure signal)

### Offer Rotation (4-week cycle)

**Week 1 — The Question**
> P.S. — Quick question: if I could show you exactly how much you'd save by refinancing at today's rate vs. waiting 6 months, would that be useful? Just reply "SHOW ME" and I'll run the numbers for you personally. Takes me 5 minutes.

**Week 2 — The Social Proof**
> P.S. — One of my clients replied to last week's brief and asked me to run their numbers. Turns out they were overpaying $347/month and didn't know it. If you're curious whether the same is true for you, reply "CHECK MINE" and I'll take a look.

**Week 3 — The Future Pace**
> P.S. — Imagine opening your email 6 months from now and seeing that rates dropped to 5.5%. Would you rather be the person who locked in early and saved $40K+ over the life of your loan, or the person who waited and missed the window? If you want me to set a rate target alert for you — so you know the moment your number hits — reply "WATCH IT."

**Week 4 — The Direct Offer**
> P.S. — A few of you have asked if I'd do this daily instead of weekly. I'm testing a private daily version with deeper analysis, my personal watchlist, and priority strategy calls. If that's interesting, reply "DAILY" and I'll let you know when it's ready. The weekly brief stays free regardless.

### Tagging on Reply
| Reply keyword | Tag to apply |
|---------------|-------------|
| "SHOW ME" | `TG_Brief_Interested` + note "wants refi analysis" |
| "CHECK MINE" | `TG_Brief_Interested` + note "wants rate check" |
| "WATCH IT" | `TG_Brief_Interested` + note "wants rate alert" |
| "DAILY" | `TG_Brief_Daily_Interested` |

### Rules
- **Always a P.S.** — never the main content. Value first, offer second.
- **Never in Saturday recap or Sunday preview** — those are pure trust-building.
- **Never in Monday brief** — that's the anchor content.
- **Rotate the CTA keyword** — each week has its own so you can track which framing converts.
- **Reply personally to every response** — this is relationship-building, not automation.

---

## Mid-Day Volatility Flash — Trigger Rules

| Trigger | Threshold | Action |
|---------|-----------|--------|
| 10-Year Treasury intraday move | +/- 8 bps | Send flash |
| Fed surprise (unscheduled statement) | Any | Send flash |
| 30-Year Fixed same-day reprice | +/- 15 bps | Send flash |
| Major geopolitical event | War, sanctions, crisis | Judgment call |
| VIX spike | Above 25 (from ~19 baseline) | Send flash |

- **Max 1 flash per day**
- **SMS + short email** to `TG_Brief_Subscriber` + `TG_Brief_VIP_Preview`
- **Manual send only** — Sean reviews before sending
- **Log every flash** in Day Results tracker

---

## Daily Pre-Send Routine (7:00-7:30am ET, Market Days Only)

1. Check 10-year Treasury overnight move
2. Check mortgage rates (MND or Bankrate)
3. Check S&P futures
4. Check oil/gold if geopolitics are active
5. Update any stale numbers in the day's send
6. If nothing material changed, send as-is
7. **Send by 7:30am ET**
