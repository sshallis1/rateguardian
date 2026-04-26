import Link from "next/link";
import { Plus, FolderKanban } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import { getLegacyProjects as getProjects } from "@/lib/pg/db";
import { getUserTier } from "@/lib/auth";
import { getTierFeatures } from "@/lib/membership";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Projects" };

const PHASE_LABELS: Record<string, string> = {
  demo: "Demo",
  rough: "Rough",
  finish: "Finish",
  punch_list: "Punch List",
  complete: "Complete",
};

function fmt(n: number | null): string {
  if (n == null) return "--";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default async function PortalProjectsPage() {
  const userId = await requireAuth();
  const [projects, tier] = await Promise.all([
    getProjects(userId),
    getUserTier(),
  ]);
  const features = getTierFeatures(tier);
  const canCreate = projects.length < features.maxProjects;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Projects</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {projects.length} of {features.maxProjects} project
            {features.maxProjects > 1 ? "s" : ""}
          </p>
        </div>
        {canCreate ? (
          <Link
            href="/portal/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--brand-teal)] text-white text-sm font-semibold hover:bg-[color:var(--brand-teal-dark)] transition-colors"
          >
            <Plus size={16} />
            New Project
          </Link>
        ) : (
          <span className="text-xs text-neutral-400">
            Upgrade to Pro for more projects
          </span>
        )}
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FolderKanban
              size={48}
              className="mx-auto text-neutral-300 mb-4"
            />
            <h3 className="font-semibold text-neutral-900 mb-1">
              No projects yet
            </h3>
            <p className="text-sm text-neutral-500 mb-4">
              Start tracking your renovation with Project Guardian.
            </p>
            {canCreate && (
              <Link
                href="/portal/projects/new"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[color:var(--brand-teal)] text-white text-sm font-semibold"
              >
                <Plus size={16} />
                Create Your First Project
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <Link key={p.id} href={`/portal/projects/${p.id}`}>
              <Card className="hover:shadow-md hover:border-neutral-300 transition-all cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-neutral-900">
                      {p.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      {p.phase && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                          {PHASE_LABELS[p.phase] || p.phase}
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          p.status === "active"
                            ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                            : "text-neutral-500 bg-neutral-100 border border-neutral-200"
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-500 mt-1">
                    {[p.address, p.city, p.state].filter(Boolean).join(", ")}
                  </p>
                  {(p.resale_target_low || p.resale_target_high) && (
                    <p className="text-sm text-neutral-400 mt-1 font-mono">
                      Resale: {fmt(p.resale_target_low)} --{" "}
                      {fmt(p.resale_target_high)}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
