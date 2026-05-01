import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getAllSlugs, BLOG_POSTS } from "@/lib/content/blog";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

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

  return (
    <div>
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
      {/* Header */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-center gap-3 text-sm text-[var(--color-text-muted)]">
            <span>{post.category}</span>
            <span>&middot;</span>
            <time dateTime={post.publishedDate}>{post.publishedDate}</time>
            <span>&middot;</span>
            <span>{post.readingTime} lesetid</span>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-base font-light text-[var(--color-text-muted)] sm:text-lg">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          {post.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-12 first:mt-0">
              {section.heading && (
                <h2 className="text-2xl font-bold tracking-[-0.01em]">{section.heading}</h2>
              )}
              {section.paragraphs.map((paragraph, paraIndex) => (
                <p
                  key={paraIndex}
                  className="mt-4 font-light text-[var(--color-text-muted)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              {section.listItems && (
                <ul className="mt-4 space-y-3">
                  {section.listItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-1 text-[var(--color-accent)]">
                        &bull;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </article>

      {/* Related services — keyword-anchored internal links */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold tracking-[-0.01em]">
            Relaterte tjenester
          </h2>
          <ul className="mt-4 space-y-2">
            {(RELATED_SERVICES[post.category] ?? DEFAULT_RELATED).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--color-accent)] underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related articles — same category, excluding current post */}
      {(() => {
        const related = BLOG_POSTS.filter(
          (p) => p.category === post.category && p.slug !== post.slug,
        ).slice(0, 3);
        if (related.length === 0) return null;
        return (
          <section className="px-6 pb-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-bold tracking-[-0.01em]">
                Relaterte artikler
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blogg/${p.slug}`}
                      className="text-[var(--color-accent)] underline-offset-4 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })()}

      {/* Back + CTA */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-16">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-6 text-center">
          <p className="text-lg font-semibold">
            Trenger du hjelp med nettsiden din? Vi gir deg gjerne et
            uforpliktende tilbud.
          </p>
          <div className="flex gap-4">
            <Link
              href="/kontakt"
              className="rounded-lg bg-[var(--color-accent)] px-6 py-3 font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Kontakt oss
            </Link>
            <Link
              href="/blogg"
              className="rounded-lg border border-[var(--color-border)] px-6 py-3 font-semibold transition-colors hover:bg-[var(--color-bg)]"
            >
              &larr; Alle artikler
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
