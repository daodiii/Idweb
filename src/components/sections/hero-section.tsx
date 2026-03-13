"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO, TRUST_SIGNALS } from "@/lib/content/homepage";
import type { TrustSignal } from "@/types";

// -- Counter hook for trust signal animation --
function useCounter(target: number, decimals: number, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let current = 0;
    const step = decimals > 0 ? 0.1 : Math.ceil(target / 60);

    function tick() {
      current += step;
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(current);
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
}

// -- Laptop mockup (abstract/stylized website) --
function LaptopMockup() {
  return (
    <div className="w-[300px] flex-shrink-0" style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(18deg)" }}>
        {/* Laptop frame */}
        <div
          className="rounded-t-xl bg-[#1a1a1a] p-1"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.08)",
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 rounded-t-lg bg-[#111] px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
            <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
            <div className="ml-3 h-2 flex-1 rounded bg-white/5" />
          </div>
          {/* Screen content */}
          <div className="flex h-[180px] flex-col gap-1.5 bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-4">
            {/* Mini nav */}
            <div className="mb-1 flex items-center justify-between">
              <div className="h-1.5 w-12 rounded bg-white/25" />
              <div className="flex gap-2.5">
                <div className="h-1 w-6 rounded bg-white/10" />
                <div className="h-1 w-6 rounded bg-white/10" />
                <div className="h-1 w-6 rounded bg-white/10" />
              </div>
            </div>
            {/* Hero text blocks */}
            <div className="mt-3 flex flex-col items-center gap-1.5">
              <div className="h-2 w-[70%] rounded bg-white/30" />
              <div className="h-1.5 w-[45%] rounded bg-[var(--color-accent)]/50" />
              <div className="mt-0.5 h-1 w-[55%] rounded bg-white/10" />
            </div>
            {/* Cards row */}
            <div className="mt-auto flex gap-2">
              <div className="flex-1 rounded border border-white/5 bg-white/[0.03] p-2">
                <div className="mb-1 h-1 w-[60%] rounded bg-white/15" />
                <div className="h-0.5 w-[80%] rounded bg-white/5" />
              </div>
              <div className="flex-1 rounded border border-white/5 bg-white/[0.03] p-2">
                <div className="mb-1 h-1 w-[50%] rounded bg-white/15" />
                <div className="h-0.5 w-[70%] rounded bg-white/5" />
              </div>
              <div className="flex-1 rounded border border-white/5 bg-white/[0.03] p-2">
                <div className="mb-1 h-1 w-[55%] rounded bg-white/15" />
                <div className="h-0.5 w-[65%] rounded bg-white/5" />
              </div>
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div className="mx-auto h-2.5 w-[320px] rounded-b bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
        <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-[#222]" />
      </div>
    </div>
  );
}

// -- Phone mockup (abstract/stylized mobile site) --
function PhoneMockup() {
  return (
    <div className="w-[100px] flex-shrink-0" style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(-15deg)" }}>
        <div
          className="rounded-[18px] bg-[#1a1a1a] p-1"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.06)",
          }}
        >
          {/* Notch */}
          <div className="mx-auto mb-1 h-1.5 w-10 rounded-b-md bg-[#111]" />
          {/* Screen content */}
          <div className="flex h-[200px] flex-col gap-1.5 rounded-xl bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-3">
            {/* Mobile nav */}
            <div className="flex items-center justify-between">
              <div className="h-1 w-7 rounded bg-white/20" />
              <div className="flex flex-col gap-0.5">
                <div className="h-[1.5px] w-3 bg-white/30" />
                <div className="h-[1.5px] w-2 bg-white/30" />
              </div>
            </div>
            {/* Hero text */}
            <div className="mt-3 flex flex-col items-center gap-1">
              <div className="h-1.5 w-16 rounded bg-white/25" />
              <div className="h-1 w-10 rounded bg-[var(--color-accent)]/40" />
              <div className="mt-1 h-0.5 w-14 rounded bg-white/8" />
            </div>
            {/* CTA button */}
            <div className="mx-auto mt-2 h-3 w-12 rounded bg-[var(--color-accent)]/50" />
            {/* Card */}
            <div className="mt-auto rounded-md border border-white/5 bg-white/[0.03] p-2">
              <div className="mb-1 h-1 w-[70%] rounded bg-white/10" />
              <div className="h-0.5 w-[90%] rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -- Single trust signal with counter --
function TrustSignalItem({
  signal,
  inView,
}: {
  signal: TrustSignal;
  inView: boolean;
}) {
  const display = useCounter(signal.value, signal.decimals ?? 0, inView);

  return (
    <div className="text-center">
      <div className="text-xl font-extrabold text-[var(--color-text)] sm:text-2xl">
        {display}
        {signal.suffix}
      </div>
      <div className="mt-1 text-xs text-[var(--color-text-muted)]">
        {signal.label}
      </div>
    </div>
  );
}

// -- Main hero section --
export function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => HERO.rotatingWords, []);
  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative w-full bg-[var(--color-bg)]">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--dot-color) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-7xl px-6">
        {/* Main content row */}
        <div className="flex items-center justify-center gap-10 py-24 lg:py-40">
          {/* Laptop mockup — left */}
          <motion.div
            className="hidden lg:block"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <LaptopMockup />
          </motion.div>

          {/* Center text content */}
          <div className="flex max-w-lg flex-1 flex-col items-center justify-center gap-8">
            <div>
              <Link href="/referanser">
                <Button variant="secondary" size="sm" className="gap-3">
                  {HERO.badge} <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-5xl font-bold tracking-tight lg:text-6xl">
                <span>{HERO.headline}</span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-extrabold text-[var(--color-accent)]"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>
              <p className="mx-auto text-center text-lg leading-relaxed tracking-tight text-[var(--color-text-muted)] md:text-xl">
                {HERO.subheadline}
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Link href="/kontakt">
                <Button size="lg" variant="secondary" className="gap-3">
                  {HERO.secondaryCta} <PhoneCall className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" className="gap-3">
                  {HERO.primaryCta} <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Phone mockup — right */}
          <motion.div
            className="hidden lg:block"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* Trust signals bar */}
        <div
          ref={trustRef}
          className="relative z-[5] flex justify-center gap-12 border-t border-[var(--color-border)] py-6 sm:gap-16"
        >
          {TRUST_SIGNALS.map((signal) => (
            <TrustSignalItem
              key={signal.label}
              signal={signal}
              inView={trustInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
