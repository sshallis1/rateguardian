import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("contacts").select("id, email").limit(1);

    return NextResponse.json({
      engine: "healthy-stub",
      supabase: error ? "error" : "connected",
      sample_contact: data?.[0] ?? null,
      bps_example: {
        existing_rate: 6.5,
        market_rate: 6.25,
        rate_delta_percent: 0.25,
        rate_delta_bps: Math.round(0.25 * 100),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        engine: "unhealthy",
        error: err?.message || String(err),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}
