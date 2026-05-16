"use client";

import { FeatureSteps } from "@/components/ui/feature-section";

const serviceFeatures = [
  {
    step: "Nettsider",
    title: "Skreddersydd nettside",
    content:
      "Profesjonelle, raske nettsider som representerer merkevaren din og tiltrekker nye kunder.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&fit=crop",
    href: "/tjenester/nettside",
  },
  {
    step: "SEO",
    title: "SEO-optimalisering",
    content:
      "Bli funnet av kundene dine når de søker på Google etter tjenestene du tilbyr.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
    href: "/tjenester/seo",
  },
  {
    step: "Vedlikehold",
    title: "Drift og vedlikehold",
    content:
      "Løpende oppdateringer, sikkerhetskopier og support — nettsiden din er alltid trygg og oppdatert.",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&q=80&fit=crop",
    href: "/tjenester/vedlikehold",
  },
];

export function ServiceFeatureSteps() {
  return (
    <section className="light-section-warm-alt px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            Våre tjenester
          </p>
          <h2 className="mt-7 font-serif text-[var(--color-text)]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              Tjenester som
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                driver vekst
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>
        </div>
      </div>
      <FeatureSteps
        features={serviceFeatures}
        title=""
        autoPlayInterval={4000}
        className="!pt-0"
      />
    </section>
  );
}
