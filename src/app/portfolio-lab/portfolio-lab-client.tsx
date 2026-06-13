"use client";

import { useEffect, useState } from "react";
import { FolioIndex } from "@/components/portfolio-lab/folio-index";
import { FolioDesk } from "@/components/portfolio-lab/folio-desk";
import { FolioWall } from "@/components/portfolio-lab/folio-wall";
import { INK, YELLOW } from "@/lib/motion";

const VARIANTS = [
  { id: 0, label: "01 Arkivet", component: FolioIndex },
  { id: 1, label: "02 Dekket", component: FolioDesk },
  { id: 2, label: "03 Veggen", component: FolioWall },
] as const;

export function PortfolioLabClient() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "1") setActive(0);
      if (e.key === "2") setActive(1);
      if (e.key === "3") setActive(2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Active = VARIANTS[active].component;

  return (
    <div className="relative">
      <Active key={active} />

      {/* Switcher */}
      <div
        className="fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-1 rounded-full border p-1.5 shadow-2xl"
        style={{ backgroundColor: INK, borderColor: "rgba(243,240,231,0.15)" }}
      >
        {VARIANTS.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => setActive(variant.id)}
            className="cursor-pointer rounded-full px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-200"
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
  );
}
