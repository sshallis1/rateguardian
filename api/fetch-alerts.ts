import * as crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Tables } from "../types/supabase";
import { supabase } from "../lib/supabase";
import { log } from "../lib/engine/logger";

const ROSIE_WEBHOOK_URL = process.env.ROSIE_WEBHOOK_URL || "";
const ROSIE_WEBHOOK_SECRET = process.env.ROSIE_WEBHOOK_SECRET || "";
const MAX_RETRIES = 3;
const MAX_BATCH = 20;
const LOCK_JOB = "fetch-alerts";

function getWindowKey(date = new Date()) {
  const minutes = date.getUTCMinutes();
  const bucketStartMinutes = Math.floor(minutes / 15) * 15;
  const bucketDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      bucketStartMinutes,
      0,
      0,
    ),
  );

  return bucketDate.toISOString();
}

async function acquireLock(windowKey: string) {
  const { error } = await supabase
    .from("cron_locks")
    .insert({ job: LOCK_JOB, window_key: windowKey } as any);

  if (!error) {
    return { ok: true as const };
  }

  if ((error as any)?.code === "23505") {
    return { ok: false as const, reason: "already_ran" as const };
  }

  return { ok: false as const, reason: "db_error" as const, error };
}

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const auth =
      typeof req.headers.get === "function"
        ? req.headers.get("authorization")
        : (req.headers as any).authorization;

    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: "Unauthorized cron invocation" });
    }

    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!ROSIE_WEBHOOK_URL || !ROSIE_WEBHOOK_SECRET) {
      return res.status(500).json({ error: "Missing ROSIE webhook configuration" });
    }

    const windowKey = getWindowKey();
    const lockResult = await acquireLock(windowKey);

    if (lockResult.ok) {
      log({ stage: "fetch-alerts:lock:acquired", message: "Lock acquired", meta: { windowKey } });
    } else if (lockResult.reason === "already_ran") {
      log({ stage: "fetch-alerts:lock:skipped", message: "Lock already exists", meta: { windowKey } });
      return res.status(200).json({ message: "Already ran this window" });
    } else {
      log({ stage: "fetch-alerts:lock:error", message: "Failed to acquire lock", meta: { windowKey, error: lockResult.error } });
      return res.status(500).json({ error: "Failed to acquire cron lock" });
    }

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
      return res.status(200).json({ message: "No unsent alerts." });
    }

    let sent = 0;
    for (const a of alertRows) {
      const result = await deliver(a);
      if (result.ok) {
        const { error: updateError } = await supabase
          .from("alerts")
          .update({ alert_sent: true, processed_at: new Date().toISOString(), attempts: (a.attempts ?? 0) + 1, last_error: null })
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

    return res.status(200).json({ status: "ok", sent });
  } catch (err: any) {
    log({ stage: "fetch-alerts:error", message: err?.message || "Relay error", meta: { error: err } });
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
