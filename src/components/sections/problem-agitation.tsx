"use client";

import { motion } from "motion/react";
import { Gauge, SearchX, CalendarX } from "lucide-react";
import { PROBLEM_CARDS } from "@/lib/content/homepage";

const ICONS = { Gauge, SearchX, CalendarX } as const;

export function ProblemAgitation() {
  return (
    <section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {PROBLEM_CARDS.map((card) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={card.title}
                className="rounded-xl border border-white/5 bg-[var(--color-dark-bg-alt)] p-8"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <Icon className="mb-4 h-8 w-8 text-red-400" aria-hidden="true" />
                <h3 className="mb-3 text-lg font-bold text-[var(--color-dark-text)]">
                  {card.title}
                </h3>
                <p className="text-3xl font-black text-red-400">{card.stat}</p>
                <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                  {card.statLabel}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
