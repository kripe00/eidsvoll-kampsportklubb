import type { Metadata } from "next";
import { PersonvernPageClient } from "@/components/PersonvernPageClient";

export const metadata: Metadata = {
  title: "Personvern og informasjonskapsler (Cookies) | Eidsvoll Kampsportklubb",
  description:
    "Les om hvordan Eidsvoll Kampsportklubb ivaretar ditt personvern, hvilke informasjonskapsler vi bruker, og hvordan du administrerer dine samtykker.",
  alternates: {
    canonical: "/personvern",
  },
};

export default function PersonvernPage() {
  return <PersonvernPageClient />;
}
