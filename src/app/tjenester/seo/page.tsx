import { SeoPage } from "@/components/tjenester/seo-page";
import { serviceMetadata } from "@/components/tjenester/pages";

export const metadata = serviceMetadata("seo");

export default function Page() {
  return <SeoPage />;
}
