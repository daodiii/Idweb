import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SEO } from "@/lib/content/seo";
import { HeroLommelykt } from "@/components/sections/hero-lommelykt";
import { Preloader } from "@/components/ui/preloader";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CursorAura } from "@/components/ui/cursor-aura";

// Below-fold sections — lazy loaded to reduce initial JS parse/execute time
const ManifestoFill = dynamic(
  () => import("@/components/sections/manifesto-fill").then((m) => m.ManifestoFill),
  { ssr: true },
);
const ProjectsCarousel = dynamic(
  () => import("@/components/sections/projects-carousel").then((m) => m.ProjectsCarousel),
  { ssr: true },
);
const SpecDuel = dynamic(
  () => import("@/components/sections/spec-duel").then((m) => m.SpecDuel),
  { ssr: true },
);
const ServicesIndex = dynamic(
  () => import("@/components/sections/services-index").then((m) => m.ServicesIndex),
  { ssr: true },
);
const ProcessPath = dynamic(
  () => import("@/components/sections/process-path").then((m) => m.ProcessPath),
  { ssr: true },
);
const PricingDrag = dynamic(
  () => import("@/components/sections/pricing-drag").then((m) => m.PricingDrag),
  { ssr: true },
);
const FaqXl = dynamic(
  () => import("@/components/sections/faq-xl").then((m) => m.FaqXl),
  { ssr: true },
);
const ArticlesStrip = dynamic(
  () => import("@/components/sections/articles-strip").then((m) => m.ArticlesStrip),
  { ssr: true },
);
const ContactTakeover = dynamic(
  () => import("@/components/sections/contact-takeover").then((m) => m.ContactTakeover),
  { ssr: true },
);

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  alternates: {
    canonical: "/",
  },
};

/**
 * Landing page — "Monumentet". A typographic monument in three worlds
 * (paper, void, yellow): preloader curtain → poster hero → scroll-fill
 * manifesto → full-screen project takeovers → spec ledger → service
 * index → drawn process → receipt pricing → XL FAQ → black finale.
 */
export default function Home() {
  return (
    <div style={{ backgroundColor: "#F3F0E7" }}>
      <Preloader />
      <SmoothScroll />
      <CursorAura />

      {/* 1. Hero — «Lommelykt»: the cursor is a flashlight revealing the yellow world */}
      <HeroLommelykt />

      {/* 2. Manifesto — words ink in on scroll */}
      <ManifestoFill />

      {/* 3. Projects — «Karusellen» 3D coverflow ring */}
      <ProjectsCarousel />

      {/* 4. Byrå vs IDweb — spec ledger + value ticker */}
      <SpecDuel />

      {/* 5. Services — XL click index */}
      <ServicesIndex />

      {/* 6. Process — self-drawing timeline */}
      <ProcessPath />

      {/* 7. Pricing — draggable receipts on the void */}
      <PricingDrag />

      {/* 8. FAQ — oversized questions */}
      <FaqXl />

      {/* 9. Articles — editorial strip */}
      <ArticlesStrip />

      {/* 10. Contact — black takeover finale */}
      <ContactTakeover />
    </div>
  );
}
