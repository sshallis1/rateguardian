// PG | Payments — List & Create

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/pg/auth";
import { getProjectPayments, createPayment } from "@/lib/pg/db";

export async function GET(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projectId = req.nextUrl.searchParams.get("project_id");
  if (!projectId)
    return NextResponse.json(
      { error: "project_id required" },
      { status: 400 }
    );

  const payments = await getProjectPayments(projectId);
  return NextResponse.json(payments);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const payment = await createPayment(body);
  return NextResponse.json(payment, { status: 201 });
}
