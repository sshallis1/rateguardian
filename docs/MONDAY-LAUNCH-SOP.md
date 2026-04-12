# Rate Guardian — Monday Launch SOP

**Created**: April 12, 2026
**For**: Sean Shallis
**Context**: Rate Guardian engine is live. Workflows audited and updated. This is your playbook for Monday morning.

---

## Pre-Flight (Before 8am)

### 1. Verify Engine is Running
Open in browser:
```
https://shallis-site.vercel.app/api/rg/health
```
You should see: `"status": "operational"`, `"holidayMode": false`, and all 16 workflows listed.

### 2. Publish These Workflows in GHL
Go to **Automation** → search "RG" → publish these drafts:

| Workflow | Status | Action |
|----------|--------|--------|
| RG \| Egress \| Rate Drop Alert \| Engine | Draft → **PUBLISH** | Trigger: RG_Eligible_Rate_Today changes → webhook |
| RG \| Engine \| Evaluate Refi Opportunity \| Engine | Draft → **PUBLISH** | Trigger: tag rg_source_refi → webhook |
| RG \| Ingress \| LeadSource LeverageRX \| Integration | Draft → **PUBLISH** | Trigger: tag rg_leveragerx_active (NEW tag, won't fire on existing 343 contacts) |

**DO NOT publish:**
- RG \| Egress \| Ask Rosie Flow Follow-Up — emails not written yet
- RG \| Engine \| Set Opportunity Score — deleted (scoring runs inside routing agent)
- RG \| C2S \| Follow-Up \| BASE TEMPLATE — skeleton, intentionally held

### 3. Verify Already-Published Workflows
These should already be published and working:
- ✅ RG \| Engine \| Master Dispatcher \| Rosie
- ✅ RG \| Egress \| Engine Result Routing
- ✅ RG \| Engine \| Pipeline Logic
- ✅ RG \| Intake \| Lead Ingress
- ✅ RG \| Normalize \| Loan Product
- ✅ RG \| Activation \| Enroll in Rate Guardian
- ✅ RG \| C2S \| Physician Follow-Up \| LeverageRX
- �� RG \| Ops \| Internal Notify
- ✅ RG \| Ops \| Engine Heartbeat Ingest
- ✅ RG \| Ops \| Engine Health Check Monitor

---

## During the Day

### New LeverageRx Leads
When a new lead comes in from the LeverageRx portal:
1. Run `/check-leveragerx` in Claude Code (or it triggers from Gmail)
2. Lead is created in GHL with tag `rg_source_leveragerx`
3. **Manually add tag `rg_leveragerx_active`** to the contact to trigger the intake workflow
4. Or: ask Claude Code to add the tag via GHL API

> **Why the extra tag?** 343 existing contacts already have `rg_source_leveragerx`. The `rg_leveragerx_active` tag prevents them from all firing at once. Only contacts you explicitly tag will enter the workflow.

### When You Speak With a Lead
After any call/conversation, use the GHL Quick Actions or run the disposition endpoint:
- **Spoke - Engaged** → blitz off, manual owned, monitoring continues
- **Spoke - Booked** → blitz off, manual owned, appointment booked
- **Spoke - Not Interested** → opt out
- **Callback Later** → blitz off, manual owned, log only
- **Manual Owned** → master kill-switch, all automation stops except monitoring

Once `RG_Manual_Owned` tag is applied, no automation touches that contact.

### Rate Drop Alerts
These fire automatically when `RG_Eligible_Rate_Today` changes on a contact:
1. Webhook hits Vercel → Rosie evaluates if the drop is significant
2. If actionable → routes through Result Routing → triggers appropriate outreach
3. You'll see it in GHL activity and get an Ops Notify if it's hot

---

## Controlled Rollout for Existing 343 Contacts

**DO NOT batch-tag all 343 contacts on Monday.** Stagger them:

### Week 1 (Mon-Fri)
- **Monday**: Tag 10 physician contacts with `rg_leveragerx_active` (highest loan amounts first)
- **Tuesday**: Tag 10 more
- **Wednesday-Friday**: 10-15 per day based on capacity

### Week 2
- Increase to 20-25 per day
- By end of Week 2, all 343 should be active

### How to Batch-Tag
In GHL → **Contacts** → filter by tag `rg_source_leveragerx` → sort by loan amount (highest first) → select 10 → **Bulk Actions** → Add Tag → `rg_leveragerx_active`

---

## Troubleshooting

### Webhook returns 403
- Check Vercel is deployed: `https://shallis-site.vercel.app/api/rg/health`
- GHL payload format may have changed — check Vercel logs

### No Ops notifications
- Verify RG \| Ops \| Internal Notify is published
- Check your notification email/phone in the workflow

### Contact stuck in workflow
- Check execution logs in the workflow
- Look for "waiting" status on time gate steps (outside 8am-8pm window)
- If stuck on call step, the internal call may have failed

### Need to stop all automation for a contact
- Add tag `RG_Manual_Owned` → everything stops
- Or use Quick Action → Manual Owned

---

## Quick Reference

| Action | How |
|--------|-----|
| Check engine health | `https://shallis-site.vercel.app/api/rg/health` |
| Check new LeverageRx leads | `/check-leveragerx` in Claude Code |
| Process a lead manually | `/process-lead` in Claude Code |
| Kill automation for a contact | Add tag `RG_Manual_Owned` in GHL |
| Release contact back to automation | Remove `RG_Manual_Owned` tag |
| Check Vercel logs | `vercel logs shallis-site --follow` |
| Holiday mode on | Set env var or use Command Center |
| Holiday mode off | Same |

---

## What's Still Pending (Not Blocking Launch)

- [ ] Record voicemail scripts (physician + generic)
- [x] Write Ask Rosie follow-up emails (4 emails in drip) — drafted in `docs/ask-rosie-followup-emails.md`, needs Sean review before GHL entry
- [x] Wire `rg_landing_askrosie` tag from Ask Rosie chat page — API endpoint + lead capture CTA built (2026-04-12)
- [x] Create `RG_Career_Status` custom field — already exists in GHL (field ID JEhk31LacrC0j4oNWrqK)
- [ ] Re-auth Google Workspace MCP for automated Gmail triggers
- [x] Automate `rg_leveragerx_active` tag in `/check-leveragerx` command — tag now included automatically (2026-04-12)

---

*Generated by Claude Code — April 12, 2026*
