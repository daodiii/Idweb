"use client";

import { useEffect } from "react";

/**
 * Holds each heading marker (.mk, a-klar-calm.css) until its heading scrolls into view, then lets it draw once.
 * Markers in the raw demo markup are included, so this works on the DOM rather than through <Marker>.
 * Without script, or with reduced motion, the CSS draws them on load (or shows them drawn).
 */
export function MarkerReveal() {
  useEffect(() => {
    const marks = [...document.querySelectorAll<HTMLElement>(".ka.calm .mk")];
    if (!marks.length) return;
    const html = document.documentElement;
    html.dataset.mk = "";
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -15% 0px" },
    );
    marks.forEach((m) => io.observe(m));
    return () => {
      io.disconnect();
      delete html.dataset.mk;
    };
  }, []);

  return null;
}
