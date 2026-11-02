import Image from "next/image";

export function IdwebMark({ className }: { className?: string }) {
  return (
    <picture className={className}>
      <source media="(prefers-reduced-motion: reduce)" srcSet="/images/brand/idweb-night-signal.webp" />
      <Image src="/images/brand/idweb-night-signal.gif" alt="" width={256} height={256} unoptimized />
    </picture>
  );
}
