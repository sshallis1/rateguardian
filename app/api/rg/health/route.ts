// Rate Guardian — Health & Audit Endpoint
// Returns current state of the RG engine for debugging

import { NextResponse } from "next/server";
import { listWorkflows } from "@/lib/rg/ghl-client";
import { isHolidayMode } from "@/lib/rg/holiday-mode";

export async function GET() {
  try {
    const workflows = await listWorkflows();

    // Filter to RG_ prefixed workflows only
    const rgWorkflows = workflows.workflows?.filter(
      (w: { name: string }) => w.name.startsWith("RG")
    ) || [];

    return NextResponse.json({
      service: "Rate Guardian Engine",
      status: "operational",
      holidayMode: isHolidayMode(),
      workflows: rgWorkflows.map((w: { id: string; name: string; status: string }) => ({
        id: w.id,
        name: w.name,
        status: w.status,
      })),
      totalRGWorkflows: rgWorkflows.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { service: "Rate Guardian Engine", status: "error", error: message },
      { status: 500 }
    );
  }
}
