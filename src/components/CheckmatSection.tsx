"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { locale, t } = useLanguage();

  const displayTitle = locale === "no" ? title : t.about.checkmatHeading;
  const displaySubtitle = locale === "no" ? subtitle : t.about.checkmatSubheading;
  const displayDesc = locale === "no" ? description : t.about.checkmatDesc;

  return (
    <section className="py-4">
      <div className="bg-muted/30 border border-border/60 text-foreground rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
            {t.about.checkmatBadge}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-2">
            {displayTitle}
          </h2>
          <p className="text-foreground font-semibold text-sm md:text-base mb-3 leading-relaxed">
            {displaySubtitle}
          </p>
          <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-6">
            {displayDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/40 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-foreground font-semibold mb-0.5 text-xs sm:text-sm">
                  {locale === "no" ? "Leo Vieira Lineage" : t.about.checkmatPoint1Title}
                </strong>
                <span className="text-muted-foreground text-xs leading-normal">
                  {locale === "no"
                    ? "Direkte registrert under Checkmats grunnlegger og globale hovedkvarter."
                    : t.about.checkmatPoint1Desc}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-foreground font-semibold mb-0.5 text-xs sm:text-sm">
                  {locale === "no" ? "Godkjente beltegraderinger" : t.about.checkmatPoint2Title}
                </strong>
                <span className="text-muted-foreground text-xs leading-normal">
                  {locale === "no"
                    ? "Alle graderinger følger Checkmats internasjonale krav og sertifisering."
                    : t.about.checkmatPoint2Desc}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-foreground font-semibold mb-0.5 text-xs sm:text-sm">
                  {locale === "no" ? "Globalt nettverk" : t.about.checkmatPoint3Title}
                </strong>
                <span className="text-muted-foreground text-xs leading-normal">
                  {locale === "no"
                    ? "Gjestetrening ved Checkmat-klubber i Norge og resten av verden."
                    : t.about.checkmatPoint3Desc}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="block text-foreground font-semibold mb-0.5 text-xs sm:text-sm">
                  {locale === "uk" ? "Безпечне та професійне середовище" : locale === "pl" ? "Bezpieczne i profesjonalne środowisko" : locale === "en" ? "Safe and Professional Environment" : "Trygt og strukturert miljø"}
                </strong>
                <span className="text-muted-foreground text-xs leading-normal">
                  {locale === "uk"
                    ? "Технічне навчання з акцентом на радість від спорту, повагу та здоров’я на татамі."
                    : locale === "pl"
                    ? "Szkolenie techniczne ukierunkowane na radość z uprawiania sportu, wzajemny szacunek i zdrowie na macie."
                    : locale === "en"
                    ? "Technical instruction emphasizing sporting enjoyment, safety, respect, and mutual support on the mats."
                    : "Teknisk opplæring med fokus på idrettsglede, respekt og helse på matta."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
