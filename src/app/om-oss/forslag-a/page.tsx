import type { Metadata } from "next";
import { ForslagA } from "@/components/om-oss/forslag-a";

export const metadata: Metadata = {
  title: "Om oss, forslag A",
  robots: { index: false, follow: false },
};

export default function OmOssForslagA() {
  return <ForslagA />;
}
