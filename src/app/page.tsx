import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { TESTIMONIALS } from "@/lib/content/homepage";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProofBar } from "@/components/sections/social-proof-bar";
import { ProblemAgitation } from "@/components/sections/problem-agitation";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { TechAdvantage } from "@/components/sections/tech-advantage";
import { BentoServices } from "@/components/sections/bento-services";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialGrid } from "@/components/sections/testimonial-grid";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords,
};

export default function Home() {
  return (
    <main>
      {/* 1. Hero — Dark */}
      <HeroSection />

      {/* 2. Social Proof Bar — Light */}
      <SocialProofBar />

      {/* 3. Problem Agitation — Dark */}
      <ProblemAgitation />

      {/* 4. Portfolio Showcase — Light */}
      <PortfolioShowcase />

      {/* 5. Tech Advantage — Light */}
      <TechAdvantage />

      {/* 6. Services Overview — Dark */}
      <BentoServices />

      {/* 7. Process — Light */}
      <ProcessSection />

      {/* 8. Testimonials — Dark */}
      <TestimonialGrid testimonials={TESTIMONIALS} />

      {/* 9. Pricing Preview — Light */}
      <PricingPreview />

      {/* 10. FAQ Teaser — Dark */}
      <FaqTeaser />

      {/* 11. Final CTA — Yellow gradient */}
      <CtaSection />
    </main>
  );
}
