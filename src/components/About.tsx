import { tinaField } from "tinacms/dist/react";
import { RichText } from "./RichText";

interface AboutProps {
  title?: string;
  body?: any;
  [key: string]: any;
}

export function About(props: AboutProps) {
  const { title = "Vårt Tilbud", body, image, video } = props;
  
  return (
    <section id="om-oss" className="py-32 bg-background relative overflow-hidden" data-tina-field={tinaField(props, 'title')}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl overflow-hidden md:overflow-visible">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Left Column: Heading or Image/Video */}
          <div className="lg:w-1/2 space-y-12">
            <div className="max-w-md">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-8 break-words">
                Siden <br /><span className="text-primary italic font-light lowercase">2024</span>
              </h2>
              <div className="w-16 h-[1px] bg-primary" />
            </div>

            {video ? (
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]" data-tina-field={tinaField(props, 'video')}>
                <video 
                  src={video} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-auto object-cover aspect-[4/5] md:aspect-auto"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ) : image && (
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]" data-tina-field={tinaField(props, 'image')}>
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-cover aspect-[4/5] md:aspect-auto"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
              </div>
            )}
          </div>

          {/* Right Column: Body Content */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-10 text-foreground">
              {title}
            </h3>
            <div className="text-xl text-muted-foreground/90 leading-relaxed font-light space-y-8" data-tina-field={tinaField(props, 'body')}>
              <RichText content={body} className="prose prose-lg prose-blue max-w-none text-muted-foreground/90 font-light" />
              {!body && (
                <p>
                  Vårt kjernefokus ligger på kampsportene <strong>Brasiliansk Jiu-Jitsu (BJJ)</strong> og <strong>Muay Thai</strong>. Dette er sporter som bygger både fysisk styrke og mental robusthet. Som et viktig supplement tilbyr vi også <strong>Cross-trening</strong>, lagt opp for å bygge utholdenhet, styrke og forebygge skader.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
