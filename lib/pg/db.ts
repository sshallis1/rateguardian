// Project Guardian — Database Layer (Homeowner Schema)

import { supabase } from "@/lib/supabase";

// The generated Database type doesn't include new homeowner tables yet.
// Use an untyped wrapper for new table queries until types are regenerated.
const db = supabase as any;
import type {
  Project,
  Budget,
  Vendor,
  Estimate,
  Expense,
  Task,
  LocalComparison,
  SavingsCase,
  ProjectROISummary,
  ProjectCategory,
  ProjectPhoto,
  ProjectFile,
  PGProject,
  PGPayment,
  PGContractor,
  PGMilestone,
} from "./types";

// ─── Projects ─────────────────────────────────────────────────

export async function getProjects(propertyId?: string): Promise<Project[]> {
  let query = db
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (propertyId) query = query.eq("property_id", propertyId);
  const { data, error } = await query;
  if (error) throw error;
  return data as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Project;
}

export async function createProject(project: Partial<Project>): Promise<Project> {
  const { data, error } = await db
    .from("projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data as Project;
}

// ─── Categories ───────────────────────────────────────────────

export async function getCategories(): Promise<ProjectCategory[]> {
  const { data, error } = await db
    .from("project_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as ProjectCategory[];
}

// ─── Budgets ──────────────────────────────────────────────────

export async function getProjectBudgets(projectId: string): Promise<Budget[]> {
  const { data, error } = await db
    .from("budgets")
    .select("*, category:project_categories(*)")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as Budget[];
}

// ─── Vendors ──────────────────────────────────────────────────

export async function getVendors(ownerId?: string): Promise<Vendor[]> {
  let query = db.from("vendors").select("*").order("vendor_name");
  if (ownerId) query = query.eq("owner_id", ownerId);
  const { data, error } = await query;
  if (error) throw error;
  return data as Vendor[];
}

// ─── Estimates ────────────────────────────────────────────────

export async function getProjectEstimates(projectId: string): Promise<Estimate[]> {
  const { data, error } = await db
    .from("estimates")
    .select("*, vendor:vendors(*), category:project_categories(*), line_items:estimate_line_items(*)")
    .eq("project_id", projectId)
    .order("estimate_date", { ascending: false });
  if (error) throw error;
  return data as Estimate[];
}

export async function createEstimate(estimate: Partial<Estimate>): Promise<Estimate> {
  const { data, error } = await db
    .from("estimates")
    .insert(estimate)
    .select()
    .single();
  if (error) throw error;
  return data as Estimate;
}

// ─── Expenses ─────────────────────────────────────────────────

export async function getProjectExpenses(projectId: string): Promise<Expense[]> {
  const { data, error } = await db
    .from("expenses")
    .select("*, vendor:vendors(*), category:project_categories(*)")
    .eq("project_id", projectId)
    .order("expense_date", { ascending: false });
  if (error) throw error;
  return data as Expense[];
}

export async function createExpense(expense: Partial<Expense>): Promise<Expense> {
  const { data, error } = await db
    .from("expenses")
    .insert(expense)
    .select()
    .single();
  if (error) throw error;
  return data as Expense;
}

// ─── Tasks ────────────────────────────────────────────────────

export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const { data, error } = await db
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as Task[];
}

export async function createTask(task: Partial<Task>): Promise<Task> {
  const { data, error } = await db
    .from("tasks")
    .insert(task)
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const { data, error } = await db
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}

// ─── Local Comparisons ────────────────────────────────────────

export async function getProjectComparisons(projectId: string): Promise<LocalComparison[]> {
  const { data, error } = await db
    .from("local_comparisons")
    .select("*, category:project_categories(*)")
    .eq("project_id", projectId)
    .order("potential_savings", { ascending: false });
  if (error) throw error;
  return data as LocalComparison[];
}

// ─── Savings Cases ─────────────────────────────────────���──────

export async function getSavingsCases(publishableOnly = false): Promise<SavingsCase[]> {
  let query = db.from("savings_cases").select("*").order("created_at", { ascending: false });
  if (publishableOnly) query = query.eq("publishable", true);
  const { data, error } = await query;
  if (error) throw error;
  return data as SavingsCase[];
}

// ─── Photos ───────────────────────────────────────────────────

export async function getProjectPhotos(projectId: string): Promise<ProjectPhoto[]> {
  const { data, error } = await db
    .from("project_photos")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as ProjectPhoto[];
}

// ─── Files ────────────────────────────────────────────────────

export async function getProjectFiles(projectId: string): Promise<ProjectFile[]> {
  const { data, error } = await db
    .from("project_files")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as ProjectFile[];
}

// ─── ROI Summary ──────────────────────────────────────────────

export async function getProjectROI(projectId: string): Promise<ProjectROISummary | null> {
  const { data, error } = await db
    .from("project_roi_summary")
    .select("*")
    .eq("project_id", projectId)
    .single();
  if (error) return null;
  return data as ProjectROISummary;
}

// ─── Dashboard Aggregates ─────────────────────────────────────

export interface ProjectDashboardData {
  project: Project;
  budgets: Budget[];
  expenses: Expense[];
  estimates: Estimate[];
  tasks: Task[];
  comparisons: LocalComparison[];
  roi: ProjectROISummary | null;
  totalBudget: number;
  totalSpent: number;
  totalPlanned: number;
  estimateCount: number;
  openTaskCount: number;
  overpayAlerts: LocalComparison[];
}

export async function getProjectDashboard(projectId: string): Promise<ProjectDashboardData | null> {
  const project = await getProject(projectId);
  if (!project) return null;

  const [budgets, expenses, estimates, tasks, comparisons, roi] = await Promise.all([
    getProjectBudgets(projectId),
    getProjectExpenses(projectId),
    getProjectEstimates(projectId),
    getProjectTasks(projectId),
    getProjectComparisons(projectId),
    getProjectROI(projectId),
  ]);

  const totalSpent = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const totalPlanned = budgets.reduce((s, b) => s + Number(b.planned_amount), 0);
  const totalBudget = totalPlanned;
  const estimateCount = estimates.length;
  const openTaskCount = tasks.filter((t) => t.status !== "done").length;
  const overpayAlerts = comparisons.filter((c) => c.potential_savings > 500);

  return {
    project,
    budgets,
    expenses,
    estimates,
    tasks,
    comparisons,
    roi,
    totalBudget,
    totalSpent,
    totalPlanned,
    estimateCount,
    openTaskCount,
    overpayAlerts,
  };
}

// ═══════════════════════════════════════════════════════════════
// Legacy functions (old pg_* tables) — used by portal + API routes
// These will be removed once portal is migrated to new schema.
// ═══════════════════════════════════════════════════════════════

export async function getLegacyProjects(userId?: string): Promise<PGProject[]> {
  let query = supabase
    .from("pg_projects")
    .select("*")
    .order("updated_at", { ascending: false });
  if (userId) query = query.eq("user_id" as any, userId);
  const { data, error } = await query;
  if (error) throw error;
  return data as PGProject[];
}

export async function getLegacyProject(id: string): Promise<PGProject | null> {
  const { data, error } = await supabase
    .from("pg_projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as PGProject;
}

export async function createLegacyProject(project: Partial<PGProject>): Promise<PGProject> {
  const { data, error } = await supabase
    .from("pg_projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data as PGProject;
}

export async function updateLegacyProject(id: string, updates: Partial<PGProject>): Promise<PGProject> {
  const { data, error } = await supabase
    .from("pg_projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PGProject;
}

export async function getProjectPayments(projectId: string): Promise<PGPayment[]> {
  const { data, error } = await supabase
    .from("pg_payments")
    .select("*")
    .eq("project_id", projectId)
    .order("payment_date", { ascending: false });
  if (error) throw error;
  return data as PGPayment[];
}

export async function createPayment(payment: Partial<PGPayment>): Promise<PGPayment> {
  const { data, error } = await supabase
    .from("pg_payments")
    .insert(payment)
    .select()
    .single();
  if (error) throw error;
  return data as PGPayment;
}

export async function updatePayment(id: string, updates: Partial<PGPayment>): Promise<PGPayment> {
  const { data, error } = await supabase
    .from("pg_payments")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PGPayment;
}

export async function deletePayment(id: string): Promise<void> {
  const { error } = await supabase.from("pg_payments").delete().eq("id", id);
  if (error) throw error;
}

export async function getProjectContractors(projectId: string): Promise<PGContractor[]> {
  const { data, error } = await supabase
    .from("pg_contractors")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as PGContractor[];
}

export async function createContractor(contractor: Partial<PGContractor>): Promise<PGContractor> {
  const { data, error } = await supabase
    .from("pg_contractors")
    .insert(contractor)
    .select()
    .single();
  if (error) throw error;
  return data as PGContractor;
}

export async function updateContractor(id: string, updates: Partial<PGContractor>): Promise<PGContractor> {
  const { data, error } = await supabase
    .from("pg_contractors")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PGContractor;
}

export async function getProjectMilestones(projectId: string): Promise<PGMilestone[]> {
  const { data, error } = await supabase
    .from("pg_milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as PGMilestone[];
}

export async function createMilestone(milestone: Partial<PGMilestone>): Promise<PGMilestone> {
  const { data, error } = await supabase
    .from("pg_milestones")
    .insert(milestone)
    .select()
    .single();
  if (error) throw error;
  return data as PGMilestone;
}

export async function updateMilestone(id: string, updates: Partial<PGMilestone>): Promise<PGMilestone> {
  const { data, error } = await supabase
    .from("pg_milestones")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PGMilestone;
}

export interface ProjectFinancialSummary {
  confirmed: number;
  pending: number;
  at_risk: number;
  total: number;
  payment_count: number;
}

export async function getProjectFinancials(projectId: string): Promise<ProjectFinancialSummary> {
  const payments = await getProjectPayments(projectId);
  const summary: ProjectFinancialSummary = {
    confirmed: 0, pending: 0, at_risk: 0, total: 0, payment_count: payments.length,
  };
  for (const p of payments) {
    const amt = Number(p.amount) || 0;
    if (p.bucket === "confirmed") summary.confirmed += amt;
    else if (p.bucket === "pending") summary.pending += amt;
    else if (p.bucket === "at_risk") summary.at_risk += amt;
    summary.total += amt;
  }
  return summary;
}
