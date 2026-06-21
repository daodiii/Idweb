import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATIONS, LOCATION_SEO, getLocation } from "@/lib/content/locations";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServicePainPoints } from "@/components/sections/service-pain-points";
import { ServiceBentoFeatures } from "@/components/sections/service-bento-features";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceCta } from "@/components/sections/service-cta";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface LocationPageProps {
  params: Promise<{ sted: string }>;
}

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ sted: l.id }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { sted } = await params;
  const seo = LOCATION_SEO[sted];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `/webutvikler/${sted}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "nb_NO",
      siteName: "IDweb",
      url: `https://www.idweb.no/webutvikler/${sted}`,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { sted } = await params;
  const location = getLocation(sted);
  if (!location) notFound();

  const seo = LOCATION_SEO[sted];

  return (
    <div>
      {seo && (
        <ServiceJsonLd name={seo.title} description={seo.description} slug={sted} basePath="webutvikler" />
      )}
      <FaqJsonLd faqs={location.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Webutvikler i Oslo-området", href: "/webutvikler" },
          { name: location.title, href: `/webutvikler/${sted}` },
        ]}
      />
      <ServiceHero service={location} />
      <ServicePainPoints service={location} />
      <ServiceBentoFeatures features={location.detailedFeatures} />
      <ServiceProcess steps={location.processSteps} />
      <ServiceFaq faq={location.faq} />
      <ServiceCta />
    </div>
  );
}
