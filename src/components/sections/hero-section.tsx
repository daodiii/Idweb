"use client";

import { motion, useReducedMotion } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { PaletteBackground } from "@/components/ui/palette-background";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PaletteBackground palette="horisonten" className="flex h-svh w-full items-center justify-center">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        >
          <div className="flex flex-col items-center justify-center gap-3 pt-48 sm:flex-row">
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
    </PaletteBackground>
  );
}
