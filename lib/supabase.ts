import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

/**
 * FIXED:
 *  - Do NOT throw if env vars are missing (breaks Vercel builds)
 *  - Instead warn, create a "safe client", and fail only at query time
 */

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "[Supabase] WARNING: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Client created with empty credentials — runtime queries will fail."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
