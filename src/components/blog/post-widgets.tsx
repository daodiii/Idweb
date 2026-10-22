"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BlogChecklist, BlogCode, BlogTab, BlogWidget } from "@/types";
import { RichText } from "./rich-text";

/** True once the element has scrolled into view; used to start bar animations. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setSeen(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CodeBlock({ caption, code }: BlogCode) {
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied("ok");
    } catch {
      setCopied("fail");
    }
    setTimeout(() => setCopied("idle"), 1800);
  }
  return (
    <div className="bx-code">
      <div className="bx-code-bar">
        <span>{caption}</span>
        <button type="button" onClick={copy}>
          {copied === "ok" ? "Kopiert" : copied === "fail" ? "Marker og kopier selv" : "Kopier"}
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Tabs({ tabs }: { tabs: BlogTab[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div className="bx-fig bx-tabs">
      <div className="bx-tablist" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-p${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              const next = (active + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
              setActive(next);
              document.getElementById(`${id}-t${next}`)?.focus();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.label} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={active !== i} className="bx-panel">
          {tab.body.map((block, j) =>
            block.type === "p" ? (
              <p key={j}>
                <RichText text={block.text} />
              </p>
            ) : block.type === "list" ? (
              <ul key={j}>
                {block.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <CodeBlock key={j} caption={block.caption} code={block.code} />
            ),
          )}
        </div>
      ))}
    </div>
  );
}

export function Checklist({ title, items }: BlogChecklist) {
  const [done, setDone] = useState<boolean[]>(() => items.map(() => false));
  const count = done.filter(Boolean).length;
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <div className="bx-fig bx-check">
      <div className="bx-ring-row">
        <svg viewBox="0 0 64 64" className="bx-ring" aria-hidden="true">
          <circle className="bx-ring-bg" cx="32" cy="32" r={R} />
          <circle
            className="bx-ring-fg"
            cx="32"
            cy="32"
            r={R}
            style={{ strokeDasharray: C, strokeDashoffset: C * (1 - count / items.length) }}
          />
          <text x="32" y="38" textAnchor="middle">
            {count}/{items.length}
          </text>
        </svg>
        <div>
          <b>{title}</b>
          <span aria-live="polite">{count === items.length ? "Alt på plass." : `${count} av ${items.length} er på plass`}</span>
        </div>
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={item}>
            <label>
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
              />
              <span>
                <RichText text={item} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SizeBars() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const rows = [
    { name: "JPEG", w: 100, label: "400 kB" },
    { name: "WebP", w: 70, label: "~280 kB" },
    { name: "AVIF", w: 50, label: "~200 kB" },
  ];
  return (
    <div className={`bx-fig${seen ? " is-in" : ""}`} ref={ref}>
      <h3>Filstørrelse for samme foto</h3>
      <p className="bx-sub">Eksempel med et foto som er 400 kB som JPEG. Tallene er typiske midtverdier, ikke garantier.</p>
      <div className="bx-bars" role="img" aria-label="Søylediagram: JPEG 400 kilobyte, WebP omtrent 280, AVIF omtrent 200">
        {rows.map((row, i) => (
          <div className="bx-bar-row" key={row.name}>
            <span>{row.name}</span>
            <div className="bx-track">
              <div className={`bx-fill bx-fill-${i}`} style={{ ["--w" as string]: `${row.w}%` }} />
            </div>
            <span className="bx-val">{row.label}</span>
          </div>
        ))}
      </div>
      <p className="bx-note">
        Google måler 25 til 34 prosent mindre for WebP mot JPEG. Uavhengige sammenligninger oppgir ofte 40 til 60 prosent for AVIF, og forskjellen er størst på detaljrike bilder. Resultatet varierer fra bilde til bilde.
      </p>
    </div>
  );
}

const PHP_ROWS = [
  { v: "8.2", rel: "2022-12-08", act: "2024-12-31", sec: "2026-12-31", end: "des. 2026" },
  { v: "8.3", rel: "2023-11-23", act: "2025-12-31", sec: "2027-12-31", end: "des. 2027" },
  { v: "8.4", rel: "2024-11-21", act: "2026-12-31", sec: "2028-12-31", end: "des. 2028" },
  { v: "8.5", rel: "2025-11-20", act: "2027-12-31", sec: "2029-12-31", end: "des. 2029" },
];
const AXIS_FROM = Date.UTC(2022, 0, 1);
const AXIS_SPAN = Date.UTC(2030, 0, 1) - AXIS_FROM;
const pct = (iso: string) => Math.max(0, Math.min(100, ((Date.parse(iso) - AXIS_FROM) / AXIS_SPAN) * 100));

function PhpVersions() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setNow(Date.now()), 0);
    return () => clearTimeout(t);
  }, []);
  const nowPct = now === null ? null : Math.max(0, Math.min(100, ((now - AXIS_FROM) / AXIS_SPAN) * 100));
  return (
    <div className={`bx-fig${seen ? " is-in" : ""}`} ref={ref}>
      <h3>Hvor står versjonen din?</h3>
      <p className="bx-sub">Blå er full støtte, oransje er bare sikkerhetsrettinger. Den mørke streken er i dag.</p>
      <div className="bx-vers">
        {PHP_ROWS.map((row) => {
          const rel = pct(row.rel);
          const a = pct(row.act) - rel;
          const s = pct(row.sec) - rel;
          const over = now !== null && now > Date.parse(row.sec);
          const text = over ? "Utgått" : `Sikkerhet til ${row.end}`;
          return (
            <div className="bx-ver" key={row.v}>
              <div>
                <b>PHP {row.v}</b>
                <small>{text}</small>
              </div>
              <div className="bx-rail" role="img" aria-label={`PHP ${row.v}: ${text}`}>
                <div className="bx-sec" style={{ marginLeft: `${rel}%`, ["--s" as string]: `${s}%` }} />
                <div className="bx-act" style={{ marginLeft: `${rel}%`, ["--a" as string]: `${a}%` }} />
                {nowPct !== null && <i className="bx-now" style={{ left: `${nowPct}%` }} />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="bx-axis">
        <span />
        <div>
          {["2022", "2024", "2026", "2028", "2030"].map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
      </div>
      <p className="bx-note">
        Datoer fra <a href="https://www.php.net/supported-versions.php" rel="noopener">php.net/supported-versions</a>. PHP 8.1 og eldre er allerede utenfor støtte.
      </p>
    </div>
  );
}

const QUIZ = [
  {
    q: "Hvem oppdaterer innholdet?",
    a: [
      { t: "Jeg selv, ofte, uten å kunne kode", v: "w" },
      { t: "Sjelden. Jeg ber heller noen gjøre det", v: "c" },
    ],
  },
  {
    q: "Trenger siden egen logikk, som kundeinnlogging eller booking?",
    a: [
      { t: "Ja", v: "c" },
      { t: "Nei, bare sider, tekst og kanskje et kontaktskjema", v: "w" },
    ],
  },
  {
    q: "Hvor viktig er et design som er helt ditt?",
    a: [
      { t: "Veldig. Folk skal kjenne igjen oss", v: "c" },
      { t: "Et rent, ferdig utseende holder", v: "w" },
    ],
  },
  {
    q: "Har du en WordPress-side som fungerer greit i dag?",
    a: [
      { t: "Ja", v: "w" },
      { t: "Nei, eller den er treg og vanskelig å vedlikeholde", v: "c" },
    ],
  },
];

const VERDICTS = {
  w: {
    title: "WordPress (på en oppdatert PHP) passer deg",
    text: "Du redigerer selv og trenger ikke noe spesielt. Hold PHP, kjerne og plugins oppdatert, hold plugin-listen kort, og bruk et lett tema.",
  },
  c: {
    title: "Skreddersydd lønner seg for deg",
    text: "Egen logikk, eget uttrykk eller en side som er blitt tung å drifte peker mot en bygget løsning. Du får mer kontroll og færre deler å holde oppdatert.",
  },
  m: {
    title: "Det kan gå begge veier",
    text: "Svarene dine peker i hver sin retning. Ta en prat, så ser vi på hva som faktisk gir mest verdi for pengene.",
  },
};

function PhpQuiz() {
  const [answers, setAnswers] = useState<(string | null)[]>(() => QUIZ.map(() => null));
  const done = answers.every(Boolean);
  const custom = answers.filter((a) => a === "c").length;
  const verdict = done ? VERDICTS[custom >= 3 ? "c" : custom <= 1 ? "w" : "m"] : null;
  const name = useId();
  return (
    <div className="bx-fig bx-quiz">
      {QUIZ.map((item, qi) => (
        <fieldset key={item.q}>
          <legend>
            {qi + 1}. {item.q}
          </legend>
          {item.a.map((opt) => (
            <label key={opt.t}>
              <input
                type="radio"
                name={`${name}-${qi}`}
                checked={answers[qi] === opt.v}
                onChange={() => setAnswers((cur) => cur.map((x, i) => (i === qi ? opt.v : x)))}
              />
              <span>{opt.t}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <div className="bx-verdict" aria-live="polite" key={verdict?.title ?? "none"}>
        <h4>{verdict ? verdict.title : "Svar på spørsmålene"}</h4>
        <p>{verdict ? verdict.text : "Anbefalingen dukker opp her når du har svart på alle fire."}</p>
      </div>
    </div>
  );
}

const ANSWER_FIRST = [
  {
    label: "Slik mange skriver",
    text: "Velkommen til Nordkvartalet Tannklinikk! Vi brenner for friske smil og tilbyr et bredt spekter av tjenester for hele familien i en trygg og hyggelig atmosfære.",
    answer: "Klinikken tilbyr ulike tannhelsetjenester.",
  },
  {
    label: "Svar først",
    text: "Nordkvartalet Tannklinikk i Oslo tar imot voksne og barn. En vanlig kontroll tar omtrent 30 minutter. Vi har åpent mandag til fredag klokken 8 til 16, og du kan bestille time på nett.",
    answer:
      "Nordkvartalet Tannklinikk i Oslo har åpent mandag til fredag 8 til 16, tar imot voksne og barn, og en vanlig kontroll tar omtrent 30 minutter. Time kan bestilles på nett.",
  },
];

function AnswerFirst() {
  const [v, setV] = useState(0);
  const [typed, setTyped] = useState(ANSWER_FIRST[0].answer);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);
  function pick(i: number) {
    if (timer.current) clearInterval(timer.current);
    setV(i);
    const full = ANSWER_FIRST[i].answer;
    if (prefersReducedMotion()) {
      setTyped(full);
      return;
    }
    let n = 0;
    setTyped("");
    timer.current = setInterval(() => {
      n += 1;
      setTyped(full.slice(0, n));
      if (n >= full.length && timer.current) clearInterval(timer.current);
    }, 16);
  }
  return (
    <div className="bx-fig bx-ba">
      <div className="bx-seg" role="group" aria-label="Velg versjon">
        {ANSWER_FIRST.map((item, i) => (
          <button key={item.label} type="button" aria-pressed={v === i} onClick={() => pick(i)}>
            {item.label}
          </button>
        ))}
      </div>
      <blockquote>{ANSWER_FIRST[v].text}</blockquote>
      <div className="bx-chat">
        <small>Det en AI kan svare, basert på denne teksten</small>
        <span aria-live="polite" aria-label={ANSWER_FIRST[v].answer}>
          <span aria-hidden="true">{typed}</span>
        </span>
      </div>
      <p className="bx-note">Eksempelet er laget for å vise poenget. Klinikken finnes ikke.</p>
    </div>
  );
}

export function PostWidget({ name }: { name: BlogWidget }) {
  switch (name) {
    case "webp-sizes":
      return <SizeBars />;
    case "php-versions":
      return <PhpVersions />;
    case "php-quiz":
      return <PhpQuiz />;
    case "answer-first":
      return <AnswerFirst />;
  }
}
