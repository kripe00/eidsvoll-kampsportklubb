"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";
import { OptimizedImage } from "./ui/optimized-image";
import { ProveukeModal } from "./ProveukeModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
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
    <section className="relative w-full overflow-hidden pt-28 pb-32 sm:pt-40 sm:pb-48 md:pt-48 md:pb-64">
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
      <div className="absolute inset-0 bg-slate-950/75 -z-10" />
      
      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 md:px-8 max-w-5xl text-center">
        <h1 className="hero-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter font-extrabold text-white mb-6 sm:mb-8 text-balance">
          <span data-tina-field={tinaField(parent, 'welcomeText')}>{displayWelcome}</span> <br className="hidden md:block" />
          <span className="text-primary" data-tina-field={tinaField(parent, 'highlightedText')}>{displayHighlighted}</span>
        </h1>
        <div className="hero-description text-base sm:text-lg md:text-2xl text-slate-200 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed" data-tina-field={tinaField(parent, 'description')}>
          {typeof displayDesc === "string" ? <p>{displayDesc}</p> : <RichText content={displayDesc} />}
        </div>
        
        <div className="hero-cta flex justify-center items-center px-2">
          <ProveukeModal 
            trigger={
              <Button size="lg" spring={true} className="w-full sm:w-auto h-14 px-8 sm:px-10 text-base sm:text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                {t.hero.tryFreeCta}
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
}
