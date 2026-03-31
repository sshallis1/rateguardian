// RG | Egress | Engine Result Routing
// Reads Rosie's evaluation output and branches contact to correct destination.
// SAFETY: This endpoint never writes ROSIE_STATUS or ROSIE_PATH.
// It writes: tags (path routing), LAST_ROUTED_AT (timestamp).
// Called by Master Dispatcher after engine completes.

import { NextRequest, NextResponse } from "next/server";
import {
  getContact,
  addTags,
  moveToPipelineStage,
  triggerWorkflow,
  updateCustomField,
} from "@/lib/rg/ghl-client";
import { RG_FIELDS, ROSIE_STATUS, ROSIE_PATH } from "@/lib/rg/types";
import { resolveCustomFields } from "@/lib/rg/field-map";

// GHL workflow IDs — set these after creating the GHL workflow shells
const WORKFLOW_IDS = {
  OPS_INTERNAL_NOTIFY: process.env.GHL_WF_OPS_NOTIFY || "",
};

// GHL pipeline ID — your RG pipeline
const RG_PIPELINE_ID = process.env.GHL_RG_PIPELINE_ID || "";

// Pipeline stage IDs mapped by Rosie Path
const STAGE_IDS: Record<string, string> = {
  [ROSIE_PATH.PRE_APPROVED]: process.env.GHL_STAGE_BUYING || "",
  [ROSIE_PATH.STARTING]: process.env.GHL_STAGE_SHOPPING || "",
  [ROSIE_PATH.MONITORING]: process.env.GHL_STAGE_REFI || "",
};

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await req.json();
    const contactId = body.contactId || body.id;
    if (!contactId) {
      return NextResponse.json({ error: "contactId or id required" }, { status: 400 });
    }

    // Fetch full contact
    const contact = await getContact(contactId);
    const fields = resolveCustomFields(
      contact.customFields
    );

    const rosieStatus = fields[RG_FIELDS.ROSIE_STATUS];
    const rosiePath = fields[RG_FIELDS.ROSIE_PATH];

    // ── GATE: In Progress = engine still running. Stop. ──
    if (rosieStatus === ROSIE_STATUS.IN_PROGRESS) {
      return NextResponse.json({
        action: "skipped",
        reason: "Engine still In Progress",
        contactId,
      });
    }

    // ── BRANCH: Needs Data → notify ops ──
    if (rosieStatus === ROSIE_STATUS.NEEDS_DATA) {
      await addTags(contactId, ["RG_Needs_Data"]);
      await updateCustomField(contactId, RG_FIELDS.LAST_ROUTED_AT, new Date().toISOString());

      if (WORKFLOW_IDS.OPS_INTERNAL_NOTIFY) {
        await triggerWorkflow(WORKFLOW_IDS.OPS_INTERNAL_NOTIFY, contactId);
      }

      return NextResponse.json({
        action: "routed",
        branch: "needs_data",
        contactId,
        elapsed: Date.now() - startTime,
      });
    }

    // ── BRANCH: Completed → route by path ──
    if (rosieStatus === ROSIE_STATUS.COMPLETED) {
      let branch: string;
      let pathTag: string;
      let stageId: string | undefined;

      switch (rosiePath) {
        case ROSIE_PATH.PRE_APPROVED:
          branch = "buying";
          pathTag = "RG_Path_Buying";
          stageId = STAGE_IDS[ROSIE_PATH.PRE_APPROVED];
          break;
        case ROSIE_PATH.STARTING:
          branch = "shopping";
          pathTag = "RG_Path_Shopping";
          stageId = STAGE_IDS[ROSIE_PATH.STARTING];
          break;
        case ROSIE_PATH.MONITORING:
          branch = "refi";
          pathTag = "RG_Path_Refi";
          stageId = STAGE_IDS[ROSIE_PATH.MONITORING];
          break;
        case ROSIE_PATH.UNKNOWN:
        default:
          branch = "unknown";
          pathTag = "RG_Path_Unknown";
          // Unknown path → notify ops, don't move pipeline
          await addTags(contactId, [pathTag]);
          await updateCustomField(contactId, RG_FIELDS.LAST_ROUTED_AT, new Date().toISOString());

          if (WORKFLOW_IDS.OPS_INTERNAL_NOTIFY) {
            await triggerWorkflow(WORKFLOW_IDS.OPS_INTERNAL_NOTIFY, contactId);
          }

          return NextResponse.json({
            action: "routed",
            branch: "unknown_path",
            contactId,
            elapsed: Date.now() - startTime,
          });
      }

      // Apply path tag
      await addTags(contactId, [pathTag]);

      // Move to pipeline stage if IDs are configured
      if (RG_PIPELINE_ID && stageId) {
        await moveToPipelineStage(contactId, RG_PIPELINE_ID, stageId);
      }

      // Timestamp the routing
      await updateCustomField(contactId, RG_FIELDS.LAST_ROUTED_AT, new Date().toISOString());

      return NextResponse.json({
        action: "routed",
        branch,
        pathTag,
        contactId,
        elapsed: Date.now() - startTime,
      });
    }

    // ── FALLBACK: Unknown status → log and stop ──
    return NextResponse.json({
      action: "skipped",
      reason: `Unhandled RG_Rosie_Status: ${rosieStatus}`,
      contactId,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[RG Result Routing Error]", message);
    return NextResponse.json(
      { action: "error", error: message },
      { status: 200 } // 200 to prevent GHL retry floods
    );
  }
}
