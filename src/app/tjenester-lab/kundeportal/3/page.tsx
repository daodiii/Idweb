import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { EntryRow, ModuleScreen, PortalFrame } from "@/components/tjenester-lab/portal-parts";
import { ENTRIES, FAQS, MODULES, PROMISES, WE_DO, YOU_DO } from "@/components/tjenester-lab/kundeportal-content";

export const metadata: Metadata = { title: "Kundeportal, mockup 3: Veien gjennom portalen", robots: { index: false, follow: false } };

const STEPS = [
  ["Kunden tar kontakt", "Skriver i chatten eller bestiller time på nettsiden deres."],
  ["Henvendelsen havner i innboksen", "Navn, status, hva saken gjelder, og nummer og e-post."],
  ["Dere ringer eller skriver tilbake", "Nummer og e-post kan trykkes rett fra innboksen."],
  ["Jobben merkes som ferdig", "Trykket feil? «Angre ferdig» setter den tilbake."],
] as const;

const TINTS = ["#F4E1DF", "#DFECE3", "#DCE9F1", "#DCECE9"] as const;

/** Mockup 3 «Veien gjennom portalen»: the portal as the hero picture, one customer's path along the orange stroke, the modules as cards. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap kpm3-hero">
          <div>
            <Crumbs current="Kundeportal" />
            <h1 id="sp-h1">
              <Marker>Alle</Marker> henvendelsene på ett sted.
            </h1>
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
          <div className="kpm3-field">
            <PortalFrame have={["chat", "booking", "omtaler"]} active="chat">
              <ModuleScreen id="chat" />
            </PortalFrame>
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="kp-vei">
        <div className="wrap">
          <SecHead id="kp-vei" title={<>Fra første <Marker>kontakt</Marker> til ferdig jobb.</>} lede="Slik går én kunde gjennom portalen, i fire steg." />
          <RevealOnView className="sps-track kpm3-path">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {STEPS.map(([h, p], i) => (
                <li key={h} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="kpm3-card sps-art" style={{ background: TINTS[i] }}>
                    {i === 0 && <EntryRow e={{ ...ENTRIES[1], status: "CHAT" }} />}
                    {i === 1 && <EntryRow e={ENTRIES[0]} isNew />}
                    {i === 2 && <EntryRow e={ENTRIES[1]} />}
                    {i === 3 && <EntryRow e={ENTRIES[0]} done />}
                  </div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="kpm3-soft" aria-labelledby="kp-moduler">
        <div className="wrap">
          <SecHead id="kp-moduler" title={<>Bare <Marker>modulene</Marker> dere trenger.</>} lede="Hver modul har sin egen side med tallene som betyr noe. Menyen viser bare det dere har valgt. Tallene er eksempler." />
          <div className="kpm3-mods">
            {MODULES.map((m, i) => (
              <div key={m.id} style={{ background: TINTS[i + 1] }}>
                <ModuleScreen id={m.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="kp-oppsett">
        <div className="wrap">
          <SecHead id="kp-oppsett" title={<>Vi setter det opp, dere <Marker>bruker</Marker> det.</>} lede="Dere får en portal som er klar til bruk, uten å måtte sette noe opp selv." />
          <div className="kpm3-two">
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

      <section className="tbp-fact" aria-label="Trygt">
        <div className="wrap">
          <p>
            Hver bedrift ser bare sine <Marker>egne</Marker> kunder.
          </p>
          <span>Det sjekkes i databasen, ikke bare i skjermbildet. Kunden bestemmer over e-posten om omtaler, og boksen er ikke krysset av på forhånd. Portalen er laget for å få og beholde kunder; betaling holder vi utenfor.</span>
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
