import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SEO } from "@/lib/content/seo";
import { CONTACT_INFO } from "@/lib/constants";
import { TESTIMONIALS } from "@/lib/home/testimonials";
import { inter, mona } from "@/lib/home/fonts";
import {
  ABOUT_HERO,
  ABOUT_CHAPTERS,
  ABOUT_START_STEPS,
  ABOUT_TERMS,
  ABOUT_WHO,
  ABOUT_CTA,
} from "@/lib/content/about";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Arrow } from "@/components/home/arrow";
import { ClientTiles } from "@/components/home/logo-ticker";
import { Tick } from "@/components/klar/tick";
import { QuoteChapter } from "@/components/om-oss/quote-chapter";
import { BriefToSite } from "@/components/om-oss/brief-to-site";
import "@/styles/a-klar-om-oss.css";

export const metadata: Metadata = pageMetadata({ title: SEO.about.title, description: SEO.about.description, path: "/om-oss" });

/** Three full quotes, one row. Ringebu's is quoted in its chapter above. */
const FULL_QUOTES = TESTIMONIALS.filter((t) => t.id !== "ringebu");

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Om oss", href: "/om-oss" },
];

/** What backs up each chapter, keyed by client. */
function ChapterProof({ client }: { client: string }) {
  switch (client) {
    case "centerrahma":
      return (
        <ul className="om-ticks">
          <li>
            <Tick size={18} /> Du snakker direkte med den som bygger
          </li>
          <li>
            <Tick size={18} /> Forslag til forbedringer underveis
          </li>
        </ul>
      );
    case "iqra":
      return (
        <ol className="om-steps">
          {ABOUT_START_STEPS.map((s) => (
            <li key={s.title}>
              <b>{s.title}</b>
              {s.text}
            </li>
          ))}
        </ol>
      );
    case "ringebu":
      return (
        <div className="om-shot">
          <Image
            src="/images/kunder/kongsvinger-tannhelse/hero-desktop.webp"
            alt="Forsiden til Kongsvinger Tannhelse, med byen tegnet slik den ser ut fra festningen"
            width={2400}
            height={1500}
            sizes="(max-width: 900px) 100vw, 560px"
          />
        </div>
      );
    case "brobekk":
      return (
        <dl className="om-terms">
          {ABOUT_TERMS.map((t) => (
            <div key={t.label}>
              <dt>{t.label}</dt>
              <dd>{t.value}</dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}

/**
 * Om oss, «Med kundenes ord»: the page lets the clients describe IDweb. A client's sentence is the headline, their
 * logos follow, four of their sentences each open a chapter on what working with us is like, then who «de» are,
 * the full quotes and a peach call to action. Styles live in a-klar-om-oss.css under .ka .om.
 */
export default function OmOssPage() {
  return (
    <div className={`ka om ${mona.variable} ${inter.variable}`}>
      <BreadcrumbJsonLd items={CRUMBS} />

      <section className="om-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Brødsmuler">
            <ol>
              <li>
                <Link href="/">Hjem</Link>
              </li>
              <li aria-current="page">Om oss</li>
            </ol>
          </nav>
          <p className="om-kicker">
            <span aria-hidden="true" className="om-swatch" />
            {ABOUT_HERO.kicker}
          </p>
          <h1>
            <span aria-hidden="true">«</span>
            {ABOUT_HERO.headline}
            <span aria-hidden="true">»</span>
          </h1>
          <div className="om-hero-side">
            <p className="lede">{ABOUT_HERO.lede}</p>
            <div className="actions">
              <Link href="/kontakt" className="btn">
                Ta kontakt <Arrow />
              </Link>
              <a href="#ordene" className="link">
                Les hva de sier
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="om-tiles" aria-label="Kunder vi har laget nettsider for">
        <div className="wrap">
          <ClientTiles />
        </div>
      </section>

      <section id="ordene" className="sec alt" aria-labelledby="ordene-h">
        <div className="wrap">
          <div className="sec-h wide">
            <h2 id="ordene-h">Det de sier, og hva det betyr for deg.</h2>
            <p>Fire ting kundene våre trekker frem, med setninger hentet ordrett fra det de skrev til oss.</p>
          </div>
          <div className="om-chs">
            {ABOUT_CHAPTERS.map((c, i) => (
              <QuoteChapter key={c.client} chapter={c} index={i} flip={i % 2 === 1}>
                <ChapterProof client={c.client} />
              </QuoteChapter>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="hvem-h">
        <div className="wrap om-who">
          <div className="sec-h">
            <p className="om-who-k">{ABOUT_WHO.kicker}</p>
            <h2 id="hvem-h">{ABOUT_WHO.heading}</h2>
            {ABOUT_WHO.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link href="/referanser" className="more">
              Se alle kundecasene <Arrow />
            </Link>
          </div>
          <BriefToSite />
        </div>
      </section>

      <section className="sec alt" aria-labelledby="sitater-h">
        <div className="wrap">
          <div className="sec-h wide">
            <h2 id="sitater-h">Hele sitatene.</h2>
            <p>Slik kundene skrev dem til oss, uten redigering.</p>
          </div>
          <div className="om-full">
            {FULL_QUOTES.map((t) => (
              <figure key={t.id} className="om-full-q">
                <blockquote>
                  {t.quote.map((para, j) => (
                    <p key={j}>
                      {j === 0 && "«"}
                      {para}
                      {j === t.quote.length - 1 && "»"}
                    </p>
                  ))}
                </blockquote>
                <figcaption>
                  <span aria-hidden="true" className={`om-dot om-q-${t.id}`} />
                  {t.client}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="om-cta" aria-labelledby="om-cta-h">
        <div className="wrap">
          <h2 id="om-cta-h">{ABOUT_CTA.headline}</h2>
          <p>{ABOUT_CTA.description}</p>
          <div className="actions">
            <Link href="/#kontakt" className="btn book">
              {ABOUT_CTA.buttonText} <Arrow />
            </Link>
            <a href={CONTACT_INFO.phoneHref} className="link">
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
