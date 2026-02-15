import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { RulesEngine } from '../../../lib/rg/RulesEngine.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function sha256(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

serve(async () => {
  try {
    const { data: thresholdVersion, error: versionError } = await supabase
      .from('rg_threshold_versions')
      .select('id, version_name')
      .eq('is_active', true)
      .order('activated_at', { ascending: false })
      .limit(1)
      .single();
    if (versionError) throw versionError;

    const { data: thresholdRows, error: thresholdError } = await supabase
      .from('rg_thresholds')
      .select('threshold_key, threshold_value')
      .eq('threshold_version_id', thresholdVersion.id);
    if (thresholdError) throw thresholdError;

    const thresholds = Object.fromEntries((thresholdRows ?? []).map((row) => [row.threshold_key, row.threshold_value]));

    const { data: alerts, error: alertsError } = await supabase
      .from('alerts')
      .select('id, contact_id, current_rate, market_rate, loan_type')
      .not('contact_id', 'is', null)
      .order('inserted_at', { ascending: true })
      .limit(200);
    if (alertsError) throw alertsError;

    let processed = 0;

    for (const alert of alerts ?? []) {
      const { data: contact } = await supabase
        .from('rg_contacts')
        .select('id, ghl_contact_id')
        .eq('ghl_contact_id', alert.contact_id)
        .single();
      if (!contact) continue;

      const { data: properties } = await supabase
        .from('rg_properties')
        .select('id, property_fingerprint')
        .eq('contact_id', contact.id);

      for (const property of properties ?? []) {
        const { data: loans } = await supabase
          .from('rg_loans')
          .select('id, loan_fingerprint, loan_type_raw, loan_product_normalized, current_rate, market_rate')
          .eq('property_id', property.id);

        for (const loan of loans ?? []) {
          const result = RulesEngine.classify({
            alert,
            loan,
            thresholdVersion,
            thresholds,
          });

          const hashSignature = await sha256([
            contact.ghl_contact_id,
            property.property_fingerprint,
            loan.loan_fingerprint,
            thresholdVersion.id,
          ].join('|'));

          const { error: insertError } = await supabase
            .from('rg_classifications')
            .upsert({
              alert_id: alert.id,
              contact_id: contact.id,
              property_id: property.id,
              loan_id: loan.id,
              threshold_version_id: thresholdVersion.id,
              hash_signature: hashSignature,
              opportunity: result.opportunity,
              decision: result.decision,
              reason: result.reason,
              rule_id: result.rule_id,
              threshold_snapshot: result.threshold_snapshot,
              meta: { source: 'rg-dispatch-classify', alert_id: alert.id },
            }, { onConflict: 'hash_signature', ignoreDuplicates: true });

          if (!insertError) {
            processed += 1;
          } else {
            console.error(`[rg-dispatch-classify] alert_id=${alert.id} loan_id=${loan.id} failed`, insertError);
          }
        }
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
