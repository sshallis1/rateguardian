# ACCOM Conference — Unified System Architecture

**Owner**: Sean Shallis
**Systems**: Claude Code (Vercel/Next.js) + GHL (CRM/workflows) + Copilot (content/collateral)
**Conference**: ACCOM 2026, Saturday April 19

---

## System Map

```
CONFERENCE BOOTH
├── QR Card (print, 4-up on card stock)
│   └── Scans to: myrateguardian.com → /event/accom/scan
│
├── Pitch Book (Copilot-produced)
│   └── KPMG Partner Program deck
│   └── U.S. Bank physician loan materials
│   └── Rosie Rate Guardian overview
│
└── Booth Conversation
    └── Sean hands card → prospect scans QR
    └── "Let Rosie check your rate — free"

QR SCAN FLOW
├── /event/accom/scan (Vercel — LIVE)
│   ├── Form: First, Last, Email, Phone
│   ├── Submit → /api/rg/intake/accom
│   │   ├── Creates GHL contact
│   │   ├── Tags: rg_source_accom, rg_qr_event, rg_doctor_optin, rg_stage_optimizer
│   │   ├── Sets: RG_Lead_Source = ACCOM_Conference, RG_Rosie_Path = Monitoring
│   │   └── Triggers routing agent webhook
│   └── Thank You page:
│       ├── "You're on Rosie's Watch List"
│       ├── Podcast episode link (Loan Doctor)
│       ├── Free discovery call booking
│       └── U.S. Bank personal page link
│
GHL AUTOMATION (post-scan)
├── WF: ACCOM Lead Capture (trigger: rg_source_accom)
│   ├── Manual Owned gate
│   ├── Add to pipeline
│   ├── Rosie SMS intro (2 min delay)
│   ├── Authority email (5 min delay)
│   └── Tag: rg_accom_nurtured
│
├── WF: ACCOM Segment Follow-Up (trigger: rg_accom_nurtured)
│   └── Day 1: segment-specific SMS
│
├── WF: ACCOM 7-Day Nurture (trigger: rg_accom_nurtured)
│   ├── Day 2: "3 blind spots" email
│   ├── Day 4: Podcast value SMS
│   └── Day 7: Final CTA email
│
└── LONG-TERM in GHL
    ├── Rate Guardian monitoring (ongoing)
    ├── Newsletter (weekly)
    └── Re-engagement triggers (rate changes, life events)
```

---

## Two-Level Value Proposition

### Level 1: Individual Physician
**Hook**: "Is your mortgage rate costing you money?"
**Offer**: Free rate monitoring by Rosie
**Proof points**:
- Loans up to $3M, 100% financing, no PMI
- Student loan-friendly underwriting
- Residency/fellowship eligible
- Married to a physician — understands firsthand

### Level 2: Practice / Health System / Hospital
**Hook**: "We partner with medical organizations to provide homeownership education as an employee benefit — at zero cost to you."
**Offer**: KPMG-style Homeownership & Wealth Advantage Program
**Proof points**:
- Staff-wide financial literacy workshops
- Relocation mortgage support for new hires
- Pre-approval tools for HR teams
- "Know Before You Go" onboarding sessions
- Designed for CMO through front desk staff
- Already deployed with Kaiser Permanente hires

### Level 3: Vendor / Recruiter / Partner
**Hook**: "Partnering with Sean increases YOUR value to your clients."
**Offer**: Co-branded education, priority referral scheduling, Rosie for their network
**Proof points**:
- Candidates get better relocation packages
- Reciprocal referral relationship
- Quarterly market intelligence briefings

---

## What Copilot Produces vs What's Already Built

| Deliverable | Copilot | Claude Code | Status |
|---|---|---|---|
| CTA copy | ✅ Refining | ✅ Live on /event/accom/scan | Merge best of both |
| Landing page | ✅ Outline | ✅ Built + deployed | Done — update copy as needed |
| Thank-you page | ✅ Content | ✅ Built + deployed | Add USB personal page link |
| Salesforce exports | ✅ CSV templates | ❌ Not needed — GHL handles | GHL IS the CRM |
| Follow-up emails | ✅ Email #1 | ✅ Full 7-day sequence spec'd | Merge Copilot's tone + our structure |
| Data schemas | ✅ SF field mapping | ✅ GHL field map (80+ fields) | GHL field map is source of truth |
| Print cards | ❌ | ✅ Built at /event/accom/cards | Done |
| Pitch book | ✅ KPMG deck | ❌ | Copilot owns this |

---

## CRM Integration Note

**We use GHL, not Salesforce.** The Copilot prompt references Salesforce-ready exports — ignore that path. All contacts land directly in GHL via API with:
- Full tag taxonomy (rg_source_accom, stage tags, persona tags)
- Custom fields populated (lead source, rosie path, persona type)
- Pipeline placement (Consumer Purchase/Refinance → New or Re Engage)
- Automated routing via Claude AI agent
- Automated nurture via GHL workflows

If USB compliance requires a Salesforce mirror, we can build a GHL → Salesforce sync later. For ACCOM, GHL is the single source of truth.

---

## Domain Routing for ACCOM

| Domain | Destination | Use |
|---|---|---|
| myrateguardian.com | /event/accom/scan | QR cards — primary |
| rate-guardian.com | /rate-guardian | General RG landing |
| loan-doctor.com | Podcast / physician content | Cards back side |
| seanshallis.com | Main hub | Authority reference |

---

## Print Collateral

### QR CTA Card (4-up, 8.5x11 card stock)
- **Front**: Navy, Rosie logo, "Is Your Mortgage Rate Costing You Money?", QR code, "SCAN · CHECK · MONITOR", 100/0 Guarantee
- **Back**: Cream, "What Rosie Does For You" (4 bullets), "If There's an Opportunity" section, Sean's info + PHYSICIAN LENDING SPECIALIST badge
- **Print at**: /event/accom/cards → Ctrl+P → Save as PDF
- **QR points to**: myrateguardian.com (→ /event/accom/scan)

### Pitch Book (Copilot-produced)
- KPMG Partner Program overview
- U.S. Bank physician loan one-pager
- Rosie Rate Guardian overview
- Testimonials
- Authority page

---

*Unified architecture doc — April 15, 2026*
*Claude Code + Copilot collaboration*
