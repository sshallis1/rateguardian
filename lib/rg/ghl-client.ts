// Rate Guardian — GHL API Client
// Handles all communication with GoHighLevel

import {
  type GHLContact,
  type RoutingDecision,
  RG_FIELDS,
} from "./types";

// GHL v1 API (sub-account JWT token) — v2 requires OAuth
const GHL_API_BASE = "https://rest.gohighlevel.com/v1";

function getHeaders() {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) throw new Error("GHL_API_KEY not configured");
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
}

function getLocationId() {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error("GHL_LOCATION_ID not configured");
  return id;
}

// Fetch a contact by ID
export async function getContact(contactId: string): Promise<GHLContact> {
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error(`GHL getContact failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.contact;
}

// Update contact custom fields after routing decision
export async function updateContactFields(
  contactId: string,
  decision: RoutingDecision
) {
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      customFields: [
        { key: RG_FIELDS.ROUTING_DECISION, value: JSON.stringify(decision.sequence) },
        { key: RG_FIELDS.ROUTING_SEGMENT, value: decision.segment },
        { key: RG_FIELDS.ROUTING_PRIORITY, value: decision.priority },
      ],
    }),
  });
  if (!res.ok) {
    throw new Error(`GHL updateContact failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Add tags to a contact
export async function addTags(contactId: string, tags: string[]) {
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ tags }),
  });
  if (!res.ok) {
    throw new Error(`GHL addTags failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Remove tags from a contact
export async function removeTags(contactId: string, tags: string[]) {
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify({ tags }),
  });
  if (!res.ok) {
    throw new Error(`GHL removeTags failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Move contact to a pipeline stage
export async function moveToPipelineStage(
  contactId: string,
  pipelineId: string,
  stageId: string
) {
  const res = await fetch(
    `${GHL_API_BASE}/opportunities/upsert`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        pipelineId,
        locationId: getLocationId(),
        contactId,
        pipelineStageId: stageId,
        name: `RG Lead - ${contactId}`,
        status: "open",
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`GHL moveToPipeline failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Trigger a specific workflow for a contact
export async function triggerWorkflow(workflowId: string, contactId: string) {
  const res = await fetch(
    `${GHL_API_BASE}/contacts/${contactId}/workflow/${workflowId}`,
    {
      method: "POST",
      headers: getHeaders(),
    }
  );
  if (!res.ok) {
    throw new Error(`GHL triggerWorkflow failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// List all workflows (for audit)
export async function listWorkflows() {
  const res = await fetch(
    `${GHL_API_BASE}/workflows/?locationId=${getLocationId()}`,
    { headers: getHeaders() }
  );
  if (!res.ok) {
    throw new Error(`GHL listWorkflows failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Search contacts by custom field or tag
export async function searchContacts(query: string) {
  const res = await fetch(
    `${GHL_API_BASE}/contacts/search/duplicate?locationId=${getLocationId()}&${query}`,
    { headers: getHeaders() }
  );
  if (!res.ok) {
    throw new Error(`GHL searchContacts failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Update a single custom field on a contact
export async function updateCustomField(
  contactId: string,
  fieldKey: string,
  value: string
) {
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      customFields: [{ key: fieldKey, value }],
    }),
  });
  if (!res.ok) {
    throw new Error(`GHL updateCustomField failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Update multiple custom fields on a contact
export async function updateCustomFields(
  contactId: string,
  fields: Array<{ key: string; value: string }>
) {
  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ customFields: fields }),
  });
  if (!res.ok) {
    throw new Error(`GHL updateCustomFields failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// List contacts with pagination (for scheduled scans)
export async function listContacts(limit = 20, startAfterId?: string) {
  let url = `${GHL_API_BASE}/contacts/?locationId=${getLocationId()}&limit=${limit}`;
  if (startAfterId) url += `&startAfterId=${startAfterId}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    throw new Error(`GHL listContacts failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Send internal notification email via GHL
export async function sendEmail(
  contactId: string,
  toEmail: string,
  subject: string,
  body: string
) {
  const res = await fetch(
    `${GHL_API_BASE}/contacts/${contactId}/notes`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        body: `📧 INTERNAL NOTIFICATION\nTo: ${toEmail}\nSubject: ${subject}\n\n${body}`,
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`GHL sendEmail failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Check if contact has a specific tag
export function hasTag(contact: GHLContact, tag: string): boolean {
  return contact.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()) ?? false;
}
