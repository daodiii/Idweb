"use client";

import { useEffect, useReducer, useRef } from "react";

// ─── Timeline (ms) ──────────────────────────────────────────────────────────
const CYCLE_MS = 7500;
const FADE_OUT_MS = 240;

// IDweb side — fast & clean
const IDWEB_BLOCKS_START = 200;
const IDWEB_BLOCK_STAGGER = 70; // ms between consecutive blocks
const IDWEB_PROGRESS_START = 200;
const IDWEB_PROGRESS_END = 800;

// Byrå side — chaotic
const BYRA_HEADER_AT = 220; // skeleton header
const BYRA_HERO_SKELETON_AT = 600;
const BYRA_HERO_LOADED_AT = 1400; // CLS shake fires here
const BYRA_SPINNER_AT = 1800;
const BYRA_SIDEBAR_AT = 2600; // CLS shake fires here
const BYRA_COOKIE_AT = 3700;
const BYRA_DONE_AT = 4600;
const BYRA_PROGRESS_STALL_START = 1500;
const BYRA_PROGRESS_STALL_END = 2400;

// Shared metrics phase
const METRICS_START = BYRA_DONE_AT;
const METRICS_IDWEB_DURATION = 800;
const METRICS_BYRA_DURATION = 1400;
const CAPTION_AT = 6000;
const CAPTION_DURATION = 400;

// Final scores
const SCORE_BYRA = 47;
const SCORE_IDWEB = 98;

// ─── Helpers ────────────────────────────────────────────────────────────────
function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function byraProgress(elapsed: number): number {
  if (elapsed < IDWEB_PROGRESS_START) return 0;
  if (elapsed < BYRA_PROGRESS_STALL_START) {
    const t = (elapsed - IDWEB_PROGRESS_START) / (BYRA_PROGRESS_STALL_START - IDWEB_PROGRESS_START);
    return t * 0.6;
  }
  if (elapsed < BYRA_PROGRESS_STALL_END) return 0.6;
  if (elapsed < BYRA_DONE_AT) {
    const t = (elapsed - BYRA_PROGRESS_STALL_END) / (BYRA_DONE_AT - BYRA_PROGRESS_STALL_END);
    return 0.6 + t * 0.4;
  }
  return 1;
}

function idwebProgress(elapsed: number): number {
  if (elapsed < IDWEB_PROGRESS_START) return 0;
  const t = (elapsed - IDWEB_PROGRESS_START) / (IDWEB_PROGRESS_END - IDWEB_PROGRESS_START);
  return clamp(easeOutCubic(t), 0, 1);
}

// ─── Component ──────────────────────────────────────────────────────────────
export function TaleOfTwoSites() {
  const elapsedRef = useRef(0);
  const cycleStartRef = useRef(0);
  const startedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [, forceRender] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedMotionRef.current = reduced;

    if (reduced) {
      // Render the final state of everything, no rAF loop.
      elapsedRef.current = CYCLE_MS - 1;
      forceRender();
      return;
    }

    let rafId: number | null = null;
    cycleStartRef.current = performance.now();
    startedRef.current = true;

    const tick = (now: number) => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      let elapsed = now - cycleStartRef.current;
      if (elapsed >= CYCLE_MS + FADE_OUT_MS) {
        cycleStartRef.current = now;
        elapsed = 0;
      }
      elapsedRef.current = elapsed;
      forceRender();
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const e = elapsedRef.current;
  const fading = e >= CYCLE_MS;

  // Score counters
  const metricsT = Math.max(0, e - METRICS_START);
  const idwebScore = Math.round(
    clamp(easeOutCubic(metricsT / METRICS_IDWEB_DURATION), 0, 1) * SCORE_IDWEB,
  );
  const byraScore = Math.round(
    clamp(easeOutCubic(metricsT / METRICS_BYRA_DURATION), 0, 1) * SCORE_BYRA,
  );

  const captionOpacity = clamp((e - CAPTION_AT) / CAPTION_DURATION, 0, 1);

  return (
    <div
      className="relative mt-16 lg:mt-20"
      role="img"
      aria-label="Sammenligning: sakte WordPress-side mot rask IDweb-side"
    >
      {/* Mobile fallback (<sm) — static summary, no animation */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-black/30 p-5 font-mono text-[11px]">
          <div className="space-y-3 border-r border-white/[0.05] pr-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Typisk byrå
            </div>
            <div>
              <div className="text-white/85">{SCORE_BYRA}</div>
              <div className="text-[9px] uppercase tracking-wider text-white/30">
                PageSpeed
              </div>
            </div>
            <div>
              <div className="text-white/85">4.6 s</div>
              <div className="text-[9px] uppercase tracking-wider text-white/30">
                Lastetid
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#F4CE14]">
              IDweb
            </div>
            <div>
              <div className="text-[#F4CE14]">{SCORE_IDWEB}</div>
              <div className="text-[9px] uppercase tracking-wider text-white/30">
                PageSpeed
              </div>
            </div>
            <div>
              <div className="text-white">0.8 s</div>
              <div className="text-[9px] uppercase tracking-wider text-white/30">
                Lastetid
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet — dual browsers */}
      <div
        className="hidden sm:block"
        aria-hidden="true"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 240ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
          <MiniBrowser
            label="Typisk byrå"
            url="wpagency.no"
            progress={byraProgress(e)}
            progressTone="byra"
          >
            <ByraPage elapsed={e} />
          </MiniBrowser>
          <MiniBrowser
            label="IDweb"
            url="idweb.no"
            progress={idwebProgress(e)}
            progressTone="idweb"
            highlight
          >
            <IdwebPage elapsed={e} />
          </MiniBrowser>
        </div>

        <MetricsReadout idwebScore={idwebScore} byraScore={byraScore} />

        <p
          className="mt-10 text-center font-serif text-base italic text-white/55 sm:text-lg"
          style={{
            opacity: captionOpacity,
            transform: `translateY(${(1 - captionOpacity) * 6}px)`,
            transition: "opacity 80ms linear, transform 80ms linear",
          }}
        >
          Samme innhold. Helt forskjellig opplevelse.
        </p>
      </div>
    </div>
  );
}

