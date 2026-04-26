import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  FileText,
  CheckSquare,
  AlertTriangle,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { SpokeNav } from "@/components/brand/SpokeNav";
import { Footer } from "@/components/brand/Footer";
import { Container } from "@/components/ui/container";
import { getProjectDashboard } from "@/lib/pg/db";

export const metadata: Metadata = {
  title: "Project Dashboard — Project Guardian",
  description: "Track your renovation budget, expenses, estimates, and tasks in one place.",
};

// Use 102 Wiltop as the demo project
const DEMO_PROJECT_ID = "00000000-0000-4000-8000-000000000100";

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default async function DashboardPage() {
  let dashboard;
  try {
    dashboard = await getProjectDashboard(DEMO_PROJECT_ID);
  } catch {
    dashboard = null;
  }

  if (!dashboard) {
    return (
      <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
        <SpokeNav />
        <section className="py-20">
          <Container>
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Project Dashboard</h1>
              <p className="text-neutral-600 mb-8">
                Run the database migration to see the 102 Wiltop Rd demo project.
              </p>
              <Link
                href="/project-guardian"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
              >
                Back to Project Guardian
              </Link>
            </div>
          </Container>
        </section>
        <Footer />
      </main>
    );
  }

  const { project, budgets, expenses, estimates, tasks, comparisons, roi, totalBudget, totalSpent, estimateCount, openTaskCount, overpayAlerts } = dashboard;

  const projectedProfit = roi?.projected_profit ?? 0;

  return (
    <main className="min-h-screen bg-[color:var(--brand-cream)] text-neutral-900">
      <SpokeNav />

      <section className="py-12 md:py-16">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-neutral-400 uppercase tracking-wider mb-1">
              Project Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {project.project_name}
            </h1>
            <p className="text-neutral-500 mt-1">
              {project.project_status === "active" ? "Active" : project.project_status} &middot; {project.project_type}
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            <MetricCard
              icon={DollarSign}
              label="Total Budget"
              value={fmt(totalBudget)}
              color="text-neutral-900"
            />
            <MetricCard
              icon={DollarSign}
              label="Actual Spend"
              value={fmt(totalSpent)}
              color="text-emerald-600"
            />
            <MetricCard
              icon={BarChart3}
              label="Projected Profit"
              value={fmt(projectedProfit)}
              color={projectedProfit > 0 ? "text-emerald-600" : "text-red-600"}
            />
            <MetricCard
              icon={FileText}
              label="Estimates"
              value={String(estimateCount)}
              color="text-blue-600"
            />
            <MetricCard
              icon={CheckSquare}
              label="Open Tasks"
              value={String(openTaskCount)}
              color="text-amber-600"
            />
            <MetricCard
              icon={AlertTriangle}
              label="Overpay Alerts"
              value={String(overpayAlerts.length)}
              color={overpayAlerts.length > 0 ? "text-red-600" : "text-emerald-600"}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Budget Breakdown */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                Budget vs Actual
              </h2>
              <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">
                        Category
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">
                        Planned
                      </th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-neutral-400 uppercase">
                        Actual
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgets
                      .filter((b) => b.planned_amount > 0 || b.actual_amount > 0)
                      .map((b) => (
                        <tr
                          key={b.id}
                          className="border-b border-neutral-50 last:border-0"
                        >
                          <td className="px-4 py-2.5 text-neutral-900">
                            {b.category?.name ?? "Unknown"}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-neutral-500">
                            {fmt(b.planned_amount)}
                          </td>
                          <td
                            className={`px-4 py-2.5 text-right font-mono font-semibold ${
                              b.actual_amount > b.planned_amount && b.planned_amount > 0
                                ? "text-red-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {b.actual_amount > 0 ? fmt(b.actual_amount) : "--"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Overpay Alerts */}
              {overpayAlerts.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-4">
                    Potential Overpay Alerts
                  </h2>
                  <div className="space-y-3">
                    {overpayAlerts.map((c) => (
                      <div
                        key={c.id}
                        className="rounded-xl border border-red-200 bg-red-50 p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-neutral-900">
                            {c.category?.name ?? "Unknown"}
                          </span>
                          <span className="text-sm font-bold text-red-600">
                            Save {fmt(c.potential_savings)}
                          </span>
                        </div>
                        <div className="text-sm text-neutral-600 mb-2">
                          <span>Quoted: {fmt(c.user_estimate_amount)}</span>
                          <span className="mx-2">&rarr;</span>
                          <span>
                            Guardian Target: {fmt(c.guardian_target_amount)}
                          </span>
                        </div>
                        {c.recommendation && (
                          <p className="text-xs text-neutral-500 italic">
                            {c.recommendation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Open Tasks */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                  Open Tasks
                </h2>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.status !== "done")
                    .map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-200 bg-white"
                      >
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            t.priority === "high" || t.priority === "urgent"
                              ? "bg-red-500"
                              : t.status === "in_progress"
                                ? "bg-amber-500"
                                : "bg-neutral-300"
                          }`}
                        />
                        <span className="text-sm text-neutral-900 flex-1">
                          {t.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          {t.priority}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Recent Expenses */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
                  Recent Expenses
                </h2>
                <div className="space-y-2">
                  {expenses.slice(0, 5).map((e) => (
                    <div
                      key={e.id}
                      className="flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-200 bg-white"
                    >
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {e.category?.name ?? "Expense"}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {e.expense_date} &middot;{" "}
                          {e.vendor?.vendor_name ?? "Vendor"}
                        </div>
                      </div>
                      <div className="text-sm font-bold font-mono text-neutral-900">
                        {fmt(e.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-10">
            <Link
              href="/project-guardian/scan"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 transition-colors"
            >
              Upload New Estimate
            </Link>
            <Link
              href="/project-guardian/compare"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
            >
              View All Comparisons
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/project-guardian/chat"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border-2 border-neutral-300 text-neutral-900 font-semibold text-sm hover:border-neutral-900 transition-colors"
            >
              Ask Rosie
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-neutral-400" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          {label}
        </span>
      </div>
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
    </div>
  );
}
