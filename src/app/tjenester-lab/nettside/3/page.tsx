import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, ClientFigure, Crumbs, LabPage, SecHead } from "@/components/tjenester-lab/lab-parts";
import { DRAW, FAQS, GOOGLE, LEFT_OUT, OFFER_LEFT_OUT, OFFER_PAGES, STEPS } from "@/components/tjenester-lab/nettside-content";

export const metadata: Metadata = { title: "Mockup 3: Rad for rad", robots: { index: false, follow: false } };

/** Mockup 3 «Rad for rad»: the headline across the top, three client pages under it, then the work section's pattern
 *  (a stack of cards beside sticky text) for the steps and the offer, a soft field for Google, and plain rows. */
export default function Page() {
  return (
    <LabPage variant="nl3">
      <section className="nl-hero" aria-labelledby="nl-h1">
        <div className="wrap">
          <Crumbs />
          <div className="nl3-head">
            <h1 id="nl-h1">
              Nettsider laget for <Marker>akkurat</Marker> dere.
            </h1>
            <div className="nl3-head-side">
              <p className="nl-lede">
                Vi lager moderne nettsider fra bunnen av, uten maler. Hver side bygges i Next.js, så Google får med seg alt som står der.
              </p>
              <div className="nl-acts">
                <BookButton />
              </div>
            </div>
          </div>
          <div className="nl3-trio">
            <ClientFigure id="kong" />
            <ClientFigure id="mk" />
            <ClientFigure id="ringebu" />
          </div>
        </div>
      </section>

      <section className="nl-sec" aria-labelledby="nl-prosess">
        <div className="wrap nl3-stackgrid">
          <div className="nl3-sticky">
            <SecHead
              id="nl-prosess"
              title={
                <>
                  Dere vet hele tiden hva som <Marker>skjer</Marker>.
                </>
              }
              lede="Fra første samtale til lansert side, i fire steg. Vi starter ikke før dere har sagt ja."
            />
          </div>
          <ol className="nl3-stack">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`nl3-card nl3-c${i + 1}`}>
                <span className="nl3-big">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="nl-sec" aria-labelledby="nl-tilbud">
        <div className="wrap nl3-stackgrid nl3-flip">
          <div className="nl3-sticky">
            <SecHead
              id="nl-tilbud"
              title={
                <>
                  Sidene og <Marker>prisen</Marker> står i tilbudet.
                </>
              }
              lede="Dere får et tilbud med hver side, hva som skal stå på den, og en fast pris."
            />
          </div>
          <div className="nl3-offer">
            <div className="nl3-offer-top">
              <b>Tilbud til Fjellbakst</b>
              <span className="nl-tag">Eksempel</span>
            </div>
            <ul>
              {OFFER_PAGES.map(([a, b]) => (
                <li key={a}>
                  <b>{a}</b>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <ul className="nl3-offer-out">
              {OFFER_LEFT_OUT.map(([a, b]) => (
                <li key={a}>
                  <b>Ikke med: {a}</b>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="nl3-offer-price">
              <span>Pris</span>
              <b>Fast, for sidene over</b>
            </div>
          </div>
        </div>
      </section>

      <section className="nl3-field" aria-labelledby="nl-google">
        <div className="wrap nl-split">
          <SecHead
            id="nl-google"
            title={
              <>
                Bygd i Next.js, så Google får <Marker>hele</Marker> siden.
              </>
            }
            lede="Next.js lager hver side ferdig på serveren. Google får teksten, tittelen og beskrivelsen med en gang, uten å måtte kjøre kode først."
          />
          <div>
            <ul className="nl-list">
              {GOOGLE.map(([a, b]) => (
                <li key={a}>
                  <b>{a}</b>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="nl-note">Next.js alene får dere ikke øverst på Google. Det gir et godt utgangspunkt, og så handler resten om innholdet og omtalene dere har.</p>
            <Link className="wk-link" href="/tjenester/seo">
              Les om SEO og AI-synlighet
            </Link>
          </div>
        </div>
      </section>

      <section className="nl-sec" aria-labelledby="nl-tegne">
        <div className="wrap nl-split nl-split-flip">
          <figure className="nl-fig">
            <div className="nl3-draw-pic">
              <Image src="/images/arbeid/kongsvinger-festning.webp" alt="Kongsvinger festning og byen under, tegnet i koden for Kongsvinger Tannhelse" fill sizes="(max-width: 900px) 92vw, 50vw" />
            </div>
          </figure>
          <div>
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
        </div>
      </section>

      <section className="nl-sec nl-line" aria-labelledby="nl-ikke">
        <div className="wrap">
          <SecHead id="nl-ikke" title={<>Det som ikke er <Marker>med</Marker>.</>} lede="Dette står også i tilbudet, så ingen blir overrasket etterpå." />
          <ul className="nl3-rows">
            {LEFT_OUT.map(([a, b]) => (
              <li key={a}>
                <b>{a}</b>
                <span>{b}</span>
              </li>
            ))}
          </ul>
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
