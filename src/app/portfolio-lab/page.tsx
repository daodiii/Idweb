import type { Metadata } from "next";
import { PortfolioLabClient } from "./portfolio-lab-client";

export const metadata: Metadata = {
  title: "Portfolio Lab — interne mockups",
  robots: { index: false, follow: false },
};

/** Internal design lab: three portfolio mockups, switchable with 1/2/3. */
export default function PortfolioLabPage() {
  return <PortfolioLabClient />;
}
