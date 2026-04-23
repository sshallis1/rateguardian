// Project Guardian — Database helpers
// Supabase direct queries, matching RG pattern

import { supabase } from "@/lib/supabase";
import type { PGProject, PGPayment, PGContractor, PGMilestone } from "./types";

// ─── Projects ──────────────────────────────────────────────

export async function getProjects(): Promise<PGProject[]> {
  const { data, error } = await supabase
    .from("pg_projects")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data as PGProject[];
}

export async function getProject(id: string): Promise<PGProject | null> {
  const { data, error } = await supabase
    .from("pg_projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as PGProject;
}

export async function createProject(
  project: Partial<PGProject>
): Promise<PGProject> {
  const { data, error } = await supabase
    .from("pg_projects")
    .insert(project)
    .select()
    .single();
  if (error) throw error;
  return data as PGProject;
}

export async function updateProject(
  id: string,
  updates: Partial<PGProject>
): Promise<PGProject> {
  const { data, error } = await supabase
    .from("pg_projects")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PGProject;
}

// ─── Payments ──────────────────────────────────────────────

export async function getProjectPayments(
  projectId: string
): Promise<PGPayment[]> {
  const { data, error } = await supabase
    .from("pg_payments")
    .select("*")
    .eq("project_id", projectId)
    .order("payment_date", { ascending: false });
  if (error) throw error;
  return data as PGPayment[];
}

export async function createPayment(
  payment: Partial<PGPayment>
): Promise<PGPayment> {
  const { data, error } = await supabase
    .from("pg_payments")
    .insert(payment)
    .select()
    .single();
  if (error) throw error;
  return data as PGPayment;
}

export async function updatePayment(
  id: string,
  updates: Partial<PGPayment>
): Promise<PGPayment> {
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

// ─── Contractors ───────────────────────────────────────────

export async function getProjectContractors(
  projectId: string
): Promise<PGContractor[]> {
  const { data, error } = await supabase
    .from("pg_contractors")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as PGContractor[];
}

export async function createContractor(
  contractor: Partial<PGContractor>
): Promise<PGContractor> {
  const { data, error } = await supabase
    .from("pg_contractors")
    .insert(contractor)
    .select()
    .single();
  if (error) throw error;
  return data as PGContractor;
}

export async function updateContractor(
  id: string,
  updates: Partial<PGContractor>
): Promise<PGContractor> {
  const { data, error } = await supabase
    .from("pg_contractors")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PGContractor;
}

// ─── Milestones ────────────────────────────────────────────

export async function getProjectMilestones(
  projectId: string
): Promise<PGMilestone[]> {
  const { data, error } = await supabase
    .from("pg_milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data as PGMilestone[];
}

export async function createMilestone(
  milestone: Partial<PGMilestone>
): Promise<PGMilestone> {
  const { data, error } = await supabase
    .from("pg_milestones")
    .insert(milestone)
    .select()
    .single();
  if (error) throw error;
  return data as PGMilestone;
}

export async function updateMilestone(
  id: string,
  updates: Partial<PGMilestone>
): Promise<PGMilestone> {
  const { data, error } = await supabase
    .from("pg_milestones")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as PGMilestone;
}

// ─── Aggregates ────────────────────────────────────────────

export interface ProjectFinancialSummary {
  confirmed: number;
  pending: number;
  at_risk: number;
  total: number;
  payment_count: number;
}

export async function getProjectFinancials(
  projectId: string
): Promise<ProjectFinancialSummary> {
  const payments = await getProjectPayments(projectId);
  const summary: ProjectFinancialSummary = {
    confirmed: 0,
    pending: 0,
    at_risk: 0,
    total: 0,
    payment_count: payments.length,
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
