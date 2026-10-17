import { ServicePage } from "@/components/tjenester/service-page";
import { serviceMetadata } from "@/components/tjenester/pages";
import { HTML, SCRIPT } from "@/components/tjenester/markup/timebestilling";
import "@/styles/a-klar.css";
import "@/styles/tjenester/timebestilling.css";

export const metadata = serviceMetadata("timebestilling");

export default function Page() {
  return <ServicePage slug="timebestilling" html={HTML} script={SCRIPT} />;
}
