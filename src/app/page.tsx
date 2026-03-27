import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SEO } from "@/lib/content/seo";
import { TESTIMONIALS } from "@/lib/content/homepage";
import { HeroSection } from "@/components/sections/hero-section";

// Below-fold sections — lazy loaded to reduce initial JS parse/execute time
const PortfolioShowcase = dynamic(
  () => import("@/components/sections/portfolio-showcase").then((m) => m.PortfolioShowcase),
  { ssr: true },
);
const ComparisonBento = dynamic(
  () => import("@/components/sections/comparison-bento").then((m) => m.ComparisonBento),
  { ssr: true },
);
const ServiceFeatureSteps = dynamic(
  () => import("@/components/sections/service-feature-steps").then((m) => m.ServiceFeatureSteps),
  { ssr: true },
);
const ProcessSection = dynamic(
  () => import("@/components/sections/process-section").then((m) => m.ProcessSection),
  { ssr: true },
);
const TestimonialGrid = dynamic(
  () => import("@/components/sections/testimonial-grid").then((m) => m.TestimonialGrid),
  { ssr: true },
);
const PricingPreview = dynamic(
  () => import("@/components/sections/pricing-preview").then((m) => m.PricingPreview),
  { ssr: true },
);
const BlogArticles = dynamic(
  () => import("@/components/sections/blog-articles").then((m) => m.BlogArticles),
  { ssr: true },
);
const FaqTeaser = dynamic(
  () => import("@/components/sections/faq-teaser").then((m) => m.FaqTeaser),
  { ssr: true },
);
const CtaSection = dynamic(
  () => import("@/components/sections/cta-section").then((m) => m.CtaSection),
  { ssr: true },
);

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div>
      {/* 1. Hero — Dark */}
      <HeroSection />

      {/* Portfolio Showcase — Light */}
      <PortfolioShowcase />

      {/* 5. Comparison Bento — Dark */}
      <ComparisonBento />

      {/* 6. Services Overview */}
      <ServiceFeatureSteps />

      {/* 7. Process — Dark */}
      <ProcessSection />

      {/* Blog articles moved to /blogg — homepage focuses on conversion */}

      {/* 9. Testimonials — Dark (shown when real testimonials are collected) */}
      {TESTIMONIALS.length > 0 && <TestimonialGrid testimonials={TESTIMONIALS} />}

      {/* 9. Blog Articles — White */}
      <BlogArticles />

      {/* 10. Pricing Preview — Dark */}
      <PricingPreview />

      {/* 11. FAQ Teaser — Light */}
      <FaqTeaser />

      {/* 11. Final CTA — Yellow gradient */}
      <CtaSection />
    </div>
  );
}
