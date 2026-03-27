"use client";

import { motion, useReducedMotion } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { PaletteBackground } from "@/components/ui/palette-background";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

const BRAND_GRADIENT =
  "linear-gradient(135deg, #5BC0BE 0%, #FF6B6B 35%, #F4CE14 65%, #5BC0BE 100%)";

const headlineWords = HERO.headline.split(" ");

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const skip = !!prefersReducedMotion;

  return (
    <PaletteBackground palette="horisonten" singleLayer className="flex min-h-svh w-full items-center justify-center">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Brand name — massive gradient-clipped text */}
        <motion.h1
          className="font-serif select-none"
          initial={skip ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="block text-[clamp(5rem,18vw,14rem)] font-black leading-[0.85] tracking-tight"
            style={{
              backgroundImage: BRAND_GRADIENT,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: skip ? "none" : "gradientShift 8s ease-in-out infinite alternate",
            }}
          >
            {HERO.brand}
          </span>

          {/* Headline words — staggered reveal */}
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-[0.35em] text-[clamp(1.5rem,5vw,3.5rem)] font-extralight leading-tight tracking-[0.04em] text-white/90 sm:mt-4">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={skip ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/55 sm:mt-8 sm:text-lg"
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {HERO.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row"
          initial={skip ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
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
      </div>

      {/* Gradient shift keyframes injected via style tag */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </PaletteBackground>
  );
}
