"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { SplineScene } from "@/components/ui/spline-scene";
import { HeroFallback } from "@/components/ui/hero-fallback";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const headlineWord = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const, delay },
  }),
};

export function HeroSection() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={sectionRef} className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[var(--color-dark-bg)]">
      {/* Layer 0: Gradient fallback (always renders, fades when Spline ready) */}
      <HeroFallback isSplineLoaded={isSplineLoaded} />

      {/* Layer 0.5: Aurora gradient for mobile */}
      <div
        className="aurora-glow-layer pointer-events-none absolute inset-0 z-[1] lg:hidden"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(6,182,212,0.25), transparent 60%)",
            "radial-gradient(ellipse 70% 50% at 70% 70%, rgba(244,206,20,0.18), transparent 55%)",
            "radial-gradient(ellipse 90% 80% at 50% 50%, rgba(6,182,212,0.08), transparent 70%)",
          ].join(", "),
        }}
      />

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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        >
          {/* Mobile hero — staggered reveal with parallax */}
          <motion.div
            className="mb-8 lg:hidden"
            style={
              prefersReducedMotion
                ? undefined
                : { y: parallaxY, opacity: parallaxOpacity }
            }
          >
            <motion.p
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-4 text-xs font-semibold tracking-[0.2em] text-[var(--color-dark-muted)]"
            >
              {HERO.eyebrow}
            </motion.p>

            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              className="hero-shimmer bg-clip-text text-4xl font-black leading-[1.1] tracking-tight text-transparent sm:text-5xl"
            >
              {["IDWEB", "BYGGER", "DIN", "NYE", "NETTSIDE"].map(
                (word, i) => (
                  <motion.span
                    key={word}
                    variants={headlineWord}
                    className="inline-block"
                  >
                    {word}
                    {i < 4 && " "}
                  </motion.span>
                ),
              )}
            </motion.h1>

            <motion.p
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              custom={0.9}
              className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--color-dark-muted)]"
            >
              {HERO.subheadline}
            </motion.p>

            {/* Mobile CTAs */}
            <motion.div
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              custom={1.1}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
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
            </motion.div>
          </motion.div>

          {/* Desktop CTAs (no parallax, no stagger) */}
          <div className="hidden flex-col items-center justify-center gap-3 sm:flex-row lg:flex">
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
