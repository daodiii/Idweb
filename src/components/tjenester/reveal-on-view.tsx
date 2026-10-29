"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps something that draws in once when it scrolls into view. It adds .is-armed on mount and .is-in when seen, so the
 * CSS only hides things while armed and not yet in: without script, or with reduced motion, everything is shown.
 */
export function RevealOnView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    el.classList.add("is-armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
