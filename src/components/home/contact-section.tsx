"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail, type ContactFormState } from "@/app/actions/send-email";
import { NEED_OPTIONS } from "@/lib/home/contact";

export function ContactSection() {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(sendContactEmail, null);
  // The server rejects submissions faster than 3 s after load (bots); the timestamp is set on mount.
  const loadedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (loadedAt.current) loadedAt.current.value = String(Date.now());
  }, []);

  return (
    <section className="contact" id="kontakt" aria-labelledby="kontakt-h">
      <div className="wrap">
        <div className="g-contact">
          <div className="intro">
            <h2 id="kontakt-h">Book en gratis prat</h2>
            <p>Fortell kort hva dere trenger. Dere får et ærlig svar, også hvis svaret er at dere ikke trenger oss.</p>
            <div className="reach">
              <a href="mailto:hei@idweb.no">hei@idweb.no</a>
              <a href="tel:+4798406164">+47 984 06 164</a>
              <span>Oslo · vi møter dere gjerne</span>
            </div>
          </div>

          <form action={formAction} className="cform" aria-live="polite">
            {state?.success ? (
              <div className="ok">
                <b>Takk for henvendelsen!</b>
                <span>Vi tar kontakt innen 24 timer.</span>
              </div>
            ) : (
              <>
                <div className="two">
                  <div className="field">
                    <label htmlFor="k-navn">Navn</label>
                    <input id="k-navn" name="name" type="text" required autoComplete="name" placeholder="Kari Nordmann" maxLength={100} />
                  </div>
                  <div className="field">
                    <label htmlFor="k-epost">E-post</label>
                    <input id="k-epost" name="email" type="email" required autoComplete="email" placeholder="kari@bedrift.no" />
                  </div>
                </div>
                <fieldset>
                  <legend>Hva trenger dere?</legend>
                  <div className="chips">
                    {NEED_OPTIONS.map((n, i) => (
                      <label key={n} className="chip">
                        <input type="checkbox" name="needs" value={n} defaultChecked={i === 0} />
                        {n}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="field">
                  <label htmlFor="k-msg">Fortell litt om prosjektet</label>
                  <textarea
                    id="k-msg"
                    name="message"
                    rows={4}
                    required
                    minLength={10}
                    maxLength={5000}
                    placeholder="Vi er et lite verksted og vil at kundene skal kunne sende bilde av bilen før de kommer …"
                  />
                </div>
                {/* Honeypot and timing field, as in the existing contact form */}
                <input type="text" name="fax_number" autoComplete="off" tabIndex={-1} aria-hidden="true" className="trap" />
                <input ref={loadedAt} type="hidden" name="loaded_at" defaultValue="" />
                {state && !state.success && <p className="err">{state.message}</p>}
                <button type="submit" className="btn send" disabled={isPending}>
                  {isPending ? "Sender …" : "Send forespørsel"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
