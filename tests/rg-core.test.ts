import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { RulesEngine } from '../lib/rg/RulesEngine';

const thresholdVersion = { id: 'tv-1', version_name: 'v1' };
const thresholds = {
  trigger_threshold_30yr: 50,
  trigger_threshold_15yr: 25,
};

function buildStateHash(ghlContactId: string, propertyFingerprint: string, loanFingerprint: string, thresholdVersionId: string): string {
  return createHash('sha256')
    .update([ghlContactId, propertyFingerprint, loanFingerprint, thresholdVersionId].join('|'))
    .digest('hex');
}

test('classifies each loan independently (multi-loan support)', () => {
  const loanA = { id: 'l1', loan_fingerprint: 'lfp1', loan_type_raw: '30 year fixed', loan_product_normalized: '30yr', current_rate: 6.5, market_rate: 5.7 };
  const loanB = { id: 'l2', loan_fingerprint: 'lfp2', loan_type_raw: '15 year fixed', loan_product_normalized: '15yr', current_rate: 5.2, market_rate: 5.05 };

  const resultA = RulesEngine.classify({ loan: loanA, thresholdVersion, thresholds });
  const resultB = RulesEngine.classify({ loan: loanB, thresholdVersion, thresholds });

  assert.equal(resultA.opportunity, true);
  assert.equal(resultA.decision, 'notify');
  assert.equal(resultB.opportunity, false);
  assert.equal(resultB.decision, 'hold');
});

test('idempotency hash is deterministic per contact/property/loan/threshold_version', () => {
  const hash1 = buildStateHash('ghl-1', 'property-fp', 'loan-fp', 'tv-1');
  const hash2 = buildStateHash('ghl-1', 'property-fp', 'loan-fp', 'tv-1');
  const hash3 = buildStateHash('ghl-1', 'property-fp', 'loan-fp', 'tv-2');

  assert.equal(hash1, hash2);
  assert.notEqual(hash1, hash3);
});

test('state-based uniqueness ignores repeated alerts but creates new state for new threshold version', () => {
  const seen = new Set<string>();
  const tuple = ['ghl-1', 'property-fp', 'loan-fp'] as const;

  const fromAlert1 = buildStateHash(tuple[0], tuple[1], tuple[2], 'tv-1');
  const fromAlert2 = buildStateHash(tuple[0], tuple[1], tuple[2], 'tv-1');
  const fromNewVersion = buildStateHash(tuple[0], tuple[1], tuple[2], 'tv-2');

  seen.add(fromAlert1);
  const duplicateInserted = seen.size;
  seen.add(fromAlert2);
  const afterDuplicateAttempt = seen.size;
  seen.add(fromNewVersion);
  const afterVersionChange = seen.size;

  assert.equal(duplicateInserted, 1);
  assert.equal(afterDuplicateAttempt, 1);
  assert.equal(afterVersionChange, 2);
});
