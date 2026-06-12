"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { BLOG_POSTS } from "@/lib/content/blog";
import { EASE, INK, PAPER, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Articles — a compact editorial strip. Three featured guides as
 * numbered plates that lift on hover.
 */

const FEATURED_SLUGS = [
  "tegn-paa-ny-nettside",
  "hva-koster-en-nettside",
  "vanlige-feil-med-nettsiden",
];

const POSTS = FEATURED_SLUGS.flatMap((slug) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  return post ? [post] : [];
});

export function ArticlesStrip() {
  return (
    <section style={{ backgroundColor: PAPER, color: INK }}>
      <div className="border-t px-[3vw] py-20 sm:py-24" style={{ borderColor: "rgba(20,20,16,0.18)" }}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
            <span className="block overflow-hidden">
              <motion.span
                variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
                className="block text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.04em]"
              >
                Nyttige artikler for din bedrift
              </motion.span>
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <Link
              href="/blogg"
              className="inline-flex items-center gap-2 border-b-2 pb-0.5 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-60"
              style={{ borderColor: INK }}
            >
              Se alle artikler
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
            >
              <Link
                href={`/blogg/${post.slug}`}
                className="group flex h-full flex-col justify-between gap-10 rounded-xl border-2 p-6 transition-transform duration-300 hover:-translate-y-1.5 sm:p-7"
                style={{ borderColor: INK }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm" style={{ color: "rgba(20,20,16,0.45)" }}>
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-snug tracking-[-0.02em] sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(20,20,16,0.5)" }}>
                    {post.category} · {post.readingTime}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
