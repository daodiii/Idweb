import { ServicePage } from "@/components/tjenester/service-page";
import { serviceMetadata } from "@/components/tjenester/pages";
import { HTML, SCRIPT } from "@/components/tjenester/markup/vedlikehold";
import "@/styles/a-klar.css";
import "@/styles/tjenester/vedlikehold.css";

export const metadata = serviceMetadata("vedlikehold");

export default function Page() {
  return <ServicePage slug="vedlikehold" html={HTML} script={SCRIPT} />;
}
