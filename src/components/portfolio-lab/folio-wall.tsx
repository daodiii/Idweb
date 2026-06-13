"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Portfolio 03 — «Veggen». A tilted, full-bleed kinetic wall: columns
 * of site screenshots stream endlessly in opposite directions. Color
 * blooms and the stream pauses when you hover a project.
 */

function WallCard({ index }: { index: number }) {
  const site = PORTFOLIO_SITES[index];
  const stat = PORTFOLIO_STATS[site.id];

  return (
    <Link
      href={`https://${site.domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block shrink-0 overflow-hidden rounded-xl border"
      style={{ borderColor: "rgba(243,240,231,0.14)" }}
    >
      <div className="relative aspect-[16/11] w-full">
        <Image
          src={site.images.desktop}
          alt={`${site.name} — skjermbilde av nettsiden`}
          fill
          sizes="(max-width: 640px) 70vw, 30vw"
          className="object-cover object-top opacity-75 grayscale-[0.85] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B]/80 via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-60"
        />
        <div className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-[-0.02em]" style={{ color: PAPER }}>
              {site.name}
            </p>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(243,240,231,0.55)" }}>
              {site.domain}
            </p>
          </div>
          {stat && (
            <span
              className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ backgroundColor: YELLOW, color: INK }}
            >
              {stat.pagespeed}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/** One endless column. Content is doubled; CSS loops it by -50%. */
function WallColumn({
  indexes,
  direction,
  duration,
}: {
  indexes: number[];
  direction: "up" | "down";
  duration: number;
}) {
  return (
    <div className="wall-column h-full overflow-hidden">
      <div
        className={direction === "up" ? "wall-stream-up" : "wall-stream-down"}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col gap-5 pb-5">
            {indexes.map((i) => (
              <WallCard key={`${copy}-${i}`} index={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FolioWall() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: VOID, color: PAPER }}
    >
      {/* The tilted wall */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute -inset-x-[8%] -inset-y-[14%] rotate-[-4deg]">
          <div className="grid h-full grid-cols-2 gap-5 lg:grid-cols-3">
            <WallColumn indexes={[0, 1, 2, 3, 4]} direction="up" duration={46} />
            <WallColumn indexes={[3, 4, 0, 1, 2]} direction="down" duration={58} />
            <div className="hidden lg:block">
              <WallColumn indexes={[2, 0, 4, 1, 3]} direction="up" duration={52} />
            </div>
          </div>
        </div>
        {/* Scrims so the header floats clean above the stream */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,11,0.92) 0%, rgba(13,13,11,0.35) 30%, rgba(13,13,11,0.25) 70%, rgba(13,13,11,0.9) 100%)",
          }}
        />
      </div>

      <div className="pointer-events-none relative flex min-h-[100dvh] flex-col justify-between px-[4vw] py-20 sm:py-24">
        <div className="pointer-events-auto">
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
            style={{ color: "rgba(243,240,231,0.55)" }}
          >
            ({String(PORTFOLIO_SITES.length).padStart(2, "0")}) Ekte, live nettsider — pek for farge
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pointer-events-auto"
        >
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: YELLOW, color: INK }}
          >
            Tidligere prosjekter
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
