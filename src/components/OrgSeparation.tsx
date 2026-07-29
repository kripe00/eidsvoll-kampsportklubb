"use client";

import { Info, CreditCard, ShieldAlert, ArrowRight, Building } from "lucide-react";

interface OrgSeparationProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export function OrgSeparation({
  title = "Organisasjonsstruktur & Medlemsadministrasjon",
  subtitle = "Eidsvoll Kampsportklubb (EKK) og Rambukk",
  description = "For å sikre full åpenhet overfor alle våre utøvere og foresatte, ønsker vi å klargjøre at Eidsvoll Kampsportklubb (EKK) viderefører kampsportaktiviteten fra Rambukk i nye lokaler på Dal. Fra og med september 2026 håndteres alle medlemskap og treningsavgifter direkte av idrettslaget (EKK).",
}: OrgSeparationProps) {
  return (
    <section className="py-4">
      <div className="bg-muted/30 border border-primary/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        {/* Decorative background blur element */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-primary font-bold text-sm sm:text-base mb-3">
            {subtitle}
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-3xl mb-6">
            {description}
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
                    <h3 className="font-extrabold text-foreground text-lg">Tidligere organisering</h3>
                    <p className="text-xs text-muted-foreground">Frem til september 2026</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tidligere ble fasiliteter og drift håndtert gjennom Rambukk Sport AS på Råholt.
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
                    <h3 className="font-extrabold text-foreground text-lg">Direkte drift hos idrettslaget (EKK)</h3>
                    <p className="text-xs text-primary font-bold">Fra september 2026</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fra og med <strong>september 2026</strong> håndterer <strong>Eidsvoll Kampsportklubb (EKK)</strong> hele virksomheten som et ideelt idrettslag tilknyttet Norges Idrettsforbund (NIF).
                </p>
              </div>
            </div>
          </div>

          {/* Key takeaway highlight box */}
          <div className="mt-8 bg-background border-l-4 border-primary p-5 rounded-r-xl text-sm leading-relaxed shadow-sm">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground font-bold block mb-1">
                  Direkte medlemsstyring hos klubben (EKK):
                </strong>
                <span className="text-muted-foreground">
                  Alle medlemskap, innkreving av treningsavgift, utmeldinger og henvendelser håndteres nå <strong>utelukkende direkte av Eidsvoll Kampsportklubb (EKK)</strong>. Utmeldinger og endringer gjelder direkte hos EKK uten mellommenn.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
