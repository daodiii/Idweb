import Image from "next/image";
import Link from "next/link";
import { coverFor } from "@/lib/content/blog/covers";
import { Arrow } from "@/components/home/arrow";
import type { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
  /** The large first card on /blogg: picture left, text right, h2 instead of h3. */
  lead?: boolean;
}

/** One article as a whole-card link: cover, category and reading time, title, excerpt. */
export function PostCard({ post, lead }: PostCardProps) {
  const Title = lead ? "h2" : "h3";
  return (
    <Link href={`/blogg/${post.slug}`} className={`post${lead ? " lead" : ""}`}>
      <span className="shot">
        <Image
          src={coverFor(post.slug, lead ? 1600 : 800)}
          alt=""
          fill
          sizes={lead ? "(max-width: 900px) 100vw, 680px" : "(max-width: 560px) 104px, (max-width: 900px) 50vw, 370px"}
          priority={lead}
        />
      </span>
      <span className="meta">
        {post.category} · {post.readingTime} lesetid
      </span>
      <Title>{post.title}</Title>
      <p>{post.excerpt}</p>
      {lead && (
        <span className="more">
          Les artikkel <Arrow />
        </span>
      )}
    </Link>
  );
}
