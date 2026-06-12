"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * Preloader curtain — counts 0→100 while the page settles, then lifts.
 * Shows once per browser session; skipped entirely for reduced motion.
 */

const SESSION_KEY = "idweb-monument-loaded";

export function Preloader() {
  // null = not started (SSR / skipped); counting begins in the rAF loop.
  const [progress, setProgress] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || sessionStorage.getItem(SESSION_KEY)) return;

    const start = performance.now();
    const DURATION = 1100;
    let raf = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / DURATION);
      // Fast start, hesitate, then snap to 100 — feels like real loading.
      const eased = t < 0.7 ? t * 1.18 : 0.826 + (t - 0.7) * 0.58;
      setProgress(Math.min(100, Math.round(eased * 100)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        setDone(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <AnimatePresence>
      {progress !== null && !done && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#0D0D0B] p-6 sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.3em] text-[#F3F0E7]/50">
            <span>IDweb</span>
            <span>Oslo, NO</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold tracking-[-0.03em] text-[#F3F0E7]">
              Webutvikling
              <span className="text-[#F4CE14]">.</span>
            </span>
            <span className="text-[clamp(4rem,12vw,9rem)] font-bold leading-none tracking-[-0.05em] text-[#F4CE14] tabular-nums">
              {progress}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
