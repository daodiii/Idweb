import { Mona_Sans, Schibsted_Grotesk } from "next/font/google";

// The A · Klar homepage face. Exposed as a CSS variable that a-klar.css reads inside the .ka scope.
export const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// The hero face: headline, lede and buttons at the top of the homepage. Variable weight, exposed as --font-mona.
export const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
