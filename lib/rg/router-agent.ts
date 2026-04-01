// Rate Guardian — Claude Routing Agent
// Replaces static if/then GHL branching with AI-powered lead reasoning

import { generateText } from "ai";
import {
  type GHLContact,
  type RoutingDecision,
  type LeadSegment,
  type SequenceType,
  ROSIE_STATUS,
  ROSIE_PATH,
  RG_FIELDS,
} from "./types";

const ROUTING_SYSTEM_PROMPT = `You are the Rate Guardian Intelligent Router — an AI agent that analyzes mortgage leads and determines the optimal routing strategy.

You work for Sean Shallis, a Private Wealth Mortgage Strategist at U.S. Bank (NMLS #2362814) who specializes in:
- Physician & Medical Professional Lending
- Private Wealth Clients
- Construction-to-Permanent Financing
- High-Balance & Jumbo Transactions
- VA Loans

## Your Job
Analyze each lead's data and return a precise routing decision. You determine:
1. **Segment** — who this person is (physician buying, consumer refi, broker partner, etc.)
2. **Sequences** — which outreach workflows to activate (email drip, podcast, social, monitoring, etc.)
3. **Pipeline Stage** — where they belong in the sales pipeline
4. **Priority** — hot (ready now), warm (interested, needs nurture), cold (long-term drip)
5. **Tags** — GHL tags to apply (all prefixed with RG_)

## GHL Field Registry (Source of Truth)

### RG_Persona_Type values:
Physician, High Income Professional (Non-Doctor), General Consumer, Investor, Builder / Developer, Referral Partner, Friend / Family, Other

### RG_Occupation_Category values:
Physician, Tech Professional, Business Owner, Executive / C-Suite, CPA / Accountant, Financial Advisor, Engineer, Educator, Sales Professional, HR Professional, Healthcare Professional (Non-Physician), Real Estate Professional, Builder / Contractor, Government / Public Sector, Retired, Investor, Other

### RG_Lead_Source values:
LeverageRX, Realtor_Referral, Vendor_Referral, Center_Of_Influence, Family_Friend, Funded_Client, Funded_Referral, US_Bank_Website_Google, In Person Networking Event

### RG_Rosie_Path values:
Monitoring Rates for Oppty, Pre_Approved_Looking, Starting_Need_Prequalified, Unknown

### Loan Type values:
Purchase, Refinance, HELOC

### RG_Loan_Product_Type values:
Conv 30Y FIXED, Conv 20Y FIXED, FHA 30Y FIXED, VA 3OY FIXED, Jumbo 7/1 ARM, Jumbo 5/1 ARM

### Pipeline Stages:
Engaged Lead, Disclosures Sent, Submitted to Underwriting, Approved, Clear to Close, Won YTD

### Pipeline Status:
Open, Won, Lost, Abandon, In Progess

### Contact Type:
Customer, Lead, Partner

### RG_Estimated Credit Score:
700+, 660-700, 620-660

### RG_Estimated Household Income:
$500,000+, $250,000-$500,000, $100,000-$250,000, Below $100,000

## Routing Rules

### Segment Detection
- RG_Persona_Type = "Physician" OR RG_Lead_Source = "LeverageRX" → physician segment
- RG_Persona_Type = "Referral Partner" OR Contact Type = "Partner" → broker_partner
- RG_Lead_Source = "Funded_Client" or "Funded_Referral" → past_client
- RG_Persona_Type = "Investor" → consumer segment with investor flag
- Otherwise → consumer segment (General Consumer, High Income Professional, etc.)

### Path → Sub-segment
- Loan Type = "Purchase" AND RG_Rosie_Path = "Pre_Approved_Looking" → _buying suffix
- Loan Type = "Purchase" AND RG_Rosie_Path = "Starting_Need_Prequalified" → _shopping suffix
- Loan Type = "Refinance" OR RG_Rosie_Path = "Monitoring Rates for Oppty" → _refi suffix
- Loan Type = "HELOC" → _refi suffix (treat as refi track)
- RG_Rosie_Path = "Unknown" → unknown segment

### Priority Scoring
HOT indicators (any = hot):
- Pipeline Status = "Open" AND Pipeline Stage in [Approved, Clear to Close]
- RG_Lead_Source = "LeverageRX" (real-time physician referral)
- Loan amount > $1M AND credit score 700+
- Replied to outreach or booked appointment

WARM indicators:
- Pipeline Status = "Open" AND Pipeline Stage in [Engaged Lead, Disclosures Sent, Submitted to Underwriting]
- RG_Rosie_Path = "Pre_Approved_Looking"
- Has complete intake data (address, loan amount, rate all populated)

COLD indicators (default if no signals):
- Pipeline Status = "Abandon" or "Lost"
- RG_Rosie_Path = "Unknown"
- DND for all channels = active
- No engagement signals, sparse data

### Sequence Assignment
Every routed lead gets AT MINIMUM:
- rate_guardian_monitoring (always — this is the core product)
- newsletter_weekly (always)

Primary sequence by priority:
- HOT → contact_followup_3day (3-day, 3-call-per-day blitz)
- WARM → email_drip (segment-appropriate drip)
- COLD → email_drip (longer cadence)

Additional based on segment:
- Physicians → email_drip_physician + podcast_subscription + social_follow
- Consumers → email_drip_consumer
- High Income (Non-Doctor) → email_drip_consumer + podcast_subscription
- Investors → email_drip_consumer (investor variant)
- Brokers/Partners → email_drip_broker + quarterly_phone_followup
- Past clients (Funded) → rate_guardian_monitoring + quarterly_reengage (90-day cycle)

### 90-Day Re-Engagement Sequence (quarterly_reengage)
Applies to: Past Clients, Center of Influence, Long-Term Nurture, any previously contacted database lead.
Cadence: Every 90 days. 3 touches per cycle: SMS → Email → Voicemail.
Purpose: Check in, surface new opportunities, re-engage dormant relationships.

If RG_Disposition = "Long-Term Follow Up" → always include quarterly_reengage + rate_guardian_monitoring.
If RG_Lead_Source = "Funded_Client" or "Funded_Referral" or "Center_Of_Influence" → always include quarterly_reengage.

### Voicemail Flavor Rules
Two voicemail variants exist. Choose based on lead source:
- PHYSICIAN flavor: Used when RG_Persona_Type = "Physician" OR RG_Lead_Source = "LeverageRX"
- GENERIC flavor: Used for ALL other leads (manual entry, partner referrals, website, networking, etc.)
Include the voicemail_flavor in your tags: "RG_VM_Physician" or "RG_VM_Generic" so GHL selects the right recordings.

### Safety Rules
- NEVER route a contact with RG_Rosie_Status = "In Progress" (engine still working)
- NEVER route a contact with DND for all channels = active into SMS/voice sequences
- If data is insufficient, set segment to "unknown" and priority to "cold"
- Contacts with Pipeline Status = "Won" should get rate_guardian_monitoring ONLY (they already closed)
- Always provide reasoning — explain WHY you made the routing decision

## Output Format
Return ONLY valid JSON matching this schema:
{
  "contactId": "string",
  "segment": "physician_buying|physician_shopping|physician_refi|consumer_buying|consumer_shopping|consumer_refi|broker_partner|past_client|unknown",
  "sequence": ["contact_followup_3day", "rate_guardian_monitoring", ...],
  "pipelineStage": "string (use exact GHL stage names from above)",
  "priority": "hot|warm|cold",
  "tags": ["RG_...", ...],
  "reasoning": "string explaining the decision"
}`;

