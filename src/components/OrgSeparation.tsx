"use client";

import { Building, ShieldAlert } from "lucide-react";
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
      <div className="bg-muted/30 border border-primary/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        {/* Decorative background blur element */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-2">
            {displayTitle}
          </h2>
          <p className="text-primary font-bold text-sm sm:text-base mb-3">
            {displaySubtitle}
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-3xl mb-6">
            {displayDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Historical context card */}
            <div className="bg-background/80 backdrop-blur-sm border border-border/60 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-foreground text-lg">
                      {locale === "pl" ? "Poprzednia struktura" : locale === "en" ? "Previous Structure" : "Tidligere organisering"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {locale === "pl" ? "Do września 2026" : locale === "en" ? "Until September 2026" : "Frem til september 2026"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {locale === "pl"
                    ? "Wcześniej infrastruktura i bieżąca działalność były prowadzone przez spółkę Rambukk Sport AS w Råholt."
                    : locale === "en"
                    ? "Previously, facilities and operations were managed through Rambukk Sport AS at Råholt."
                    : "Tidligere ble fasiliteter og drift håndtert gjennom Rambukk Sport AS på Råholt."}
                </p>
              </div>
            </div>

            {/* Current structure card */}
            <div className="bg-primary/5 border border-primary/30 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-foreground text-lg">
                      {locale === "pl" ? "Działalność klubu sportowego (EKK)" : locale === "en" ? "Direct Club Operations (EKK)" : "Direkte drift hos idrettslaget (EKK)"}
                    </h3>
                    <p className="text-xs text-primary font-bold">
                      {locale === "pl" ? "Od września 2026" : locale === "en" ? "From September 2026" : "Fra september 2026"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {locale === "pl"
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
