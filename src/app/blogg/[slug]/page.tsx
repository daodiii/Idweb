import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { getBlogPost, getAllSlugs, BLOG_POSTS } from "@/lib/content/blog";
import { coverFor } from "@/lib/content/blog/covers";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Arrow } from "@/components/home/arrow";
import { CtaCard } from "@/components/klar/cta-card";
import { PostCard } from "@/components/klar/post-card";

// Map blog category → most relevant service pages.
// Each link uses keyword-rich anchor text so Google can pick up the topic.
const RELATED_SERVICES: Record<string, { href: string; label: string }[]> = {
  SEO: [
    { href: "/tjenester/seo", label: "SEO-optimalisering for norske bedrifter" },
    { href: "/webbyra-oslo", label: "Webbyrå i Oslo" },
  ],
  Nettbutikk: [
    { href: "/tjenester/nettbutikk", label: "Nettbutikk-utvikling med trygg betaling" },
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  ],
  Design: [
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
    { href: "/webbyra-oslo", label: "Webbyrå i Oslo" },
  ],
  Teknologi: [
    { href: "/webbyra-oslo", label: "Webbyrå i Oslo" },
    { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold" },
  ],
  Priser: [
    { href: "/tjenester", label: "Se tjenestene" },
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  ],
  Tips: [
    { href: "/tjenester/seo", label: "SEO-optimalisering" },
    { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  ],
  Markedsføring: [
    { href: "/tjenester/seo", label: "SEO-optimalisering" },
    { href: "/webbyra-oslo", label: "Webbyrå i Oslo" },
  ],
  Verktøy: [
    { href: "/tjenester/seo", label: "SEO-optimalisering" },
    { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold" },
  ],
};

const DEFAULT_RELATED = [
  { href: "/webbyra-oslo", label: "Webbyrå i Oslo" },
  { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
];

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

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blogg/${slug}`,
    type: "article",
    publishedTime: post.publishedDate,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const services = RELATED_SERVICES[post.category] ?? DEFAULT_RELATED;

  return (
    <div className="ka">
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

      <header className="art-head">
        <div className="wrap">
          <nav className="crumbs" aria-label="Brødsmuler">
            <ol>
              <li>
                <Link href="/">Hjem</Link>
              </li>
              <li>
                <Link href="/blogg">Blogg</Link>
              </li>
            </ol>
          </nav>
          <p className="meta">
            <b>{post.category}</b>
            <span>{post.readingTime} lesetid</span>
            <time dateTime={post.publishedDate}>{formatPublishedDate(post.publishedDate)}</time>
          </p>
          <h1>{post.title}</h1>
          <p className="lede">{post.excerpt}</p>
          <div className="art-cover">
            <Image src={coverFor(post.slug, 1600)} alt={post.title} fill sizes="(max-width: 1200px) 100vw, 1136px" priority />
          </div>
        </div>
      </header>

      <article className="wrap">
        <div className="prose">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
              {section.listItems && (
                <ul>
                  {section.listItems.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      <CtaCard
        title="Liker du det du leser? Snakk med oss om ditt prosjekt."
        text="Vi tar en uforpliktende prat om hva som funker for din bedrift — uten salgsspråk og uten forpliktelser."
        button="Kontakt oss"
      />

      <section className="sec" aria-labelledby="relaterte-h">
        <div className="wrap g-2">
          <div className="sec-h">
            <h2 id="relaterte-h">Relaterte tjenester</h2>
          </div>
          <div className="svc-list">
            {services.map((link) => (
              <Link key={link.href} href={link.href} className="svc-row">
                <span>
                  <b>{link.label}</b>
                </span>
                <Arrow size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec alt" aria-labelledby="videre-h">
          <div className="wrap">
            <div className="refs-h">
              <h2 id="videre-h">Mer fra samme tema.</h2>
              <Link href="/blogg">
                Se alle artikler <Arrow />
              </Link>
            </div>
            <div className="g-posts">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
