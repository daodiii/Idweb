import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost, getAllSlugs } from "@/lib/content/blog";

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
    title: `${post.title} | IDweb`,
    description: post.metaDescription,
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
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-muted)]">
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
                <h2 className="text-2xl font-bold">{section.heading}</h2>
              )}
              {section.paragraphs.map((paragraph, paraIndex) => (
                <p
                  key={paraIndex}
                  className="mt-4 text-[var(--color-text-muted)] leading-relaxed"
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
