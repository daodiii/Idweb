"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Arrow } from "@/components/home/arrow";
import { Marker } from "@/components/home/marker";
import { SERVICES } from "@/lib/home/services/data";
import { startServicesStage } from "@/lib/home/services-stage";

const Tick = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.4l3 3 6-6.4" />
  </svg>
);

/**
 * Services: a row of tabs, then one example at a time in a calm frame, with the chosen service described beside it.
 * The frame is decorative (aria-hidden); the services, their contents and links are in the server-rendered panel, one
 * article per service, so they read and work without the animation.
 */
export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return startServicesStage(ref.current);
  }, []);

  return (
    <section className="services sv" id="tjenester" aria-labelledby="tjenester-h" ref={ref}>
      <div className="wrap">
        <div className="sec-h sv-head">
          <h2 id="tjenester-h">
            Alt bedriften trenger på nett, fra <Marker>én</Marker> leverandør
          </h2>
        </div>
        <div className="sv-tbar" role="group" aria-label="Velg tjeneste">
          {SERVICES.map((s, i) => (
            <button key={s.k} type="button" className="sv-tb" aria-pressed={i === 0} aria-controls={`sv-card-${s.k}`}>
              {s.tab}
            </button>
          ))}
        </div>
        <div className="sv-body">
          <div className="sv-stage" aria-hidden="true">
            <div className="sv-frame">
              <div className="sv-host" />
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
          </div>
        </div>
        <noscript>
          <style>{".ka .sv-stage,.ka .sv-tbar{display:none}.ka .sv-panel{display:grid;gap:40px}.ka .sv-card[hidden]{display:flex}"}</style>
        </noscript>
      </div>
    </section>
  );
}
