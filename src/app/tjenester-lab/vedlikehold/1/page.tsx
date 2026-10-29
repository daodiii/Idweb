import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { MonthGrid } from "@/components/tjenester-lab/month-grid";
import { MonthReport, NightLog, PriceCard, Thread } from "@/components/tjenester-lab/mnt-parts";
import { FAQS, HONEST, INCLUDED, PROMISES } from "@/components/tjenester-lab/vedlikehold-content";

export const metadata: Metadata = { title: "Drift, mockup 1: Måneden", robots: { index: false, follow: false } };

/** Mockup 1 «Måneden»: a night's log and the month report as the hero picture, then every night of a month you can open. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap vbm1-hero">
          <div>
            <Crumbs current="Drift og vedlikehold" />
            <h1 id="sp-h1">
              Vi <Marker>passer</Marker> på nettsiden etter lansering.
            </h1>
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
          <div className="vbm1-field">
            <NightLog kind="update" />
            <MonthReport />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="vh-maned">
        <div className="wrap">
          <SecHead id="vh-maned" title={<>En <Marker>måned</Marker> med drift.</>} lede="Hver natt tas en sikkerhetskopi, og noen netter skjer det mer. Trykk på en natt for å se loggen. Måneden er et eksempel." />
          <MonthGrid />
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="vh-pris">
        <div className="wrap sp-split">
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
          <PriceCard />
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="vh-melding">
        <div className="wrap sp-split">
          <SecHead id="vh-melding" title={<>Trenger dere en <Marker>endring</Marker>?</>} lede="Send en melding. Små endringer i tekst, bilder og åpningstider er med i prisen. Større ting, som en ny side eller en ny funksjon, får dere pris på før vi starter." />
          <div className="vbm1-thread">
            <Thread
              messages={[
                { from: "me", text: "Kan dere bytte åpningstidene fra mandag?" },
                { from: "bot", text: "Gjort. Åpningstidene er endret på siden." },
                { from: "me", text: "Vi vil også ha en ny side for tjenestene våre." },
                { from: "bot", text: "Det er større enn en liten endring. Dere får pris først, og vi starter ikke før dere har sagt ja." },
              ]}
            />
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
