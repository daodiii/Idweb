import Link from "next/link";
import { Arrow } from "@/components/home/arrow";
import { OverviewArt } from "@/components/tjenester/overview-art";
import { SLUG_TINT, type Service } from "@/components/tjenester/oversikt-content";

/** One service as a card: its own picture on its own tint, the name, one line, and the whole card is the link. */
export function ServiceCard({ s, state }: { s: Service; state?: "on" | "dim" }) {
  return (
    <Link href={s.href} className={`ov-card${state ? ` ${state}` : ""}`} style={{ background: SLUG_TINT[s.slug] }}>
      <OverviewArt slug={s.slug} />
      <span className="ov-card-text">
        <b>{s.name}</b>
        <span>{s.line}</span>
      </span>
      <span className="ov-go" aria-hidden="true">
        <Arrow size={18} />
      </span>
    </Link>
  );
}
