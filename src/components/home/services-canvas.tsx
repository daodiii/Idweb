"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Arrow } from "@/components/home/arrow";
import { SERVICES } from "@/lib/home/services/data";
import { startServicesCanvas } from "@/lib/home/services-canvas";

const Tick = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.4l3 3 6-6.4" />
  </svg>
);

/**
 * Services as «Lerretet»: a design canvas where the camera visits one client frame at a time and the frame
 * builds itself. The canvas is decorative (aria-hidden); the services, their contents and links are in the
 * server-rendered panel, one article per service, so they read and work without the animation.
 */
export function ServicesCanvas() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return startServicesCanvas(ref.current);
  }, []);

  return (
    <section className="services sv" id="tjenester" aria-labelledby="tjenester-h" ref={ref}>
      <div className="wrap">
        <div className="sec-h sv-head">
          <h2 id="tjenester-h">Alt bedriften trenger på nett, fra én leverandør</h2>
          <p>Begynn med det dere trenger nå. Resten kan bygges på senere, uten å starte på nytt.</p>
        </div>
        <div className="sv-wrap">
          <div className="sv-vp">
            <div className="sv-world" aria-hidden="true" />
            <div className="sv-tools">
              <div className="sv-tbar" role="group" aria-label="Velg tjeneste">
                {SERVICES.map((s, i) => (
                  <button key={s.k} type="button" className="sv-tb" data-i={i} aria-pressed={i === 0} aria-controls={`sv-card-${s.k}`}>
                    {s.tab}
                    <span className="sv-pg" aria-hidden="true">
                      <i />
                    </span>
                  </button>
                ))}
                <span className="sv-sep" aria-hidden="true" />
                <button type="button" className="sv-tb sv-all" aria-pressed="false" aria-label="Se alle">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
                    <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
                    <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
                    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
                  </svg>
                  <span>Se alt</span>
                </button>
                <button type="button" className="sv-tb sv-pause" data-state="playing" aria-label="Pause animasjonen">
                  <svg className="i-pause" viewBox="0 0 12 12" aria-hidden="true">
                    <rect x="2" y="1.5" width="2.6" height="9" rx=".8" />
                    <rect x="7.4" y="1.5" width="2.6" height="9" rx=".8" />
                  </svg>
                  <svg className="i-play" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M3 1.8v8.4c0 .5.5.8.9.5l6.6-4.2c.4-.2.4-.8 0-1L3.9 1.3c-.4-.3-.9 0-.9.5z" />
                  </svg>
                  <span className="lbl">Pause</span>
                </button>
              </div>
            </div>
          </div>
          <div className="sv-panel">
            {SERVICES.map((s, i) => (
              <article key={s.k} className="sv-card" id={`sv-card-${s.k}`} hidden={i !== 0}>
                <span className="sv-client" style={{ ["--c" as string]: s.color }}>
                  <i aria-hidden="true" />
                  Eksempelkunde: {s.client}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="sv-ticks">
                  {s.items.map((t) => (
                    <li key={t}>
                      <Tick />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <Link className="link" href={s.href}>
                  {s.more}
                  <Arrow size={14} />
                </Link>
              </article>
            ))}
            <article className="sv-card sv-over" hidden>
              <span className="sv-client">Lerretet</span>
              <h3>Fem kunder med hver sin løsning</h3>
              <p>Velg en for å se den bli laget.</p>
              <ul className="sv-ticks sv-jumps">
                {SERVICES.map((s, i) => (
                  <li key={s.k}>
                    <button type="button" className="sv-jump" data-i={i}>
                      <i aria-hidden="true" style={{ ["--c" as string]: s.color }} />
                      {s.tab}
                      <small>{s.client}</small>
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
        <noscript>
          <style>{".ka .sv-vp{display:none}.ka .sv-panel{position:static;width:auto;display:grid;gap:16px}.ka .sv-card[hidden]:not(.sv-over){display:flex}"}</style>
        </noscript>
      </div>
    </section>
  );
}
