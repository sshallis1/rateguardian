export type AlertRow = {
  id: string;
  contact_id: string | null;
  current_rate: number | null;
  market_rate: number | null;
  loan_type: string | null;
};

export type LoanRow = {
  id: string;
  loan_fingerprint: string;
  loan_type_raw: string | null;
  loan_product_normalized: string | null;
  current_rate: number | null;
  market_rate: number | null;
};

export type ThresholdVersion = {
  id: string;
  version_name: string;
};

export type DbThresholds = Record<string, number | null | undefined>;

export type ClassificationInput = {
  alert: AlertRow;
  loan: LoanRow;
  thresholdVersion: ThresholdVersion;
  thresholds: DbThresholds;
};

export type ClassificationResult = {
  opportunity: boolean;
  decision: string;
  reason: string;
  rule_id: string;
  threshold_snapshot: Record<string, unknown>;
};

const RULE_VERSION = 'guardian-os-core-v1';

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const parsed = Number(String(value).replace(/[$,%\s,]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeLoanProduct(raw: string | null | undefined): string {
  const value = (raw || '').toLowerCase();
  if (value.includes('jumbo')) return 'jumbo';
  if (value.includes('fha')) return '30yr_fha';
  if (value.includes('va')) return '30yr_va';
  if (value.includes('5/1') || value.includes('5-1')) return '5_1_arm';
  if (value.includes('7/1') || value.includes('7-1')) return '7_1_arm';
  if (value.includes('10')) return '10yr';
  if (value.includes('15')) return '15yr';
  return '30yr';
}

function thresholdKeyForProduct(product: string): string {
  const map: Record<string, string> = {
    '10yr': 'trigger_threshold_10yr',
    '15yr': 'trigger_threshold_15yr',
    '30yr': 'trigger_threshold_30yr',
    '30yr_fha': 'trigger_threshold_30yr_fha',
    '30yr_va': 'trigger_threshold_30yr_va',
    '5_1_arm': 'trigger_threshold_5_1_arm',
    '7_1_arm': 'trigger_threshold_7_1_arm',
    jumbo: 'trigger_threshold_jumbo',
  };
  return map[product] ?? 'trigger_threshold_30yr';
}

export function classify(input: ClassificationInput): ClassificationResult {
  const product = normalizeLoanProduct(input.loan.loan_product_normalized || input.loan.loan_type_raw || input.alert.loan_type);
  const thresholdKey = thresholdKeyForProduct(product);
  const thresholdBps = toNumber(input.thresholds[thresholdKey]) ?? 50;

  const currentRate = toNumber(input.loan.current_rate) ?? toNumber(input.alert.current_rate) ?? 0;
  const marketRate = toNumber(input.loan.market_rate) ?? toNumber(input.alert.market_rate) ?? 0;
  const deltaBps = Math.round((currentRate - marketRate) * 100);

  const opportunity = deltaBps >= thresholdBps;
  const decision = opportunity ? 'notify' : 'hold';
  const reason = opportunity
    ? `Rate delta ${deltaBps}bps exceeds threshold ${thresholdBps}bps (${product}).`
    : `Rate delta ${deltaBps}bps is below threshold ${thresholdBps}bps (${product}).`;

  return {
    opportunity,
    decision,
    reason,
    rule_id: `${RULE_VERSION}:${input.thresholdVersion.version_name}:${product}:${thresholdKey}`,
    threshold_snapshot: {
      threshold_version_id: input.thresholdVersion.id,
      threshold_version_name: input.thresholdVersion.version_name,
      product,
      threshold_key: thresholdKey,
      threshold_bps: thresholdBps,
      current_rate: currentRate,
      market_rate: marketRate,
      delta_bps: deltaBps,
    },
  };
}

export const RulesEngine = { classify };
