import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../lib/supabase";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? "WGHSkjfQwkjnWQEkjbFEFNjkerbkjbDSVVjhbW2JDDbck";

interface RateRow {
    term: string;
    rate: string;
    apr: string;
    monthlyPayment: string;
    points: string;
}

interface RateCategory {
    title: string;
    rates: RateRow[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
          if (req.method !== "POST") {
                  return res.status(405).json({ error: "Method Not Allowed" });
          }

      const auth = req.headers?.get("authorization");
          if (!auth || auth !== `Bearer ${WEBHOOK_SECRET}`) {
                  return res.status(401).json({ error: "Unauthorized" });
          }

      const { items } = req.body as { items: RateCategory[] };
          if (!Array.isArray(items) || items.length === 0) {
                  return res.status(400).json({ error: "Invalid payload: expected non-empty items array" });
          }

      // Extract the 30-year conventional rate as the primary market rate
      const conventional = items.find((i) => i.title?.toLowerCase().includes("conventional fixed"));
          const thirtyYear = conventional?.rates?.find((r) => r.term === "30-year");
          const marketRate = thirtyYear ? parseFloat(thirtyYear.rate) : null;

      // Persist all scraped rate categories to Supabase
      const { error } = await supabase
            .from("market_rates" as any)
            .insert({
                      source: "usbank",
                      scraped_at: new Date().toISOString(),
                      rate_30yr_conventional: marketRate,
                      raw: items,
            } as any);

      if (error) {
              console.error("Supabase write error:", error);
              return res.status(500).json({ error: "Database write failed", details: error });
      }

      console.log(`Webhook received: ${items.length} categories, 30yr conventional = ${marketRate}%`);

      return res.status(200).json({
              success: true,
              market_rate_30yr: marketRate,
              categories_received: items.length,
      });
    } catch (err: any) {
          console.error("Unhandled /api/webhook error:", err);
          return res.status(500).json({ error: "Unexpected server error", details: err?.message });
    }
}
