"use client";

import { useState, useEffect, useCallback } from "react";

const API_BASE = "/api/rg/ops";

// Token passed via URL param for simple auth from GHL bookmark
function getToken(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("token") || "";
}

function authHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
}

interface Status {
  holidayMode: boolean;
  heldLeads: number;
  totalContacts: number;
  timestamp: string;
}

type Action = "pickup" | "eod" | "eod+1" | "drain" | null;

export default function RGDashboard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<Action>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [eodDays, setEodDays] = useState(1);
  const [authorized, setAuthorized] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/status?token=${getToken()}`);
      if (res.status === 401) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      setAuthorized(true);
      const data = await res.json();
      setStatus(data);
    } catch {
      setLastResult("Failed to fetch status");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  async function doAction(action: Action, body: Record<string, unknown> = {}) {
    setActionInProgress(action);
    setLastResult(null);
    try {
      let endpoint = "";
      let method = "POST";

      switch (action) {
        case "pickup":
          // Turn off holiday mode, then drain
          await fetch(`${API_BASE}/holiday`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ enabled: false }),
          });
          const drainRes = await fetch(`${API_BASE}/drain`, {
            method: "POST",
            headers: authHeaders(),
          });
          const drainData = await drainRes.json();
          setLastResult(
            `Pickup complete. ${drainData.drained || 0} held leads released.`
          );
          break;

        case "eod":
          await fetch(`${API_BASE}/holiday`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ enabled: true }),
          });
          setLastResult("EOD — Holiday mode ON. Outbound sequences held.");
          break;

        case "eod+1":
          await fetch(`${API_BASE}/holiday`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ enabled: true, resumeDays: eodDays }),
          });
          setLastResult(
            `EOD+${eodDays} — Holiday mode ON for ${eodDays} day${eodDays > 1 ? "s" : ""}. Leads will queue until you run Pickup.`
          );
          break;

        case "drain":
          const res = await fetch(`${API_BASE}/drain`, {
            method: "POST",
            headers: authHeaders(),
          });
          const data = await res.json();
          if (data.action === "blocked") {
            setLastResult("Cannot drain — holiday mode still ON. Run Pickup first.");
          } else {
            setLastResult(
              `Drain complete. ${data.drained || 0} leads re-routed. ${data.errors?.length || 0} errors.`
            );
          }
          break;
      }

      await fetchStatus();
    } catch (err) {
      setLastResult(`Error: ${err instanceof Error ? err.message : "Unknown"}`);
    }
    setActionInProgress(null);
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={styles.loadingText}>Loading Rate Guardian...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Rate Guardian</h1>
          <p style={{ ...styles.loadingText, color: "#ef4444" }}>
            Unauthorized. Add ?token=YOUR_CRON_SECRET to the URL.
          </p>
        </div>
      </div>
    );
  }

  const isHoliday = status?.holidayMode ?? false;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Rate Guardian</h1>
          <span style={styles.subtitle}>Command Center</span>
        </div>

        {/* Status Bar */}
        <div
          style={{
            ...styles.statusBar,
            background: isHoliday ? "#7f1d1d" : "#14532d",
            borderColor: isHoliday ? "#dc2626" : "#22c55e",
          }}
        >
          <div style={statusDotStyle(isHoliday ? "#ef4444" : "#22c55e")} />
          <span style={styles.statusText}>
            {isHoliday ? "HOLIDAY MODE — Outbound Held" : "ACTIVE — Normal Operations"}
          </span>
        </div>

        {/* Metrics */}
        <div style={styles.metricsRow}>
          <div style={styles.metric}>
            <span style={styles.metricValue}>{status?.heldLeads ?? "—"}</span>
            <span style={styles.metricLabel}>Held Leads</span>
          </div>
          <div style={styles.metric}>
            <span style={styles.metricValue}>{status?.totalContacts ?? "—"}</span>
            <span style={styles.metricLabel}>Total Contacts</span>
          </div>
          <div style={styles.metric}>
            <span style={{ ...styles.metricValue, fontSize: "14px", fontFamily: "monospace" }}>
              {status?.timestamp
                ? new Date(status.timestamp).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  })
                : "—"}
            </span>
            <span style={styles.metricLabel}>Last Check</span>
          </div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Actions */}
        <div style={styles.actionsGrid}>
          {/* Pickup — Morning start */}
          <button
            style={{
              ...styles.actionBtn,
              background: "#166534",
              borderColor: "#22c55e",
              opacity: actionInProgress ? 0.5 : 1,
            }}
            disabled={!!actionInProgress}
            onClick={() => doAction("pickup")}
          >
            <span style={styles.btnIcon}>&#9654;</span>
            <span style={styles.btnTitle}>Pickup</span>
            <span style={styles.btnDesc}>Start day. Release held leads.</span>
          </button>

          {/* EOD — End of day */}
          <button
            style={{
              ...styles.actionBtn,
              background: "#7f1d1d",
              borderColor: "#dc2626",
              opacity: actionInProgress ? 0.5 : 1,
            }}
            disabled={!!actionInProgress}
            onClick={() => doAction("eod")}
          >
            <span style={styles.btnIcon}>&#9724;</span>
            <span style={styles.btnTitle}>EOD</span>
            <span style={styles.btnDesc}>End day. Hold all outbound.</span>
          </button>

          {/* EOD+X — Extended away */}
          <div
            style={{
              ...styles.actionBtn,
              background: "#78350f",
              borderColor: "#f59e0b",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={styles.btnIcon}>&#128197;</span>
              <span style={styles.btnTitle}>EOD+</span>
              <select
                value={eodDays}
                onChange={(e) => setEodDays(Number(e.target.value))}
                style={styles.daySelect}
              >
                {[1, 2, 3, 4, 5, 7, 14].map((d) => (
                  <option key={d} value={d}>
                    {d}d
                  </option>
                ))}
              </select>
            </div>
            <button
              style={{
                ...styles.miniBtn,
                opacity: actionInProgress ? 0.5 : 1,
              }}
              disabled={!!actionInProgress}
              onClick={() => doAction("eod+1")}
            >
              Activate {eodDays}-day hold
            </button>
          </div>

          {/* Drain — Manual release */}
          <button
            style={{
              ...styles.actionBtn,
              background: "#1e1b4b",
              borderColor: "#818cf8",
              opacity: actionInProgress ? 0.5 : 1,
            }}
            disabled={!!actionInProgress}
            onClick={() => doAction("drain")}
          >
            <span style={styles.btnIcon}>&#8631;</span>
            <span style={styles.btnTitle}>Drain Queue</span>
            <span style={styles.btnDesc}>Re-route held leads now.</span>
          </button>
        </div>

        {/* Result Toast */}
        {lastResult && (
          <div style={styles.toast}>
            {lastResult}
          </div>
        )}

        {/* Loading indicator */}
        {actionInProgress && (
          <div style={styles.toast}>
            Running {actionInProgress}...
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          Rate Guardian v1.0 — Sean Shallis | NMLS #2362814
        </div>
      </div>
    </div>
  );
}

function statusDotStyle(color: string): React.CSSProperties {
  return {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: color,
    boxShadow: `0 0 8px ${color}`,
  };
}

// Inline styles — dark mode, zinc tokens, Geist-inspired
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "#09090b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#fafafa",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#18181b",
    border: "1px solid #27272a",
    borderRadius: "16px",
    padding: "32px",
  },
  header: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "24px",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "14px",
    color: "#71717a",
    fontWeight: 400,
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid",
    marginBottom: "20px",
  },
  statusText: {
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "monospace",
    letterSpacing: "0.02em",
  },
  metricsRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "20px",
  },
  metric: {
    flex: 1,
    background: "#27272a",
    borderRadius: "10px",
    padding: "16px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "4px",
  },
  metricValue: {
    fontSize: "28px",
    fontWeight: 700,
    fontFamily: "monospace",
    color: "#fafafa",
  },
  metricLabel: {
    fontSize: "11px",
    color: "#71717a",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  },
  divider: {
    height: "1px",
    background: "#27272a",
    margin: "4px 0 20px",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },
  actionBtn: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "4px",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid",
    cursor: "pointer",
    transition: "opacity 0.15s",
    textAlign: "left" as const,
    color: "#fafafa",
    fontSize: "14px",
  },
  btnIcon: {
    fontSize: "20px",
    marginBottom: "2px",
  },
  btnTitle: {
    fontSize: "16px",
    fontWeight: 700,
  },
  btnDesc: {
    fontSize: "12px",
    color: "#a1a1aa",
    lineHeight: "1.3",
  },
  daySelect: {
    background: "#27272a",
    color: "#fafafa",
    border: "1px solid #3f3f46",
    borderRadius: "6px",
    padding: "4px 8px",
    fontSize: "14px",
    fontFamily: "monospace",
  },
  miniBtn: {
    width: "100%",
    padding: "8px",
    background: "#92400e",
    color: "#fafafa",
    border: "1px solid #f59e0b",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  },
  toast: {
    background: "#27272a",
    border: "1px solid #3f3f46",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "13px",
    color: "#d4d4d8",
    fontFamily: "monospace",
    marginBottom: "12px",
  },
  footer: {
    textAlign: "center" as const,
    fontSize: "11px",
    color: "#3f3f46",
    marginTop: "8px",
  },
};
