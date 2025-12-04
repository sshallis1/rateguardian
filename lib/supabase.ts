import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let cachedClient: SupabaseClient<Database> | null = null;

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "[Supabase] WARNING: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Client initialized with empty credentials; queries will fail until configured."
    );
  }

  return createClient<Database>(supabaseUrl || "https://invalid.supabase.local", supabaseKey || "", {
    auth: { persistSession: false },
  });
}

export function getSupabaseClient() {
  if (!cachedClient) {
    cachedClient = createSupabaseClient();
  }
  return cachedClient;
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseKey);
}

export function assertSupabaseConfig(stage: string) {
  const ok = isSupabaseConfigured();
  if (!ok) {
    console.error(
      `[Supabase] Missing configuration for ${stage}. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.`
    );
  }
  return ok;
}

export const supabase = getSupabaseClient();

export type SupabaseDatabase = Database;
