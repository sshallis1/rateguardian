import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    })
  }

  try {
    const body = req.body

    console.log("Webhook received:", body)

    // -----------------------------------------
    // RG MVP Monitor Routing Logic
    // -----------------------------------------
    if (body.tag === "rg_mvp_monitor") {

      const loanType = body.loanProduct
      let branch = "DEFAULT"

      if (loanType === "30-Year Fixed") branch = "AGENCY_30"
      else if (loanType === "15-Year Fixed") branch = "AGENCY_15"
      else if (loanType === "Jumbo") branch = "JUMBO"
      else if (loanType === "FHA") branch = "FHA"
      else if (loanType === "VA") branch = "VA"

      return res.status(200).json({
        success: true,
        route: branch,
        actions: [
          "internal_notification",
          "contact_followup",
          "pipeline_update"
        ]
      })
    }

    // -----------------------------------------
    // Default Catch-All
    // -----------------------------------------
    return res.status(200).json({
      success: true,
      route: "NO_MATCH",
      message: "No routing rule matched"
    })

  } catch (error) {
    console.error("Webhook error:", error)

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}
