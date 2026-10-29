import "@/styles/tjenester-lab.css";
import type { ReactNode } from "react";
import { FACTS, GREETING, INBOX, type Fact } from "@/components/tjenester-lab/chatbot-content";

export type Msg = { from: "bot" | "me"; text: string };

/** The chat window, drawn. Messages come in as data; the demos below feed it. */
export function ChatWindow({ messages, typing = false, input = true, footer, className = "" }: { messages: readonly Msg[]; typing?: boolean; input?: boolean; footer?: ReactNode; className?: string }) {
  return (
    <div className={`ch-win ${className}`} role="log" aria-label="Samtale med assistenten">
      <div className="ch-head">
        <span className="ch-ava" aria-hidden="true">AI</span>
        <span>
          <b>Bedriften deres</b>
          <small>AI-assistent</small>
        </span>
      </div>
      <div className="ch-msgs">
        {messages.map((m, i) => (
          <p key={i} className={`ch-msg ${m.from}`}>
            {m.text}
          </p>
        ))}
        {typing && (
          <p className="ch-msg bot ch-typing" aria-label="Assistenten skriver">
            <i />
            <i />
            <i />
          </p>
        )}
      </div>
      {footer ?? (input && (
        <div className="ch-input" aria-hidden="true">
          <span>Skriv et spørsmål</span>
          <i />
        </div>
      ))}
    </div>
  );
}

/** «Det assistenten vet»: the facts, with the ones the last answer used lit. `unknown` lights the «not in what it knows» row. */
export function Knowledge({ active = [], unknown = false, draft = false }: { active?: readonly Fact["id"][]; unknown?: boolean; draft?: boolean }) {
  return (
    <div className="ch-know" aria-label="Det assistenten vet">
      <div className="ch-know-top">
        <b>Det assistenten vet</b>
        <span className={draft ? "ch-pill warn" : "ch-pill"}>{draft ? "Utkast" : "Godkjent"}</span>
      </div>
      {FACTS.map((f) => (
        <div key={f.id} className={`ch-fact${active.includes(f.id) ? " on" : ""}`}>
          <span>{f.k}</span>
          <b>{f.v}</b>
        </div>
      ))}
      <div className={`ch-fact ch-fact-miss${unknown ? " on" : ""}`}>
        <span>Ikke lagt inn</span>
        <b>Da sier den fra</b>
      </div>
    </div>
  );
}

/** Three little pages, standing for the website the assistant is trained on. */
export function SiteStack() {
  return (
    <div className="ch-site" aria-hidden="true">
      {["Forside", "Priser", "Kontakt"].map((p, i) => (
        <div key={p} className="ch-sitepage" style={{ ["--i" as string]: i }}>
          <b>{p}</b>
          <i style={{ width: `${70 - i * 12}%` }} />
          <i style={{ width: `${48 + i * 10}%` }} />
          <i style={{ width: "34%" }} />
        </div>
      ))}
    </div>
  );
}

/** The reviewed draft: what we read through and approve before it goes live. */
export function ReviewCard() {
  return (
    <div className="ch-review" aria-hidden="true">
      <div className="ch-know-top">
        <b>Gjennomlesing</b>
        <span className="ch-pill">Godkjent</span>
      </div>
      {FACTS.map((f) => (
        <div key={f.id} className="ch-fact ch-ok">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
          <span>{f.k}</span>
          <b>{f.v}</b>
        </div>
      ))}
    </div>
  );
}

/** The owner's inbox. */
export function InboxCard({ rows = 2 }: { rows?: 0 | 1 | 2 }) {
  return (
    <div className="ch-inbox" aria-hidden="true">
      <div className="ch-know-top">
        <b>Innboks</b>
        <span className="ch-pill">{rows ? `${rows} ${rows === 1 ? "ny" : "nye"}` : "Ingen nye"}</span>
      </div>
      {rows ? (
        INBOX.slice(0, rows).map(([t, p, w]) => (
          <div key={t} className="ch-row">
            <span>
              <b>{t}</b>
              {p}
            </span>
            <small>{w}</small>
          </div>
        ))
      ) : (
        <div className="ch-row ch-empty">
          <span>Venter på kunder</span>
        </div>
      )}
    </div>
  );
}

/** The e-mail the owner gets about each new inquiry. */
export function NotifyMail() {
  return (
    <div className="tb-mail ch-mail" aria-hidden="true">
      <div className="tb-mail-top">
        <span>Til dere</span>
        <span className="tb-when">Innen fem minutter</span>
      </div>
      <b className="tb-subject">Ny henvendelse fra assistenten</b>
      <p>Navn, nummer og en lenke til portalen.</p>
    </div>
  );
}

export const GREET: Msg = { from: "bot", text: GREETING };
