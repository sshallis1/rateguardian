import * as crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { log } from "../lib/engine/logger";

const WEBHOOK_SECRET = process.env.ROSIE_WEBHOOK_SECRET || "";

function verifySignature(body: string, signature: string) {
  if (!WEBHOOK_SECRET) throw new Error("Missing ROSIE_WEBHOOK_SECRET");
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(digest, "hex"));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!WEBHOOK_SECRET) {
      log({ stage: "rosie-alert:config", message: "ROSIE_WEBHOOK_SECRET not configured" });
      return res.status(500).json({ error: "ROSIE_WEBHOOK_SECRET not configured" });
    }

    const signature = (req.headers?.["x-rosie-signature"] as string | undefined) ?? "";
    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});

    if (!signature || !verifySignature(rawBody, signature)) {
      log({
        stage: "rosie-alert:signature:invalid",
        message: "Invalid or missing signature",
        meta: { hasSignature: Boolean(signature) },
      });
      return res.status(401).json({ error: "Invalid or missing signature" });
    }

    log({ stage: "rosie-alert:verified", message: "Verified alert", meta: { body: req.body } });
    return res.status(200).json({ status: "received", data: req.body });
  } catch (err: any) {
    log({ stage: "rosie-alert:error", message: err?.message || "Internal error", meta: { error: err } });
    return res.status(500).json({ error: err?.message || "Internal error" });
  }
}
