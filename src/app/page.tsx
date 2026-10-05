import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SEO } from "@/lib/content/seo";
import { HomeHero } from "@/components/sections/home-hero";
import { SiteShowcase } from "@/components/sections/site-showcase";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

// Below-fold sections — lazy loaded to reduce initial JS parse/execute time
const Sekundet = dynamic(
  () => import("@/components/sections/sekundet").then((m) => m.Sekundet),
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
const FaqXl = dynamic(
  () => import("@/components/sections/faq-xl").then((m) => m.FaqXl),
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
 * Landing page, mid-redesign. The top is the new «Nordisk ro» direction
 * (animated hero + project showcase); the sections below it are still the
 * previous «Monument» design and will be replaced one by one.
 */
export default function Home() {
  return (
    <div style={{ backgroundColor: "#F3F0E7" }}>
      <SmoothScroll />

      {/* 1. Hero — headline rises word by word, «valgt» gets a drawn highlight */}
      <HomeHero />

      {/* 2. Showcase — real projects cycle through a browser frame and a phone */}
      <SiteShowcase />

      {/* 3½. Full stack — «Sekundet»: one booking scrubbed through the
          whole chain. The carousel shows the facades; this shows the
          machine behind them. */}
      <Sekundet />

      {/* 4. Byrå vs IDweb — spec ledger + value ticker */}
      <SpecDuel />

      {/* 5. Services — XL click index */}
      <ServicesIndex />

      {/* 6. Process — self-drawing timeline */}
      <ProcessPath />

      {/* 7. FAQ — oversized questions */}
      <FaqXl />

      {/* 8. Contact — black takeover finale */}
      <ContactTakeover />
    </div>
  );
}
