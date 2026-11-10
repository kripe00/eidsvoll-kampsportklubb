import type { Metadata } from "next";
import { FirstTrainingGuide } from "@/components/FirstTrainingGuide";

export const metadata: Metadata = {
  title: "Din første trening | Sjekkliste for BJJ, Muay Thai & Crosstrening",
  description:
    "Alt du trenger å vite før din første trening hos Eidsvoll Kampsportklubb i Trondheimsvegen 71B på Dal. Se skotøy, klær og gratis låneutstyr for BJJ, Muay Thai, Crosstrening, Yoga og barnepartier.",
  alternates: {
    canonical: "/forste-trening",
  },
};

export default function ForsteTreningPage() {
  return (
    <main className="bg-background min-h-screen">
      <FirstTrainingGuide id="forste-trening" />
    </main>
  );
}
