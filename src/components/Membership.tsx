import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";

interface MembershipProps {
  title?: string;
  description?: string;
  linkUrl?: string;
  [key: string]: any;
}

export function Membership(props: MembershipProps) {
  const { 
    title = "Bli en del av fellesskapet", 
    description = "Uansett om du er nybegynner eller erfaren, er du velkommen hos oss. Vi bruker MinIdrett for en trygg og enkel administrasjon av ditt medlemskap.",
    linkUrl = "https://minidrett.nif.no"
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
          
          <Link href={linkUrl} target="_blank" rel="noopener noreferrer" data-tina-field={tinaField(props, 'linkUrl')}>
            <Button size="lg" className="group h-20 px-10 text-xl font-bold rounded-none bg-primary hover:bg-primary/90 text-white transition-all duration-300">
              BLI MEDLEM NÅ
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>

          {props.extraInfo && (
            <RichText 
              content={props.extraInfo}
              className="mt-8 p-4 bg-muted/40 border border-border/40 rounded-lg max-w-sm mx-auto text-xs text-muted-foreground/80 leading-relaxed text-center"
              data-tina-field={tinaField(props, 'extraInfo')}
            />
          )}

          <p className="mt-12 text-sm text-muted-foreground/60">
            Har du spørsmål før du melder deg inn? <Link href="/kontakt" className="text-primary underline-offset-4 hover:underline">Kontakt oss her</Link>.
          </p>
        </div>

      </div>
    </section>
  );
}
