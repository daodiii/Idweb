"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Lock, Pause, Play } from "lucide-react";
import { SHOWCASE_SITES, SHOWCASE_SLIDE_MS } from "@/lib/content/showcase";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** The desktop screen is 16:10 — 900px of a 1440-wide screenshot. */
const DESKTOP_VISIBLE_PX = 900;
/** The phone screen is 375×812. */
const MOBILE_VISIBLE_PX = 812;

/**
 * How far (as % of its own height) a screenshot travels so the frame's bottom
 * edge lands on `stop` (default: the bottom of the page).
 */
function scrollTarget(height: number, visible: number, stop = height) {
  const distance = Math.max(0, Math.min(stop, height) - visible);
  return `${-((distance / height) * 100).toFixed(3)}%`;
}

const SCROLL_DELAY_MS = 1100;
const SCROLL_DURATION_MS = SHOWCASE_SLIDE_MS - 2200;

/**
 * «Utstillingen» — the homepage showcase. A browser frame and a phone cycle
 * through real projects: each new site wipes in from the right, then its
 * full-page screenshot scrolls as if someone were browsing it.
 *
 * Timing lives in CSS: the active tab's progress bar is a CSS animation and
 * its `animationend` advances the slide, so a single paused class freezes the
 * bar and both scrolling screenshots together. It pauses on keyboard focus,
 * off-screen, in a background tab, and via the pause button. With
 * reduced motion there is no auto-advance, no scrolling and no tilt.
 */
