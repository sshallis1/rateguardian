"use client";

import { useState, useEffect, useCallback } from "react";
import type { PGProject } from "@/lib/pg/types";

const API = "/api/pg";

function getToken(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("token") || "";
}

function fmt(n: number | null): string {
  if (n == null) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const PHASE_LABELS: Record<string, string> = {
  demo: "Demo",
  rough: "Rough",
  finish: "Finish",
  punch_list: "Punch List",
  complete: "Complete",
};

export default function ProjectListPage() {
  const [projects, setProjects] = useState<PGProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(`${API}/projects?token=${getToken()}`);
      if (res.status === 401) { setAuthorized(false); setLoading(false); return; }
      setAuthorized(true);
      setProjects(await res.json());
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  if (loading) return <Shell><p style={s.muted}>Loading Project Guardian...</p></Shell>;
  if (!authorized) return <Shell><p style={{ ...s.muted, color: "#ef4444" }}>Unauthorized. Add ?token=YOUR_CRON_SECRET to the URL.</p></Shell>;

  return (
    <Shell>
      <div style={s.header}>
        <h1 style={s.title}>Project Guardian</h1>
        <span style={s.subtitle}>Dashboard</span>
      </div>

      <div style={s.statusBar}>
        <div style={dot("#22c55e")} />
        <span style={s.statusText}>{projects.filter(p => p.status === "active").length} Active Project{projects.filter(p => p.status === "active").length !== 1 ? "s" : ""}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {projects.map(p => (
          <a
            key={p.id}
            href={`/project-guardian/projects/${p.id}?token=${getToken()}`}
            style={s.projectCard}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>{p.name}</h2>
              {p.phase && <span style={s.badge}>{PHASE_LABELS[p.phase] || p.phase}</span>}
            </div>
            <p style={{ fontSize: "13px", color: "#a1a1aa", margin: "4px 0 0" }}>
              {[p.address, p.city, p.state].filter(Boolean).join(", ")}
            </p>
            {(p.resale_target_low || p.resale_target_high) && (
              <p style={{ fontSize: "13px", color: "#71717a", margin: "4px 0 0" }}>
                Resale target: {fmt(p.resale_target_low)} – {fmt(p.resale_target_high)}
              </p>
            )}
          </a>
        ))}
      </div>

      <div style={s.footer}>Project Guardian v1.0 — Sean Shallis</div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={s.container}>
      <div style={s.card}>{children}</div>
    </div>
  );
}

function dot(color: string): React.CSSProperties {
  return { width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` };
}

const s: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh", background: "#09090b", display: "flex", alignItems: "flex-start",
    justifyContent: "center", padding: "48px 24px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: "#fafafa",
  },
  card: { width: "100%", maxWidth: "640px" },
  header: { display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" },
  title: { fontSize: "24px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" },
  subtitle: { fontSize: "14px", color: "#71717a", fontWeight: 400 },
  statusBar: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "12px 16px", borderRadius: "10px",
    background: "#14532d", border: "1px solid #22c55e", marginBottom: "20px",
  },
  statusText: { fontSize: "14px", fontWeight: 600, fontFamily: "monospace", letterSpacing: "0.02em" },
  projectCard: {
    display: "block", padding: "20px", background: "#18181b",
    border: "1px solid #27272a", borderRadius: "12px",
    textDecoration: "none", color: "#fafafa",
    transition: "border-color 0.15s",
    cursor: "pointer",
  },
  badge: {
    fontSize: "11px", fontWeight: 600, textTransform: "uppercase" as const,
    letterSpacing: "0.05em", padding: "4px 10px", borderRadius: "6px",
    background: "#c2410c22", color: "#fb923c", border: "1px solid #c2410c44",
  },
  muted: { fontSize: "14px", color: "#71717a" },
  footer: { textAlign: "center" as const, fontSize: "11px", color: "#3f3f46", marginTop: "32px" },
};