// ─── Mini browser chrome ────────────────────────────────────────────────────
function MiniBrowser({
  label,
  url,
  progress,
  progressTone,
  highlight = false,
  children,
}: {
  label: string;
  url: string;
  progress: number;
  progressTone: "byra" | "idweb";
  highlight?: boolean;
  children: React.ReactNode;
}) {
  const progressColor =
    progressTone === "idweb"
      ? "linear-gradient(90deg, #F4CE14 0%, #FFE15D 100%)"
      : "linear-gradient(90deg, #C13B3B 0%, #D44848 100%)";

  return (
    <div className="flex flex-col">
      <div
        className={
          "relative overflow-hidden rounded-2xl border " +
          (highlight
            ? "border-[#F4CE14]/25 bg-[#0c0c0e] shadow-[0_30px_60px_-30px_rgba(244,206,20,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]"
            : "border-white/[0.08] bg-[#0c0c0e] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]")
        }
      >
        {/* Title bar */}
        <div className="flex h-7 items-center gap-2 border-b border-white/[0.05] bg-[#101013] px-3">
          <div className="flex gap-1">
            <span className="block h-2 w-2 rounded-full bg-white/15" />
            <span className="block h-2 w-2 rounded-full bg-white/15" />
            <span className="block h-2 w-2 rounded-full bg-white/15" />
          </div>
          <div className="flex flex-1 justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-[2px] font-mono text-[9.5px] text-white/40">
              <span
                className={
                  "block h-1 w-1 rounded-full " +
                  (progressTone === "idweb"
                    ? "bg-[#28C840]/80"
                    : "bg-white/25")
                }
              />
              {url}
            </div>
          </div>
          <div className="w-8" />
        </div>

        {/* Loading progress bar — animated via transform: scaleX, GPU-only */}
        <div className="h-[2px] w-full overflow-hidden bg-black/40">
          <div
            className="h-full w-full origin-left"
            style={{
              background: progressColor,
              transform: `scaleX(${progress})`,
              transition: "transform 80ms linear",
              willChange: "transform",
            }}
          />
        </div>

        {/* Page area */}
        <div className="relative h-[260px] overflow-hidden bg-[#0a0a0c] sm:h-[290px]">
          {children}
        </div>
      </div>

      {/* Label below browser */}
      <div className="mt-4 flex items-baseline justify-between">
        <span
          className={
            "font-mono text-[11px] uppercase tracking-[0.22em] " +
            (highlight ? "text-[#F4CE14]" : "text-white/45")
          }
        >
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
          {progressTone === "idweb" ? "0.8 s" : "4.6 s"}
        </span>
      </div>
    </div>
  );
}

