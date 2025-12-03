import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runEngine } from "../lib/engine/runEngine";
import { log } from "../lib/engine/logger";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const contactId = req.query.contact_id as string | undefined;
    const email = req.query.email as string | undefined;

    const result = await runEngine({ limit, contactId, email });
    log({ stage: "test-engine:complete", message: "Manual engine run complete", run_id: result.run_id, meta: result });
    return res.status(200).json(result);
  } catch (err: any) {
    const message = err?.message || "Test engine failure";
    log({ stage: "test-engine:error", message, meta: { error: err } });
    return res.status(500).json({ error: message });
  }
}
