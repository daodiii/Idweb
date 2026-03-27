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
] as const;

/** Cover images mapped by slug — workspace/office photos without people. */
const COVER_IMAGES: Record<string, string> = {
  "tegn-paa-ny-nettside":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "hva-koster-en-nettside":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "vanlige-feil-med-nettsiden":
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
};

const FEATURED_POSTS = FEATURED_SLUGS.map(
  (slug) => BLOG_POSTS.find((p) => p.slug === slug)!,
);

function BlogCard({
  post,
  size = "small",
}: {
  post: (typeof FEATURED_POSTS)[number];
  size?: "large" | "small";
}) {
  const catColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;
  const isLarge = size === "large";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/8 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/12">
      {/* Cover image */}
      <div className="relative overflow-hidden">
        <Image
          src={COVER_IMAGES[post.slug]}
          alt={post.title}
          width={600}
          height={340}
          className={`w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105 ${
            isLarge ? "aspect-[3/2]" : "aspect-[4/3]"
          }`}
        />
        <span
          className={`absolute top-3 left-3 rounded-full border ${catColor.border} ${catColor.bg} px-3 py-1 text-xs font-medium uppercase tracking-[3px] ${catColor.text} backdrop-blur-md`}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col ${isLarge ? "px-6 py-5" : "px-5 py-4"}`}>
        <h3
          className={`font-bold tracking-[-0.01em] text-[var(--color-text)] text-pretty ${
            isLarge ? "text-lg" : "text-base"
          }`}
        >
          <Link
            href={`/blogg/${post.slug}`}
            className="hover:text-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/blogg/${post.slug}`}
            className="group/link flex items-center gap-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent-hover)]"
          >
            <span className="grid place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-2 transition-all duration-300 group-hover/link:border-[var(--color-accent)] group-hover/link:bg-[var(--color-accent)] group-hover/link:text-[var(--color-text)]">
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            Les mer
          </Link>
          <span className="text-xs text-[var(--color-text-muted)]">
            {post.readingTime}
          </span>
        </div>
      </div>
    </article>
  );
}

export function BlogArticles() {
  return (
    <section className="bg-white px-6 py-8 sm:py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-text-muted)]">
            Fra bloggen vår
          </p>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-text)] text-pretty sm:text-4xl lg:text-5xl">
            Nyttige artikler for din bedrift
          </h2>
        </div>

        {/* Mobile: compact list — 2 posts, no cover images */}
        <div className="space-y-3 sm:hidden">
          {FEATURED_POSTS.slice(0, 2).map((post) => {
            const catColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;
            return (
              <Link
                key={post.slug}
                href={`/blogg/${post.slug}`}
                className="group flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-white p-3 transition-shadow hover:shadow-md"
              >
                <div className="flex-1">
                  <span
                    className={`inline-block rounded-full border ${catColor.border} ${catColor.bg} px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[3px] ${catColor.text}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-1.5 text-sm font-bold tracking-[-0.01em] text-[var(--color-text)] text-pretty group-hover:text-[var(--color-accent-hover)]">
                    {post.title}
                  </h3>
                  <span className="mt-1 block text-[10px] text-[var(--color-text-muted)]">
                    {post.readingTime}
                  </span>
                </div>
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)] transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>

        {/* Desktop: single row — small · large · small */}
        <div className="hidden items-stretch gap-5 sm:grid sm:grid-cols-4">
          <div className="sm:col-span-1">
            <BlogCard post={FEATURED_POSTS[0]} size="small" />
          </div>
          <div className="sm:col-span-2">
            <BlogCard post={FEATURED_POSTS[1]} size="large" />
          </div>
          <div className="sm:col-span-1">
            <BlogCard post={FEATURED_POSTS[2]} size="small" />
          </div>
        </div>

        {/* Link to full blog */}
        <div className="mt-5 text-center sm:mt-8">
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
