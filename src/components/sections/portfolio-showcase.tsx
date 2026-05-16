import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { AnimateIn } from "@/components/ui/animate-in";

export function PortfolioShowcase() {
  return (
    <section className="light-section-warm px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn className="mb-14 max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            Portefølje
          </p>
          <h2 className="mt-7 font-serif text-[var(--color-text)]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              Utvalgte
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                prosjekter
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn>
          <FeatureCarousel />
        </AnimateIn>

        <AnimateIn className="mt-14 flex justify-center" delay={0.15}>
          <Link
            href="/referanser"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-7 py-4 text-sm font-bold text-[#fafaf9] shadow-[0_10px_30px_-12px_rgba(10,10,10,0.4)] transition-[transform,background-color] duration-150 hover:bg-[#1a1a1a] active:scale-[0.97]"
            style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
          >
            Tidligere prosjekter
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
            />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
