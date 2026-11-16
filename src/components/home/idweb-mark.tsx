import Image from "next/image";

/**
 * The animated Night Signal mark. Shown at 40 px, so the six-second animation is served as a 120 px animated WebP
 * (about 137 KB) instead of the 256 px GIF (339 KB); the GIF stays in public/ as the master. The header passes
 * `eager` because the mark is above the fold on every page; the footer copy keeps lazy loading.
 */
export function IdwebMark({ className, eager = false }: { className?: string; eager?: boolean }) {
  return (
    <picture className={className}>
      <source media="(prefers-reduced-motion: reduce)" srcSet="/images/brand/idweb-night-signal.webp" />
      <Image
        src="/images/brand/idweb-night-signal-anim.webp"
        alt=""
        width={120}
        height={120}
        unoptimized
        loading={eager ? "eager" : "lazy"}
      />
    </picture>
  );
}
