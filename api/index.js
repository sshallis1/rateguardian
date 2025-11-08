import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .limit(1);

    if (error) throw error;

    if (process.env.GHL_WEBHOOK_URL) {
      await fetch(process.env.GHL_WEBHOOK_URL, {
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
      webhookSent: !!process.env.GHL_WEBHOOK_URL,
    });
  } catch (err) {
    res.status(500).json({
      status: "❌ Error",
      message: err.message,
    });
  }
}

