import { createClient } from '@supabase/supabase-js';

/**
 * API route for recording the daily Rate Guardian engine health snapshot.
 *
 * This route should be called by a scheduled Vercel Cron job. It uses the
 * Supabase service role key (provided via environment variables) to invoke
 * the `record_rate_alerts_health_snapshot` remote procedure and returns a
 * JSON response indicating success or failure. In case of error, the
 * specific error message will be sent back for easier debugging.
 *
 * To schedule this route, add an entry to your `vercel.json` file like:
 *
 * ```json
 * {
 *   "crons": [
 *     {
 *       "path": "/api/recordHealth",
 *       "schedule": "0 0 * * *"
 *     }
 *   ]
 * }
 * ```
 */
export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
      return res
        .status(500)
        .json({ success: false, error: 'Supabase configuration variables are missing' });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Call the Supabase function that logs the daily health snapshot
    const { error } = await supabase.rpc('record_rate_alerts_health_snapshot');
    if (error) {
      console.error('RPC error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log('Rate Guardian Health Snapshot recorded successfully');
    return res.status(200).json({ success: true, message: 'Health snapshot recorded' });
  } catch (err) {
    console.error('Unexpected error while recording health snapshot:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}