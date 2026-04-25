// PG | Projects — List & Create (dual auth: Clerk + CRON_SECRET)

import { NextRequest, NextResponse } from "next/server";
import { authenticatePG } from "@/lib/pg/auth";
import { getProjects, createProject } from "@/lib/pg/db";

export async function GET(req: NextRequest) {
  const auth = await authenticatePG(req);
  if (!auth.authenticated)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Clerk users see only their projects; token users see all
  const projects = await getProjects(auth.userId ?? undefined);
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const auth = await authenticatePG(req);
  if (!auth.authenticated)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  // Stamp user_id if Clerk-authed
  if (auth.userId) body.user_id = auth.userId;
  const project = await createProject(body);
  return NextResponse.json(project, { status: 201 });
}
