import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const body = req.body

    // SIMPLE LOGIC TEST
    if (body.test === "PING") {
      return res.status(200).json({
        success: true,
        message: "PONG",
        logicPath: "PING_ROUTE"
      })
    }

    if (body.type === "engine") {
      return res.status(200).json({
        success: true,
        message: "Engine path triggered",
        logicPath: "ENGINE_ROUTE"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Default route",
      logicPath: "DEFAULT_ROUTE"
    })

  } catch (error) {
    console.error("Webhook error:", error)
    return res.status(500).json({ success: false })
  }
}
