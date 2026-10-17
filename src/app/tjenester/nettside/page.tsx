import { ServicePage } from "@/components/tjenester/service-page";
import { serviceMetadata } from "@/components/tjenester/pages";
import { HTML, SCRIPT } from "@/components/tjenester/markup/nettside";
import "@/styles/a-klar.css";
import "@/styles/tjenester/nettside.css";

export const metadata = serviceMetadata("nettside");

export default function Page() {
  return <ServicePage slug="nettside" html={HTML} script={SCRIPT} />;
}
