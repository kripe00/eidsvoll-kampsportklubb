"use client";

import { ProveukeModal } from "./ProveukeModal";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Activity, Dumbbell, Sparkles } from "lucide-react";

export function ProveukeSection() {
  return (
    <section className="py-24 bg-slate-950 text-white relative border-y border-slate-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-primary block mb-3">
            Prøveordning for nybegynnere
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white leading-none mb-6">
            Prøv alle våre sporter i 1 uke
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Hos oss trenger du ikke velge én idrett. I prøveuken har du fri tilgang til å delta på alle våre treninger i nye lokaler på Dal.
          </p>
        </div>

        {/* 4 Sport Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: BJJ */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white mb-2 tracking-tight">
              BJJ (Jiu-Jitsu)
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Offisiell Checkmat-klubb. Både gi og no-gi for barn, ungdom og voksne.
            </p>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Fri tilgang
            </span>
          </div>

          {/* Card 2: Muay Thai */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white mb-2 tracking-tight">
              Muay Thai
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Strukturert thaiboksing med fokus på teknikk, styrke og kondisjon.
            </p>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Fri tilgang
            </span>
          </div>

          {/* Card 3: Crosstrening */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Dumbbell className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white mb-2 tracking-tight">
              Crosstrening
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Funksjonell styrke og utholdenhet tilpasset eget nivå i eget sal.
            </p>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Fri tilgang
            </span>
          </div>

          {/* Card 4: Yoga */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white mb-2 tracking-tight">
              Yinsaya Yoga
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Bevegelighet og restitusjon som bygger smidighet og forebygger skader.
            </p>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Fri tilgang
            </span>
          </div>

        </div>

        {/* Action Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-xl font-bold text-white mb-1">
              Ønsker du å prøve matta på Dal?
            </h4>
            <p className="text-slate-400 text-xs">
              Meld deg på prøveuken for å motta informasjon og bekreftelse.
            </p>
          </div>
          <div className="shrink-0">
            <ProveukeModal 
              trigger={
                <Button className="font-bold px-7 py-6 text-sm rounded-xl">
                  Meld deg på prøveuke
                </Button>
              } 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
