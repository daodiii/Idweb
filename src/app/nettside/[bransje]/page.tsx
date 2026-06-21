import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, INDUSTRY_SEO, getIndustry } from "@/lib/content/industries";
import { INDUSTRY_IDENTITY, FALLBACK_IDENTITY } from "@/lib/content/landing-identity";
import { IndustryHero } from "@/components/sections/industry-hero";
import { ServicePainPoints } from "@/components/sections/service-pain-points";
import { ServiceBentoFeatures } from "@/components/sections/service-bento-features";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceCta } from "@/components/sections/service-cta";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface IndustryPageProps {
  params: Promise<{ bransje: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ bransje: i.id }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { bransje } = await params;
  const seo = INDUSTRY_SEO[bransje];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/nettside/${bransje}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "nb_NO",
      siteName: "IDweb",
      url: `https://www.idweb.no/nettside/${bransje}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { bransje } = await params;
  const industry = getIndustry(bransje);
  if (!industry) notFound();

  const seo = INDUSTRY_SEO[bransje];
  const identity = INDUSTRY_IDENTITY[bransje] ?? FALLBACK_IDENTITY;

  return (
    <div>
      {seo && (
        <ServiceJsonLd name={seo.title} description={seo.description} slug={bransje} basePath="nettside" />
      )}
      <FaqJsonLd faqs={industry.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Nettsider for bransjer", href: "/nettside" },
          { name: industry.title, href: `/nettside/${bransje}` },
        ]}
      />
      <IndustryHero
        service={industry}
        accent={identity.accent}
        mockup={identity.mockup}
        business={identity.business}
      />
      <ServicePainPoints service={industry} accent={identity.accent} lossNoun={identity.noun} />
      <ServiceBentoFeatures features={industry.detailedFeatures} accent={identity.accent} gainNoun={identity.noun} />
      <ServiceProcess steps={industry.processSteps} accent={identity.accent} />
      <ServiceFaq faq={industry.faq} accent={identity.accent} />
      <ServiceCta />
    </div>
  );
}