// ─── IDweb page (clean) ────────────────────────────────────────────────────
function IdwebPage({ elapsed }: { elapsed: number }) {
  const block = (i: number) => {
    const at = IDWEB_BLOCKS_START + i * IDWEB_BLOCK_STAGGER;
    const t = clamp((elapsed - at) / 220, 0, 1);
    return {
      opacity: t,
      transform: `translateY(${(1 - t) * 4}px)`,
      transition: "opacity 80ms linear, transform 80ms linear",
    };
  };

  return (
    <div className="flex h-full flex-col gap-2.5 p-3.5">
      {/* Header */}
      <div style={block(0)} className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-[#F4CE14]" />
        <div className="h-1.5 flex-1 rounded-full bg-white/10" />
        <div className="flex gap-1">
          <div className="h-1.5 w-6 rounded-full bg-white/10" />
          <div className="h-1.5 w-6 rounded-full bg-white/10" />
          <div className="h-1.5 w-6 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Hero */}
      <div
        style={block(1)}
        className="relative h-[88px] w-full overflow-hidden rounded-md"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a1a1f 0%, #2a2025 40%, rgba(244,206,20,0.12) 100%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-end p-2.5">
          <div className="h-2 w-28 rounded-full bg-white/85" />
          <div className="mt-1 h-1.5 w-20 rounded-full bg-white/40" />
          <div className="mt-2 inline-flex w-fit rounded bg-[#F4CE14] px-2 py-1">
            <div className="h-1.5 w-8 rounded-full bg-black/80" />
          </div>
        </div>
      </div>

      {/* Content lines */}
      <div style={block(2)} className="space-y-1">
        <div className="h-1.5 w-full rounded-full bg-white/10" />
        <div className="h-1.5 w-[88%] rounded-full bg-white/10" />
        <div className="h-1.5 w-[74%] rounded-full bg-white/10" />
      </div>

      {/* 2-column block */}
      <div style={block(3)} className="grid grid-cols-2 gap-2">
        <div className="h-12 rounded-md border border-white/5 bg-white/[0.025] p-1.5">
          <div className="h-1.5 w-10 rounded-full bg-white/20" />
          <div className="mt-1 h-1 w-14 rounded-full bg-white/10" />
        </div>
        <div className="h-12 rounded-md border border-white/5 bg-white/[0.025] p-1.5">
          <div className="h-1.5 w-10 rounded-full bg-white/20" />
          <div className="mt-1 h-1 w-14 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Footer */}
      <div style={block(4)} className="mt-auto flex items-center justify-between">
        <div className="h-1.5 w-12 rounded-full bg-white/10" />
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}

// ─── Byrå page (chaotic) ────────────────────────────────────────────────────
function ByraPage({ elapsed }: { elapsed: number }) {
  const headerVisible = elapsed >= BYRA_HEADER_AT;
  const heroState =
    elapsed < BYRA_HERO_SKELETON_AT
      ? "hidden"
      : elapsed < BYRA_HERO_LOADED_AT
        ? "skeleton"
        : "loaded";
  const spinnerVisible = elapsed >= BYRA_SPINNER_AT && elapsed < BYRA_COOKIE_AT;
  const sidebarVisible = elapsed >= BYRA_SIDEBAR_AT;
  const cookieVisible = elapsed >= BYRA_COOKIE_AT;

  // CLS shake impulses
  const shake1 = elapsed >= BYRA_HERO_LOADED_AT && elapsed < BYRA_HERO_LOADED_AT + 280;
  const shake2 = elapsed >= BYRA_SIDEBAR_AT && elapsed < BYRA_SIDEBAR_AT + 280;
  const shakeStyle =
    shake1 || shake2 ? { animation: "tale-cls-shake 280ms cubic-bezier(0.36,0,0.66,1) both" } : undefined;

  return (
    <div className="relative flex h-full flex-col gap-2 overflow-hidden p-3">
      {/* Header — skeleton style */}
      <div
        className="flex items-center gap-2"
        style={{
          opacity: headerVisible ? 1 : 0,
          transition: "opacity 100ms linear",
        }}
      >
        <div className="h-3 w-12 rounded-sm bg-white/[0.07]" />
        <div className="ml-auto flex gap-1">
          <div className="h-1.5 w-5 rounded-full bg-white/[0.07]" />
          <div className="h-1.5 w-5 rounded-full bg-white/[0.07]" />
          <div className="h-1.5 w-5 rounded-full bg-white/[0.07]" />
        </div>
      </div>

      {/* Hero — skeleton → loaded */}
      <div className="h-[78px] w-full overflow-hidden rounded-sm" style={shakeStyle}>
        {heroState === "hidden" && <div className="h-full w-full bg-white/[0.03]" />}
        {heroState === "skeleton" && (
          <div className="tale-skeleton h-full w-full rounded-sm" />
        )}
        {heroState === "loaded" && (
          <div
            className="relative h-full w-full"
            style={{
              background:
                "linear-gradient(135deg, #2a1a1f 0%, #2f1f2f 50%, #1f1f25 100%)",
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center p-3">
              <div className="h-2 w-32 rounded-sm bg-white/40" />
              <div className="mt-1 h-1.5 w-24 rounded-sm bg-white/20" />
            </div>
          </div>
        )}
      </div>

      {/* Spinner row */}
      <div
        className="flex items-center gap-2 py-0.5"
        style={{
          opacity: spinnerVisible ? 1 : 0,
          height: spinnerVisible ? "auto" : 0,
          transition: "opacity 120ms linear",
        }}
      >
        <div
          className="h-3 w-3 rounded-full border-2 border-white/15 border-t-[#C13B3B]"
          style={{ animation: "tale-spin 700ms linear infinite" }}
        />
        <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">
          Loading slider revolution…
        </div>
      </div>

      {/* Content + optional sidebar */}
      <div className="flex gap-2" style={shake2 ? shakeStyle : undefined}>
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-full rounded-full bg-white/[0.09]" />
          <div className="h-1.5 w-[85%] rounded-full bg-white/[0.09]" />
          <div className="h-1.5 w-[72%] rounded-full bg-white/[0.09]" />
          <div className="h-1.5 w-[60%] rounded-full bg-white/[0.09]" />
        </div>
        {sidebarVisible && (
          <div
            className="w-16 rounded-sm border border-white/[0.08] bg-white/[0.04] p-1.5"
            style={{
              animation: "tale-pop-in 180ms cubic-bezier(0.23,1,0.32,1) both",
            }}
          >
            <div className="font-mono text-[7px] uppercase tracking-wider text-white/30">
              Ad
            </div>
            <div className="mt-1.5 h-7 w-full rounded-sm bg-white/[0.04]" />
          </div>
        )}
      </div>

      {/* Cookie banner */}
      {cookieVisible && (
        <div
          className="absolute inset-x-2 bottom-2 rounded-md border border-[#F4CE14]/20 bg-[#1a1612] p-2"
          style={{
            animation: "tale-slide-up-bottom 320ms cubic-bezier(0.23,1,0.32,1) both",
          }}
        >
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">
                Vi bruker informasjonskapsler
              </div>
              <div className="mt-1 h-1 w-[80%] rounded-full bg-white/15" />
            </div>
            <div className="flex shrink-0 gap-1">
              <div className="h-3 w-10 rounded-sm bg-white/[0.08]" />
              <div className="h-3 w-10 rounded-sm bg-[#F4CE14]/70" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Metrics readout ────────────────────────────────────────────────────────
function MetricsReadout({
  idwebScore,
  byraScore,
}: {
  idwebScore: number;
  byraScore: number;
}) {
  const byraBars = Math.round((byraScore / 100) * 10);
  const idwebBars = Math.round((idwebScore / 100) * 10);

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 font-mono text-[11px] sm:gap-x-10 lg:mt-12">
      <MetricsColumn
        label="Typisk byrå"
        toneClass="text-white/45"
        borderClass="border-white/[0.06]"
      >
        <MetricRow label="PageSpeed">
          <BarMeter total={10} filled={byraBars} tone="byra" />
          <span
            className="ml-2 tabular-nums text-white/85"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {byraScore}
          </span>
        </MetricRow>
        <MetricRow label="Lastetid">
          <span className="text-white/85 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
            4.6&thinsp;s
          </span>
        </MetricRow>
        <MetricRow label="Layout-skift">
          <span className="text-white/85">Høy</span>
        </MetricRow>
      </MetricsColumn>

      <MetricsColumn
        label="IDweb"
        toneClass="text-[#F4CE14]"
        borderClass="border-[#F4CE14]/25"
      >
        <MetricRow label="PageSpeed">
          <BarMeter total={10} filled={idwebBars} tone="idweb" />
          <span
            className="ml-2 tabular-nums text-[#F4CE14]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {idwebScore}
          </span>
        </MetricRow>
        <MetricRow label="Lastetid">
          <span className="text-white tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
            0.8&thinsp;s
          </span>
        </MetricRow>
        <MetricRow label="Layout-skift">
          <span className="text-white">Null</span>
        </MetricRow>
      </MetricsColumn>
    </div>
  );
}

function MetricsColumn({
  label,
  toneClass,
  borderClass,
  children,
}: {
  label: string;
  toneClass: string;
  borderClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className={"space-y-3 border-t pt-4 " + borderClass}>
      <div
        className={
          "text-[10px] uppercase tracking-[0.22em] " + toneClass
        }
      >
        {label}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MetricRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
        {label}
      </span>
      <span className="flex items-center">{children}</span>
    </div>
  );
}

function BarMeter({
  total,
  filled,
  tone,
}: {
  total: number;
  filled: number;
  tone: "byra" | "idweb";
}) {
  const filledColor =
    tone === "idweb" ? "bg-[#F4CE14]" : "bg-[#C13B3B]/85";
  const emptyColor = "bg-white/[0.06]";
  return (
    <span className="flex gap-[2px]">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={
            "h-2.5 w-[5px] rounded-[1px] " +
            (i < filled ? filledColor : emptyColor)
          }
          style={{
            transition: "background-color 140ms cubic-bezier(0.23,1,0.32,1)",
          }}
        />
      ))}
    </span>
  );
}
