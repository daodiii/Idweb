import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CASES, getCase, nextCase } from "@/lib/content/kundecase";
import { mona, schibsted } from "@/lib/home/fonts";
import { Scene } from "@/components/kundecase/scene";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import "@/styles/a-klar.css";
import "@/styles/kundecase.css";

type Props = { params: Promise<{ kunde: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ kunde: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).kunde);
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/referanser/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription, images: [`/images/kunder/${c.slug}/hero-desktop.webp`] },
  };
}

const ARROW = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9M8.5 4 12.5 8l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TICK = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="10" fill="#1E2A6E" />
    <path d="M6.8 11.3l2.8 2.8 5.6-5.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * A client case («Setningen»): the sentence on top, the site's first screen on a big screen and on a phone,
 * «Det vi bygde» as a scene, what nobody sees, the call to action, and the next client.
 * Styles live in kundecase.css under .ka .kc, on top of the homepage's a-klar.css.
 */
export default async function KundecasePage({ params }: Props) {
  const c = getCase((await params).kunde);
  if (!c) notFound();
  const next = nextCase(c.slug);
  const img = (slug: string, name: string) => `/images/kunder/${slug}/${name}.webp`;

  return (
    <div className={`ka kc ${schibsted.variable} ${mona.variable}`}>
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Referanser", href: "/referanser" },
          { name: c.name, href: `/referanser/${c.slug}` },
        ]}
      />

      <section className="kc-hero" aria-labelledby="kc-h1">
        <div className="wrap">
          <nav className="kc-crumbs" aria-label="Brødsmuler">
            <Link href="/referanser">Referanser</Link>
            <span aria-hidden="true">/</span>
            <span>{c.name}</span>
          </nav>
          <h1 id="kc-h1">{c.headline}</h1>
          <p className="kc-lede kc-under">{c.lede}</p>
        </div>
        <div className="kc-stage">
          <div className="kc-pair">
            <figure className="kc-sf kc-desk">
              <div className="kc-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{c.host}</span>
              </div>
              <div className="kc-sf-shot">
                <Image src={img(c.slug, "hero-desktop")} alt={`Toppen av forsiden til ${c.name} på en stor skjerm`} width={2400} height={1500} sizes="(max-width: 860px) 100vw, 1100px" priority />
              </div>
            </figure>
            <figure className="kc-sf kc-ph">
              <div className="kc-sf-shot">
                <Image src={img(c.slug, "hero-mobil")} alt={`Toppen av forsiden til ${c.name} på mobil`} width={1170} height={2532} sizes="(max-width: 860px) 70vw, 320px" priority />
              </div>
            </figure>
          </div>
        </div>
        <div className="wrap">
          <p className="kc-cap kc-hero-cap">Toppen av forsiden på stor skjerm og på mobil, slik den ser ut på {c.host}.</p>
        </div>
      </section>

      <section className="kc-sec kc-band" aria-labelledby="kc-built">
        <div className="wrap">
          <h2 className="kc-h2" id="kc-built">
            Det vi bygde
          </h2>
          <Scene slug={c.slug} host={c.host} steps={c.steps} />
        </div>
      </section>

      <section className="kc-sec" aria-labelledby="kc-behind">
        <div className="wrap kc-behind">
          <div>
            <h2 className="kc-h2" id="kc-behind">
              Det ingen ser, men alle merker
            </h2>
            <p className="kc-lede">Det som gjør at siden blir funnet og fungerer, også når ingen tenker over det.</p>
          </div>
          <ul>
            {c.behind.map((b) => (
              <li key={b}>
                {TICK}
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap kc-end">
        <div className="kc-cta">
          <div>
            <h2>Skal vi lage deres?</h2>
            <p>Fortell hva bedriften trenger, så viser vi hvordan siden deres kan bli.</p>
          </div>
          <Link className="btn" href="/#kontakt">
            Book en gratis prat {ARROW}
          </Link>
        </div>
        <Link className="kc-next" href={`/referanser/${next.slug}`}>
          <div>
            <b>Neste: {next.name}</b>
            <span className="link">Se hvordan vi laget den</span>
          </div>
          <div className="kc-next-img">
            <Image src={img(next.slug, "hero-desktop")} alt="" width={2400} height={1500} sizes="(max-width: 600px) 100vw, 560px" />
          </div>
        </Link>
      </section>
    </div>
  );
}
