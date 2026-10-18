import Link from "next/link";
import { Arrow } from "@/components/home/arrow";
import { LogoTicker } from "@/components/home/logo-ticker";
import { CtaCard } from "@/components/klar/cta-card";
import { Tick } from "@/components/klar/tick";
import { Crumbs } from "@/components/om-oss/crumbs";
import {
  OM_APPROACH,
  OM_CLIENTS,
  OM_CTA,
  OM_HERO,
  OM_PROMISES,
  OM_STORY,
  OM_VALUES,
} from "@/lib/content/about-humanized";
import "@/styles/a-klar-om-oss-forslag.css";

const num = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Forslag A, «Løftene»: the page opens on what a customer gets, set like the agreement card on the home
 * page. The story sits on the peach tint with its heading held while you read, the values are four
 * generous cards, and the way of working is three steps on a dotted line.
 */
export function ForslagA() {
  return (
    <div className="ka">
      <section className="oa-hero">
        <div className="wrap">
          <Crumbs />
          <div className="oa-g">
            <div>
              <h1>{OM_HERO.headline}</h1>
              <p className="lede">{OM_HERO.lede}</p>
              <div className="actions">
                <Link href="/kontakt" className="btn">
                  {OM_HERO.primary} <Arrow />
                </Link>
                <Link href="/referanser" className="link">
                  {OM_HERO.secondary}
                </Link>
              </div>
            </div>
            <aside className="oa-card" aria-label="Det du alltid får">
              <div className="oa-card-h">
                Det du alltid får <span>fra første samtale</span>
              </div>
              <ul className="oa-prom">
                {OM_PROMISES.map((p) => (
                  <li key={p.title}>
                    <span className="oa-chk">
                      <Tick size={16} />
                    </span>
                    <div>
                      <b>{p.title}</b>
                      <span>{p.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="oa-sign">
                <Tick size={18} /> Slik jobber vi hver gang
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="oa-story" aria-labelledby="oa-story-h">
        <div className="wrap oa-sg">
          <div className="oa-side">
            <span className="oa-eyebrow">{OM_STORY.eyebrow}</span>
            <h2 id="oa-story-h">{OM_STORY.heading}</h2>
            <blockquote className="oa-quote">{OM_STORY.pullQuote}</blockquote>
          </div>
          <ol className="oa-paras">
            {OM_STORY.paragraphs.map((p, i) => (
              <li key={i} className="oa-para">
                <span className="n">{num(i)}</span>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="oa-values" aria-labelledby="oa-values-h">
        <div className="wrap">
          <div className="oa-head">
            <span className="oa-eyebrow">{OM_VALUES.eyebrow}</span>
            <h2 id="oa-values-h">{OM_VALUES.heading}</h2>
            <p>{OM_VALUES.intro}</p>
          </div>
          <ul className="oa-vgrid">
            {OM_VALUES.items.map((v, i) => (
              <li key={v.title} className="oa-v">
                <span className="n">{num(i)}</span>
                <b>{v.title}</b>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="oa-approach" aria-labelledby="oa-approach-h">
        <div className="wrap">
          <div className="oa-head">
            <span className="oa-eyebrow">{OM_APPROACH.eyebrow}</span>
            <h2 id="oa-approach-h">{OM_APPROACH.heading}</h2>
            <p>{OM_APPROACH.intro}</p>
          </div>
          <ol className="oa-steps">
            {OM_APPROACH.steps.map((s, i) => (
              <li key={s.title} className="oa-step">
                <span className="n">{i + 1}</span>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="oa-clients" aria-labelledby="oa-clients-h">
        <div className="wrap">
          <div className="oa-head">
            <span className="oa-eyebrow">{OM_CLIENTS.eyebrow}</span>
            <h2 id="oa-clients-h">
              {OM_CLIENTS.heading}
            </h2>
            <Link href="/referanser" className="more">
              {OM_CLIENTS.link} <Arrow />
            </Link>
          </div>
        </div>
        <LogoTicker />
      </section>

      <CtaCard title={OM_CTA.title} text={OM_CTA.text} button={OM_CTA.button} />
    </div>
  );
}
