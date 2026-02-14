export type AlertsRow = {
  id: string;
  contact_id: string | null;
  current_rate: number | null;
  market_rate: number | null;
  loan_type: string | null;
  delta: number | null;
};

export type ContactsRow = {
  contact_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
};

export type LoanProfilesRow = {
  id: string;
  contact_id: string;
  loan_type_raw: string | null;
  loan_product_normalized: string | null;
  loan_amount: number | null;
  down_payment_amount: number | null;
  home_value_est: number | null;
  current_rate: number | null;
  market_rate: number | null;
  credit_score: number | null;
  household_income: number | null;
  rate_variable: string | null;
};

export type Thresholds = {
  trigger_threshold_10yr?: number | string | null;
  trigger_threshold_15yr?: number | string | null;
  trigger_threshold_30yr?: number | string | null;
  trigger_threshold_30yr_fha?: number | string | null;
  trigger_threshold_30yr_va?: number | string | null;
  trigger_threshold_5_1_arm?: number | string | null;
  trigger_threshold_7_1_arm?: number | string | null;
  trigger_threshold_jumbo?: number | string | null;
  max_lender_credit_agency?: number | string | null;
  max_lender_credit_fha?: number | string | null;
  max_lender_credit_jumbo?: number | string | null;
  max_lender_credit_va?: number | string | null;
  [k: string]: number | string | null | undefined;
};

export type ClassificationInput = {
  alert: AlertsRow;
  contact: ContactsRow;
  loan_profile: LoanProfilesRow;
  custom_thresholds: Thresholds;
};

export type ClassificationResult = {
  opportunity: boolean;
  decision: string;
  reason: string;
  rule_id: string;
  threshold_snapshot: Record<string, unknown>;
};

const RULE_VERSION = 'rg-v1.0.0';

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[$,%\s,]/g, '');
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
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
  const product =
    normalizeLoanProduct(input.loan_profile.loan_product_normalized) ||
    normalizeLoanProduct(input.loan_profile.loan_type_raw) ||
    normalizeLoanProduct(input.alert.loan_type);

  const thresholdKey = thresholdKeyForProduct(product);
  const thresholdBps = toNumber(input.custom_thresholds[thresholdKey]) ?? 50;

  const currentRate =
    toNumber(input.loan_profile.current_rate) ??
    toNumber(input.alert.current_rate) ??
    0;

  const marketRate =
    toNumber(input.loan_profile.market_rate) ??
    toNumber(input.alert.market_rate) ??
    0;

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
    rule_id: `${RULE_VERSION}:${product}:${thresholdKey}`,
    threshold_snapshot: {
      product,
      threshold_key: thresholdKey,
      threshold_bps: thresholdBps,
      current_rate: currentRate,
      market_rate: marketRate,
      delta_bps: deltaBps,
      evaluated_with: RULE_VERSION,
    },
  };
}

export const RulesEngine = { classify };
