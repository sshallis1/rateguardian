import { createClient } from '@supabase/supabase-js'

// Use environment variables (set these in Vercel → Settings → Environment Variables)
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    // 1️⃣ Get unsent alerts
    const { data: alerts, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('alert_sent', false)
      .limit(10)

    if (error) throw error
    if (!alerts || alerts.length === 0)
      return res.status(200).json({ message: 'No unsent alerts.' })

    // 2️⃣ Send each alert to Rosie AI endpoint
    for (const alert of alerts) {
      await fetch('https://your-vercel-app.vercel.app/api/rosie-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert),
      })

      // 3️⃣ Mark as sent
      await supabase
        .from('alerts')
        .update({ alert_sent: true })
        .eq('id', alert.id)
    }

    return res.status(200).json({ status: 'ok', sent: alerts.length })
  } catch (err) {
    console.error('Relay Error:', err)
    return res.status(500).json({ error: err.message })
  }
}

