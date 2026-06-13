"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { HERO } from "@/lib/content/homepage";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE, INK, PAPER, VOID, YELLOW } from "@/lib/motion";

/**
 * Hero — «Lommelykt». Two parallel worlds occupy the same space: the
 * dark page, and a vivid yellow world hiding beneath it. The cursor is
 * a flashlight; a circular lens reveals the yellow world wherever it
 * moves. Without a fine pointer the lens drifts on its own orbit.
 */

function Line({ children, index }: { children: ReactNode; index: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className="block text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, ease: EASE, delay: 0.25 + index * 0.12 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function WorldContent({
  world,
  interactive,
}: {
  world: "dark" | "yellow";
  interactive: boolean;
}) {
  const dark = world === "dark";
  const fg = dark ? PAPER : INK;
  const sub = dark ? "rgba(243,240,231,0.65)" : "rgba(20,20,16,0.75)";

  return (
    <div
      className="flex min-h-[100dvh] flex-col justify-center px-[4vw] pt-20"
      style={{ color: fg }}
      aria-hidden={!interactive}
    >
      <h1>
        {interactive && <span className="sr-only">{HERO.headline}</span>}
        <span aria-hidden>
          <Line index={0}>Webutvikling</Line>
          <Line index={1}>og nettsider{dark ? "" : " ✳"}</Line>
          <Line index={2}>
            i Oslo<span style={{ color: dark ? YELLOW : INK }}>.</span>
          </Line>
        </span>
      </h1>

      <motion.p
        className="mt-8 max-w-[46ch] text-base leading-relaxed sm:text-lg"
        style={{ color: sub }}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
      >
        {HERO.subheadline}
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
      >
        <Magnetic>
          <Link
            href="/referanser"
            tabIndex={interactive ? 0 : -1}
            className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold transition-transform duration-200 active:scale-[0.97]"
            style={
              dark
                ? { backgroundColor: PAPER, color: INK }
                : { backgroundColor: INK, color: YELLOW }
            }
          >
            {HERO.primaryCta}
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Magnetic>
        <Magnetic strength={0.22}>
          <Link
            href="/kontakt"
            tabIndex={interactive ? 0 : -1}
            className="inline-flex items-center gap-2 border-b-2 pb-1 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-60"
            style={{ borderColor: dark ? YELLOW : INK, color: fg }}
          >
            {HERO.secondaryCta}
          </Link>
        </Magnetic>
      </motion.div>

      <motion.p
        className="mt-14 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.3em]"
        style={{ color: dark ? "rgba(244,206,20,0.85)" : "rgba(20,20,16,0.6)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span
          aria-hidden
          className="status-dot-pulse inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: dark ? YELLOW : INK }}
        />
        {dark ? "Flytt musen — lys opp forskjellen" : "Dette er forskjellen"}
      </motion.p>
    </div>
  );
}

export function HeroLommelykt() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasPointer, setHasPointer] = useState(false);

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.7 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.7 });
  const mask = useMotionTemplate`radial-gradient(circle 230px at ${x}px ${y}px, black 98%, transparent 100%)`;

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setHasPointer(fine);

    if (fine && !reduced) {
      // Section-relative coordinates so the lens stays true mid-scroll.
      const onMove = (e: PointerEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }

    // No fine pointer: the lens orbits on its own.
    if (!reduced) {
      let raf = 0;
      const start = performance.now();
      const loop = (now: number) => {
        const t = (now - start) / 1000;
        const rect = sectionRef.current?.getBoundingClientRect();
        const w = rect?.width ?? window.innerWidth;
        const h = rect?.height ?? window.innerHeight;
        mx.set(w * 0.55 + Math.cos(t * 0.5) * w * 0.3);
        my.set(h * 0.45 + Math.sin(t * 0.7) * h * 0.28);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(raf);
    }
  }, [reduced, mx, my]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: VOID }}
    >
      {/* Base world — the dark page (interactive layer) */}
      <WorldContent world="dark" interactive />

      {/* Hidden yellow world, revealed through the lens */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: YELLOW,
          WebkitMaskImage: reduced
            ? "radial-gradient(circle 230px at 70% 40%, black 98%, transparent 100%)"
            : mask,
          maskImage: reduced
            ? "radial-gradient(circle 230px at 70% 40%, black 98%, transparent 100%)"
            : mask,
        }}
      >
        <WorldContent world="yellow" interactive={false} />
      </motion.div>

      {/* Lens ring */}
      {!reduced && hasPointer && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-10 h-[464px] w-[464px] rounded-full border-2"
          style={{ x, y, left: -232, top: -232, borderColor: "rgba(244,206,20,0.35)" }}
        />
      )}
    </section>
  );
}