export function SiteShowcase() {
  const reduce = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  // The wipe's bright edge is skipped on the very first paint.
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.25 });

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // On phones the tabs are a swipeable strip: keep the active one in view
  // without moving the page itself.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [index, reduce]);

  const paused = focused || userPaused || tabHidden || !inView;
  const playing = !reduce && !paused;

  const site = SHOWCASE_SITES[index];
  const next = SHOWCASE_SITES[(index + 1) % SHOWCASE_SITES.length];
  const advance = useCallback(() => {
    setHasAdvanced(true);
    setIndex((i) => (i + 1) % SHOWCASE_SITES.length);
  }, []);
  const goTo = (i: number) => {
    setHasAdvanced(true);
    setIndex(i);
  };

  // Scroll-linked entrance: the stage grows into place as it reaches the fold.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "start 0.45"],
  });
  const stageScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const stageY = useTransform(scrollYProgress, [0, 1], [56, 0]);

  // Pointer tilt — a few degrees, sprung, mouse only.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 120, damping: 18 });

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(x * 5);
    tiltX.set(-y * 4);
  }

  function onPointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  const pauseClass = playing ? "" : "[animation-play-state:paused]";

  return (
    <section
      id="arbeid"
      aria-labelledby="showcase-heading"
      className="bg-[var(--color-nordic-bg)] px-6 pb-24 sm:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2
            id="showcase-heading"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-nordic-muted)]"
          >
            Utvalgt arbeid
          </h2>
          <p className="flex items-baseline font-mono text-sm tabular-nums text-[var(--color-nordic-muted)]">
            <span className="relative inline-flex h-[1.3em] overflow-hidden text-[var(--color-nordic-ink)]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={index}
                  initial={reduce ? false : { y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={reduce ? undefined : { y: "-100%" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {String(index + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </span>
            <span aria-hidden="true">&nbsp;/&nbsp;{String(SHOWCASE_SITES.length).padStart(2, "0")}</span>
          </p>
        </div>

        <motion.div
          ref={stageRef}
          style={reduce ? undefined : { scale: stageScale, y: stageY }}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          className="relative overflow-hidden rounded-[28px] bg-[var(--color-nordic-sage)] px-[5%] pt-[6%]"
        >
          <motion.div
            style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1600 }}
            className="relative"
          >
            {/* Browser frame */}
            <div className="overflow-hidden rounded-t-[14px] bg-white shadow-[0_-2px_50px_rgba(19,48,42,0.14)]">
              <div className="flex h-10 items-center gap-3 border-b border-[var(--color-nordic-line)] px-4 sm:h-11">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dfe5e2]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dfe5e2]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dfe5e2]" />
                </div>
                <div className="mx-auto flex h-7 w-full max-w-sm items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-nordic-mist)] px-3 text-xs text-[var(--color-nordic-muted)] sm:text-[13px]">
                  <Lock aria-hidden="true" className="h-3 w-3 shrink-0" />
                  <span className="relative block h-[1.4em] min-w-0 overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={site.id}
                        className="block truncate"
                        initial={reduce ? false : { y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={reduce ? undefined : { y: "-110%", opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        {site.address}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
                <div className="w-[42px]" aria-hidden="true" />
              </div>

              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={site.id}
                    className="absolute inset-0"
                    style={{ zIndex: 2 }}
                    initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
                    animate={
                      reduce
                        ? { opacity: 1, transition: { duration: 0.3 } }
                        : { clipPath: "inset(0 0 0 0%)", transition: { duration: 1, ease: EASE } }
                    }
                    exit={
                      reduce
                        ? { opacity: 0, zIndex: 1, transition: { duration: 0.3 } }
                        : { scale: 0.94, opacity: 0, zIndex: 1, transition: { duration: 1, ease: EASE } }
                    }
                  >
                    <div
                      className={cn(
                        !reduce &&
                          "animate-[showcase-scroll_var(--showcase-duration)_cubic-bezier(0.45,0,0.55,1)_var(--showcase-delay)_both]",
                        pauseClass,
                      )}
                      style={
                        {
                          "--showcase-to": scrollTarget(site.desktopHeight, DESKTOP_VISIBLE_PX, site.desktopStop),
                          "--showcase-duration": `${SCROLL_DURATION_MS}ms`,
                          "--showcase-delay": `${SCROLL_DELAY_MS}ms`,
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={site.desktop}
                        alt={`Nettsiden til ${site.name}`}
                        width={1440}
                        height={site.desktopHeight}
                        sizes="(min-width: 1152px) 1040px, 90vw"
                        priority={index === 0}
                        className="block h-auto w-full"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* A bright edge riding the wipe */}
                {!reduce && (
                  <motion.span
                    key={`edge-${site.id}`}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 z-10 w-[3px] bg-[var(--color-nordic-mint)] shadow-[0_0_24px_6px_rgba(168,224,200,0.6)]"
                    initial={{ left: "100%", opacity: hasAdvanced ? 1 : 0 }}
                    animate={{ left: "0%", opacity: 0 }}
                    transition={{ duration: 1, ease: EASE, opacity: { duration: 1, ease: [0.7, 0, 1, 1] } }}
                  />
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="absolute bottom-[-18%] right-[3%] w-[24%] min-w-[104px] max-w-[250px] rounded-[2rem] bg-[#10231f] p-[6px] shadow-[0_30px_60px_-20px_rgba(19,48,42,0.55)] sm:p-2">
              <div className="relative aspect-[375/812] overflow-hidden rounded-[1.6rem] bg-white">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-[1.6%] z-20 h-[3.2%] w-[28%] -translate-x-1/2 rounded-full bg-[#10231f]"
                />
                <AnimatePresence initial={false}>
                  <motion.div
                    key={site.id}
                    className="absolute inset-0"
                    style={{ zIndex: 2 }}
                    initial={reduce ? { opacity: 0 } : { y: "100%" }}
                    animate={
                      reduce
                        ? { opacity: 1, transition: { duration: 0.3 } }
                        : { y: "0%", transition: { duration: 0.9, ease: EASE, delay: 0.15 } }
                    }
                    exit={
                      reduce
                        ? { opacity: 0, zIndex: 1, transition: { duration: 0.3 } }
                        : { y: "-12%", opacity: 0, zIndex: 1, transition: { duration: 0.9, ease: EASE, delay: 0.15 } }
                    }
                  >
                    <div
                      className={cn(
                        !reduce &&
                          "animate-[showcase-scroll_var(--showcase-duration)_cubic-bezier(0.45,0,0.55,1)_var(--showcase-delay)_both]",
                        pauseClass,
                      )}
                      style={
                        {
                          "--showcase-to": scrollTarget(site.mobileHeight, MOBILE_VISIBLE_PX, site.mobileStop),
                          "--showcase-duration": `${SCROLL_DURATION_MS}ms`,
                          "--showcase-delay": `${SCROLL_DELAY_MS + 200}ms`,
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={site.mobile}
                        alt={`${site.name} på mobil`}
                        width={375}
                        height={site.mobileHeight}
                        sizes="250px"
                        className="block h-auto w-full"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Warm the cache for the next project so its wipe never reveals a blank frame */}
        <div aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
          <Image src={next.desktop} alt="" width={1440} height={next.desktopHeight} sizes="(min-width: 1152px) 1040px, 90vw" loading="eager" />
          <Image src={next.mobile} alt="" width={375} height={next.mobileHeight} sizes="250px" loading="eager" />
        </div>

        {/* Project tabs */}
        <div
          className="mt-8 flex items-start gap-4"
          onFocus={(e) => {
            // Keyboard users get a still frame while they choose; a mouse click doesn't pause.
            if (e.target.matches(":focus-visible")) setFocused(true);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <div
            ref={tabsRef}
            role="group"
            aria-label="Velg prosjekt"
            className="scrollbar-hide -ml-6 flex min-w-0 flex-1 snap-x scroll-pl-6 gap-5 overflow-x-auto pl-6 sm:ml-0 sm:grid sm:grid-cols-3 sm:gap-y-6 sm:overflow-visible sm:pl-0 lg:grid-cols-5"
          >
            {SHOWCASE_SITES.map((s, i) => {
              const isActive = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className="group flex min-h-11 w-[46%] shrink-0 cursor-pointer snap-start flex-col gap-3 text-left sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-nordic-accent)]"
                >
                  <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-[var(--color-nordic-line)]">
                    {isActive && (
                      <span
                        key={`bar-${index}`}
                        onAnimationEnd={advance}
                        className={cn(
                          "absolute inset-0 origin-left bg-[var(--color-nordic-accent)]",
                          !reduce && "animate-[showcase-progress_var(--showcase-slide)_linear_both]",
                          pauseClass,
                        )}
                        style={{ "--showcase-slide": `${SHOWCASE_SLIDE_MS}ms` } as CSSProperties}
                      />
                    )}
                  </span>
                  <span>
                    <span
                      className={cn(
                        "block text-[15px] font-semibold transition-colors duration-300",
                        isActive
                          ? "text-[var(--color-nordic-ink)]"
                          : "text-[var(--color-nordic-muted)] group-hover:text-[var(--color-nordic-ink)]",
                      )}
                    >
                      {s.name}
                    </span>
                    <span className="block text-sm text-[var(--color-nordic-muted)]">{s.category}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {!reduce && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Spill av visningen" : "Pause visningen"}
              className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--color-nordic-line)] text-[var(--color-nordic-ink)] transition-colors hover:bg-[var(--color-nordic-sage)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-nordic-accent)]"
            >
              {userPaused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
