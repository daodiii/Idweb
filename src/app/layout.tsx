import type { Metadata } from "next";
import { Crimson_Pro, Outfit, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { GoogleAnalytics } from "@/components/ui/google-analytics";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const heading = Crimson_Pro({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin", "latin-ext"],
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
  alternates: {
    canonical: "/",
    languages: {
      "nb-NO": "https://idweb.no",
    },
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "IDweb",
    title: "IDweb — Nettsideutvikling i Norge",
    description:
      "Skreddersydde nettsider, SEO og vedlikehold for norske bedrifter. Få et uforpliktende tilbud i dag.",
    url: "https://idweb.no",
  },
  twitter: {
    card: "summary_large_image",
    title: "IDweb — Nettsideutvikling i Norge",
    description:
      "Skreddersydde nettsider, SEO og vedlikehold for norske bedrifter.",
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add your Google Search Console verification code here:
    // google: "your-verification-code",
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
        <GoogleAnalytics />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
