import Link from "next/link";
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import {
  TESTIMONIALS,
  FINAL_CTA,
  SOCIAL_PROOF,
} from "@/lib/content/homepage";
import { HeroSection } from "@/components/sections/hero-section";
import { BentoServices } from "@/components/sections/bento-services";
import { ProcessSection } from "@/components/sections/process-section";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords,
};

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Overview — Bento Grid */}
      <BentoServices />

      {/* Process Steps */}
      <ProcessSection />

      {/* Testimonials */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Det kundene våre sier
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="rounded-lg border border-[var(--color-border)] p-6"
              >
                <p className="text-[var(--color-text-muted)]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            {SOCIAL_PROOF.heading}
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            {SOCIAL_PROOF.description}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {FINAL_CTA.headline}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            {FINAL_CTA.description}
          </p>
          <div className="mt-8">
            <Link
              href="/kontakt"
              className="rounded-lg bg-[var(--color-accent)] px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              {FINAL_CTA.buttonText}
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              {FINAL_CTA.secondaryText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
