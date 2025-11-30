import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// FIXED RELATIVE IMPORTS
import type { LeadPayload } from "../types/payloads";
import { normalizeLead } from "../lib/normalizer";
import type { Database } from "../types/supabase";

// ─────────────────────────────────────────────────────────
//  Initialize Supabase Client (Typed)
// ─────────────────────────────────────────────────────────
const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// ─────────────────────────────────────────────────────────
//  /api/intake — V5-Native Intake Handler
// ─────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid or missing JSON body" });
    }

    // ─────────────────────────────────────────────────────
    //  Normalize Inbound Payload (legacy → V5 conversion)
    // ─────────────────────────────────────────────────────
    const normalized: LeadPayload = normalizeLead(req.body);

    // Validate essential fields (you can expand this as needed)
    if (!normalized.email && !normalized.phone) {
      return res.status(400).json({
        error: "Lead must include at least an email or phone.",
      });
    }

    // ─────────────────────────────────────────────────────
    //  Insert or Update Lead in Supabase
    // ─────────────────────────────────────────────────────
    const { data, error } = await supabase
      .from("leads")
      .upsert(normalized, { onConflict: "email" }) // 🚨 you can change onConflict to your PK
      .select();

    if (error) {
      console.error("Supabase write error:", error);
      return res.status(500).json({ error: "Database write failed", details: error });
    }

    // ─────────────────────────────────────────────────────
    //  Success — return normalized lead for verification
    // ─────────────────────────────────────────────────────
    return res.status(200).json({
      message: "Lead submitted successfully (V5 normalized)",
      normalized,
      supabase_row: data,
    });

  } catch (err: any) {
    console.error("Unhandled /api/intake error:", err);
    return res.status(500).json({
      error: "Unexpected server error",
      details: err?.message || err,
    });
  }
}
