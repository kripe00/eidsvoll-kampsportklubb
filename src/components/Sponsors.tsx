import { Button } from "@/components/ui/button";
import { Heart, Briefcase, Mail } from "lucide-react";

export function Sponsors() {
  const sponsorLogos = Array.from({ length: 8 });

  return (
    <section id="sponsorer" className="py-32 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Pitch Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-primary w-5 h-5 stroke-[1.5px]" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Våre Partnere</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter text-foreground uppercase leading-[0.9] mb-8">
              Støttespillere <br /><span className="text-primary/60 italic font-light lowercase">& samfunnsbyggere</span>
            </h2>
            <div className="w-20 h-[1px] bg-primary/40 mb-10" />
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-light max-w-lg">
              Vi er takknemlige for våre partnere som gjør det mulig å drive et trygt idrettstilbud. Din bedrift kan bidra til lokal vekst og sunn idrettskultur.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <Briefcase className="text-primary w-6 h-6 shrink-0 mt-1 stroke-[1.25px]" />
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">Eksponering</h3>
                  <p className="text-muted-foreground">Bli synlig for hundrevis av aktive medlemmer og familier.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-primary w-6 h-6 shrink-0 mt-1 stroke-[1.25px]" />
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">Samfunnsansvar</h3>
                  <p className="text-muted-foreground">Støtt et sunt og inkluderende miljø for barn og unge.</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-none border border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-all">
              BLI SPONSOR
            </Button>
          </div>

          {/* Minimalist Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border/20 border border-border/20">
            {sponsorLogos.map((_, i) => (
              <div 
                key={i} 
                className="aspect-square bg-white dark:bg-background/40 flex items-center justify-center grayscale opacity-40 hover:opacity-100 transition-all duration-500"
              >
                <div className="w-12 h-12 border border-dashed border-border/40 rounded-full flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-tighter text-muted-foreground/30">Logo</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
