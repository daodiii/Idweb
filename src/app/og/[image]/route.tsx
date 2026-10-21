import { notFound } from "next/navigation";
import { ogImage } from "@/lib/og";
import { ogPages } from "@/lib/og-pages";

/** Link preview images, one per page (/og/om-oss.png), rendered once at build time. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ogPages()).map((key) => ({ image: `${key}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const card = ogPages()[image.replace(/\.png$/, "")];
  if (!card) notFound();
  return ogImage(card);
}
