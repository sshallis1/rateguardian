# GHL Master Tag Registry

> Single source of truth for ALL tags across the Guardian ecosystem.
> Updated: 2026-04-27

---

## Naming Convention

| Prefix | Domain | Owner |
|--------|--------|-------|
| `RG_` | Rate Guardian | Rosie Engine + C2S |
| `TG_` | Trade Guardian | Trade Guardian Brief |
| `PG_` | Project Guardian (future) | Reserved |
| `HG_` | Health Guardian (future) | Reserved |
| `WG_` | Wealth Guardian (future) | Reserved |

**Rule**: No cross-contamination. RG workflows NEVER read TG tags. TG workflows NEVER write RG tags.

---

## Rate Guardian (`RG_`) Tags

### Lifecycle / Status
| Tag | Purpose | Set By |
|-----|---------|--------|
| `rg_lead` | Master RG lead identifier | Intake routes |
| `rg_new_lead` | Fresh lead, not yet routed | Intake routes |
| `rg_hot` | Hot priority | Router agent |
| `rg_warm` | Warm priority | Router agent |
| `rg_cold` | Cold priority | Router agent |
| `RG_Manual_Owned` | **Kill switch** — no automation touches this contact | Disposition endpoint |
| `rg_opted_out` | Contact opted out of all outbound | Disposition endpoint |

### Source Tags
| Tag | Purpose | Set By |
|-----|---------|--------|
| `rg_source_leveragerx` | Lead from LeverageRx portal | LeverageRx intake |
| `rg_source_accom` | Lead from ACCOM conference | ACCOM intake |
| `rg_source_askrosie` | Lead from Ask Rosie chat | Ask Rosie intake |
| `rg_source_10x_formula` | Lead from 10X Formula download | 10X lead magnet |
| `rg_source_referral` | Referral lead | Manual / GHL |
| `rg_source_website` | Website organic lead | Manual / GHL |

### Persona Tags
| Tag | Purpose | Set By |
|-----|---------|--------|
| `rg_persona_physician` | Physician borrower | Router agent |
| `rg_persona_consumer` | General consumer | Router agent |
| `rg_persona_investor` | Real estate investor | Router agent |
| `rg_persona_referral_partner` | Referral partner (realtor, CPA, FA) | Router agent |

### Monitoring
| Tag | Purpose | Set By |
|-----|---------|--------|
| `rate_guardian_monitoring` | Active rate monitoring by Rosie | Engine / Manual |
| `rg_leveragerx_active` | Active LeverageRx lead in pipeline | LeverageRx workflow |

### Workflow Tags
| Tag | Purpose | Set By |
|-----|---------|--------|
| `rg_accom_nurtured` | ACCOM lead entered nurture sequence | ACCOM workflow |
| `rg_sms_consent` | TCPA SMS consent given | Lead capture forms |

### Disposition Tags
| Tag | Purpose | Set By |
|-----|---------|--------|
| `rg_spoke_engaged` | Spoke — interested, continue | Disposition endpoint |
| `rg_spoke_booked` | Spoke — appointment booked | Disposition endpoint |
| `rg_spoke_not_interested` | Spoke — declined | Disposition endpoint |
| `rg_long_term_nurture` | Long-term nurture (not ready now) | Disposition endpoint |

---

## Trade Guardian (`TG_`) Tags

| Tag | Purpose | Set By | Added to GHL |
|-----|---------|--------|--------------|
| `TG_Brief_Interested` | Replied or engaged with brief content | Manual on reply / Workflow auto-tag | YES |
| `TG_Brief_Subscriber` | Actively receiving the free weekly brief | Workflow auto-tag on reply | Pending |
| `TG_Brief_Unsubscribed` | Opted out of brief | Manual on request | Pending |
| `TG_Brief_Daily_Interested` | Interested in paid daily tier | Manual on "DAILY" reply | Pending |
| `TG_Brief_Daily_Subscriber` | Paying daily subscriber | Manual (no automation) | Pending |
| `TG_Brief_Referral_Partner` | Receiving partner version of brief | Manual | Pending |
| `TG_Brief_VIP_Preview` | Funded client in initial VIP preview list (29 contacts tagged 2026-04-27) | Manual (launch list) | YES — 29 contacts |

---

## Project Guardian (`PG_`) Tags — Reserved

| Tag | Purpose | Status |
|-----|---------|--------|
| `PG_Active_Project` | Has active renovation project | Reserved |
| `PG_Portal_User` | Registered portal user | Reserved |

---

## SmartList Reference

| SmartList Name | Filter Logic | Domain |
|----------------|-------------|--------|
| TG Brief — Active Subscribers | `TG_Brief_Subscriber` AND NOT `TG_Brief_Unsubscribed` | TG |
| TG Brief — Daily Interested | `TG_Brief_Daily_Interested` | TG |
| TG Brief — Referral Partners | `TG_Brief_Referral_Partner` | TG |
| TG Brief — VIP Preview | `TG_Brief_VIP_Preview` | TG |
| TG Brief — Engaged (2+ opens) | `TG_Brief_Subscriber` AND email opens >= 2 | TG |

---

## Rules

1. **Never mix prefixes** — RG workflows read RG tags only. TG workflows read TG tags only.
2. **Kill switch is universal** — `RG_Manual_Owned` stops ALL automation (RG and TG).
3. **New products get their own prefix** — no sharing, no shortcuts.
4. **This doc is the registry** — if a tag isn't here, it shouldn't exist in GHL.
