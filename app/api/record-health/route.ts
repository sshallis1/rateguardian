import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables");
      return NextResponse.json(
        { success: false, error: "Supabase configuration variables are missing" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const { error } = await supabase.rpc("record_rate_alerts_health_snapshot");
    if (error) {
      console.error("RPC error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log("Rate Guardian Health Snapshot recorded successfully");
    return NextResponse.json({ success: true, message: "Health snapshot recorded" });
  } catch (err: any) {
    console.error("Unexpected error while recording health snapshot:", err);
    return NextResponse.json({ success: false, error: err?.message || String(err) }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export const runtime = "nodejs";
