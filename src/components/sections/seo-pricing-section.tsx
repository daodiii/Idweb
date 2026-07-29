"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SEO_PACKAGES } from "@/lib/content/pricing";

const EASE = [0.23, 1, 0.32, 1] as const;
const EASE_STR = "cubic-bezier(0.23,1,0.32,1)";

export function SeoPricingSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 92% 78%, rgba(244,206,20,0.13), transparent 62%)",
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
            SEO-pakker
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Bli funnet
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              på{" "}
              <span className="relative inline-block">
                google
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Løpende SEO som gir resultater. Vi setter opp arbeidet etter hvor
            hard konkurransen er i din bransje, og du får fastpris per måned før
            vi starter.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
            },
          }}
        >
          {SEO_PACKAGES.map((pkg) => {
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
                style={{ transitionTimingFunction: EASE_STR }}
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

                <p className="mt-6 font-serif text-[clamp(1.75rem,3.2vw,2.25rem)] font-black leading-[1.1] tracking-tight text-white">
                  {pkg.scope}
                </p>

                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {pkg.meta}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-white/65">
                  {pkg.description}
                </p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-white/[0.06] pt-6">
                  {pkg.features.map((feat) => (
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

                <Link
                  href="/kontakt"
                  className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] ${
                    highlight
                      ? "bg-[#F4CE14] text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] hover:bg-[#FFE15D]"
                      : "border border-white/15 text-white/85 hover:border-white/30 hover:bg-white/[0.04] hover:text-white"
                  }`}
                  style={{ transitionTimingFunction: EASE_STR }}
                >
                  Få et uforpliktende tilbud
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ transitionTimingFunction: EASE_STR }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
