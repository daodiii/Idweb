import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/content/blog";

export const alt = "IDweb Blogg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "IDweb Blogg";
  const category = post?.category ?? "Artikkel";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,206,20,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top: logo + category */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "#F4CE14",
              letterSpacing: "-1px",
              display: "flex",
            }}
          >
            IDweb
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              border: "1px solid rgba(244,206,20,0.4)",
              color: "#F4CE14",
              fontSize: 18,
              fontWeight: 600,
              display: "flex",
            }}
          >
            {category}
          </div>
        </div>

        {/* Center: title */}
        <div
          style={{
            fontSize: title.length > 60 ? 40 : 52,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Bottom */}
        <div
          style={{
            fontSize: 18,
            color: "#888",
            display: "flex",
          }}
        >
          idweb.no/blogg
        </div>
      </div>
    ),
    { ...size }
  );
}
