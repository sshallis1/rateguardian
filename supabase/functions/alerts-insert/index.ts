import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

type Json = Record<string, unknown>;

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const TOKEN_MAP: Record<string, string> = {
  '{{contact.rg_lead_source1}}': 'lead_source',
  '{{contact.target_property_use}}': 'target_property_use',
  '{{contact.target_property_type}}': 'target_property_type',
  '{{contact.target_property_state}}': 'target_property_state',
  '{{contact.rg_target_city}}': 'target_city',
  '{{contact.rg_target_county}}': 'target_county',
  '{{contact.rg_loan_type}}': 'loan_type_raw',
  '{{contact.rg_loan_amount}}': 'loan_amount',
  '{{contact.rg_down_payment_amount}}': 'down_payment_amount',
  '{{contact.rg_home_value_est}}': 'home_value_est',
  '{{contact.rg_rate_original}}': 'current_rate',
  '{{contact.rgtodays_rate}}': 'market_rate',
  '{{contact.estimated_credit_score}}': 'credit_score',
  '{{contact.estimated_household_income}}': 'household_income',
  '{{contact.first_time_home_buyer}}': 'first_time_home_buyer',
  '{{contact.hero_eligibility}}': 'hero_eligibility',
  '{{contact.hero_category}}': 'hero_category',
  '{{contact.rg_loan_start_date}}': 'loan_start_date',
  '{{contact.rg_rate_lock_date}}': 'rate_lock_date',
  '{{contact.rg_arm_adjustment_date}}': 'arm_adjustment_date',
  '{{contact.loan_shopping_status}}': 'loan_shopping_status',
  '{{contact.scenario}}': 'scenario',
  '{{contact.rg_notes_short}}': 'notes_short',
  '{{contact.rg_notes_internal}}': 'notes_internal',
  '{{contact.rg_rosie_status}}': 'rosie_status',
  '{{contact.rg_rosie_optin}}': 'rosie_optin',
  '{{contact.rg_rosie_path}}': 'rosie_path',
  '{{contact.rg_rosie_reason}}': 'rosie_reason',
  '{{contact.rg_rosie_error}}': 'rosie_error',
  '{{contact.rg_rate_variable}}': 'rate_variable',
};

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function unwrapBody(body: unknown): Json {
  if (!body || typeof body !== 'object') return {};
  const parsed = body as Json;
  const candidate = parsed.payload as Json | undefined;
  return (candidate?.Raw as Json) || (candidate?.JSON as Json) || (candidate?.json as Json) || parsed;
}

function asString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str.length ? str : null;
}

function parseNumeric(value: unknown): number | null {
  const str = asString(value);
  if (!str) return null;
  const parsed = Number(str.replace(/[$,\s]/g, ''));
  return Number.isFinite(parsed) ? parsed : null;
}

function parseInteger(value: unknown): number | null {
  const num = parseNumeric(value);
  return num === null ? null : Math.trunc(num);
}

function parseBoolean(value: unknown): boolean | null {
  if (typeof value === 'boolean') return value;
  const str = asString(value)?.toLowerCase();
  if (!str) return null;
  if (['yes', 'true', '1', 'y'].includes(str)) return true;
  if (['no', 'false', '0', 'n'].includes(str)) return false;
  return null;
}

function parseDate(value: unknown): string | null {
  const str = asString(value);
  if (!str) return null;

  const mmddyyyy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = str.match(mmddyyyy);
  if (match) {
    const [_, mm, dd, yyyy] = match;
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }

  const parsed = Date.parse(str);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString().slice(0, 10);
  }
  return null;
}

function getValue(raw: Json, token: string): unknown {
  const canonicalKey = token.replace(/[{}]/g, '').replace('contact.', '');
  return raw[token] ?? raw[canonicalKey] ?? raw[canonicalKey.replace(/\./g, '_')] ?? null;
}

function normalizeLoanType(value: string | null): string | null {
  if (!value) return null;
  const v = value.toLowerCase();
  if (v.includes('jumbo')) return 'jumbo';
  if (v.includes('fha')) return '30yr_fha';
  if (v.includes('va')) return '30yr_va';
  if (v.includes('5/1') || v.includes('5-1')) return '5_1_arm';
  if (v.includes('7/1') || v.includes('7-1')) return '7_1_arm';
  if (v.includes('10')) return '10yr';
  if (v.includes('15')) return '15yr';
  return '30yr';
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await req.json();
    const raw = unwrapBody(body);

    const contact_id = asString(raw.contact_id ?? raw.id ?? raw.contactId);
    if (!contact_id) {
      return new Response(JSON.stringify({ error: 'Missing contact_id' }), { status: 400 });
    }

    const alertInsert = {
      contact_id,
      name: asString(raw.name ?? `${asString(raw.first_name) ?? ''} ${asString(raw.last_name) ?? ''}`.trim()),
      loan_type: asString(getValue(raw, '{{contact.rg_loan_type}}')),
      current_rate: parseNumeric(getValue(raw, '{{contact.rg_rate_original}}')),
      market_rate: parseNumeric(getValue(raw, '{{contact.rgtodays_rate}}')),
      delta: null,
      estimated_savings: null,
      message_type: asString(raw.message_type),
      alert_sent: false,
    };

    const { data: alertRow, error: alertError } = await supabase
      .from('alerts')
      .insert(alertInsert)
      .select('id, contact_id')
      .single();

    if (alertError) throw alertError;

    const contactUpsert = {
      contact_id,
      first_name: asString(raw.first_name),
      last_name: asString(raw.last_name),
      email: asString(raw.email),
      phone: asString(raw.phone),
      updated_at: new Date().toISOString(),
    };

    const { error: contactError } = await supabase
      .from('rg_contacts')
      .upsert(contactUpsert, { onConflict: 'contact_id' });
    if (contactError) throw contactError;

    const loan_profile: Json = {
      contact_id,
      raw,
      updated_at: new Date().toISOString(),
    };

    for (const [token, target] of Object.entries(TOKEN_MAP)) {
      const value = getValue(raw, token);
      if (['loan_amount', 'down_payment_amount', 'home_value_est', 'current_rate', 'market_rate', 'household_income'].includes(target)) {
        loan_profile[target] = parseNumeric(value);
      } else if (target === 'credit_score') {
        loan_profile[target] = parseInteger(value);
      } else if (['first_time_home_buyer', 'rosie_optin'].includes(target)) {
        loan_profile[target] = parseBoolean(value);
      } else if (['rate_lock_date', 'loan_start_date', 'arm_adjustment_date'].includes(target)) {
        loan_profile[target] = parseDate(value);
      } else {
        loan_profile[target] = asString(value);
      }
    }

    loan_profile.loan_product_normalized = normalizeLoanType(loan_profile.loan_type_raw as string | null);

    const { error: loanError } = await supabase
      .from('rg_loan_profiles')
      .upsert(loan_profile, { onConflict: 'contact_id' });
    if (loanError) throw loanError;

    return new Response(JSON.stringify({ status: 'ok', alert_id: alertRow.id, contact_id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('[alerts-insert] failed', error);
    return new Response(JSON.stringify({ error: 'alerts-insert failed', detail: String(error) }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
