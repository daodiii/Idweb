import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CASES } from "@/lib/content/kundecase";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHead } from "@/components/klar/page-head";
import { CtaCard } from "@/components/klar/cta-card";
import { Arrow } from "@/components/home/arrow";
import { mona, schibsted } from "@/lib/home/fonts";
import "@/styles/kundecase.css";

export const metadata: Metadata = pageMetadata({
  title: "Kundecaser",
  description: "Slik laget vi nettsidene til MK Auto og Kongsvinger Tannhelse: hva kunden trengte, hva vi bygde og hva som skjer bak kulissene.",
  path: "/referanser",
});

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Kundecaser", href: "/referanser" },
];

/** The client cases, and nothing else: one card per case, each the way in to its page under /referanser/<slug>. */
export default function KundecaserPage() {
  return (
    <div className={`ka kc ${schibsted.variable} ${mona.variable}`}>
      <BreadcrumbJsonLd items={CRUMBS} />

      <PageHead crumbs={CRUMBS} title="Kundecaser" lede="Slik laget vi nettsidene til to av kundene våre." />

      <section className="kc-sec" aria-label="Kundecaser">
        <div className="wrap">
          <ul className="kc-cases">
            {CASES.map((c, i) => (
              <li key={c.slug}>
                <Link href={`/referanser/${c.slug}`} className="kc-case">
                  <span className="kc-case-img">
                    <Image
                      src={`/images/kunder/${c.slug}/hero-desktop.webp`}
                      alt={`Forsiden til ${c.name}`}
                      width={2400}
                      height={1500}
                      sizes="(max-width: 860px) 100vw, 560px"
                      priority={i === 0}
                    />
                  </span>
                  <span className="kc-case-t">
                    <b>{c.name}</b>
                    <span>{c.headline}</span>
                    <span className="link">
                      Se casen <Arrow size={14} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaCard title="Skal vi lage deres?" text="Fortell hva bedriften trenger, så viser vi hvordan siden deres kan bli." button="Book en gratis prat" />
    </div>
  );
}
