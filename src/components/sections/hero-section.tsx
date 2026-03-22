"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { SplineScene } from "@/components/ui/spline-scene";
import { HeroFallback } from "@/components/ui/hero-fallback";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { MeshGradient } from "@/components/ui/mesh-gradient";

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

      {/* Layer 0.5: WebGL mesh gradient + noise + SVG lines (mobile only) */}
      <div className="hero-entrance-canvas pointer-events-none absolute inset-0 z-[1] lg:hidden" aria-hidden="true">
        <MeshGradient />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
            opacity: 0.03,
          }}
        />

        {/* Flowing SVG lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#F4CE14" />
            </linearGradient>
          </defs>
          <path
            d="M-20,200 Q100,120 200,250 T420,180"
            stroke="url(#heroLineGrad)"
            strokeWidth="0.8"
            style={{ animation: "svgLineDrift1 8s ease-in-out infinite" }}
          />
          <path
            d="M-20,400 Q150,340 250,450 T420,380"
            stroke="url(#heroLineGrad)"
            strokeWidth="0.6"
            style={{ animation: "svgLineDrift2 10s ease-in-out 2s infinite" }}
          />
          <path
            d="M-20,600 Q80,550 200,620 T420,570"
            stroke="url(#heroLineGrad)"
            strokeWidth="0.5"
            style={{ animation: "svgLineDrift3 9s ease-in-out 4s infinite" }}
          />
        </svg>
      </div>

      {/* Layer 1: Spline 3D scene (desktop only, lazy loaded) */}
      <SplineScene onLoaded={setIsSplineLoaded} />

      {/* Layer 5: Readability overlay (desktop only — aids contrast over Spline 3D) */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Layer 10: Text content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        >
          {/* Mobile hero — CSS entrance + parallax */}
          <motion.div
            className="mb-8 -mt-16 lg:hidden"
            style={
              prefersReducedMotion
                ? undefined
                : { y: parallaxY, opacity: parallaxOpacity }
            }
          >
            <p className="hero-entrance-eyebrow mb-8 text-xs font-semibold tracking-[0.2em] text-white">
              {HERO.eyebrow}
            </p>

            <h1 className="hero-shimmer bg-clip-text text-[1.85rem] font-black leading-[1.1] tracking-tight text-transparent min-[375px]:text-4xl sm:text-5xl">
              {["IDWEB", "BYGGER", "DIN", "NYE", "NETTSIDE"].map(
                (word, i) => (
                  <span
                    key={word}
                    className={`hero-entrance-word-${i + 1} inline-block${i < 4 ? " mr-[0.3em]" : ""}`}
                  >
                    {word}
                  </span>
                ),
              )}
            </h1>

            <p className="hero-entrance-sub mx-auto mt-5 max-w-md text-base leading-relaxed text-white">
              {HERO.subheadline}
            </p>

            {/* Mobile CTAs — rainbow buttons */}
            <div className="hero-entrance-cta mt-14 flex flex-row items-center justify-center gap-3">
              <Link
                href="/referanser"
                className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-5 py-3 text-sm font-bold`}
              >
                {HERO.primaryCta}
              </Link>
              <Link
                href="/kontakt"
                className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-5 py-3 text-sm font-medium`}
              >
                {HERO.secondaryCta}
              </Link>
            </div>
          </motion.div>

          {/* Desktop CTAs (no parallax, no stagger) */}
          <div className="hidden flex-col items-center justify-center gap-3 pt-48 sm:flex-row lg:flex">
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
