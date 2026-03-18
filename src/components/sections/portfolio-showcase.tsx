"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame, LaptopFrame, TabletFrame } from "@/components/ui/device-frame";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FEATURED_PORTFOLIO_IDS, PORTFOLIO_STATS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";
import type { PortfolioSite } from "@/types";

export function PortfolioShowcase() {
  const sites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(
    (s): s is PortfolioSite => s !== null
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const prefersReducedMotion = useReducedMotion();

  const activeSite = sites[activeIndex];
  const stats = activeSite ? PORTFOLIO_STATS[activeSite.id] : undefined;

  // --- Navigation helpers ---
  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % sites.length);
  }, [sites.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + sites.length) % sites.length);
  }, [sites.length]);

  // Pause auto-rotation temporarily (resumes after 8s)
  const pauseTemporarily = useCallback(() => {
    pauseTemporarily();
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setIsPaused(false), 8000);
  }, []);

  // Cleanup resume timer
  useEffect(() => {
    return () => clearTimeout(resumeTimerRef.current);
  }, []);

  // --- Auto-rotation (5s, pauses on hover or manual interaction) ---
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext, prefersReducedMotion]);

  // --- Keyboard navigation ---
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") { goPrev(); pauseTemporarily(); }
    if (e.key === "ArrowRight") { goNext(); pauseTemporarily(); }
  }

  return (
    <AuroraBackground variant="top-right" className="px-6 py-20 sm:py-28">
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[var(--color-accent)]">
            Våre prosjekter
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-dark-text)] sm:text-4xl">
            Prosjekter vi har levert
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-dark-muted)]">
            Hver nettside er skreddersydd for kundens behov og bransje.
          </p>
        </motion.div>

        {/* ── Desktop: Device trio stage ── */}
        <motion.div
          className="relative mt-16 hidden md:block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => pauseTemporarily()}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Device trio container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeSite && (
                <motion.div
                  key={activeSite.id}
                  className="flex items-end justify-center gap-5"
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
                >
                  {/* Phone (left) — flat to avoid competing perspective with laptop */}
                  <PhoneFrame
                    imageSrc={activeSite.images.mobile}
                    imageAlt={`${activeSite.name} — mobil`}
                    className="z-10 w-[60px] -translate-y-4 flex-shrink-0 lg:w-[80px]"
                    flat
                  />
                  {/* Laptop (center, dominant) */}
                  <LaptopFrame
                    imageSrc={activeSite.images.desktop}
                    imageAlt={`${activeSite.name} — desktop`}
                    className="z-20 w-[280px] flex-shrink-0 lg:w-[380px]"
                  />
                  {/* Tablet (right) */}
                  <TabletFrame
                    imageSrc={activeSite.images.tablet}
                    imageAlt={`${activeSite.name} — nettbrett`}
                    className="z-10 w-[90px] -translate-y-2 flex-shrink-0 lg:w-[120px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating stat badges */}
            {stats && (
              <>
                <motion.div
                  className="absolute bottom-4 right-4 rounded-lg border border-[rgba(244,206,20,0.25)] bg-[rgba(244,206,20,0.12)] px-3 py-1.5 text-xs font-bold text-[var(--color-accent)] backdrop-blur-sm"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, x: 0, ...(prefersReducedMotion ? {} : { y: [0, -3, 0] }) }}
                  transition={prefersReducedMotion ? { duration: 0.2 } : {
                    opacity: { duration: 0.4, delay: 0.3 },
                    x: { duration: 0.4, delay: 0.3 },
                    y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.7 },
                  }}
                >
                  {stats.pagespeed} PageSpeed
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-4 rounded-lg border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.12)] px-3 py-1.5 text-xs font-bold text-[#22c55e] backdrop-blur-sm"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                  animate={{ opacity: 1, x: 0, ...(prefersReducedMotion ? {} : { y: [0, -3, 0] }) }}
                  transition={prefersReducedMotion ? { duration: 0.2 } : {
                    opacity: { duration: 0.4, delay: 0.45 },
                    x: { duration: 0.4, delay: 0.45 },
                    y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.85 },
                  }}
                >
                  {stats.result}
                </motion.div>
              </>
            )}
          </div>

          {/* Project info */}
          <AnimatePresence mode="wait">
            {activeSite && (
              <motion.div
                key={`info-${activeSite.id}`}
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-[var(--color-dark-text)]">
                  {activeSite.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                  {activeSite.domain}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="mt-6 flex justify-center gap-2">
            {sites.map((site, i) => (
              <button
                key={site.id}
                onClick={() => { setActiveIndex(i); pauseTemporarily(); }}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-[var(--color-accent)]"
                    : "w-1.5 bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Vis ${site.name}`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Mobile: Phone carousel ── */}
        <div
          className="mt-16 md:hidden"
          onTouchStart={() => pauseTemporarily()}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="relative flex flex-col items-center">
            {/* Phone frame — large and centered */}
            <AnimatePresence mode="wait">
              {activeSite && (
                <motion.div
                  key={activeSite.id}
                  initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.92 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, ease: "easeOut" }}
                  className="w-[280px]"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x > 50 || info.velocity.x > 200) {
                      goPrev();
                      pauseTemporarily();
                    } else if (info.offset.x < -50 || info.velocity.x < -200) {
                      goNext();
                      pauseTemporarily();
                    }
                  }}
                >
                  <PhoneFrame
                    imageSrc={activeSite.images.mobile}
                    imageAlt={`${activeSite.name} — mobil`}
                    className="w-full"
                    flat
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project info */}
            <AnimatePresence mode="wait">
              {activeSite && (
                <motion.div
                  key={`mobile-info-${activeSite.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 text-center"
                >
                  <h3 className="text-xl font-bold text-[var(--color-dark-text)]">
                    {activeSite.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                    {activeSite.domain}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inline stat badges (mobile) */}
            {stats && (
              <div className="mt-4 flex justify-center gap-2">
                <span className="rounded-lg border border-[rgba(244,206,20,0.25)] bg-[rgba(244,206,20,0.12)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-accent)]">
                  {stats.pagespeed} PageSpeed
                </span>
                <span className="rounded-lg border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.12)] px-2.5 py-1 text-[10px] font-bold text-[#22c55e]">
                  {stats.result}
                </span>
              </div>
            )}

            {/* Navigation: arrows + dots */}
            <div className="mt-6 flex items-center gap-6">
              <button
                onClick={() => { goPrev(); pauseTemporarily(); }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-[var(--color-dark-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-dark-text)]"
                aria-label="Forrige prosjekt"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {sites.map((site, i) => (
                  <button
                    key={site.id}
                    onClick={() => { setActiveIndex(i); pauseTemporarily(); }}
                    className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-[var(--color-accent)]"
                        : "w-2 bg-white/15"
                    }`}
                    aria-label={`Vis ${site.name}`}
                  />
                ))}
              </div>

              <button
                onClick={() => { goNext(); pauseTemporarily(); }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-[var(--color-dark-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-dark-text)]"
                aria-label="Neste prosjekt"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA link */}
        <div className="mt-12 text-center">
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle referanser <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
    </AuroraBackground>
  );
}
