import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/content/blog";
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "@/lib/content/blog/category-colors";

const FEATURED_SLUGS = [
  "tegn-paa-ny-nettside",
  "hva-koster-en-nettside",
  "vanlige-feil-med-nettsiden",
] as const;

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

const EASE = "cubic-bezier(0.23,1,0.32,1)";

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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[0_20px_40px_-24px_rgba(10,10,10,0.12)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(10,10,10,0.18)]"
      style={{ transitionTimingFunction: EASE }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={COVER_IMAGES[post.slug]}
          alt={post.title}
          width={640}
          height={420}
          className={`w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.04] ${
            isLarge ? "aspect-[5/3]" : "aspect-[4/3]"
          }`}
          style={{ transitionTimingFunction: EASE }}
        />
        <span
          className={`absolute left-4 top-4 rounded-full border ${catColor.border} ${catColor.bg} px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${catColor.text}`}
        >
          {post.category}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${isLarge ? "px-7 py-6" : "px-6 py-5"}`}>
        <h3
          className={`font-serif font-black tracking-tight text-pretty text-[var(--color-text)] ${
            isLarge ? "text-2xl leading-[1.1] sm:text-3xl" : "text-xl leading-[1.15]"
          }`}
        >
          <Link
            href={`/blogg/${post.slug}`}
            className="hover:text-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            {post.title}
          </Link>
        </h3>
        <p className={`mt-3 flex-1 leading-relaxed text-[var(--color-text-muted)] line-clamp-2 ${
          isLarge ? "text-base" : "text-sm"
        }`}>
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

export function BlogArticles() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            Fra bloggen
          </p>
          <h2 className="mt-7 font-serif text-[var(--color-text)]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              Nyttige artikler
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              for din{" "}
              <span className="relative inline-block">
                bedrift
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>
        </div>

        <div className="space-y-3 sm:hidden">
          {FEATURED_POSTS.slice(0, 2).map((post) => {
            const catColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;
            return (
              <Link
                key={post.slug}
                href={`/blogg/${post.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
                style={{ transitionTimingFunction: EASE }}
              >
                <div className="flex-1">
                  <span
                    className={`inline-block rounded-full border ${catColor.border} ${catColor.bg} px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${catColor.text}`}
                  >
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-serif text-base font-black tracking-tight text-[var(--color-text)] text-pretty group-hover:text-[var(--color-accent-hover)]">
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
          })}
        </div>

        <div className="hidden items-stretch gap-5 sm:grid sm:grid-cols-4 lg:gap-6">
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

        <div className="mt-12 text-center">
          <Link
            href="/blogg"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-accent-hover)]"
            style={{ transitionTimingFunction: EASE }}
          >
            Se alle artikler
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
