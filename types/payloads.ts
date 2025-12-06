export interface LeadPayload {
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  where_are_you_in_the_process?: string | null;
  process_stage?: string | null;
  stage?: string | null;
  rg_loan_amount?: number | null;
  loan_amount?: number | null;
  rg_existing_rate?: number | null;
  existing_rate?: number | null;
  property_state?: string | null;
  state?: string | null;
  rg_oppty_score?: number | null;
  rg_oppty_tier?: string | null;
  rg_monthly_savings?: number | null;
  rg_total_savings?: number | null;
  rg_alert_last_sent?: string | null;
  rg_alert_attempts?: number;
  source?: string;
  created_at?: string;
  updated_at?: string;
}
