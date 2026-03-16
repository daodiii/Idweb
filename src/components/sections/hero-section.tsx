"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { LaptopFrame } from "@/components/ui/device-frame";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { HERO, FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";
import type { PortfolioSite } from "@/types";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(
    (s): s is PortfolioSite => s !== null
  );

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % sites.length);
  }, [sites.length]);

  useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance]);

  const activeSite = sites[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-dark-bg)]">
      <InteractiveGrid id="hero-grid" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse, rgba(244,206,20,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-40">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[var(--color-accent)]">
              {HERO.eyebrow}
            </p>

            <h1 className="text-3xl font-black leading-tight tracking-tight text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
              {HERO.headline}{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] bg-clip-text text-transparent">
                {HERO.headlineHighlight}
              </span>{" "}
              {HERO.headlineEnd}
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[var(--color-dark-muted)] md:text-base">
              {HERO.subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

          {/* Right — Project carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-xl border border-white/5 bg-[var(--color-dark-bg-alt)] p-4 sm:p-6">
              <AnimatePresence mode="popLayout">
                {activeSite && (
                  <motion.div
                    key={activeSite.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LaptopFrame
                      imageSrc={activeSite.images.desktop}
                      imageAlt={`${activeSite.name} nettside`}
                      priority={activeIndex === 0}
                      className="w-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination dots */}
              <div className="mt-4 flex justify-center gap-2">
                {sites.map((site, i) => (
                  <button
                    key={site.id}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === activeIndex
                        ? "bg-[var(--color-accent)]"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Vis prosjekt ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating PageSpeed badge */}
            <div className="absolute -bottom-3 -right-3 rounded-lg border border-[rgba(244,206,20,0.25)] bg-[rgba(244,206,20,0.12)] px-3 py-1.5 text-xs font-bold text-[var(--color-accent)] backdrop-blur-sm sm:bottom-4 sm:right-4">
              98/100 PageSpeed
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
