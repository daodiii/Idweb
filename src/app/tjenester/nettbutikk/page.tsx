import { ServicePage } from "@/components/tjenester/service-page";
import { serviceMetadata } from "@/components/tjenester/pages";
import { HTML, SCRIPT } from "@/components/tjenester/markup/nettbutikk";
import "@/styles/a-klar.css";
import "@/styles/tjenester/nettbutikk.css";

export const metadata = serviceMetadata("nettbutikk");

export default function Page() {
  return <ServicePage slug="nettbutikk" html={HTML} script={SCRIPT} />;
}
