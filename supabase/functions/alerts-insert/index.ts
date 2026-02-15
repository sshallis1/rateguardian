import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

type Json = Record<string, unknown>;

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function unwrapBody(body: unknown): Json {
  if (!body || typeof body !== 'object') return {};
  const parsed = body as Json;
  const payload = parsed.payload as Json | undefined;
  return (payload?.Raw as Json) || (payload?.JSON as Json) || (payload?.json as Json) || parsed;
}

function asString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  return str.length ? str : null;
}

function parseNumeric(value: unknown): number | null {
  const str = asString(value);
  if (!str) return null;
  const n = Number(str.replace(/[$,%\s,]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function parseInteger(value: unknown): number | null {
  const n = parseNumeric(value);
  return n === null ? null : Math.trunc(n);
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
  const m = str.match(mmddyyyy);
  if (m) {
    const [, mm, dd, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }
  const parsed = Date.parse(str);
  return Number.isNaN(parsed) ? null : new Date(parsed).toISOString().slice(0, 10);
}

function getValue(raw: Json, token: string): unknown {
  const key = token.replace(/[{}]/g, '').replace('contact.', '');
  return raw[token] ?? raw[key] ?? raw[key.replace(/\./g, '_')] ?? null;
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

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });

  try {
    const body = await req.json();
    const raw = unwrapBody(body);

    const ghlContactId = asString(raw.contact_id ?? raw.contactId ?? raw.id);
    if (!ghlContactId) return new Response(JSON.stringify({ error: 'Missing ghl_contact_id/contact_id' }), { status: 400 });

    // 1) immutable alert
    const { data: alert, error: alertError } = await supabase
      .from('alerts')
      .insert({
        contact_id: ghlContactId,
        name: asString(raw.name ?? `${asString(raw.first_name) ?? ''} ${asString(raw.last_name) ?? ''}`.trim()),
        loan_type: asString(getValue(raw, '{{contact.rg_loan_type}}')),
        current_rate: parseNumeric(getValue(raw, '{{contact.rg_rate_original}}')),
        market_rate: parseNumeric(getValue(raw, '{{contact.rgtodays_rate}}')),
        alert_sent: false,
      })
      .select('id')
      .single();
    if (alertError) throw alertError;

    // 2) contact upsert
    const { data: contact, error: contactError } = await supabase
      .from('rg_contacts')
      .upsert({
        ghl_contact_id: ghlContactId,
        first_name: asString(raw.first_name),
        last_name: asString(raw.last_name),
        email: asString(raw.email),
        phone: asString(raw.phone),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'ghl_contact_id' })
      .select('id, ghl_contact_id')
      .single();
    if (contactError) throw contactError;

    // 3) property fingerprint + upsert
    const target_property_use = asString(getValue(raw, '{{contact.target_property_use}}'));
    const target_property_type = asString(getValue(raw, '{{contact.target_property_type}}'));
    const target_property_state = asString(getValue(raw, '{{contact.target_property_state}}'));
    const target_city = asString(getValue(raw, '{{contact.rg_target_city}}'));
    const target_county = asString(getValue(raw, '{{contact.rg_target_county}}'));
    const first_time_home_buyer = parseBoolean(getValue(raw, '{{contact.first_time_home_buyer}}'));

    const propertyFingerprint = await sha256([
      (target_property_use ?? '').toLowerCase(),
      (target_property_type ?? '').toLowerCase(),
      (target_property_state ?? '').toLowerCase(),
      (target_city ?? '').toLowerCase(),
      (target_county ?? '').toLowerCase(),
    ].join('|'));

    const { data: property, error: propertyError } = await supabase
      .from('rg_properties')
      .upsert({
        contact_id: contact.id,
        property_fingerprint: propertyFingerprint,
        target_property_use,
        target_property_type,
        target_property_state,
        target_city,
        target_county,
        first_time_home_buyer,
        raw,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'contact_id,property_fingerprint' })
      .select('id, property_fingerprint')
      .single();
    if (propertyError) throw propertyError;

    // 4) loan fingerprint + upsert
    const loan_type_raw = asString(getValue(raw, '{{contact.rg_loan_type}}'));
    const loan_amount = parseNumeric(getValue(raw, '{{contact.rg_loan_amount}}'));
    const current_rate = parseNumeric(getValue(raw, '{{contact.rg_rate_original}}'));
    const loan_start_date = parseDate(getValue(raw, '{{contact.rg_loan_start_date}}'));
    const rate_lock_date = parseDate(getValue(raw, '{{contact.rg_rate_lock_date}}'));

    const loanFingerprint = await sha256([
      (loan_type_raw ?? '').toLowerCase(),
      String(loan_amount ?? ''),
      String(current_rate ?? ''),
      loan_start_date ?? '',
      rate_lock_date ?? '',
    ].join('|'));

    const { error: loanError } = await supabase
      .from('rg_loans')
      .upsert({
        property_id: property.id,
        loan_fingerprint: loanFingerprint,
        lead_source: asString(getValue(raw, '{{contact.rg_lead_source1}}')),
        loan_type_raw,
        loan_product_normalized: normalizeLoanType(loan_type_raw),
        loan_amount,
        down_payment_amount: parseNumeric(getValue(raw, '{{contact.rg_down_payment_amount}}')),
        home_value_est: parseNumeric(getValue(raw, '{{contact.rg_home_value_est}}')),
        current_rate,
        market_rate: parseNumeric(getValue(raw, '{{contact.rgtodays_rate}}')),
        rate_lock_date,
        loan_start_date,
        arm_adjustment_date: parseDate(getValue(raw, '{{contact.rg_arm_adjustment_date}}')),
        credit_score: parseInteger(getValue(raw, '{{contact.estimated_credit_score}}')),
        household_income: parseNumeric(getValue(raw, '{{contact.estimated_household_income}}')),
        hero_eligibility: asString(getValue(raw, '{{contact.hero_eligibility}}')),
        hero_category: asString(getValue(raw, '{{contact.hero_category}}')),
        loan_shopping_status: asString(getValue(raw, '{{contact.loan_shopping_status}}')),
        scenario: asString(getValue(raw, '{{contact.scenario}}')),
        notes_short: asString(getValue(raw, '{{contact.rg_notes_short}}')),
        notes_internal: asString(getValue(raw, '{{contact.rg_notes_internal}}')),
        rosie_status: asString(getValue(raw, '{{contact.rg_rosie_status}}')),
        rosie_optin: parseBoolean(getValue(raw, '{{contact.rg_rosie_optin}}')),
        rosie_path: asString(getValue(raw, '{{contact.rg_rosie_path}}')),
        rosie_reason: asString(getValue(raw, '{{contact.rg_rosie_reason}}')),
        rosie_error: asString(getValue(raw, '{{contact.rg_rosie_error}}')),
        rate_variable: asString(getValue(raw, '{{contact.rg_rate_variable}}')),
        raw,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'property_id,loan_fingerprint' });
    if (loanError) throw loanError;

    return new Response(JSON.stringify({ status: 'ok', alert_id: alert.id, contact_id: ghlContactId }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('[alerts-insert] failed', error);
    return new Response(JSON.stringify({ error: 'alerts-insert failed', detail: String(error) }), { status: 500 });
  }
});
