import { NextRequest, NextResponse } from "next/server";
import { normalizeLead } from "@/lib/normalizer";
import { supabase } from "@/lib/supabase";
import type { LeadPayload } from "@/types/payloads";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
    }

    const normalized: LeadPayload = normalizeLead(body);

    if (!normalized.email && !normalized.phone) {
      return NextResponse.json(
        { error: "Lead must include at least an email or phone." },
        { status: 400 }
      );
    }

    const fullName =
      normalized.full_name ||
      [normalized.first_name, normalized.last_name].filter(Boolean).join(" ") ||
      null;

    const contactRow = {
      email: normalized.email ?? null,
      phone: normalized.phone ?? null,
      name: fullName,
      rg_source: "intake_v8",
    };

    const { data, error } = await supabase
      .from("contacts")
      .upsert(contactRow, { onConflict: "email" })
      .select();

    if (error) {
      console.error("Supabase write error:", error);
      return NextResponse.json(
        { error: "Database write failed", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Lead submitted successfully (V8 normalized, Next.js).",
        normalized,
        supabase_row: data,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Unhandled /api/intake error:", err);
    return NextResponse.json(
      { error: "Unexpected server error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
