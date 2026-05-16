import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { getBlogPost, getAllSlugs, BLOG_POSTS } from "@/lib/content/blog";
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "@/lib/content/blog/category-colors";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

// Map blog category → most relevant service pages.
// Each link uses keyword-rich anchor text so Google can pick up the topic.
const RELATED_SERVICES: Record<string, { href: string; label: string }[]> = {
  SEO: [
    { href: "/tjenester/seo", label: "SEO-optimalisering for norske bedrifter" },
    { href: "/tjenester/webutvikler-oslo", label: "Webutvikler i Oslo" },
  ],
  Nettbutikk: [
    { href: "/tjenester/nettbutikk", label: "Nettbutikk-utvikling med Vipps og Stripe" },
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  ],
  Design: [
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
    { href: "/tjenester/webutvikler-oslo", label: "Webutvikler i Oslo" },
  ],
  Teknologi: [
    { href: "/tjenester/webutvikler-oslo", label: "Webutvikler i Oslo" },
    { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold" },
  ],
  Priser: [
    { href: "/priser", label: "Se alle priser" },
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  ],
  Tips: [
    { href: "/tjenester/seo", label: "SEO-optimalisering" },
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  ],
  Markedsføring: [
    { href: "/tjenester/seo", label: "SEO-optimalisering" },
    { href: "/tjenester/webutvikler-oslo", label: "Webutvikler i Oslo" },
  ],
  Markedsforing: [
    { href: "/tjenester/seo", label: "SEO-optimalisering" },
    { href: "/tjenester/webutvikler-oslo", label: "Webutvikler i Oslo" },
  ],
  Verktøy: [
    { href: "/tjenester/seo", label: "SEO-optimalisering" },
    { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold" },
  ],
};

const DEFAULT_RELATED = [
  { href: "/tjenester/webutvikler-oslo", label: "Webutvikler i Oslo" },
  { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
];

// Cover images — keyed by slug. Kept here to mirror the blogg index page.
const BLOG_COVER_IMAGES: Record<string, string> = {
  "webdesigntrender-2026":
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1600&q=80",
  konverteringsoptimalisering:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
  "velge-riktig-webdesignbyra":
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80",
  "wordpress-vs-skreddersydd":
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80",
  "google-analytics-guide":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
  "seo-for-nybegynnere":
    "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=1600&q=80",
  mobiloptimalisering:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80",
  "tegn-paa-ny-nettside":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
  "vanlige-feil-med-nettsiden":
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80",
  "sosiale-medier-for-bedrifter":
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
  "hva-koster-en-nettside":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
  "nettbutikk-guide":
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=80",
};

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80";

function coverFor(slug: string): string {
  return BLOG_COVER_IMAGES[slug] ?? FALLBACK_COVER;
}

// Format an ISO-ish date string to Norwegian locale (e.g. "3. februar 2026").
function formatPublishedDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsed);
  } catch {
    return iso;
  }
}

