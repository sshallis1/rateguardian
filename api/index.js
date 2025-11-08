import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    res.status(500).json({ status: "❌ Error", message: "supabaseUrl is required." });
    return;
  }
  if (!supabaseKey) {
    res.status(500).json({ status: "❌ Error", message: "supabaseKey is required." });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase.from("contacts").select("*").limit(1);
    if (error) throw error;

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Rate Guardian Engine",
          sampleData: data,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    res.status(200).json({
      status: "✅ Rate Guardian Engine Connected",
      rowsReturned: data?.length || 0,
      webhookSent: !!webhookUrl,
    });
  } catch (err) {
    res.status(500).json({ status: "❌ Error", message: err.message });
  }
}
