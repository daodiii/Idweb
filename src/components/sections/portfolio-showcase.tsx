import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureCarousel } from "@/components/ui/feature-carousel";
import { AnimateIn } from "@/components/ui/animate-in";

export function PortfolioShowcase() {
  return (
    <section className="light-section-warm px-6 pt-6 pb-14 sm:pt-10 sm:pb-24 md:pt-12 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn className="mb-16">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-text)] sm:text-4xl lg:text-5xl">
              Utvalgte prosjekter
            </h2>
          </div>
        </AnimateIn>

        <AnimateIn>
          <FeatureCarousel />
        </AnimateIn>

        {/* CTA button to see all projects */}
        <AnimateIn className="mt-10 flex justify-center" delay={0.15}>
          <Link
            href="/referanser"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[var(--color-accent)] px-8 py-4 text-base font-bold text-[var(--color-text)] shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-300 hover:gap-4 hover:shadow-xl hover:shadow-[var(--color-accent)]/35 sm:px-10 sm:py-5 sm:text-lg"
          >
            <span className="relative z-10">Tidligere prosjekter</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="absolute inset-0 z-0 bg-[var(--color-accent-hover)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
