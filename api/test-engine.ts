// Minimal V8 routing health-check endpoint without external type deps
interface Req {
  method?: string;
}

interface Res {
  status: (code: number) => Res;
  json: (body: any) => void;
  send: (body: any) => void;
}

export default function handler(req: Req, res: Res) {
  const method = (req?.method || "").toUpperCase();

  if (method === "OPTIONS") {
    return res.status(200).send("ok");
  }

  if (method && method !== "GET" && method !== "HEAD" && method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
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
      meta: { method, ...payload },
      timestamp: new Date().toISOString(),
    })
  );

  return res.status(200).json(payload);
}
