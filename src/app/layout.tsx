import type { Metadata } from "next";
import { Crimson_Pro, Outfit, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const heading = Crimson_Pro({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IDweb — Nettsideutvikling i Norge",
    template: "%s | IDweb",
  },
  description:
    "Vi lager skreddersydde, mobiloptimaliserte nettsider for norske bedrifter. SEO, design og vedlikehold. Få et uforpliktende tilbud i dag.",
  metadataBase: new URL("https://idweb.no"),
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "IDweb",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" style={{ colorScheme: "dark light" }}>
      <head>
        <meta name="theme-color" content="#F4CE14" />
        <JsonLd />
      </head>
      <body className={`${heading.variable} ${body.variable} ${code.variable} antialiased`}>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
