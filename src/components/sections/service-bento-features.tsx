"use client";

import {
  Calendar,
  CircleCheck,
  Cog,
  FileText,
  Headphones,
  Key,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  RefreshCw,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  TrendingUp,
  Zap,
  type LucideIcon as LucideIconComponent,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ServiceFeature } from "@/types";
import { cn } from "@/lib/utils";

// Explicit map of only the icons used in service content (legacy /tjenester path).
const ICON_MAP: Record<string, LucideIconComponent> = {
  calendar: Calendar,
  "circle-check": CircleCheck,
  cog: Cog,
  "file-text": FileText,
  headphones: Headphones,
  key: Key,
  lock: Lock,
  mail: Mail,
  "map-pin": MapPin,
  "message-square": MessageSquare,
  package: Package,
  "refresh-cw": RefreshCw,
  search: Search,
  shield: Shield,
  "shopping-cart": ShoppingCart,
  smartphone: Smartphone,
  star: Star,
  "trending-up": TrendingUp,
  zap: Zap,
};

interface ServiceBentoFeaturesProps {
  features: ServiceFeature[];
  /** Adopt the page's identity: no eyebrow, accent-tinted, icon-free numbered cards. */
  accent?: string;
  /** Audience noun for the headline. Used only with `accent`. */
  gainNoun?: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;

const BENTO_LAYOUT: { className: string; highlight: boolean; large: boolean }[] = [
  { className: "md:col-span-2 lg:col-span-7 lg:row-span-2", highlight: true, large: true },
  { className: "md:col-span-1 lg:col-span-5", highlight: false, large: false },
  { className: "md:col-span-1 lg:col-span-5", highlight: false, large: false },
  { className: "md:col-span-1 lg:col-span-6", highlight: false, large: false },
  { className: "md:col-span-1 lg:col-span-6", highlight: false, large: false },
  { className: "md:col-span-2 lg:col-span-6", highlight: false, large: false },
];

function LucideIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} aria-hidden="true" />;
}

export function ServiceBentoFeatures({ features, accent, gainNoun }: ServiceBentoFeaturesProps) {
  const prefersReducedMotion = useReducedMotion();
  const accented = Boolean(accent);
  const accentColor = accent ?? "#F4CE14";

  const head = accented
    ? { lead: "Bygget for å skaffe deg", tail: gainNoun ?? "kunder" }
    : { lead: "Dette er", tail: "inkludert" };

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: accented
            ? `radial-gradient(ellipse 55% 45% at 92% 78%, color-mix(in srgb, ${accentColor} 11%, transparent), transparent 60%)`
            : "radial-gradient(ellipse 55% 45% at 92% 78%, rgba(244,206,20,0.13), transparent 62%)",
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
              Hva du får
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
            Hver side settes sammen for hånd — ingen mal, ingen ferdigpakke. Her er
            byggesteinene som følger med.
          </p>
        </motion.div>

        <motion.ul
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-20 lg:grid-cols-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.07 } } }}
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
                  layout.className,
                )}
                style={{
                  borderColor: layout.highlight ? `color-mix(in srgb, ${accentColor} 30%, transparent)` : "rgba(255,255,255,0.08)",
                  background: layout.highlight ? `color-mix(in srgb, ${accentColor} 5%, #141416)` : "rgba(20,20,22,0.88)",
                }}
                variants={{
                  hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.55, ease: EASE } },
                }}
              >
                {accented ? (
                  /* Icon-free editorial card — the numeral is the anchor */
                  <div className="flex items-center gap-3">
                    <span
                      className="font-[family-name:var(--font-heading)] font-black leading-none tracking-tight"
                      style={{ fontSize: layout.large ? "2.6rem" : "2rem", color: `color-mix(in srgb, ${accentColor} 80%, transparent)` }}
                    >
                      {number}
                    </span>
                    <span aria-hidden className="h-px flex-1" style={{ background: `color-mix(in srgb, ${accentColor} 30%, transparent)` }} />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <span className={cn("font-mono text-xs uppercase tracking-[0.22em]", layout.highlight ? "text-[#F4CE14]" : "text-white/45")}>
                        {number}
                      </span>
                      <span aria-hidden className={cn("inline-block h-px w-10", layout.highlight ? "bg-[#F4CE14]" : "bg-[#F4CE14]/40")} />
                    </div>
                    <div className="mt-6">
                      <LucideIcon name={feature.iconName} className={cn(layout.highlight ? "h-8 w-8 text-[#F4CE14]" : "h-6 w-6 text-[#F4CE14]/80")} />
                    </div>
                  </>
                )}

                <h3
                  className={cn(
                    "font-[family-name:var(--font-heading)] font-black leading-[1.08] tracking-[-0.02em] text-white",
                    accented ? "mt-6" : "mt-5",
                    layout.large ? "text-3xl sm:text-4xl lg:text-[2.5rem]" : "text-xl sm:text-2xl",
                  )}
                >
                  {feature.title}
                </h3>

                <p
                  className={cn(
                    "mt-4 max-w-[52ch] leading-relaxed",
                    layout.large ? "text-base text-white/70 sm:text-lg" : "text-sm text-white/65 sm:text-base",
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
