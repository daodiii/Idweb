"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Hand } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Projects — «Karusellen». A true 3D ring of site cards. Drag to spin
 * with momentum; the ring idles in a slow rotation. The card facing
 * front is lifted into focus, the rest angle back into depth.
 */

const N = PORTFOLIO_SITES.length;
const ANGLE = 360 / N;

export function ProjectsCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  const rotation = useMotionValue(0);
  const [radius, setRadius] = useState(360);
  const [cardW, setCardW] = useState(320);
  const [focused, setFocused] = useState(0);

  // Drag + momentum state kept in refs (outside React render).
  const drag = useRef({ active: false, lastX: 0, velocity: 0, hovering: false, visible: true });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const w = stage.clientWidth;
      const cw = Math.min(Math.max(w * 0.34, 260), 520);
      setCardW(cw);
      setRadius(Math.max((cw / 2) / Math.tan(Math.PI / N) * 1.35, cw));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);

    const io = new IntersectionObserver(
      ([e]) => (drag.current.visible = e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(stage);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Per-frame: idle spin + momentum decay + per-card depth styling.
  useAnimationFrame(() => {
    const d = drag.current;
    let r = rotation.get();

    if (!d.active) {
      if (Math.abs(d.velocity) > 0.02) {
        r += d.velocity;
        d.velocity *= 0.94; // friction
      } else if (!d.hovering && d.visible && !reduced) {
        r += 0.08; // slow idle drift
      }
      rotation.set(r);
    }

    if (!d.visible) return;

    // Style each card by how square-on it faces the viewer.
    let bestFacing = -Infinity;
    let bestIndex = 0;
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const theta = ((i * ANGLE + r) * Math.PI) / 180;
      const facing = Math.cos(theta); // 1 = front, -1 = back
      el.style.opacity = String(0.25 + 0.75 * ((facing + 1) / 2));
      el.style.filter = `brightness(${0.55 + 0.45 * ((facing + 1) / 2)})`;
      el.style.zIndex = String(Math.round((facing + 1) * 100));
      if (facing > bestFacing) {
        bestFacing = facing;
        bestIndex = i;
      }
    }
    if (bestIndex !== focused) setFocused(bestIndex);
  });

  const ringTransform = useMotionTemplate`translateZ(-${radius}px) rotateY(${useTransform(
    rotation,
    (r) => r,
  )}deg)`;

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    drag.current.velocity = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.lastX;
    drag.current.lastX = e.clientX;
    const delta = dx * 0.32;
    rotation.set(rotation.get() + delta);
    drag.current.velocity = delta;
  };
  const onPointerUp = () => {
    drag.current.active = false;
  };

  const focusedSite = PORTFOLIO_SITES[focused];
  const focusedStat = PORTFOLIO_STATS[focusedSite.id];

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
      style={{ backgroundColor: VOID, color: PAPER }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(244,206,20,0.1), transparent 65%)",
        }}
      />

      <div className="relative z-10 px-[4vw] pt-20 sm:pt-22">
        <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "112%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
              className="block text-[clamp(1.5rem,3vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            >
              Utvalgte <Marker delay={0.7}>prosjekter</Marker>
            </motion.span>
          </span>
        </motion.h2>
      </div>

      {/* The 3D ring */}
      <div
        ref={stageRef}
        className="relative z-10 flex flex-1 cursor-grab touch-pan-y items-center justify-center active:cursor-grabbing"
        style={{ perspective: "1700px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => (drag.current.hovering = true)}
        onPointerLeave={() => {
          drag.current.hovering = false;
          drag.current.active = false;
        }}
      >
        <motion.div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: ringTransform,
            width: cardW,
            height: cardW * 0.66,
          }}
        >
          {PORTFOLIO_SITES.map((site, i) => {
            const stat = PORTFOLIO_STATS[site.id];
            return (
              <div
                key={site.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute inset-0"
                style={{
                  transform: `rotateY(${i * ANGLE}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="group relative h-full w-full overflow-hidden rounded-xl border shadow-2xl"
                  style={{ borderColor: "rgba(243,240,231,0.18)" }}
                >
                  <Image
                    src={site.images.desktop}
                    alt={`${site.name} — skjermbilde`}
                    fill
                    sizes="520px"
                    className="object-cover object-top"
                    draggable={false}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,13,11,0.78) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
                    <p className="truncate text-sm font-bold" style={{ color: PAPER }}>
                      {site.name}
                    </p>
                    {stat && (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold"
                        style={{ backgroundColor: YELLOW, color: INK }}
                      >
                        {stat.pagespeed}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Focused project read-out */}
      <div className="relative z-10 px-[4vw] pb-16 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: YELLOW }}>
              {String(focused + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
              {focusedSite.name}
            </p>
            <p className="mt-1 font-mono text-xs" style={{ color: "rgba(243,240,231,0.5)" }}>
              {focusedStat?.result ?? "Skreddersydd nettside"}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <span
              className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] sm:flex"
              style={{ color: "rgba(243,240,231,0.45)" }}
            >
              <Hand className="h-4 w-4" aria-hidden /> Dra for å spinne
            </span>
            <Link
              href="/referanser"
              className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: YELLOW, color: INK }}
            >
              Se prosjektene
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
