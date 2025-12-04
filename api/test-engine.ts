import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runEngine } from "../lib/engine/runEngine";
import { log } from "../lib/engine/logger";
import { assertSupabaseConfig } from "../lib/supabase";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET" && req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const limitRaw = req.query?.limit;
    const parsedLimit = limitRaw !== undefined ? Number(limitRaw) : undefined;
    if (parsedLimit !== undefined && (!Number.isFinite(parsedLimit) || parsedLimit <= 0)) {
      return res.status(400).json({ error: "Invalid limit" });
    }

    const contactId = req.query?.contact_id ? String(req.query.contact_id) : undefined;
    const email = req.query?.email ? String(req.query.email).toLowerCase() : undefined;

    const limit = parsedLimit;

    if (!assertSupabaseConfig("test-engine")) {
      return res.status(500).json({ error: "Supabase not configured" });
    }

    const result = await runEngine({ limit, contactId, email });
    log({ stage: "test-engine:complete", message: "Manual engine run complete", run_id: result.run_id, meta: result });
    return res.status(200).json(result);
  } catch (err: any) {
    const message = err?.message || "Test engine failure";
    log({ stage: "test-engine:error", message, meta: { error: err } });
    return res.status(500).json({ error: message });
  }
}
