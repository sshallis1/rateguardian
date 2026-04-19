import { NextResponse } from "next/server";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

const STAGE_TAGS: Record<string, string[]> = {
  buyer: ["rg_stage_buyer"],
  shopper: ["rg_stage_shopper"],
  optimizer: ["rg_stage_optimizer"],
};

const STAGE_TO_PATH: Record<string, string> = {
  buyer: "Starting_Need_Prequalified",
  shopper: "Pre_Approved_Looking",
  optimizer: "Monitoring Rates for Oppty",
};

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
    const { firstName, lastName, email, phone, stage } = body;

    if (!email || !stage) {
      return NextResponse.json(
        { error: "Email and stage are required" },
        { status: 400 }
      );
    }

    const stageTags = STAGE_TAGS[stage] || [];
    const rosiePath = STAGE_TO_PATH[stage] || "Unknown";

    const baseTags = [
      "rg_new_lead_submitted",
      "rg_source_accom",
      "rg_qr_event",
      "rg_doctor_optin",
      "rg_persona_physician",
      ...stageTags,
    ];

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
      // Existing contact — add ACCOM tags
      await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ tags: baseTags }),
      });

      // Update Rosie Path if not already set
      await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          customFields: [
            { key: "rg_rosie_path", field_value: rosiePath },
            { key: "rg_lead_source1", field_value: "ACCOM_Conference" },
          ],
        }),
      });
    } else {
      // New contact
      const createRes = await fetch(`${GHL_API_BASE}/contacts/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          locationId: getLocationId(),
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          email,
          phone: phone || undefined,
          source: "ACCOM Conference QR",
          tags: baseTags,
          customFields: [
            { key: "rg_rosie_path", field_value: rosiePath },
            { key: "rg_lead_source1", field_value: "ACCOM_Conference" },
            { key: "rg_persona_type", field_value: "Physician" },
            { key: "rg_occupation", field_value: "Physician" },
          ],
        }),
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        console.error("[accom intake] GHL create failed:", errText);
        return NextResponse.json(
          { error: "Failed to create contact" },
          { status: 502 }
        );
      }

      const createData = await createRes.json();
      contactId = createData?.contact?.id;
    }

    // Trigger webhook to run routing agent on this contact
    try {
      await fetch(
        `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://shallis-site.vercel.app"}/api/rg/webhook`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contactId,
            locationId: getLocationId(),
            event_type: "accom_intake",
          }),
        }
      );
    } catch (webhookErr) {
      console.warn("[accom intake] webhook trigger failed:", webhookErr);
    }

    return NextResponse.json({ ok: true, contactId, stage });
  } catch (error) {
    console.error("[accom intake] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
