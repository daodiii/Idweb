import Link from "next/link";
import { Arrow } from "@/components/home/arrow";

interface CtaCardProps {
  title: string;
  text: string;
  button?: string;
  href?: string;
}

/** Closing call to action on inner pages: a dark card that sends the visitor to /kontakt, with mail and phone beside it. */
export function CtaCard({ title, text, button = "Book en gratis prat", href = "/kontakt" }: CtaCardProps) {
  return (
    <section className="cta" aria-labelledby="cta-h">
      <div className="wrap">
        <div className="cta-card">
          <div>
            <h2 id="cta-h">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="side">
            <Link href={href} className="btn">
              {button} <Arrow />
            </Link>
            <div className="reach">
              <a href="mailto:hei@idweb.no">hei@idweb.no</a>
              <a href="tel:+4798406164">+47 984 06 164</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
