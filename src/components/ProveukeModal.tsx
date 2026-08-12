"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Calendar, X, ShieldCheck } from "lucide-react";
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
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
        {trigger || (
          <Button size="sm" variant="outline" className="rounded-full px-5 py-2 font-bold border-primary/40 text-foreground hover:bg-primary/10 transition-all">
            Gratis prøveuke
          </Button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-150">
          
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl z-10 p-0">
            
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
              aria-label="Lukk dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Editorial Header */}
            <div className="p-6 md:p-8 border-b border-slate-900 bg-slate-950">
              <span className="text-xs uppercase font-bold tracking-widest text-primary block mb-2">
                Eidsvoll Kampsportklubb
              </span>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-none mb-3">
                Gratis prøveuke
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Prøv alle våre sporter (BJJ, Muay Thai, Crosstrening og Yoga) uforpliktende i 1 uke.
              </p>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8">
              {status === "success" ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">Påmelding mottatt</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                    Vi har sendt en bekreftelse til din e-postadresse. Du er hjertelig velkommen til å møte opp på neste trening på Dal!
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/timeplan" onClick={() => setOpen(false)}>
                      <Button className="w-full sm:w-auto font-bold gap-2">
                        <Calendar className="w-4 h-4" />
                        Se timeplan
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => { setStatus("idle"); setOpen(false); }} className="w-full sm:w-auto border-slate-800 text-slate-300">
                      Lukk
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Included Disciplines */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Inkludert i prøveuken:
                    </span>
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300">
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">BJJ (Jiu-Jitsu)</span>
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">Muay Thai</span>
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">Crosstrening</span>
                      <span className="bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">Yoga</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Navn *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Fullt navn"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        E-postadresse *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="navn@epost.no"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Telefon *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="Mobilnummer"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Aldersgruppe *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-primary text-sm"
                      >
                        <option value="Voksen / Ungdom (fra 14 år)">Voksen / Ungdom (fra 14 år)</option>
                        <option value="Barneparti 1 (6-9 år)">Barneparti 1 (6-9 år)</option>
                        <option value="Barneparti 2 (10-13 år)">Barneparti 2 (10-13 år)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Melding eller spørsmål (Valgfritt)
                    </label>
                    <textarea
                      placeholder="Skriv inn en melding dersom du har spørsmål..."
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary text-sm resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-900/40">
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-5 text-sm rounded-lg transition-all mt-2"
                  >
                    {status === "loading" ? "Registrerer..." : "Meld deg på gratis prøveuke"}
                  </Button>

                  <p className="text-[11px] text-slate-500 text-center pt-1">
                    Uforpliktende prøveordning i Eidsvoll Kampsportklubb.
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
