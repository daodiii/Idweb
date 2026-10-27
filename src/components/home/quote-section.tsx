"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { sendQuoteRequest, type QuoteFormState } from "@/app/actions/send-email";
import { trackLead } from "@/lib/analytics";
import { Marker } from "@/components/home/marker";
import {
  EMPTY_QUOTE,
  QUOTE_EXTRAS,
  QUOTE_MODES,
  QUOTE_PAGE_COUNTS,
  QUOTE_PAGE_TYPES,
  QUOTE_WHEN,
  QUOTE_LIMITS,
  QUOTE_TERMS,
  checkAbout,
  checkNeeds,
  checkQuote,
  checkSize,
  quoteRows,
  type Quote,
  type QuoteErrors,
  type QuoteField,
  type QuoteMode,
} from "@/lib/home/quote";

type Step = "behov" | "omfang" | "om" | "kontakt";
const STEP_LABEL: Record<Step, string> = { behov: "Behov", omfang: "Omfang", om: "Om dere", kontakt: "Kontakt" };
const SUMMARY_ORDER = ["Behov", "Ekstra", "Sider", "Nettside", "Bransje", "Klart", "Melding", "Kontakt"];

/** Where focus goes when a field is wrong. */
const FIELD_TARGET: Partial<Record<QuoteField, string>> = {
  mode: "qt-mode-ny",
  extras: `qt-x-${QUOTE_EXTRAS[0].id}`,
  pages: "qt-pages-0",
  url: "qt-url",
  industry: "qt-industry",
  message: "qt-msg",
  name: "qt-name",
  company: "qt-company",
  email: "qt-email",
  phone: "qt-phone",
};

/**
 * «Få et pristilbud»: the homepage's closing call to action, under the northern lights. A night sky with the moment's
 * aurora lightens into the footer's navy; the promise and the three terms sit on the left, and a short wizard (what
 * they need, how big the site is, a little about them, who gets the offer) floats on the right as a bright card.
 * IDweb replies with a price offer. Remounted with a new key for «Send en ny forespørsel», which also resets the
 * action state.
 */
export function QuoteSection() {
  const [round, setRound] = useState(0);
  return (
    <section className="qt" id="kontakt" aria-labelledby="qt-h">
      <div className="qt-sky" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element -- the moment's vector aurora layer, reused */}
        <img src="/images/bjorvika/nordlys-lys.svg" alt="" loading="lazy" decoding="async" />
      </div>
      <QuoteWizard key={round} onReset={() => setRound((r) => r + 1)} />
    </section>
  );
}

