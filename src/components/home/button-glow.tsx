"use client";

import { useEffect } from "react";

/**
 * The homepage buttons are lit where the pointer is (a radial highlight, as on airbnb.com): pointer moves over a button
 * are passed on as --mx/--my, which a-klar-calm.css uses for the gradient's centre. Without it the light sits in the middle.
 */
export function ButtonGlow() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const b = (e.target as Element | null)?.closest<HTMLElement>(".btn, .dd-cta span");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      b.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
