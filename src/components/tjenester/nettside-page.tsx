import Image from "next/image";
import Link from "next/link";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, ClientFigure, Crumbs, ServiceShell, SecHead } from "@/components/tjenester/service-parts";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { SERVICE_PAGES } from "@/components/tjenester/pages";
import { ProcessSteps } from "@/components/tjenester/process-steps";
import { DRAW, FAQS, GOOGLE, OFFER_PAGES } from "@/components/tjenester/nettside-content";

const SEEN = [
  ["Det kundene ser", "Forsiden, bildene og knappene, slik de ser ut på mobil og PC."],
  ["Det Google får", "Teksten, tittelen og beskrivelsen med en gang, uten å måtte kjøre kode først."],
  ["Koden vi skriver", "Hver side lages ferdig på serveren i Next.js, med kart til Google fra koden."],
] as const;

/**
 * «Skreddersydd nettside» in the calm system: the offer sheet is the hero picture, a row of clients scrolls sideways, the steps
 * hang from one drawn stroke. Chosen from three mockups; there is no «what is not included» section on the service pages.
 */
export function NettsidePage() {
  const meta = SERVICE_PAGES.nettside;
  return (
    <ServiceShell>
      <ServiceJsonLd name={meta.name} description={meta.description} slug="nettside" />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester" },
          { name: meta.name, href: "/tjenester/nettside" },
        ]}
      />
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap spn-hero">
          <div className="spn-hero-text">
            <Crumbs />
            <h1 id="sp-h1">
              Nettsider laget for <Marker>akkurat</Marker> dere.
            </h1>
            <p className="sp-lede">
              Vi lager moderne nettsider fra bunnen av, uten maler. Før vi starter, får dere et tilbud med hver side og en fast pris.
            </p>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="spn-field" aria-hidden="true">
            <div className="spn-paper">
              <div className="spn-paper-top">
                <b>Tilbud til Fjellbakst</b>
                <span className="sp-tag">Eksempel</span>
              </div>
              <ul>
                {OFFER_PAGES.map(([a, b]) => (
                  <li key={a}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
                    </svg>
                    <span>
                      <b>{a}</b>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="spn-paper-price">
                <span>Pris</span>
                <b>Fast, avtalt før vi starter</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-sec spn-row" aria-labelledby="sp-sider">
        <div className="wrap">
          <SecHead
            id="sp-sider"
            title={
              <>
                Fire bedrifter, fire helt <Marker>ulike</Marker> sider.
              </>
            }
            lede="Hver bedrift får egen skrift, egne farger og en oppbygging som passer det den selger."
          />
        </div>
        <div className="spn-track" tabIndex={0} role="group" aria-label="Fire kundesider, bla sideveis">
          <ClientFigure id="iqra" />
          <ClientFigure id="kong" />
          <ClientFigure id="mk" />
          <ClientFigure id="ringebu" />
        </div>
      </section>

      <ProcessSteps />

      <section className="sp-sec sp-line" aria-labelledby="sp-google">
        <div className="wrap">
          <SecHead
            id="sp-google"
            title={
              <>
                Bygd i Next.js, så Google får <Marker>hele</Marker> siden.
              </>
            }
            lede="Next.js alene får dere ikke øverst på Google. Det gir et godt utgangspunkt, og så handler resten om innholdet og omtalene dere har."
          />
          <div className="spn-three">
            {SEEN.map(([a, b], i) => (
              <div key={a} className={`spn-three-${i + 1}`}>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
          <ul className="sp-list spn-google">
            {GOOGLE.map(([a, b]) => (
              <li key={a}>
                <b>{a}</b>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Link className="wk-link" href="/tjenester/seo">
            Les om SEO og AI-synlighet
          </Link>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="sp-tegne">
        <div className="wrap">
          <div className="spn-draw">
            <div className="spn-draw-text">
              <SecHead
                id="sp-tegne"
                title={
                  <>
                    Vi kan også <Marker>tegne</Marker>.
                  </>
                }
                lede="Finnes det ikke et bilde som passer, tegner vi det selv, i koden, og får det til å bevege seg."
              />
              <ul className="sp-list">
                {DRAW.map(([a, b]) => (
                  <li key={a}>
                    <b>{a}</b>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="spn-draw-pic">
              <Image src="/images/arbeid/kongsvinger-festning.webp" alt="Kongsvinger festning og byen under, tegnet i koden for Kongsvinger Tannhelse" fill sizes="(max-width: 900px) 92vw, 46vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="sp-faq">
        <div className="wrap sp-split">
          <SecHead id="sp-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
