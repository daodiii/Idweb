import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SEO } from "@/lib/content/seo";
import { BLOG_POSTS } from "@/lib/content/blog";
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "@/lib/content/blog/category-colors";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: SEO.blog.title,
  description: SEO.blog.description,
  alternates: {
    canonical: "/blogg",
  },
};

const EASE = "cubic-bezier(0.23,1,0.32,1)";

const BLOG_COVER_IMAGES: Record<string, string> = {
  "webdesigntrender-2026":
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
  konverteringsoptimalisering:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "velge-riktig-webdesignbyra":
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  "wordpress-vs-skreddersydd":
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
  "google-analytics-guide":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "seo-for-nybegynnere":
    "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&q=80",
  mobiloptimalisering:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  "tegn-paa-ny-nettside":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  "vanlige-feil-med-nettsiden":
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
  "sosiale-medier-for-bedrifter":
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  "hva-koster-en-nettside":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  "nettbutikk-guide":
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
};

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80";

function coverFor(slug: string): string {
  return BLOG_COVER_IMAGES[slug] ?? FALLBACK_COVER;
}

function CategoryBadge({ category }: { category: string }) {
  const c = CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
  return (
    <span
      className={`inline-block rounded-full border ${c.border} ${c.bg} px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${c.text}`}
    >
      {category}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[0_24px_50px_-28px_rgba(10,10,10,0.18)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_32px_60px_-28px_rgba(10,10,10,0.24)]"
      style={{ transitionTimingFunction: EASE }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative overflow-hidden lg:col-span-7">
          <Image
            src={coverFor(post.slug)}
            alt={post.title}
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.03] lg:aspect-auto lg:h-full"
            style={{ transitionTimingFunction: EASE }}
            priority
          />
          <span className="absolute left-5 top-5">
            <CategoryBadge category={post.category} />
          </span>
        </div>

        <div className="flex flex-col justify-center px-7 py-8 lg:col-span-5 lg:px-10 lg:py-10">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-6 bg-[#F4CE14]" />
            Hovedartikkel
          </p>
          <h2 className="mt-5 font-serif text-[clamp(1.75rem,3.2vw,2.5rem)] font-black leading-[1.05] tracking-[-0.025em] text-pretty text-[var(--color-text)]">
            <Link
              href={`/blogg/${post.slug}`}
              className="hover:text-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[var(--color-text-muted)]">
            {post.excerpt}
          </p>

          <div className="mt-7 flex items-center justify-between border-t border-[var(--color-border)] pt-5">
            <Link
              href={`/blogg/${post.slug}`}
              className="group/link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-accent-hover)]"
              style={{ transitionTimingFunction: EASE }}
            >
              Les artikkel
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                style={{ transitionTimingFunction: EASE }}
              />
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function PostCard({
  post,
  size = "small",
}: {
  post: BlogPost;
  size?: "medium" | "small";
}) {
  const isMedium = size === "medium";
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[0_20px_40px_-24px_rgba(10,10,10,0.12)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(10,10,10,0.18)]"
      style={{ transitionTimingFunction: EASE }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={coverFor(post.slug)}
          alt={post.title}
          width={800}
          height={600}
          sizes={
            isMedium
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className={`w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.04] ${
            isMedium ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
          style={{ transitionTimingFunction: EASE }}
        />
        <span className="absolute left-4 top-4">
          <CategoryBadge category={post.category} />
        </span>
      </div>

      <div
        className={`flex flex-1 flex-col ${
          isMedium ? "px-7 py-6" : "px-6 py-5"
        }`}
      >
        <h3
          className={`font-serif font-black tracking-tight text-pretty text-[var(--color-text)] ${
            isMedium
              ? "text-2xl leading-[1.1] sm:text-[1.65rem]"
              : "text-xl leading-[1.15]"
          }`}
        >
          <Link
            href={`/blogg/${post.slug}`}
            className="hover:text-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {post.title}
          </Link>
        </h3>
        <p
          className={`mt-3 flex-1 leading-relaxed text-[var(--color-text-muted)] line-clamp-2 ${
            isMedium ? "text-base" : "text-sm"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <Link
            href={`/blogg/${post.slug}`}
            className="group/link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-accent-hover)]"
            style={{ transitionTimingFunction: EASE }}
          >
            Les artikkel
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              style={{ transitionTimingFunction: EASE }}
            />
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {post.readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}

function MobileListRow({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blogg/${post.slug}`}
      className="group flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
      style={{ transitionTimingFunction: EASE }}
    >
      <div className="flex-1">
        <CategoryBadge category={post.category} />
        <h3 className="mt-2 font-serif text-base font-black tracking-tight text-pretty text-[var(--color-text)] group-hover:text-[var(--color-accent-hover)]">
          {post.title}
        </h3>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          {post.readingTime}
        </span>
      </div>
      <ArrowUpRight
        aria-hidden
        className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

export default function BloggPage() {
  const [featured, ...rest] = BLOG_POSTS;
  const secondary = rest.slice(0, 2);
  const remaining = rest.slice(2);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Blogg", href: "/blogg" },
        ]}
      />

      {/* Hero — asymmetric editorial on light */}
      <section className="relative overflow-hidden bg-[var(--color-bg)] px-6 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 88% 18%, rgba(244,206,20,0.14), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10,10,10,0.45) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
              Innsikt fra idweb
            </p>

            <h1 className="mt-7 font-serif text-[var(--color-text)]">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
                Praktiske artikler om
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                nettsider som{" "}
                <span className="relative inline-block">
                  selger
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                  />
                </span>
                .
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
                Skrevet for norske bedrifter.
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4">
            <p className="max-w-[52ch] text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
              Guider og analyser om SEO, design, konvertering og digital
              markedsforing. Ingen jargong, bare ting du kan ta i bruk neste
              uke.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              {BLOG_POSTS.length} artikler · oppdateres jevnlig
            </p>
          </div>
        </div>
      </section>

      {/* Posts — varied grid: 1 featured + 2-col row + 3-col grid */}
      <section className="bg-[var(--color-bg)] px-6 pb-24 pt-4 sm:pb-28 lg:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Mobile compact list */}
          <div className="space-y-3 sm:hidden">
            {BLOG_POSTS.map((post) => (
              <MobileListRow key={post.slug} post={post} />
            ))}
          </div>

          {/* Desktop/tablet — featured + grid */}
          <div className="hidden sm:block">
            {featured ? <FeaturedCard post={featured} /> : null}

            {secondary.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                {secondary.map((post) => (
                  <PostCard key={post.slug} post={post} size="medium" />
                ))}
              </div>
            ) : null}

            {remaining.length > 0 ? (
              <>
                <div className="mt-14 flex items-center gap-4">
                  <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
                    Mer fra arkivet
                  </p>
                  <span aria-hidden className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {remaining.map((post) => (
                    <PostCard key={post.slug} post={post} size="small" />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* Final CTA — dark editorial block */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 14% 88%, rgba(244,206,20,0.16), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Klar for neste steg
            </p>
            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Vil du ha en nettside som
              </span>
              <span className="block text-[clamp(2.75rem,7.5vw,5.5rem)] font-black leading-[0.92] tracking-[-0.035em]">
                gir{" "}
                <span className="relative inline-block">
                  resultater
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                  />
                </span>
                ?
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="max-w-[52ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Vi hjelper norske bedrifter med a lykkes pa nett. Bestill en
              uforpliktende samtale, sa ser vi pa hva som funker for deg.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
                style={{ transitionTimingFunction: EASE }}
              >
                Kontakt oss
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ transitionTimingFunction: EASE }}
                />
              </Link>
              <Link
                href="/tjenester"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white active:scale-[0.97]"
                style={{ transitionTimingFunction: EASE }}
              >
                Se tjenestene
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
