"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { FAQ_PAGE, FAQS } from "@/lib/content/faq";

const EASE = [0.23, 1, 0.32, 1] as const;
const EASE_STR = "cubic-bezier(0.23,1,0.32,1)";

export function FaqContent() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Hero — asymmetric editorial on dark */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 12% 18%, rgba(244,206,20,0.14), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 flex flex-col lg:col-span-8">
            <motion.p
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Vanlige spørsmål
            </motion.p>

            <motion.h1
              className="mt-7 font-serif text-white"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            >
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Alt du lurer på,
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  besvart
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                uten omveier.
              </span>
            </motion.h1>

            <motion.p
              className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            >
              {FAQ_PAGE.subheadline}
            </motion.p>
          </div>

          <div className="col-span-1 hidden lg:col-span-4 lg:flex lg:items-end lg:justify-end">
            <span
              aria-hidden
              className="select-none font-serif text-[10rem] font-black leading-none tracking-tighter text-white/[0.035]"
            >
              ?
            </span>
          </div>
        </div>
      </section>

      {/* FAQ accordion list — light section */}
      <section className="relative overflow-hidden bg-[var(--color-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 92% 18%, rgba(244,206,20,0.08), transparent 62%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          <motion.p
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            {FAQS.length} svar
          </motion.p>

          <motion.p
            className="mt-6 mb-12 max-w-[58ch] font-serif text-2xl font-extralight leading-[1.25] tracking-[-0.01em] text-[var(--color-text)]/80 sm:text-3xl lg:mb-16"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            Trykk for å åpne. Mangler noe, send oss en melding.
          </motion.p>

          <div>
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  className="border-t border-[var(--color-border)] last:border-b"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    delay: prefersReducedMotion ? 0 : Math.min(index, 6) * 0.05,
                    ease: EASE,
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-150 hover:text-[var(--color-accent-hover)] active:scale-[0.998]"
                    style={{ transitionTimingFunction: EASE_STR }}
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg font-bold tracking-[-0.01em] text-[var(--color-text)] sm:text-xl">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border bg-white transition-[transform,border-color,background-color] duration-200 ${
                        isOpen
                          ? "rotate-45 border-[#F4CE14] bg-[#F4CE14]"
                          : "border-[var(--color-border)] group-hover:border-[var(--color-text)]/30"
                      }`}
                      style={{ transitionTimingFunction: EASE_STR }}
                    >
                      <Plus className="h-4 w-4 text-[var(--color-text)]" strokeWidth={2} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.3,
                          ease: EASE,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[68ch] pb-6 pr-12 text-base leading-relaxed text-[var(--color-text-muted)]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA — yellow block */}
      <section className="relative overflow-hidden bg-[var(--color-accent)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10,10,10,0.55) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 8% 88%, rgba(10,10,10,0.16), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 45% at 92% -10%, rgba(255,255,255,0.22), transparent 65%)",
          }}
        />

        <motion.div
          className="relative mx-auto max-w-3xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#0a0a0a]/65">
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
            Fortsatt usikker
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
          </p>

          <h2 className="mt-7 font-serif text-[#0a0a0a]">
            <span className="block text-[clamp(1.75rem,4vw,3rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[#0a0a0a]/75">
              Spørsmålet ditt ikke
            </span>
            <span className="block text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95] tracking-[-0.035em]">
              <span className="relative inline-block">
                her
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#0a0a0a]"
                />
              </span>
              ?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[58ch] text-base leading-relaxed text-[#0a0a0a]/75 sm:text-lg">
            Skriv eller ring, så får du et konkret svar innen 24 timer.
            Uforpliktende og uten salgsprat.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-7 py-4 text-sm font-bold text-[#fafaf9] shadow-[0_10px_30px_-12px_rgba(10,10,10,0.45)] transition-[transform,background-color] duration-150 hover:bg-[#1a1a1a] active:scale-[0.97]"
              style={{ transitionTimingFunction: EASE_STR }}
            >
              Ta kontakt
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: EASE_STR }}
              />
            </Link>
            <Link
              href="/tjenester"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#0a0a0a]/25 px-7 py-4 text-sm font-medium text-[#0a0a0a]/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-[#0a0a0a]/50 hover:bg-[#0a0a0a]/[0.04] hover:text-[#0a0a0a] active:scale-[0.97]"
              style={{ transitionTimingFunction: EASE_STR }}
            >
              Se tjenestene
            </Link>
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-[#0a0a0a]/60">
            Svar innen 24 timer · Ingen bindingstid
          </p>
        </motion.div>
      </section>
    </>
  );
}
