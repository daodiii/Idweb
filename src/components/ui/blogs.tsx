import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content/blog";
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "@/lib/content/blog/category-colors";

/** Hand-picked slugs for the landing page — most relevant to prospects. */
const FEATURED_SLUGS = [
  "tegn-paa-ny-nettside",
  "hva-koster-en-nettside",
  "vanlige-feil-med-nettsiden",
  "seo-for-nybegynnere",
  "wordpress-vs-skreddersydd",
] as const;

/** Cover images mapped by slug — workspace/office photos without people. */
const COVER_IMAGES: Record<string, string> = {
  "tegn-paa-ny-nettside":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "hva-koster-en-nettside":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "vanlige-feil-med-nettsiden":
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  "seo-for-nybegynnere":
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
  "wordpress-vs-skreddersydd":
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
};

const FEATURED_POSTS = FEATURED_SLUGS.map(
  (slug) => BLOG_POSTS.find((p) => p.slug === slug)!,
);

function BlogCard({
  post,
  isHero = false,
}: {
  post: (typeof FEATURED_POSTS)[number];
  isHero?: boolean;
}) {
  const catColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-black/[0.04] transition-[transform,box-shadow] duration-300 motion-reduce:transition-none hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[var(--color-accent)]/8 ${
        isHero ? "sm:col-span-2 sm:flex-row" : ""
      }`}
    >
      {/* Cover image */}
      <div className={`relative overflow-hidden ${isHero ? "sm:w-3/5" : ""}`}>
        <Image
          src={COVER_IMAGES[post.slug]}
          alt={post.title}
          width={800}
          height={450}
          className={`w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105 ${
            isHero ? "aspect-[16/10] sm:aspect-auto sm:h-full" : "aspect-[16/10]"
          }`}
        />
        <span
          className={`absolute top-3 left-3 rounded-full border ${catColor.border} ${catColor.bg} px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${catColor.text} backdrop-blur-md`}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div
        className={`flex flex-1 flex-col px-5 pb-5 pt-6 ${
          isHero ? "sm:justify-center sm:px-8 sm:py-8" : ""
        }`}
      >
        <h3
          className={`font-semibold tracking-tight text-[var(--color-text)] text-pretty ${
            isHero
              ? "text-lg sm:text-xl md:text-2xl"
              : "text-base sm:text-lg md:text-xl"
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
          className={`mt-3 flex-1 leading-relaxed text-[var(--color-text-muted)] ${
            isHero ? "text-sm sm:text-base line-clamp-4" : "text-sm line-clamp-3"
          }`}
        >
          {post.excerpt}
        </p>

        {/* Footer: read more + meta */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/blogg/${post.slug}`}
            className="group/link flex items-center gap-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            <span className="grid place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-2 transition-all duration-300 group-hover/link:border-[var(--color-accent)] group-hover/link:bg-[var(--color-accent)] group-hover/link:text-[var(--color-text)] sm:p-2.5">
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            Les mer
          </Link>
          <span className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)] sm:gap-3 sm:text-xs">
            {post.readingTime} lesetid
            <span className="w-6 border-t border-[var(--color-border)] sm:w-12" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function BlogArticles() {
  return (
    <section className="light-section-warm-alt px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
            Fra bloggen vår
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)] text-pretty sm:text-5xl lg:text-6xl">
            Nyttige artikler for din bedrift
          </h2>
        </div>

        {/* Articles grid — first card is hero spanning 2 cols */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_POSTS.map((post, i) => (
            <BlogCard key={post.slug} post={post} isHero={i === 0} />
          ))}
        </div>

        {/* Link to full blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blogg"
            className="text-sm font-medium text-[var(--color-accent-hover)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            Se alle artikler &#8594;
          </Link>
        </div>
      </div>
    </section>
  );
}
