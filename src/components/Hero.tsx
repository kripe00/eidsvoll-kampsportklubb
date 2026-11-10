"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";
import { OptimizedImage } from "./ui/optimized-image";
import { ProveukeModal } from "./ProveukeModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ArrowRight } from "lucide-react";
import { animate, ATHLETIC_SPRING, stagger, prefersReducedMotion, cleanAnimationStyles, remove } from "@/lib/animations";

interface HeroProps {
  welcomeText?: string;
  highlightedText?: string;
  description?: any;
  backgroundImage?: string;
  backgroundVideo?: string;
  parent?: any;
}

export function Hero({ 
  welcomeText = "Velkommen til", 
  highlightedText = "Eidsvoll Kampsportklubb", 
  description,
  backgroundImage = "/header.jpg",
  backgroundVideo,
  parent
}: HeroProps) {
  const { t, locale } = useLanguage();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const displayWelcome = locale === "no" ? welcomeText : t.hero.welcome;
  const displayHighlighted = locale === "no" ? highlightedText : t.hero.clubName;
  const displayDesc = locale === "no" ? (description || t.hero.description) : t.hero.description;

  useEffect(() => {
    const container = contentRef.current;
    if (!container || prefersReducedMotion()) return;

    const headline = container.querySelector(".hero-headline");
    const desc = container.querySelector(".hero-description");
    const cta = container.querySelector(".hero-cta");

    const targets = [headline, desc, cta].filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;

    animate(targets, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 500,
      delay: stagger(100),
      ease: ATHLETIC_SPRING,
      onComplete: () => {
        targets.forEach(cleanAnimationStyles);
      },
    });

    return () => {
      remove(targets);
      targets.forEach(cleanAnimationStyles);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-32 pb-28 sm:pt-44 sm:pb-36 md:pt-52 md:pb-48">
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover -z-20 scale-105"
          data-tina-field={tinaField(parent, 'backgroundVideo')}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : (
        <OptimizedImage
          src={backgroundImage}
          alt={displayHighlighted || "Hero bakgrunn"}
          fill={true}
          priority={true}
          containerClassName="absolute inset-0 -z-20"
          className="object-cover scale-105"
          data-tina-field={tinaField(parent, 'backgroundImage')}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/90 -z-10" />
      
      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl text-center">
        <div className="inline-flex items-center gap-3 mb-5">
          <div className="w-8 h-[1px] bg-sky-400" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-sky-300" data-tina-field={tinaField(parent, 'welcomeText')}>
            {displayWelcome}
          </span>
          <div className="w-8 h-[1px] bg-sky-400" />
        </div>

        <h1 className="hero-headline text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter font-black uppercase text-white mb-6 sm:mb-8 leading-[0.95] text-balance">
          <span className="text-white" data-tina-field={tinaField(parent, 'highlightedText')}>
            {displayHighlighted}
          </span>
        </h1>

        <div className="hero-description text-base sm:text-lg md:text-xl text-slate-200/90 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-normal" data-tina-field={tinaField(parent, 'description')}>
          {typeof displayDesc === "string" ? <p>{displayDesc}</p> : <RichText content={displayDesc} />}
        </div>
        
        <div className="hero-cta flex flex-col sm:flex-row justify-center items-center gap-4 px-2">
          <ProveukeModal 
            trigger={
              <Button size="lg" spring={true} className="w-full sm:w-auto h-14 px-8 sm:px-10 text-sm sm:text-base font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all">
                <span>{t.hero.tryFreeCta}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            }
          />
          <Link
            href="/forste-trening"
            className="w-full sm:w-auto h-14 px-6 sm:px-8 text-sm sm:text-base font-bold uppercase tracking-wider rounded-xl border border-white/25 bg-white/5 text-white hover:bg-white/15 transition-all backdrop-blur-sm inline-flex items-center justify-center"
          >
            {locale === "en"
              ? "Your First Training"
              : locale === "pl"
              ? "Twój pierwszy trening"
              : locale === "uk"
              ? "Ваше перше тренування"
              : "Din første trening"}
          </Link>
        </div>
      </div>
    </section>
  );
}
