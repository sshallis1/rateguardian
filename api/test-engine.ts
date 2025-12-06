import type { VercelRequest, VercelResponse } from "@vercel/node";

// Minimal V8 routing health-check endpoint
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = (req?.method || "").toUpperCase();

  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  if (method !== "GET" && method !== "HEAD" && method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const payload = {
    engine: "healthy-stub",
    message: "V8 routing OK – test-engine reachable",
    timestamp: new Date().toISOString(),
  };

  console.log(
    JSON.stringify({
      stage: "test-engine:hit",
      message: "Health check invoked",
      meta: { method, ...payload },
      timestamp: new Date().toISOString(),
    })
  );

  return res.status(200).json(payload);
}
