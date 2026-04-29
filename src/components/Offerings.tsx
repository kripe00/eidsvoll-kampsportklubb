import { Shield, Users, Zap } from "lucide-react";

export function Offerings() {
  const offerings = [
    {
      title: "Brasiliansk Jiu-Jitsu",
      subtitle: "Voksne / Viderekomne",
      description: "Høyt tempo, teknisk dybde og fokus på mestring. Perfekt for deg som vil utfordre deg selv fysisk og mentalt.",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Muay Thai / Thaiboksing",
      subtitle: "Barn & Ungdom / Alle nivåer",
      description: "Lekende og strukturert trening som bygger selvtillit, disiplin og respekt. Et fantastisk miljø for alle aldre.",
      image: "https://images.unsplash.com/photo-1599058917233-57c0e680c053?q=80&w=1200",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Cross-trening",
      subtitle: "Nybegynnere & Viderekomne",
      description: "Ingen erfaring kreves. Vi lærer deg grunnleggende teknikker i et trygt og inkluderende miljø hvor alle støtter hverandre.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  return (
    <section id="tilbud" className="py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-8">
              Trening for <br /><span className="text-primary italic font-light lowercase">alle</span>
            </h2>
            <p className="text-xl text-muted-foreground/80 font-light max-w-md italic">
              Uansett alder eller erfaring har vi et parti som passer for deg. Bli en del av fellesskapet.
            </p>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-primary mb-6" />
        </div>

        <div className="space-y-40">
          {offerings.map((offering, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image Side */}
              <div className="lg:w-3/5 relative group w-full overflow-hidden lg:overflow-visible">
                <div className="hidden lg:block absolute -inset-4 bg-primary/5 scale-95 group-hover:scale-100 transition-transform duration-700" />
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={offering.image} 
                    alt={offering.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:w-2/5">
                <div className="flex items-center gap-3 mb-4 text-primary">
                  {offering.icon}
                  <span className="text-sm font-bold tracking-[0.2em] uppercase">{offering.subtitle}</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase mb-6">
                  {offering.title}
                </h3>
                <p className="text-xl text-muted-foreground leading-relaxed font-light">
                  {offering.description}
                </p>
                <div className=" mt-10 w-12 h-[1px] bg-primary/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
