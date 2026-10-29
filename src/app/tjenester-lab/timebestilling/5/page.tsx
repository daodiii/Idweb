import type { Metadata } from "next";
import { TimebestillingMix } from "@/components/tjenester-lab/timebestilling-mix";

export const metadata: Metadata = { title: "Timebestilling, e-poster E: Telefonene", robots: { index: false, follow: false } };

export default function Page() {
  return <TimebestillingMix emails="phones" />;
}
