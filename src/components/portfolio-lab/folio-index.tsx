"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Portfolio 01 — «Arkivet». A typographic index: project names as
 * oversized rows. Hovering a name floods the whole section background
 * with that site, crossfading as the cursor walks the list.
 */

export function FolioIndex() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ backgroundColor: VOID, color: PAPER }}
    >
      {/* Live background — the hovered site floods the section */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={PORTFOLIO_SITES[active].id}
            aria-hidden
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.045 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src={PORTFOLIO_SITES[active].images.desktop}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(13,13,11,0.92) 0%, rgba(13,13,11,0.55) 55%, rgba(13,13,11,0.35) 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative px-[4vw] py-24 sm:py-28">
        <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "112%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
              className="block text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.045em]"
            >
              Utvalgte <Marker delay={0.7}>prosjekter</Marker>
            </motion.span>
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mt-4 font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: "rgba(243,240,231,0.5)" }}
        >
          ({String(PORTFOLIO_SITES.length).padStart(2, "0")}) Ekte, live nettsider — pek for å se
        </motion.p>

        <div
          className="mt-14 border-t"
          style={{ borderColor: "rgba(243,240,231,0.16)" }}
          onMouseLeave={() => setActive(null)}
        >
          {PORTFOLIO_SITES.map((site, i) => {
            const stat = PORTFOLIO_STATS[site.id];
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            return (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
              >
                <Link
                  href={`https://${site.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 border-b py-6 transition-opacity duration-300 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-x-8 sm:py-8"
                  style={{
                    borderColor: "rgba(243,240,231,0.16)",
                    opacity: dimmed ? 0.35 : 1,
                  }}
                >
                  <span
                    className="font-mono text-sm tabular-nums transition-colors duration-300"
                    style={{ color: isActive ? YELLOW : "rgba(243,240,231,0.4)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span
                      className="block text-[clamp(1.6rem,4.6vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.04em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
                      style={{ color: isActive ? YELLOW : PAPER }}
                    >
                      {site.name}
                    </span>
                    <span
                      className="mt-1 block font-mono text-[11px] uppercase tracking-[0.2em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
                      style={{ color: "rgba(243,240,231,0.45)" }}
                    >
                      {site.domain}
                      {stat ? ` — ${stat.result}` : ""}
                    </span>
                  </span>
                  {stat && (
                    <span
                      className="hidden font-mono text-xs sm:block"
                      style={{ color: isActive ? YELLOW : "rgba(243,240,231,0.45)" }}
                    >
                      PS {stat.pagespeed}
                    </span>
                  )}
                  <ArrowUpRight
                    aria-hidden
                    className="h-6 w-6 self-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: isActive ? YELLOW : "rgba(243,240,231,0.4)" }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 border-b-2 pb-0.5 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-60"
            style={{ borderColor: YELLOW, color: PAPER }}
          >
            Tidligere prosjekter
            <ArrowUpRight className="h-4 w-4" style={{ color: YELLOW }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
