"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PACKAGES } from "@/lib/content/pricing";

const EASE = [0.23, 1, 0.32, 1] as const;

export function PricingPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 18% 18%, rgba(244,206,20,0.13), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Priser
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Ærlige priser,
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                ingen
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>{" "}
              overraskelser
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Alle prosjekter skreddersys, men her er utgangspunktene.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
            },
          }}
        >
          {PACKAGES.map((pkg, i) => {
            const highlight = pkg.highlight;
            return (
              <motion.div
                key={pkg.id}
                variants={{
                  hidden: prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0 : 0.55,
                      ease: EASE,
                    },
                  },
                }}
                className={`relative flex flex-col rounded-3xl border p-8 transition-transform duration-200 ${
                  highlight
                    ? "border-[#F4CE14]/35 bg-[rgba(244,206,20,0.035)] shadow-[0_30px_60px_-30px_rgba(244,206,20,0.18)] md:-translate-y-3"
                    : "border-white/[0.07] bg-white/[0.015]"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
              >
                {highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F4CE14] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]">
                    Mest populær
                  </span>
                )}

                <p
                  className={`font-mono text-xs uppercase tracking-[0.22em] ${
                    highlight ? "text-[#F4CE14]" : "text-white/45"
                  }`}
                >
                  {pkg.name}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-black leading-none tracking-tight text-white">
                    {pkg.price}
                  </span>
                </div>

                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  + {pkg.monthly} vedlikehold
                </p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-white/[0.06] pt-6">
                  {pkg.features.slice(0, 4).map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
                    >
                      <span
                        aria-hidden
                        className={`mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full ${
                          highlight ? "bg-[#F4CE14]" : "bg-white/35"
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-14 text-center">
          <Link
            href="/priser"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white/70 transition-colors duration-150 hover:text-[#F4CE14]"
            style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
          >
            Se alle detaljer
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
