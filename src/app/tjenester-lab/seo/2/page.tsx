import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { JobRow, ReviewMail, ReviewPage } from "@/components/tjenester-lab/seo-parts";
import { TypeBuilder } from "@/components/tjenester-lab/type-builder";
import { FAQS, PROMISES, REVIEW_RULES, REVIEW_STEPS } from "@/components/tjenester-lab/seo-content";

export const metadata: Metadata = { title: "SEO, mockup 2: Velg bransje", robots: { index: false, follow: false } };

/** Mockup 2 «Velg bransje»: a wide headline, then a builder where the kind of business and the opening hours change the code and the result together. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <Crumbs current="SEO og AI-synlighet" />
          <div className="sbm2-head">
            <h1 id="sp-h1">
              Bli <Marker>funnet</Marker> når kundene søker.
            </h1>
            <div>
              <p className="sp-lede">Vi skriver nettsiden slik at Google og AI-søk forstår hva dere gjør, hvor dere er og når dere har åpent. Og vi hjelper dere å få omtaler fra ekte kunder.</p>
              <ul className="sbm-promises">
                {PROMISES.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="sp-acts">
                <BookButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sbm2-build" aria-labelledby="sg-hva">
        <div className="wrap">
          <SecHead id="sg-hva" title={<>Google får vite hva slags <Marker>bedrift</Marker> dere er.</>} lede="Velg en bransje, og slå åpningstidene av og på. Se hva som skjer med koden vi skriver, og med treffet." />
          <TypeBuilder />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="sg-omtale">
        <div className="wrap">
          <SecHead id="sg-omtale" title={<>Flere omtaler fra <Marker>ekte</Marker> kunder.</>} lede="Med kundeportalen fra oss får kunden en e-post når jobben er merket ferdig, med en lenke rett til Googles side for å skrive en omtale." />
          <RevealOnView className="sps-track sbm2-path">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {REVIEW_STEPS.map((s, i) => (
                <li key={s.t} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="sbm2-card sps-art">
                    {i === 0 && <JobRow />}
                    {i === 1 && <ReviewMail />}
                    {i === 2 && <ReviewPage />}
                    {i === 3 && <ReviewPage filled />}
                  </div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="sg-regler">
        <div className="wrap sp-split">
          <SecHead id="sg-regler" title={<>Slik <Marker>passer</Marker> vi på kundene deres.</>} lede="Dere velger hvor mange dager det går. Vi passer på resten." />
          <ul className="sp-list">
            {REVIEW_RULES.map(([h, p]) => (
              <li key={h}>
                <b>{h}</b>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tbp-fact" aria-label="Ærlig om synlighet">
        <div className="wrap">
          <p>
            Ingen kan love plass <Marker>én</Marker> på Google.
          </p>
          <span>Vi gjør det lett for Google og AI-søk å forstå bedriften deres, og lett for fornøyde kunder å si det høyt. Google bruker tid på å lese en side og stole på den, så regn med uker, ikke dager.</span>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="sg-faq">
        <div className="wrap sp-split">
          <SecHead id="sg-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
