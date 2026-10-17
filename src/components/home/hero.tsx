"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { HERO_STAGE_HTML } from "@/components/home/markup/hero-stage";
import { startHero } from "@/lib/home/hero-engine";

/**
 * Hero: the promise on one line, then a wide stage where a client's text messages become features of their site,
 * on desktop and mobile at once. The stage is decorative (aria-hidden); the message is in the heading and lede.
 */
export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const k = stageRef.current?.querySelector<HTMLElement>("[data-hero]");
    if (!k) return;
    return startHero(k, pauseRef.current);
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-head">
          <h1 id="hero-h">Dere forteller. Vi bygger.</h1>
          <div className="hero-side">
            <p className="lede">
              Nettsiden, kundeportalen og systemene bak, skreddersydd for bedriften deres. La oss jobbe sammen i denne
              nye digitale tiden.
            </p>
            <div className="actions">
              <Link className="btn book" href="/#kontakt">
                Book en gratis prat
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link className="link" href="/referanser">
                Se prosjektene
              </Link>
            </div>
            <div className="trust">
              <span>Fastpris før vi starter</span>
              <span>Ingen bindingstid</span>
              <span>Du snakker med den som bygger</span>
            </div>
          </div>
        </div>
        <div className="hx" ref={stageRef} dangerouslySetInnerHTML={{ __html: HERO_STAGE_HTML }} />
        <noscript>
          <style>{".ka .hx .k.pre .stage{opacity:1}"}</style>
        </noscript>
        <div className="hero-ctrl">
          <button ref={pauseRef} type="button" className="pausebtn" data-state="playing" aria-label="Pause animasjonen">
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
    </section>
  );
}
