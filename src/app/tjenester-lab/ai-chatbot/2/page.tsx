import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { ChatDemo } from "@/components/tjenester-lab/chat-demo";
import { ChatWindow, InboxCard, NotifyMail, ReviewCard, SiteStack } from "@/components/tjenester-lab/chat-parts";
import { CHECK, FAQS, PROMISES, QAS, TRAIN, TRUST } from "@/components/tjenester-lab/chatbot-content";

export const metadata: Metadata = { title: "AI-chatbot, mockup 2: Prøv den", robots: { index: false, follow: false } };

const TINTS = ["#DFECE3", "#DCE9F1", "#F4E1DF"] as const;

/** Mockup 2 «Prøv den»: a wide headline, then a chat you can ask, with the fact each answer came from lit beside it. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <Crumbs current="AI-chatbot" />
          <div className="cbm2-head">
            <h1 id="sp-h1">
              En AI-assistent som <Marker>kjenner</Marker> bedriften deres.
            </h1>
            <div>
              <p className="sp-lede">Vi setter den på nettsiden deres. Den svarer kundene hele døgnet ut fra fakta om bedriften deres, og sender dere dem som vil bestille eller bli ringt opp.</p>
              <ul className="cbm-promises">
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

      <section className="cbm2-try" aria-labelledby="ch-prov">
        <div className="wrap">
          <SecHead id="ch-prov" title={<>Still den et <Marker>spørsmål</Marker>.</>} lede="Trykk på et spørsmål, eller skriv ditt eget. Til høyre ser du hva assistenten har å svare ut fra, og hva som skjer når den ikke vet." />
          <ChatDemo />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="ch-lart">
        <div className="wrap">
          <SecHead id="ch-lart" title={<>Lært opp på <Marker>nettsiden</Marker> deres.</>} lede="Vi lager et utkast fra sidene dere allerede har, og leser gjennom alt før noe går ut." />
          <ol className="cbm2-stack">
            {TRAIN.map((s, i) => (
              <li key={s.t} className="cbm2-card" style={{ "--i": i, background: TINTS[i] } as CSSProperties}>
                <div className="cbm2-card-text">
                  <span className="cbm2-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </div>
                <div className="cbm2-card-pic">
                  {i === 0 && <SiteStack />}
                  {i === 1 && <ReviewCard />}
                  {i === 2 && <ChatWindow messages={[{ from: "me", text: QAS[2].q }, { from: "bot", text: QAS[2].a }]} input={false} className="ch-small" />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="ch-passer">
        <div className="wrap sp-split">
          <SecHead id="ch-passer" title={<>Slik <Marker>passer</Marker> vi på.</>} lede="Dette setter vi opp, og sjekker, for at assistenten skal være til å stole på." />
          <ul className="sp-list">
            {TRUST.map(([h, p]) => (
              <li key={h}>
                <b>{h}</b>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="ch-henv">
        <div className="wrap">
          <div className="tbp-band cbm2-band">
            <SecHead id="ch-henv" title={<>Henvendelsene kommer til <Marker>dere</Marker>.</>} lede="Kunder som legger igjen nummer eller bestiller time, havner i innboksen deres, og dere får en e-post om hver av dem." />
            <div className="tbp-band-pic">
              <InboxCard />
              <NotifyMail />
            </div>
          </div>
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
