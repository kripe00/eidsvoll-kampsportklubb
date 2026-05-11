"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Award, Shield, Users, Zap, HeartHandshake, ShieldCheck, Flame, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";

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

  const page = data?.sponsorer || data?.page || props.data?.sponsorer || props.data?.page;

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
                      className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-[0.9] break-words"
                      data-tina-field={tinaField(block, "title")}
                    >
                      {block?.title || "Bli en støttespiller for lokal idrettsglede"}
                    </h1>

                    <div 
                      className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-light max-w-lg whitespace-pre-line"
                      data-tina-field={tinaField(block, "body")}
                    >
                      {block?.body || "Ta kontakt for å høre mer om sponsormuligheter."}
                    </div>

                    <Link href="/kontakt">
                      <Button
                        size="lg"
                        className="h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all mt-4"
                      >
                        Ta kontakt om sponsing
                      </Button>
                    </Link>
                  </div>

                  <div className="lg:w-1/2">
                    {block?.image ? (
                      <div
                        className="relative group overflow-hidden rounded-2xl shadow-2xl"
                        data-tina-field={tinaField(block, "image")}
                      >
                        <img
                          src={block.image}
                          alt="Bilde"
                          className="w-full h-auto object-cover aspect-[4/3]"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] bg-muted/40 rounded-2xl border-2 border-dashed border-border/60 flex items-center justify-center">
                        <span className="text-muted-foreground/40 text-sm uppercase tracking-widest font-bold">
                          Bilde
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // ── Packages Block ──
        if (block._template === "packages" || block.__typename?.includes("Packages")) {
          return (
            <section key={index} className="py-24 md:py-32 bg-muted/10 border-y border-border/30">
              <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <h2
                    className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase mb-6"
                    data-tina-field={tinaField(block, "title")}
                  >
                    {block.title || "Sponsorpakker"}
                  </h2>
                  {block.description && (
                    <p 
                      className="text-lg text-muted-foreground/80 leading-relaxed font-light whitespace-pre-line"
                      data-tina-field={tinaField(block, "description")}
                    >
                      {block.description}
                    </p>
                  )}
                  <div className="w-12 h-[1px] bg-primary mx-auto mt-8" />
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                  {block.packagesList?.map((pkg: any, i: number) => (
                    <div 
                      key={i} 
                      className={`relative p-8 rounded-2xl border flex flex-col h-full bg-card transition-all duration-300 ${pkg.highlighted ? "border-primary shadow-2xl scale-100 md:scale-105 z-10" : "border-border/40 shadow-sm hover:border-primary/50"}`} 
                      data-tina-field={tinaField(pkg)}
                    >
                      {pkg.highlighted && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg">
                          Anbefalt
                        </div>
                      )}
                      
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-3">{pkg.name}</h3>
                        <p className="text-muted-foreground text-sm font-light leading-relaxed">{pkg.description}</p>
                      </div>

                      <ul className="space-y-4 mb-8 flex-grow">
                        {pkg.perks?.map((perk: string, j: number) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm font-medium leading-tight">{perk}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href={`/kontakt`} className="w-full mt-auto block">
                        <Button 
                          size="lg"
                          className="w-full font-bold uppercase tracking-widest text-sm h-14" 
                          variant={pkg.highlighted ? "default" : "outline"}
                        >
                          Bli {pkg.name}-partner
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // ── Benefits Block ──
        if (block._template === "benefits" || block.__typename?.includes("Benefits")) {
          const benefitItems = block.items || [];
          // Alternating background for multiple benefit blocks
          const bgClass = index % 2 === 0 ? "bg-background" : "bg-muted/10";
          return (
            <section key={index} className={`py-24 md:py-32 ${bgClass}`}>
              <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                <div className="text-center mb-20">
                  <h2
                    className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase mb-4"
                    data-tina-field={tinaField(block, "title")}
                  >
                    {block.title || "Fordeler"}
                  </h2>
                  <div className="w-12 h-[1px] bg-primary mx-auto" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                  {benefitItems.map((item: any, i: number) => {
                    const Icon = iconMap[item.icon] || Heart;
                    return (
                      <div key={i} className="text-center space-y-6 group" data-tina-field={tinaField(item)}>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 border border-primary/20 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-7 h-7 text-primary stroke-[1.5px]" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-foreground uppercase">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground/90 leading-relaxed font-light text-sm max-w-sm mx-auto">
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
          const sponsorList = block.sponsorList || [];
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                    {sponsorList.map((sponsor: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-center p-6 h-32 md:h-40 bg-muted/20 border border-border/40 rounded-xl hover:border-primary/40 hover:bg-muted/40 transition-colors duration-300 group"
                        data-tina-field={tinaField(sponsor)}
                      >
                        {sponsor.logo ? (
                          <img
                            src={sponsor.logo}
                            alt={sponsor.name || "Sponsor"}
                            className="max-h-16 md:max-h-20 max-w-[85%] object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <span className="text-muted-foreground/30 text-sm font-bold uppercase tracking-widest select-none text-center">
                            {sponsor.name || "Sponsor"}
                          </span>
                        )}
                      </div>
                    ))}
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

