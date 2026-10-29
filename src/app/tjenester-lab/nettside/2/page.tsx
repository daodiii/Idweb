import type { Metadata } from "next";
import { Nettside2 } from "@/components/tjenester-lab/nettside-2";

export const metadata: Metadata = { title: "Mockup 2 · steg A", robots: { index: false, follow: false } };

export default function Page() {
  return <Nettside2 steps="a" />;
}
