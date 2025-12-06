import type { VercelRequest, VercelResponse } from "@vercel/node";

// Minimal health-check endpoint to verify Vercel routing for the engine
export default function handler(req: VercelRequest, res: VercelResponse) {
  const method = (req?.method || "").toUpperCase();

  if (method && !["GET", "HEAD", "POST", "OPTIONS"].includes(method)) {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  const payload = {
    engine: "healthy-stub",
    message: "V8 routing OK",
    timestamp: new Date().toISOString(),
  };

  console.log(
    JSON.stringify({
      stage: "test-engine:hit",
      message: "Health check invoked",
      meta: { method: method || "UNKNOWN" },
      timestamp: payload.timestamp,
    })
  );

  return res.status(200).json(payload);
}
