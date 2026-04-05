// Rate Guardian — GHL API Client
// Handles all communication with GoHighLevel

import {
  type GHLContact,
  type RoutingDecision,
  RG_FIELDS,
} from "./types";
import { GHL_FIELD_REVERSE } from "./field-map";

// GHL v2 API (Private Integration token)
const GHL_API_BASE = "https://services.leadconnectorhq.com";

// Rate limiter: 200ms between calls, retry on 429 with backoff
const THROTTLE_MS = 200;
let lastCallTime = 0;

async function throttledFetch(url: string, init?: RequestInit): Promise<Response> {
  const elapsed = Date.now() - lastCallTime;
  if (elapsed < THROTTLE_MS) {
    await new Promise(r => setTimeout(r, THROTTLE_MS - elapsed));
  }
  lastCallTime = Date.now();

  const res = await fetch(url, init);
  if (res.status === 429) {
    // Back off 2s on rate limit, retry once
    await new Promise(r => setTimeout(r, 2000));
    lastCallTime = Date.now();
    return fetch(url, init);
  }
  return res;
}

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

// Fetch a contact by ID
export async function getContact(contactId: string): Promise<GHLContact> {
  const res = await throttledFetch(`${GHL_API_BASE}/contacts/${contactId}`, {
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
  const res = await throttledFetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      customFields: [
        { id: "BU8A35a09Ui4d0Me60tP", field_value: JSON.stringify(decision.sequence) },
        { id: "4hJx8G5OCkOrtgvzcrUJ", field_value: decision.segment },
        { id: "iD8M1nsShFyCz28QtX3t", field_value: decision.priority },
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
  const res = await throttledFetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
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
  const res = await throttledFetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
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
  const res = await throttledFetch(
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
  const res = await throttledFetch(
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
  const res = await throttledFetch(
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
  const res = await throttledFetch(
    `${GHL_API_BASE}/contacts/search/duplicate?locationId=${getLocationId()}&${query}`,
    { headers: getHeaders() }
  );
  if (!res.ok) {
    throw new Error(`GHL searchContacts failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Resolve a field name to GHL ID format for writes
function toGHLField(fieldName: string, value: string): { id: string; field_value: string } {
  const id = GHL_FIELD_REVERSE[fieldName];
  if (!id) throw new Error(`Unknown GHL field: ${fieldName} — add it to field-map.ts`);
  return { id, field_value: value };
}

// Update a single custom field on a contact
export async function updateCustomField(
  contactId: string,
  fieldName: string,
  value: string
) {
  const res = await throttledFetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      customFields: [toGHLField(fieldName, value)],
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
  const res = await throttledFetch(`${GHL_API_BASE}/contacts/${contactId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      customFields: fields.map(f => toGHLField(f.key, f.value)),
    }),
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
  const res = await throttledFetch(url, { headers: getHeaders() });
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
  const res = await throttledFetch(
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

// Search contacts by tag (returns contacts with customFields — no need for individual getContact)
export async function searchContactsByTag(tag: string, page = 1, pageLimit = 20) {
  const res = await throttledFetch(
    `${GHL_API_BASE}/contacts/search`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        locationId: getLocationId(),
        filters: [{ field: "tags", operator: "contains", value: tag }],
        page,
        pageLimit,
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`GHL searchContactsByTag failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Check if contact has a specific tag
export function hasTag(contact: GHLContact, tag: string): boolean {
  return contact.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()) ?? false;
}
