"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Arrow } from "@/components/home/arrow";
import { RingebuMark } from "@/components/home/ringebu-mark";
import { TESTIMONIALS, type Testimonial } from "@/lib/home/testimonials";

/**
 * «Det kundene sier»: one large quote at a time. The four client logos underneath are the switch, each on a tile in
 * the client's own colours; the active tile carries a progress line and the quote changes when it runs out.
 * It pauses on hover, keyboard focus, the pause button, off screen and in a hidden tab, and never runs with
 * reduced motion. All quotes are in the HTML, stacked in one grid cell so the stage keeps the height of the longest;
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
  const ref = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const [offscreen, setOffscreen] = useState(true);
  const [hiddenTab, setHiddenTab] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduce(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    const onVis = () => setHiddenTab(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver(([en]) => setOffscreen(!en.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => {
      mq.removeEventListener("change", onMq);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  const paused = userPaused || held || offscreen || hiddenTab;
  const n = TESTIMONIALS.length;
  const active = TESTIMONIALS[cur];

  return (
    <section
      ref={ref}
      className={`tm tm-on-${active.id}${paused ? " is-paused" : ""}`}
      id="kundene-sier"
      aria-labelledby="tm-h"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={(e) => setHeld(!e.target.classList.contains("pausebtn") && e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <div className="wrap">
        <div className="sec-h tm-head">
          <h2 id="tm-h">Det kundene sier</h2>
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
                  {/* a full page load, like the references: next/link lands short of the project on /referanser */}
                  <a className="link" href={`/referanser#${t.id}`}>
                    Se nettsiden <Arrow size={14} />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
          <button
            type="button"
            className="pausebtn tm-pause"
            data-state={userPaused ? "paused" : "playing"}
            aria-label={userPaused ? "Spill av byttingen" : "Pause byttingen"}
            onClick={() => setUserPaused((p) => !p)}
          >
            <svg className="i-pause" viewBox="0 0 12 12" aria-hidden="true">
              <rect x="2" y="1.5" width="2.6" height="9" rx=".8" />
              <rect x="7.4" y="1.5" width="2.6" height="9" rx=".8" />
            </svg>
            <svg className="i-play" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 1.8v8.4c0 .5.5.8.9.5l6.6-4.2c.4-.2.4-.8 0-1L3.9 1.3c-.4-.3-.9 0-.9.5z" />
            </svg>
            <span className="lbl">{userPaused ? "Spill av" : "Pause"}</span>
          </button>
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
              <span className="tm-bar" aria-hidden="true">
                {i === cur && !reduce && <i key={cur} onAnimationEnd={() => setCur((c) => (c + 1) % n)} />}
              </span>
            </button>
          ))}
        </div>
        <noscript>
          <style>{".ka .tm-q{position:static;opacity:1;filter:none;transform:none}.ka .tm-quotes{gap:48px}.ka .tm-pause,.ka .tm-bar{display:none}"}</style>
        </noscript>
      </div>
    </section>
  );
}
