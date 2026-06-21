"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/types";

interface ServicePainPointsProps {
  service: Service;
  /** When set, the section adopts the page's identity: no eyebrow, accent-tinted, per-page headline. */
  accent?: string;
  /** Audience noun for the headline ("pasienter", "jobber" …). Used only with `accent`. */
  lossNoun?: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;

function pickEmphasisWord(title: string): string {
  const tokens = title.split(/[\s-]+/).filter(Boolean);
  if (tokens.length === 0) return title;
  return tokens.reduce((longest, t) => (t.length > longest.length ? t : longest), tokens[0]);
}

export function ServicePainPoints({ service, accent, lossNoun }: ServicePainPointsProps) {
  const prefersReducedMotion = useReducedMotion();
  const emphasis = pickEmphasisWord(service.title);

  const accented = Boolean(accent);
  const accentColor = accent ?? "#F4CE14";
  const head = accented
    ? { lead: "Slik mister du", tail: lossNoun ?? "kunder" }
    : { lead: "Det vi ser", tail: "hver dag" };

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: accented
            ? `radial-gradient(ellipse 55% 45% at 8% 88%, color-mix(in srgb, ${accentColor} 11%, transparent), transparent 60%)`
            : "radial-gradient(ellipse 55% 45% at 8% 88%, rgba(244,206,20,0.13), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {!accented && (
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Smertepunkter
            </p>
          )}

          <h2 className={`font-[family-name:var(--font-heading)] text-white ${accented ? "" : "mt-7"}`}>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              {head.lead}
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                {head.tail}
                <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: accentColor }} />
              </span>
              .
            </span>
          </h2>

          <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
            {service.longDescription}
          </p>
        </motion.div>

        <ul className="mt-16 lg:mt-20" aria-label={`Smertepunkter ${emphasis} adresserer`}>
          {service.painPoints.map((point, i) => (
            <motion.li
              key={point.title}
              className="grid grid-cols-1 gap-5 border-t border-white/[0.06] py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : i * 0.06, ease: EASE }}
            >
              <div className="sm:col-span-4 lg:col-span-3">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">
                  {String(i + 1).padStart(2, "0")} / Smerte
                </p>
                <span
                  aria-hidden
                  className="mt-3 hidden select-none font-[family-name:var(--font-heading)] font-black leading-none tracking-tighter sm:block"
                  style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: `color-mix(in srgb, ${accentColor} 22%, transparent)` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="sm:col-span-8 lg:col-span-9">
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-black leading-[1.1] tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.25rem]">
                  {point.title}
                </h3>
                <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-white/65 sm:text-lg">
                  {point.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
