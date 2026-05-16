"use client";

import { icons } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ServiceFeature } from "@/types";
import { cn } from "@/lib/utils";

interface ServiceBentoFeaturesProps {
  features: ServiceFeature[];
}

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Asymmetric bento placement (12-col grid on lg):
 * - 0: hero feature — col-span-7, row-span-2 (highlighted with brand tint)
 * - 1: col-span-5
 * - 2: col-span-5
 * - 3: col-span-6
 * - 4: col-span-6
 * - 5+: col-span-6 fallback
 * Smaller breakpoints flatten to single column / 2-column.
 */
const BENTO_LAYOUT: { className: string; highlight: boolean; large: boolean }[] = [
  {
    className: "md:col-span-2 lg:col-span-7 lg:row-span-2",
    highlight: true,
    large: true,
  },
  { className: "md:col-span-1 lg:col-span-5", highlight: false, large: false },
  { className: "md:col-span-1 lg:col-span-5", highlight: false, large: false },
  { className: "md:col-span-1 lg:col-span-6", highlight: false, large: false },
  { className: "md:col-span-1 lg:col-span-6", highlight: false, large: false },
  { className: "md:col-span-2 lg:col-span-6", highlight: false, large: false },
];

function LucideIcon({ name, className }: { name: string; className?: string }) {
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  const IconComponent = icons[pascalName as keyof typeof icons];
  if (!IconComponent) return null;
  return <IconComponent className={className} aria-hidden="true" />;
}

export function ServiceBentoFeatures({ features }: ServiceBentoFeaturesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      {/* Warm yellow spotlight — bottom-right, varies from previous sections */}
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
          className="max-w-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Hva du får
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Dette er
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                inkludert
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>

          <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Hver leveranse settes sammen for hånd. Her er byggesteinene som
            følger med.
          </p>
        </motion.div>

        <motion.ul
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-20 lg:grid-cols-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.07,
              },
            },
          }}
        >
          {features.map((feature, i) => {
            const layout = BENTO_LAYOUT[i] ?? BENTO_LAYOUT[BENTO_LAYOUT.length - 1];
            const number = String(i + 1).padStart(2, "0");
            return (
              <motion.li
                key={feature.title}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-7 sm:p-8",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-22px_rgba(0,0,0,0.7)]",
                  layout.highlight
                    ? "border-[#F4CE14]/30 bg-[rgba(244,206,20,0.04)]"
                    : "border-white/[0.08] bg-[rgba(20,20,22,0.88)]",
                  layout.className,
                )}
                variants={{
                  hidden: prefersReducedMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0 : 0.55,
                      ease: EASE,
                    },
                  },
                }}
              >
                {/* Mono number + yellow line eyebrow */}
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-mono text-xs uppercase tracking-[0.22em]",
                      layout.highlight ? "text-[#F4CE14]" : "text-white/45",
                    )}
                  >
                    {number}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "inline-block h-px w-10",
                      layout.highlight ? "bg-[#F4CE14]" : "bg-[#F4CE14]/40",
                    )}
                  />
                </div>

                {/* Icon — slightly larger on the hero card */}
                <div className="mt-6">
                  <LucideIcon
                    name={feature.iconName}
                    className={cn(
                      layout.highlight
                        ? "h-8 w-8 text-[#F4CE14]"
                        : "h-6 w-6 text-[#F4CE14]/80",
                    )}
                  />
                </div>

                {/* Cabinet Grotesk title — scales on the hero card */}
                <h3
                  className={cn(
                    "mt-5 font-serif font-black leading-[1.08] tracking-[-0.02em] text-white",
                    layout.large
                      ? "text-3xl sm:text-4xl lg:text-[2.5rem]"
                      : "text-xl sm:text-2xl",
                  )}
                >
                  {feature.title}
                </h3>

                {/* Body */}
                <p
                  className={cn(
                    "mt-4 max-w-[52ch] leading-relaxed",
                    layout.large
                      ? "text-base text-white/70 sm:text-lg"
                      : "text-sm text-white/65 sm:text-base",
                  )}
                >
                  {feature.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
