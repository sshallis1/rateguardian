// /api/index.js
import { createClient } from "@supabase/supabase-js";

// ✅ Environment variables (Vercel)
const SUPABASE_URL = process.env.SUPABASE_URL || "https://vyemolbvhnojryqjxqgj.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZW1vbGJ2aG5vanJ5cWp4cWdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTExMDEzOCwiZXhwIjoyMDc2Njg2MTM4fQ.onF-QZjxWOqQL0Y69GSy3SQS9XnJ3O3G_vKGQTbI8Mk";
const GHL_WEBHOOK_URL =
  process.env.GHL_WEBHOOK_URL ||
  "https://vyemolbvhnojryqjxqgj.supabase.co/rest/v1/rpc/notify_rate_alert";

// ✅ Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  try {
    // 🧠 Simple health check query
    const { data, error } = await supabase.from("contacts").select("id").limit(1);

    if (error) {
      console.error("❌ Supabase error:", error.message);
      return res
        .status(500)
        .json({ status: "❌ Error", message: "Supabase query failed", details: error.message });
    }

    // 🛰️ Optionally trigger webhook
    let webhookResult = null;
    try {
      webhookResult = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Rate Guardian Engine ping successful" }),
      });
    } catch (whError) {
      console.warn("⚠️ Webhook call failed:", whError.message);
    }

    return res.status(200).json({
      status: "✅ Rate Guardian Engine Connected",
      rowsReturned: data?.length || 0,
      webhookSent: webhookResult?.ok || false,
    });
  } catch (err) {
    console.error("❌ Unhandled error:", err);
    return res.status(500).json({
      status: "❌ Server Crash",
      message: err.message,
    });
  }
}
    
