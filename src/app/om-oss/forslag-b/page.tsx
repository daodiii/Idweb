import type { Metadata } from "next";
import { ForslagB } from "@/components/om-oss/forslag-b";

export const metadata: Metadata = {
  title: "Om oss, forslag B",
  robots: { index: false, follow: false },
};

export default function OmOssForslagB() {
  return <ForslagB />;
}
