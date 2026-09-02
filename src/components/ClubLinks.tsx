"use client";

import Link from "next/link";
import { Users, FileText, HeartHandshake, ArrowRight } from "lucide-react";

export function ClubLinks() {
  const links = [
    {
      title: "Styret og ledelse",
      description: "Møt personene bak klubben, se hvem som sitter i styret, og finn kontaktinformasjon.",
      href: "/styret",
      icon: Users,
      badge: "Klubbdrift",
    },
    {
      title: "Organisasjonsplan",
      description: "Les om klubbens struktur, ansvarsfordeling, politiattester og formelle retningslinjer.",
      href: "/styret/organisasjonsplan",
      icon: FileText,
      badge: "Styringsdokument",
    },
    {
      title: "Våre sponsorer",
      description: "Se våre fantastiske støttespillere i lokalsamfunnet som gjør satsingen vår mulig.",
      href: "/sponsorer",
      icon: HeartHandshake,
      badge: "Samarbeidspartnere",
    },
  ];

  return (
    <section className="py-12 border-t border-border/40 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block mb-2">
            Klubbinformasjon
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
            Utforsk mer om klubben
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group relative bg-card border border-border/60 hover:border-primary/50 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70 bg-muted px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-border/40 flex items-center justify-between text-sm font-bold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Les mer</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
