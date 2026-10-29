import { NettbutikkPage } from "@/components/tjenester/nettbutikk-page";
import { serviceMetadata } from "@/components/tjenester/pages";

export const metadata = serviceMetadata("nettbutikk");

export default function Page() {
  return <NettbutikkPage />;
}
