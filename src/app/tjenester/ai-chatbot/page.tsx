import { ServicePage } from "@/components/tjenester/service-page";
import { serviceMetadata } from "@/components/tjenester/pages";
import { HTML, SCRIPT } from "@/components/tjenester/markup/ai-chatbot";
import "@/styles/a-klar.css";
import "@/styles/tjenester/ai-chatbot.css";

export const metadata = serviceMetadata("ai-chatbot");

export default function Page() {
  return <ServicePage slug="ai-chatbot" html={HTML} script={SCRIPT} />;
}
