"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, MousePointerClick, X } from "lucide-react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Projects — full-screen takeover panels, each one a browser window
 * running the REAL live site in an iframe (screenshot beneath as
 * fallback while it loads / on small screens). Panels pin, then the
 * next slides over while the covered one sinks back and dims.
 */

/**
 * Sites that allow being framed. The rest send X-Frame-Options
 * (DENY/SAMEORIGIN) and would render as a blank box — those keep the
 * screenshot and link out instead.
 */
const EMBEDDABLE = new Set(["brobekk", "ringebu"]);

/** Canonical www URLs for the embeds — skips the apex→www redirect hop. */
const EMBED_URLS: Record<string, string> = {
  brobekk: "https://www.brobekklegekontor.no",
  ringebu: "https://www.ringebutannlegesenter.no",
};

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

function TakeoverPanel({ index }: { index: number }) {
  const site = PORTFOLIO_SITES[index];
  const stat = PORTFOLIO_STATS[site.id];
  const url = `https://${site.domain}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useIsDesktop();

  // Mount the live iframe shortly before the panel scrolls into view.
  const nearView = useInView(wrapRef, { once: true, margin: "80% 0px" });
  const [loaded, setLoaded] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const showLive = nearView && isDesktop && !reduced && EMBEDDABLE.has(site.id);

  // Progress of THIS panel being covered by the next one.
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <div ref={wrapRef} className="relative h-screen">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-[2.5vw] py-[2vw]">
        <motion.article
          style={{ scale, backgroundColor: VOID }}
          className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.4rem] shadow-2xl will-change-transform"
        >
          {/* Browser chrome */}
          <div
            className="flex h-12 shrink-0 items-center gap-3 px-4 sm:h-14 sm:px-5"
            style={{ backgroundColor: VOID }}
          >
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto flex min-w-0 max-w-[55%] items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] transition-colors hover:text-[#F4CE14] sm:text-xs"
              style={{ backgroundColor: "rgba(243,240,231,0.08)", color: "rgba(243,240,231,0.75)" }}
            >
              <Lock aria-hidden className="h-3 w-3 shrink-0" style={{ color: "#28C840" }} />
              <span className="truncate">{site.domain}</span>
              {showLive && loaded && (
                <span className="ml-1 flex items-center gap-1.5 font-bold" style={{ color: "#28C840" }}>
                  <span className="status-dot-pulse h-1.5 w-1.5 rounded-full bg-[#28C840]" aria-hidden />
                  LIVE
                </span>
              )}
            </a>
            <div className="flex items-center gap-2">
              {showLive && loaded && (
                <button
                  type="button"
                  onClick={() => setInteractive((v) => !v)}
                  className="hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-transform active:scale-95 lg:flex"
                  style={
                    interactive
                      ? { backgroundColor: "rgba(243,240,231,0.12)", color: PAPER }
                      : { backgroundColor: YELLOW, color: INK }
                  }
                >
                  {interactive ? (
                    <>
                      <X aria-hidden className="h-3 w-3" /> Lukk
                    </>
                  ) : (
                    <>
                      <MousePointerClick aria-hidden className="h-3 w-3" /> Prøv siden
                    </>
                  )}
                </button>
              )}
              {stat && (
                <span
                  className="hidden rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] sm:block"
                  style={{ backgroundColor: "rgba(243,240,231,0.08)", color: "rgba(243,240,231,0.7)" }}
                >
                  PageSpeed <span style={{ color: YELLOW }}>{stat.pagespeed}</span>
                </span>
              )}
            </div>
          </div>

          {/* Viewport: live site over screenshot fallback */}
          <div className="relative flex-1">
            <Image
              src={site.images.desktop}
              alt={`${site.name} — skjermbilde av nettsiden`}
              fill
              sizes="95vw"
              loading={index === 0 ? "eager" : undefined}
              className="object-cover object-top"
            />
            {showLive && (
              <iframe
                src={EMBED_URLS[site.id] ?? url}
                title={`${site.name} — live nettside`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
                className="absolute inset-0 h-full w-full border-0 transition-opacity duration-700"
                style={{
                  opacity: loaded ? 1 : 0,
                  pointerEvents: interactive ? "auto" : "none",
                }}
              />
            )}

            {/* Name plate — hidden while interacting so the site is fully usable */}
            {!interactive && (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 px-[3vw] pb-[2.5vw] pt-24"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,13,11,0.78) 0%, rgba(13,13,11,0.25) 60%, transparent 100%)",
                }}
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: YELLOW }}>
                    {String(index + 1).padStart(2, "0")} / {String(PORTFOLIO_SITES.length).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-1.5 text-[clamp(1.6rem,4vw,3.4rem)] font-bold leading-[1] tracking-[-0.03em]"
                    style={{ color: PAPER }}
                  >
                    {site.name}
                  </h3>
                  {stat && (
                    <p className="mt-1.5 text-sm" style={{ color: "rgba(243,240,231,0.65)" }}>
                      {stat.result}
                    </p>
                  )}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Besøk ${site.name} på ${site.domain}`}
                  className="pointer-events-auto group flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: PAPER, color: INK }}
                >
                  Besøk siden
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              </div>
            )}
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
      {/* Section header */}
      <div className="px-[4vw] pb-10 pt-24 sm:pt-28">
        <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "112%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
              className="block text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[1.02] tracking-[-0.045em]"
            >
              Utvalgte <Marker delay={0.7}>prosjekter</Marker>
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
            ({String(PORTFOLIO_SITES.length).padStart(2, "0")}) Ekte, live nettsider — ikke mockups
          </p>
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 border-b-2 pb-0.5 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-60"
            style={{ borderColor: YELLOW }}
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
