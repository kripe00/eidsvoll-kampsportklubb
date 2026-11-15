"use client";

import { tinaField } from "tinacms/dist/react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "./ui/optimized-image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useInView } from "@/lib/hooks";

interface TrainersProps {
  title?: string;
  trainerList?: {
    name: string;
    role: string;
    image?: string;
    bio?: string;
  }[];
  [key: string]: any;
}

function TrainerCard({ trainer, index, props }: { trainer: any; index: number; props: any }) {
  const { ref: cardRef, inView: isVisible } = useInView<HTMLDivElement>();
  const { locale, t } = useLanguage();

  const initials = trainer.name
    ? trainer.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
    : "EK";

  let displayRole = trainer.role;
  let displayBio = trainer.bio;

  if (locale !== "no") {
    if (trainer.name?.includes("Christer")) {
      displayRole = t.about.christerRole;
      displayBio = t.about.christerBio;
    } else if (trainer.name?.includes("Alexandra")) {
      displayRole = t.about.alexandraRole;
      displayBio = t.about.alexandraBio;
    } else if (trainer.name?.includes("Pernille")) {
      displayRole = t.about.pernilleRole;
      displayBio = t.about.pernilleBio;
    }
  }

  return (
    <div 
      ref={cardRef}
      className="relative group cursor-pointer" 
      data-tina-field={tinaField(props, `trainerList.${index}`)}
    >
      <div className="grid sm:grid-cols-12 gap-8 items-start">
        {/* Image Section or Sleek Monogram Placeholder */}
        <div className="sm:col-span-5 relative aspect-[4/5] sm:aspect-auto sm:h-[450px] overflow-hidden bg-muted/40 border border-border/40 flex items-center justify-center">
          {trainer.image ? (
            <OptimizedImage 
              src={trainer.image} 
              alt={trainer.name} 
              fill={true}
              sizes="(max-width: 640px) 100vw, 40vw"
              className={cn(
                "object-cover transition-all duration-1000",
                isVisible ? "grayscale-0 scale-100" : "grayscale scale-105",
                "lg:grayscale lg:scale-105 lg:group-hover:grayscale-0 lg:group-hover:scale-100"
              )}
              data-tina-field={tinaField(trainer, "image")}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-primary/25 flex items-center justify-center text-primary font-black text-3xl tracking-tight shadow-inner">
                {initials}
              </div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground/60">
                Eidsvoll Kampsportklubb
              </span>
            </div>
          )}
          {/* Subtle corner accent */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
        </div>

        {/* Info Section */}
        <div className="sm:col-span-7 pt-4 sm:pt-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-primary font-bold tracking-[0.1em] uppercase text-sm" data-tina-field={tinaField(trainer, "role")}>
              {displayRole}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 sm:mb-8 text-foreground uppercase" data-tina-field={tinaField(trainer, "name")}>
            {trainer.name}
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium" data-tina-field={tinaField(trainer, "bio")}>
            {displayBio}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Trainers(props: TrainersProps) {
  const { title = "Våre trenere", trainerList } = props;
  const { locale, t } = useLanguage();

  const displayTitle = locale === "no" ? title : t.about.coachesHeading;
  
  const policeClearanceNote =
    locale === "en"
      ? "All coaches and youth instructors hold verified police clearance (politiattest) per NIF regulations and follow Norges Kampsportforbund safety guidelines."
      : locale === "pl"
      ? "Wszyscy trenerzy i instruktorzy grup dziecięcych posiadają ważne zaświadczenie o niekaralności (politiattest) zgodnie z wymogami NIF i NKF."
      : locale === "uk"
      ? "Усі тренери та дитячі інструктори мають чинну довідку про несудимість (politiattest) відповідно до вимог NIF та NKF."
      : "Alle trenere og barneinstruktører har fremvist gyldig politiattest iht. NIFs krav og følger Norges Kampsportforbunds retningslinjer for trygg trening.";
  
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter text-foreground uppercase leading-[0.9]" data-tina-field={tinaField(props, "title")}>
              {displayTitle}
            </h2>
            <p className="mt-4 inline-flex items-start gap-2.5 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 text-xs sm:text-sm font-semibold text-foreground leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{policeClearanceNote}</span>
            </p>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-primary mb-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 sm:gap-y-24 lg:gap-y-32">
          {trainerList?.map((trainer, i) => (
            <TrainerCard key={i} trainer={trainer} index={i} props={props} />
          ))}
        </div>
      </div>
    </section>
  );
}
