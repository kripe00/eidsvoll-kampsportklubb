"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ClubLinks() {
  const links = [
    {
      num: "01",
      title: "Styret og ledelse",
      description: "Møt personene bak klubben, se hvem som sitter i styret, og finn kontaktinformasjon.",
      href: "/styret",
      badge: "Klubbdrift",
    },
    {
      num: "02",
      title: "Organisasjonsplan",
      description: "Les om klubbens struktur, ansvarsfordeling, politiattester og formelle retningslinjer.",
      href: "/styret/organisasjonsplan",
      badge: "Styringsdokument",
    },
    {
      num: "03",
      title: "Våre sponsorer",
      description: "Se våre fantastiske støttespillere i lokalsamfunnet som gjør satsingen vår mulig.",
      href: "/sponsorer",
      badge: "Samarbeidspartnere",
    },
    {
      num: "04",
      title: "Konkurranse & IBJJF-regler",
      description:
        "Interaktiv veiviser for lovlige og ulovlige teknikker i BJJ (IBJJF 2027), kamptider, poengsystem og Smoothcomp.",
      href: "/konkurranse",
      badge: "Stevneguide",
    },
  ];

  return (
    <section className="py-16 border-t border-border/40 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Klubbinformasjon
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
            Utforsk mer om klubben
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {links.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group bg-card border border-border/70 hover:border-foreground/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-5 pb-3 border-b border-border/50">
                  <span className="text-xs font-mono font-bold text-primary">
                    {item.num}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between text-xs uppercase tracking-wider font-bold text-primary">
                <span>Les mer</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
