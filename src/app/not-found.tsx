import Link from "next/link";
import type { Metadata } from "next";
import { Arrow } from "@/components/home/arrow";

export const metadata: Metadata = {
  title: "Side ikke funnet — 404",
  description:
    "Beklager, vi fant ikke siden du leter etter. Gå tilbake til forsiden eller kontakt oss for hjelp.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="ka">
      <section className="lost">
        <div className="wrap">
          <p className="code">404 · Ikke funnet</p>
          <h1>Vi finner ikke det du leter etter.</h1>
          <p className="lede">
            Siden kan ha blitt flyttet eller slettet. Gå tilbake til forsiden, eller ta kontakt om du fant en lenke som
            ikke fungerer.
          </p>
          <div className="actions">
            <Link href="/" className="btn">
              Tilbake til forsiden <Arrow />
            </Link>
            <Link href="/kontakt" className="link">
              Kontakt oss
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