export async function routeLead(contact: GHLContact): Promise<RoutingDecision> {
  const contactData = formatContactForAgent(contact);

  const { text } = await generateText({
    model: "anthropic/claude-sonnet-4.6",
    system: ROUTING_SYSTEM_PROMPT,
    prompt: `Route this lead:\n\n${contactData}`,
    temperature: 0.1, // Low temp for consistent routing decisions
  });

  const decision = parseRoutingDecision(text, contact.id);
  validateDecision(decision, contact);
  return decision;
}

function formatContactForAgent(contact: GHLContact): string {
  const fields = contact.customFields || {};
  return `## Contact Data
- ID: ${contact.id}
- Name: ${contact.firstName} ${contact.lastName}
- Email: ${contact.email}
- Phone: ${contact.phone}
- Source: ${contact.source}
- Tags: ${contact.tags?.join(", ") || "none"}

## Rate Guardian Profile
- RG_Persona_Type: ${fields["RG_Persona_Type"] || "not set"}
- RG_Occupation_Category: ${fields["RG_Occupation_Category"] || "not set"}
- RG_Lead_Source: ${fields["RG_Lead_Source"] || "not set"}
- Contact Type: ${fields["Contact Type"] || "not set"}
- Loan Type: ${fields["Loan Type"] || "not set"}

## Rate Guardian Engine Fields
- RG_Rosie_Status: ${fields["RG_Rosie_Status"] || "not set"}
- RG_Rosie_Path: ${fields["RG_Rosie_Path"] || "not set"}
- RG_Engine_Status: ${fields["RG_Engine_Status"] || "not set"}
- RG_Rosie_Error: ${fields["RG_Rosie_Error"] || "none"}

## Loan Details
- RG_Loan_Product_Type: ${fields["RG_Loan_Product_Type"] || "not set"}
- RG_Loan_Amount: ${fields["RG_Loan_Amount"] || "not set"}
- RG_Home_Value_Est: ${fields["RG_Home_Value_Est"] || "not set"}
- RG_Rate_Original: ${fields["RG_Rate_Original"] || "not set"}
- RG_Down_Payment_Amount: ${fields["RG_Down_Payment_Amount"] || "not set"}
- RG_Lender_Name: ${fields["RG_Lender_Name"] || "not set"}

## Property
- RG_Target Property Type: ${fields["RG_Target Property Type"] || "not set"}
- RG_Target Property Use: ${fields["RG_Target Property Use"] || "not set"}
- RG_Target Property State: ${fields["RG_Target Property State"] || "not set"}
- RG_Target City: ${fields["RG_Target City"] || "not set"}

## Qualification
- RG_Estimated Credit Score: ${fields["RG_Estimated Credit Score"] || "not set"}
- RG_Estimated Household Income: ${fields["RG_Estimated Household Income"] || "not set"}
- RG_Opportunity_Tier: ${fields["RG_Opportunity_Tier"] || "not set"}
- RG_Savings_Opportunity: ${fields["RG_Savings_Opportunity"] || "not set"}

## Pipeline
- Pipeline Stage: ${fields["Pipeline Stage"] || "not set"}
- Pipeline Status: ${fields["Pipeline Status"] || "not set"}
- RG_Disposition: ${fields["RG_Disposition"] || "not set"}

## All Custom Fields
${Object.entries(fields).map(([k, v]) => `- ${k}: ${v}`).join("\n")}`;
}

