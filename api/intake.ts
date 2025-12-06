import type { VercelRequest, VercelResponse } from "@vercel/node";

import { normalizeLead } from "../lib/normalizer";
import { supabase } from "../lib/supabase";
import type { LeadPayload } from "../types/payloads";

// ────────────────────────────────────────────────
//  /api/intake (V7 Hardened)
// ────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ error: "Invalid or missing JSON body" });
    }

    // Normalize inbound payload
    const normalized: LeadPayload = normalizeLead(req.body);

    if (!normalized.email && !normalized.phone) {
      return res.status(400).json({
        error: "Lead must include at least an email or phone.",
      });
    }

    // Compose name safely
    const fullName =
      normalized.full_name ||
      [normalized.first_name, normalized.last_name].filter(Boolean).join(" ") ||
      null;

    // Only insert valid DB fields
    const contactRow = {
      email: normalized.email ?? null,
      phone: normalized.phone ?? null,
      name: fullName,
      rg_source: "intake_v7",
    };

    const { data, error } = await supabase
      .from("contacts")
      .upsert(contactRow, { onConflict: "email" })
      .select();

    if (error) {
      console.error("Supabase write error:", error);
      return res.status(500).json({
        error: "Database write failed",
        details: error,
      });
    }

    return res.status(200).json({
      message: "Lead submitted successfully (V7 normalized).",
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
