import { ShieldCheck, Info } from "lucide-react";

export function Safety() {
  return (
    <section className="py-32 bg-[#050b1a] relative overflow-hidden">
      {/* Decorative navy glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-primary w-6 h-6" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Sikkerhet & Etikk</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-8 text-white leading-tight uppercase">
              Et trygt miljø <br /><span className="text-primary/80 italic font-light lowercase">for alle</span>
            </h2>
            <div className="w-24 h-[1px] bg-primary/60 mb-10" />
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light">
              I Eidsvoll Kampsportklubb har vi nulltoleranse for mobbing, rasisme og enhver form for diskriminering. Vi stiller oss også sterkt bak en ren idrett, med absolutt nulltoleranse for doping.
            </p>
          </div>

          <div className="relative group">
            {/* The Integrated Panel: thin border, semi-transparent background */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/30 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#081125]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-10 md:p-14">
              <Info className="text-primary/40 w-10 h-10 mb-8 stroke-[1px]" />
              <p className="text-lg text-slate-200 leading-relaxed font-medium">
                Vi forholder oss til Norges Idrettsforbund (NIF) sine generelle retningslinjer for et trygt og helsefremmende treningsmiljø. 
              </p>
              <div className="my-8 h-px bg-white/5 w-full" />
              <p className="text-lg text-slate-400 leading-relaxed">
                Hos oss skal all trening foregå i kontrollerte og trygge rammer, der utøverens helse og velferd alltid kommer i første rekke. Alle våre trenere er innforstått med sitt ansvar som forbilder og veiledere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
