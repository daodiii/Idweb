import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content/services";
import { SERVICE_SEO } from "@/lib/content/seo";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceStory } from "@/components/sections/service-story";
import { ServiceBentoFeatures } from "@/components/sections/service-bento-features";
import { ServiceExtraSection } from "@/components/sections/service-extra-section";
import { ServiceCta } from "@/components/sections/service-cta";

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
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceStory service={service} />
      <ServiceBentoFeatures features={service.detailedFeatures} />
      {service.extraSection && <ServiceExtraSection section={service.extraSection} />}
      <ServiceCta />
    </main>
  );
}
