"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  CommandFreeIcons,
  GlobalSearchIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  Stethoscope02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

interface PortfolioFeature {
  id: string;
  label: string;
  icon: typeof CommandFreeIcons;
  image: string;
}

const FEATURES: PortfolioFeature[] = [
  {
    id: "centerrahma",
    label: "Center Rahma",
    icon: CommandFreeIcons,
    image: "/images/portfolio/centerrahma-tablet-new.webp",
  },
  {
    id: "vocura",
    label: "Vocura",
    icon: CheckmarkCircle01Icon,
    image: "/images/portfolio/vocura-showcase-1.webp",
  },
  {
    id: "brobekk",
    label: "Brobekk Legekontor",
    icon: GlobalSearchIcon,
    image: "/images/portfolio/brobekk-tablet.webp",
  },
  {
    id: "iqra",
    label: "Iqra Senter",
    icon: SmartPhone01Icon,
    image: "/images/portfolio/iqra-tablet.webp",
  },
  {
    id: "ringebu",
    label: "Ringebu Tannlegesenter",
    icon: Stethoscope02Icon,
    image: "/images/portfolio/ringebu-carousel.webp",
  },
];

const AUTO_PLAY_INTERVAL = 3000;
const ITEM_HEIGHT = 65;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;
    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;
    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[4rem] flex flex-col lg:flex-row lg:min-h-[600px] lg:aspect-video bg-white shadow-[0_8px_60px_-12px_rgba(0,0,0,0.15),0_2px_20px_-4px_rgba(0,0,0,0.08)] border border-[var(--color-border)]">

        {/* Mobile: horizontal chip row */}
        <div className="flex lg:hidden gap-2 px-4 pt-5 pb-3 overflow-x-auto scrollbar-hide">
          {FEATURES.map((feature, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={feature.id}
                onClick={() => handleChipClick(index)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium uppercase tracking-wide whitespace-nowrap transition-all duration-500 border shrink-0",
                  isActive
                    ? "bg-[var(--color-text)] text-white border-[var(--color-text)] shadow-md shadow-black/10"
                    : "bg-transparent text-[var(--color-text)]/40 border-[var(--color-border)]"
                )}
              >
                <HugeiconsIcon
                  icon={feature.icon}
                  size={14}
                  strokeWidth={2}
                />
                {feature.label}
              </button>
            );
          })}
        </div>

        {/* Desktop: vertical animated panel */}
        <div className="hidden lg:flex w-[40%] h-full relative z-30 flex-col items-start justify-center overflow-hidden pl-16 bg-white">
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-40" />

          <div className="relative w-full h-full flex items-center justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );
              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-4 px-8 py-4 rounded-full transition-all duration-700 text-left group border",
                      isActive
                        ? "bg-[var(--color-text)] text-white border-[var(--color-text)] shadow-lg shadow-black/10 z-10"
                        : "bg-transparent text-[var(--color-text)]/40 border-[var(--color-border)] hover:border-[var(--color-text)]/30 hover:text-[var(--color-text)]/70"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500",
                        isActive ? "text-white" : "text-[var(--color-text)]/30"
                      )}
                    >
                      <HugeiconsIcon
                        icon={feature.icon}
                        size={18}
                        strokeWidth={2}
                      />
                    </div>
                    <span className="font-normal text-[15px] tracking-tight whitespace-nowrap uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Image carousel panel */}
        <div className="flex-1 min-h-[320px] md:min-h-[500px] lg:h-full relative bg-[var(--color-bg)] flex items-center justify-center py-8 md:py-24 lg:py-16 px-4 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-[var(--color-border)]">
          <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-transparent to-black/[0.04] pointer-events-none z-10" />

          <div className="relative w-full max-w-[280px] md:max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";
              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? ("auto" as const) : ("none" as const),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[1.5rem] md:rounded-[2.8rem] overflow-hidden border-4 md:border-8 border-white bg-white shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] origin-center"
                >
                  <Image
                    src={feature.image}
                    alt={feature.label}
                    fill
                    sizes="(max-width: 768px) 280px, 420px"
                    loading={index === 0 ? "eager" : "lazy"}
                    className={cn(
                      "object-cover object-top transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
