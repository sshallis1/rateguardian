import { NextResponse } from "next/server";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check for existing contact
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
      // Existing contact — add tag
      await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ tags: ["rg_landing_askrosie"] }),
      });
    } else {
      // New contact — create with tag
      const createRes = await fetch(`${GHL_API_BASE}/contacts/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          locationId: getLocationId(),
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          email,
          phone: phone || undefined,
          source: "Ask Rosie Chat",
          tags: [
            "rg_new_lead_submitted",
            "rg_source_direct",
            "rg_landing_askrosie",
            "rg_lifecycle_shopping",
          ],
        }),
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error("[askrosie intake] GHL create failed:", errText);
        return NextResponse.json(
          { error: "Failed to create contact" },
          { status: 502 }
        );
      }

      const createData = await createRes.json();
      contactId = createData?.contact?.id;
    }

    return NextResponse.json({ ok: true, contactId });
  } catch (error) {
    console.error("[askrosie intake] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
