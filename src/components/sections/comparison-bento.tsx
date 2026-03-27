"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { PaletteBackground } from "@/components/ui/palette-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { COMPARISON_GRID } from "@/lib/content/homepage";
import type { ComparisonCard } from "@/types";

function Card({ card, index }: { card: ComparisonCard; index: number }) {
  const isByrå = card.type === "byrå";
  const label = isByrå ? "Typisk byrå" : "IDweb";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative rounded-[1.25rem]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
    >
      {/* Glow wrapper */}
      <div className="relative h-full rounded-[inherit] border-[0.75px] border-white/10 p-1.5">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />

        {/* Inner card — preserves existing colors */}
        <div
          className="relative h-full overflow-hidden rounded-[14px] p-5"
          style={{
            background: `rgba(${hexToRgb(card.accent)}, 0.08)`,
            border: `1px solid rgba(${hexToRgb(card.accent)}, ${isByrå ? 0.2 : 0.25})`,
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            className="mb-2 block text-[11px] font-medium uppercase tracking-[3px]"
            style={{ color: `rgba(${hexToRgb(card.accent)}, ${isByrå ? 0.6 : 0.7})` }}
          >
            {label}
          </span>

          {card.stat ? (
            <p className="mb-0.5 text-4xl font-black tracking-[-0.03em] leading-tight sm:text-5xl" style={{ color: card.accent }}>
              {card.stat}
              <span className="text-lg font-black">{card.unit}</span>
            </p>
          ) : (
            <span className="mb-1 block text-2xl">{card.icon}</span>
          )}

          <p className="text-base font-bold tracking-[-0.01em]" style={{ color: card.accent }}>
            {card.title}
          </p>
          <p className="mt-1 text-xs font-light leading-relaxed text-[var(--color-dark-muted)]">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/** Compact mobile card — no icon/emoji, minimal padding, fixed height */
function MobileCard({ card }: { card: ComparisonCard }) {
  const isByrå = card.type === "byrå";

  return (
    <div
      className="flex h-[72px] flex-col justify-center overflow-hidden rounded-lg px-2.5 py-2"
      style={{
        background: `rgba(${hexToRgb(card.accent)}, 0.08)`,
        border: `1px solid rgba(${hexToRgb(card.accent)}, ${isByrå ? 0.2 : 0.25})`,
      }}
    >
      {card.stat && (
        <p className="text-base font-black tracking-[-0.03em] leading-none" style={{ color: card.accent }}>
          {card.stat}
          <span className="text-xs font-black">{card.unit}</span>
        </p>
      )}

      <p className="text-[13px] font-bold tracking-[-0.01em] leading-tight" style={{ color: card.accent }}>
        {card.title}
      </p>
      <p className="mt-0.5 text-[10px] font-light leading-snug text-[var(--color-dark-muted)]">
        {card.description}
      </p>
    </div>
  );
}

function hexToRgb(hex: string): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return "0, 0, 0";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const SEGMENTS = ["IDweb", "Typisk byrå"] as const;

export function ComparisonBento() {
  const [activeFilter, setActiveFilter] = useState(0);

  const byråCards = COMPARISON_GRID.filter((c) => c.type === "byrå");
  const idwebCards = COMPARISON_GRID.filter((c) => c.type === "idweb");
  const mobileCards = activeFilter === 0 ? idwebCards : byråCards;
  // Pad to 6 cells (3 full rows of 2) so both views occupy the same height
  const paddedCount = 6;
  const spacersNeeded = paddedCount - mobileCards.length;

  return (
    <PaletteBackground palette="drommeslor" className="px-6 py-14 sm:py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-accent)]">
            Hvorfor oss?
          </span>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
            Ikke alle nettsider er skapt like
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm font-light text-[var(--color-dark-muted)]">
            Se forskjellen mellom en typisk leverandør og det vi bygger for deg.
          </p>
        </motion.div>

        {/* ── Mobile: segmented toggle + filtered compact grid ── */}
        <div className="sm:hidden">
          <div className="mb-4 flex justify-center">
            <SegmentedControl
              segments={[...SEGMENTS]}
              defaultIndex={0}
              onChange={setActiveFilter}
              variant="dark"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-2 gap-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {mobileCards.map((card) => (
                <MobileCard key={card.title} card={card} />
              ))}
              {/* Invisible spacers keep both views the same height (3 rows) */}
              {Array.from({ length: spacersNeeded }, (_, i) => (
                <div key={`spacer-${i}`} className="h-[72px]" aria-hidden="true" />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Tablet+: grid layout (unchanged) ── */}
        <div className="hidden gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {COMPARISON_GRID.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </PaletteBackground>
  );
}
