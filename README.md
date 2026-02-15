# Rate Guardian API

Guardian OS Core Infrastructure v1 for deterministic, DB-backed intake and classification.

## Canonical data flow

1. `supabase/functions/alerts-insert` unwraps the webhook payload (`payload.Raw | payload.JSON | payload.json`).
2. It inserts immutable `alerts` event log row.
3. It upserts canonical `rg_contacts` by `ghl_contact_id`.
4. It computes `property_fingerprint` and upserts `rg_properties` by `(contact_id, property_fingerprint)`.
5. It computes `loan_fingerprint` and upserts `rg_loans` by `(property_id, loan_fingerprint)`.
6. No classification logic is executed in intake.

## Threshold versioning model

Thresholds are fully database-backed:

- `rg_threshold_versions` stores named versions and one active version.
- `rg_thresholds` stores `(threshold_key, threshold_value)` for a given version.
- `rg-dispatch-classify` loads the active version and its threshold rows for deterministic execution.

## Deterministic + idempotent classification

Dispatcher behavior:

1. Loads alerts and canonical loans.
2. Runs `lib/rg/RulesEngine.ts` with DB thresholds (no env threshold logic).
3. Builds `hash_signature = sha256(ghl_contact_id|property_fingerprint|loan_fingerprint|threshold_version_id)`.
4. Upserts `rg_classifications` on `hash_signature` uniqueness, preventing duplicate outcomes across retries.
5. Supports multi-loan contacts by classifying each loan independently.

## Deploy

```bash
supabase db push
supabase functions deploy alerts-insert
supabase functions deploy rg-dispatch-classify
```

## Tests

```bash
npm test
```
