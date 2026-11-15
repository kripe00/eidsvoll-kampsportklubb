import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Samtykke for bildedeling av barn",
  description: "Samtykkeskjema for fotografering og deling av bilder/film av barn i regi av Eidsvoll Kampsportklubb.",
};

export default function SamtykkePage() {
  return (
    <main className="bg-background min-h-screen pb-32">
      {/* Editorial Header */}
      <PageHeader
        title="Samtykke for bildedeling"
        description="Samtykkeskjema for fotografering og deling av bilder og film av barn i Eidsvoll Kampsportklubb."
        descriptionClassName="font-light italic"
      />

      {/* Responsive Wrapper for Google Form Iframe */}
      <div className="container mx-auto px-4 lg:px-8 py-16 flex justify-center">
        <div className="w-full max-w-[700px] bg-white rounded-2xl shadow-sm border border-slate-100/80 p-1 sm:p-4 overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdhJiAnCKfbReuBUNuKfA9rqAfig3h5stft-edY9qxl43BWwA/viewform?embedded=true"
            width="100%"
            height="2460"
            style={{ border: 0, display: "block" }}
            title="Samtykkeskjema for bildedeling av barn"
          >
            Laster inn …
          </iframe>
        </div>
      </div>
    </main>
  );
}
