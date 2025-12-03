export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          created_at: string | null;
          where_are_you_in_the_process: string | null;
          target_property_state: string | null;
          target_property_type: string | null;
          target_property_use: string | null;
          first_time_home_buyer: string | null;
          estimated_credit_score: string | null;
          estimated_household_income: string | null;
          hero_eligibility: string | null;
          hero_category: string | null;
          scenario: string | null;
          loan_shopping_status: string | null;
          rg_decision: string | null;
          rg_notes_internal: string | null;
          rg_rosie_last_a: string | null;
          rg_rosie_optin: string | null;
          rg_rosie_snippet: string | null;
          rg_data_status: string | null;
          rg_existing_rate: number | null;
          rg_existing_term_months: number | null;
          rg_existing_balance: number | null;
          rg_existing_piti: number | null;
          rg_arm_adjustment_date: string | null;
          rg_cashout_amount: number | null;
          rg_cashout_purpose: string | null;
          rg_goal_primary: string | null;
          rg_goal_secondary: string | null;
          rg_flag_immediate: boolean | null;
          rg_flag_monitor: boolean | null;
          rg_source: string | null;
          rg_lead_source: string | null;
          rg_loan_amount: number | null;
          rg_lender_name: string | null;
          rg_rate_lock_date: string | null;
          rg_refi_fees_est: number | null;
          rg_rosie_last_q: string | null;
          rg_trigger_flag: boolean | null;
          rg_last_run_at: string | null;
          rg_oppty_tier: string | null;
          rg_savings: number | null;
          rg_breakeven_months: number | null;
          rg_last_evaluated: string | null;
          rg_monthly_savings_est: number | null;
          rg_rate_delta_bps: number | null;
          rg_oppty_score: number | null;
          rg_eligible_rate_today: number | null;
        };
        Insert: Partial<Database["public"]["Tables"]["contacts"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["contacts"]["Row"]>;
      };
      alerts: {
        Row: {
          id: string;
          contact_id: string | null;
          name: string | null;
          loan_type: string | null;
          current_rate: number | null;
          market_rate: number | null;
          delta: number | null;
          estimated_savings: number | null;
          message_type: string | null;
          inserted_at: string | null;
          alert_sent: boolean | null;
          processed_at: string | null;
          attempts: number | null;
          last_error: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["alerts"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["alerts"]["Row"]>;
      };
      rate_alerts: {
        Row: {
          id: string;
          contact_id: string;
          opportunity_id: string;
          created_at: string | null;
          alert_type: string | null;
          status: string | null;
          alert_date: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["rate_alerts"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["rate_alerts"]["Row"]>;
      };
      rate_opportunities: {
        Row: {
          id: string;
          contact_id: string;
          created_at: string | null;
          updated_at: string | null;
          market_rate: number | null;
          existing_rate: number | null;
          rate_delta_bps: number | null;
          monthly_savings: number | null;
          total_savings: number | null;
          breakeven_months: number | null;
          oppty_score: number | null;
          oppty_tier: string | null;
          status: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["rate_opportunities"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["rate_opportunities"]["Row"]>;
      };
      rg_run_ledger: {
        Row: {
          run_id: string;
          started_at: string | null;
          completed_at: string | null;
          contacts_processed: number | null;
          opportunities_found: number | null;
          alerts_sent: number | null;
          status: string | null;
          last_error: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["rg_run_ledger"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["rg_run_ledger"]["Row"]>;
      };
      rg_webhook_dead_letter: {
        Row: {
          id: string;
          contact_id: string | null;
          payload: any;
          attempts: number | null;
          last_error: string | null;
          created_at: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["rg_webhook_dead_letter"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["rg_webhook_dead_letter"]["Row"]>;
      };
    };
  };
}

export type Tables = Database["public"]["Tables"];
export type ContactRow = Tables["contacts"]["Row"];
