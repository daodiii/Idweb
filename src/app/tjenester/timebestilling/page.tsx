import { TimebestillingPage } from "@/components/tjenester/timebestilling-page";
import { serviceMetadata } from "@/components/tjenester/pages";

export const metadata = serviceMetadata("timebestilling");

export default function Page() {
  return <TimebestillingPage />;
}
