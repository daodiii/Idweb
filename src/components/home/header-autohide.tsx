"use client";

import { useEffect, useRef } from "react";

/**
 * Marks the sticky header with data-hide while the reader scrolls down, and clears it on the way back up. Only the calm
 * homepage styles react to it (a-klar-calm.css); elsewhere the attribute does nothing. The header stays put near the
 * top, while the mobile menu is open, and while anything inside it has focus.
 */
export function HeaderAutohide() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hdr = ref.current?.closest<HTMLElement>(".hdr");
    if (!hdr) return;
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const menuOpen = !!hdr.querySelector(".menupanel:not([hidden])");
      if (y < 120 || menuOpen || hdr.contains(document.activeElement)) hdr.removeAttribute("data-hide");
      else if (y > last + 6) hdr.setAttribute("data-hide", "");
      else if (y < last - 6) hdr.removeAttribute("data-hide");
      if (Math.abs(y - last) > 6) last = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} hidden />;
}
