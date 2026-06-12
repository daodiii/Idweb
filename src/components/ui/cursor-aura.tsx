"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribePointer(onChange: () => void) {
  const mq = window.matchMedia(POINTER_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(POINTER_QUERY).matches,
    () => false,
  );
}

/**
 * Cursor aura — a yellow dot and a trailing ring in difference blend,
 * additive to (not replacing) the native cursor. The ring swells over
 * links and buttons. Pointer-device only.
 */
export function CursorAura() {
  const finePointer = useFinePointer();
  const [over, setOver] = useState(false);
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setOver(!!target?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4CE14] mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F4CE14] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: over ? 1.9 : 1, opacity: over ? 0.9 : 0.55 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
