import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const payload = req.body

    // 🔁 Forward payload to Rosie AI endpoint
    const forward = await fetch('https://your-vercel-app.vercel.app/api/rosie-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = await forward.text()
    return res.status(200).json({ status: 'ok', message: 'Alert relayed to Rosie', result })
  } catch (err: any) {
    console.error('Forwarding failed', err)
    return res.status(500).json({ error: 'Forwarding failed', detail: err.message })
  }
}

