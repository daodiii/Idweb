"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { HERO } from "@/lib/content/homepage";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE, INK, PAPER, YELLOW } from "@/lib/motion";

/**
 * Hero 02 — «Magnetfelt». The paper is covered in thousands of small
 * ink filings that swivel to face the cursor like iron around a
 * magnet; a warm yellow charge follows the pointer. Without a cursor
 * the field breathes on slow noise drift.
 */

function hash(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function MagnetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    let t = 0;

    interface Filing {
      x: number;
      y: number;
      angle: number;
      phase: number;
    }
    let filings: Filing[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const SPACING = 30;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      filings = [];
      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          // Jitter the grid so it reads organic, not graph paper.
          const jx = (hash(c, r) - 0.5) * SPACING * 0.6;
          const jy = (hash(c + 99, r + 7) - 0.5) * SPACING * 0.6;
          filings.push({
            x: c * SPACING + jx,
            y: r * SPACING + jy,
            angle: hash(c, r * 3) * Math.PI * 2,
            phase: hash(c * 7, r) * Math.PI * 2,
          });
        }
      }
    };

    const shortestArc = (from: number, to: number) => {
      let d = (to - from) % (Math.PI * 2);
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      return d;
    };

    const frame = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Yellow charge under the cursor.
      if (mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 190);
        grad.addColorStop(0, "rgba(244,206,20,0.5)");
        grad.addColorStop(1, "rgba(244,206,20,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 190, mouse.y - 190, 380, 380);
      }

      ctx.lineCap = "round";

      for (const f of filings) {
        const dx = mouse.x - f.x;
        const dy = mouse.y - f.y;
        const dist = Math.hypot(dx, dy);
        const influence = mouse.active ? Math.max(0, 1 - dist / 320) : 0;

        // Idle: slow wave drift; near cursor: point at it.
        const idle =
          Math.sin(f.x * 0.006 + t * 0.7 + f.phase) * 0.9 +
          Math.cos(f.y * 0.005 - t * 0.45) * 0.9;
        const target = influence > 0.02 ? Math.atan2(dy, dx) : idle;
        f.angle += shortestArc(f.angle, target) * (0.06 + influence * 0.22);

        const len = 10 + influence * 10;
        const cos = Math.cos(f.angle) * len * 0.5;
        const sin = Math.sin(f.angle) * len * 0.5;

        const alpha = 0.32 + influence * 0.6;
        ctx.strokeStyle = `rgba(20,20,16,${alpha})`;
        ctx.lineWidth = 1.6 + influence * 1.2;
        ctx.beginPath();
        ctx.moveTo(f.x - cos, f.y - sin);
        ctx.lineTo(f.x + cos, f.y + sin);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

function RevealLine({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={reduced ? { opacity: 0 } : { y: "110%" }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.95, ease: EASE, delay: 0.25 + index * 0.12 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroMagnet() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-20"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <MagnetCanvas />
      {/* Soft paper halo keeps the type zone readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 52% at 32% 46%, rgba(243,240,231,0.88), rgba(243,240,231,0.3) 55%, transparent 75%)",
        }}
      />

      <div className="relative z-10 px-[4vw]">
        <h1>
          <span className="sr-only">{HERO.headline}</span>
          <span aria-hidden>
            <RevealLine
              index={0}
              className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            >
              Webutvikling
            </RevealLine>
            <RevealLine
              index={1}
              className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            >
              og nettsider
            </RevealLine>
            <RevealLine
              index={2}
              className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            >
              i Oslo
              <span
                className="ml-[0.18em] inline-block h-[0.14em] w-[0.7em] -translate-y-[0.08em] rounded-full"
                style={{ backgroundColor: YELLOW }}
              />
            </RevealLine>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-[46ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "rgba(20,20,16,0.72)" }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
        >
          <Magnetic>
            <Link
              href="/referanser"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold transition-colors duration-200 active:scale-[0.97]"
              style={{ backgroundColor: INK, color: PAPER }}
            >
              {HERO.primaryCta}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: YELLOW }}
              />
            </Link>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 border-b-2 pb-1 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-60"
              style={{ borderColor: YELLOW, color: INK }}
            >
              {HERO.secondaryCta}
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
