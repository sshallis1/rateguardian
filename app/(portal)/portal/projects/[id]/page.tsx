"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import type {
  PGProject,
  PGPayment,
  PGContractor,
  PGMilestone,
} from "@/lib/pg/types";
import { PAYMENT_CATEGORIES } from "@/lib/pg/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const API = "/api/pg";

function fmt(n: number | null | undefined): string {
  if (n == null) return "--";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function fmtFull(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

const PHASE_LABELS: Record<string, string> = {
  demo: "Demo",
  rough: "Rough",
  finish: "Finish",
  punch_list: "Punch List",
  complete: "Complete",
};

const STATUS_STYLES: Record<string, string> = {
  completed: "text-emerald-700 bg-emerald-50 border-emerald-200",
  in_progress: "text-amber-700 bg-amber-50 border-amber-200",
  pending: "text-neutral-500 bg-neutral-100 border-neutral-200",
  skipped: "text-indigo-600 bg-indigo-50 border-indigo-200",
};

interface ProjectData {
  project: PGProject;
  payments: PGPayment[];
  contractors: PGContractor[];
  milestones: PGMilestone[];
}

export default function PortalProjectDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    paramsPromise.then((p) => setProjectId(p.id));
  }, [paramsPromise]);

  const fetchAll = useCallback(async () => {
    if (!projectId) return;
    try {
      const [projRes, payRes, conRes, msRes] = await Promise.all([
        fetch(`${API}/projects/${projectId}`),
        fetch(`${API}/payments?project_id=${projectId}`),
        fetch(`${API}/contractors?project_id=${projectId}`),
        fetch(`${API}/milestones?project_id=${projectId}`),
      ]);
      if (!projRes.ok) {
        setLoading(false);
        return;
      }
      const [project, payments, contractors, milestones] = await Promise.all([
        projRes.json(),
        payRes.json(),
        conRes.json(),
        msRes.json(),
      ]);
      setData({ project, payments, contractors, milestones });
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function toggleMilestone(ms: PGMilestone) {
    const next =
      ms.status === "completed"
        ? "pending"
        : ms.status === "in_progress"
          ? "completed"
          : "in_progress";
    await fetch(`${API}/milestones/${ms.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: next,
        completed_date:
          next === "completed" ? new Date().toISOString().slice(0, 10) : null,
      }),
    });
    showToast(`${ms.name} → ${next.replace("_", " ")}`);
    fetchAll();
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  if (loading)
    return <p className="text-neutral-500">Loading project...</p>;
  if (!data) return <p className="text-neutral-500">Project not found.</p>;

  const { project: p, payments, contractors, milestones } = data;
  const confirmed = payments
    .filter((x) => x.bucket === "confirmed")
    .reduce((s, x) => s + Number(x.amount), 0);
  const pending = payments
    .filter((x) => x.bucket === "pending")
    .reduce((s, x) => s + Number(x.amount), 0);
  const atRisk = payments
    .filter((x) => x.bucket === "at_risk")
    .reduce((s, x) => s + Number(x.amount), 0);

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <Link
        href="/portal/projects"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        <ArrowLeft size={14} /> All Projects
      </Link>

      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-neutral-900">{p.name}</h1>
          {p.phase && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
              {PHASE_LABELS[p.phase] || p.phase}
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-500 mt-1">
          {[p.address, p.city, p.state].filter(Boolean).join(", ")}
        </p>
      </div>

      {/* Financial Snapshot */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
          Financial Snapshot
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <MetricCard label="Confirmed Paid" value={fmtFull(confirmed)} color="text-emerald-600" />
          <MetricCard label="Approved / Pending" value={fmtFull(pending)} color="text-amber-600" />
          <MetricCard label="At Risk / Variable" value={fmtFull(atRisk)} color="text-red-600" />
        </div>
        {(p.resale_target_low || p.resale_target_high) && (
          <div className="flex justify-between items-center mt-3 px-4 py-3 rounded-xl border border-neutral-200 bg-white">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              Resale Target
            </span>
            <span className="font-bold font-mono text-neutral-900">
              {fmt(p.resale_target_low)} -- {fmt(p.resale_target_high)}
            </span>
          </div>
        )}
      </div>

      {/* Payment Ledger */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Payment Ledger
          </h2>
          <button
            onClick={() => setShowAddPayment(!showAddPayment)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--brand-teal)] hover:underline"
          >
            <Plus size={14} />
            {showAddPayment ? "Cancel" : "Add Payment"}
          </button>
        </div>
        {showAddPayment && (
          <AddPaymentForm
            projectId={projectId}
            onDone={() => {
              setShowAddPayment(false);
              fetchAll();
              showToast("Payment added");
            }}
          />
        )}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((pay) => (
                  <tr
                    key={pay.id}
                    className="border-b border-neutral-100 last:border-0"
                  >
                    <td className="px-4 py-2.5 text-neutral-600">
                      {pay.payment_date || "--"}
                    </td>
                    <td className="px-4 py-2.5 text-neutral-900 font-medium">
                      {pay.vendor}
                    </td>
                    <td className="px-4 py-2.5 text-neutral-600">
                      {pay.category}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-semibold text-neutral-900">
                      {fmtFull(Number(pay.amount))}
                    </td>
                    <td className="px-4 py-2.5 text-neutral-400 text-xs">
                      {[pay.invoice_ref, pay.notes]
                        .filter(Boolean)
                        .join(" · ") || "--"}
                    </td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-neutral-400"
                    >
                      No payments recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Milestones */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
          Milestones
        </h2>
        <div className="space-y-2">
          {milestones.map((ms) => {
            const styles =
              STATUS_STYLES[ms.status] || STATUS_STYLES.pending;
            return (
              <button
                key={ms.id}
                onClick={() => toggleMilestone(ms)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-all text-left"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    ms.status === "completed"
                      ? "bg-emerald-500"
                      : ms.status === "in_progress"
                        ? "bg-amber-500"
                        : "bg-neutral-300"
                  }`}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-neutral-900">
                    {ms.name}
                  </span>
                  {ms.phase && (
                    <span className="text-xs text-neutral-400 ml-2">
                      {PHASE_LABELS[ms.phase] || ms.phase}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${styles}`}
                >
                  {ms.status.replace("_", " ")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contractors */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
          Contractors
        </h2>
        <div className="space-y-2">
          {contractors.map((c) => (
            <Card key={c.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-900">
                    {c.name}
                  </span>
                  {c.trade && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                      {c.trade}
                    </span>
                  )}
                </div>
                {(c.phone || c.email) && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {[c.phone, c.email].filter(Boolean).join(" · ")}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
          {contractors.length === 0 && (
            <p className="text-sm text-neutral-400">No contractors yet</p>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-neutral-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-neutral-400 uppercase tracking-wider">
          {label}
        </p>
        <p className={`text-xl font-bold font-mono mt-1 ${color}`}>{value}</p>
      </CardContent>
    </Card>
  );
}

function AddPaymentForm({
  projectId,
  onDone,
}: {
  projectId: string;
  onDone: () => void;
}) {
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>(PAYMENT_CATEGORIES[0]);
  const [method, setMethod] = useState("invoice");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [bucket, setBucket] = useState("confirmed");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!vendor || !amount) return;
    setSaving(true);
    await fetch(`${API}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_id: projectId,
        vendor,
        amount: parseFloat(amount),
        category,
        payment_method: method,
        payment_date: date,
        bucket,
        notes: notes || null,
      }),
    });
    setSaving(false);
    onDone();
  }

  const inputClass =
    "flex-1 min-w-[120px] px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:border-[color:var(--brand-teal)] focus:outline-none";
  const selectClass =
    "flex-1 min-w-[100px] px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:border-[color:var(--brand-teal)] focus:outline-none bg-white";

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <form onSubmit={submit} className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            <input
              className={inputClass}
              placeholder="Vendor"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              required
            />
            <input
              className={`${inputClass} w-[120px]`}
              type="number"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              className={selectClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {PAYMENT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className={selectClass}
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              {["invoice", "check", "stripe", "cash", "wire"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className={selectClass}
              value={bucket}
              onChange={(e) => setBucket(e.target.value)}
            >
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="at_risk">At Risk</option>
            </select>
          </div>
          <div className="flex gap-2 flex-wrap">
            <input
              className={inputClass}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Saving..." : "Add Payment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
