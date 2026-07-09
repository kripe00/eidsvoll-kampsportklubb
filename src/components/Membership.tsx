import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";

interface MembershipProps {
  title?: string;
  description?: string;
  linkUrl?: string;
  boostLinkUrl?: string;
  boostEnabled?: boolean;
  [key: string]: any;
}

export function Membership(props: MembershipProps) {
  const { 
    title = "Bli en del av fellesskapet", 
    description = "Uansett om du er nybegynner eller erfaren, er du velkommen hos oss. Vi bruker MinIdrett for en trygg og enkel administrasjon av ditt medlemskap.",
    linkUrl = "https://minidrett.nif.no",
    boostLinkUrl = "",
    boostEnabled = false
  } = props;

  return (
    <section id="medlemskap" className="py-32 bg-background border-y border-border/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        
        {/* Main Info */}
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-foreground uppercase leading-[0.9] mb-10" data-tina-field={tinaField(props, 'title')}>
            {title}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-medium max-w-2xl mx-auto" data-tina-field={tinaField(props, 'description')}>
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch w-full max-w-2xl mx-auto mb-12">
            {/* MinIdrett Button */}
            <Link href={linkUrl} target="_blank" rel="noopener noreferrer" data-tina-field={tinaField(props, 'linkUrl')} className="flex-1 flex">
              <Button size="lg" className="group w-full h-20 px-6 text-[15px] sm:text-base md:text-lg font-bold rounded-none bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide">
                <span>Betal kontingent (MinIdrett)</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform shrink-0" />
              </Button>
            </Link>

            {/* Boost Button */}
            {boostEnabled && boostLinkUrl ? (
              <Link href={boostLinkUrl} target="_blank" rel="noopener noreferrer" data-tina-field={tinaField(props, 'boostLinkUrl')} className="flex-1 flex">
                <Button size="lg" className="group w-full h-20 px-6 text-[15px] sm:text-base md:text-lg font-bold rounded-none bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide">
                  <span>Boost Medlemssystem</span>
                  <ArrowRight className="group-hover:translate-x-2 transition-transform shrink-0" />
                </Button>
              </Link>
            ) : (
              <div className="flex-1 relative group/disabled select-none" data-tina-field={tinaField(props, 'boostEnabled')}>
                <Button size="lg" disabled className="w-full h-20 px-6 text-[15px] sm:text-base md:text-lg font-bold rounded-none bg-muted border border-border text-muted-foreground/40 cursor-not-allowed flex items-center justify-center uppercase tracking-wide">
                  Boost Medlemssystem
                </Button>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600/90 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded border border-amber-500 shadow-sm whitespace-nowrap">
                  Kommer snart
                </span>
              </div>
            )}
          </div>

          {props.extraInfo && (
            <RichText 
              content={props.extraInfo}
              className="mt-8 p-4 bg-muted/40 border border-border/40 rounded-lg max-w-sm mx-auto text-xs text-muted-foreground/80 leading-relaxed text-center"
              data-tina-field={tinaField(props, 'extraInfo')}
            />
          )}

          <p className="mt-12 text-sm text-muted-foreground/60">
            Har du spørsmål? Se våre <Link href="#faq" className="text-primary underline-offset-4 hover:underline">ofte stilte spørsmål (FAQ) lenger ned på siden</Link>, eller <Link href="/kontakt" className="text-primary underline-offset-4 hover:underline">kontakt oss her</Link>.
          </p>
        </div>

      </div>
    </section>
  );
}
