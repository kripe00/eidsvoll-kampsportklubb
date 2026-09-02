import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";

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
  const title = props.title || "Bli medlem i Eidsvoll Kampsportklubb";
  const description =
    props.description ||
    "For å trene fast hos oss benytter vi to systemer: Boost for det månedlige treningsabonnementet, og MinIdrett for årlig medlemskontingent og forsikring.";
  const linkUrl = props.linkUrl || "https://www.minidrett.no/medlemskap/988726";
  const boostLinkUrl = props.boostLinkUrl || "https://portal.boostsystem.no/rambukk/member";
  const boostEnabled = props.boostEnabled !== false;

  return (
    <section id="medlemskap" className="py-24 md:py-36 bg-background border-y border-border/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Seksjonsoverskrift og ingress */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-primary block mb-3">
            Innmelding & Medlemskap
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground uppercase leading-[0.95] mb-6"
            data-tina-field={tinaField(props, "title")}
          >
            {title}
          </h2>
          <p
            className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-normal"
            data-tina-field={tinaField(props, "description")}
          >
            {description}
          </p>
        </div>

        {/* Pedagogiske kort for Boost og MinIdrett */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch mb-12">
          
          {/* 1. BOOST (Venstre / Først) */}
          <div className="bg-card border-2 border-emerald-600/30 hover:border-emerald-600/60 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              {/* Steg-badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  Steg 1 · Hovedinnmelding
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  Månedlig
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                1. Treningsavgift (Boost)
              </h3>

              {/* Forklaring med stor skrift og god luft */}
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                <p>
                  <strong className="text-foreground font-bold">Dette er selve treningsabonnementet ditt.</strong> For å delta på fellestreninger i klubben oppretter du din månedlige treningsavtale i vårt medlemssystem Boost.
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-foreground font-medium pt-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
                    <span>Fri tilgang til alle treninger (BJJ, Muay Thai, Crosstrening og Yoga)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
                    <span>Månedlig automatisk trekk via AvtaleGiro / kort</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold text-lg leading-none">✓</span>
                    <span>Enkel administrasjon og oversikt over ditt abonnement</span>
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
                    className="w-full h-auto min-h-[3.75rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-600/25 transition-all duration-300 flex items-center justify-between uppercase tracking-wider group text-left whitespace-normal leading-tight gap-2"
                  >
                    <span>Meld deg inn i Boost</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </Button>
                </Link>
              ) : (
                <div className="relative group/disabled select-none" data-tina-field={tinaField(props, "boostEnabled")}>
                  <Button
                    size="lg"
                    disabled
                    className="w-full h-auto min-h-[3.75rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-bold rounded-xl bg-muted border border-border text-muted-foreground/40 cursor-not-allowed flex items-center justify-center uppercase tracking-wider text-center whitespace-normal leading-tight"
                  >
                    Boost Medlemssystem
                  </Button>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded border border-amber-500 shadow-sm whitespace-nowrap">
                    Kommer snart
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 2. MINIDRETT (Høyre / Deretter) */}
          <div className="bg-card border-2 border-primary/30 hover:border-primary/60 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-lg transition-all duration-300">
            <div>
              {/* Steg-badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  <ShieldCheck className="w-4 h-4" />
                  Steg 2 · Idrettsforbundet
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                  Årlig (1 gang per år)
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                2. Årskontingent (MinIdrett)
              </h3>

              {/* Forklaring med stor skrift og god luft */}
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                <p>
                  <strong className="text-foreground font-bold">Klubbmedlemskap i idrettslaget.</strong> Eidsvoll Kampsportklubb er tilknyttet Norges Idrettsforbund (NIF). Alle som trener fast må være registrert som medlem i MinIdrett (betales én gang per år).
                </p>
                <ul className="space-y-2.5 text-sm sm:text-base text-foreground font-medium pt-2">
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>Gir deg formelt medlemskap og stemmerett i idrettslaget</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>Dekker skadeforsikring gjennom Norges Kampsportforbund</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-primary font-bold text-lg leading-none">✓</span>
                    <span>Gir rett til å delta på stevner og konkurranser i regi av NIF / kampsportforbundet</span>
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
                  className="w-full h-auto min-h-[3.75rem] sm:min-h-[4.5rem] py-3.5 px-4 sm:px-6 text-sm sm:text-base md:text-lg font-black rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-between uppercase tracking-wider group text-left whitespace-normal leading-tight gap-2"
                >
                  <span>Betal kontingent (MinIdrett)</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </Button>
              </Link>
            </div>
          </div>

        </div>

        {/* Oppklarende informasjonsboks om skillet mellom systemene */}
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 max-w-4xl mx-auto shadow-sm">
          <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-left">
            <h4 className="text-lg sm:text-xl font-bold text-foreground">
              Viktig om betaling og tilgang til trening:
            </h4>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Dersom du <strong>kun har betalt i MinIdrett</strong>, har du betalt den årlige medlemskontingenten til idrettslaget, men du har <em>ikke</em> betalt for selve månedstreningen. For å ha gyldig adgang til å trene fast på mattene må du også opprette treningsavtale i <strong>Boost</strong> (Steg 1).
            </p>
          </div>
        </div>

        {/* Tilleggsinformasjon fra CMS dersom definert */}
        {props.extraInfo && (
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
              Trenger du hjelp? Se våre{" "}
              <Link href="#faq" className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors">
                ofte stilte spørsmål (FAQ) lenger ned
              </Link>
              , eller{" "}
              <Link href="/kontakt" className="text-foreground font-bold underline underline-offset-4 hover:text-primary transition-colors">
                kontakt oss direkte
              </Link>
              .
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
