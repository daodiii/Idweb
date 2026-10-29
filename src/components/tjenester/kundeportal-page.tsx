import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { SERVICE_PAGES } from "@/components/tjenester/pages";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { ModuleChooser } from "@/components/tjenester/module-chooser";
import { EntryRow, PortalFrame } from "@/components/tjenester/portal-parts";
import { ENTRIES, FAQS, PROMISES, TRUST, WE_DO, YOU_DO } from "@/components/tjenester/kundeportal-content";

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

/**
 * «Kundeportal» in the calm system. The inbox is the hero picture; then tick the modules the business has and the portal's menu
 * follows, what we set up and what you do, and what we make sure of. No made-up business or people, and no invoice talk: the portal
 * is for getting and keeping customers.
 */
export function KundeportalPage() {
  const meta = SERVICE_PAGES.kundeportal;
  return (
    <ServiceShell>
      <ServiceJsonLd name={meta.name} description={meta.description} slug="kundeportal" />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester" },
          { name: meta.name, href: "/tjenester/kundeportal" },
        ]}
      />
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap kpp-hero">
          <div>
            <Crumbs current="Kundeportal" />
            <h1 id="sp-h1">
              <Marker>Alle</Marker> henvendelsene på ett sted.
            </h1>
            <p className="sp-lede">Kundeportalen er bygd av oss. Kunder som skriver i chatten eller bestiller time på nettsiden deres, havner i samme innboks. Der ringer dere tilbake og merker jobben som ferdig.</p>
            <ul className="kpp-promises">
              {PROMISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="kpp-field">
            <PortalFrame have={["chat", "booking", "omtaler"]} active="innboks">
              <div className="pt-inbox">
                <p className="pt-lede">Når noen tar kontakt, havner de her.</p>
                {ENTRIES.map((e) => (
                  <EntryRow key={e.id} e={e} />
                ))}
              </div>
            </PortalFrame>
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="kp-moduler">
        <div className="wrap">
          <SecHead id="kp-moduler" title={<>Bare <Marker>modulene</Marker> dere trenger.</>} lede="Hver modul har sin egen side med tallene som betyr noe. Velg hvilke dere har, og se hvordan menyen endrer seg." />
          <ModuleChooser />
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="kp-oppsett">
        <div className="wrap">
          <SecHead id="kp-oppsett" title={<>Vi setter det opp, dere <Marker>bruker</Marker> det.</>} lede="Dere får en portal som er klar til bruk, uten å måtte sette noe opp selv." />
          <div className="kpp-two">
            <div style={{ background: "#DFECE3" }}>
              <h3>Det vi gjør</h3>
              <ul>
                {WE_DO.map(([a, b]) => (
                  <li key={a}>
                    <Check />
                    <span>
                      <b>{a}</b>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#DCE9F1" }}>
              <h3>Det dere gjør</h3>
              <ul>
                {YOU_DO.map(([a, b]) => (
                  <li key={a}>
                    <Check />
                    <span>
                      <b>{a}</b>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="kp-trygt">
        <div className="wrap">
          <SecHead id="kp-trygt" title={<>Slik <Marker>passer</Marker> vi på kundene deres.</>} />
          <div className="kpp-trust">
            {TRUST.map(([h, p], i) => (
              <div key={h} style={{ background: ["#F4E1DF", "#DCECE9", "#E9ECF7"][i] }}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
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
