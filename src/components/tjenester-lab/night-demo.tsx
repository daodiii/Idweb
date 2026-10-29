"use client";

import { useState } from "react";
import { ChatWindow, GREET, InboxCard, NotifyMail, type Msg } from "@/components/tjenester-lab/chat-parts";

const ASK: Msg = { from: "me", text: "Tar dere imot akutte timer i morgen tidlig?" };
const NOT_SURE: Msg = { from: "bot", text: "Det kan jeg ikke svare sikkert på. Vil du legge igjen nummeret, så ringer vi deg i morgen?" };
const NUMBER: Msg = { from: "me", text: "Ja, 900 00 000" };
const THANKS: Msg = { from: "bot", text: "Takk! Jeg har sendt det videre. Du blir ringt opp." };

const MOMENTS = [
  { t: "Kunden spør", time: "23.47", note: "Bedriften er stengt, men assistenten svarer.", msgs: [GREET, ASK], owner: 0 },
  { t: "Assistenten svarer", time: "23.47", note: "Den vet ikke svaret sikkert, så den sier det i stedet for å gjette.", msgs: [GREET, ASK, NOT_SURE], owner: 0 },
  { t: "Kunden legger igjen nummer", time: "23.49", note: "Nummeret havner i innboksen deres.", msgs: [GREET, ASK, NOT_SURE, NUMBER, THANKS], owner: 1 },
  { t: "Dere får e-post", time: "23.54", note: "Innen fem minutter, med navn, nummer og en lenke til portalen.", msgs: [GREET, ASK, NOT_SURE, NUMBER, THANKS], owner: 2 },
  { t: "Om morgenen", time: "08.00", note: "Dere åpner innboksen og kan ringe kunden tilbake.", msgs: [GREET, ASK, NOT_SURE, NUMBER, THANKS], owner: 3 },
] as const;

/**
 * «Natten»: one evening in five moments. Choose a moment and the chat shows what the customer sees, while the panel on the right
 * shows what the business has at the same time. Starts on the first, so it reads without a click.
 */
export function NightDemo() {
  const [cur, setCur] = useState(0);
  const m = MOMENTS[cur];
  return (
    <div className="nd">
      <div className="nd-steps" role="group" aria-label="Velg et øyeblikk">
        {MOMENTS.map((x, i) => (
          <button key={x.t} type="button" aria-pressed={i === cur} className={i === cur ? "on" : i < cur ? "past" : undefined} onClick={() => setCur(i)}>
            <small>{x.time}</small>
            <b>{x.t}</b>
          </button>
        ))}
      </div>
      <p className="nd-note" aria-live="polite">
        <b>{m.time}.</b> {m.note}
      </p>
      <div className="nd-body">
        <div className="nd-col">
          <small className="nd-label">Kunden på nettsiden</small>
          <ChatWindow messages={m.msgs} input={false} className="nd-chat" />
        </div>
        <div className="nd-col">
          <small className="nd-label">Hos dere</small>
          <div className="nd-owner" key={cur}>
            {m.owner === 2 && <NotifyMail />}
            <InboxCard rows={m.owner === 0 ? 0 : m.owner === 3 ? 2 : 1} />
          </div>
        </div>
      </div>
    </div>
  );
}
