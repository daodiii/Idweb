"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

const TILT_MAX_DEG = 5;
const HOVER_LIFT_PX = 6;
const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.6 };
const LIFT_SPRING = { stiffness: 260, damping: 24, mass: 0.5 };
const PERSPECTIVE_PX = 1200;
const EASE = [0.23, 1, 0.32, 1] as const;

export type PricingPackage = {
  id: string;
  name: string;
  price: string;
  monthly: string;
  features: readonly string[];
  highlight: boolean;
};

export function PricingCard3D({
  pkg,
  index,
}: {
  pkg: PricingPackage;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const baseElevation = pkg.highlight ? -12 : 0;

  // Mouse-driven motion values
  const rotXTarget = useMotionValue(0);
  const rotYTarget = useMotionValue(0);
  const liftTarget = useMotionValue(baseElevation);

  // Springed for smoothness
  const rotX = useSpring(rotXTarget, TILT_SPRING);
  const rotY = useSpring(rotYTarget, TILT_SPRING);
  const lift = useSpring(liftTarget, LIFT_SPRING);

  // Single composed transform string — keeps the GPU layer happy
  const transform = useMotionTemplate`perspective(${PERSPECTIVE_PX}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(${lift}px)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    // rotateY follows horizontal cursor; rotateX inverted for natural tilt
    rotYTarget.set(nx * 2 * TILT_MAX_DEG);
    rotXTarget.set(-ny * 2 * TILT_MAX_DEG);
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion) return;
    liftTarget.set(baseElevation - HOVER_LIFT_PX);
  };

  const handleMouseLeave = () => {
    rotXTarget.set(0);
    rotYTarget.set(0);
    liftTarget.set(baseElevation);
  };

  return (
    <motion.div
      variants={{
        hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: EASE,
          },
        },
      }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={
          "group relative flex h-full flex-col rounded-3xl border p-8 " +
          (pkg.highlight
            ? "border-[#F4CE14]/40 bg-[rgba(244,206,20,0.04)] shadow-[0_30px_80px_-30px_rgba(244,206,20,0.28)]"
            : "border-white/[0.07] bg-white/[0.015] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]")
        }
        style={{
          transform: prefersReducedMotion
            ? `translateY(${baseElevation}px)`
            : transform,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Highlighted: animated yellow glow seam across the top edge */}
        {pkg.highlight && (
          <>
            <span
              aria-hidden
              className="pricing-glow-seam pointer-events-none absolute -top-px left-6 right-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(244,206,20,0.9) 30%, rgba(244,206,20,1) 50%, rgba(244,206,20,0.9) 70%, transparent 100%)",
              }}
            />
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F4CE14] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]">
              Mest populær
            </span>
          </>
        )}

        {/* Tier name + price — parallax-forward layer */}
        <div
          style={{
            transform: prefersReducedMotion ? undefined : "translateZ(24px)",
            transformStyle: "preserve-3d",
          }}
        >
          <p
            className={
              "font-mono text-xs uppercase tracking-[0.22em] " +
              (pkg.highlight ? "text-[#F4CE14]" : "text-white/45")
            }
          >
            {pkg.name}
          </p>

          <div className="mt-6 flex items-baseline gap-1.5">
            <span className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-black leading-none tracking-tight text-white">
              {pkg.price}
            </span>
          </div>

          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
            + {pkg.monthly} vedlikehold
          </p>
        </div>

        {/* Features list — staggered fade-in on viewport entry */}
        <ul className="relative mt-8 flex-1 space-y-3 border-t border-white/[0.06] pt-6">
          {pkg.features.slice(0, 4).map((feat, i) => (
            <motion.li
              key={feat}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -4 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.32,
                delay: prefersReducedMotion
                  ? 0
                  : 0.2 + index * 0.08 + i * 0.06,
                ease: EASE,
              }}
              className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
            >
              <span
                aria-hidden
                className={
                  "mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full " +
                  (pkg.highlight ? "bg-[#F4CE14]" : "bg-white/35")
                }
              />
              <span>{feat}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
