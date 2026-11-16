import Image from "next/image";

// Shown 23-27 px tall. The dark wordmark is served at 306x84 (22 KB, not the 102 KB master); the light one is already
// small at full size, so it keeps its original file.
const SRC = {
  dark: "/images/brand/idweb-wordmark-dark-306.webp",
  light: "/images/brand/idweb-wordmark-light.webp",
} as const;

export function IdwebWordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Image
      className="logo-word"
      src={SRC[tone]}
      alt=""
      aria-hidden="true"
      width={1005}
      height={276}
      unoptimized
    />
  );
}
