"use client";

import { useId, type ReactNode } from "react";

const VARIANTS = {
  "top-left":    { teal: "15% 20%", gold: "60% 70%" },
  "top-right":   { teal: "85% 20%", gold: "30% 65%" },
  "top-center":  { teal: "50% 10%", gold: "75% 60%" },
  center:        { teal: "30% 45%", gold: "70% 55%" },
  "bottom-left": { teal: "20% 75%", gold: "70% 30%" },
  "bottom-right":{ teal: "80% 70%", gold: "25% 35%" },
  "bottom-center":{ teal: "50% 85%", gold: "40% 30%" },
} as const;

type AuroraVariant = keyof typeof VARIANTS;

type AuroraElement = "section" | "div" | "footer";

interface AuroraBackgroundProps {
  variant?: AuroraVariant;
  intensity?: number;
  as?: AuroraElement;
  children: ReactNode;
  className?: string;
}

export function AuroraBackground({
  variant = "center",
  intensity = 0.08,
  as: Tag = "section",
  children,
  className = "",
}: AuroraBackgroundProps) {
  const filterId = useId();
  const positions = VARIANTS[variant];
  const goldIntensity = intensity * 0.75;

  return (
    <Tag className={`relative overflow-hidden bg-[var(--color-dark-bg)] ${className}`}>
      {/* Aurora glow layer */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            `radial-gradient(ellipse 70% 50% at ${positions.teal}, rgba(var(--color-aurora-teal), ${intensity}) 0%, transparent 70%)`,
            `radial-gradient(ellipse 70% 50% at ${positions.gold}, rgba(var(--color-aurora-gold), ${goldIntensity}) 0%, transparent 70%)`,
          ].join(", "),
        }}
      />

      {/* Noise texture layer */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{ opacity: "var(--aurora-noise-opacity)" }}
      >
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={3} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
