"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer's place over the hero into --px and --py (-1 to 1) on the hero picture (.ht), eased so it trails
 * the hand. Each screen in the picture reads them with its own depth (a-klar-calm.css, «hero picture»). Only with a
 * fine pointer and without reduced motion; otherwise both stay 0 and nothing moves.
 */
export function HeroParallax() {
  useEffect(() => {
    const vis = document.querySelector<HTMLElement>(".ka.calm .ht");
    const hero = vis?.closest<HTMLElement>(".hero");
    if (!vis || !hero) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const tick = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      vis.style.setProperty("--px", x.toFixed(4));
      vis.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const leave = () => {
      tx = ty = 0;
      kick();
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return null;
}
