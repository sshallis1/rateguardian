import { createClient } from '@supabase/supabase-js'
import * as crypto from 'crypto'

// ENV: set these in Vercel → Project → Settings → Environment Variables
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
const ROSIE_WEBHOOK_URL = process.env.ROSIE_WEBHOOK_URL! // e.g. https://rg-newproject-20251107.vercel.app/api/rosie-alert
const ROSIE_WEBHOOK_SECRET = process.env.ROSIE_WEBHOOK_SECRET! // any strong random string

function sign(body: string) {
  return crypto.createHmac('sha256', ROSIE_WEBHOOK_SECRET).update(body).digest('hex')
}

async function deliver(alert: any) {
  const body = JSON.stringify({
    id: alert.id,
    contact_id: alert.contact_id,
    name: alert.name,
    loan_type: alert.loan_type,
    current_rate: alert.current_rate,
    market_rate: alert.market_rate,
    delta: alert.delta,
    estimated_savings: alert.estimated_savings,
    message_type: alert.message_type,
    timestamp: alert.inserted_at,
  })

  const headers = {
    'Content-Type': 'application/json',
    'X-Rosie-Signature': sign(body),
    'X-Alert-Id': String(alert.id),
  }

  // simple retry with backoff
  const max = 3
  let attempt = 0, lastErr: any = null
  while (attempt < max) {
    attempt++
    try {
      const res = await fetch(ROSIE_WEBHOOK_URL, { method: 'POST', headers, body })
      if (res.ok) return { ok: true }
      lastErr = await res.text()
    } catch (e: any) {
      lastErr = e?.message || String(e)
    }
    await new Promise(r => setTimeout(r, 300 * attempt)) // 300ms, 600ms, 900ms
  }
  return { ok: false, error: lastErr }
}

export default async function handler(req, res) {
  try {
    // Batch small to avoid long cold-starts
    const { data: alerts, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('alert_sent', false)
      .order('inserted_at', { ascending: true })
      .limit(20)

    if (error) throw error
    if (!alerts?.length) return res.status(200).json({ message: 'No unsent alerts.' })

    let sent = 0
    for (const a of alerts) {
      const result = await deliver(a)
      if (result.ok) {
        await supabase.from('alerts')
          .update({ alert_sent: true, processed_at: new Date().toISOString(), attempts: a.attempts + 1, last_error: null })
          .eq('id', a.id)
        sent++
      } else {
        await supabase.from('alerts')
          .update({ attempts: a.attempts + 1, last_error: String(result.error).slice(0, 2000) })
          .eq('id', a.id)
      }
    }

    return res.status(200).json({ status: 'ok', sent })
  } catch (err: any) {
    console.error('Relay Error:', err)
    return res.status(500).json({ error: err.message || String(err) })
  }
}
