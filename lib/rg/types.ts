// Rate Guardian — Core Types
// These types define the contract between GHL, the routing agent, and downstream workflows

export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  tags: string[];
  customFields: Record<string, string>;
}

export interface GHLWebhookPayload {
  type: string;
  locationId: string;
  contact: GHLContact;
  workflow?: {
    id: string;
    name: string;
  };
  timestamp: string;
}

// What the routing agent returns to GHL
export interface RoutingDecision {
  contactId: string;
  segment: LeadSegment;
  sequence: SequenceType[];
  pipelineStage: string;
  priority: "hot" | "warm" | "cold";
  tags: string[];
  reasoning: string;
}

export type LeadSegment =
  | "physician_buying"
  | "physician_shopping"
  | "physician_refi"
  | "consumer_buying"
  | "consumer_shopping"
  | "consumer_refi"
  | "broker_partner"
  | "past_client"
  | "unknown";

export type SequenceType =
  | "contact_followup_3day"
  | "email_drip_physician"
  | "email_drip_consumer"
  | "email_drip_broker"
  | "podcast_subscription"
  | "social_follow"
  | "rate_guardian_monitoring"
  | "quarterly_phone_followup"
  | "newsletter_weekly";

// RG Engine field registry — must match GHL custom fields exactly
export const RG_FIELDS = {
  LAST_RUN_AT: "RG_Last_Run_At",
  LAST_EVALUATED: "RG_Last_Evaluated",
  ROSIE_STATUS: "RG_Rosie_Status",
  ROSIE_PATH: "RG_Rosie_Path",
  LOAN_PRODUCT_TYPE: "RG_Loan_Product_Type",
  ROSIE_FAILURE_REASON: "RG_Rosie_Failure_Reason",
  ROSIE_ERROR: "RG_Rosie_Error",
  ROUTING_DECISION: "RG_Routing_Decision",
  ROUTING_SEGMENT: "RG_Routing_Segment",
  ROUTING_PRIORITY: "RG_Routing_Priority",
  // Egress fields
  LAST_ROUTED_AT: "RG_Last_Routed_At",
  // Ops fields
  LAST_NOTIFIED_AT: "RG_Last_Notified_At",
  HEARTBEAT_LAST_RUN: "RG_Heartbeat_Last_Run",
  HEALTHCHECK_LAST_RUN: "RG_HealthCheck_Last_Run",
  LEAD_SOURCE: "RG_Lead_Source",
  // Follow-up egress fields
  FOLLOW_UP_EXIT: "RG_Follow_Up_Exit",
  FOLLOW_UP_EXIT_AT: "RG_Follow_Up_Exit_At",
  FOLLOW_UP_STARTED_AT: "RG_Follow_Up_Started_At",
} as const;

// Valid values for engine fields — sourced from GHL Master Registry
export const ROSIE_STATUS = {
  ON: "On",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  NEEDS_DATA: "Needs Data",
} as const;

export const ROSIE_PATH = {
  MONITORING: "Monitoring Rates for Oppty",
  PRE_APPROVED: "Pre_Approved_Looking",
  STARTING: "Starting_Need_Prequalified",
  UNKNOWN: "Unknown",
} as const;

// Pipeline stages — from GHL Master Registry
export const PIPELINE_STAGES = {
  ENGAGED_LEAD: "Engaged Lead",
  DISCLOSURES_SENT: "Disclosures Sent",
  SUBMITTED_UW: "Submitted to Underwriting",
  APPROVED: "Approved",
  CLEAR_TO_CLOSE: "Clear to Close",
  WON_YTD: "Won YTD",
} as const;

export const PIPELINE_STATUS = {
  OPEN: "Open",
  WON: "Won",
  LOST: "Lost",
  ABANDON: "Abandon",
  IN_PROGRESS: "In Progess", // Note: GHL has this typo
} as const;

// Persona types — from GHL Master Registry
export const PERSONA_TYPES = {
  PHYSICIAN: "Physician",
  HIGH_INCOME: "High Income Professional (Non-Doctor)",
  GENERAL_CONSUMER: "General Consumer",
  INVESTOR: "Investor",
  BUILDER: "Builder / Developer",
  REFERRAL_PARTNER: "Referral Partner",
  FRIEND_FAMILY: "Friend / Family",
  OTHER: "Other",
} as const;

// Lead sources — from GHL Master Registry
export const LEAD_SOURCES = {
  LEVERAGE_RX: "LeverageRX",
  REALTOR_REFERRAL: "Realtor_Referral",
  VENDOR_REFERRAL: "Vendor_Referral",
  CENTER_OF_INFLUENCE: "Center_Of_Influence",
  FAMILY_FRIEND: "Family_Friend",
  FUNDED_CLIENT: "Funded_Client",
  FUNDED_REFERRAL: "Funded_Referral",
  US_BANK_WEBSITE: "US_Bank_Website_Google",
  IN_PERSON: "In Person Networking Event",
} as const;

// Loan products — from GHL Master Registry
export const LOAN_PRODUCTS = {
  CONV_30Y_FIXED: "Conv 30Y FIXED",
  CONV_20Y_FIXED: "Conv 20Y FIXED",
  FHA_30Y_FIXED: "FHA 30Y FIXED",
  VA_30Y_FIXED: "VA 3OY FIXED", // Note: GHL has typo "3OY" not "30Y"
  JUMBO_7_1_ARM: "Jumbo 7/1 ARM",
  JUMBO_5_1_ARM: "Jumbo 5/1 ARM",
} as const;

// Credit score ranges — from GHL Master Registry
export const CREDIT_SCORES = {
  EXCELLENT: "700+",
  GOOD: "660-700",
  FAIR: "620-660",
} as const;

// Income ranges — from GHL Master Registry
export const INCOME_RANGES = {
  HIGH: "$500,000+",
  UPPER_MIDDLE: "$250,000-$500,000",
  MIDDLE: "$100,000-$250,000",
  BELOW: "Below $100,000",
} as const;
