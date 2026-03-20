import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { TESTIMONIALS } from "@/lib/content/homepage";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProofBar } from "@/components/sections/social-proof-bar";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { ComparisonBento } from "@/components/sections/comparison-bento";
import { ServiceFeatureSteps } from "@/components/sections/service-feature-steps";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialGrid } from "@/components/sections/testimonial-grid";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { CtaSection } from "@/components/sections/cta-section";
import { BlogArticles } from "@/components/ui/blogs";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords,
};

export default function Home() {
  return (
    <div>
      {/* 1. Hero — Dark */}
      <HeroSection />

      {/* 2. Social Proof Bar — Light */}
      <SocialProofBar />

      {/* 4. Portfolio Showcase — Light */}
      <PortfolioShowcase />

      {/* 5. Comparison Bento — Dark */}
      <ComparisonBento />

      {/* 6. Services Overview */}
      <ServiceFeatureSteps />

      {/* 7. Process — Dark */}
      <ProcessSection />

      {/* 8. Blog Articles — Light */}
      <BlogArticles />

      {/* 9. Testimonials — Dark */}
      <TestimonialGrid testimonials={TESTIMONIALS} />

      {/* 9. Pricing Preview — Light */}
      <PricingPreview />

      {/* 10. FAQ Teaser — Dark */}
      <FaqTeaser />

      {/* 11. Final CTA — Yellow gradient */}
      <CtaSection />
    </div>
  );
}
