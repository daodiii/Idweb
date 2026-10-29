import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { ChatWindow, GREET, InboxCard, NotifyMail, ReviewCard, SiteStack } from "@/components/tjenester-lab/chat-parts";
import { CHECK, FAQS, PROMISES, QAS, TRAIN, TRUST } from "@/components/tjenester-lab/chatbot-content";

export const metadata: Metadata = { title: "AI-chatbot, mockup 1: Samtalen", robots: { index: false, follow: false } };

const TINTS = ["#DFECE3", "#DCE9F1", "#F4E1DF", "#DCECE9", "#E9ECF7"] as const;

/** Mockup 1 «Samtalen»: the chat is the hero picture, then how it is trained on the path, what we make sure of, and where the inquiries land. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap cbm1-hero">
          <div>
            <Crumbs current="AI-chatbot" />
            <h1 id="sp-h1">
              En AI-assistent som <Marker>kjenner</Marker> bedriften deres.
            </h1>
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
          <div className="cbm1-field">
            <ChatWindow messages={[GREET, { from: "me", text: QAS[0].q }, { from: "bot", text: QAS[0].a }]} />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="ch-lart">
        <div className="wrap">
          <SecHead id="ch-lart" title={<>Lært opp på <Marker>nettsiden</Marker> deres.</>} lede="Vi lager et utkast fra sidene dere allerede har: priser, åpningstider og tjenester. Den legges inn med én linje kode, også på sider vi ikke har laget." />
          <RevealOnView className="sps-track cbm1-path">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {TRAIN.map((s, i) => (
                <li key={s.t} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="cbm1-card sps-art" style={{ background: TINTS[i] }}>
                    {i === 0 && <SiteStack />}
                    {i === 1 && <ReviewCard />}
                    {i === 2 && <ChatWindow messages={[{ from: "me", text: QAS[1].q }, { from: "bot", text: QAS[1].a }]} input={false} className="ch-small" />}
                  </div>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="ch-passer">
        <div className="wrap">
          <SecHead id="ch-passer" title={<>Slik <Marker>passer</Marker> vi på.</>} lede="Dette setter vi opp, og sjekker, for at assistenten skal være til å stole på." />
          <div className="cbm1-trust">
            {TRUST.map(([h, p], i) => (
              <div key={h} style={{ background: TINTS[i] }}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="ch-henv">
        <div className="wrap sp-split">
          <SecHead id="ch-henv" title={<>Henvendelsene kommer til <Marker>dere</Marker>.</>} lede="Kunder som legger igjen nummer eller bestiller time, havner i innboksen deres, og dere får en e-post om hver av dem." />
          <div className="cbm1-pair">
            <InboxCard />
            <NotifyMail />
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
