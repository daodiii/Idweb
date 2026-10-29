import { NettsidePage } from "@/components/tjenester/nettside-page";
import { serviceMetadata } from "@/components/tjenester/pages";

export const metadata = serviceMetadata("nettside");

export default function Page() {
  return <NettsidePage />;
}
