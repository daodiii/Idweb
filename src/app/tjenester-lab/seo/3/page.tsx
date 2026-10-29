import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { LayerTabs } from "@/components/tjenester-lab/layer-tabs";
import { ReviewSteps } from "@/components/tjenester-lab/review-steps";
import { FAQS, PROMISES, REVIEW_RULES } from "@/components/tjenester-lab/seo-content";

export const metadata: Metadata = { title: "SEO, mockup 3: Tre lag", robots: { index: false, follow: false } };

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

/** Mockup 3 «Tre lag»: the same business as the customer sees it, as Google gets it and as the code we write; reviews in four steps on a soft field. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap sbm3-hero">
          <div>
            <Crumbs current="SEO og AI-synlighet" />
            <h1 id="sp-h1">
              Bli <Marker>funnet</Marker> når kundene søker.
            </h1>
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
          <div className="sbm3-field">
            <LayerTabs />
          </div>
        </div>
      </section>

      <section className="sbm3-soft" aria-labelledby="sg-omtale">
        <div className="wrap">
          <SecHead id="sg-omtale" title={<>Flere omtaler fra <Marker>ekte</Marker> kunder.</>} lede="Med kundeportalen fra oss får kunden en e-post når jobben er merket ferdig, med en lenke rett til Googles side for å skrive en omtale. Trykk deg gjennom de fire stegene." />
          <ReviewSteps />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="sg-regler">
        <div className="wrap">
          <SecHead id="sg-regler" title={<>Slik <Marker>passer</Marker> vi på kundene deres.</>} lede="Dere velger hvor mange dager det går. Vi passer på resten." />
          <ul className="sbm3-rules">
            {REVIEW_RULES.map(([h, p]) => (
              <li key={h}>
                <Check />
                <span>
                  <b>{h}</b>
                  {p}
                </span>
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
