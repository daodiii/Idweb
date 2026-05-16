"use client";

import { motion, useReducedMotion } from "motion/react";
import { COMPARISON_GRID } from "@/lib/content/homepage";
import type { ComparisonCard } from "@/types";

const EASE = [0.23, 1, 0.32, 1] as const;

const idwebItems = COMPARISON_GRID.filter((c) => c.type === "idweb");
const byråItems = COMPARISON_GRID.filter((c) => c.type === "byrå");

function ComparisonRow({
  card,
  isIdweb,
  index,
}: {
  card: ComparisonCard;
  isIdweb: boolean;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex items-start gap-5 border-t py-6 ${
        isIdweb ? "border-white/[0.08]" : "border-white/[0.05]"
      }`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: EASE,
      }}
    >
      <div className="flex w-20 shrink-0 items-baseline">
        {card.stat ? (
          <div className="flex items-baseline gap-0.5">
            <span
              className={`font-serif font-black leading-none tracking-tight ${
                isIdweb ? "text-[#F4CE14]" : "text-white/40"
              }`}
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              {card.stat}
            </span>
            <span
              className={`font-serif text-base font-bold ${
                isIdweb ? "text-[#F4CE14]/80" : "text-white/35"
              }`}
            >
              {card.unit}
            </span>
          </div>
        ) : (
          <span
            aria-hidden
            className={`mt-2 inline-block h-1.5 w-1.5 rounded-full ${
              isIdweb ? "bg-[#F4CE14]" : "bg-white/25"
            }`}
          />
        )}
      </div>

      <div className="flex-1">
        <h4
          className={`font-bold tracking-[-0.005em] ${
            isIdweb ? "text-base text-white sm:text-lg" : "text-sm text-white/55 line-through decoration-white/15 decoration-1 sm:text-base"
          }`}
        >
          {card.title}
        </h4>
        <p
          className={`mt-1.5 text-sm leading-relaxed ${
            isIdweb ? "text-white/65" : "text-white/40"
          }`}
        >
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ComparisonBento() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 78% 30%, rgba(244,206,20,0.14), transparent 62%)",
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
          className="max-w-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Hvorfor oss?
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Ikke alle nettsider
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              er skapt
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              <span className="relative inline-block">
                like
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>

          <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Slik ser forskjellen ut mellom et typisk byrå og det vi leverer.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="flex items-baseline justify-between border-b border-white/[0.05] pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/35">
                Typisk byrå
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                01 / Slik det vanligvis er
              </span>
            </div>
            <div>
              {byråItems.map((card, i) => (
                <ComparisonRow
                  key={card.title}
                  card={card}
                  isIdweb={false}
                  index={i}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <span
              aria-hidden
              className="absolute -left-6 -top-4 hidden font-serif text-7xl font-black leading-none text-[#F4CE14]/15 lg:block"
            >
              vs.
            </span>
            <div className="flex items-baseline justify-between border-b border-[#F4CE14]/30 pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
                IDweb
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                02 / Slik vi gjør det
              </span>
            </div>
            <div>
              {idwebItems.map((card, i) => (
                <ComparisonRow
                  key={card.title}
                  card={card}
                  isIdweb={true}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
