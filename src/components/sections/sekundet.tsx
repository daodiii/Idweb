"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame, useReducedMotion, useScroll } from "motion/react";
import { SEKUNDET, SEKUNDET_STATIONS } from "@/lib/content/sekundet";

/**
 * «Sekundet» — the full-stack chapter. One booking is followed through the
 * whole machine, told as a single second of real time (21:47:03,120 →
 * 21:47:04,360) scrubbed by scroll. The giant millisecond clock IS the
 * scroll indicator; six stations light up along a wire as the request
 * passes them. The phone is the only paper-white object — the customer's
 * world — everything between it and the owner's panel lives in the void.
 *
 * Engine notes (hard-won in the mockup phase):
 * - Card swaps are CSS transitions, not keyframes, so scrubbing backwards
 *   retargets smoothly instead of jumping.
 * - The canvas is driven by wall-clock rAF; nothing depends on WAAPI
 *   onfinish (unreliable under throttling).
 * - Below 880px and under prefers-reduced-motion the film collapses into a
 *   static photo essay — all six cards stacked along a yellow line. That
 *   variant is pure CSS (see the sekundet block in globals.css).
 */

const C = SEKUNDET;
const STATIONS = SEKUNDET_STATIONS;
const SEGMENTS = STATIONS.length - 1;

/** Scroll beats: intro hold, the film itself, finale hold. */
const J_IN = 0.06;
const J_OUT = 0.9;

