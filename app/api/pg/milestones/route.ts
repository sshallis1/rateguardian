// PG | Milestones — List & Create

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pg/auth";
import { getProjectMilestones, createMilestone } from "@/lib/pg/db";

export async function GET(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId)
    return NextResponse.json(
      { error: "project_id required" },
      { status: 400 }
    );

  const milestones = await getProjectMilestones(projectId);
  return NextResponse.json(milestones);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const milestone = await createMilestone(body);
  return NextResponse.json(milestone, { status: 201 });
}
