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
    <section className="light-section-warm-alt px-6 py-14 sm:py-24 md:py-32">
      <p className="text-center text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Mine tjenester
      </p>
      <FeatureSteps
        features={serviceFeatures}
        title="Tjenester som driver vekst"
        autoPlayInterval={4000}
        className="!pt-2"
      />
    </section>
  );
}
