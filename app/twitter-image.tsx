import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Sean Shallis — Eliminate Financial Blind Spots. Automatically.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0f1419 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "rgba(14, 107, 109, 0.2)",
              border: "1px solid rgba(14, 107, 109, 0.4)",
              borderRadius: "100px",
              padding: "8px 20px",
              color: "#2dd4bf",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2dd4bf" }} />
            U.S. Bank · Private Wealth
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "56px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
            Eliminate Financial
          </div>
          <div style={{ fontSize: "56px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
            Blind Spots. <span style={{ color: "#2dd4bf" }}>Automatically.</span>
          </div>
          <div style={{ fontSize: "22px", color: "#94a3b8", lineHeight: 1.5, maxWidth: "700px", marginTop: "8px" }}>
            AI-powered systems that watch your money, your rate, and your opportunities.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff" }}>Sean Shallis</div>
            <div style={{ fontSize: "16px", color: "#64748b" }}>
              Private Wealth Mortgage Strategist · NMLS #2362814
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { name: "Rate", color: "#0e6b6d" },
              { name: "Project", color: "#c2410c" },
              { name: "Trade", color: "#2563eb" },
              { name: "Home", color: "#16a34a" },
            ].map((g) => (
              <div
                key={g.name}
                style={{
                  background: `${g.color}30`,
                  border: `1px solid ${g.color}60`,
                  borderRadius: "8px",
                  padding: "6px 14px",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: g.color }} />
                {g.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
