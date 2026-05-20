import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siden ble ikke funnet",
  description: "Beklager, siden du leter etter finnes ikke eller har blitt flyttet.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        {/* Large 404 number */}
        <p className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-primary/10 select-none">
          404
        </p>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase -mt-10 md:-mt-16 mb-6">
          Oops! <span className="text-primary italic font-light lowercase">feil vei</span>
        </h1>

        {/* Decorative line */}
        <div className="w-16 h-[1px] bg-primary mx-auto mb-8" />

        {/* Description */}
        <p className="text-lg text-muted-foreground/80 font-light mb-12 max-w-md mx-auto leading-relaxed">
          Siden du leter etter finnes dessverre ikke, eller har blitt flyttet. 
          Kanskje du finner det du ser etter fra forsiden?
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-14 px-8 bg-foreground text-background hover:bg-primary hover:text-white transition-all text-sm font-black uppercase tracking-widest"
          >
            Til forsiden
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center h-14 px-8 border border-border hover:border-primary hover:text-primary transition-all text-sm font-bold uppercase tracking-widest text-muted-foreground"
          >
            Kontakt oss
          </Link>
        </div>
      </div>
    </div>
  );
}
