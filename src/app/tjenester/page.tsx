import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SERVICE_PAGES, type ServicePageSlug } from "@/components/tjenester/pages";
import { SEO } from "@/lib/content/seo";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Arrow } from "@/components/home/arrow";
import { PageHead } from "@/components/klar/page-head";
import { CtaCard } from "@/components/klar/cta-card";

export const metadata: Metadata = pageMetadata({ title: SEO.services.title, description: SEO.services.description, path: "/tjenester" });

const SLUGS = Object.keys(SERVICE_PAGES) as ServicePageSlug[];

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Tjenester", href: "/tjenester" },
];

export default function TjenesterPage() {
  return (
    <div className="ka">
      <BreadcrumbJsonLd items={CRUMBS} />

      <PageHead
        crumbs={CRUMBS}
        title="Alt bedriften trenger på nett, fra én leverandør."
        lede="Nettsiden, systemene bak og driften etterpå. Vi tar oss av hele prosessen, så du kan fokusere på det du gjør best."
      >
        <Link href="/kontakt" className="btn">
          Få et uforpliktende tilbud <Arrow />
        </Link>
      </PageHead>

      <section className="sec" aria-labelledby="tj-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="tj-h">Sju tjenester, én leverandør.</h2>
            <p>
              Du snakker direkte med den som bygger. Ingen mellomledd, og prisen er avtalt før vi starter.
            </p>
          </div>
          <div className="svc-list">
            {SLUGS.map((slug) => (
              <Link key={slug} href={`/tjenester/${slug}`} className="svc-row">
                <span>
                  <b>{SERVICE_PAGES[slug].name}</b>
                  <span>{SERVICE_PAGES[slug].description}</span>
                </span>
                <Arrow size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaCard
        title="Usikker på hva du trenger? Vi finner ut av det sammen."
        text="Fortell oss kort hva du driver med, så foreslår vi en plan som passer budsjettet og målene dine."
        button="Få et uforpliktende tilbud"
      />
    </div>
  );
}
