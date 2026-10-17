import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT_CTA } from "@/lib/content/about";

export function AboutCta() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white px-8 py-16 text-center shadow-[0_32px_64px_-32px_rgba(15,23,42,0.25)] sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{ABOUT_CTA.headline}</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-text-muted)]">
              {ABOUT_CTA.description}
            </p>
            <Link
              href="/kontakt"
              className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-8 py-4 text-lg font-semibold text-[var(--color-text)] shadow-[0_8px_24px_-8px_rgba(244,206,20,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              {ABOUT_CTA.buttonText}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
