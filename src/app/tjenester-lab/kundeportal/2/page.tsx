import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { FlowDemo } from "@/components/tjenester-lab/flow-demo";
import { ModuleScreen } from "@/components/tjenester-lab/portal-parts";
import { FAQS, MODULES, PROMISES, TRUST, WE_DO, YOU_DO } from "@/components/tjenester-lab/kundeportal-content";

export const metadata: Metadata = { title: "Kundeportal, mockup 2: Fra kontakt til ferdig", robots: { index: false, follow: false } };

const TINTS = ["#DFECE3", "#DCE9F1", "#F4E1DF"] as const;

/** Mockup 2 «Fra kontakt til ferdig»: a wide headline, then send a customer in, see it land in the inbox, and mark the job done. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <Crumbs current="Kundeportal" />
          <div className="kpm2-head">
            <h1 id="sp-h1">
              <Marker>Alle</Marker> henvendelsene på ett sted.
            </h1>
            <div>
              <p className="sp-lede">Kundeportalen er bygd av oss. Kunder som skriver i chatten eller bestiller time på nettsiden deres, havner i samme innboks. Der ringer dere tilbake og merker jobben som ferdig.</p>
              <ul className="kpm-promises">
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

      <section className="kpm2-try" aria-labelledby="kp-flyt">
        <div className="wrap">
          <SecHead id="kp-flyt" title={<>Fra første <Marker>kontakt</Marker> til ferdig jobb.</>} lede="Send en kunde inn, og se den lande i innboksen. Merk jobben som ferdig, og se hva som skjer med omtalen." />
          <FlowDemo />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="kp-moduler">
        <div className="wrap">
          <SecHead id="kp-moduler" title={<>Bare <Marker>modulene</Marker> dere trenger.</>} lede="Hver modul har sin egen side med tallene som betyr noe. Menyen viser bare det dere har valgt. Tallene er eksempler." />
          <div className="kpm2-mods">
            {MODULES.map((m, i) => (
              <div key={m.id} style={{ background: TINTS[i] }}>
                <ModuleScreen id={m.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="kp-oppsett">
        <div className="wrap sp-split">
          <SecHead id="kp-oppsett" title={<>Vi setter det opp, dere <Marker>bruker</Marker> det.</>} lede="Dere får en portal som er klar til bruk, uten å måtte sette noe opp selv." />
          <div className="kpm2-cols">
            <div>
              <h3>Det vi gjør</h3>
              <ul className="sp-list">
                {WE_DO.map(([a, b]) => (
                  <li key={a}>
                    <b>{a}</b>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Det dere gjør</h3>
              <ul className="sp-list">
                {YOU_DO.map(([a, b]) => (
                  <li key={a}>
                    <b>{a}</b>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="kpm2-trust" aria-labelledby="kp-trygt">
        <div className="wrap">
          <SecHead id="kp-trygt" title={<>Slik <Marker>passer</Marker> vi på kundene deres.</>} />
          <ul className="kpm2-trust-list">
            {TRUST.map(([h, p]) => (
              <li key={h}>
                <b>{h}</b>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="kp-faq">
        <div className="wrap sp-split">
          <SecHead id="kp-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
