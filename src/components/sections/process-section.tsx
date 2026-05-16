"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

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

const EASE = [0.23, 1, 0.32, 1] as const;

export function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 92% 18%, rgba(244,206,20,0.13), transparent 60%)",
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
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Slik jobber vi
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Fra idé til
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              lansering
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              på <span className="relative inline-block">
                1-2-3
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>

          <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Vår velprøvde prosess sørger for at du får en nettside du er stolt
            av, uten stress.
          </p>
        </div>

        <ol className="mt-20 space-y-24 lg:mt-28 lg:space-y-32">
          {STEPS.map((step, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.li
                key={step.title}
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
                      {String(i + 1).padStart(2, "0")}
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

                <div className="flex-1">
                  <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
                    <Image
                      src={step.image}
                      width={720}
                      height={540}
                      alt={step.imageAlt}
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.15) 100%)",
                      }}
                    />
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
