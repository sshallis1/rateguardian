// Project Guardian — Homeowner-Facing Types

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  plan_type: string;
  created_at: string;
}

export interface Property {
  id: string;
  owner_id: string | null;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  property_type: string | null;
  beds: number | null;
  baths: number | null;
  square_feet: number | null;
  created_at: string;
}

export interface Project {
  id: string;
  property_id: string | null;
  project_name: string;
  project_status: string;
  project_type: string;
  purchase_price: number;
  arv_estimate: number;
  resale_estimate: number;
  target_start_date: string | null;
  target_completion_date: string | null;
  target_sale_date: string | null;
  hold_months: number;
  cost_of_capital_rate: number;
  selling_cost_rate: number;
  contingency_rate: number;
  created_at: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  sort_order: number;
}

export interface Budget {
  id: string;
  project_id: string | null;
  category_id: string | null;
  planned_amount: number;
  actual_amount: number;
  notes: string | null;
  created_at: string;
  // joined
  category?: ProjectCategory;
}

export interface Vendor {
  id: string;
  owner_id: string | null;
  vendor_name: string;
  trade_type: string | null;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  rating: number | null;
  preferred_vendor: boolean;
  discount_available: boolean;
  notes: string | null;
  created_at: string;
}

export interface Estimate {
  id: string;
  project_id: string | null;
  vendor_id: string | null;
  category_id: string | null;
  estimate_title: string | null;
  estimate_amount: number;
  estimate_status: string;
  estimate_date: string | null;
  document_url: string | null;
  notes: string | null;
  created_at: string;
  // joined
  vendor?: Vendor;
  category?: ProjectCategory;
  line_items?: EstimateLineItem[];
}

export interface EstimateLineItem {
  id: string;
  estimate_id: string | null;
  item_name: string | null;
  description: string | null;
  quantity: number;
  unit: string | null;
  unit_cost: number;
  total_cost: number;
}

export interface Expense {
  id: string;
  project_id: string | null;
  vendor_id: string | null;
  category_id: string | null;
  expense_date: string;
  amount: number;
  payment_status: string;
  payment_method: string | null;
  receipt_url: string | null;
  notes: string | null;
  created_at: string;
  // joined
  vendor?: Vendor;
  category?: ProjectCategory;
}

export interface Task {
  id: string;
  project_id: string | null;
  vendor_id: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string | null;
  file_name: string | null;
  file_type: string | null;
  file_url: string | null;
  category: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ProjectPhoto {
  id: string;
  project_id: string | null;
  photo_url: string;
  photo_type: string;
  room_or_area: string | null;
  description: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  profile_id: string | null;
  project_id: string | null;
  conversation_type: string;
  summary: string | null;
  created_at: string;
}

export interface ConversationMessage {
  id: string;
  conversation_id: string | null;
  sender: string;
  message: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface LocalComparison {
  id: string;
  project_id: string | null;
  category_id: string | null;
  user_estimate_amount: number;
  local_market_low: number;
  local_market_high: number;
  guardian_target_amount: number;
  potential_savings: number;
  recommendation: string | null;
  created_at: string;
  // joined
  category?: ProjectCategory;
}

export interface SavingsCase {
  id: string;
  title: string;
  category: string | null;
  original_estimate: number | null;
  final_cost: number | null;
  savings_amount: number | null;
  savings_percent: number | null;
  time_saved_description: string | null;
  story_notes: string | null;
  publishable: boolean;
  created_at: string;
}

export interface ProjectROISummary {
  project_id: string;
  project_name: string;
  purchase_price: number;
  resale_estimate: number;
  selling_cost_rate: number;
  actual_spend: number;
  estimated_carry_cost: number;
  estimated_selling_cost: number;
  projected_profit: number;
}

// ─── Constants ────────────────────────────────────────────────

export const PROJECT_STATUS = {
  PLANNING: "planning",
  ACTIVE: "active",
  COMPLETED: "completed",
  PAUSED: "paused",
} as const;

export const ESTIMATE_STATUS = {
  RECEIVED: "received",
  UNDER_REVIEW: "under_review",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export const PAYMENT_STATUS = {
  UNPAID: "unpaid",
  PAID: "paid",
  PARTIAL: "partial",
} as const;

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;

export const TASK_PRIORITY = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
  URGENT: "urgent",
} as const;

// ─── Legacy Compatibility (old pg_* tables) ───────────────────
// These types match the old schema and are used by portal routes + API routes
// that still read from pg_projects, pg_payments, pg_contractors, pg_milestones.

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
