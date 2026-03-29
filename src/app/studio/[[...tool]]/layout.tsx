import {
  metadata as studioMetadata,
  viewport as studioViewport,
} from "next-sanity/studio";

export const metadata = {
  ...studioMetadata,
  title: "IDweb Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  ...studioViewport,
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
