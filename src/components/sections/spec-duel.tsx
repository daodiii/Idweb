"use client";

import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { VALUE_PROPOSITIONS } from "@/lib/content/slogans";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Spec duel — the agency comparison as a strict ledger. Each row's
 * hairline draws itself, the byrå cell lands struck and dim, the
 * IDweb cell stamps in yellow. Ends in a value-prop ticker band.
 */

const ROWS = [
  {
    label: "Teknologi",
    byra: "WordPress + plugins",
    byraSub: "Tunge ferdigløsninger som bremser ytelse og sikkerhet",
    idweb: "Next.js — fra bunnen av",
    idwebSub: "Moderne rammeverk, lynrask og skalerbar",
  },
  {
    label: "Lastetid",
    byra: "3–5 sekunder",
    byraSub: "Besøkende forlater siden før den laster",
    idweb: "Under 1 sekund",
    idwebSub: "Mens typiske sider bruker 3–5 sekunder",
  },
  {
    label: "PageSpeed",
    byra: "40–60",
    byraSub: "Typiske byrå-sider scorer 40–60",
    idweb: "90+",
    idwebSub: "Score på alle våre prosjekter",
  },
  {
    label: "Dialog",
    byra: "Snakker med en selger",
    byraSub: "Mellomledd som ikke kjenner koden",
    idweb: "Direkte til utvikleren",
    idwebSub: "Ingen mellomledd — du snakker med den som bygger",
  },
  {
    label: "Design",
    byra: "Ferdigmaler",
    byraSub: "Tilpasset «litt» — ser ut som alle andre",
    idweb: "100 % skreddersydd",
    idwebSub: "Designet kun for din bedrift — ingen maler",
  },
] as const;

function LedgerRow({ row, index }: { row: (typeof ROWS)[number]; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      transition={{ staggerChildren: 0.12, delayChildren: index * 0.05 }}
      className="relative grid grid-cols-1 gap-5 py-8 sm:py-10 lg:grid-cols-[0.45fr_1fr_1fr] lg:gap-10"
    >
      {/* Self-drawing hairline */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ backgroundColor: "rgba(243,240,231,0.16)" }}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
      />
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 14 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
        }}
        className="font-mono text-xs uppercase tracking-[0.3em]"
        style={{ color: "rgba(243,240,231,0.45)" }}
      >
        {row.label}
      </motion.p>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 14 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
        }}
      >
        <p className="flex items-start gap-2.5 font-serif text-lg font-bold tracking-tight sm:text-2xl" style={{ color: "rgba(243,240,231,0.38)" }}>
          <X aria-hidden className="mt-1 h-4 w-4 shrink-0 sm:h-5 sm:w-5" style={{ color: "rgba(239,68,68,0.55)" }} strokeWidth={2.5} />
          <span className="line-through decoration-[rgba(239,68,68,0.45)] decoration-2">{row.byra}</span>
        </p>
        <p className="mt-1.5 pl-7 text-sm leading-relaxed" style={{ color: "rgba(243,240,231,0.3)" }}>
          {row.byraSub}
        </p>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, x: 28 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
        }}
      >
        <p className="flex items-start gap-2.5 font-serif text-lg font-black tracking-tight sm:text-2xl" style={{ color: YELLOW }}>
          <motion.span
            variants={{
              hidden: { scale: 0, rotate: -90 },
              visible: { scale: 1, rotate: 0, transition: { duration: 0.5, ease: EASE, delay: 0.3 } },
            }}
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full sm:h-6 sm:w-6"
            style={{ backgroundColor: YELLOW }}
          >
            <Check aria-hidden className="h-3.5 w-3.5" style={{ color: INK }} strokeWidth={3} />
          </motion.span>
          {row.idweb}
        </p>
        <p className="mt-1.5 pl-8 text-sm leading-relaxed" style={{ color: "rgba(243,240,231,0.55)" }}>
          {row.idwebSub}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function SpecDuel() {
  return (
    <section style={{ backgroundColor: VOID, color: PAPER }}>
      <div className="mx-auto w-full px-[3vw] py-24 sm:py-32">
        <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
          <span className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
              className="block text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.045em]"
            >
              Ikke alle nettsider
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE, delay: 0.12 } } }}
              className="block text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.045em]"
              style={{ color: YELLOW }}
            >
              er skapt like.
            </motion.span>
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-6 max-w-[48ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "rgba(243,240,231,0.6)" }}
        >
          Slik ser forskjellen ut mellom et typisk byrå og det vi leverer.
        </motion.p>

        {/* Ledger column headers */}
        <div className="mt-16 hidden grid-cols-[0.45fr_1fr_1fr] gap-10 pb-4 lg:grid">
          <span />
          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(243,240,231,0.35)" }}>
            Typisk byrå
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: YELLOW }}>
            IDweb
          </span>
        </div>

        <div>
          {ROWS.map((row, i) => (
            <LedgerRow key={row.label} row={row} index={i} />
          ))}
          <div aria-hidden className="h-px" style={{ backgroundColor: "rgba(243,240,231,0.16)" }} />
        </div>
      </div>

      {/* Value-prop ticker band */}
      <div
        aria-hidden
        className="overflow-hidden border-t py-4 sm:py-5"
        style={{ backgroundColor: YELLOW, borderColor: INK }}
      >
        <div className="monument-ticker flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center">
              {VALUE_PROPOSITIONS.map((prop) => (
                <span
                  key={`${copy}-${prop}`}
                  className="flex items-center text-lg font-semibold uppercase tracking-tight sm:text-xl"
                  style={{ color: INK }}
                >
                  <span className="px-5">{prop.split(" — ")[0]}</span>
                  <span className="text-base">✳</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
