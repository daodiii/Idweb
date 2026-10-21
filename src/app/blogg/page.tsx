import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { SEO } from "@/lib/content/seo";
import { BLOG_POSTS } from "@/lib/content/blog";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHead } from "@/components/klar/page-head";
import { PostCard } from "@/components/klar/post-card";
import { CtaCard } from "@/components/klar/cta-card";

export const metadata: Metadata = pageMetadata({ title: SEO.blog.title, description: SEO.blog.description, path: "/blogg" });

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Blogg", href: "/blogg" },
];

export default function BloggPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="ka">
      <BreadcrumbJsonLd items={CRUMBS} />

      <PageHead
        crumbs={CRUMBS}
        title="Praktiske artikler om nettsider som selger."
        lede="Skrevet for norske bedrifter. Guider og analyser om SEO, design, konvertering og digital markedsføring. Ingen jargong, bare ting du kan ta i bruk neste uke."
        after={<p className="proof">{BLOG_POSTS.length} artikler · oppdateres jevnlig</p>}
      />

      <section className="sec" aria-label="Artikler">
        <div className="wrap">
          {featured && <PostCard post={featured} lead />}
          <div className="g-posts">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaCard
        title="Vil du ha en nettside som gir resultater?"
        text="Vi hjelper norske bedrifter med å lykkes på nett. Bestill en uforpliktende samtale, så ser vi på hva som funker for deg."
        button="Kontakt oss"
      />
    </div>
  );
}
