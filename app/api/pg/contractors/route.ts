// PG | Contractors — List & Create

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pg/auth";
import { getProjectContractors, createContractor } from "@/lib/pg/db";

export async function GET(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId)
    return NextResponse.json(
      { error: "project_id required" },
      { status: 400 }
    );

  const contractors = await getProjectContractors(projectId);
  return NextResponse.json(contractors);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const contractor = await createContractor(body);
  return NextResponse.json(contractor, { status: 201 });
}
