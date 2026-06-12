import type { Metadata } from "next";
import { HeroLabClient } from "./hero-lab-client";

export const metadata: Metadata = {
  title: "Hero Lab — interne mockups",
  robots: { index: false, follow: false },
};

/** Internal design lab: three hero mockups, switchable with 1/2/3. */
export default function HeroLabPage() {
  return <HeroLabClient />;
}
