import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { BLOG_POSTS } from "@/lib/content/blog";
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
} from "@/lib/content/blog/category-colors";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: SEO.blog.title,
  description: SEO.blog.description,
  keywords: SEO.blog.keywords,
  alternates: {
    canonical: "/blogg",
  },
};

const BLOG_COVER_IMAGES: Record<string, string> = {
  "webdesigntrender-2026":
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80",
  "konverteringsoptimalisering":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "velge-riktig-webdesignbyra":
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  "wordpress-vs-skreddersydd":
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
  "google-analytics-guide":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "seo-for-nybegynnere":
    "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&q=80",
  "mobiloptimalisering":
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

export default function BloggPage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Blogg", href: "/blogg" },
        ]}
      />
      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Tips og innsikt for din bedrift
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light text-[var(--color-text-muted)] sm:text-lg">
            Praktiske artikler om nettsider, SEO, digital markedsføring og alt
            du trenger for å lykkes på nett. Skrevet av oss, for norske
            bedrifter.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-accent)]/10"
            >
              {/* Cover image */}
              {BLOG_COVER_IMAGES[post.slug] && (
                <div className="relative overflow-hidden">
                  <Image
                    src={BLOG_COVER_IMAGES[post.slug]}
                    alt={post.title}
                    width={800}
                    height={450}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {(() => {
                    const catColor = CATEGORY_COLORS[post.category] ?? DEFAULT_CATEGORY_COLOR;
                    return (
                      <span className={`absolute left-3 top-3 rounded-full border ${catColor.border} ${catColor.bg} px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${catColor.text} backdrop-blur-md`}>
                        {post.category}
                      </span>
                    );
                  })()}
                </div>
              )}

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-2 text-lg font-bold tracking-[-0.01em] leading-snug">
                  <Link
                    href={`/blogg/${post.slug}`}
                    className="transition-colors hover:text-[var(--color-accent)]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blogg/${post.slug}`}
                  className="mt-4 text-sm font-medium text-[var(--color-accent)] transition-colors hover:underline"
                >
                  Les artikkelen &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA — Yellow gradient */}
      <section className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-bg)]">
            Vil du ha en nettside som faktisk gir resultater?
          </h2>
          <p className="mt-4 text-base font-light text-[var(--color-dark-bg)]/70 sm:text-lg">
            Vi hjelper norske bedrifter med å lykkes på nett. Kontakt oss for en
            uforpliktende samtale.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-block rounded-lg bg-[var(--color-dark-bg)] px-8 py-3 text-lg font-semibold text-[var(--color-dark-text)] transition-colors hover:bg-[var(--color-dark-bg-alt)]"
          >
            Kontakt oss i dag
          </Link>
        </div>
      </section>
    </div>
  );
}
