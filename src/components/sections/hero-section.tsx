"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { SplineScene } from "@/components/ui/spline-scene";
import { HeroFallback } from "@/components/ui/hero-fallback";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export function HeroSection() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  return (
    <section className="section-fade-to-light relative flex h-svh w-full items-center justify-center overflow-hidden bg-[var(--color-dark-bg)]">
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
          transition={{ duration: 0.35 }}
        >
          <div className="mt-24 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/referanser"
              className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-bold`}
            >
              {HERO.primaryCta}{" "}
              <MoveRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/kontakt"
              className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-medium`}
            >
              {HERO.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
