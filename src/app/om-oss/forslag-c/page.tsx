import type { Metadata } from "next";
import { ForslagC } from "@/components/om-oss/forslag-c";

export const metadata: Metadata = {
  title: "Om oss, forslag C",
  robots: { index: false, follow: false },
};

export default function OmOssForslagC() {
  return <ForslagC />;
}
