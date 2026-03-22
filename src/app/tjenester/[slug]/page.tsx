import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content/services";
import { SERVICE_SEO } from "@/lib/content/seo";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServicePainPoints } from "@/components/sections/service-pain-points";
import { ServiceBentoFeatures } from "@/components/sections/service-bento-features";
import { ServiceCustomSection } from "@/components/sections/service-custom-section";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceTestimonial } from "@/components/sections/service-testimonial";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceCta } from "@/components/sections/service-cta";
import { TESTIMONIALS, SERVICE_TESTIMONIAL_MAP } from "@/lib/content/homepage";
import { ServiceJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = SERVICE_SEO[slug];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `/tjenester/${slug}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "nb_NO",
      siteName: "IDweb",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  const seo = SERVICE_SEO[slug];

  return (
    <main>
      {seo && (
        <ServiceJsonLd
          name={seo.title}
          description={seo.description}
          slug={slug}
        />
      )}
      <FaqJsonLd faqs={service.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester/nettside" },
          { name: service.title, href: `/tjenester/${slug}` },
        ]}
      />
      <ServiceHero service={service} />
      <ServicePainPoints service={service} />
      <ServiceBentoFeatures features={service.detailedFeatures} />
      <ServiceCustomSection service={service} />
      <ServiceProcess steps={service.processSteps} />
      {TESTIMONIALS.length > 0 && TESTIMONIALS[SERVICE_TESTIMONIAL_MAP[slug] ?? 0] && (
        <ServiceTestimonial testimonial={TESTIMONIALS[SERVICE_TESTIMONIAL_MAP[slug] ?? 0]} />
      )}
      <ServiceFaq faq={service.faq} />
      <ServiceCta />
    </main>
  );
}
