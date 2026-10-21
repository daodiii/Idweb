import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import {
  WEBBYRA_OSLO,
  WEBBYRA_OSLO_SEO,
  OSLO_LOCAL,
  PRICE_GUIDE,
  AGENCY_SERVICES,
} from "@/lib/content/webbyra-oslo";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Arrow } from "@/components/home/arrow";
import { PageHead } from "@/components/klar/page-head";
import { StepList } from "@/components/klar/step-list";
import { FaqList } from "@/components/klar/faq-list";
import { CtaCard } from "@/components/klar/cta-card";
import { Tick } from "@/components/klar/tick";

const PATH = "/webbyra-oslo";

/** Honest proof only: things that are true of every IDweb delivery. */
const PROOF = ["Ingen bindingstid — du eier siden", "Norsk utvikler, rask levering", "Bygget for fart og mobil"];

export const metadata: Metadata = pageMetadata({ title: WEBBYRA_OSLO_SEO.title, description: WEBBYRA_OSLO_SEO.description, path: PATH });

export default function WebbyraOsloPage() {
  const crumbs = [
    { name: "Hjem", href: "/" },
    { name: WEBBYRA_OSLO.title, href: PATH },
  ];

  return (
    <div className="ka">
      <ServiceJsonLd
        name={WEBBYRA_OSLO.title}
        description={WEBBYRA_OSLO_SEO.description}
        slug="webbyra-oslo"
        basePath=""
        areaServed={{ "@type": "City", name: "Oslo" }}
      />
      <FaqJsonLd faqs={WEBBYRA_OSLO.faq} />
      <BreadcrumbJsonLd items={crumbs} />

      <PageHead
        crumbs={crumbs}
        title={WEBBYRA_OSLO.title}
        lede={WEBBYRA_OSLO.shortDescription}
        after={
          <ul className="proof">
            {PROOF.map((p) => (
              <li key={p}>
                <Tick size={16} />
                {p}
              </li>
            ))}
          </ul>
        }
      >
        <Link href="/kontakt" className="btn">
          Få et uforpliktende tilbud <Arrow />
        </Link>
        <Link href="/tjenester" className="link">
          Se tjenestene
        </Link>
      </PageHead>

      <section className="sec" aria-labelledby="bygger-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="bygger-h">Dette bygger vi for bedrifter i Oslo</h2>
          </div>
          <div className="svc-list">
            {AGENCY_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="svc-row">
                <span>
                  <b>{s.title}</b>
                  <span>{s.description}</span>
                  <small>{s.tag}</small>
                </span>
                <Arrow size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt" aria-labelledby="pris-h">
        <div className="wrap g-split">
          <div className="sec-h">
            <h2 id="pris-h">Hva koster et webbyrå i Oslo?</h2>
            <p>
              Prisen styres av antall sider, hvor mye av designet som lages fra bunnen av, og funksjoner som booking,
              nettbutikk eller koblinger mot andre systemer. Hos oss får du en fast pris etter en gratis samtale, før
              noe arbeid starter.
            </p>
            <Link href={PRICE_GUIDE.guideHref} className="more">
              Les hele prisguiden <Arrow />
            </Link>
          </div>
          <div className="box">
            <h3>Typiske markedspriser</h3>
            <dl className="kv stack">
              {PRICE_GUIDE.rows.map((row) => (
                <div key={row.label}>
                  <dt>
                    <b>{row.label}</b>
                    <span>{row.detail}</span>
                  </dt>
                  <dd>{row.range}</dd>
                </div>
              ))}
            </dl>
            <p className="note">{PRICE_GUIDE.footnote}</p>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="marked-h">
        <div className="wrap g-split">
          <div>
            <div className="sec-h">
              <h2 id="marked-h">Vi kjenner markedet i Oslo.</h2>
              <p>{OSLO_LOCAL.intro}</p>
            </div>
            <p className="label">Vi dekker blant annet</p>
            <ul className="chiplist">
              {OSLO_LOCAL.areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
          <div className="box">
            <h3>Oslo i tall</h3>
            <dl className="kv">
              {OSLO_LOCAL.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>
                    <span>{fact.label}</span>
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <p className="note">Oslo-basert · digital leveranse i hele {OSLO_LOCAL.region}</p>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="prosess-h">
        <div className="wrap">
          <div className="sec-h wide">
            <h2 id="prosess-h">Fra første samtale til lansering i fire trinn.</h2>
            <p>En tydelig prosess uten overraskelser. Du vet til enhver tid hvor prosjektet står og hva som skjer videre.</p>
          </div>
          <StepList steps={WEBBYRA_OSLO.processSteps} />
        </div>
      </section>

      <section className="sec alt" aria-labelledby="faq-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="faq-h">Det du lurer på, kort forklart.</h2>
          </div>
          <FaqList faq={WEBBYRA_OSLO.faq} />
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
