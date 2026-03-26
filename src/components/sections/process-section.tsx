"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PaletteBackground } from "@/components/ui/palette-background";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Vi blir kjent med deg",
    description:
      "Alt starter med en uforpliktende samtale. Vi lytter til dine behov, kartlegger målgruppen din og forstår hva du ønsker å oppnå.",
    image: "/images/process/step-1.png",
    imageAlt: "Planlegging og kartlegging",
  },
  {
    title: "Vi designer og utvikler",
    description:
      "Vi skaper et skreddersydd design og bygger nettsiden med fokus på hastighet, SEO og brukervennlighet.",
    image: "/images/process/step-2.png",
    imageAlt: "Design og utvikling",
  },
  {
    title: "Vi lanserer og følger opp",
    description:
      "Vi lanserer nettsiden din og tilbyr løpende vedlikehold, oppdateringer og support.",
    image: "/images/process/step-3.png",
    imageAlt: "Lansering og oppfølging",
  },
];

const AUTO_ADVANCE_MS = 4500;

function DesktopProcess() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Respect prefers-reduced-motion — disable auto-advance
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (paused || prefersReducedMotion) return;
    timerRef.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, AUTO_ADVANCE_MS);
  }, [paused, prefersReducedMotion]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, resetTimer]);

  const goTo = (direction: "prev" | "next") => {
    setActive((prev) =>
      direction === "next"
        ? (prev + 1) % STEPS.length
        : (prev - 1 + STEPS.length) % STEPS.length,
    );
  };

  const step = STEPS[active];

  return (
    <PaletteBackground palette="stille-spenning" className="hidden px-6 py-20 md:block">
      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
            Slik jobber vi
          </p>
          <h2 className="mb-4 text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
            Fra idé til lansering på 1-2-3
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-dark-muted)]">
            Min velprøvde prosess sørger for at du får en nettside du er stolt
            av — uten stress.
          </p>
        </div>

        {/* Content */}
        <div className="flex items-center gap-10">
          {/* Left: text */}
          <div className="flex w-1/2 flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-2xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-3xl">
                  {active + 1}. {step.title}
                </h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-dark-muted)]">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step indicators + arrows */}
            <div className="mt-8 flex items-center gap-4">
              {/* Dots */}
              <div className="flex gap-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Gå til steg ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-400 cursor-pointer",
                      active === i
                        ? "w-10 bg-[var(--color-accent)]"
                        : "w-4 bg-[var(--color-dark-muted)]/30 hover:bg-[var(--color-dark-muted)]/50",
                    )}
                  />
                ))}
              </div>

              {/* Pause + Arrow buttons */}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Start automatisk avspilling" : "Pause automatisk avspilling"}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--color-dark-muted)]/20 text-[var(--color-dark-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {paused ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                  )}
                </button>
                <button
                  onClick={() => goTo("prev")}
                  aria-label="Forrige steg"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--color-dark-muted)]/20 text-[var(--color-dark-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => goTo("next")}
                  aria-label="Neste steg"
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--color-dark-muted)]/20 text-[var(--color-dark-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right: image */}
          <div className="w-1/2">
            <div className="h-[28rem] w-full overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.35 }}
                  className="h-full w-full"
                >
                  <Image
                    src={step.image}
                    width={560}
                    height={560}
                    className="h-full w-full object-cover"
                    alt={step.imageAlt}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PaletteBackground>
  );
}

function MobileProcess() {
  return (
    <PaletteBackground palette="stille-spenning" className="px-6 py-14 md:hidden">
      <div className="relative mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
            Slik jobber vi
          </p>
          <h2 className="text-2xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-3xl">
            Fra idé til lansering på 1-2-3
          </h2>
        </div>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-[var(--color-dark-bg)]">
                  {i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-[var(--color-accent)]/20" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="text-base font-bold text-[var(--color-dark-text)]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-dark-muted)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PaletteBackground>
  );
}

export function ProcessSection() {
  return (
    <>
      <MobileProcess />
      <DesktopProcess />
    </>
  );
}
