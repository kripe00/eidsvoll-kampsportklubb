"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Heart, Eye, Award, Shield, Users, Zap, HeartHandshake, ShieldCheck, Flame, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { OptimizedImage } from "./ui/optimized-image";

const iconMap: Record<string, any> = {
  Heart, Eye, Award, Shield, Users, Zap, HeartHandshake, ShieldCheck, Flame, Info, CheckCircle2
};

export function SponsorerPageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const page = data?.sponsorer || props.data?.sponsorer || props.data?.page || data?.page;

  return (
    <main className="bg-background min-h-screen">
      {page?.blocks?.map((block: any, index: number) => {
        
        // ── About Block ──
        if (block._template === "about" || block.__typename?.includes("About")) {
          return (
            <section key={index} className="pt-32 pb-24 md:pt-40 md:pb-32">
              <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                  <div className="lg:w-1/2 space-y-8">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-8 h-[1px] bg-primary" />
                      <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                        For bedrifter
                      </span>
                    </div>
                    
                    <h1 
                      className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-[1.05]"
                      data-tina-field={tinaField(block, "title")}
                    >
                      {block.title || "Bli en støttespiller"}
                    </h1>
                    
                    <div 
                      className="prose prose-lg text-muted-foreground font-light leading-relaxed whitespace-pre-line"
                      data-tina-field={tinaField(block, "body")}
                    >
                      {block?.body || "Ta kontakt for å høre mer om sponsormuligheter."}
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                      <Link 
                        href="/kontakt"
                        className="inline-flex items-center justify-center font-bold uppercase tracking-widest text-xs h-14 px-8 bg-primary hover:bg-primary/90 text-white transition-all shadow-md"
                      >
                        Bli sponsor
                      </Link>
                      <a 
                        href="#sponsorpakker"
                        className="inline-flex items-center justify-center font-bold uppercase tracking-widest text-xs h-14 px-8 border border-border hover:bg-muted text-foreground transition-all"
                      >
                        Se sponsorpakker
                      </a>
                    </div>
                  </div>

                  <div className="lg:w-1/2 w-full">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/40 shadow-2xl">
                      {block.image ? (
                        <OptimizedImage
                          src={block.image}
                          alt={block.title || "Sponsorbilde"}
                          fill
                          className="object-cover"
                          data-tina-field={tinaField(block, "image")}
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/40 font-bold uppercase tracking-widest">
                          Bilde
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // ── Packages Block ──
        if (block._template === "packages" || block.__typename?.includes("Packages")) {
          const packages = block.packagesList || [];
          return (
            <section key={index} id="sponsorpakker" className="py-24 md:py-32 bg-muted/20 border-t border-border/30">
              <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-8 h-[1px] bg-primary" />
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                      Sponsornivåer
                    </span>
                    <div className="w-8 h-[1px] bg-primary" />
                  </div>
                  <h2 
                    className="text-3xl sm:text-5xl font-black tracking-tighter text-foreground uppercase mb-6"
                    data-tina-field={tinaField(block, "title")}
                  >
                    {block.title || "Sponsorpakker"}
                  </h2>
                  {block.description && (
                    <p 
                      className="text-lg text-muted-foreground font-light leading-relaxed"
                      data-tina-field={tinaField(block, "description")}
                    >
                      {block.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {packages.map((pkg: any, i: number) => {
                    const isHighlighted = pkg.highlighted;
                    return (
                      <div 
                        key={i}
                        className={`relative flex flex-col p-8 md:p-10 rounded-2xl border transition-all duration-300 ${
                          isHighlighted 
                            ? "bg-background border-primary shadow-2xl shadow-primary/10 ring-1 ring-primary" 
                            : "bg-background/60 border-border/60 hover:border-border hover:shadow-xl"
                        }`}
                        data-tina-field={tinaField(pkg)}
                      >
                        {isHighlighted && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                            Mest populær
                          </div>
                        )}

                        <div className="mb-8">
                          <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-2">
                            {pkg.name}
                          </h3>
                          <p className="text-sm text-muted-foreground font-light min-h-[40px]">
                            {pkg.description}
                          </p>
                        </div>

                        <div className="space-y-4 flex-1 mb-8">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80 mb-4">
                            Inkludert i pakken:
                          </p>
                          {pkg.perks?.map((perk: string, perkIndex: number) => (
                            <div key={perkIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span className="text-sm font-medium text-foreground/90">
                                {perk}
                              </span>
                            </div>
                          ))}
                        </div>

                        <Link 
                          href="/kontakt"
                          className={`inline-flex items-center justify-center w-full h-12 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                            isHighlighted 
                              ? "bg-primary hover:bg-primary/90 text-white shadow-md" 
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                        >
                          Velg {pkg.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ── Benefits Grid Block ──
        if (block._template === "benefits" || block.__typename?.includes("Benefits")) {
          const items = block.items || [];
          return (
            <section key={index} className="py-24 md:py-32 border-t border-border/30">
              <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-8 h-[1px] bg-primary" />
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                      Verdi for sponsorer
                    </span>
                    <div className="w-8 h-[1px] bg-primary" />
                  </div>
                  <h2 
                    className="text-3xl sm:text-5xl font-black tracking-tighter text-foreground uppercase"
                    data-tina-field={tinaField(block, "title")}
                  >
                    {block.title || "Fordeler"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item: any, i: number) => {
                    const IconComponent = iconMap[item.icon] || Flame;
                    return (
                      <div 
                        key={i} 
                        className="p-8 bg-muted/20 border border-border/40 rounded-2xl hover:border-primary/30 transition-all duration-300 flex flex-col"
                        data-tina-field={tinaField(item)}
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground uppercase mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // ── Sponsors Logo Grid ──
        if (block._template === "sponsors" || block.__typename?.includes("Sponsors")) {
          const rawList = block.sponsorList || [];
          const sponsorList = rawList.length > 0 
            ? rawList 
            : [
                {
                  name: "Sanita",
                  logo: "/images/sponsors/sanita.png",
                  url: "https://www.sanita.no"
                }
              ];
          return (
            <section key={index} className="py-24 md:py-32 bg-background border-t border-border/30">
              <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-8 h-[1px] bg-primary" />
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                      Sosialt bevis
                    </span>
                    <div className="w-8 h-[1px] bg-primary" />
                  </div>
                  <h2
                    className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase"
                    data-tina-field={tinaField(block, "title")}
                  >
                    {block.title || "Våre støttespillere"}
                  </h2>
                </div>

                {sponsorList.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 justify-center">
                    {sponsorList.map((sponsor: any, i: number) => {
                      const card = (
                        <div
                          className="flex items-center justify-center p-8 h-36 md:h-44 bg-card border border-border/60 rounded-2xl hover:border-primary/50 hover:bg-muted/30 transition-all duration-300 shadow-sm group cursor-pointer"
                          data-tina-field={tinaField(sponsor)}
                        >
                          {sponsor.logo ? (
                            <OptimizedImage
                              src={sponsor.logo}
                              alt={sponsor.name || "Sponsor"}
                              width={260}
                              height={130}
                              className="max-h-20 md:max-h-24 max-w-[90%] object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 w-auto h-auto"
                            />
                          ) : (
                            <span className="text-foreground text-lg font-bold uppercase tracking-widest text-center">
                              {sponsor.name || "Sponsor"}
                            </span>
                          )}
                        </div>
                      );

                      return sponsor.url ? (
                        <Link
                          key={i}
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {card}
                        </Link>
                      ) : (
                        <div key={i}>{card}</div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center p-12 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                    <p className="text-muted-foreground font-light italic">
                      Vi oppdaterer sponsorlisten vår.
                    </p>
                  </div>
                )}

                <div className="text-center mt-16">
                  <p className="text-muted-foreground/80 text-lg font-light">
                    Vil din bedrift stå her?{" "}
                    <Link
                      href="/kontakt"
                      className="text-primary hover:underline font-bold"
                    >
                      Ta kontakt
                    </Link>{" "}
                    for en uforpliktende prat.
                  </p>
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}
    </main>
  );
}
