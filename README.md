# Rate Guardian API

This repository contains serverless and Supabase Edge functions for intake, canonical loan state, and deterministic classification.

## New Rate Guardian flow

1. `supabase/functions/alerts-insert` receives the GHL webhook payload, unwraps `payload.Raw|payload.JSON|payload.json`, inserts immutable `alerts`, and upserts canonical `rg_contacts` + `rg_loan_profiles`.
2. `supabase/functions/rg-dispatch-classify` fetches unclassified alerts, loads canonical records, runs `lib/rg/RulesEngine.ts`, and inserts one row per alert in `rg_classifications`.
3. `sql/20260214_rg_canonical_state.sql` provisions canonical tables and normalization indexes.

## Deploy notes

- Run the SQL migration first.
- Deploy Edge functions:

```bash
supabase functions deploy alerts-insert
supabase functions deploy rg-dispatch-classify
```

- Configure classification thresholds in function environment variables:
  - `TRIGGER_THRESHOLD_10YR`, `TRIGGER_THRESHOLD_15YR`, `TRIGGER_THRESHOLD_30YR`
  - `TRIGGER_THRESHOLD_30YR_FHA`, `TRIGGER_THRESHOLD_30YR_VA`
  - `TRIGGER_THRESHOLD_5_1_ARM`, `TRIGGER_THRESHOLD_7_1_ARM`, `TRIGGER_THRESHOLD_JUMBO`
  - `MAX_LENDER_CREDIT_AGENCY`, `MAX_LENDER_CREDIT_FHA`, `MAX_LENDER_CREDIT_JUMBO`, `MAX_LENDER_CREDIT_VA`

## Manual test scripts

```bash
# 1) run migration
supabase db push

# 2) invoke intake with fixture payload
supabase functions invoke alerts-insert --no-verify-jwt --body @tests/fixtures/ghl-alert.json

# 3) run classification dispatch once
supabase functions invoke rg-dispatch-classify --no-verify-jwt

# 4) verify idempotency (should not increase rows on repeated calls)
supabase functions invoke rg-dispatch-classify --no-verify-jwt
```
