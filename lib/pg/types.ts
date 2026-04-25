// Project Guardian — Core Types

export interface PGProject {
  id: string;
  user_id: string | null;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  county: string | null;
  zip: string | null;
  status: string;
  phase: string | null;
  project_type: string | null;
  purchase_price: number | null;
  resale_target_low: number | null;
  resale_target_high: number | null;
  total_budget: number | null;
  notes: string | null;
  meta: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PGPayment {
  id: string;
  project_id: string;
  contractor_id: string | null;
  amount: number;
  category: string;
  vendor: string;
  payment_method: string | null;
  payment_date: string | null;
  invoice_ref: string | null;
  bucket: string;
  notes: string | null;
  meta: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PGContractor {
  id: string;
  project_id: string;
  name: string;
  trade: string | null;
  phone: string | null;
  email: string | null;
  rating: number | null;
  notes: string | null;
  meta: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface PGMilestone {
  id: string;
  project_id: string;
  name: string;
  phase: string | null;
  status: string;
  target_date: string | null;
  completed_date: string | null;
  sort_order: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const PROJECT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  PAUSED: "paused",
  ARCHIVED: "archived",
} as const;

export const PROJECT_PHASE = {
  DEMO: "demo",
  ROUGH: "rough",
  FINISH: "finish",
  PUNCH_LIST: "punch_list",
  COMPLETE: "complete",
} as const;

export const PAYMENT_BUCKET = {
  CONFIRMED: "confirmed",
  PENDING: "pending",
  AT_RISK: "at_risk",
} as const;

export const MILESTONE_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  SKIPPED: "skipped",
} as const;

export const PAYMENT_CATEGORIES = [
  "Painting",
  "Flooring / Materials",
  "Service / Cleanout / Ops",
  "Cabinets",
  "Counters / Backsplash",
  "Bathroom",
  "Trim / Hardware",
  "Appliances",
  "Plumbing",
  "Electrical",
  "HVAC",
  "Landscaping",
  "Permits / Inspections",
  "Other",
] as const;
