"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Arrow } from "@/components/home/arrow";
import { PageHead } from "@/components/klar/page-head";
import {
  OM_APPROACH,
  OM_CTA,
  OM_HERO,
  OM_STORY,
  OM_VALUES,
} from "@/lib/content/about-humanized";
import { CONTACT_INFO } from "@/lib/constants";
import "@/styles/a-klar-om-oss-forslag.css";

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Om oss", href: "/om-oss" },
];

/** The four things a business owner asks, in the order the page answers them. */
const ASKS = {
  story: "Hvorfor startet dere IDweb?",
  values: "Hva tror dere på?",
  approach: "Hvordan jobber dere?",
  talk: "Kan vi ta en prat?",
} as const;

/** Marks the thread live, then lets each message in as it is scrolled to. Without script every message just stands. */
function useThread() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute("data-live", "");
    const items = el.querySelectorAll<HTMLElement>(".oc-m, .oc-quote, .oc-day");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );
    items.forEach((i) => io.observe(i));
    return () => {
      io.disconnect();
      el.removeAttribute("data-live");
    };
  }, []);
  return ref;
}

/**
 * Forslag C, «Samtalen»: the page as the conversation a business owner would have with us. The same
 * facts, answered one question at a time, in a chat window like the message card on the home page.
 */
export function ForslagC() {
  const thread = useThread();
  return (
    <div className="ka">
      <PageHead crumbs={CRUMBS} title={OM_HERO.headline} lede={OM_HERO.lede}>
        <Link href="/kontakt" className="btn">
          {OM_HERO.primary} <Arrow />
        </Link>
        <Link href="/referanser" className="link">
          {OM_HERO.secondary}
        </Link>
      </PageHead>

      <section className="oc-wrap" aria-label="Om IDweb, som en samtale">
        <div className="oc-intro">
          <h2>Spør oss om hva som helst.</h2>
          <p>Dette er det folk oftest lurer på før de tar kontakt.</p>
        </div>

        <div className="oc-chat" ref={thread}>
          <div className="oc-bar">
            <span className="oc-av">
              <Image src="/images/idweb-mark-160.webp" alt="" fill sizes="46px" />
            </span>
            <div>
              <b>IDweb</b>
              <small>Webutvikler i Oslo</small>
            </div>
            <span className="oc-on">{CONTACT_INFO.hours}</span>
          </div>

          <div className="oc-thread">
            <span className="oc-day">{OM_STORY.eyebrow}</span>
            <p className="oc-m oc-you">{ASKS.story}</p>
            {OM_STORY.paragraphs.map((p, i) => (
              <p key={i} className="oc-m oc-us">
                {p}
              </p>
            ))}
            <p className="oc-quote">{OM_STORY.pullQuote}</p>

            <span className="oc-day">{OM_VALUES.eyebrow}</span>
            <p className="oc-m oc-you">{ASKS.values}</p>
            {OM_VALUES.items.map((v, i) => (
              <p key={v.title} className={`oc-m oc-us ${i % 2 === 0 ? "soft" : "peach"}`}>
                <b>
                  <span className="oc-n">{i + 1}</span>
                  {v.title}
                </b>
                {v.text}
              </p>
            ))}

            <span className="oc-day">{OM_APPROACH.eyebrow}</span>
            <p className="oc-m oc-you">{ASKS.approach}</p>
            <p className="oc-m oc-us">
              <b>{OM_APPROACH.heading}</b>
              {OM_APPROACH.intro}
            </p>
            {OM_APPROACH.steps.map((s, i) => (
              <p key={s.title} className="oc-m oc-us soft">
                <b>
                  <span className="oc-n">{i + 1}</span>
                  {s.title}
                </b>
                {s.text}
              </p>
            ))}

            <span className="oc-day">{OM_CTA.title}</span>
            <p className="oc-m oc-you">{ASKS.talk}</p>
            <span className="oc-typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div className="oc-m oc-us oc-cta">
              <div>
                <b>{OM_CTA.title}</b>
                {OM_CTA.text}
              </div>
              <Link href="/kontakt" className="btn">
                {OM_CTA.button} <Arrow />
              </Link>
              <div className="oc-reach">
                <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a>
                <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
