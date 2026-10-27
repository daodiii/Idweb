"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_STAGE_HTML } from "@/components/home/markup/hero-stage";
import { startHero } from "@/lib/home/hero-engine";

type Variant = "a" | "b";

// Temporary comparison (docs/specs/calm-homepage.md, Part 2): ?hero=b shows the still, anything else the calm animation.
// The losing variant, this switch and its styles are removed before merge.
const CHANGE = "hsw:change";
const readVariant = (): Variant => (new URLSearchParams(window.location.search).get("hero") === "b" ? "b" : "a");
const subscribe = (onChange: () => void) => {
  window.addEventListener(CHANGE, onChange);
  return () => window.removeEventListener(CHANGE, onChange);
};
const pickVariant = (v: Variant) => {
  const url = new URL(window.location.href);
  url.searchParams.set("hero", v);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(CHANGE));
};

/**
 * Hero: the promise on one line, then a wide visual. Variant A is the stage where a client's text messages become
 * features of their site (the calm cut: four messages, no trails). Variant B is a still: one landscape from a client
 * site, cropped into desktop, tablet and phone frames. Both visuals are decorative; the message is in the heading and lede.
 */
export function Hero() {
  const variant = useSyncExternalStore(subscribe, readVariant, () => "a" as Variant);
  const stageRef = useRef<HTMLDivElement>(null);
  const pauseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (variant !== "a") return;
    const k = stageRef.current?.querySelector<HTMLElement>("[data-hero]");
    if (!k) return;
    return startHero(k, pauseRef.current, { calm: true });
  }, [variant]);

  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-head">
          <h1 id="hero-h">
            Vi{" "}
            <span className="mk">
              skreddersyr
              <svg viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength={1} d="M4 25c22-5 49-8 82-8.5 37-.6 73 1.6 110-2.5" />
              </svg>
            </span>{" "}
            autentiske nettsider som reflekterer din bedrift.
          </h1>
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
            </div>
            <div className="trust">
              <span>Fastpris før vi starter</span>
              <span>Ingen bindingstid</span>
              <span>Du snakker med den som bygger</span>
            </div>
          </div>
        </div>

        {variant === "a" ? (
          <>
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
          </>
        ) : (
          <figure className="hs">
            <div className="hs-frames" aria-hidden="true">
              <div className="hs-f hs-d">
                <Image src="/images/hero/kongsvinger-landskap-desktop.webp" alt="" fill sizes="(max-width: 600px) 88vw, 760px" priority />
                <i className="hs-m" />
              </div>
              <div className="hs-f hs-t">
                <Image src="/images/hero/kongsvinger-landskap-tablet.webp" alt="" fill sizes="(max-width: 600px) 34vw, 310px" />
                <i className="hs-m" />
              </div>
              <div className="hs-f hs-p">
                <Image src="/images/hero/kongsvinger-landskap-phone.webp" alt="" fill sizes="(max-width: 600px) 20vw, 150px" />
                <i className="hs-m" />
              </div>
            </div>
            <figcaption>
              Kongsvinger sett fra festningen, fra forsiden vi laget for{" "}
              <a href="https://kongsvingertannhelse.no" target="_blank" rel="noopener">
                kongsvingertannhelse.no
              </a>
              .
            </figcaption>
          </figure>
        )}
      </div>

      {process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && (
        <div className="hsw" role="group" aria-label="Sammenlign toppseksjon">
          {(["a", "b"] as const).map((v) => (
            <button key={v} type="button" aria-pressed={variant === v} onClick={() => pickVariant(v)}>
              {v === "a" ? "A · Animasjon" : "B · Stillbilde"}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
