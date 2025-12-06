import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/**
 * Safely initialize Supabase without throwing during import when env vars are absent.
 * A lightweight stub client is created if configuration is missing so Vercel builds
 * continue; runtime queries will still fail with a clear error.
 */

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function createStubClient(): SupabaseClient<Database> {
  const handler: ProxyHandler<any> = {
    get() {
      return () => {
        throw new Error("Supabase client is not configured");
      };
    },
  };
  return new Proxy({}, handler) as SupabaseClient<Database>;
}

let client: SupabaseClient<Database>;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "[Supabase] WARNING: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "A stub client is provided; runtime queries will fail until configured."
  );
  client = createStubClient();
} else {
  client = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });
}

export const supabase = client;
