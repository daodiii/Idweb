import { KundeportalPage } from "@/components/tjenester/kundeportal-page";
import { serviceMetadata } from "@/components/tjenester/pages";

export const metadata = serviceMetadata("kundeportal");

export default function Page() {
  return <KundeportalPage />;
}
