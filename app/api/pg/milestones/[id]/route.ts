// PG | Milestones — Update

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pg/auth";
import { updateMilestone } from "@/lib/pg/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const milestone = await updateMilestone(id, body);
  return NextResponse.json(milestone);
}
