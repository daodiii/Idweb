import Link from "next/link";
import { Arrow } from "@/components/home/arrow";

/** A plain booking prompt after the demos, so a visitor who is convinced halfway down has a button in reach. */
export function BookingNudge() {
  return (
    <section className="nudge" aria-labelledby="nudge-h">
      <div className="wrap">
        <div className="nudge-in">
          <p>
            <b id="nudge-h">Har dere en idé, eller noe som tar for mye tid i dag?</b>
            <span>Fortell oss kort hva det er, så sier vi hva vi ville gjort.</span>
          </p>
          <Link href="/#kontakt" className="btn">
            Book en gratis prat <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
