import * as crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { log } from "@/lib/engine/logger";

const WEBHOOK_SECRET = process.env.ROSIE_WEBHOOK_SECRET || "";

function verifySignature(body: string, signature: string) {
  if (!WEBHOOK_SECRET) throw new Error("Missing ROSIE_WEBHOOK_SECRET");
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(digest, "hex"));
}

export async function POST(req: NextRequest) {
  try {
    if (!WEBHOOK_SECRET) {
      log({ stage: "rosie-alert:config", message: "ROSIE_WEBHOOK_SECRET not configured" });
      return NextResponse.json({ error: "ROSIE_WEBHOOK_SECRET not configured" }, { status: 500 });
    }

    const rawBody = await req.text();
    const signature = (req.headers.get("x-rosie-signature") as string | null) ?? "";

    if (!signature || !verifySignature(rawBody, signature)) {
      log({
        stage: "rosie-alert:signature:invalid",
        message: "Invalid or missing signature",
        meta: { hasSignature: Boolean(signature) },
      });
      return NextResponse.json({ error: "Invalid or missing signature" }, { status: 401 });
    }

    const parsedBody = rawBody ? JSON.parse(rawBody) : {};
    log({ stage: "rosie-alert:verified", message: "Verified alert", meta: { body: parsedBody } });
    return NextResponse.json({ status: "received", data: parsedBody });
  } catch (err: any) {
    log({ stage: "rosie-alert:error", message: err?.message || "Internal error", meta: { error: err } });
    return NextResponse.json({ error: err?.message || "Internal error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export const runtime = "nodejs";
