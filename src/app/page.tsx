import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { schibsted } from "@/lib/home/fonts";
import { Hero } from "@/components/home/hero";
import { ClientsStrip } from "@/components/home/clients-strip";
import { ServicesList } from "@/components/home/services-list";
import { DemoSection } from "@/components/home/demo-section";
import { References } from "@/components/home/references";
import { ContactSection } from "@/components/home/contact-section";
import { FLYT_HTML } from "@/components/home/markup/flyt";
import { OVERALT_HTML } from "@/components/home/markup/overalt";
import { SYSTEMER_HTML } from "@/components/home/markup/systemer";
import "@/styles/a-klar.css";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  alternates: {
    canonical: "/",
  },
};

/**
 * Landing page — «A · Klar». Light, calm and concrete: a hero where a client's wishes become their site,
 * then services, three live demos of how we work (process, visibility, systems), references and contact.
 * All styles live in a-klar.css under the .ka scope.
 */
export default function Home() {
  return (
    <div className={`ka ${schibsted.variable}`}>
      <Hero />
      <ClientsStrip />
      <ServicesList />
      <DemoSection id="prosess" kind="flyt" html={FLYT_HTML} alt />
      <DemoSection id="overalt" kind="overalt" html={OVERALT_HTML} />
      <DemoSection id="systemer" kind="systemer" html={SYSTEMER_HTML} alt />
      <References />
      <ContactSection />
    </div>
  );
}
