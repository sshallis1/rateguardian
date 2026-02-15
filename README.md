# Rate Guardian API

Guardian OS Core Infrastructure v1 with **Option B state-based classifications**.

## Canonical data flow

1. `supabase/functions/alerts-insert` unwraps webhook payload (`payload.Raw | payload.JSON | payload.json`).
2. Inserts immutable `alerts` event log row.
3. Upserts canonical `rg_contacts` by `ghl_contact_id`.
4. Computes `property_fingerprint` and upserts `rg_properties` by `(contact_id, property_fingerprint)`.
5. Computes `loan_fingerprint` and upserts `rg_loans` by `(property_id, loan_fingerprint)`.
6. Intake performs **no classification** logic.

## Option B classification model (state-based)

`rg_classifications` stores loan-state outcomes per threshold version, independent of alert uniqueness.

- Core keys: `loan_id`, `threshold_version_id`, `hash_signature` (unique)
- `alert_id` is optional traceability only (not part of uniqueness/business state)
- Dispatcher is idempotent by checking/inserting on `hash_signature`

### Hash signature

`hash_signature` is generated as:

```text
sha256(ghl_contact_id|property_fingerprint|loan_fingerprint|threshold_version_id)
```

`alert_id` is never part of hash composition.

## Threshold versioning (DB-backed only)

- `rg_threshold_versions` contains threshold bundles and active status
- `rg_thresholds` stores each `(threshold_key, threshold_value)` under a version
- `rg-dispatch-classify` always loads the active version from DB
- Environment variables do **not** control threshold logic

### Switching active threshold versions

Example SQL:

```sql
update rg_threshold_versions set is_active = false where is_active = true;
update rg_threshold_versions
set is_active = true, activated_at = now()
where id = '<new-threshold-version-id>';
```

The next dispatcher run will classify against the newly active threshold version.

## Deploy

```bash
supabase db push
supabase functions deploy alerts-insert
supabase functions deploy rg-dispatch-classify
```

## Tests

```bash
npm test
npm run build
```
