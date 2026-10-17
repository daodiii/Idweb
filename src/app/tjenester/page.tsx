import Link from "next/link";
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Arrow } from "@/components/home/arrow";
import { PageHead } from "@/components/klar/page-head";
import { CtaCard } from "@/components/klar/cta-card";

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
  alternates: {
    canonical: "/tjenester",
  },
};

const SERVICES = [
  {
    slug: "webutvikler-oslo",
    title: "Webutvikler i Oslo",
    description:
      "Lokal webutvikler i Oslo som lager raske, skreddersydde nettsider for bedrifter i hovedstaden.",
    features: ["Heldigital prosess", "Skreddersydd Next.js", "Lokal SEO", "Direkte med utvikleren"],
  },
  {
    slug: "nettside",
    title: "Skreddersydd nettside",
    description:
      "Profesjonell, mobiloptimalisert nettside designet for å tiltrekke kunder og styrke merkevaren din.",
    features: ["Responsivt design", "SEO-optimalisert", "Rask lastetid", "SSL-sertifikat"],
  },
  {
    slug: "nettbutikk",
    title: "Nettbutikk-utvikling",
    description:
      "Skreddersydde nettbutikker med trygg betaling, lynraske, mobilvennlige og bygget for konvertering.",
    features: ["Betaling", "Rask lastetid", "Mobil-først kasse", "SEO på produktsider"],
  },
  {
    slug: "seo",
    title: "SEO-optimalisering",
    description:
      "Bli synlig i Google og tiltrekk flere kunder med profesjonell søkemotoroptimalisering.",
    features: ["Teknisk SEO", "Innholdsoptimalisering", "Lokal SEO", "Månedlig rapportering"],
  },
  {
    slug: "vedlikehold",
    title: "Drift og vedlikehold",
    description:
      "Hold nettsiden din trygg, rask og oppdatert med pålitelig hosting og support.",
    features: ["Sikkerhetskopier", "Oppdateringer", "Pålitelig hosting", "Prioritert support"],
  },
];

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
        title="Alt du trenger for å lykkes på nett."
        lede="Fra design og utvikling til SEO og vedlikehold, vi tar oss av hele prosessen slik at du kan fokusere på det du gjør best."
      >
        <Link href="/kontakt" className="btn">
          Få et uforpliktende tilbud <Arrow />
        </Link>
      </PageHead>

      <section className="sec" aria-labelledby="tj-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="tj-h">Fem tjenester, ett team.</h2>
            <p>
              Du snakker direkte med utvikleren. Ingen mellomledd, ingen hvitkalking, ingen overraskelser i
              sluttregningen.
            </p>
          </div>
          <div className="svc-list">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/tjenester/${s.slug}`} className="svc-row">
                <span>
                  <b>{s.title}</b>
                  <span>{s.description}</span>
                  <small>{s.features.join(" · ")}</small>
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
