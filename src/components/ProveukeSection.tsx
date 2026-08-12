"use client";

import { ProveukeModal } from "./ProveukeModal";
import { Button } from "@/components/ui/button";
import { Flame, CheckCircle2, Sparkles, Trophy, Calendar, ShieldCheck, HeartPulse } from "lucide-react";

export function ProveukeSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-y border-slate-800/80">
      
      {/* Dynamic Background Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-600/30 text-red-400 font-extrabold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>INGEN BINDINGSTID • 100% UFORPLIKTENDE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight mb-4">
            Prøv <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-amber-500">Alle Sporter Gratis</span> I 1 Uke
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Hos os trenger du ikke velge én idrett. I løpet av din prøveuke står dørene åpne på alle våre treninger i nye lokaler på Dal!
          </p>
        </div>

        {/* 4 Sport Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: BJJ */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-red-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-4 text-2xl font-black group-hover:scale-110 transition-transform">
              🥋
            </div>
            <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">
              BJJ (Jiu-Jitsu)
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Offisiell Checkmat-klubb. Både gi og no-gi for barn, ungdom og voksne.
            </p>
            <div className="text-[11px] font-bold text-red-400 bg-red-950/40 px-2.5 py-1 rounded inline-block">
              Inkludert i prøveuken
            </div>
          </div>

          {/* Card 2: Muay Thai */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4 text-2xl font-black group-hover:scale-110 transition-transform">
              🥊
            </div>
            <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">
              Muay Thai
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Ekte thaiboksing med slag, spark og knær. Super trening for hele kroppen.
            </p>
            <div className="text-[11px] font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded inline-block">
              Inkludert i prøveuken
            </div>
          </div>

          {/* Card 3: Crosstrening */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 text-2xl font-black group-hover:scale-110 transition-transform">
              🏋️
            </div>
            <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">
              Crosstrening
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Funksjonell styrke og kondisjon tilpasset eget nivå i eget CT/yoga sal.
            </p>
            <div className="text-[11px] font-bold text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded inline-block">
              Inkludert i prøveuken
            </div>
          </div>

          {/* Card 4: Yoga */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 text-2xl font-black group-hover:scale-110 transition-transform">
              🧘
            </div>
            <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">
              Yinsaya Yoga
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Restitusjon, bevegelighet og smidighet – perfekt supplement til kampsport.
            </p>
            <div className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded inline-block">
              Inkludert i prøveuken
            </div>
          </div>

        </div>

        {/* CTA Banner Bottom */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center max-w-4xl mx-auto shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h4 className="text-2xl font-bold text-white mb-2">
              Klar for å prøve matta på Dal?
            </h4>
            <p className="text-slate-400 text-sm">
              Meld deg på på under 30 sekunder. Du mottar en bekreftelse og kan møte opp direkte på neste trening!
            </p>
          </div>
          <div className="shrink-0">
            <ProveukeModal 
              trigger={
                <Button className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-lg rounded-full px-8 py-6 shadow-xl shadow-red-600/20 hover:scale-105 transition-all">
                  <Flame className="w-5 h-5 mr-2 fill-white animate-pulse" />
                  Meld Deg På Gratis Prøveuke
                </Button>
              } 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
