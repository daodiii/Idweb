"use client";

import { useState } from "react";
import Image from "next/image";
import { Marker } from "@/components/home/marker";
import { RingebuMark } from "@/components/home/ringebu-mark";
import { TESTIMONIALS, type Testimonial } from "@/lib/home/testimonials";

/**
 * «Det kundene sier»: one large quote at a time. The four client logos underneath are the switch (on the calm homepage
 * in one tone, a-klar-calm.css); the quote changes only when a logo is chosen. All quotes are in the HTML, stacked in one grid cell so the stage keeps the height of the longest;
 * the inactive ones are hidden from assistive tech.
 */
function Logo({ id }: { id: Testimonial["id"] }) {
  if (id === "centerrahma") return <Image src="/images/clients/rahma-logo-white.png" alt="" width={412} height={433} sizes="80px" />;
  if (id === "ringebu")
    return (
      <>
        <RingebuMark className="tm-tooth" />
        <span className="tm-word">
          Ringebu
          <br />
          Tannlegesenter
        </span>
      </>
    );
  if (id === "brobekk")
    return (
      <>
        <Image className="tm-heart" src="/images/clients/brobekk-mark.png" alt="" width={480} height={400} sizes="72px" />
        <span className="tm-word">
          Brobekk
          <br />
          Legekontor
        </span>
      </>
    );
  return <Image src="/images/clients/iqra-logo.png" alt="" width={1007} height={271} sizes="160px" />;
}

function Watermark({ id }: { id: Testimonial["id"] }) {
  if (id === "centerrahma") return <Image src="/images/clients/rahma-logo.png" alt="" width={412} height={433} sizes="420px" />;
  if (id === "ringebu") return <RingebuMark />;
  if (id === "brobekk") return <Image src="/images/clients/brobekk-mark.png" alt="" width={480} height={400} sizes="420px" />;
  return <Image src="/images/clients/iqra-globe.png" alt="" width={265} height={268} sizes="420px" />;
}

export function Testimonials() {
  const [cur, setCur] = useState(0);
  const active = TESTIMONIALS[cur];

  return (
    <section className={`tm tm-on-${active.id}`} id="kundene-sier" aria-labelledby="tm-h">
      <div className="wrap">
        <div className="sec-h tm-head">
          <h2 id="tm-h">
            Det <Marker>kundene</Marker> sier
          </h2>
          <p>Fire av kundene vi har bygd for, med egne ord.</p>
        </div>

        <div className="tm-stage">
          <div className="tm-wm" aria-hidden="true">
            {TESTIMONIALS.map((t, i) => (
              <span key={t.id} className={`tm-wm-${t.id}${i === cur ? " on" : ""}`}>
                <Watermark id={t.id} />
              </span>
            ))}
          </div>
          <div className="tm-quotes">
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.id} id={`tm-q-${t.id}`} className={`tm-q${i === cur ? " on" : ""}`} aria-hidden={i !== cur} inert={i !== cur}>
                <blockquote>
                  {t.quote.map((para, j) => (
                    <p key={j}>
                      {j === 0 && <span className="tm-gu">«</span>}
                      {para}
                      {j === t.quote.length - 1 && <span className="tm-gu">»</span>}
                    </p>
                  ))}
                </blockquote>
                <figcaption>
                  <b>{t.client}</b>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="tm-logos" role="group" aria-label="Velg kunde">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`tm-logo tm-logo-${t.id}`}
              aria-pressed={i === cur}
              aria-controls={`tm-q-${t.id}`}
              aria-label={t.client}
              onClick={() => setCur(i)}
            >
              <span className="tm-lg">
                <Logo id={t.id} />
              </span>
            </button>
          ))}
        </div>
        <noscript>
          <style>{".ka .tm-q{position:static;opacity:1;filter:none;transform:none}.ka .tm-quotes{gap:48px}"}</style>
        </noscript>
      </div>
    </section>
  );
}
