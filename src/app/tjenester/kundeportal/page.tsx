import { ServicePage } from "@/components/tjenester/service-page";
import { serviceMetadata } from "@/components/tjenester/pages";
import { HTML, SCRIPT } from "@/components/tjenester/markup/kundeportal";
import "@/styles/a-klar.css";
import "@/styles/tjenester/kundeportal.css";

export const metadata = serviceMetadata("kundeportal");

export default function Page() {
  return <ServicePage slug="kundeportal" html={HTML} script={SCRIPT} />;
}
