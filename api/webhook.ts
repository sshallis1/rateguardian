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
