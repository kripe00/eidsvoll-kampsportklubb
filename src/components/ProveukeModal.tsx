"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Sparkles, CheckCircle2, Flame, Calendar, X } from "lucide-react";
import Link from "next/link";

export function ProveukeModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Voksen / Ungdom (fra 14 år)",
    message: "",
  });

  // Prevent scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `[Gratis Prøveuke] ${formData.category}`,
        message: `PÅMELDING TIL GRATIS PRØVEUKE\n\nNavn: ${formData.name}\nE-post: ${formData.email}\nTelefon: ${formData.phone}\nKategori/Alder: ${formData.category}\n\nEkstra melding/spørsmål:\n${formData.message || "Ingen melding angitt."}`,
        category: formData.category,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "Voksen / Ungdom (fra 14 år)",
        message: "",
      });
    } catch (err: any) {
      console.error("Feil ved påmelding til prøveuke:", err);
      setStatus("error");
      setErrorMessage("Det oppstod en feil under påmeldingen. Vennligst prøv igjen eller ta kontakt med oss på kontakt@kampsporteidsvoll.no.");
    }
  };

  return (
    <>
      {/* Trigger button */}
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
        {trigger || (
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-5 py-2 text-sm shadow-md shadow-red-600/20 hover:scale-105 transition-all flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-white text-white animate-pulse" />
            <span>Gratis Prøveuke</span>
          </Button>
        )}
      </div>

      {/* Modal Backdrop & Container */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
          
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={() => setOpen(false)}
          />

          {/* Dialog Card */}
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl z-10 p-0">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Lukk dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Banner */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-6 md:p-8 text-white relative">
              <div className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-amber-300 font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-3 border border-amber-400/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1 Uke Gratis Trening • Prøv Alle Sporter!</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Start Din Gratis Prøveuke
              </h2>
              <p className="text-red-100 text-sm mt-2 leading-relaxed">
                Hos oss trenger du ikke velge én sport. I prøveuken har du fri tilgang til å prøve både <strong className="text-white font-bold">BJJ, Muay Thai, Crosstrening og Yoga!</strong>
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8">
              {status === "success" ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Velkommen til prøveuke! 🎉</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Takk for din påmelding! Vi har sendt en bekreftelse til din e-post. Du kan møte opp på hvilken som helst økt som passer for deg på Dal.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/timeplan" onClick={() => setOpen(false)}>
                      <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 font-bold gap-2">
                        <Calendar className="w-4 h-4" />
                        Se Timeplan & Treningstider
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => { setStatus("idle"); setOpen(false); }} className="w-full sm:w-auto border-slate-800 text-slate-300">
                      Lukk
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Badges / Included Sports */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-2">
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center">
                      <span className="text-xs font-bold block text-red-400">🥋 BJJ</span>
                      <span className="text-[10px] text-slate-400">Jiu-Jitsu</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center">
                      <span className="text-xs font-bold block text-amber-400">🥊 Muay Thai</span>
                      <span className="text-[10px] text-slate-400">Thaiboksing</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center">
                      <span className="text-xs font-bold block text-blue-400">🏋️ Cross</span>
                      <span className="text-[10px] text-slate-400">Crosstrening</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-center">
                      <span className="text-xs font-bold block text-emerald-400">🧘 Yoga</span>
                      <span className="text-[10px] text-slate-400">Yinsaya</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Navn på utøver / foresatt *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="F.eks. Ola Nordmann"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        E-postadresse *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="din@epost.no"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Telefonnummer *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="F.eks. 976 10 229"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Aldersgruppe *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-red-500 text-sm"
                      >
                        <option value="Voksen / Ungdom (fra 14 år)">Voksen / Ungdom (fra 14 år)</option>
                        <option value="Barneparti 1 (6-9 år)">Barneparti 1 (6-9 år)</option>
                        <option value="Barneparti 2 (10-13 år)">Barneparti 2 (10-13 år)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Har du spørsmål eller ønsker du å fortelle oss noe? (Valgfritt)
                    </label>
                    <textarea
                      placeholder="Skriv inn her dersom du har spørsmål om utstyr, forhåndserfaring etc..."
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500 text-sm resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-400 bg-red-950/50 p-2.5 rounded-xl border border-red-900/50">
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold py-6 text-base rounded-xl shadow-lg shadow-red-600/25 transition-all mt-2"
                  >
                    {status === "loading" ? "Registrerer prøveuke..." : "Start Min Gratis Prøveuke Nå 🚀"}
                  </Button>

                  <p className="text-[11px] text-slate-400 text-center pt-1">
                    🔒 Helt uforpliktende. Ingen bindingstid eller skjulte kostnader.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
