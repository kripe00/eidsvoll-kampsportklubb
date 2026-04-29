"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Heart, Eye, Award, Shield, Users, Zap, HeartHandshake, ShieldCheck, Flame, Info } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
  Heart, Eye, Award, Shield, Users, Zap, HeartHandshake, ShieldCheck, Flame, Info,
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
  const block = page?.blocks?.[0];
  const benefitsBlock = page?.blocks?.find(
    (b: any) => b?._template === "benefits" || b?.__typename?.includes("Benefits")
  );
  const benefitItems = benefitsBlock?.items || [];
  const sponsorsBlock = page?.blocks?.find(
    (b: any) => b?._template === "sponsors" || b?.__typename?.includes("Sponsors")
  );
  const sponsorList = sponsorsBlock?.sponsorList || [];

  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero / Intro Section ── */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            {/* Left Column: Copy & CTA */}
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

              <p className="text-lg md:text-xl text-muted-foreground/80 leading-relaxed font-light max-w-lg">
                Ønsker din bedrift å ta et tydelig samfunnsansvar og samtidig bli
                synlig for et engasjert publikum i Eidsvoll og omegn? Ved å
                inngå et partnerskap med oss, investerer dere direkte i
                lokalmiljøet.
              </p>

              <Link href="/kontakt">
                <Button
                  size="lg"
                  className="h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all mt-4"
                >
                  Ta kontakt om sponsing
                </Button>
              </Link>
            </div>

            {/* Right Column: Hero Image */}
            <div className="lg:w-1/2">
              {block?.image ? (
                <div
                  className="relative group overflow-hidden rounded-2xl shadow-2xl"
                  data-tina-field={tinaField(block, "image")}
                >
                  <img
                    src={block.image}
                    alt="Eidsvoll Kampsportklubb fellesskap"
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

      {/* ── Benefits Grid ── */}
      <section className="py-24 md:py-32 bg-muted/20 border-y border-border/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-20">
            <h2
              className="text-3xl md:text-4xl font-black tracking-tighter text-foreground uppercase mb-4"
              data-tina-field={tinaField(benefitsBlock, "title")}
            >
              {benefitsBlock?.title || "Hvorfor sponse oss?"}
            </h2>
            <div className="w-12 h-[1px] bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
            {benefitItems.map((item: any, i: number) => {
              const Icon = iconMap[item.icon] || Heart;
              return (
                <div key={i} className="text-center space-y-6 group" data-tina-field={tinaField(item)}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-primary/20 group-hover:border-primary/60 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary stroke-[1.25px]" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground uppercase">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light max-w-xs mx-auto">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sponsor Logo Grid ── */}
      <section className="py-24 md:py-32">
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
              data-tina-field={tinaField(sponsorsBlock, "title")}
            >
              {sponsorsBlock?.title || "Våre støttespillere"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {sponsorList.map((sponsor: any, i: number) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 md:h-28 bg-muted/30 border border-border/40 rounded-xl hover:border-primary/30 transition-colors duration-300"
                data-tina-field={tinaField(sponsor)}
              >
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name || "Sponsor"}
                    className="max-h-14 max-w-[80%] object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <span className="text-muted-foreground/30 text-sm font-bold uppercase tracking-widest select-none">
                    {sponsor.name || "Logo"}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground/60 text-sm font-light italic">
              Vil din bedrift stå her?{" "}
              <Link
                href="/kontakt"
                className="text-primary hover:underline font-medium"
              >
                Ta kontakt
              </Link>{" "}
              for en uforpliktende prat.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
