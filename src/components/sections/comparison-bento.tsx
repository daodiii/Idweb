"use client";

import { motion } from "motion/react";
import { COMPARISON_GRID } from "@/lib/content/homepage";
import type { ComparisonCard } from "@/types";

function Card({ card, index }: { card: ComparisonCard; index: number }) {
  const isByrå = card.type === "byrå";
  const label = isByrå ? "Typisk byrå" : "IDweb";

  return (
    <motion.div
      className="relative overflow-hidden rounded-[14px] p-5"
      style={{
        background: `rgba(${hexToRgb(card.accent)}, 0.08)`,
        border: `1px solid rgba(${hexToRgb(card.accent)}, ${isByrå ? 0.2 : 0.25})`,
        backdropFilter: "blur(12px)",
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2, borderColor: `rgba(${hexToRgb(card.accent)}, ${isByrå ? 0.35 : 0.45})` }}
    >
      <span
        className="mb-2 block text-[11px] uppercase tracking-[1.5px]"
        style={{ color: `rgba(${hexToRgb(card.accent)}, ${isByrå ? 0.6 : 0.7})` }}
      >
        {label}
      </span>

      {card.stat ? (
        <p className="mb-0.5 text-[2rem] font-extrabold leading-tight" style={{ color: card.accent }}>
          {card.stat}
          <span className="text-lg font-bold">{card.unit}</span>
        </p>
      ) : (
        <span className="mb-1 block text-2xl">{card.icon}</span>
      )}

      <p className="text-base font-bold" style={{ color: card.accent }}>
        {card.title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">
        {card.description}
      </p>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export function ComparisonBento() {
  return (
    <section className="relative bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
      {/* Decorative gradient for glassmorphism blur */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(244,206,20,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(56,189,248,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-2 block text-[13px] uppercase tracking-[2px] text-[var(--color-accent)]">
            Hvorfor oss?
          </span>
          <h2 className="text-3xl font-bold text-[var(--color-dark-text)] sm:text-4xl">
            Ikke alle nettsider er skapt like
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Se forskjellen mellom en typisk leverandør og det vi bygger for deg.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {COMPARISON_GRID.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
