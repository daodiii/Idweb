import { ServicePage } from "@/components/tjenester/service-page";
import { serviceMetadata } from "@/components/tjenester/pages";
import { HTML, SCRIPT } from "@/components/tjenester/markup/seo";
import "@/styles/a-klar.css";
import "@/styles/tjenester/seo.css";

export const metadata = serviceMetadata("seo");

export default function Page() {
  return <ServicePage slug="seo" html={HTML} script={SCRIPT} />;
}
