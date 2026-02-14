import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    console.log("Webhook received:", req.body)
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return res.status(500).json({ success: false })
  }
}
