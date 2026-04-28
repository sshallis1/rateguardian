# Google Reviews Campaign — Operational Playbook

## Goal
30+ Google reviews, 4.8+ stars within 90 days. Dominate local pack for "physician mortgage NJ", "mortgage lender Chatham NJ".

---

## Step 1: Claim Google Business Profile

### Action (Sean — 5 minutes)
1. Go to https://business.google.com
2. Sign in with your Google account
3. Search for "Sean Shallis U.S. Bank Mortgage"
4. If it exists → Click "Claim this business" → verify via phone/postcard
5. If not found → Click "Add your business" and enter:

| Field | Value |
|-------|-------|
| Business name | Sean Shallis — U.S. Bank Mortgage |
| Category (primary) | Mortgage Lender |
| Category (secondary) | Mortgage Broker |
| Address | 1 Main St, Suite 203, Chatham, NJ 07928 |
| Phone | (973) 457-2278 |
| Website | https://seanshallis.com |
| Hours | Mon-Fri 8am-6pm, Sat by appointment |
| Description | Private Wealth Mortgage Strategist specializing in physician loans, VA loans, jumbo/portfolio lending, and construction-to-permanent financing. 30+ years, $1B+ in transactions. Free AI rate monitoring with Rosie. NMLS #2362814. |
| Service areas | Add: Chatham, NJ; Morristown, NJ; Summit, NJ; New York City; Nationwide |

6. After verification, get your **review link**:
   - Go to your GBP dashboard → "Get more reviews" → Copy the short link
   - It will look like: `https://g.page/r/XXXXXXXXX/review`
   - Replace the placeholder in `/reviews` page and in GHL templates below

---

## Step 2: Review Request System (GHL Workflow)

### Workflow Name: `RV | Post-Funding Review Request`

### Trigger
- Tag added: `loan_funded`
- Wait: 7 days

### Branch A: SMS First (Day 7)

**SMS Message:**
```
Hey {{contact.first_name}} — Sean here! Congrats again on closing 🎉

Quick favor that helps other physicians/families find me: would you mind dropping a 30-second Google review?

{{GOOGLE_REVIEW_LINK}}

Thanks so much. Rosie and I are watching your rate — you're covered.

- Sean
```

**Wait:** 3 days

**If no review detected → Email follow-up (Day 10):**

Subject: `Quick favor, {{contact.first_name}}?`

```
Hi {{contact.first_name}},

Hope you're settling in! I wanted to follow up on my text — if you have 30 seconds, a Google review would mean a lot.

Most of my physician clients find me through word-of-mouth and reviews. Yours helps the next doctor in your shoes find the right person.

Here's the direct link (opens the review box): {{GOOGLE_REVIEW_LINK}}

If you'd prefer Zillow: https://www.zillow.com/lender-profile/SeanShallisUSBank/

Thanks again for trusting me with your mortgage. Rosie's watching — you'll hear from me if anything moves.

Best,
Sean

P.S. — If anything about the process could have been better, I'd rather hear it directly. Reply to this email anytime.
```

**Tag after send:** `review_requested`

### Branch B: If already reviewed (Birdeye exists)
- Skip SMS
- Send email asking them to copy their Birdeye review to Google

---

## Step 3: Seed Campaign — Existing Happy Clients

### Target List
- 25 Birdeye reviewers (already love you)
- Any recent funded clients not yet asked

### Seed SMS (Send manually or via GHL broadcast):

```
Hey {{contact.first_name}}, Sean Shallis here. You left me a kind review a while back — thank you! Would you mind copying it to Google? It really helps physicians find me.

Direct link (30 sec): {{GOOGLE_REVIEW_LINK}}

Appreciate you! — Sean
```

### Seed Email (for those who prefer email):

Subject: `A small favor that helps other doctors`

```
Hi {{contact.first_name}},

You were kind enough to leave me a review after we worked together — and I'm genuinely grateful.

I'm building out my Google presence so more physicians can find me (vs. getting routed through marketplace lead farms). If you have 30 seconds, would you mind leaving a quick Google review?

{{GOOGLE_REVIEW_LINK}}

Even a sentence or two makes a huge difference. And if your review mentioned something specific (the physician loan, the timeline, Rosie, etc.) — that's gold for someone searching.

Thank you again for trusting me. Rosie's still watching your rate.

Best,
Sean
```

---

## Response Templates

### Reply to 5-star review:
```
Thank you, {{name}}! It was a pleasure working with you. Rosie and I are still watching your rate — anytime you need anything, you know where to find me. — Sean
```

### Reply to 4-star review:
```
Thanks for the honest feedback, {{name}}. I appreciate you trusting me with your mortgage. If there's anything I can improve for next time, my line is always open: (973) 457-2278. — Sean
```

### Reply to 3-star or below:
```
{{name}}, I appreciate you sharing this. I take every client experience seriously. I'd love to connect directly and make things right — please call me at (973) 457-2278 or reply here. — Sean
```

---

## Tracking

| Metric | Target | Timeline |
|--------|--------|----------|
| Google reviews (total) | 30+ | 90 days |
| Average rating | 4.8+ | Maintain |
| Reviews/month (ongoing) | 2-3 | After initial seed |
| Response rate | 100% | Within 24 hours |

---

## Tags for GHL

| Tag | Purpose |
|-----|---------|
| `loan_funded` | Triggers review request (7-day delay) |
| `review_requested` | Sent the ask — don't double-send |
| `review_received_google` | Confirmed Google review left |
| `review_received_zillow` | Confirmed Zillow review left |
| `review_seed_sent` | Birdeye → Google migration ask sent |

---

## Files
- Review page: https://seanshallis.com/reviews
- GHL workflow name: `RV | Post-Funding Review Request`
- This doc: `docs/ops/GOOGLE_REVIEWS_CAMPAIGN.md`
