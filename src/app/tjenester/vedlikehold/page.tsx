import { VedlikeholdPage } from "@/components/tjenester/vedlikehold-page";
import { serviceMetadata } from "@/components/tjenester/pages";

export const metadata = serviceMetadata("vedlikehold");

export default function Page() {
  return <VedlikeholdPage />;
}
