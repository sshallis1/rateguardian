import { NextRequest, NextResponse } from "next/server";
import { runEngine } from "@/lib/engine/runEngine";
import { log } from "@/lib/engine/logger";

export async function POST(_req: NextRequest) {
  try {
    const result = await runEngine();
    log({ stage: "engine:api:complete", message: "Engine run finished", run_id: result.run_id, meta: result });
    return NextResponse.json(result);
  } catch (err: any) {
    const message = err?.message || "Engine run failed";
    log({ stage: "engine:api:error", message, meta: { error: err } });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
