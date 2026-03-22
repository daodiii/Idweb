import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IDweb — Nettsideutvikling i Norge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,206,20,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,206,20,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#F4CE14",
            letterSpacing: "-2px",
            display: "flex",
          }}
        >
          IDweb
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#e0e0e0",
            marginTop: 16,
            fontWeight: 400,
            display: "flex",
          }}
        >
          Nettsider som gir deg flere kunder
        </div>

        {/* Services bar */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 40,
          }}
        >
          {["Webdesign", "SEO", "Vedlikehold"].map((s) => (
            <div
              key={s}
              style={{
                padding: "10px 28px",
                borderRadius: 8,
                border: "1px solid rgba(244,206,20,0.4)",
                color: "#F4CE14",
                fontSize: 20,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Location */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "#888",
            display: "flex",
          }}
        >
          Oslo, Norge — idweb.no
        </div>
      </div>
    ),
    { ...size }
  );
}
