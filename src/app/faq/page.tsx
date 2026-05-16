import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { FAQS } from "@/lib/content/faq";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { FaqContent } from "./faq-content";

export const metadata: Metadata = {
  title: SEO.faq.title,
  description: SEO.faq.description,
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faqs={FAQS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Vanlige spørsmål", href: "/faq" },
        ]}
      />
      <FaqContent />
    </>
  );
}
