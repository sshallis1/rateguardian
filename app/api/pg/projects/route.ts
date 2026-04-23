// PG | Projects — List & Create

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pg/auth";
import { getProjects, createProject } from "@/lib/pg/db";

export async function GET(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const project = await createProject(body);
  return NextResponse.json(project, { status: 201 });
}
