// RG | Ingress | LeverageRX Auto-Intake
// Cron checks Gmail for new LeverageRX lead emails, parses them,
// creates GHL contacts, and fires the routing webhook.
// Schedule: every 15 minutes (vercel.json)

import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

const GHL_API_BASE = "https://services.leadconnectorhq.com";

// Verify cron secret
function verifyCronSecret(req: NextRequest): boolean {
  const secret =
    req.headers.get("x-cron-secret") || req.headers.get("authorization");
  const expected = process.env.CRON_SECRET;
  if (!expected) return true;
  return secret === expected || secret === `Bearer ${expected}`;
}

function getGHLHeaders() {
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

// Parse LeverageRX email body into lead data
function parseLeadEmail(
  subject: string,
  body: string
): {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  loanAmount: string;
  downPayment: string;
} | null {
  // Extract name from subject: "New Mortgage Information Request – So Young Shin in Naperville, IL"
  const subjectMatch = subject.match(
    /New Mortgage Information Request\s*[–—-]\s*(.+?)\s+in\s+(.+?),\s*(\w{2})\s*$/
  );

  // Parse body fields
  const nameMatch = body.match(/Name\s*\n\s*\n\s*(.+)/);
  const locationMatch = body.match(/Location\s*\n\s*\n\s*(.+?),\s*(\w{2})/);
  const emailMatch = body.match(
    /Email\s*\n\s*\n\s*([\w.+-]+@[\w.-]+\.\w+)/
  );
  const phoneMatch = body.match(
    /Phone\s*\n\s*\n\s*\(?(\d{3})\)?\s*(\d{3})[-.)\s]*(\d{4})/
  );
  const loanMatch = body.match(
    /Loan Amount\s*\n\s*\n\s*\$?([\d,]+)/
  );
  const downMatch = body.match(
    /Down Payment\s*\n\s*\n\s*\$?([\d,]+)/
  );

  const fullName =
    nameMatch?.[1]?.trim() || subjectMatch?.[1]?.trim();
  if (!fullName || !emailMatch?.[1]) return null;

  const nameParts = fullName.split(/\s+/);
  const lastName = nameParts.pop() || "";
  const firstName = nameParts.join(" ") || "";

  return {
    firstName,
    lastName,
    city:
      locationMatch?.[1]?.trim() || subjectMatch?.[2]?.trim() || "",
    state: locationMatch?.[2]?.trim() || subjectMatch?.[3]?.trim() || "",
    email: emailMatch[1].trim(),
    phone: phoneMatch
      ? `+1${phoneMatch[1]}${phoneMatch[2]}${phoneMatch[3]}`
      : "",
    loanAmount: loanMatch?.[1]?.replace(/,/g, "") || "",
    downPayment: downMatch?.[1]?.replace(/,/g, "") || "",
  };
}

