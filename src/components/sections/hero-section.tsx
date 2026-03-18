"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { SplineScene } from "@/components/ui/spline-scene";
import { HeroFallback } from "@/components/ui/hero-fallback";

export function HeroSection() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  return (
    <section className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[var(--color-dark-bg)]">
      {/* Layer 0: Gradient fallback (always renders, fades when Spline ready) */}
      <HeroFallback isSplineLoaded={isSplineLoaded} />

      {/* Layer 1: Spline 3D scene (desktop only, lazy loaded) */}
      <SplineScene onLoaded={setIsSplineLoaded} />

      {/* Layer 5: Readability overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Layer 10: Text content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[var(--color-accent)]">
            {HERO.eyebrow}
          </p>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-[var(--color-dark-text)] sm:text-4xl md:text-5xl lg:text-6xl">
            {HERO.headline}{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] bg-clip-text text-transparent">
              {HERO.headlineHighlight}
            </span>{" "}
            {HERO.headlineEnd}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-dark-muted)] md:text-base lg:text-lg">
            {HERO.subheadline}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/referanser"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-bold text-[var(--color-dark-bg)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              {HERO.primaryCta}{" "}
              <MoveRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-[var(--color-dark-text)] transition-colors hover:border-white/30 hover:bg-white/5"
            >
              {HERO.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
