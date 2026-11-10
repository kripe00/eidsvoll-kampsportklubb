"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

interface OrgSeparationProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function OrgSeparation({
  title = "Organisasjonsstruktur & Medlemsadministrasjon",
  subtitle = "Eidsvoll Kampsportklubb (EKK) og Rambukk Sport AS",
  description = "For å sikre full åpenhet overfor alle våre utøvere og foresatte, ønsker vi å presisere at Eidsvoll Kampsportklubb (EKK) viderefører kampsportaktiviteten fra Rambukk Sport AS i nye lokaler på Dal. Fra og med september 2026 håndteres alle medlemskap og treningsavgifter direkte av idrettslaget (EKK).",
}: OrgSeparationProps) {
  const { locale, t } = useLanguage();

  const displayTitle = locale === "no" ? title : t.about.orgTitle;
  const displaySubtitle = locale === "no" ? subtitle : t.about.orgSubtitle;
  const displayDesc = locale === "no" ? description : t.about.orgDesc;

  return (
    <section className="py-4">
      <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-10 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {displaySubtitle}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-3">
            {displayTitle}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-3xl mb-8">
            {displayDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Historical context card */}
            <div className="bg-background border border-border/70 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-3 pb-3 border-b border-border/50">
                  <span className="text-xs font-mono font-bold text-muted-foreground">01</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {locale === "uk" ? "До вересня 2026" : locale === "pl" ? "Do września 2026" : locale === "en" ? "Until September 2026" : "Frem til september 2026"}
                  </span>
                </div>
                <h3 className="font-black uppercase tracking-tight text-foreground text-lg mb-2">
                  {locale === "uk" ? "Попередня структура" : locale === "pl" ? "Poprzednia struktura" : locale === "en" ? "Previous Structure" : "Tidligere organisering"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {locale === "uk"
                    ? "Раніше приміщення та діяльність забезпечувалися компанією Rambukk Sport AS у Рохольті."
                    : locale === "pl"
                    ? "Wcześniej infrastruktura i bieżąca działalność były prowadzone przez spółkę Rambukk Sport AS w Råholt."
                    : locale === "en"
                    ? "Previously, facilities and operations were managed through Rambukk Sport AS at Råholt."
                    : "Tidligere ble fasiliteter og drift håndtert gjennom Rambukk Sport AS på Råholt."}
                </p>
              </div>
            </div>

            {/* Current structure card */}
            <div className="bg-background border-2 border-primary/40 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-3 pb-3 border-b border-border/50">
                  <span className="text-xs font-mono font-bold text-primary">02</span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    {locale === "uk" ? "З вересня 2026" : locale === "pl" ? "Od września 2026" : locale === "en" ? "From September 2026" : "Fra september 2026"}
                  </span>
                </div>
                <h3 className="font-black uppercase tracking-tight text-foreground text-lg mb-2">
                  {locale === "uk" ? "Діяльність клубу (EKK)" : locale === "pl" ? "Działalność klubu sportowego (EKK)" : locale === "en" ? "Direct Club Operations (EKK)" : "Direkte drift hos idrettslaget (EKK)"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {locale === "uk"
                    ? "З вересня 2026 року Eidsvoll Kampsportklubb (EKK) веде всю діяльність безпосередньо як неприбутковий спортивний клуб при NIF."
                    : locale === "pl"
                    ? "Od września 2026 roku Eidsvoll Kampsportklubb (EKK) zarządza całością działalności jako stowarzyszenie non-profit zrzeszone w NIF."
                    : locale === "en"
                    ? "From September 2026, Eidsvoll Kampsportklubb (EKK) manages all operations directly as a non-profit sports club affiliated with NIF."
                    : "Fra og med september 2026 håndterer Eidsvoll Kampsportklubb (EKK) hele virksomheten som et ideelt idrettslag tilknyttet Norges Idrettsforbund (NIF)."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