function QuoteWizard({ onReset }: { onReset: () => void }) {
  const [q, setQ] = useState<Quote>(EMPTY_QUOTE);
  const [at, setAt] = useState(0);
  const [back, setBack] = useState(false);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [state, dispatch, isPending] = useActionState<QuoteFormState, FormData>(sendQuoteRequest, null);
  const formRef = useRef<HTMLFormElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const moved = useRef(false);
  // The server treats a submission faster than 3 s after load as a bot; the timestamp is taken on mount.
  const loadedAt = useRef(0);
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  const steps: Step[] = q.mode === "har" ? ["behov", "om", "kontakt"] : ["behov", "omfang", "om", "kontakt"];
  const i = Math.min(at, steps.length - 1);
  const step = steps[i];
  const sent = !!state?.success;

  // After moving between steps (not on first load), put focus on the new question and keep the card in view.
  useEffect(() => {
    if (!moved.current) return;
    headRef.current?.focus({ preventScroll: true });
    const top = formRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollBy({ top: top - 96, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [i, sent]);

  useEffect(() => {
    if (sent) trackLead("pristilbud");
  }, [sent]);

  const set = <K extends QuoteField>(key: K, value: Quote[K]) => {
    setQ((prev) => ({ ...prev, [key]: value }));
    if (errors[key] || (key === "mode" && errors.extras)) setErrors({});
  };
  const toggle = (key: "extras" | "pageTypes", value: string) => {
    setQ((prev) => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value] }));
    if (errors[key]) setErrors({});
  };

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (isPending || sent) return;
    const e = step === "behov" ? checkNeeds(q) : step === "omfang" ? checkSize(q) : step === "om" ? checkAbout(q) : checkQuote(q);
    setErrors(e);
    const firstBad = (Object.keys(e) as QuoteField[])[0];
    if (firstBad) {
      const target = FIELD_TARGET[firstBad];
      if (target) document.getElementById(target)?.focus();
      return;
    }
    if (step !== "kontakt") {
      moved.current = true;
      setBack(false);
      setAt(i + 1);
      return;
    }
    const fd = new FormData();
    if (q.mode) fd.append("mode", q.mode);
    q.extras.forEach((x) => fd.append("extras", x));
    if (q.pages) fd.append("pages", q.pages);
    q.pageTypes.forEach((p) => fd.append("pageTypes", p));
    if (q.when) fd.append("when", q.when);
    (["url", "industry", "message", "name", "company", "email", "phone"] as const).forEach((k) => fd.append(k, q[k]));
    fd.append("fax_number", trapRef.current?.value ?? "");
    fd.append("loaded_at", String(loadedAt.current));
    moved.current = true;
    startTransition(() => dispatch(fd));
  }

  const rows = quoteRows(q);
  const byLabel = new Map(rows);
  const always = ["Behov", "Ekstra", ...(q.mode === "har" ? [] : ["Sider"])];
  const sideRows = SUMMARY_ORDER.filter((l) => byLabel.has(l) || always.includes(l)).map((l) => [l, byLabel.get(l) ?? ""] as const);
  const strip = [
    q.mode && (q.mode === "ny" ? "Ny nettside" : "Til siden dere har"),
    ...QUOTE_EXTRAS.filter((x) => q.extras.includes(x.id)).map((x) => x.name),
    q.mode === "ny" && q.pages && (q.pages === "Vet ikke" ? "antall sider ikke bestemt" : `${q.pages} sider`),
  ].filter(Boolean);
  const aboutEmpty = !q.url.trim() && !q.industry.trim() && !q.when && !q.message.trim();
  const firstName = q.name.trim().split(/\s+/)[0];

  const fieldProps = (key: QuoteField) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${FIELD_TARGET[key]}-err` : undefined,
  });
  const fieldError = (key: QuoteField) =>
    errors[key] ? <span className="qt-fmsg" id={`${FIELD_TARGET[key]}-err`}>{errors[key]}</span> : null;
  const groupError = (key: QuoteField) => (errors[key] ? <p className="qt-gerr" role="alert">{errors[key]}</p> : null);

  return (
    <div className="wrap">
      <div className="qt-g">
        <div className="qt-side">
          <h2 id="qt-h">
            La oss lage noe dere blir <Marker>stolte</Marker> av.
          </h2>
          <p className="qt-lede">Fortell oss litt om bedriften, så regner vi på det og sender et pristilbud. Det tar et minutt, og det er helt uforpliktende.</p>
          <ul className="qt-terms">
            {QUOTE_TERMS.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p className="qt-reach">
            Heller snakke med oss? <a href="tel:+4798406164">+47 984 06 164</a> <a href="mailto:hei@idweb.no">hei@idweb.no</a>
          </p>
          {/* the request so far, read out to screen readers as it changes; the card itself shows it to everyone else */}
          <div className="qt-sum" aria-live="polite">
            <h3>{sent ? "Det dere sendte" : "Forespørselen deres"}</h3>
            <dl className="qt-dl">
              {sideRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value || "Ikke valgt ennå"}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <form ref={formRef} className={`qt-card${sent ? " sent" : ""}`} onSubmit={onSubmit} noValidate aria-label="Forespørsel om pristilbud">
          {sent ? (
            <div className="qt-step qt-thx" role="status">
              <span className="qt-seal" aria-hidden="true">
                <svg viewBox="0 0 28 28"><path d="M8 14.5l4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3 ref={headRef} tabIndex={-1} className="qt-q">Takk{firstName ? `, ${firstName}` : ""}!</h3>
              <p>Vi har fått forespørselen. Vi tar kontakt innen 24 timer, og så får dere et pristilbud på det dere har valgt.</p>
              <div className="qt-final">
                <h4>Dette sendte dere</h4>
                <SummaryList rows={rows} />
              </div>
              <button type="button" className="qt-again" onClick={onReset}>Send en ny forespørsel</button>
            </div>
          ) : (
            <>
              <ol className="qt-prog" aria-label="Fremdrift">
                {steps.map((s, k) => (
                  <li key={s} className={k < i ? "done" : k === i ? "cur" : undefined} aria-current={k === i ? "step" : undefined}>
                    <i />
                    <span>{STEP_LABEL[s]}</span>
                  </li>
                ))}
              </ol>
              {strip.length > 0 && step !== "kontakt" && (
                <p className="qt-strip"><b>Så langt:</b> {strip.join(" · ")}</p>
              )}

              <div key={step} className={`qt-step${back ? " back" : ""}`}>
                {step === "behov" && (
                  <>
                    <h3 ref={headRef} tabIndex={-1} className="qt-q">Hva trenger dere?</h3>
                    <div className="qt-modes" role="group" aria-label="Hva trenger dere?">
                      {(Object.keys(QUOTE_MODES) as QuoteMode[]).map((m) => (
                        <button key={m} id={`qt-mode-${m}`} type="button" className="qt-mode" aria-pressed={q.mode === m} onClick={() => set("mode", m)}>
                          <b>{QUOTE_MODES[m].title}</b>
                          <span>{QUOTE_MODES[m].text}</span>
                        </button>
                      ))}
                    </div>
                    {groupError("mode")}
                    <div className="qt-blk">
                      <div className="qt-xh">
                        <h4>{q.mode === "har" ? "Hva vil dere legge til?" : "Vil dere ha noe mer?"}</h4>
                        <span>{q.mode === "har" ? "Velg én eller flere" : "Valgfritt"}</span>
                      </div>
                      <div className="qt-xs">
                        {QUOTE_EXTRAS.map((x) => (
                          <button key={x.id} id={`qt-x-${x.id}`} type="button" className="qt-x" aria-pressed={q.extras.includes(x.id)} onClick={() => toggle("extras", x.id)}>
                            <span className="box" aria-hidden="true">
                              <svg viewBox="0 0 20 20"><path d="M5.5 10.4l3 3L14.5 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            <span className="t">
                              <b>{x.name}</b>
                              <small>{x.text}</small>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    {groupError("extras")}
                  </>
                )}

                {step === "omfang" && (
                  <>
                    <h3 ref={headRef} tabIndex={-1} className="qt-q">Hvor stor blir siden?</h3>
                    <p className="qt-sub">Et anslag holder. Vi går gjennom det sammen.</p>
                    <div className="qt-blk">
                      <h4 id="qt-pages-h">Omtrent hvor mange sider?</h4>
                      <div className="qt-pills" role="group" aria-labelledby="qt-pages-h">
                        {QUOTE_PAGE_COUNTS.map(([v], k) => (
                          <button key={v} id={`qt-pages-${k}`} type="button" className="qt-pill" aria-pressed={q.pages === v} onClick={() => set("pages", v)}>
                            {v}
                          </button>
                        ))}
                      </div>
                      {groupError("pages")}
                    </div>
                    <div className="qt-blk">
                      <h4 id="qt-types-h">
                        Hvilke sider? <span className="qt-opt">Valgfritt</span>
                      </h4>
                      <div className="qt-pills" role="group" aria-labelledby="qt-types-h">
                        {QUOTE_PAGE_TYPES.map((p) => (
                          <button key={p} type="button" className="qt-pill" aria-pressed={q.pageTypes.includes(p)} onClick={() => toggle("pageTypes", p)}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {step === "om" && (
                  <>
                    <h3 ref={headRef} tabIndex={-1} className="qt-q">Litt om dere</h3>
                    <p className="qt-sub">Alt her er valgfritt, men det gjør tilbudet mer treffsikkert.</p>
                    <div className="qt-two">
                      <div className="qt-fld">
                        <label htmlFor="qt-url">{q.mode === "har" ? "Nettsiden dere har" : "Nettsiden dere har i dag"}</label>
                        <input id="qt-url" type="text" inputMode="url" autoComplete="url" placeholder="bedriften.no" maxLength={QUOTE_LIMITS.url} value={q.url} onChange={(e) => set("url", e.target.value)} {...fieldProps("url")} />
                        {fieldError("url")}
                      </div>
                      <div className="qt-fld">
                        <label htmlFor="qt-industry">Bransje</label>
                        <input id="qt-industry" type="text" placeholder="For eksempel tannklinikk" maxLength={QUOTE_LIMITS.industry} value={q.industry} onChange={(e) => set("industry", e.target.value)} {...fieldProps("industry")} />
                        {fieldError("industry")}
                      </div>
                    </div>
                    <div className="qt-blk">
                      <h4 id="qt-when-h">Når bør det være klart?</h4>
                      <div className="qt-pills" role="group" aria-labelledby="qt-when-h">
                        {QUOTE_WHEN.map((w) => (
                          <button key={w} type="button" className="qt-pill" aria-pressed={q.when === w} onClick={() => set("when", q.when === w ? null : w)}>
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="qt-fld">
                      <label htmlFor="qt-msg">Noe mer vi bør vite?</label>
                      <textarea id="qt-msg" rows={3} maxLength={QUOTE_LIMITS.message} placeholder="For eksempel: kundene skal kunne bestille time på nett." value={q.message} onChange={(e) => set("message", e.target.value)} {...fieldProps("message")} />
                      {fieldError("message")}
                    </div>
                  </>
                )}

                {step === "kontakt" && (
                  <>
                    <h3 ref={headRef} tabIndex={-1} className="qt-q">Hvem skal få tilbudet?</h3>
                    <div className="qt-two">
                      <div className="qt-fld">
                        <label htmlFor="qt-name">Navn</label>
                        <input id="qt-name" type="text" autoComplete="name" placeholder="Kari Nordmann" maxLength={QUOTE_LIMITS.name} value={q.name} onChange={(e) => set("name", e.target.value)} {...fieldProps("name")} />
                        {fieldError("name")}
                      </div>
                      <div className="qt-fld">
                        <label htmlFor="qt-company">Bedrift</label>
                        <input id="qt-company" type="text" autoComplete="organization" placeholder="Bedriften AS" maxLength={QUOTE_LIMITS.company} value={q.company} onChange={(e) => set("company", e.target.value)} {...fieldProps("company")} />
                        {fieldError("company")}
                      </div>
                      <div className="qt-fld">
                        <label htmlFor="qt-email">E-post</label>
                        <input id="qt-email" type="email" autoComplete="email" placeholder="kari@bedrift.no" value={q.email} onChange={(e) => set("email", e.target.value)} {...fieldProps("email")} />
                        {fieldError("email")}
                      </div>
                      <div className="qt-fld">
                        <label htmlFor="qt-phone">
                          Telefon <span className="qt-opt">(valgfritt)</span>
                        </label>
                        <input id="qt-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="900 00 000" maxLength={QUOTE_LIMITS.phone} value={q.phone} onChange={(e) => set("phone", e.target.value)} {...fieldProps("phone")} />
                        {fieldError("phone")}
                      </div>
                    </div>
                    <div className="qt-final">
                      <h4>Dette sender dere</h4>
                      <SummaryList rows={quoteRows(q, { contact: false })} />
                    </div>
                    {state && !state.success && <p className="qt-gerr" role="alert">{state.message}</p>}
                    <p className="qt-fine">
                      Vi tar kontakt innen 24 timer. Opplysningene brukes bare til å svare dere, se{" "}
                      <Link href="/personvern">personvernerklæringen</Link>.
                    </p>
                  </>
                )}
              </div>

              {/* Honeypot, as in the contact form: people never see or fill it. */}
              <input ref={trapRef} type="text" name="fax_number" autoComplete="off" tabIndex={-1} aria-hidden="true" className="trap" />

              <div className="qt-foot">
                <button
                  type="button"
                  className="qt-back"
                  aria-hidden={i === 0}
                  tabIndex={i === 0 ? -1 : 0}
                  onClick={() => {
                    moved.current = true;
                    setBack(true);
                    setErrors({});
                    setAt(i - 1);
                  }}
                >
                  Tilbake
                </button>
                <button type="submit" className="btn qt-next" disabled={isPending}>
                  {step === "kontakt" ? (isPending ? "Sender …" : "Send forespørsel") : step === "om" && aboutEmpty ? "Hopp over" : "Neste"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function SummaryList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="qt-dl">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
