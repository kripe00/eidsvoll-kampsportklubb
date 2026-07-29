"use client";

import { Award, ShieldCheck, Globe, CheckCircle2, Sparkles, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckmatFeature {
  title: string;
  description: string;
  icon: string;
}

interface CheckmatSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: CheckmatFeature[];
}

const defaultFeatures: CheckmatFeature[] = [
  {
    title: "Verdensklasse BJJ-standard",
    description:
      "Strukturert og teknisk BJJ-trening bygd på konseptene fra et av verdens mest fremgangsrike og vinnende kampsportakademier.",
    icon: "Award",
  },
  {
    title: "Internasjonale beltegraderinger",
    description:
      "Alle beltegraderinger hos Eidsvoll Kampsportklubb er offisielt registrert og godkjent under Leo Vieira og Checkmats globale hovedkvarter.",
    icon: "ShieldCheck",
  },
  {
    title: "Åpent globalt nettverk",
    description:
      "Som utøver i en offisiell Checkmat-klubb står dørene åpne for trening ved Checkmat-akademier verden over når du reiser.",
    icon: "Globe",
  },
];

export function CheckmatSection({
  title = "Offisiell Checkmat Affiliate",
  subtitle = "Brasiliansk Jiu-Jitsu i verdensklasse under Leo Vieira",
  description = "Eidsvoll Kampsportklubb er stolt offisiell Checkmat-klubb, direkte tilknyttet Checkmats grunnlegger Leo Vieira og det globale hovedkvarteret. Hos oss kombinerer vi elite-BJJ med et kompromissløst fokus på utøvernes trygghet, helse og gode verdier.",
  features = defaultFeatures,
}: CheckmatSectionProps) {
  const displayFeatures = features && features.length > 0 ? features : defaultFeatures;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-6 h-6 text-indigo-400" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-indigo-400" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-6 h-6 text-indigo-400" />;
      case "Award":
      default:
        return <Award className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <section className="py-12">
      <div className="border border-indigo-500/30 bg-gradient-to-b from-indigo-950/20 via-background to-background rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Offisiell Lineage & Affiliasjon</span>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-indigo-400 text-lg sm:text-xl font-extrabold mb-4">
              {subtitle}
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {description}
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {displayFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-card/80 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                    {renderIcon(feature.icon)}
                  </div>
                  <h3 className="font-extrabold text-foreground text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Value callout footer */}
          <div className="border-t border-indigo-500/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Direkte tilknyttet grunnlegger <strong>Leo Vieira</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Fokus på trygghet, miljø og idrettsglede</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
