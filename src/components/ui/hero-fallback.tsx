"use client";

import { motion } from "motion/react";

type HeroFallbackProps = {
  isSplineLoaded: boolean;
};

export function HeroFallback({ isSplineLoaded }: HeroFallbackProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: isSplineLoaded ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(244,206,20,0.06), #0F172A 80%)",
      }}
    />
  );
}
