import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { ChangeDemo } from "@/components/tjenester-lab/change-demo";
import { MonthReport, NightLog, PriceCard } from "@/components/tjenester-lab/mnt-parts";
import { FAQS, HONEST, INCLUDED, PROMISES } from "@/components/tjenester-lab/vedlikehold-content";

export const metadata: Metadata = { title: "Drift, mockup 2: Meldingen", robots: { index: false, follow: false } };

/** Mockup 2 «Meldingen»: a wide headline, then a message you choose and what we answer and the site shows; the nights in three cards. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <Crumbs current="Drift og vedlikehold" />
          <div className="vbm2-head">
            <h1 id="sp-h1">
              Vi <Marker>passer</Marker> på nettsiden etter lansering.
            </h1>
            <div>
              <p className="sp-lede">Sikkerhetskopier, oppdateringer og sjekker går av seg selv hver natt. Trenger dere en endring, sender dere bare en melding.</p>
              <ul className="vbm-promises">
                {PROMISES.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="vbm-price">
                <b>Fra 790 kr i måneden</b> eks. mva · ingen bindingstid
              </p>
              <div className="sp-acts">
                <BookButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vbm2-try" aria-labelledby="vh-melding">
        <div className="wrap">
          <SecHead id="vh-melding" title={<>Trenger dere en <Marker>endring</Marker>?</>} lede="Velg en melding og se hva vi svarer, og hva siden viser. Små endringer i tekst, bilder og åpningstider er med i prisen. Større ting får dere pris på først." />
          <ChangeDemo />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="vh-natt">
        <div className="wrap">
          <SecHead id="vh-natt" title={<>Resten går av seg selv, <Marker>hver</Marker> natt.</>} lede="En vanlig natt er bare sikkerhetskopien. Av og til skjer det mer, og alt står i loggen og i månedsrapporten. Eksemplene er fra en tenkt måned." />
          <div className="vbm2-three">
            <figure>
              <NightLog kind="backup" title="En vanlig natt" />
              <figcaption>Sikkerhetskopi, hver natt</figcaption>
            </figure>
            <figure>
              <NightLog kind="update" title="En oppdatering" />
              <figcaption>Testet først, så ute</figcaption>
            </figure>
            <figure>
              <MonthReport />
              <figcaption>Rapport ved månedsslutt</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="vh-pris">
        <div className="wrap">
          <div className="tbp-band vbm2-band">
            <div>
              <SecHead id="vh-pris" title={<>Dette er med for <Marker>790</Marker> kr i måneden.</>} lede="790 kr er prisen for en vanlig bedriftsside, eks. mva. Har siden nettbutikk, timebestilling eller kundeportal, er det mer å passe på. Da får dere en fast månedspris før dere bestemmer dere." />
              <ul className="sp-list">
                {INCLUDED.map(([h, p]) => (
                  <li key={h}>
                    <b>{h}</b>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tbp-band-pic">
              <PriceCard />
            </div>
          </div>
        </div>
      </section>

      <section className="tbp-fact" aria-label="Ærlig om feil">
        <div className="wrap">
          <p>
            Ingen kan love at en side aldri får <Marker>feil</Marker>.
          </p>
          <span>{HONEST}</span>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="vh-faq">
        <div className="wrap sp-split">
          <SecHead id="vh-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
