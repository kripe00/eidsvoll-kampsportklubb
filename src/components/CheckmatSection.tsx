"use client";

import { Check } from "lucide-react";

interface CheckmatSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: { title: string; description: string }[];
}

export function CheckmatSection({
  title = "Checkmat International",
  subtitle = "Offisiell tilknytning og graderingslinje",
  description = "Eidsvoll Kampsportklubb er en offisiell Checkmat-klubb, direkte tilknyttet Checkmats grunnlegger Leo Vieira. Dette gir utøverne våre tilgang til en av verdens mest anerkjente BJJ-organisasjoner, med trygge rammer og godkjente graderinger.",
}: CheckmatSectionProps) {
  return (
    <section className="py-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
            BJJ Lineage
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
            {title}
          </h2>
          <p className="text-slate-300 font-medium text-sm md:text-base mb-4 leading-relaxed">
            {subtitle}
          </p>
          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
            {description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-white">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-white font-semibold mb-0.5">Leo Vieira Lineage</strong>
                <span className="text-slate-400 text-xs leading-normal">
                  Direkte registrert under Checkmats grunnlegger og globale hovedkvarter.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-white">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-white font-semibold mb-0.5">Godkjente beltegraderinger</strong>
                <span className="text-slate-400 text-xs leading-normal">
                  Alle graderinger følger Checkmats internasjonale krav og sertifisering.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-white">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-white font-semibold mb-0.5">Globalt nettverk</strong>
                <span className="text-slate-400 text-xs leading-normal">
                  Gjestetrening ved Checkmat-klubber i Norge og resten av verden.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-white">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-white font-semibold mb-0.5">Trygt og strukturert miljø</strong>
                <span className="text-slate-400 text-xs leading-normal">
                  Teknisk opplæring med fokus på idrettsglede, respekt og helse på matta.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
