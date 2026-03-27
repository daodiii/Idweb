"use client";

import { useEffect, useRef, type ReactNode } from "react";

const PALETTES = {
  horisonten: ["#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#F4F4F4", "#FF6B6B"],
  "stille-spenning": ["#1A1A1D", "#4E4E50", "#6F2232", "#950740", "#C3073F", "#EAEAEA"],
  drommeslor: ["#1F1D36", "#3F3351", "#864879", "#E9A6A6", "#F0F0F0", "#2E2E2E"],
  orkenblomst: ["#3E2723", "#6D4C41", "#D7CCC8", "#FFAB91", "#FF7043", "#FFF3E0"],
  kosmos: ["#0F0F1B", "#1B1B2F", "#16213E", "#533483", "#E94560", "#F5F5F5"],
} as const;

export type PaletteId = keyof typeof PALETTES;

interface PaletteBackgroundProps {
  palette: PaletteId;
  as?: React.ElementType;
  className?: string;
  speed?: number;
  blur?: number;
  intensity?: number;
  fromDeg?: number;
  /** Render a soft gradient fade at the top edge (dark-bg → transparent) */
  fadeTop?: boolean;
  /** Render a soft gradient fade at the bottom edge (transparent → dark-bg) */
  fadeBottom?: boolean;
  children: ReactNode;
}

export function PaletteBackground({
  palette,
  as: Tag = "section",
  className = "",
  speed = 60,
  blur = 55,
  intensity = 0.8,
  fromDeg = 0,
  fadeTop = false,
  fadeBottom = false,
  children,
}: PaletteBackgroundProps) {
  const gradientRef = useRef<HTMLDivElement>(null);

  // Pause animation when out of viewport
  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const colors = PALETTES[palette];
  const gradient = `conic-gradient(from ${fromDeg}deg, ${colors.join(", ")}, ${colors[0]})`;

  return (
    <Tag className={`relative overflow-hidden bg-[var(--color-dark-bg)] ${className}`}>
      {/* z-1: Conic gradient with slow drift */}
      <div
        ref={gradientRef}
        className="palette-drift pointer-events-none absolute inset-[-20%] z-[1]"
        aria-hidden="true"
        style={{
          background: gradient,
          filter: `blur(${blur}px) saturate(160%)`,
          opacity: intensity,
          animationDuration: `${speed}s`,
          willChange: "transform",
        }}
      />

      {/* z-2: Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* z-3: Dark vignette for readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0.25) 0%, transparent 70%)",
        }}
      />

      {/* z-4: Soft edge fades for seamless section transitions */}
      {fadeTop && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-24"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-dark-bg), transparent)",
          }}
        />
      )}
      {fadeBottom && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-24"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to top, var(--color-dark-bg), transparent)",
          }}
        />
      )}

      {/* z-10: Content */}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
