// lib/normalizer.ts

import type { LeadPayload } from "../types/payloads";

/**
 * normalizeLead
 * Converts ANY inbound payload (legacy, GHL, Apify, Rosie)
 * → into a clean, V5-aligned LeadPayload matching Supabase schema.
 */
export function normalizeLead(input: any): LeadPayload {

  const normalized: LeadPayload = {
    // Core identity
    first_name: input.first_name?.trim() ?? input.firstName ?? "",
    last_name: input.last_name?.trim() ?? input.lastName ?? "",
    email: input.email?.toLowerCase() ?? "",
    phone: input.phone ?? input.phone_number ?? "",

    // Intake classification / Process Stage
    where_are_you_in_the_process:
      input.where_are_you_in_the_process ??
      input.process_stage ??
      input.stage ??
      null,

    // Loan / Financial fields
    rg_loan_amount:
      Number(input.loan_amount) ||
      Number(input.rg_loan_amount) ||
      null,

    rg_existing_rate:
      Number(input.existing_rate) ||
      Number(input.rg_existing_rate) ||
      null,

    property_state:
      input.property_state ??
      input.state ??
      null,

    // Opportunity engine fields (may be overwritten by engine)
    rg_oppty_score: null,
    rg_oppty_tier: null,
    rg_monthly_savings: null,
    rg_total_savings: null,

    // Alert system
    rg_alert_last_sent: null,
    rg_alert_attempts: 0,

    // Metadata
    source: input.source ?? "intake",
    created_at: input.created_at ?? new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return normalized;
}
