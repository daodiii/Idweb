"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Projects — full-screen takeover panels. Each project pins to the
 * viewport, then the next one slides over it while the one beneath
 * sinks back and dims. Five sites, five takeovers.
 */

function TakeoverPanel({ index }: { index: number }) {
  const site = PORTFOLIO_SITES[index];
  const stat = PORTFOLIO_STATS[site.id];
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Progress of THIS panel being covered by the next one.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <div ref={wrapRef} className="relative h-screen">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-[2.5vw] py-[2.5vw]">
        <motion.article
          style={{ scale }}
          className="relative h-full w-full overflow-hidden rounded-[1.8rem] will-change-transform"
        >
          <Image
            src={site.images.desktop}
            alt={`${site.name} — skjermbilde av nettsiden`}
            fill
            sizes="95vw"
            loading={index === 0 ? "eager" : undefined}
            className="object-cover object-top"
          />
          {/* Legibility gradient */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,13,11,0.72) 0%, rgba(13,13,11,0.12) 36%, rgba(13,13,11,0.18) 100%)",
            }}
          />
          {/* Giant index */}
          <span
            aria-hidden
            className="absolute right-[3vw] top-[1vw] font-serif text-[11vw] font-black leading-none tracking-[-0.04em]"
            style={{ color: "transparent", WebkitTextStroke: `max(1.5px, 0.12vw) ${PAPER}`, opacity: 0.85 }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* PageSpeed chip */}
          {stat && (
            <span
              className="absolute left-[3vw] top-[3vw] rounded-full px-4 py-2 font-mono text-xs font-bold"
              style={{ backgroundColor: YELLOW, color: INK }}
            >
              PAGESPEED {stat.pagespeed}
            </span>
          )}
          {/* Name plate */}
          <div className="absolute inset-x-[3vw] bottom-[3vw] flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3
                className="font-serif text-[clamp(1.8rem,4.5vw,3.8rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]"
                style={{ color: PAPER }}
              >
                {site.name}
              </h3>
              <p className="mt-2 font-mono text-xs sm:text-sm" style={{ color: "rgba(243,240,231,0.65)" }}>
                {site.domain}
                {stat ? ` — ${stat.result}` : ""}
              </p>
            </div>
            <Link
              href="/referanser"
              aria-label={`Se prosjektet ${site.name}`}
              className="group flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
              style={{ backgroundColor: PAPER, color: INK }}
            >
              <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          {/* Dimmer while being covered */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: VOID, opacity: dim }}
          />
        </motion.article>
      </div>
    </div>
  );
}

export function TakeoverProjects() {
  return (
    <section style={{ backgroundColor: PAPER, color: INK }}>
      {/* Section monument header */}
      <div className="px-[3vw] pb-10 pt-24 sm:pt-28">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="font-serif uppercase"
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "112%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
              className="block text-[9.5vw] font-black leading-[0.9] tracking-[-0.02em]"
            >
              Utvalgte
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "112%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE, delay: 0.12 } },
              }}
              className="block text-[9.5vw] font-black leading-[0.9] tracking-[-0.02em]"
              style={{ color: "transparent", WebkitTextStroke: `max(1.5px, 0.14vw) ${INK}` }}
            >
              Prosjekter
            </motion.span>
          </span>
        </motion.h2>
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(20,20,16,0.55)" }}>
            ({String(PORTFOLIO_SITES.length).padStart(2, "0")}) Leverte nettsider — 90+ PageSpeed
          </p>
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 border-b-2 pb-0.5 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-60"
            style={{ borderColor: INK }}
          >
            Tidligere prosjekter
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {PORTFOLIO_SITES.map((site, i) => (
        <TakeoverPanel key={site.id} index={i} />
      ))}
    </section>
  );
}
