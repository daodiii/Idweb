import Link from "next/link";
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { ABOUT_PAGE, STORY, VALUES, APPROACH, ABOUT_CTA } from "@/lib/content/about";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Arrow } from "@/components/home/arrow";
import { PageHead } from "@/components/klar/page-head";
import { CtaCard } from "@/components/klar/cta-card";

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
  alternates: {
    canonical: "/om-oss",
  },
};

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Om oss", href: "/om-oss" },
];

function Chapters({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <ol className="chapters">
      {paragraphs.map((p, i) => (
        <li key={i}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <p>{p}</p>
        </li>
      ))}
    </ol>
  );
}

export default function OmOssPage() {
  return (
    <div className="ka">
      <BreadcrumbJsonLd items={CRUMBS} />

      <PageHead crumbs={CRUMBS} title="Vi hjelper norske bedrifter med å lykkes på nett." lede={ABOUT_PAGE.subheadline}>
        <Link href="/kontakt" className="btn">
          Ta kontakt <Arrow />
        </Link>
        <Link href="/referanser" className="link">
          Se prosjekter
        </Link>
      </PageHead>

      <section className="sec" aria-labelledby="historie-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="historie-h">Hvorfor vi startet IDweb.</h2>
            <p>Tre korte kapitler om hvordan vi havnet her — og hvor vi går.</p>
          </div>
          <Chapters paragraphs={STORY.paragraphs} />
        </div>
      </section>

      <section className="sec alt" aria-labelledby="verdier-h">
        <div className="wrap">
          <div className="sec-h wide">
            <h2 id="verdier-h">Det vi tror på.</h2>
            <p>Fire prinsipper som styrer hvert prosjekt — fra første samtale til lansering og videre.</p>
          </div>
          <ul className="g-items two">
            {VALUES.items.map((v) => (
              <li key={v.title}>
                <b>{v.title}</b>
                <span>{v.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" aria-labelledby="jobber-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="jobber-h">Vi finner svaret sammen med deg.</h2>
            <p>Du kjenner bedriften din best. Vi kjenner nett best. Det er der de gode løsningene oppstår.</p>
          </div>
          <Chapters paragraphs={APPROACH.paragraphs} />
        </div>
      </section>

      <CtaCard title="La oss ta en prat." text={ABOUT_CTA.description} button={ABOUT_CTA.buttonText} />
    </div>
  );
}
