import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { PaletteBackground } from "@/components/ui/palette-background";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

const BRAND_GRADIENT =
  "linear-gradient(135deg, #5BC0BE 0%, #FF6B6B 35%, #F4CE14 65%, #5BC0BE 100%)";

const headlineWords = HERO.headline.split(" ");

export function HeroSection() {
  return (
    <PaletteBackground palette="horisonten" singleLayer className="flex min-h-svh w-full items-center justify-center">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Brand name — massive gradient-clipped text */}
        <h1 className="hero-entrance font-serif select-none" style={{ animationDelay: "0s" }}>
          <span
            className="block text-[clamp(5rem,18vw,14rem)] font-black leading-[0.85] tracking-tight animate-[gradientShift_6s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage: BRAND_GRADIENT,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {HERO.brand}
          </span>

          {/* Headline words — staggered reveal */}
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-[0.35em] text-[clamp(1.5rem,5vw,3.5rem)] font-extralight leading-tight tracking-[0.04em] text-white/90 sm:mt-4">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="hero-entrance inline-block"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-entrance mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/55 sm:mt-8 sm:text-lg"
          style={{ animationDelay: "1.0s" }}
        >
          {HERO.subheadline}
        </p>

        {/* CTAs */}
        <div
          className="hero-entrance mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row"
          style={{ animationDelay: "1.3s" }}
        >
          <Link
            href="/referanser"
            className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-bold`}
          >
            {HERO.primaryCta}{" "}
            <MoveRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-medium`}
          >
            {HERO.secondaryCta}
          </Link>
        </div>
      </div>

    </PaletteBackground>
  );
}
