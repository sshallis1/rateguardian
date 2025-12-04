import * as crypto from 'crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const WEBHOOK_SECRET = process.env.ROSIE_WEBHOOK_SECRET!

function verifySignature(body: string, signature: string) {
  if (!WEBHOOK_SECRET) throw new Error('Missing ROSIE_WEBHOOK_SECRET')
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET)
  const digest = hmac.update(body).digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(digest, 'hex')
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const signature = req.headers['x-rosie-signature'] as string
    const body = JSON.stringify(req.body)

    if (!signature || !verifySignature(body, signature)) {
      return res.status(401).json({ error: 'Invalid or missing signature' })
    }

    console.log('✅ Verified alert from relay:', req.body)
    // TODO: forward to GHL, update dashboard, etc.
    return res.status(200).json({ status: 'received', data: req.body })
  } catch (err: any) {
    console.error('❌ Signature verification failed:', err)
    return res.status(500).json({ error: err.message || 'Internal error' })
  }
}
