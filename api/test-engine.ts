import type { VercelRequest, VercelResponse } from "@vercel/node";

// Lightweight V8 routing health-check endpoint
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const payload = {
    engine: "healthy-stub",
    message: "V8 routing OK – test-engine reachable",
    timestamp: new Date().toISOString(),
  };

  console.log(JSON.stringify({ stage: "test-engine:hit", message: "Health check invoked", meta: payload }));

  return res.status(200).json(payload);
}
