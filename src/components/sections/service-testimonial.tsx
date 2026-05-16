"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Testimonial } from "@/types";

interface ServiceTestimonialProps {
  testimonial: Testimonial;
}

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Splits the testimonial into a quiet opening and a load-bearing closing
 * phrase so we can weight-contrast the two. We split on the final clause
 * boundary (period or comma) within the last ~40 chars; otherwise we use
 * the last ~30% of the string.
 */
function splitForEmphasis(text: string): { opener: string; emphasis: string } {
  const trimmed = text.trim();
  const minTail = Math.max(20, Math.floor(trimmed.length * 0.25));
  const searchStart = trimmed.length - Math.min(trimmed.length - 1, 90);
  const slice = trimmed.slice(searchStart);
  const localIndex = slice.search(/[.,;:!?][^.,;:!?]*$/);
  if (localIndex !== -1) {
    const absIndex = searchStart + localIndex + 1;
    const head = trimmed.slice(0, absIndex).trim();
    const tail = trimmed.slice(absIndex).trim();
    if (tail.length >= minTail && head.length > 0) {
      return { opener: head, emphasis: tail };
    }
  }
  // Fallback: split on last space before the ~70% mark
  const cut = Math.floor(trimmed.length * 0.7);
  const spaceAt = trimmed.lastIndexOf(" ", cut);
  if (spaceAt > 0) {
    return {
      opener: trimmed.slice(0, spaceAt).trim(),
      emphasis: trimmed.slice(spaceAt).trim(),
    };
  }
  return { opener: "", emphasis: trimmed };
}

export function ServiceTestimonial({ testimonial }: ServiceTestimonialProps) {
  const prefersReducedMotion = useReducedMotion();
  const { author, text } = testimonial;
  const { opener, emphasis } = splitForEmphasis(text);

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 92% 78%, rgba(244,206,20,0.13), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Kundeomtale
          </p>
        </motion.div>

        <motion.figure
          className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="lg:col-span-8">
            <span
              aria-hidden
              className="block select-none font-serif text-[6rem] font-black leading-[0.7] text-[#F4CE14]/30 sm:text-[8rem]"
            >
              &ldquo;
            </span>

            <blockquote className="-mt-6 font-serif text-white">
              {opener && (
                <span className="block text-[clamp(1.5rem,3vw,2.25rem)] font-extralight leading-[1.2] tracking-[-0.01em] text-white/80">
                  {opener}
                </span>
              )}
              <span className="mt-3 block text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.05] tracking-[-0.02em] text-white">
                {emphasis}
              </span>
            </blockquote>
          </div>

          <figcaption className="lg:col-span-4 lg:border-l lg:border-white/[0.08] lg:pl-10">
            <div className="border-t border-white/[0.08] pt-6 lg:border-t-0 lg:pt-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4CE14]">
                {author.name}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                {author.handle}
                {author.company && (
                  <>
                    <span aria-hidden className="mx-2 text-white/25">
                      /
                    </span>
                    {author.company}
                  </>
                )}
              </p>

              {author.rating ? (
                <div
                  className="mt-5 flex gap-1"
                  aria-label={`${author.rating} av 5 stjerner`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className={
                        i < author.rating!
                          ? "text-[#F4CE14]"
                          : "text-white/15"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              ) : null}

              <Link
                href="/referanser"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white/70 transition-colors duration-150 hover:text-[#F4CE14]"
                style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
              >
                Se alle referanser
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
                />
              </Link>
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
