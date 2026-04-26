// PG | Projects — Get & Update single project (dual auth)

import { NextRequest, NextResponse } from "next/server";
import { authenticatePG } from "@/lib/pg/auth";
import { getLegacyProject as getProject, updateLegacyProject as updateProject } from "@/lib/pg/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticatePG(req);
  if (!auth.authenticated)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const project = await getProject(id);
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Clerk users can only see their own projects
  if (auth.userId && project.user_id && project.user_id !== auth.userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json(project);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await authenticatePG(req);
  if (!auth.authenticated)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Verify ownership for Clerk users
  const existing = await getProject(id);
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (auth.userId && existing.user_id && existing.user_id !== auth.userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const project = await updateProject(id, body);
  return NextResponse.json(project);
}
