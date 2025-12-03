import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runEngine } from "../lib/engine/runEngine";
import { log } from "../lib/engine/logger";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const result = await runEngine();
    log({ stage: "engine:api:complete", message: "Engine run finished", run_id: result.run_id, meta: result });
    return res.status(200).json(result);
  } catch (err: any) {
    const message = err?.message || "Engine run failed";
    log({ stage: "engine:api:error", message, meta: { error: err } });
    return res.status(500).json({ error: message });
  }
}
