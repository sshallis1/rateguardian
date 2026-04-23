"use client";

import { useState, useEffect, useCallback } from "react";
import type { PGProject, PGPayment, PGContractor, PGMilestone } from "@/lib/pg/types";
import { PAYMENT_CATEGORIES } from "@/lib/pg/types";

const API = "/api/pg";

function getToken(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("token") || "";
}

function authHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" };
}

function fmt(n: number | null | undefined): string {
  if (n == null) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function fmtFull(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

const PHASE_LABELS: Record<string, string> = {
  demo: "Demo", rough: "Rough", finish: "Finish", punch_list: "Punch List", complete: "Complete",
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  completed: { bg: "#14532d", text: "#4ade80", border: "#22c55e" },
  in_progress: { bg: "#78350f", text: "#fbbf24", border: "#f59e0b" },
  pending: { bg: "#27272a", text: "#a1a1aa", border: "#3f3f46" },
  skipped: { bg: "#1e1b4b", text: "#818cf8", border: "#6366f1" },
};

interface ProjectData {
  project: PGProject;
  payments: PGPayment[];
  contractors: PGContractor[];
  milestones: PGMilestone[];
}

export default function ProjectDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [projectId, setProjectId] = useState<string>("");

  // Resolve the params promise
  useEffect(() => {
    paramsPromise.then((p) => setProjectId(p.id));
  }, [paramsPromise]);

  const fetchAll = useCallback(async () => {
    if (!projectId) return;
    try {
      const t = getToken();
      const [projRes, payRes, conRes, msRes] = await Promise.all([
        fetch(`${API}/projects/${projectId}?token=${t}`),
        fetch(`${API}/payments?project_id=${projectId}&token=${t}`),
        fetch(`${API}/contractors?project_id=${projectId}&token=${t}`),
        fetch(`${API}/milestones?project_id=${projectId}&token=${t}`),
      ]);
      if (projRes.status === 401) { setAuthorized(false); setLoading(false); return; }
      setAuthorized(true);
      const [project, payments, contractors, milestones] = await Promise.all([
        projRes.json(), payRes.json(), conRes.json(), msRes.json(),
      ]);
      setData({ project, payments, contractors, milestones });
    } catch { /* ignore */ }
    setLoading(false);
  }, [projectId]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function toggleMilestone(ms: PGMilestone) {
    const next = ms.status === "completed" ? "pending" : ms.status === "in_progress" ? "completed" : "in_progress";
    await fetch(`${API}/milestones/${ms.id}?token=${getToken()}`, {
      method: "PATCH", headers: authHeaders(),
      body: JSON.stringify({
        status: next,
        completed_date: next === "completed" ? new Date().toISOString().slice(0, 10) : null,
      }),
    });
    showToast(`${ms.name} → ${next.replace("_", " ")}`);
    fetchAll();
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  if (loading) return <Shell><p style={s.muted}>Loading...</p></Shell>;
  if (!authorized) return <Shell><p style={{ ...s.muted, color: "#ef4444" }}>Unauthorized.</p></Shell>;
  if (!data) return <Shell><p style={s.muted}>Project not found.</p></Shell>;

  const { project: p, payments, contractors, milestones } = data;

  // Financial aggregates
  const confirmed = payments.filter(x => x.bucket === "confirmed").reduce((s, x) => s + Number(x.amount), 0);
  const pending = payments.filter(x => x.bucket === "pending").reduce((s, x) => s + Number(x.amount), 0);
  const atRisk = payments.filter(x => x.bucket === "at_risk").reduce((s, x) => s + Number(x.amount), 0);

  return (
    <Shell>
      {/* Back link */}
      <a href={`/project-guardian/projects?token=${getToken()}`} style={s.backLink}>&larr; All Projects</a>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <h1 style={s.title}>{p.name}</h1>
          {p.phase && <span style={s.phaseBadge}>{PHASE_LABELS[p.phase] || p.phase}</span>}
          {p.project_type && <span style={s.typeBadge}>{p.project_type}</span>}
        </div>
        <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "4px 0 0" }}>
          {[p.address, p.city, p.state].filter(Boolean).join(", ")}
        </p>
      </div>

      {/* Financial Snapshot */}
      <SectionLabel>Financial Snapshot</SectionLabel>
      <div style={s.metricsRow}>
        <MetricCard label="Confirmed Paid" value={fmtFull(confirmed)} accent="#22c55e" />
        <MetricCard label="Approved / Pending" value={fmtFull(pending)} accent="#f59e0b" />
        <MetricCard label="At Risk / Variable" value={fmtFull(atRisk)} accent="#ef4444" />
      </div>
      {(p.resale_target_low || p.resale_target_high) && (
        <div style={{ ...s.infoBar, marginBottom: "24px" }}>
          <span style={{ color: "#71717a", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Resale Target
          </span>
          <span style={{ fontSize: "16px", fontWeight: 700, fontFamily: "monospace" }}>
            {fmt(p.resale_target_low)} – {fmt(p.resale_target_high)}
          </span>
        </div>
      )}

      {/* Payment Ledger */}
      <SectionLabel>
        <span>Payment Ledger</span>
        <button style={s.addBtn} onClick={() => setShowAddPayment(!showAddPayment)}>
          {showAddPayment ? "Cancel" : "+ Add"}
        </button>
      </SectionLabel>
      {showAddPayment && (
        <AddPaymentForm
          projectId={projectId}
          onDone={() => { setShowAddPayment(false); fetchAll(); showToast("Payment added"); }}
        />
      )}
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Date</th>
              <th style={s.th}>Vendor</th>
              <th style={s.th}>Category</th>
              <th style={{ ...s.th, textAlign: "right" }}>Amount</th>
              <th style={s.th}>Method</th>
              <th style={s.th}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(pay => (
              <tr key={pay.id}>
                <td style={s.td}>{pay.payment_date || "—"}</td>
                <td style={s.td}>{pay.vendor}</td>
                <td style={s.td}>{pay.category}</td>
                <td style={{ ...s.td, textAlign: "right", fontFamily: "monospace", fontWeight: 600 }}>
                  {fmtFull(Number(pay.amount))}
                </td>
                <td style={s.td}>{pay.payment_method || "—"}</td>
                <td style={{ ...s.td, color: "#71717a", fontSize: "12px" }}>
                  {[pay.invoice_ref, pay.notes].filter(Boolean).join(" · ") || "—"}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#71717a" }}>No payments yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Milestones */}
      <SectionLabel>Milestones</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
        {milestones.map(ms => {
          const sc = STATUS_COLORS[ms.status] || STATUS_COLORS.pending;
          return (
            <div
              key={ms.id}
              style={{ ...s.msRow, borderColor: sc.border }}
              onClick={() => toggleMilestone(ms)}
            >
              <div style={{ ...s.msDot, background: sc.text, boxShadow: `0 0 6px ${sc.text}` }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>{ms.name}</span>
                {ms.phase && (
                  <span style={{ fontSize: "11px", color: "#71717a", marginLeft: "8px" }}>
                    {PHASE_LABELS[ms.phase] || ms.phase}
                  </span>
                )}
              </div>
              <span style={{
                fontSize: "11px", fontWeight: 600, textTransform: "uppercase",
                letterSpacing: "0.05em", color: sc.text,
                padding: "2px 8px", borderRadius: "4px", background: sc.bg,
              }}>
                {ms.status.replace("_", " ")}
              </span>
            </div>
          );
        })}
      </div>

      {/* Contractors */}
      <SectionLabel>Contractors</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
        {contractors.map(c => (
          <div key={c.id} style={s.conCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", fontWeight: 600 }}>{c.name}</span>
              {c.trade && <span style={s.tradeBadge}>{c.trade}</span>}
            </div>
            {(c.phone || c.email || c.notes) && (
              <p style={{ fontSize: "12px", color: "#71717a", margin: "4px 0 0" }}>
                {[c.phone, c.email, c.notes].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        ))}
        {contractors.length === 0 && (
          <p style={{ fontSize: "13px", color: "#71717a" }}>No contractors added yet</p>
        )}
      </div>

      {/* Control Message */}
      <div style={s.controlMsg}>
        First dollars deployed into visible, ROI-driven improvements that support resale value and project momentum.
        Current priority: control mid-phase burn, prevent scope creep, keep future spend tied to resale lift or execution speed.
      </div>

      {/* Toast */}
      {toast && <div style={s.toast}>{toast}</div>}

      <div style={s.footer}>Project Guardian v1.0 — Sean Shallis</div>
    </Shell>
  );
}

// ─── Sub-components ────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={s.container}>
      <div style={s.card}>{children}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={s.sectionLabel}>{children}</div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ ...s.metric, borderColor: accent + "44" }}>
      <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </span>
      <span style={{ fontSize: "22px", fontWeight: 700, fontFamily: "monospace", color: accent }}>
        {value}
      </span>
    </div>
  );
}

function AddPaymentForm({ projectId, onDone }: { projectId: string; onDone: () => void }) {
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
    await fetch(`${API}/payments?token=${getToken()}`, {
      method: "POST", headers: authHeaders(),
      body: JSON.stringify({
        project_id: projectId, vendor, amount: parseFloat(amount),
        category, payment_method: method, payment_date: date, bucket, notes: notes || null,
      }),
    });
    setSaving(false);
    onDone();
  }

  return (
    <form onSubmit={submit} style={s.form}>
      <div style={s.formRow}>
        <input style={s.input} placeholder="Vendor" value={vendor} onChange={e => setVendor(e.target.value)} required />
        <input style={{ ...s.input, width: "120px" }} type="number" step="0.01" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
      </div>
      <div style={s.formRow}>
        <select style={s.select} value={category} onChange={e => setCategory(e.target.value)}>
          {PAYMENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={s.select} value={method} onChange={e => setMethod(e.target.value)}>
          {["invoice", "check", "stripe", "cash", "wire"].map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select style={s.select} value={bucket} onChange={e => setBucket(e.target.value)}>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="at_risk">At Risk</option>
        </select>
      </div>
      <div style={s.formRow}>
        <input style={s.input} type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input style={s.input} placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>
      <button type="submit" style={s.submitBtn} disabled={saving}>
        {saving ? "Saving..." : "Add Payment"}
      </button>
    </form>
  );
}

// ─── Styles ────────────────────────────────────────────────

const s: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "flex-start",
    justifyContent: "center", padding: "48px 24px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: "#fafafa",
  },
  card: { width: "100%", maxWidth: "800px" },
  backLink: {
    fontSize: "13px", color: "#71717a", textDecoration: "none", display: "inline-block",
    marginBottom: "16px",
  },
  title: { fontSize: "24px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" },
  phaseBadge: {
    fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.05em", padding: "4px 10px", borderRadius: "6px",
    background: "#c2410c22", color: "#fb923c", border: "1px solid #c2410c44",
  },
  typeBadge: {
    fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.05em", padding: "4px 10px", borderRadius: "6px",
    background: "#27272a", color: "#a1a1aa", border: "1px solid #3f3f46",
  },
  sectionLabel: {
    fontSize: "12px", fontWeight: 700, textTransform: "uppercase" as const,
    letterSpacing: "0.08em", color: "#71717a", marginBottom: "12px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  metricsRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" },
  metric: {
    background: "#18181b", border: "1px solid", borderRadius: "12px",
    padding: "16px", display: "flex", flexDirection: "column" as const, gap: "4px",
  },
  infoBar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "#18181b", border: "1px solid #27272a", borderRadius: "10px",
    padding: "12px 16px",
  },
  tableWrap: { overflowX: "auto" as const, marginBottom: "28px" },
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "13px" },
  th: {
    textAlign: "left" as const, padding: "8px 12px", borderBottom: "1px solid #27272a",
    color: "#71717a", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  td: { padding: "10px 12px", borderBottom: "1px solid #18181b", fontSize: "13px" },
  msRow: {
    display: "flex", alignItems: "center", gap: "12px",
    padding: "12px 16px", background: "#18181b",
    border: "1px solid #27272a", borderRadius: "10px",
    cursor: "pointer", transition: "border-color 0.15s",
  },
  msDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  conCard: {
    padding: "14px 16px", background: "#18181b",
    border: "1px solid #27272a", borderRadius: "10px",
  },
  tradeBadge: {
    fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.04em", padding: "2px 8px", borderRadius: "4px",
    background: "#27272a", color: "#a1a1aa",
  },
  controlMsg: {
    padding: "16px", background: "#18181b", border: "1px solid #27272a",
    borderRadius: "10px", fontSize: "13px", color: "#a1a1aa",
    lineHeight: "1.5", fontStyle: "italic", marginBottom: "24px",
  },
  toast: {
    position: "fixed" as const, bottom: "24px", right: "24px",
    background: "#27272a", border: "1px solid #3f3f46", borderRadius: "10px",
    padding: "12px 20px", fontSize: "13px", color: "#d4d4d8", fontFamily: "monospace",
    zIndex: 1000,
  },
  footer: { textAlign: "center" as const, fontSize: "11px", color: "#3f3f46", marginTop: "8px" },
  muted: { fontSize: "14px", color: "#71717a" },
  addBtn: {
    fontSize: "12px", fontWeight: 600, color: "#fb923c", background: "transparent",
    border: "1px solid #c2410c44", borderRadius: "6px", padding: "4px 12px",
    cursor: "pointer",
  },
  form: {
    background: "#18181b", border: "1px solid #27272a", borderRadius: "10px",
    padding: "16px", marginBottom: "16px", display: "flex", flexDirection: "column" as const, gap: "10px",
  },
  formRow: { display: "flex", gap: "8px", flexWrap: "wrap" as const },
  input: {
    flex: 1, minWidth: "120px", padding: "8px 12px", background: "#27272a", color: "#fafafa",
    border: "1px solid #3f3f46", borderRadius: "6px", fontSize: "13px",
  },
  select: {
    flex: 1, minWidth: "100px", padding: "8px 12px", background: "#27272a", color: "#fafafa",
    border: "1px solid #3f3f46", borderRadius: "6px", fontSize: "13px",
  },
  submitBtn: {
    padding: "10px", background: "#c2410c", color: "#fafafa", border: "none",
    borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
  },
};
