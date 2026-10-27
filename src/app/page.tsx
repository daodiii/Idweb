import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SEO } from "@/lib/content/seo";
import { bricolage, figtree, inter, schibsted, youngSerif } from "@/lib/home/fonts";
import { Hero } from "@/components/home/hero";
import { LogoTicker } from "@/components/home/logo-ticker";
import { ServicesCanvas } from "@/components/home/services-canvas";
import { DemoSection } from "@/components/home/demo-section";
import { Testimonials } from "@/components/home/testimonials";
import { QuoteSection } from "@/components/home/quote-section";
import { FontSwitch } from "@/components/home/font-switch";
import { FLYT_HTML } from "@/components/home/markup/flyt";
import { SYSTEMER_HTML } from "@/components/home/markup/systemer";
import "@/styles/a-klar.css";
import "@/styles/a-klar-tjenester.css";
import "@/styles/a-klar-calm.css";

export const metadata: Metadata = pageMetadata({ title: SEO.home.title, description: SEO.home.description, path: "/" });

/**
 * Landing page — «A · Klar». Light, calm and concrete: a hero where a client's wishes become their site,
 * the client logos sliding past, services as a design canvas, two live demos of how we work (process, systems), testimonials and the quote request («Få et pristilbud»).
 * All styles live in a-klar.css (services canvas: a-klar-tjenester.css) under the .ka scope. The .calm class opts the
 * homepage into the stricter calm system (a-klar-calm.css, docs/specs/calm-homepage.md) without touching other .ka pages.
 * The client faces (Bricolage, Figtree, Young Serif, Inter) belong to the example clients in the canvas and ticker.
 */
export default function Home() {
  return (
    <div className={`ka calm ${schibsted.variable} ${bricolage.variable} ${figtree.variable} ${youngSerif.variable} ${inter.variable}`}>
      <Hero />
      <LogoTicker />
      <ServicesCanvas />
      <DemoSection id="prosess" kind="flyt" html={FLYT_HTML} warm />
      <DemoSection id="systemer" kind="systemer" html={SYSTEMER_HTML} />
      <Testimonials />
      <QuoteSection />
      <FontSwitch />
    </div>
  );
}
