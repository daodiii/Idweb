import Image from "next/image";

export function IdwebWordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Image
      className="logo-word"
      src={`/images/brand/idweb-wordmark-${tone}.webp`}
      alt=""
      aria-hidden="true"
      width={1005}
      height={276}
      unoptimized
    />
  );
}
