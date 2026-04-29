import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAuth } from "@/lib/auth";
import {
  getLegacyProject as getProject,
  getProjectPayments as getPayments,
  getProjectContractors as getContractors,
  getProjectMilestones as getMilestones,
} from "@/lib/pg/db";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetailClient } from "@/components/pg/ProjectDetailClient";

export default async function PortalProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await requireAuth();
  const { id } = await params;

  const project = await getProject(id);
  if (!project) {
    return (
      <div className="space-y-6">
        <Link
          href="/portal/projects"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={14} /> All Projects
        </Link>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-neutral-500">Project not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Verify ownership
  if (project.user_id && project.user_id !== userId) {
    return (
      <div className="space-y-6">
        <Link
          href="/portal/projects"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={14} /> All Projects
        </Link>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-neutral-500">You don&apos;t have access to this project.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [payments, contractors, milestones] = await Promise.all([
    getPayments(id),
    getContractors(id),
    getMilestones(id),
  ]);

  return (
    <ProjectDetailClient
      project={project}
      initialPayments={payments}
      initialContractors={contractors}
      initialMilestones={milestones}
    />
  );
}
