import type { Metadata } from "next";
import { CompetitionGuide } from "@/components/CompetitionGuide";

export const metadata: Metadata = {
  title: "Konkurranse & IBJJF-regler | Smoothcomp & BJJ Stevneguide",
  description:
    "Interaktiv regelmotor for brasiliansk jiu-jitsu basert på IBJJF Rules Book 2027 (Gi og No-Gi), alders- og belteklasser, kamptid, poengsystem, draktkrav og Smoothcomp-guide for Eidsvoll Kampsportklubb.",
  keywords: [
    "IBJJF regler",
    "IBJJF 2027",
    "BJJ regler",
    "brasiliansk jiu-jitsu konkurranse",
    "Smoothcomp",
    "lovlige teknikker BJJ",
    "Eidsvoll Kampsportklubb",
  ],
  alternates: {
    canonical: "/konkurranse",
  },
};

export default function KonkurransePage() {
  return (
    <main className="bg-background min-h-screen">
      <CompetitionGuide id="konkurranse" />
    </main>
  );
}
