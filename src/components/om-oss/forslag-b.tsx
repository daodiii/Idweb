import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/home/arrow";
import { RingebuMark } from "@/components/home/ringebu-mark";
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
const TINTS = ["ob-peach", "ob-tint", "ob-sage", "ob-surface"] as const;

/**
 * Forslag B, «Bento»: the whole page as tiles, the way the home page lays out its demos. A real project
 * in a browser frame leads, the three promises sit beside it, and the story, the values and the steps
 * each get their own grid of tinted cards.
 */
export function ForslagB() {
  const [a, b, c] = OM_PROMISES;
  return (
    <div className="ka">
      <section className="ob-hero">
        <div className="wrap">
          <Crumbs />
          <h1>{OM_HERO.headline}</h1>
          <div className="ob-row">
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

          <div className="ob-bento">
            <figure className="ob-t ob-shot">
              <div className="ob-frame" aria-hidden="true">
                <div className="ob-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="ob-img">
                  <Image src="/images/portfolio/ref-ringebu-desktop.webp" alt="" fill sizes="(max-width: 900px) 100vw, 700px" priority />
                </div>
              </div>
              <figcaption className="ob-cap">
                <b>Ringebu Tannlegesenter</b>
                <span>Bygget av oss</span>
              </figcaption>
            </figure>

            <div className="ob-t ob-tint ob-a">
              <span className="ob-k">
                <Tick size={18} />
              </span>
              <b>{a.title}</b>
              <p>{a.text}</p>
            </div>
            <div className="ob-t ob-peach ob-b">
              <span className="ob-k">
                <Tick size={18} />
              </span>
              <b>{b.title}</b>
              <p>{b.text}</p>
            </div>
            <div className="ob-t ob-sage ob-c">
              <span className="ob-k">
                <Tick size={18} />
              </span>
              <b>{c.title}</b>
              <p>{c.text}</p>
            </div>
            <div className="ob-t ob-logos">
              <h2>{OM_CLIENTS.eyebrow}</h2>
              <div className="tk-t tk-rahma">
                <Image src="/images/clients/rahma-logo-white.png" alt="Center Rahma" width={412} height={433} sizes="60px" />
              </div>
              <div className="tk-t tk-mk">
                <Image src="/images/clients/mk-auto-logo.png" alt="MK Auto" width={299} height={300} sizes="60px" />
              </div>
              <div className="tk-t tk-iqra">
                <Image src="/images/clients/iqra-logo.png" alt="Iqra Senter" width={1007} height={271} sizes="120px" />
              </div>
              <div className="tk-t tk-brobekk">
                <Image src="/images/clients/brobekk-mark.png" alt="" width={480} height={400} sizes="50px" />
                <span>Brobekk Legekontor</span>
              </div>
              <div className="tk-t tk-ringebu">
                <RingebuMark className="tk-tooth" />
                <span>Ringebu</span>
              </div>
              <div className="tk-t tk-vocura">
                <span>Vocura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ob-sec" aria-labelledby="ob-story-h">
        <div className="wrap">
          <h2 id="ob-story-h" className="big">
            {OM_STORY.heading}
          </h2>
          <div className="ob-bento">
            <div className="ob-t ob-story">
              {OM_STORY.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="ob-t ob-cobalt ob-quote">
              <q>{OM_STORY.pullQuote}</q>
              <small>{OM_STORY.eyebrow} · IDweb</small>
            </div>
          </div>
        </div>
      </section>

      <section className="ob-sec" aria-labelledby="ob-values-h">
        <div className="wrap">
          <h2 id="ob-values-h" className="big">
            {OM_VALUES.heading}
          </h2>
          <p className="ob-lede">{OM_VALUES.intro}</p>
          <div className="ob-bento">
            {OM_VALUES.items.map((v, i) => (
              <div key={v.title} className={`ob-t ob-v ob-v${i + 1} ${TINTS[i]}`}>
                <span className="n">{num(i)}</span>
                <b>{v.title}</b>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ob-sec ob-after" aria-labelledby="ob-approach-h">
        <div className="wrap">
          <h2 id="ob-approach-h" className="big">
            {OM_APPROACH.heading}
          </h2>
          <p className="ob-lede">{OM_APPROACH.intro}</p>
          <div className="ob-bento">
            {OM_APPROACH.steps.map((s, i) => (
              <div key={s.title} className="ob-t ob-s">
                <span className="big-n" aria-hidden="true">
                  {i + 1}
                </span>
                <b>{s.title}</b>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ob-cta">
        <CtaCard title={OM_CTA.title} text={OM_CTA.text} button={OM_CTA.button} />
      </div>
    </div>
  );
}
