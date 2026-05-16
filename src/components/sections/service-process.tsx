"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ProcessStep } from "@/types";

interface ServiceProcessProps {
  steps: ProcessStep[];
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function ServiceProcess({ steps }: ServiceProcessProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 12% 18%, rgba(244,206,20,0.13), transparent 62%)",
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
            Slik jobber vi
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Fra første samtale
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                til lansering
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              i fire trinn.
            </span>
          </h2>

          <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
            En tydelig prosess uten overraskelser. Du vet til enhver tid hvor
            prosjektet står og hva som skjer videre.
          </p>
        </motion.div>

        <ol className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
          {steps.map((step, i) => {
            const reversed = i % 2 === 1;
            const numeral = String(step.step).padStart(2, "0");
            return (
              <motion.li
                key={step.step}
                className={`flex flex-col gap-10 lg:items-center lg:gap-20 ${
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  ease: EASE,
                }}
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-5">
                    <span
                      className="select-none font-serif font-black leading-none tracking-tighter text-[#F4CE14]/25"
                      style={{ fontSize: "clamp(4.5rem, 9vw, 8rem)" }}
                    >
                      {numeral}
                    </span>
                    <span
                      aria-hidden
                      className="inline-block h-px w-12 bg-[#F4CE14]/40"
                    />
                  </div>

                  <h3 className="mt-5 font-serif text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                    {step.title}
                  </h3>

                  <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/65 sm:text-lg">
                    {step.description}
                  </p>
                </div>

                <div className="hidden flex-1 lg:block">
                  <div className="relative">
                    <span
                      aria-hidden
                      className="select-none font-serif font-black leading-[0.78] tracking-[-0.05em] text-white/[0.04]"
                      style={{ fontSize: "clamp(10rem, 22vw, 20rem)" }}
                    >
                      {numeral}
                    </span>
                    <div className="absolute inset-0 flex items-center">
                      <div className="ml-2 max-w-[14rem]">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4CE14]">
                          Trinn {step.step} av {steps.length}
                        </p>
                        <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-white/40">
                          {reversed ? "Vi tar styringen" : "Du er involvert"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
