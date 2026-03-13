"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MoveRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LaptopFrame, TabletFrame, PhoneFrame } from "@/components/ui/device-frame";
import { HERO, TRUST_SIGNALS } from "@/lib/content/homepage";
import { ROTATION_SETS, getSiteById } from "@/lib/content/portfolio-sites";
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

  // -- Rotation state for portfolio device sets --
  const [activeSet, setActiveSet] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Cycle through rotation sets: 6s visible + 0.6s fade = 6.6s total cycle
  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setIsFading(true);
      // After fade-out completes, switch set and fade back in
      fadeTimeout = setTimeout(() => {
        setActiveSet((prev) => (prev + 1) % ROTATION_SETS.length);
        setIsFading(false);
      }, 600);
    }, 6600);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, []);

  // Resolve current set's image paths
  const currentSet = ROTATION_SETS[activeSet];
  const laptopSite = getSiteById(currentSet.laptop);
  const tabletSite = getSiteById(currentSet.tablet);
  const phoneSite = getSiteById(currentSet.phone);

  // Resolve next set for preloading
  const nextSetIndex = (activeSet + 1) % ROTATION_SETS.length;
  const nextSet = ROTATION_SETS[nextSetIndex];
  const nextLaptop = getSiteById(nextSet.laptop);
  const nextTablet = getSiteById(nextSet.tablet);
  const nextPhone = getSiteById(nextSet.phone);

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
        <div className="flex items-center justify-center py-24 lg:py-40">
          {/* Laptop — left */}
          <motion.div
            className="hidden w-[300px] flex-shrink-0 lg:block"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <div
              className="transition-opacity duration-[600ms]"
              style={{ opacity: isFading ? 0 : 1 }}
            >
              {laptopSite && (
                <LaptopFrame
                  key={`laptop-${currentSet.laptop}`}
                  imageSrc={laptopSite.images.desktop}
                  imageAlt={`${laptopSite.name} nettside — desktop`}
                  paused={isFading}
                  priority={activeSet === 0}
                  className="w-[300px] flex-shrink-0"
                />
              )}
            </div>
          </motion.div>

          {/* Center text content */}
          <div className="flex max-w-lg flex-1 flex-col items-center justify-center gap-8 px-8">
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
                      key={title}
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

          {/* Tablet + Phone — right */}
          <motion.div
            className="hidden w-[300px] flex-shrink-0 items-end gap-4 lg:flex"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <div
              className="flex items-end gap-4 transition-opacity duration-[600ms]"
              style={{ opacity: isFading ? 0 : 1 }}
            >
              {tabletSite && (
                <TabletFrame
                  key={`tablet-${currentSet.tablet}`}
                  imageSrc={tabletSite.images.tablet}
                  imageAlt={`${tabletSite.name} nettside — nettbrett`}
                  paused={isFading}
                  priority={activeSet === 0}
                  className="w-[180px] flex-shrink-0"
                />
              )}
              {phoneSite && (
                <PhoneFrame
                  key={`phone-${currentSet.phone}`}
                  imageSrc={phoneSite.images.mobile}
                  imageAlt={`${phoneSite.name} nettside — mobil`}
                  paused={isFading}
                  priority={activeSet === 0}
                  className="w-[100px] flex-shrink-0"
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Trust signals bar */}
        <div
          ref={trustRef}
          className="relative z-[5] grid grid-cols-2 gap-4 border-t border-[var(--color-border)] px-4 py-6 sm:flex sm:justify-center sm:gap-12 sm:px-0 lg:gap-16"
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

      {/* Preload next rotation set (hidden) */}
      <div className="hidden" aria-hidden="true">
        {nextLaptop && (
          <Image
            src={nextLaptop.images.desktop}
            alt=""
            width={1440}
            height={3600}
            priority={false}
          />
        )}
        {nextTablet && (
          <Image
            src={nextTablet.images.tablet}
            alt=""
            width={768}
            height={3200}
            priority={false}
          />
        )}
        {nextPhone && (
          <Image
            src={nextPhone.images.mobile}
            alt=""
            width={375}
            height={3400}
            priority={false}
          />
        )}
      </div>
    </section>
  );
}
