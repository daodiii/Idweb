import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { SEO } from "@/lib/content/seo";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContactSection } from "@/components/home/contact-section";
import { Arrow } from "@/components/home/arrow";
import { PageHead } from "@/components/klar/page-head";

export const metadata: Metadata = pageMetadata({ title: SEO.contact.title, description: SEO.contact.description, path: "/kontakt" });

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Kontakt", href: "/kontakt" },
];

const CONTACT_ROWS = [
  { label: "Telefon", value: "+47 984 06 164", href: "tel:+4798406164", meta: "Hverdager 08–17" },
  { label: "E-post", value: "hei@idweb.no", href: "mailto:hei@idweb.no", meta: "Svar innen 24 timer" },
  { label: "Åpningstider", value: "Mandag – fredag", href: null, meta: "08:00 – 17:00" },
] as const;

const PROCESS_STEPS = [
  "Vi leser meldingen din og forbereder oss.",
  "Vi tar kontakt innen 24 timer for en uforpliktende samtale.",
  "Vi sender deg et skreddersydd tilbud med fast pris.",
  "Du bestemmer — ingen press, ingen forpliktelser.",
];

export default function KontaktPage() {
  return (
    <div className="ka">
      <BreadcrumbJsonLd items={CRUMBS} />

      <PageHead
        crumbs={CRUMBS}
        title="La oss snakke ærlig om nettsiden din."
        lede="Send oss en melding, så tar vi kontakt innen 24 timer. Helt uforpliktende, ingen salgspress, bare en ærlig samtale om hva vi kan gjøre for deg."
      />

      <ContactSection
        title="Send oss en melding."
        text="Fortell oss litt om bedriften din og hva du ønsker å oppnå. Jo mer du deler, desto bedre tilbud kan vi gi deg."
        note={
          <>
            Ved å sende inn skjemaet godtar du vår <Link href="/personvern">personvernerklæring</Link>.
          </>
        }
      />

      <section className="sec alt" aria-labelledby="direkte-h">
        <div className="wrap g-split">
          <div>
            <div className="sec-h">
              <h2 id="direkte-h">Foretrekker du en telefon?</h2>
            </div>
            <dl className="kv">
              {CONTACT_ROWS.map((row) => (
                <div key={row.label}>
                  <dt>
                    <b>{row.label}</b>
                    <span>{row.meta}</span>
                  </dt>
                  <dd>{row.href ? <a href={row.href}>{row.value}</a> : row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="label first">Hva skjer videre</h3>
            <ol className="chapters small">
              {PROCESS_STEPS.map((step, i) => (
                <li key={step}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <Link href="/referanser" className="more">
              Se hva vi har levert <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
