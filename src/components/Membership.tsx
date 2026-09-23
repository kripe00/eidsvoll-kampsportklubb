"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useScrollReveal, animate, stagger, ATHLETIC_SPRING, cleanAnimationStyles, remove } from "@/lib/animations";

interface MembershipProps {
  title?: string;
  description?: string;
  linkUrl?: string;
  boostLinkUrl?: string;
  boostEnabled?: boolean;
  extraInfo?: any;
  [key: string]: any;
}

export function Membership(props: MembershipProps) {
  const { locale, t } = useLanguage();

  const title = locale === "no" ? (props.title || t.membership.pageTitle) : t.membership.pageTitle;
  const description = locale === "no" ? (props.description || t.membership.pageDescription) : t.membership.pageDescription;
  const linkUrl = props.linkUrl || "https://www.minidrett.no/medlemskap/988726";
  const boostLinkUrl = props.boostLinkUrl || "https://portal.boostsystem.no/rambukk/member";
  const boostEnabled = props.boostEnabled !== false;

  const sectionRef = useScrollReveal<HTMLElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
    onReveal: (container, isReducedMotion) => {
      if (isReducedMotion) return;

      const cards = container.querySelectorAll<HTMLElement>(".membership-card");
      const alertBox = container.querySelector<HTMLElement>(".membership-alert-box");
      const allTargets = [...Array.from(cards), ...(alertBox ? [alertBox] : [])];

      if (cards.length > 0) {
        animate(Array.from(cards), {
          opacity: [0, 1],
          translateY: [28, 0],
          duration: 500,
          delay: stagger(110),
          ease: ATHLETIC_SPRING,
          onComplete: () => {
            cards.forEach(cleanAnimationStyles);
          },
        });
      }

      if (alertBox) {
        animate(alertBox, {
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 460,
          delay: 260,
          ease: ATHLETIC_SPRING,
          onComplete: () => {
            cleanAnimationStyles(alertBox);
          },
        });
      }

      return () => {
        remove(allTargets);
        allTargets.forEach(cleanAnimationStyles);
      };
    },
  });

  return (
    <section ref={sectionRef} id="medlemskap" className="w-full">
      <div className="max-w-6xl mx-auto">
        
        {/* Seksjonsoverskrift og ingress */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-primary block mb-3">
            {t.membership.badge}
          </span>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground uppercase leading-[0.95] mb-4 sm:mb-6"
            data-tina-field={tinaField(props, "title")}
          >
            {title}
          </h2>
          <p
            className="text-base sm:text-lg md:text-2xl text-muted-foreground leading-relaxed font-normal"
            data-tina-field={tinaField(props, "description")}
          >
            {description}
          </p>
        </div>

        {/* Pedagogiske kort for Boost og MinIdrett */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-stretch mb-12">
          
          {/* 1. BOOST (Venstre / Først) */}
          <div className="membership-card bg-card border-2 border-emerald-600/30 hover:border-emerald-600/60 rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              {/* Steg-badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.membership.step1Badge}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  {t.membership.step1Frequency}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                {t.membership.step1Title}
              </h3>

              {/* Forklaring med stor skrift og god luft */}
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                <p>
                  {t.membership.step1Desc}
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-foreground font-medium pt-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step1Perk1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step1Perk2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step1Perk3}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Boost Knapp (Plassert under teksten) */}
            <div className="pt-4 border-t border-border/40">
              {boostEnabled && boostLinkUrl ? (
                <Link
                  href={boostLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tina-field={tinaField(props, "boostLinkUrl")}
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    spring={true}
                    className="w-full h-auto min-h-[3.5rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-600/25 transition-all duration-300 flex items-center justify-between uppercase tracking-wider group text-left whitespace-normal leading-tight gap-2"
                  >
                    <span>{t.membership.step1Btn}</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </Button>
                </Link>
              ) : (
                <div className="relative group/disabled select-none" data-tina-field={tinaField(props, "boostEnabled")}>
                  <Button
                    size="lg"
                    disabled
                    className="w-full h-auto min-h-[3.5rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-bold rounded-xl bg-muted border border-border text-muted-foreground/40 cursor-not-allowed flex items-center justify-center uppercase tracking-wider text-center whitespace-normal leading-tight"
                  >
                    Boost
                  </Button>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded border border-amber-500 shadow-sm whitespace-nowrap">
                    {t.membership.comingSoon}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. MINIDRETT (Høyre / Deretter) */}
          <div className="membership-card bg-card border-2 border-primary/30 hover:border-primary/60 rounded-2xl p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              {/* Steg-badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  <ShieldCheck className="w-4 h-4" />
                  {t.membership.step2Badge}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  {t.membership.step2Frequency}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                {t.membership.step2Title}
              </h3>

              {/* Forklaring med stor skrift og god luft */}
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                <p>
                  {t.membership.step2Desc}
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-foreground font-medium pt-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step2Perk1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step2Perk2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>{t.membership.step2Perk3}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* MinIdrett Knapp (Plassert under teksten) */}
            <div className="pt-4 border-t border-border/40">
              <Link
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-tina-field={tinaField(props, "linkUrl")}
                className="block w-full"
              >
                <Button
                  size="lg"
                  spring={true}
                  className="w-full h-auto min-h-[3.75rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-black rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-between uppercase tracking-wider group text-left whitespace-normal leading-tight gap-2"
                >
                  <span>{t.membership.step2Btn}</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Oppklarende informasjonsboks om skillet mellom systemene */}
        <div className="membership-alert-box bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 max-w-4xl mx-auto shadow-sm">
          <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-left">
            <h4 className="text-lg sm:text-xl font-bold text-foreground">
              {t.membership.alertTitle}
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.membership.alertDesc}
            </p>
          </div>
        </div>

        {/* Tilleggsinformasjon fra CMS dersom definert */}
        {props.extraInfo && locale === "no" && (
          <div className="mt-8 max-w-3xl mx-auto">
            <RichText
              content={props.extraInfo}
              className="p-6 bg-muted/30 border border-border/50 rounded-xl text-sm text-muted-foreground leading-relaxed text-center"
              data-tina-field={tinaField(props, "extraInfo")}
            />
          </div>
        )}

        {/* Hjelp & FAQ lenker */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p className="inline-flex items-center gap-2">
            <Info className="w-4 h-4 text-primary shrink-0" />
            <span>
              {t.membership.helpPrompt}{" "}
              <Link href="#faq" className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors">
                {t.membership.helpFaq}
              </Link>
              , {locale === 'no' ? 'eller' : locale === 'pl' ? 'lub' : locale === 'uk' ? 'або' : 'or'}{" "}
              <Link href="/kontakt" className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors">
                {t.membership.helpContact}
              </Link>
              .
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
