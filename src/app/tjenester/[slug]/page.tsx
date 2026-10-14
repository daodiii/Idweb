import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content/services";
import { SERVICE_SEO } from "@/lib/content/seo";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Arrow } from "@/components/home/arrow";
import { PageHead } from "@/components/klar/page-head";
import { StepList } from "@/components/klar/step-list";
import { FaqList } from "@/components/klar/faq-list";
import { CtaCard } from "@/components/klar/cta-card";
import { Tick } from "@/components/klar/tick";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Shown on the nettside page only: how one site adapts to each screen size. */
const BREAKPOINTS = [
  { label: "Desktop", width: "1440px+", description: "Full layout med rikt visuelt hierarki — der besøkende dykker dypt inn i innholdet." },
  { label: "Nettbrett", width: "768–1280px", description: "Justert kolonnestruktur som balanserer bilde og tekst på lesebrett og iPad." },
  { label: "Mobil", width: "360–767px", description: "Mobil-først navigasjon, store trykkflater og kontaktknapper innen rekkevidde." },
];

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = SERVICE_SEO[slug];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/tjenester/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "nb_NO",
      siteName: "IDweb",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  const seo = SERVICE_SEO[slug];
  const crumbs = [
    { name: "Hjem", href: "/" },
    { name: "Tjenester", href: "/tjenester" },
    { name: service.title, href: `/tjenester/${slug}` },
  ];

  return (
    <div className="ka">
      {seo && <ServiceJsonLd name={seo.title} description={seo.description} slug={slug} />}
      <FaqJsonLd faqs={service.faq} />
      <BreadcrumbJsonLd items={crumbs} />

      <PageHead crumbs={crumbs} title={service.title} lede={service.shortDescription}>
        <Link href="/kontakt" className="btn">
          Få et uforpliktende tilbud <Arrow />
        </Link>
        <Link href="/tjenester" className="link">
          Se tjenestene
        </Link>
      </PageHead>

      <section className="sec" aria-labelledby="hverdag-h">
        <div className="wrap">
          <div className="sec-h wide">
            <h2 id="hverdag-h">Det vi ser hver dag.</h2>
            <p>{service.longDescription}</p>
          </div>
          <ul className="g-items warn">
            {service.painPoints.map((p) => (
              <li key={p.title}>
                <b>{p.title}</b>
                <span>{p.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec alt" aria-labelledby="inkludert-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="inkludert-h">Dette er inkludert.</h2>
            <p>Hver side settes sammen for hånd — ingen mal, ingen ferdigpakke. Her er byggesteinene som følger med.</p>
          </div>
          <ul className="ticks">
            {service.detailedFeatures.map((f) => (
              <li key={f.title}>
                <Tick />
                <span className="t">
                  <b>{f.title}</b>
                  <span>{f.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {slug === "nettside" && (
        <section className="sec" aria-labelledby="enheter-h">
          <div className="wrap">
            <div className="sec-h wide">
              <h2 id="enheter-h">Én nettside, alle enheter — samme følelse overalt.</h2>
              <p>
                Vi bygger nettsiden lag for lag, fra mobil og oppover. Resultatet er en opplevelse som føles riktig
                enten kunden sitter på toget eller foran en stor skjerm.
              </p>
            </div>
            <ul className="g-items">
              {BREAKPOINTS.map((b) => (
                <li key={b.label}>
                  <b>
                    {b.label} <small>{b.width}</small>
                  </b>
                  <span>{b.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="sec" aria-labelledby="prosess-h">
        <div className="wrap">
          <div className="sec-h wide">
            <h2 id="prosess-h">Fra første samtale til lansering i fire trinn.</h2>
            <p>En tydelig prosess uten overraskelser. Du vet til enhver tid hvor prosjektet står og hva som skjer videre.</p>
          </div>
          <StepList steps={service.processSteps} />
        </div>
      </section>

      <section className="sec alt" aria-labelledby="faq-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="faq-h">Det du lurer på, kort forklart.</h2>
          </div>
          <FaqList faq={service.faq} />
        </div>
      </section>

      <CtaCard
        title="La oss ta praten før vi tar tilbudet."
        text="Bestill en gratis og uforpliktende samtale, så finner vi sammen ut hva som passer bedriften din best."
        button="Book en gratis samtale"
      />
    </div>
  );
}
