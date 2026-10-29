import { ChatbotPage } from "@/components/tjenester/chatbot-page";
import { serviceMetadata } from "@/components/tjenester/pages";

export const metadata = serviceMetadata("ai-chatbot");

export default function Page() {
  return <ChatbotPage />;
}
