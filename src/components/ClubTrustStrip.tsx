"use client";

import { ShieldCheck, MapPin, Gift, Coffee } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * Compact trust & practical highlights bar displayed between Hero and SportSelector.
 */
export function ClubTrustStrip() {
  const { locale } = useLanguage();

  const items = {
    no: [
      {
        icon: ShieldCheck,
        title: "Medlemsstyrt idrettslag",
        desc: "Tilsluttet NIF & Norges Kampsportforbund",
      },
      {
        icon: MapPin,
        title: "Trondheimsvegen 71B, Dal",
        desc: "Gratis parkering på baksiden · Nær Dal stasjon",
      },
      {
        icon: Gift,
        title: "14 dagers gratis prøveperiode",
        desc: "Gratis låneutstyr hele prøveperioden",
      },
      {
        icon: Coffee,
        title: "Fra 6 år til voksen",
        desc: "Egne barnepartier + peisestue med kaffe",
      },
    ],
    en: [
      {
        icon: ShieldCheck,
        title: "Non-profit NIF Sports Club",
        desc: "Affiliated with NIF & Martial Arts Federation",
      },
      {
        icon: MapPin,
        title: "Trondheimsvegen 71B, Dal",
        desc: "Free rear parking · Close to Dal station",
      },
      {
        icon: Gift,
        title: "14-Day Free Trial",
        desc: "Free loaner gear included all trial",
      },
      {
        icon: Coffee,
        title: "Ages 6 to Adult",
        desc: "Dedicated kids classes + parents lounge",
      },
    ],
    pl: [
      {
        icon: ShieldCheck,
        title: "Klub zrzeszony w NIF",
        desc: "Członek NIF i Związku Sztuk Walki (NKF)",
      },
      {
        icon: MapPin,
        title: "Trondheimsvegen 71B, Dal",
        desc: "Darmowy parking z tyłu · Blisko Dal stasjon",
      },
      {
        icon: Gift,
        title: "14 dni za darmo na próbę",
        desc: "Bezpłatne wypożyczenie sprzętu na start",
      },
      {
        icon: Coffee,
        title: "Od 6 lat do dorosłych",
        desc: "Grupy dziecięce + strefa z kawą dla rodziców",
      },
    ],
    uk: [
      {
        icon: ShieldCheck,
        title: "Спортивний клуб NIF",
        desc: "Член NIF та Федерації бойових мистецтв",
      },
      {
        icon: MapPin,
        title: "Trondheimsvegen 71B, Dal",
        desc: "Безкоштовна парковка ззаду · Біля Dal stasjon",
      },
      {
        icon: Gift,
        title: "14 днів безкоштовно",
        desc: "Безкоштовний прокат спорядження на старт",
      },
      {
        icon: Coffee,
        title: "Від 6 років до дорослих",
        desc: "Дитячі групи + кімната відпочинку з кавою",
      },
    ],
  }[locale];

  return (
    <section
      aria-label={locale === "no" ? "Kort om klubben" : "Club highlights"}
      className="bg-slate-950 text-slate-100 border-b border-slate-800/80 py-6 sm:py-8"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/15 text-sky-300 border border-primary/25 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black uppercase tracking-wide text-white leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