// Split the headline into three rough lines for the editorial treatment.
// We pick a "load-bearing" word (heuristic: longest content word in the middle
// portion) to receive the yellow underline. Falls back to the last word of the
// middle slice if the heuristic fails.
function splitTitleIntoLines(title: string): {
  setup: string;
  emphasis: { before: string; word: string; after: string };
  resolution: string;
} {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return {
      setup: "",
      emphasis: { before: "", word: title, after: "" },
      resolution: "",
    };
  }
  // Roughly: first third = setup, middle = emphasis line, last third = resolution.
  const total = words.length;
  const firstCut = Math.max(1, Math.floor(total / 3));
  const secondCut = Math.max(firstCut + 1, Math.ceil((total * 2) / 3));
  const setup = words.slice(0, firstCut).join(" ");
  const middle = words.slice(firstCut, secondCut);
  const resolution = words.slice(secondCut).join(" ");

  // Pick the longest non-stopword in the middle as the load-bearing word.
  const STOPWORDS = new Set([
    "og", "eller", "men", "som", "for", "med", "i", "på", "av", "til", "en",
    "et", "ei", "den", "det", "de", "er", "var", "skal", "kan", "ikke", "om",
    "the", "a", "an", "and", "or",
  ]);
  let word = middle[middle.length - 1] ?? "";
  let best = -1;
  for (const w of middle) {
    const stripped = w.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
    if (stripped.length > best && !STOPWORDS.has(stripped)) {
      best = stripped.length;
      word = w;
    }
  }
  const wordIndex = middle.indexOf(word);
  const before = middle.slice(0, wordIndex).join(" ");
  const after = middle.slice(wordIndex + 1).join(" ");

  return {
    setup,
    emphasis: { before, word, after },
    resolution,
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `/blogg/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedDate,
      authors: ["IDweb"],
      locale: "nb_NO",
      siteName: "IDweb",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const catColor =
    CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;
  const cover = coverFor(post.slug);
  const titleLines = splitTitleIntoLines(post.title);
  const formattedDate = formatPublishedDate(post.publishedDate);
  const related = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.slug !== post.slug,
  ).slice(0, 3);
  const services =
    RELATED_SERVICES[post.category] ?? DEFAULT_RELATED;

  return (
    <div className="bg-[var(--color-bg)]">
      <BlogPostJsonLd
        title={post.title}
        description={post.metaDescription}
        slug={post.slug}
        publishedDate={post.publishedDate}
        category={post.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Blogg", href: "/blogg" },
          { name: post.title, href: `/blogg/${post.slug}` },
        ]}
      />

      {/* Article header — editorial hero on light */}
      <section className="relative overflow-hidden bg-[var(--color-bg)] px-6 pb-12 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 12% 18%, rgba(244,206,20,0.14), transparent 62%)",
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

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Back link */}
          <Link
            href="/blogg"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] transition-colors duration-150 hover:text-[var(--color-text)]"
            style={{ transitionTimingFunction: EASE }}
          >
            <ArrowLeft
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              style={{ transitionTimingFunction: EASE }}
            />
            Alle artikler
          </Link>

          {/* Category pill (editorial mono pill) */}
          <div className="mt-8">
            <span
              className={`inline-block rounded-full border ${catColor.border} ${catColor.bg} px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] ${catColor.text}`}
            >
              {post.category}
            </span>
          </div>

          {/* Editorial three-line headline */}
          <h1 className="mt-7 font-serif text-[var(--color-text)]">
            {titleLines.setup ? (
              <span className="block text-[clamp(1.75rem,4vw,3rem)] font-extralight leading-[1.08] tracking-[-0.01em] text-[var(--color-text)]/70">
                {titleLines.setup}
              </span>
            ) : null}
            <span className="block text-[clamp(2.25rem,6.5vw,4.75rem)] font-black leading-[0.96] tracking-[-0.035em]">
              {titleLines.emphasis.before ? (
                <span>{titleLines.emphasis.before} </span>
              ) : null}
              <span className="relative inline-block">
                {titleLines.emphasis.word}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
              {titleLines.emphasis.after ? (
                <span> {titleLines.emphasis.after}</span>
              ) : null}
            </span>
            {titleLines.resolution ? (
              <span className="block text-[clamp(1.75rem,4vw,3rem)] font-extralight leading-[1.08] tracking-[-0.01em] text-[var(--color-text)]/70">
                {titleLines.resolution}
              </span>
            ) : null}
          </h1>

          {/* Metadata row — mono uppercase */}
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-px w-6 bg-[#F4CE14]" />
              IDweb
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-text-muted)]/50" />
            <span>{post.readingTime} lesetid</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-text-muted)]/50" />
            <time dateTime={post.publishedDate}>{formattedDate}</time>
          </div>

          {/* Excerpt — body intro */}
          <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            {post.excerpt}
          </p>

          {/* Hero cover image */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--color-border)]">
            <Image
              src={cover}
              alt={post.title}
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 960px"
              className="aspect-[16/9] w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Article body — clean centered reading column */}
      <article className="bg-[var(--color-bg)] px-6 pb-20 pt-4 sm:pb-24">
        <div className="mx-auto max-w-[68ch]">
          {post.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-12 first:mt-0">
              {section.heading ? (
                <h2 className="mt-14 font-serif text-[clamp(1.5rem,2.6vw,2rem)] font-black leading-[1.15] tracking-[-0.02em] text-[var(--color-text)]">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((paragraph, paraIndex) => (
                <p
                  key={paraIndex}
                  className="mt-5 text-[1.0625rem] leading-[1.75] text-[var(--color-text)]/82 sm:text-[1.125rem]"
                >
                  {paragraph}
                </p>
              ))}
              {section.listItems ? (
                <ul className="mt-6 space-y-3">
                  {section.listItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-[1.0625rem] leading-[1.7] text-[var(--color-text)]/82 sm:text-[1.125rem]"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.7em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#F4CE14]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </article>

      {/* End-of-article CTA — small editorial block on cream/light */}
      <section className="bg-[var(--color-bg)] px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-[68ch]">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[0_24px_50px_-30px_rgba(10,10,10,0.14)] sm:p-10">
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
              Snakk med oss
            </p>
            <h2 className="mt-5 font-serif text-[clamp(1.5rem,3.2vw,2.25rem)] font-black leading-[1.05] tracking-[-0.025em] text-[var(--color-text)]">
              Liker du det du leser? Snakk med oss om{" "}
              <span className="relative inline-block">
                ditt prosjekt
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[var(--color-text-muted)]">
              Vi tar en uforpliktende prat om hva som funker for din bedrift —
              uten salgsspråk og uten forpliktelser.
            </p>
            <div className="mt-7">
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
            </div>
          </div>
        </div>
      </section>

      {/* Related services — keyword-anchored internal links */}
      <section className="bg-[var(--color-bg)] px-6 pb-12">
        <div className="mx-auto max-w-[68ch]">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            Relaterte tjenester
          </p>
          <ul className="mt-6 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {services.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between py-4 transition-colors duration-150 hover:text-[var(--color-accent-hover)]"
                  style={{ transitionTimingFunction: EASE }}
                >
                  <span className="text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent-hover)] sm:text-lg">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent-hover)]"
                    style={{ transitionTimingFunction: EASE }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related posts — three small cards mirroring blog-articles.tsx */}
      {related.length > 0 ? (
        <section className="bg-[var(--color-bg)] px-6 pb-24 pt-12 sm:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
                  Les videre
                </p>
                <h2 className="mt-5 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-black leading-[1.05] tracking-[-0.025em] text-[var(--color-text)]">
                  Mer fra samme tema.
                </h2>
              </div>
              <Link
                href="/blogg"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-accent-hover)]"
                style={{ transitionTimingFunction: EASE }}
              >
                Se alle artikler
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ transitionTimingFunction: EASE }}
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((p) => {
                const c =
                  CATEGORY_COLORS[p.category] ?? DEFAULT_CATEGORY_COLOR;
                return (
                  <article
                    key={p.slug}
                    className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[0_20px_40px_-24px_rgba(10,10,10,0.12)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(10,10,10,0.18)]"
                    style={{ transitionTimingFunction: EASE }}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={coverFor(p.slug)}
                        alt={p.title}
                        width={800}
                        height={600}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.04]"
                        style={{ transitionTimingFunction: EASE }}
                      />
                      <span
                        className={`absolute left-4 top-4 rounded-full border ${c.border} ${c.bg} px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${c.text}`}
                      >
                        {p.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col px-6 py-5">
                      <h3 className="font-serif text-xl font-black leading-[1.15] tracking-tight text-pretty text-[var(--color-text)]">
                        <Link
                          href={`/blogg/${p.slug}`}
                          className="hover:text-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
                        {p.excerpt}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                        <Link
                          href={`/blogg/${p.slug}`}
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
                          {p.readingTime}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
