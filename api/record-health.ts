import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../lib/supabase";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables");
      return res.status(500).json({
        success: false,
        error: "Supabase configuration variables are missing",
      });
    }

    const { error } = await supabase.rpc("record_rate_alerts_health_snapshot");
    if (error) {
      console.error("RPC error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log("Rate Guardian Health Snapshot recorded successfully");
    return res.status(200).json({ success: true, message: "Health snapshot recorded" });
  } catch (err: any) {
    console.error("Unexpected error while recording health snapshot:", err);
    return res.status(500).json({ success: false, error: err?.message || String(err) });
  }
}
