import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const forward = await fetch("https://your-vercel-app.vercel.app/api/rosie-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await forward.text();
    return NextResponse.json({ status: "ok", message: "Alert relayed to Rosie", result });
  } catch (err: any) {
    console.error("Forwarding failed", err);
    return NextResponse.json({ error: "Forwarding failed", detail: err?.message || String(err) }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
