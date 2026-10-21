import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutShell } from "@/components/layout/layout-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { schibsted } from "@/lib/home/fonts";
import "./globals.css";
// A · Klar styles, all scoped under .ka, so loading them site-wide changes nothing outside the redesigned pages.
import "@/styles/a-klar.css";
import "@/styles/a-klar-pages.css";

// One family, weight-driven hierarchy — Geist carries both headings and body.
const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  // Every page sets its own face inside .ka; Geist is only the fallback outside it, so it is not preloaded.
  preload: false,
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IDweb — Nettsideutvikling i Norge",
    template: "%s | IDweb",
  },
  description:
    "Vi lager skreddersydde, mobiloptimaliserte nettsider for norske bedrifter. SEO, design og vedlikehold. Få et uforpliktende tilbud i dag.",
  metadataBase: new URL("https://www.idweb.no"),
  alternates: {
    languages: {
      "nb-NO": "https://www.idweb.no",
    },
  },
  // Pages set their own title, address and preview through pageMetadata (lib/metadata.ts); this is only the
  // fallback, so it names no page title or URL that could be wrong for the page being shared.
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "IDweb",
    images: [{ url: "/og/hjem.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/hjem.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=idweb-white", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=idweb-white", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=idweb-white", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" style={{ colorScheme: "light" }}>
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <JsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${schibsted.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
