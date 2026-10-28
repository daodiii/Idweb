import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SEO } from "@/lib/content/seo";
import { bricolage, figtree, inter, youngSerif } from "@/lib/home/fonts";
import { Hero } from "@/components/home/hero";
import { LogoTicker } from "@/components/home/logo-ticker";
import { WorkSection } from "@/components/home/work-section";
import { ServicesSection } from "@/components/home/services-section";
import { DemoSection } from "@/components/home/demo-section";
import { Testimonials } from "@/components/home/testimonials";
import { QuoteSection } from "@/components/home/quote-section";
import { MarkerReveal } from "@/components/home/marker-reveal";
import { Moment } from "@/components/home/moment";
import { ButtonGlow } from "@/components/home/button-glow";
import { FLYT_HTML } from "@/components/home/markup/flyt";
import { SYSTEMER_HTML } from "@/components/home/markup/systemer";
import "@/styles/a-klar.css";
import "@/styles/a-klar-tjenester.css";
import "@/styles/a-klar-calm.css";

export const metadata: Metadata = pageMetadata({ title: SEO.home.title, description: SEO.home.description, path: "/" });

/**
 * Landing page — «A · Klar». Light, calm and concrete: a hero with a client landscape in device frames, the client logos
 * sliding past, selected work (client cards beside sticky text), the services with one example at a time, one full-width moment (Bjørvika under the northern lights), two live demos of how we work (process, systems), testimonials and the quote request («Få et pristilbud»).
 * All styles live in a-klar.css (services section: a-klar-tjenester.css) under the .ka scope. The .calm class opts the
 * homepage into the stricter calm system (a-klar-calm.css, docs/specs/calm-homepage.md) without touching other .ka pages.
 * Its face is Plus Jakarta Sans (--font-jakarta, set on <body>). The client faces (Bricolage, Figtree, Young Serif, Inter)
 * belong to the example clients in the services section and the ticker.
 */
export default function Home() {
  return (
    <div className={`ka calm ${bricolage.variable} ${figtree.variable} ${youngSerif.variable} ${inter.variable}`}>
      <MarkerReveal />
      <ButtonGlow />
      <Hero />
      <LogoTicker />
      <WorkSection />
      <ServicesSection />
      <Moment />
      <DemoSection id="prosess" kind="flyt" html={FLYT_HTML} warm />
      <DemoSection id="systemer" kind="systemer" html={SYSTEMER_HTML} />
      <Testimonials />
      <QuoteSection />
    </div>
  );
}
