import Image from "next/image";
import Link from "next/link";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, ClientFigure, Crumbs, LabPage, SecHead } from "@/components/tjenester-lab/lab-parts";
import { StepsA, StepsB, StepsC } from "@/components/tjenester-lab/steps-variants";
import { DRAW, FAQS, GOOGLE, OFFER_PAGES } from "@/components/tjenester-lab/nettside-content";

const SEEN = [
  ["Det kundene ser", "Forsiden, bildene og knappene, slik de ser ut på mobil og PC."],
  ["Det Google får", "Teksten, tittelen og beskrivelsen med en gang, uten å måtte kjøre kode først."],
  ["Koden vi skriver", "Hver side lages ferdig på serveren i Next.js, med kart til Google fra koden."],
] as const;

/** Mockup 2 «Tilbudet først», chosen: the offer sheet is the picture, a row of clients scrolls sideways. The steps come in three versions. */
export function Nettside2({ steps }: { steps: "a" | "b" | "c" }) {
  return (
    <LabPage variant="nl2">
      <section className="nl-hero" aria-labelledby="nl-h1">
        <div className="wrap nl2-hero">
          <div className="nl2-hero-text">
            <Crumbs />
            <h1 id="nl-h1">
              Nettsider laget for <Marker>akkurat</Marker> dere.
            </h1>
            <p className="nl-lede">
              Vi lager moderne nettsider fra bunnen av, uten maler. Før vi starter, får dere et tilbud med hver side og en fast pris.
            </p>
            <div className="nl-acts">
              <BookButton />
            </div>
          </div>
          <div className="nl2-field" aria-hidden="true">
            <div className="nl2-paper">
              <div className="nl2-paper-top">
                <b>Tilbud til Fjellbakst</b>
                <span className="nl-tag">Eksempel</span>
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
              <div className="nl2-paper-price">
                <span>Pris</span>
                <b>Fast, avtalt før vi starter</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nl-sec nl2-row" aria-labelledby="nl-sider">
        <div className="wrap">
          <SecHead
            id="nl-sider"
            title={
              <>
                Fire bedrifter, fire helt <Marker>ulike</Marker> sider.
              </>
            }
            lede="Hver bedrift får egen skrift, egne farger og en oppbygging som passer det den selger."
          />
        </div>
        <div className="nl2-track" tabIndex={0} role="group" aria-label="Fire kundesider, bla sideveis">
          <ClientFigure id="iqra" />
          <ClientFigure id="kong" />
          <ClientFigure id="mk" />
          <ClientFigure id="ringebu" />
        </div>
      </section>

      {steps === "b" ? <StepsB /> : steps === "c" ? <StepsC /> : <StepsA />}

      <section className="nl-sec nl-line" aria-labelledby="nl-google">
        <div className="wrap">
          <SecHead
            id="nl-google"
            title={
              <>
                Bygd i Next.js, så Google får <Marker>hele</Marker> siden.
              </>
            }
            lede="Next.js alene får dere ikke øverst på Google. Det gir et godt utgangspunkt, og så handler resten om innholdet og omtalene dere har."
          />
          <div className="nl2-three">
            {SEEN.map(([a, b], i) => (
              <div key={a} className={`nl2-three-${i + 1}`}>
                <h3>{a}</h3>
                <p>{b}</p>
              </div>
            ))}
          </div>
          <ul className="nl-list nl2-google">
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

      <section className="nl-sec nl-line" aria-labelledby="nl-tegne">
        <div className="wrap">
          <div className="nl2-draw">
            <div className="nl2-draw-text">
              <SecHead
                id="nl-tegne"
                title={
                  <>
                    Vi kan også <Marker>tegne</Marker>.
                  </>
                }
                lede="Finnes det ikke et bilde som passer, tegner vi det selv, i koden, og får det til å bevege seg."
              />
              <ul className="nl-list">
                {DRAW.map(([a, b]) => (
                  <li key={a}>
                    <b>{a}</b>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nl2-draw-pic">
              <Image src="/images/arbeid/kongsvinger-festning.webp" alt="Kongsvinger festning og byen under, tegnet i koden for Kongsvinger Tannhelse" fill sizes="(max-width: 900px) 92vw, 46vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="nl-sec nl-line" aria-labelledby="nl-faq">
        <div className="wrap nl-split">
          <SecHead id="nl-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </LabPage>
  );
}
