import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export interface OgCard {
  /** Small line above the title: the page or category. */
  kicker: string;
  /** The page's own headline, set large. */
  title: string;
}

/** Schibsted Grotesk, the site's own face (SIL OFL, see og-fonts/OFL.txt), as woff: Satori cannot read woff2. */
const fonts = (async () => {
  const dir = path.join(process.cwd(), "src/lib/og-fonts");
  const [semibold, extrabold] = await Promise.all([
    readFile(path.join(dir, "schibsted-grotesk-latin-600-normal.woff")),
    readFile(path.join(dir, "schibsted-grotesk-latin-800-normal.woff")),
  ]);
  return [
    { name: "Schibsted Grotesk", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Schibsted Grotesk", data: extrabold, weight: 800 as const, style: "normal" as const },
  ];
})();

/**
 * The link preview for every page (1200×630), in the A · Klar look: white card, ink headline, cobalt kicker,
 * peach corner and the orange booking pill. Satori only lays out flex boxes, so every element with more than one
 * child sets display: flex.
 */
export async function ogImage({ kicker, title }: OgCard) {
  const size = title.length > 70 ? 54 : title.length > 44 ? 64 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#FFFFFF",
          color: "#14161B",
          position: "relative",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            bottom: -180,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "#FCEBDB",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 4 }}>IDWEB</span>
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: 2, color: "#5A606C" }}>WEBBYRÅ OG SYSTEMUTVIKLER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#2447D6" }}>{kicker}</span>
          <span style={{ fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span
            style={{
              display: "flex",
              padding: "14px 30px",
              borderRadius: 9999,
              background: "#F9A04F",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            Book en gratis prat
          </span>
          <span style={{ fontSize: 24, fontWeight: 600, color: "#4A505B" }}>idweb.no · Oslo</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts },
  );
}
