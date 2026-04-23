// PG | Contractors — Update

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pg/auth";
import { updateContractor } from "@/lib/pg/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const contractor = await updateContractor(id, body);
  return NextResponse.json(contractor);
}
