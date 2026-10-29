"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChatWindow, GREET, Knowledge, type Msg } from "@/components/tjenester-lab/chat-parts";
import { QAS, UNKNOWN_ANSWER, type Fact } from "@/components/tjenester-lab/chatbot-content";

function route(text: string) {
  const t = text.toLowerCase();
  if (/åpen|åpne|stengt|når/.test(t)) return QAS[0];
  if (/koster|pris|kr\b/.test(t)) return QAS[1];
  if (/hvor|adresse|parker|finn/.test(t)) return QAS[2];
  return null;
}

/**
 * «Prøv den»: ask a question and see the answer, with the fact it came from lit in «Det assistenten vet». A question it has no
 * fact for gets the honest answer and offers to take a number. The answers are written in advance, as on the live page.
 */
export function ChatDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([GREET]);
  const [typing, setTyping] = useState(false);
  const [active, setActive] = useState<readonly Fact["id"][]>([]);
  const [unknown, setUnknown] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const [text, setText] = useState("");
  const timer = useRef<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  useEffect(() => { box.current?.querySelector(".ch-msgs")?.scrollTo({ top: 1e6, behavior: "smooth" }); }, [msgs, typing]);

  function ask(q: string, qa: (typeof QAS)[number] | null) {
    if (typing) return;
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setTyping(true);
    if (qa) setAsked((a) => (a.includes(qa.id) ? a : [...a, qa.id]));
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: qa ? qa.a : UNKNOWN_ANSWER }]);
      setTyping(false);
      setActive(qa ? qa.facts : []);
      setUnknown(!qa || qa.facts.length === 0);
    }, quick ? 0 : 900);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = text.trim();
    if (!q) return;
    setText("");
    ask(q, route(q));
  }

  function reset() {
    if (timer.current) window.clearTimeout(timer.current);
    setMsgs([GREET]);
    setTyping(false);
    setActive([]);
    setUnknown(false);
    setAsked([]);
  }

  const left = QAS.filter((x) => !asked.includes(x.id));
  return (
    <div className="cd">
      <div className="cd-chat" ref={box}>
        <ChatWindow
          messages={msgs}
          typing={typing}
          footer={
            <div className="cd-foot">
              {left.length > 0 && (
                <div className="cd-chips">
                  {left.map((x) => (
                    <button key={x.id} type="button" disabled={typing} onClick={() => ask(x.q, x)}>
                      {x.q}
                    </button>
                  ))}
                </div>
              )}
              <form onSubmit={submit} className="cd-form">
                <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Skriv et spørsmål" aria-label="Skriv et spørsmål til assistenten" maxLength={80} />
                <button type="submit" aria-label="Send" disabled={typing || !text.trim()} />
              </form>
            </div>
          }
        />
        {asked.length > 0 && (
          <button type="button" className="cd-reset" onClick={reset}>
            Start på nytt
          </button>
        )}
      </div>
      <div className="cd-side">
        <Knowledge active={active} unknown={unknown} />
        <p className="cd-note">Svarene her er skrevet på forhånd for å vise hvordan det fungerer. Den ekte assistenten svarer med AI, ut fra det vi har lagt inn om bedriften.</p>
      </div>
    </div>
  );
}
