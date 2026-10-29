import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { SERVICE_PAGES } from "@/components/tjenester/pages";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { ChatWindow, GREET, ReviewCard, SiteStack } from "@/components/tjenester/chat-parts";
import { NightDemo } from "@/components/tjenester/night-demo";
import { CHECK, FAQS, PROMISES, QAS, TRAIN, TRUST } from "@/components/tjenester/chatbot-content";

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

/**
 * «AI-chatbot» in the calm system. The chat is the hero picture, then one evening in five moments (the customer's chat beside what
 * the business has), how it is trained, what we make sure of, and the quality check. No made-up business and no pictures; the old
 * «what it does not do» list is said the other way round, as what we make sure of.
 */
export function ChatbotPage() {
  const meta = SERVICE_PAGES["ai-chatbot"];
  return (
    <ServiceShell>
      <ServiceJsonLd name={meta.name} description={meta.description} slug="ai-chatbot" />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester" },
          { name: meta.name, href: "/tjenester/ai-chatbot" },
        ]}
      />
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap chp-hero">
          <div>
            <Crumbs current="AI-chatbot" />
            <h1 id="sp-h1">
              En AI-assistent som <Marker>kjenner</Marker> bedriften deres.
            </h1>
            <p className="sp-lede">Vi setter den på nettsiden deres. Den svarer kundene hele døgnet ut fra fakta om bedriften deres, og sender dere dem som vil bestille eller bli ringt opp.</p>
            <ul className="chp-promises">
              {PROMISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="chp-field">
            <span className="chp-clock">23.47</span>
            <ChatWindow messages={[GREET, { from: "me", text: QAS[1].q }, { from: "bot", text: QAS[1].a }]} />
          </div>
        </div>
      </section>

      <section className="chp-night" aria-labelledby="ch-natt">
        <div className="wrap">
          <SecHead id="ch-natt" title={<>Også når dere har <Marker>stengt</Marker>.</>} lede="Følg én kveld, steg for steg. Til venstre ser du hva kunden ser, til høyre hva bedriften har i samme øyeblikk." />
          <NightDemo />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="ch-lart">
        <div className="wrap">
          <SecHead id="ch-lart" title={<>Lært opp på <Marker>nettsiden</Marker> deres.</>} lede="Vi lager et utkast fra sidene dere allerede har, og leser gjennom alt før noe går ut. Den legges inn med én linje kode." />
          <ol className="chp-train">
            {TRAIN.map((s, i) => (
              <li key={s.t}>
                <div className="chp-train-pic">
                  {i === 0 && <SiteStack />}
                  {i === 1 && <ReviewCard />}
                  {i === 2 && <ChatWindow messages={[{ from: "me", text: QAS[2].q }, { from: "bot", text: QAS[2].a }]} input={false} className="ch-small" />}
                </div>
                <span className="chp-n">{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chp-soft" aria-labelledby="ch-passer">
        <div className="wrap">
          <SecHead id="ch-passer" title={<>Slik <Marker>passer</Marker> vi på.</>} lede="Dette setter vi opp, og sjekker, for at assistenten skal være til å stole på." />
          <ul className="chp-trust">
            {TRUST.map(([h, p]) => (
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

      <section className="tbp-fact" aria-label="Kontroll">
        <div className="wrap">
          <p>
            Vi sjekker samtalene <Marker>etterpå</Marker>.
          </p>
          <span>{CHECK}</span>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="ch-faq">
        <div className="wrap sp-split">
          <SecHead id="ch-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
