"use client";

import { useEffect, useRef, type ReactNode } from "react";

const PALETTES = {
  // Colors reordered: bright and dark interleaved so vibrancy is spread around the circle
  horisonten: ["#5BC0BE", "#0B132B", "#F4F4F4", "#3A506B", "#FF6B6B", "#1C2541"],
  "stille-spenning": ["#C3073F", "#1A1A1D", "#EAEAEA", "#6F2232", "#950740", "#4E4E50"],
  drommeslor: ["#E9A6A6", "#1F1D36", "#F0F0F0", "#864879", "#3F3351", "#2E2E2E"],
  orkenblomst: ["#FFAB91", "#3E2723", "#FFF3E0", "#6D4C41", "#FF7043", "#D7CCC8"],
  kosmos: ["#E94560", "#0F0F1B", "#F5F5F5", "#16213E", "#533483", "#1B1B2F"],
  smaragd: ["#0D6B4E", "#0A1A14", "#D4AF37", "#134E3A", "#B8860B", "#1A3C2C"],
  jordtone: ["#8B5E3C", "#1A120B", "#D4A574", "#5C3D2E", "#A0522D", "#2C1810"],
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
  /** Use a single gradient blob instead of multi-blob coverage */
  singleLayer?: boolean;
  children: ReactNode;
}

/**
 * Gradient layer configuration for multi-blob coverage.
 * Each blob is positioned at a different vertical zone with a staggered
 * starting angle so that color is always visible somewhere on the page.
 */
const GRADIENT_LAYERS = [
  { top: "-20%", startOffset: 0 },
  { top: "25%", startOffset: 120 },
  { top: "65%", startOffset: 240 },
];

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
  singleLayer = false,
  children,
}: PaletteBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause all gradient animations when container is out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const drifters = el.querySelectorAll<HTMLDivElement>(".palette-drift");
        const state = entry.isIntersecting ? "running" : "paused";
        drifters.forEach((d) => {
          d.style.animationPlayState = state;
        });
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const colors = PALETTES[palette];

  return (
    <Tag ref={containerRef} className={`relative overflow-hidden bg-[var(--color-dark-bg)] ${className}`}>
      {/* z-1: Gradient blob(s) */}
      {singleLayer ? (
        <div
          className="palette-drift pointer-events-none absolute inset-[-20%] z-[1]"
          aria-hidden="true"
          style={{
            background: `conic-gradient(from ${fromDeg}deg, ${colors.join(", ")}, ${colors[0]})`,
            filter: `blur(${blur}px) saturate(160%)`,
            opacity: intensity,
            animationDuration: `${speed}s`,
            willChange: "transform",
          }}
        />
      ) : (
        GRADIENT_LAYERS.map((layer, i) => {
          const deg = (fromDeg + layer.startOffset) % 360;
          const grad = `conic-gradient(from ${deg}deg, ${colors.join(", ")}, ${colors[0]})`;
          return (
            <div
              key={i}
              className="palette-drift pointer-events-none absolute z-[1]"
              aria-hidden="true"
              style={{
                top: layer.top,
                left: "-20%",
                right: "-20%",
                height: "60%",
                background: grad,
                filter: `blur(${blur}px) saturate(200%)`,
                opacity: intensity * (i === 0 ? 1 : 0.85),
                animationDuration: `${speed + i * 15}s`,
                animationDelay: `${-i * (speed / 3)}s`,
                willChange: "transform",
              }}
            />
          );
        })
      )}

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
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0.10) 0%, transparent 70%)",
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
