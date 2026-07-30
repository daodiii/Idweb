import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATIONS, LOCATION_SEO, getLocation } from "@/lib/content/locations";
import { GEO_ACCENT } from "@/lib/content/landing-identity";
import { getLocalInfo } from "@/lib/content/locations-local";
import { IndustryHero } from "@/components/sections/industry-hero";
import { GeoLocalContext } from "@/components/sections/geo-local-context";
import { GeoIndustries } from "@/components/sections/geo-industries";
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
  const local = getLocalInfo(sted);

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
      <IndustryHero
        service={location}
        accent={GEO_ACCENT}
        mockup="dev"
        business={location.categoryTag}
        mockupUrl="dinbedrift.no"
      />
      {local && <GeoLocalContext place={location.categoryTag} local={local} accent={GEO_ACCENT} />}
      {local && (
        <GeoIndustries
          place={location.categoryTag}
          industries={local.industries}
          businessNote={local.businessNote}
          accent={GEO_ACCENT}
        />
      )}
      {/* No ServiceProcess here: those four steps were byte-identical across
          all six geo pages, which is duplicate weight on pages that need to
          look distinct to get indexed. The process lives on /tjenester. */}
      <ServiceFaq faq={location.faq} accent={GEO_ACCENT} />
      <ServiceCta />
    </div>
  );
}
