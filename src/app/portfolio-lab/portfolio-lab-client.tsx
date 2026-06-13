"use client";

import { useEffect, useState } from "react";
import { FolioIndex } from "@/components/portfolio-lab/folio-index";
import { FolioDesk } from "@/components/portfolio-lab/folio-desk";
import { FolioWall } from "@/components/portfolio-lab/folio-wall";
import { FolioCarousel } from "@/components/portfolio-lab/folio-carousel";
import { FolioTunnel } from "@/components/portfolio-lab/folio-tunnel";
import { FolioTrack } from "@/components/portfolio-lab/folio-track";
import { INK, YELLOW } from "@/lib/motion";

const VARIANTS = [
  { id: 0, label: "01 Arkivet", component: FolioIndex },
  { id: 1, label: "02 Dekket", component: FolioDesk },
  { id: 2, label: "03 Veggen", component: FolioWall },
  { id: 3, label: "04 Karusellen", component: FolioCarousel },
  { id: 4, label: "05 Tunnelen", component: FolioTunnel },
  { id: 5, label: "06 Sporet", component: FolioTrack },
] as const;

// Start on the first of the three new concepts.
const DEFAULT = 3;

export function PortfolioLabClient() {
  const [active, setActive] = useState(DEFAULT);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= VARIANTS.length) setActive(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Active = VARIANTS[active].component;

  return (
    <div className="relative">
      {/* Scroll to top on switch so pinned/scroll-driven variants start clean */}
      <Active key={active} />

      {/* Switcher */}
      <div className="fixed bottom-5 left-1/2 z-[120] w-[calc(100vw-2rem)] max-w-[640px] -translate-x-1/2">
        <div
          className="scrollbar-hide flex items-center gap-1 overflow-x-auto rounded-full border p-1.5 shadow-2xl"
          style={{ backgroundColor: INK, borderColor: "rgba(243,240,231,0.15)" }}
        >
          {VARIANTS.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => {
                window.scrollTo(0, 0);
                setActive(variant.id);
              }}
              className="shrink-0 cursor-pointer rounded-full px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-200"
              style={
                active === variant.id
                  ? { backgroundColor: YELLOW, color: INK }
                  : { color: "rgba(243,240,231,0.6)" }
              }
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