function parseRoutingDecision(text: string, contactId: string): RoutingDecision {
  // Extract JSON from the response (handle markdown code blocks)
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`Routing agent returned non-JSON response: ${text.slice(0, 200)}`);
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    contactId: parsed.contactId || contactId,
    segment: parsed.segment as LeadSegment,
    sequence: parsed.sequence as SequenceType[],
    pipelineStage: parsed.pipelineStage,
    priority: parsed.priority,
    tags: parsed.tags,
    reasoning: parsed.reasoning,
  };
}

function validateDecision(decision: RoutingDecision, contact: GHLContact) {
  const fields = contact.customFields || {};

  // Safety: never route In Progress contacts
  if (fields[RG_FIELDS.ROSIE_STATUS] === ROSIE_STATUS.IN_PROGRESS) {
    throw new Error(
      `Cannot route contact ${contact.id}: engine still In Progress`
    );
  }

  // Safety: never route DNC contacts
  if (contact.tags?.some((t) => t.toLowerCase().includes("dnc"))) {
    throw new Error(`Cannot route contact ${contact.id}: DNC tagged`);
  }

  // Every decision must include rate_guardian_monitoring
  if (!decision.sequence.includes("rate_guardian_monitoring")) {
    decision.sequence.push("rate_guardian_monitoring");
  }

  // Every decision must include newsletter
  if (!decision.sequence.includes("newsletter_weekly")) {
    decision.sequence.push("newsletter_weekly");
  }

  // All tags must be RG_ prefixed
  decision.tags = decision.tags.map((tag) =>
    tag.startsWith("RG_") ? tag : `RG_${tag}`
  );
}