const nbMs = (ms: number) => (ms === 0 ? "0 ms" : "+" + ms.toLocaleString("nb-NO"));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function Sekundet() {
  const reduced = useReducedMotion();
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const secRef = useRef<HTMLSpanElement>(null);
  const msRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  // Mutable per-frame state, outside React renders.
  const eng = useRef({
    w: 0,
    h: 0,
    inView: false,
    small: false,
    lastSec: "",
    lastMs: "",
    lastActive: 0,
    pulses: [] as { x: number; t: number }[],
  });

  /* ── Canvas sizing + gates ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const e = eng.current;
      e.w = canvas.clientWidth;
      e.h = canvas.clientHeight;
      e.small = window.matchMedia("(max-width: 880px)").matches;
      canvas.width = Math.round(e.w * dpr);
      canvas.height = Math.round(e.h * dpr);
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    const io = new IntersectionObserver(
      ([entry]) => (eng.current.inView = entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(stage);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  /* ── The film, one frame at a time ── */
  useAnimationFrame((now) => {
    const e = eng.current;
    if (!e.inView || e.small || reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const p = scrollYProgress.get();
    const j = Math.min(1, Math.max(0, (p - J_IN) / (J_OUT - J_IN)));

    /* clock — DOM writes only when a digit actually changes */
    const ms = Math.round(C.startMs + j * C.totalMs);
    const sTxt = "0" + Math.floor(ms / 1000);
    const msTxt = "," + String(ms % 1000).padStart(3, "0");
    if (sTxt !== e.lastSec && secRef.current) {
      secRef.current.textContent = sTxt;
      e.lastSec = sTxt;
    }
    if (msTxt !== e.lastMs && msRef.current) {
      msRef.current.textContent = msTxt;
      e.lastMs = msTxt;
    }

    /* narration handoff */
    introRef.current?.classList.toggle("sekundet-gone", p > J_IN + 0.03);
    finaleRef.current?.classList.toggle("sekundet-show", p > 0.93);

    /* active station */
    const idx = Math.min(SEGMENTS, Math.floor(j * SEGMENTS + 0.5));
    if (idx !== e.lastActive) {
      if (idx > e.lastActive) e.pulses.push({ x: tickX(e.w, idx), t: now });
      e.lastActive = idx;
      if (counterRef.current) counterRef.current.textContent = "0" + (idx + 1);
      setActive(idx);
    }

    draw(ctx, e, now, j);
  });

  return (
    <section aria-labelledby="sekundet-tittel" className="bg-[#0D0D0B]">
      <div ref={runwayRef} className="sekundet-runway relative h-[560vh]">
        <section
          ref={stageRef}
          /* pt clears the sticky navbar — the clock sits at the very top of
             the stage and would otherwise be covered by it */
          className="sekundet-stage sticky top-0 grid h-[100svh] grid-rows-[auto_1fr] overflow-hidden px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(1.2rem,3vh,2rem)] pt-[clamp(5.5rem,10vh,7rem)]"
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="sekundet-canvas pointer-events-none absolute inset-0 z-0 block h-full w-full"
          />

          {/* Clock — the scroll indicator */}
          <div className="relative z-[5] flex items-baseline justify-between gap-4">
            <div
              aria-hidden="true"
              className="flex items-baseline gap-[0.15em] font-mono leading-none [font-variant-numeric:tabular-nums]"
            >
              <span className="text-[clamp(1rem,2.4vw,1.9rem)] font-medium text-[#57554E]">
                {C.clockPrefix}
              </span>
              <span className="sekundet-clock-live flex items-baseline gap-[0.15em]">
                <span
                  ref={secRef}
                  className="text-[clamp(2.6rem,7.5vw,6rem)] font-bold tracking-[-0.04em] text-[#EFECE3]"
                >
                  03
                </span>
                <span
                  ref={msRef}
                  className="text-[clamp(2.6rem,7.5vw,6rem)] font-bold tracking-[-0.04em] text-[#F4CE14]"
                >
                  ,120
                </span>
              </span>
              {/* Static essay shows the finished time — CSS swaps the pair */}
              <span className="sekundet-clock-static items-baseline gap-[0.15em]">
                <span className="text-[clamp(2.2rem,11vw,3.4rem)] font-bold tracking-[-0.04em] text-[#EFECE3]">
                  04
                </span>
                <span className="text-[clamp(2.2rem,11vw,3.4rem)] font-bold tracking-[-0.04em] text-[#F4CE14]">
                  ,360
                </span>
              </span>
            </div>
            <div className="sekundet-counter font-mono text-[0.78rem] tracking-[0.18em] text-[#57554E] [font-variant-numeric:tabular-nums]">
              <b ref={counterRef} className="font-semibold text-[#F4CE14]">
                01
              </b>{" "}
              / 0{STATIONS.length}
            </div>
          </div>

          {/* Middle zone: narration left, station card right */}
          <div className="sekundet-zone relative z-[5]">
            <div ref={introRef} className="sekundet-narr sekundet-intro">
              <h2
                id="sekundet-tittel"
                className="text-balance text-[clamp(1.7rem,3.6vw,3.1rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#EFECE3]"
              >
                {C.intro.headline[0]}{" "}
                <span className="text-[#F4CE14]">{C.intro.headline[1]}</span>
                {C.intro.headline[2]}
              </h2>
              <p className="mt-4 max-w-[38ch] text-[clamp(0.92rem,1.2vw,1.05rem)] leading-[1.6] text-[#8B887E]">
                {C.intro.sub}
              </p>
            </div>

            <div ref={finaleRef} className="sekundet-narr sekundet-finale" aria-hidden="true">
              <span className="mb-2 block font-mono text-[clamp(2.4rem,5.4vw,4.6rem)] font-bold leading-none tracking-[-0.045em] text-[#F4CE14] [font-variant-numeric:tabular-nums]">
                {C.finale.total}
              </span>
              <h3 className="text-balance text-[clamp(1.7rem,3.6vw,3.1rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#EFECE3]">
                {C.finale.headline}
              </h3>
              <p className="mt-4 max-w-[38ch] text-[clamp(0.92rem,1.2vw,1.05rem)] leading-[1.6] text-[#8B887E]">
                {C.finale.sub}
              </p>
            </div>

            <div className="sekundet-slot">
              {STATIONS.map((st, i) => (
                <StationCard key={st.id} station={st} state={cardState(i, active)} />
              ))}
            </div>
          </div>

          <span className="sekundet-honest absolute bottom-[0.9rem] left-[clamp(1.25rem,5vw,5rem)] z-[5] font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[#57554E]">
            {C.honesty}
          </span>
        </section>
      </div>
    </section>
  );
}

function cardState(i: number, active: number): "on" | "past" | "future" {
  if (i === active) return "on";
  return i < active ? "past" : "future";
}

/* ────────────────────────── Station cards ────────────────────────── */

function StationCard({
  station,
  state,
}: {
  station: (typeof STATIONS)[number];
  state: "on" | "past" | "future";
}) {
  // Enter/exit lives in globals.css keyed on data-state, not Tailwind
  // translate utilities: the static photo-essay variant has to be able to
  // cancel it, and a utility-set `translate` outranks a stylesheet reset.
  return (
    <article data-state={state} className="sekundet-card">
      <span className="sekundet-mschip font-mono text-[0.66rem] tracking-[0.14em] text-[#F4CE14]">
        {nbMs(station.ms)} · {station.name}
      </span>
      {station.id === "telefon" ? <PhoneCard /> : <VoidCard station={station} />}
    </article>
  );
}

function CardBar({
  name,
  right,
  paper,
}: {
  name: string;
  right: string;
  paper?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 border-b px-[0.9rem] py-[0.55rem] font-mono text-[0.64rem] uppercase tracking-[0.1em] ${
        paper ? "border-black/15 text-[#B8B3A4]" : "border-white/10 text-[#57554E]"
      }`}
    >
      <b className={`font-semibold tracking-[0.1em] ${paper ? "text-[#141410]" : "text-[#F4CE14]"}`}>
        {name}
      </b>
      <span className="[font-variant-numeric:tabular-nums]">{right}</span>
    </div>
  );
}

/** Station 0 — the customer's phone: the only paper object in the machine. */
function PhoneCard() {
  const d = C.cards.telefon;
  return (
    <div className="border border-black/20 bg-[#F3F0E7] text-[#141410] shadow-[0_34px_70px_-34px_rgba(0,0,0,0.9)]">
      <CardBar name="Telefonen" right={d.time} paper />
      <div className="grid gap-[0.6rem] p-[1rem_1.1rem_1.1rem]">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[1.02rem] font-semibold tracking-[-0.02em]">{d.what}</span>
          <span className="text-[0.84rem] text-[#6F6B5E]">{d.when}</span>
        </div>
        <span className="text-[1.3rem] font-bold tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
          {d.price}
        </span>
        {/* Frozen mid-press — the thumb just hit it */}
        <div className="mt-1 scale-[0.97] bg-[#141410] px-4 py-[0.8rem] text-center text-[0.88rem] font-semibold text-[#F3F0E7] shadow-[inset_0_2px_6px_rgba(0,0,0,0.35)]">
          {d.button}
        </div>
      </div>
    </div>
  );
}

function VoidCard({ station }: { station: (typeof STATIONS)[number] }) {
  return (
    <div className="border border-white/10 bg-[rgba(22,22,15,0.92)] text-[#EFECE3] shadow-[inset_0_1px_0_rgba(239,236,227,0.06),0_34px_70px_-34px_rgba(0,0,0,0.9)]">
      <CardBar name={station.name} right={station.ms.toLocaleString("nb-NO") + " ms"} />
      <div className="grid gap-[0.6rem] p-[1rem_1.1rem_1.1rem]">
        <CardBody id={station.id} />
      </div>
    </div>
  );
}

function OkPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-[0.32rem] justify-self-start whitespace-nowrap border border-[rgba(123,182,97,0.35)] px-2 py-[0.14rem] text-[0.68rem] text-[#7BB661] before:size-[5px] before:rounded-full before:bg-current before:content-['']">
      {children}
    </span>
  );
}

function CardBody({ id }: { id: (typeof STATIONS)[number]["id"] }) {
  switch (id) {
    case "server": {
      const d = C.cards.server;
      return (
        <div className="font-mono text-[0.76rem] leading-[2] text-[#8B887E]">
          {d.lines.map((l) => (
            <span key={l.text} className="block">
              <span className={"tone" in l && l.tone === "accent" ? "text-[#F4CE14]" : undefined}>
                {l.text}
              </span>
              {"ok" in l && l.ok && <span className="text-[#7BB661]"> ok</span>}
            </span>
          ))}
        </div>
      );
    }
    case "database": {
      const d = C.cards.database;
      return (
        <>
          {/* scrolls inside itself on narrow screens — the row is wider than
              375px and clipping it silently eats the query time */}
          <div className="scrollbar-hide grid grid-cols-[auto_1fr_auto] gap-3 overflow-x-auto whitespace-nowrap border border-[rgba(244,206,20,0.3)] bg-[rgba(244,206,20,0.07)] px-[0.7rem] py-[0.55rem] font-mono text-[0.74rem]">
            <span className="text-[#57554E]">{d.insert.label}</span>
            <span>{d.insert.row}</span>
            <span className="text-[#57554E]">{d.insert.took}</span>
          </div>
          <OkPill>{d.check}</OkPill>
        </>
      );
    }
    case "vipps": {
      const d = C.cards.vipps;
      return (
        <>
          <span className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
            {d.amount}
            <small className="ml-[0.3rem] text-[0.9rem] font-normal text-[#8B887E]">{d.unit}</small>
          </span>
          <OkPill>{d.status}</OkPill>
          <span className="font-mono text-[0.7rem] text-[#57554E]">{d.ref}</span>
        </>
      );
    }
    case "sms": {
      const d = C.cards.sms;
      return (
        <>
          <div className="max-w-[34ch] rounded-[2px_14px_14px_14px] border border-[rgba(123,182,97,0.25)] bg-[#1E2B22] px-[0.95rem] py-3 text-[0.86rem] leading-[1.55]">
            {d.bubble}
          </div>
          <span className="font-mono text-[0.68rem] text-[#57554E]">{d.delivered}</span>
        </>
      );
    }
    case "panel": {
      const d = C.cards.panel;
      return (
        <>
          <dl className="flex items-baseline gap-2">
            <dt className="text-[0.62rem] uppercase tracking-[0.12em] text-[#57554E]">
              {d.statLabel}
            </dt>
            <dd className="text-[1.5rem] font-bold tracking-[-0.03em] [font-variant-numeric:tabular-nums]">
              {d.statValue}
            </dd>
            <dd className="bg-[#F4CE14] px-[0.4rem] py-[0.1rem] font-mono text-[0.68rem] font-bold text-[#0D0D0B]">
              {d.statDelta}
            </dd>
          </dl>
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-[0.9rem] border border-[rgba(244,206,20,0.35)] bg-[rgba(244,206,20,0.09)] px-[0.65rem] py-[0.55rem] text-[0.8rem]">
            <span className="font-semibold">{d.row.who}</span>
            <span className="text-[0.74rem] text-[#8B887E]">{d.row.what}</span>
            <span className="font-semibold [font-variant-numeric:tabular-nums]">{d.row.sum}</span>
          </div>
        </>
      );
    }
    default:
      return null;
  }
}

/* ────────────────────────── Canvas: the wire ────────────────────────── */

function tickX(w: number, k: number) {
  const left = Math.max(48, w * 0.055);
  return left + (k / SEGMENTS) * (w - left * 2);
}

function draw(
  ctx: CanvasRenderingContext2D,
  e: { w: number; h: number; pulses: { x: number; t: number }[] },
  now: number,
  j: number,
) {
  const { w, h } = e;
  ctx.clearRect(0, 0, w, h);
  const wireY = h * 0.8;

  const k = Math.min(SEGMENTS - 1, Math.floor(j * SEGMENTS));
  const frac = j * SEGMENTS - k;
  const dotX = tickX(w, k) + (tickX(w, k + 1) - tickX(w, k)) * smooth(frac);

  // guide wire + lit stretch up to the dot
  ctx.strokeStyle = "rgba(244,206,20,0.13)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(tickX(w, 0), wireY + 0.5);
  ctx.lineTo(tickX(w, SEGMENTS), wireY + 0.5);
  ctx.stroke();

  const lit = ctx.createLinearGradient(tickX(w, 0), 0, dotX, 0);
  lit.addColorStop(0, "rgba(244,206,20,0.16)");
  lit.addColorStop(1, "rgba(244,206,20,0.75)");
  ctx.strokeStyle = lit;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(tickX(w, 0), wireY);
  ctx.lineTo(dotX, wireY);
  ctx.stroke();

  // ticks + labels
  ctx.textAlign = "center";
  STATIONS.forEach((st, i) => {
    const x = tickX(w, i);
    const passed = dotX >= x - 1;
    ctx.fillStyle = passed ? "rgba(244,206,20,0.95)" : "rgba(239,236,227,0.2)";
    ctx.fillRect(x - 1.25, wireY - 5, 2.5, 10);

    ctx.font = '600 10.5px "Geist Mono", ui-monospace, monospace';
    ctx.fillStyle = passed ? "rgba(244,206,20,0.85)" : "rgba(239,236,227,0.28)";
    ctx.fillText(nbMs(st.ms), x, wireY + 24);

    ctx.font = '500 9.5px "Geist Mono", ui-monospace, monospace';
    ctx.fillStyle = passed ? "rgba(239,236,227,0.6)" : "rgba(239,236,227,0.22)";
    ctx.fillText(st.name.toUpperCase(), x, wireY + 40);
  });

  // latency labels mid-gap, whisper-quiet
  ctx.font = '400 9px "Geist Mono", ui-monospace, monospace';
  ctx.fillStyle = "rgba(239,236,227,0.18)";
  for (let i = 0; i < SEGMENTS; i++) {
    const gap = STATIONS[i + 1].ms - STATIONS[i].ms;
    ctx.fillText("+" + gap, (tickX(w, i) + tickX(w, i + 1)) / 2, wireY - 12);
  }

  // comet + glowing head
  const trail = 60;
  const tg = ctx.createLinearGradient(dotX - trail, 0, dotX, 0);
  tg.addColorStop(0, "rgba(255,232,150,0)");
  tg.addColorStop(1, "rgba(255,244,205,0.9)");
  ctx.strokeStyle = tg;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(Math.max(tickX(w, 0), dotX - trail), wireY);
  ctx.lineTo(dotX, wireY);
  ctx.stroke();

  ctx.save();
  ctx.shadowBlur = 16;
  ctx.shadowColor = "rgba(244,206,20,0.8)";
  ctx.fillStyle = "#FFF4CD";
  ctx.beginPath();
  ctx.arc(dotX, wireY, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // dock pulses
  for (let i = e.pulses.length - 1; i >= 0; i--) {
    const p = e.pulses[i];
    const age = (now - p.t) / 650;
    if (age >= 1) {
      e.pulses.splice(i, 1);
      continue;
    }
    ctx.strokeStyle = "rgba(244,206,20," + 0.55 * (1 - age) + ")";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(p.x, wireY, 4 + age * 30, 0, Math.PI * 2);
    ctx.stroke();
  }
}
