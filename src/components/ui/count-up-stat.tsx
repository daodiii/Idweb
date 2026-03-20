"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function CountUpStat({ value, suffix = "", prefix = "", decimals }: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);
  const decimalsRef = useRef(decimals);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        if (prefersReduced) {
          setDisplay(value);
          return;
        }

        const duration = 1500;
        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const num = eased * value;
          const d = decimalsRef.current;
          setDisplay(d ? parseFloat(num.toFixed(d)) : Math.round(num));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{decimals ? display.toFixed(decimals) : display}{suffix}
    </span>
  );
}
