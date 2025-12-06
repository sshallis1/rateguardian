import * as crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import type { Tables } from "@/types/supabase";
import { supabase } from "@/lib/supabase";
import { log } from "@/lib/engine/logger";

const ROSIE_WEBHOOK_URL = process.env.ROSIE_WEBHOOK_URL || "";
const ROSIE_WEBHOOK_SECRET = process.env.ROSIE_WEBHOOK_SECRET || "";
const MAX_RETRIES = 3;
const MAX_BATCH = 20;

function sign(body: string) {
  return crypto.createHmac("sha256", ROSIE_WEBHOOK_SECRET).update(body).digest("hex");
}

async function deliver(alert: Tables["alerts"]["Row"]) {
  const body = JSON.stringify({
    id: alert.id,
    contact_id: alert.contact_id,
    name: alert.name,
    loan_type: alert.loan_type,
    current_rate: alert.current_rate,
    market_rate: alert.market_rate,
    delta: alert.delta,
    estimated_savings: alert.estimated_savings,
    message_type: alert.message_type,
    timestamp: alert.inserted_at,
  });

  const headers = {
    "Content-Type": "application/json",
    "X-Rosie-Signature": sign(body),
    "X-Alert-Id": String(alert.id),
  };

  let attempt = 0;
  let lastErr: any = null;
  while (attempt < MAX_RETRIES) {
    attempt += 1;
    try {
      const res = await fetch(ROSIE_WEBHOOK_URL, { method: "POST", headers, body });
      if (res.ok) return { ok: true };
      lastErr = await res.text();
    } catch (e: any) {
      lastErr = e?.message || String(e);
    }
    await new Promise((r) => setTimeout(r, 300 * attempt));
  }
  return { ok: false, error: lastErr };
}

export async function GET(req: NextRequest) {
  if (!ROSIE_WEBHOOK_URL || !ROSIE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing ROSIE webhook configuration" }, { status: 500 });
  }

  const method = req.method.toUpperCase();
  if (method !== "GET" && method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const { data: alerts, error } = await supabase
      .from("alerts")
      .select("*")
      .eq("alert_sent", false)
      .order("inserted_at", { ascending: true })
      .limit(MAX_BATCH);

    if (error) {
      throw error;
    }

    const alertRows = (alerts ?? []) as Tables["alerts"]["Row"][];

    if (!alertRows.length) {
      return NextResponse.json({ message: "No unsent alerts." });
    }

    let sent = 0;
    for (const a of alertRows) {
      const result = await deliver(a);
      if (result.ok) {
        const { error: updateError } = await supabase
          .from("alerts")
          .update({
            alert_sent: true,
            processed_at: new Date().toISOString(),
            attempts: (a.attempts ?? 0) + 1,
            last_error: null,
          })
          .eq("id", a.id);
        if (updateError) {
          log({ stage: "fetch-alerts:update:error", message: "Failed to mark alert sent", meta: { error: updateError, alertId: a.id } });
        }
        sent += 1;
      } else {
        const { error: updateError } = await supabase
          .from("alerts")
          .update({ attempts: (a.attempts ?? 0) + 1, last_error: String(result.error).slice(0, 2000) })
          .eq("id", a.id);
        if (updateError) {
          log({ stage: "fetch-alerts:update:error", message: "Failed to update alert attempts", meta: { error: updateError, alertId: a.id } });
        }
      }
    }

    return NextResponse.json({ status: "ok", sent });
  } catch (err: any) {
    log({ stage: "fetch-alerts:error", message: err?.message || "Relay error", meta: { error: err } });
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}

export const runtime = "nodejs";
