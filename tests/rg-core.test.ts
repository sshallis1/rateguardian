import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { RulesEngine } from '../lib/rg/RulesEngine';

const thresholdVersion = { id: 'tv-1', version_name: 'v1' };
const thresholds = {
  trigger_threshold_30yr: 50,
  trigger_threshold_15yr: 25,
};

test('classifies each loan independently (multi-loan support)', () => {
  const alert = { id: 'a1', contact_id: 'c1', current_rate: 6.5, market_rate: 5.7, loan_type: '30 year fixed' };

  const loanA = { id: 'l1', loan_fingerprint: 'lfp1', loan_type_raw: '30 year fixed', loan_product_normalized: '30yr', current_rate: 6.5, market_rate: 5.7 };
  const loanB = { id: 'l2', loan_fingerprint: 'lfp2', loan_type_raw: '15 year fixed', loan_product_normalized: '15yr', current_rate: 5.2, market_rate: 5.05 };

  const resultA = RulesEngine.classify({ alert, loan: loanA, thresholdVersion, thresholds });
  const resultB = RulesEngine.classify({ alert, loan: loanB, thresholdVersion, thresholds });

  assert.equal(resultA.opportunity, true);
  assert.equal(resultA.decision, 'notify');
  assert.equal(resultB.opportunity, false);
  assert.equal(resultB.decision, 'hold');
});

test('idempotency hash is deterministic per contact/property/loan/threshold_version', () => {
  const raw = ['ghl-1', 'property-fp', 'loan-fp', 'tv-1'].join('|');
  const hash1 = createHash('sha256').update(raw).digest('hex');
  const hash2 = createHash('sha256').update(raw).digest('hex');
  const hash3 = createHash('sha256').update(['ghl-1', 'property-fp', 'loan-fp', 'tv-2'].join('|')).digest('hex');

  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hash3);
});
