import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samtykke for bildedeling av barn",
  description: "Samtykkeskjema for fotografering og deling av bilder/film av barn i regi av Eidsvoll Kampsportklubb.",
};

export default function SamtykkePage() {
  return (
    <main className="bg-background min-h-screen pb-32">
      {/* Editorial Header */}
      <div className="pt-32 bg-muted/30 border-b border-border/40 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl font-black uppercase tracking-tighter">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-foreground uppercase leading-[0.95] md:leading-[0.85] break-words">
            Samtykke for bildedeling
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-700 leading-relaxed font-light italic">
            Samtykkeskjema for fotografering og deling av bilder og film av barn i Eidsvoll Kampsportklubb.
          </p>
        </div>
      </div>

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
