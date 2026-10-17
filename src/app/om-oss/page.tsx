import type { Metadata } from "next";
import { AboutApproach } from "@/components/sections/about-approach";
import { AboutCta } from "@/components/sections/about-cta";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStory } from "@/components/sections/about-story";
import { AboutTeam } from "@/components/sections/about-team";
import { AboutValues } from "@/components/sections/about-values";
import { SEO } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
  keywords: SEO.about.keywords,
};

export default function OmOssPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutApproach />
      <AboutTeam />
      <AboutCta />
    </>
  );
}
