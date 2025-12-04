import { supabase } from "../supabase";
import type { ContactRow } from "../../types/supabase";
import { log } from "./logger";

const DEFAULT_LOOKBACK_HOURS = 24;
const DEFAULT_MAX_CONTACTS = 50;

export interface FetchOptions {
  limit?: number;
  contactId?: string;
  email?: string;
}

/**
 * Fetch contacts eligible for Engine processing.
 * FIXED:
 *  - All OR conditions now combined into a single `.or()` call (Supabase requirement)
 *  - Manual trigger bypass included safely
 *  - Eligibility logic simplified & deterministic
 */
export async function fetchEligibleContacts(options: FetchOptions = {}) {
  const limit = Math.min(Math.max(1, options.limit ?? DEFAULT_MAX_CONTACTS), DEFAULT_MAX_CONTACTS);

  const lookbackDate = new Date(Date.now() - DEFAULT_LOOKBACK_HOURS * 60 * 60 * 1000).toISOString();
  const recencyDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  let query = supabase
    .from("contacts")
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false });

  if (options.contactId) {
    query = query.eq("id", options.contactId);
  }

  if (options.email) {
    query = query.eq("email", options.email.toLowerCase());
  }

  const orConditions = [
    "rg_flag_monitor.eq.true",
    `and(rg_source.eq.intake_v7,created_at.gte.${recencyDate})`,
    "rg_last_run_at.is.null",
    `rg_last_run_at.lte.${lookbackDate}`,
    "rg_trigger_flag.eq.true",
  ];

  query = query.or(orConditions.join(","));

  const { data, error } = await query;

  if (error) {
    log({
      stage: "fetchContacts:error",
      message: "Failed to fetch eligible contacts",
      meta: { error },
    });
    throw error;
  }

  const contacts = (data ?? []) as ContactRow[];

  log({
    stage: "fetchContacts:complete",
    message: "Fetched eligible contacts",
    meta: { count: contacts.length },
  });

  return contacts;
}
