import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { AnnotatedHit } from "@/components/tjenester-lab/annotated-hit";
import { GoogleCard, ReviewMail, ReviewPage } from "@/components/tjenester-lab/seo-parts";
import { FAQS, PROMISES, REVIEW_RULES } from "@/components/tjenester-lab/seo-content";

export const metadata: Metadata = { title: "SEO, mockup 1: Treffet", robots: { index: false, follow: false } };

/** Mockup 1 «Treffet»: the search result is the hero picture; then the code and the result side by side, with one line lit at a time. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap sbm1-hero">
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
          <div className="sbm1-field">
            <GoogleCard />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="sg-hva">
        <div className="wrap">
          <SecHead id="sg-hva" title={<>Google får vite hva slags <Marker>bedrift</Marker> dere er.</>} lede="En tannlege, en rørlegger og et bakeri trenger ikke det samme. Sidene vi lager får strukturerte data som passer bedriften: type, adresse, åpningstider og mer." />
          <AnnotatedHit />
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="sg-omtale">
        <div className="wrap sp-split">
          <SecHead id="sg-omtale" title={<>Flere omtaler fra <Marker>ekte</Marker> kunder.</>} lede="Med kundeportalen fra oss får kunden en e-post når jobben er merket ferdig, med en lenke rett til Googles side for å skrive en omtale." />
          <div className="sbm1-pair">
            <ReviewMail />
            <ReviewPage />
          </div>
        </div>
      </section>

      <section className="sbm1-rules" aria-labelledby="sg-regler">
        <div className="wrap">
          <SecHead id="sg-regler" title={<>Slik <Marker>passer</Marker> vi på kundene deres.</>} lede="Dere velger hvor mange dager det går. Vi passer på resten." />
          <ul className="sbm1-list">
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
