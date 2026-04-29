import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";

interface HeroProps {
  welcomeText?: string;
  highlightedText?: string;
  description?: any; // Changed to any to support objects/rich-text
  backgroundImage?: string;
  backgroundVideo?: string;
  parent?: any;
}

export function Hero({ 
  welcomeText = "Velkommen til", 
  highlightedText = "Eidsvoll Kampsportklubb", 
  description = "Eidsvoll Kampsportklubb er mer enn bare et sted å trene – vi er et fellesskap. Med dype røtter på Råholt har vi skapt et inkluderende og trygt miljø der folk i alle aldre, og med ulik erfaringsbakgrunn, kan oppleve ekte idrettsglede og mestring.",
  backgroundImage = "/header.jpg",
  backgroundVideo,
  parent
}: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-48 md:pt-48 md:pb-64">
      {backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-20 scale-105"
          data-tina-field={tinaField(parent, 'backgroundVideo')}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20 transition-all duration-700"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
          data-tina-field={tinaField(parent, 'backgroundImage')}
        />
      )}
      <div className="absolute inset-0 bg-slate-950/75 -z-10" />
      
      <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter font-extrabold text-white mb-8 text-balance">
          <span data-tina-field={tinaField(parent, 'welcomeText')}>{welcomeText}</span> <br className="hidden md:block" />
          <span className="text-primary" data-tina-field={tinaField(parent, 'highlightedText')}>{highlightedText}</span>
        </h1>
        <div className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed" data-tina-field={tinaField(parent, 'description')}>
          <RichText content={description} />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/medlemskap">
            <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              Bli Medlem
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
