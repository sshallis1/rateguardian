import { NextResponse } from "next/server";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const PDF_URL = "https://assets.cdn.filesafe.space/Mymg9zFjvZ8ognhb9J1Q/media/69e6bea0774ef96b9bde1e87.pdf";

function getHeaders() {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) throw new Error("GHL_API_KEY not configured");
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Version: "2021-07-28",
  };
}

function getLocationId() {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error("GHL_LOCATION_ID not configured");
  return id;
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw.startsWith("+") ? raw : `+${digits}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = String(body?.firstName || "").trim();
    const lastName = String(body?.lastName || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const phoneRaw = String(body?.phone || "").trim();
    const smsConsent = Boolean(body?.smsConsent);

    if (!firstName) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phoneRaw || phoneRaw.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Valid phone is required" }, { status: 400 });
    }
    if (!smsConsent) {
      return NextResponse.json(
        { error: "SMS consent is required to receive the download" },
        { status: 400 }
      );
    }

    const phone = normalizePhone(phoneRaw);
    const tags = [
      "rg_new_lead_submitted",
      "rg_source_10x_formula",
      "rg_sms_consent",
      "rg_lead_magnet_personal_development",
    ];

    const searchRes = await fetch(
      `${GHL_API_BASE}/contacts/search/duplicate?locationId=${getLocationId()}&email=${encodeURIComponent(email)}`,
      { headers: getHeaders() }
    );

    let contactId: string | null = null;
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      contactId = searchData?.contact?.id ?? null;
    }

    if (contactId) {
      await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ tags }),
      });
    } else {
      const createRes = await fetch(`${GHL_API_BASE}/contacts/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          locationId: getLocationId(),
          firstName,
          lastName: lastName || undefined,
          email,
          phone,
          source: "10X Personal Success Formula",
          tags,
        }),
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error("[10x-formula intake] GHL create failed:", errText);
        return NextResponse.json({ error: "Failed to register download" }, { status: 502 });
      }

      const createData = await createRes.json();
      contactId = createData?.contact?.id ?? null;
    }

    return NextResponse.json({ ok: true, contactId, downloadUrl: PDF_URL });
  } catch (error) {
    console.error("[10x-formula intake] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