// Check if contact already exists in GHL
async function findExistingContact(
  email: string
): Promise<string | null> {
  const res = await fetch(
    `${GHL_API_BASE}/contacts/search/duplicate?locationId=${getLocationId()}&email=${encodeURIComponent(email)}`,
    { headers: getGHLHeaders() }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.contact?.id ?? null;
}

// Create GHL contact
async function createGHLContact(lead: ReturnType<typeof parseLeadEmail>) {
  if (!lead) throw new Error("No lead data");

  const tags = [
    "rg_new_lead_submitted",
    "rg_source_leveragerx",
    "rg_doctor_optin",
    "rg_lifecycle_shopping",
    "rg_leveragerx_active",
  ];

  const customFields: Array<{ key: string; field_value: string }> = [
    { key: "rg_persona_type", field_value: "Physician" },
    { key: "rg_occupation", field_value: "Physician" },
    { key: "rg_lead_source1", field_value: "LeverageRX" },
  ];

  if (lead.city)
    customFields.push({ key: "rg_target_city", field_value: lead.city });
  if (lead.state)
    customFields.push({
      key: "rg_target_property_state",
      field_value: lead.state,
    });
  if (lead.loanAmount)
    customFields.push({
      key: "rg_loan_amount",
      field_value: lead.loanAmount,
    });
  if (lead.downPayment)
    customFields.push({
      key: "rg_down_payment_amount",
      field_value: lead.downPayment,
    });

  const res = await fetch(`${GHL_API_BASE}/contacts/`, {
    method: "POST",
    headers: getGHLHeaders(),
    body: JSON.stringify({
      locationId: getLocationId(),
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone || undefined,
      source: "LeverageRX",
      tags,
      customFields,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GHL create failed: ${res.status} ${errText}`);
  }

  const data = await res.json();
  return data?.contact?.id;
}

// Update existing contact with LeverageRX tags
async function updateExistingContact(
  contactId: string,
  lead: ReturnType<typeof parseLeadEmail>
) {
  if (!lead) return;

  // Add tags
  await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
    method: "POST",
    headers: getGHLHeaders(),
    body: JSON.stringify({
      tags: [
        "rg_new_lead_submitted",
        "rg_source_leveragerx",
        "rg_doctor_optin",
        "rg_leveragerx_active",
      ],
    }),
  });

  // Update fields
  const customFields: Array<{ key: string; field_value: string }> = [
    { key: "rg_lead_source1", field_value: "LeverageRX" },
  ];
  if (lead.loanAmount)
    customFields.push({
      key: "rg_loan_amount",
      field_value: lead.loanAmount,
    });

  await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: getGHLHeaders(),
    body: JSON.stringify({ customFields }),
  });
}

// Fire the routing webhook
async function triggerWebhook(contactId: string) {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://shallis-site.vercel.app";

  await fetch(`${baseUrl}/api/rg/webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contactId,
      locationId: getLocationId(),
      event_type: "leveragerx_intake",
    }),
  });
}

export async function POST(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = {
    checked: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [] as string[],
    leads: [] as Array<{ name: string; email: string; city: string; state: string; action: string }>,
  };

  try {
    // Use Gmail API directly via Google service
    // For now, this endpoint accepts lead data POSTed from the cron script
    // The cron script uses Gmail MCP to check emails and POSTs parsed leads here
    const body = await req.json().catch(() => null);

    if (body?.leads && Array.isArray(body.leads)) {
      // Batch mode: cron script sends parsed leads
      for (const lead of body.leads) {
        results.checked++;
        try {
          const existingId = await findExistingContact(lead.email);

          if (existingId) {
            await updateExistingContact(existingId, lead);
            await triggerWebhook(existingId);
            results.updated++;
            results.leads.push({
              name: `${lead.firstName} ${lead.lastName}`,
              email: lead.email,
              city: lead.city,
              state: lead.state,
              action: "updated",
            });
          } else {
            const contactId = await createGHLContact(lead);
            if (contactId) {
              await triggerWebhook(contactId);
              results.created++;
              results.leads.push({
                name: `${lead.firstName} ${lead.lastName}`,
                email: lead.email,
                city: lead.city,
                state: lead.state,
                action: "created",
              });
            }
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown";
          results.errors.push(`${lead.email}: ${msg}`);
        }

        // Throttle between contacts
        await new Promise((r) => setTimeout(r, 500));
      }
    } else if (body?.subject && body?.body) {
      // Single email mode: parse and process
      results.checked = 1;
      const lead = parseLeadEmail(body.subject, body.body);

      if (!lead) {
        results.skipped = 1;
        return NextResponse.json({
          action: "leveragerx_intake",
          ...results,
          reason: "Could not parse email",
        });
      }

      const existingId = await findExistingContact(lead.email);
      if (existingId) {
        await updateExistingContact(existingId, lead);
        await triggerWebhook(existingId);
        results.updated = 1;
        results.leads.push({
          name: `${lead.firstName} ${lead.lastName}`,
          email: lead.email,
          city: lead.city,
          state: lead.state,
          action: "updated",
        });
      } else {
        const contactId = await createGHLContact(lead);
        if (contactId) {
          await triggerWebhook(contactId);
          results.created = 1;
          results.leads.push({
            name: `${lead.firstName} ${lead.lastName}`,
            email: lead.email,
            city: lead.city,
            state: lead.state,
            action: "created",
          });
        }
      }
    }

    console.log("[LeverageRX Intake]", JSON.stringify(results));

    return NextResponse.json({
      action: "leveragerx_intake_complete",
      ...results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[LeverageRX Intake Error]", message);
    return NextResponse.json(
      { action: "error", error: message, partial: results },
      { status: 200 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    service: "RG LeverageRX Auto-Intake",
    status: "operational",
  });
}
