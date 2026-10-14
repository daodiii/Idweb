import type { Metadata } from "next";
import {
  WEBBYRA_OSLO,
  WEBBYRA_OSLO_SEO,
  OSLO_LOCAL,
  PRICE_GUIDE,
  AGENCY_SERVICES,
} from "@/lib/content/webbyra-oslo";
import { GEO_ACCENT } from "@/lib/content/landing-identity";
import { IndustryHero } from "@/components/sections/industry-hero";
import { AgencyServices } from "@/components/sections/agency-services";
import { PriceGuide } from "@/components/sections/price-guide";
import { GeoLocalContext } from "@/components/sections/geo-local-context";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceCta } from "@/components/sections/service-cta";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

const PATH = "/webbyra-oslo";

export const metadata: Metadata = {
  title: WEBBYRA_OSLO_SEO.title,
  description: WEBBYRA_OSLO_SEO.description,
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    title: WEBBYRA_OSLO_SEO.title,
    description: WEBBYRA_OSLO_SEO.description,
    type: "website",
    locale: "nb_NO",
    siteName: "IDweb",
    url: `https://www.idweb.no${PATH}`,
  },
  twitter: {
    card: "summary_large_image",
    title: WEBBYRA_OSLO_SEO.title,
    description: WEBBYRA_OSLO_SEO.description,
  },
};

export default function WebbyraOsloPage() {
  return (
    <div>
      <ServiceJsonLd
        name={WEBBYRA_OSLO.title}
        description={WEBBYRA_OSLO_SEO.description}
        slug="webbyra-oslo"
        basePath=""
        areaServed={{ "@type": "City", name: "Oslo" }}
      />
      <FaqJsonLd faqs={WEBBYRA_OSLO.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: WEBBYRA_OSLO.title, href: PATH },
        ]}
      />
      <IndustryHero
        service={WEBBYRA_OSLO}
        accent={GEO_ACCENT}
        mockupUrl="dinbedrift.no"
      />
      <AgencyServices place="Oslo" services={AGENCY_SERVICES} accent={GEO_ACCENT} />
      <PriceGuide
        place="Oslo"
        rows={PRICE_GUIDE.rows}
        footnote={PRICE_GUIDE.footnote}
        guideHref={PRICE_GUIDE.guideHref}
        accent={GEO_ACCENT}
      />
      <GeoLocalContext place="Oslo" local={OSLO_LOCAL} accent={GEO_ACCENT} />
      <ServiceProcess steps={WEBBYRA_OSLO.processSteps} accent={GEO_ACCENT} />
      <ServiceFaq faq={WEBBYRA_OSLO.faq} accent={GEO_ACCENT} />
      <ServiceCta />
    </div>
  );
}
