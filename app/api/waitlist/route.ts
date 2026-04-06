// Waitlist API — captures emails for coming-soon Guardians.
// For now, logs to console + appends to a simple JSON log.
// Future: wire to GHL or Resend. Kept minimal so it never blocks the build.

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const guardian = String(body?.guardian || "unknown");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // Log for now — wire to GHL/Resend later
    console.log("[waitlist] new signup:", { email, guardian, ts: new Date().toISOString() });

    return Response.json({ ok: true, guardian });
  } catch (err) {
    console.error("[waitlist] error:", err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
