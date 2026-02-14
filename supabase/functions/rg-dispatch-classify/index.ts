import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { RulesEngine } from '../../../lib/rg/RulesEngine.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async () => {
  try {
    const { data: alerts, error: alertsError } = await supabase
      .from('alerts')
      .select('id, contact_id, current_rate, market_rate, loan_type, delta')
      .not('contact_id', 'is', null)
      .order('inserted_at', { ascending: true })
      .limit(250);

    if (alertsError) throw alertsError;

    const { data: existingClassifications, error: classError } = await supabase
      .from('rg_classifications')
      .select('alert_id');

    if (classError) throw classError;

    const classifiedAlertIds = new Set((existingClassifications ?? []).map((row) => row.alert_id));
    const pendingAlerts = (alerts ?? []).filter((alert) => !classifiedAlertIds.has(alert.id));

    let processed = 0;

    for (const alert of pendingAlerts) {
      const { data: contact } = await supabase
        .from('rg_contacts')
        .select('contact_id, first_name, last_name, email, phone')
        .eq('contact_id', alert.contact_id)
        .single();

      const { data: loan_profile } = await supabase
        .from('rg_loan_profiles')
        .select('id, contact_id, loan_type_raw, loan_product_normalized, loan_amount, down_payment_amount, home_value_est, current_rate, market_rate, credit_score, household_income, rate_variable')
        .eq('contact_id', alert.contact_id)
        .single();

      if (!contact || !loan_profile) continue;

      const result = RulesEngine.classify({
        alert,
        contact,
        loan_profile,
        custom_thresholds: {
          trigger_threshold_10yr: Deno.env.get('TRIGGER_THRESHOLD_10YR'),
          trigger_threshold_15yr: Deno.env.get('TRIGGER_THRESHOLD_15YR'),
          trigger_threshold_30yr: Deno.env.get('TRIGGER_THRESHOLD_30YR'),
          trigger_threshold_30yr_fha: Deno.env.get('TRIGGER_THRESHOLD_30YR_FHA'),
          trigger_threshold_30yr_va: Deno.env.get('TRIGGER_THRESHOLD_30YR_VA'),
          trigger_threshold_5_1_arm: Deno.env.get('TRIGGER_THRESHOLD_5_1_ARM'),
          trigger_threshold_7_1_arm: Deno.env.get('TRIGGER_THRESHOLD_7_1_ARM'),
          trigger_threshold_jumbo: Deno.env.get('TRIGGER_THRESHOLD_JUMBO'),
          max_lender_credit_agency: Deno.env.get('MAX_LENDER_CREDIT_AGENCY'),
          max_lender_credit_fha: Deno.env.get('MAX_LENDER_CREDIT_FHA'),
          max_lender_credit_jumbo: Deno.env.get('MAX_LENDER_CREDIT_JUMBO'),
          max_lender_credit_va: Deno.env.get('MAX_LENDER_CREDIT_VA'),
        },
      });

      const { error: insertError } = await supabase.from('rg_classifications').insert({
        alert_id: alert.id,
        contact_id: alert.contact_id,
        loan_profile_id: loan_profile.id,
        opportunity: result.opportunity,
        decision: result.decision,
        reason: result.reason,
        rule_id: result.rule_id,
        threshold_snapshot: result.threshold_snapshot,
        meta: { source: 'rg-dispatch-classify' },
      });

      if (!insertError) {
        processed += 1;
      } else if (insertError.code !== '23505') {
        console.error(`[rg-dispatch-classify] alert_id=${alert.id} failed`, insertError);
      }
    }

    return new Response(JSON.stringify({ ok: true, processed }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('[rg-dispatch-classify] failed', error);
    return new Response(JSON.stringify({ ok: false, error: String(error) }), { status: 500 });
  }
});
