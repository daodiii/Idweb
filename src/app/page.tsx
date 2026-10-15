import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { bricolage, figtree, mona, schibsted, youngSerif } from "@/lib/home/fonts";
import { Hero } from "@/components/home/hero";
import { ClientsStrip } from "@/components/home/clients-strip";
import { ServicesCanvas } from "@/components/home/services-canvas";
import { DemoSection } from "@/components/home/demo-section";
import { BookingNudge } from "@/components/home/booking-nudge";
import { References } from "@/components/home/references";
import { ContactSection } from "@/components/home/contact-section";
import { FLYT_HTML } from "@/components/home/markup/flyt";
import { SYSTEMER_HTML } from "@/components/home/markup/systemer";
import "@/styles/a-klar.css";
import "@/styles/a-klar-tjenester.css";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  alternates: {
    canonical: "/",
  },
};

/**
 * Landing page — «A · Klar». Light, calm and concrete: a hero where a client's wishes become their site,
 * then services as a design canvas, two live demos of how we work (process, systems), references and contact.
 * All styles live in a-klar.css (services canvas: a-klar-tjenester.css) under the .ka scope.
 */
export default function Home() {
  return (
    <div className={`ka ${schibsted.variable} ${mona.variable} ${bricolage.variable} ${figtree.variable} ${youngSerif.variable}`}>
      <Hero />
      <ClientsStrip />
      <ServicesCanvas />
      <DemoSection id="prosess" kind="flyt" html={FLYT_HTML} alt />
      <DemoSection id="systemer" kind="systemer" html={SYSTEMER_HTML} />
      <BookingNudge />
      <References />
      <ContactSection />
    </div>
  );
}
