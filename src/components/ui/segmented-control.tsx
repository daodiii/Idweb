"use client";

import { useId, useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  segments: string[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
  /** "light" for light backgrounds, "dark" for dark/aurora backgrounds */
  variant?: "light" | "dark";
}

export function SegmentedControl({
  segments,
  defaultIndex = 0,
  onChange,
  className,
  variant = "dark",
}: SegmentedControlProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const uniqueId = useId();

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  const isLight = variant === "light";

  return (
    <LayoutGroup id={uniqueId}>
      <div
        className={cn(
          "inline-flex rounded-full p-1",
          isLight
            ? "border border-[var(--color-border)] bg-[var(--color-bg-alt)]"
            : "border border-white/10 bg-white/[0.06] backdrop-blur-sm",
          className
        )}
      >
        {segments.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => handleClick(index)}
            className={cn(
              "relative z-10 cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200",
              activeIndex === index
                ? "text-[var(--color-dark-bg)]"
                : isLight
                  ? "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  : "text-slate-400 hover:text-slate-200"
            )}
          >
            {activeIndex === index && (
              <motion.span
                layoutId="pill"
                className={cn(
                  "absolute inset-0 rounded-full",
                  isLight
                    ? "bg-[var(--color-accent)] shadow-sm"
                    : "bg-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/20"
                )}
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
