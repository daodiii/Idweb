import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { FAQ_PAGE, FAQS } from "@/lib/content/faq";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHead } from "@/components/klar/page-head";
import { FaqList } from "@/components/klar/faq-list";
import { CtaCard } from "@/components/klar/cta-card";

export const metadata: Metadata = {
  title: SEO.faq.title,
  description: SEO.faq.description,
  alternates: {
    canonical: "/faq",
  },
};

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Vanlige spørsmål", href: "/faq" },
];

export default function FaqPage() {
  return (
    <div className="ka">
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd items={CRUMBS} />

      <PageHead crumbs={CRUMBS} title="Alt du lurer på, besvart uten omveier." lede={FAQ_PAGE.subheadline} />

      <section className="sec" aria-labelledby="svar-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="svar-h">{FAQS.length} svar</h2>
            <p>Trykk for å åpne. Mangler noe, send oss en melding.</p>
          </div>
          <FaqList faq={FAQS} />
        </div>
      </section>

      <CtaCard
        title="Spørsmålet ditt ikke her?"
        text="Skriv eller ring, så får du et konkret svar innen 24 timer. Uforpliktende og uten salgsprat."
        button="Ta kontakt"
      />
    </div>
  );
}
