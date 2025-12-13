import type { VercelRequest, VercelResponse } from "@vercel/node";

const GHL_BASE_URL = process.env.GHL_BASE_URL || "https://services.leadconnectorhq.com";
const GHL_API_VERSION = process.env.GHL_API_VERSION || "2021-07-28";
const GHL_API_KEY = process.env.GHL_API_KEY || "";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "";

const MATCH_TAGS = ["pipeline test", "rg_mvp_live_test", "test", "test manual trigger", "test tag"];
const TARGET_TAG = "RG_TEST_CANDIDATE";
const PAGE_SIZE = 100;
const MAX_CONTACT_PAGES = 15;
const MAX_TAG_PAGES = 5;

interface GhlContact {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  tags?: string[];
}

interface GhlTag {
  id: string;
  name: string;
}

function buildHeaders(contentType = false) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${GHL_API_KEY}`,
    Version: GHL_API_VERSION,
  };

  if (contentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

async function ghlJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${GHL_BASE_URL}${path}`;
  const res = await fetch(url, { ...init, headers: { ...buildHeaders(init?.body != null), ...(init?.headers as any) } });

  const body = await res.json().catch(() => ({} as T));

  if (!res.ok) {
    const message = typeof (body as any)?.message === "string" ? (body as any).message : res.statusText;
    throw new Error(`GHL request failed (${res.status}): ${message}`);
  }

  return body as T;
}

async function fetchTags(): Promise<GhlTag[]> {
  const tags: GhlTag[] = [];
  let page = 1;

  while (page <= MAX_TAG_PAGES) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
    });

    if (GHL_LOCATION_ID) {
      params.set("locationId", GHL_LOCATION_ID);
    }

    const data = await ghlJson<any>(`/contacts/tags/?${params.toString()}`);
    const pageTags: GhlTag[] = data.tags || data.data || [];
    tags.push(...pageTags);

    const hasMore = Boolean(data.meta?.nextPage) || pageTags.length === PAGE_SIZE;
    if (!hasMore) {
      break;
    }

    page += 1;
  }

  return tags;
}

async function ensureTag(name: string, existing: GhlTag[]) {
  const found = existing.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
  if (found) {
    return found;
  }

  const payload = { name, locationId: GHL_LOCATION_ID || undefined };
  const data = await ghlJson<{ tag: GhlTag }>(`/contacts/tags/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return data.tag;
}

async function fetchContactsByQuery(query: string) {
  return fetchContacts({ query });
}

async function fetchContactsByTag(tagId: string) {
  return fetchContacts({ tagId });
}

async function fetchContacts(params: { query?: string; tagId?: string }) {
  const contacts: GhlContact[] = [];
  let page = 1;

  while (page <= MAX_CONTACT_PAGES) {
    const search = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
    });

    if (GHL_LOCATION_ID) {
      search.set("locationId", GHL_LOCATION_ID);
    }

    if (params.query) {
      search.set("query", params.query);
    }

    if (params.tagId) {
      search.set("tagId", params.tagId);
    }

    const data = await ghlJson<any>(`/contacts/?${search.toString()}`);
    const pageContacts: GhlContact[] = data.contacts || data.data || [];
    contacts.push(...pageContacts);

    const hasMore = Boolean(data.meta?.nextPage) || pageContacts.length === PAGE_SIZE;
    if (!hasMore) {
      break;
    }

    page += 1;
  }

  return contacts;
}

function normalizeName(contact: GhlContact) {
  const parts = [contact.firstName, contact.lastName].filter(Boolean).join(" ");
  if (parts) {
    return parts;
  }
  return contact.name || "(no name)";
}

function hasTestName(contact: GhlContact) {
  const fullName = `${contact.firstName || ""} ${contact.lastName || ""} ${contact.name || ""}`;
  return /test/i.test(fullName);
}

function hasAnyTag(contact: GhlContact, tags: string[]) {
  const contactTags = contact.tags || [];
  return contactTags.some((tag) => tags.includes(tag.toLowerCase()));
}

async function addTagToContact(contactId: string, tagName: string) {
  const payload = { tags: [tagName], locationId: GHL_LOCATION_ID || undefined };
  await ghlJson(`/contacts/${contactId}/tags/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!GHL_API_KEY) {
      return res.status(500).json({ error: "Missing GHL_API_KEY" });
    }

    const tags = await fetchTags();
    await ensureTag(TARGET_TAG, tags);

    const lowerMatchTags = MATCH_TAGS.map((tag) => tag.toLowerCase());
    const tagLookup = new Map(tags.map((tag) => [tag.name.toLowerCase(), tag.id]));
    const candidateTagIds = lowerMatchTags.map((t) => tagLookup.get(t)).filter(Boolean) as string[];

    const candidates = new Map<string, GhlContact>();

    const nameMatches = await fetchContactsByQuery("test");
    for (const c of nameMatches) {
      candidates.set(c.id, c);
    }

    for (const tagId of candidateTagIds) {
      const taggedContacts = await fetchContactsByTag(tagId);
      for (const c of taggedContacts) {
        candidates.set(c.id, c);
      }
    }

    const qualifying = Array.from(candidates.values()).filter((contact) => {
      const nameIsTest = hasTestName(contact);
      const tagMatch = hasAnyTag(contact, lowerMatchTags);
      return nameIsTest || tagMatch;
    });

    const reportTags: Record<string, number> = {};
    let added = 0;
    let alreadyTagged = 0;
    let failures = 0;
    const errors: string[] = [];

    for (const contact of qualifying) {
      for (const tag of contact.tags || []) {
        const key = tag || "(untitled)";
        reportTags[key] = (reportTags[key] || 0) + 1;
      }

      const currentTags = (contact.tags || []).map((t) => t.toLowerCase());
      if (currentTags.includes(TARGET_TAG.toLowerCase())) {
        alreadyTagged += 1;
        continue;
      }

      try {
        await addTagToContact(contact.id, TARGET_TAG);
        added += 1;
      } catch (err: any) {
        failures += 1;
        errors.push(`contact ${contact.id}: ${err?.message || String(err)}`);
      }
    }

    const sampleNames = qualifying
      .slice(0, 20)
      .map((c) => normalizeName(c))
      .filter(Boolean);

    return res.status(200).json({
      message: "Classification completed without deletions.",
      total_candidates: qualifying.length,
      sample_names: sampleNames,
      existing_tag_summary: reportTags,
      tagging: {
        added,
        already_had_tag: alreadyTagged,
        failed: failures,
        errors,
      },
      guardrails: {
        deletion_performed: false,
        workflows_triggered: false,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "Classification failed",
      details: err?.message || String(err),
    });
  }
}
