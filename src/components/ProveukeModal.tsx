"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Calendar, X } from "lucide-react";
import Link from "next/link";

export function ProveukeModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const getTodayString = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Voksen / Ungdom (fra 14 år)",
    startDate: getTodayString(),
    message: "",
    website: "", // Anti-bot honeypot
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Beregn sluttdato (14 dager / 2 uker etter valgt startdato)
  const calculateEndDate = (startDateStr: string) => {
    if (!startDateStr) return "";
    const start = new Date(startDateStr + "T00:00:00");
    if (isNaN(start.getTime())) return "";
    const end = new Date(start);
    end.setDate(start.getDate() + 14);
    return end.toISOString().split("T")[0];
  };

  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("nb-NO", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const calculatedEndDate = calculateEndDate(formData.startDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const endDate = calculateEndDate(formData.startDate);

      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `[Gratis Prøveperiode 14 Dager] ${formData.category}`,
        message: `PÅMELDING TIL GRATIS PRØVEPERIODE (14 DAGER / 2 UKER)\n\nNavn: ${formData.name}\nE-post: ${formData.email}\nTelefon: ${formData.phone}\nKategori/Alder: ${formData.category}\nØnsket Startdato: ${formData.startDate} (${formatDateDisplay(formData.startDate)})\nSluttdato prøveperiode: ${endDate} (${formatDateDisplay(endDate)})\n\nEkstra melding/spørsmål:\n${formData.message || "Ingen melding angitt."}`,
        category: formData.category,
        startDate: formData.startDate,
        endDate: endDate,
        isProveuke: true,
        followupSent: false,
        website: formData.website,
        createdAt: serverTimestamp(),
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "Voksen / Ungdom (fra 14 år)",
        startDate: getTodayString(),
        message: "",
        website: "",
      });
    } catch (err: any) {
      console.error("Feil ved påmelding til prøveperiode:", err);
      setStatus("error");
      setErrorMessage("Det oppstod en feil under påmeldingen. Vennligst prøv igjen eller ta kontakt med oss på kontakt@kampsporteidsvoll.no.");
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" 
        onClick={() => setOpen(false)}
      />

      {/* Dialog Card matching KontaktPage Client styling */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card text-card-foreground rounded-2xl border border-border shadow-2xl z-10 p-0">
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors border border-border/40"
          aria-label="Lukk dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-8 border-b border-border/40 bg-muted/20">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-2">
            Eidsvoll Kampsportklubb
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-foreground leading-none mb-3">
            Gratis prøveperiode (2 uker)
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Hos oss trenger du ikke velge én idrett. I den 14 dagers prøveperioden har du fri tilgang til å prøve både BJJ, Muay Thai, Crosstrening og Yoga.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8">
          {status === "success" ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">Påmelding mottatt!</h3>
              <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
                Takk for din påmelding. Vi har sendt en bekreftelse til din e-postadresse med datoer for din 14 dagers prøveperiode. Du er hjertelig velkommen!
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/timeplan" onClick={() => setOpen(false)}>
                  <Button className="w-full sm:w-auto font-bold gap-2 rounded-lg">
                    <Calendar className="w-4 h-4" />
                    Se timeplan
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => { setStatus("idle"); setOpen(false); }} className="w-full sm:w-auto rounded-lg">
                  Lukk
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Disciplines badge list */}
              <div className="bg-muted/40 border border-border/60 rounded-xl p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                  Inkludert i prøveperioden (2 uker / 14 dager):
                </span>
                <div className="flex flex-wrap gap-2 text-xs font-bold text-foreground">
                  <span className="bg-background px-3 py-1 rounded-md border border-border/60">BJJ (Jiu-Jitsu)</span>
                  <span className="bg-background px-3 py-1 rounded-md border border-border/60">Muay Thai</span>
                  <span className="bg-background px-3 py-1 rounded-md border border-border/60">Crosstrening</span>
                  <span className="bg-background px-3 py-1 rounded-md border border-border/60">Yoga</span>
                </div>
              </div>

              {/* Anti-bot honeypot field (hidden from humans) */}
              <div className="hidden opacity-0 pointer-events-none absolute w-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                <label htmlFor="modal-website">Website</label>
                <input
                  id="modal-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">Navn *</label>
                  <input
                    id="modal-name"
                    required
                    type="text"
                    placeholder="Fullt navn"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-muted-foreground/30 text-foreground"
                  />
                </div>
                <div className="space-y-2 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">E-post *</label>
                  <input
                    id="modal-email"
                    required
                    type="email"
                    placeholder="ola@eksempel.no"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-muted-foreground/30 text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">Telefon *</label>
                  <input
                    id="modal-phone"
                    required
                    type="tel"
                    placeholder="Mobilnummer"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-muted-foreground/30 text-foreground"
                  />
                </div>
                <div className="space-y-2 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-category" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">Aldersgruppe *</label>
                  <select
                    id="modal-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-transparent text-base font-bold outline-none text-foreground cursor-pointer"
                  >
                    <option value="Voksen / Ungdom (fra 14 år)">Voksen / Ungdom (fra 14 år)</option>
                    <option value="Barneparti 1 (6-9 år)">Barneparti 1 (6-9 år)</option>
                    <option value="Barneparti 2 (10-13 år)">Barneparti 2 (10-13 år)</option>
                  </select>
                </div>
              </div>

              {/* Start Date Field */}
              <div className="space-y-2 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                <div className="flex justify-between items-center">
                  <label htmlFor="modal-startdate" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">Ønsket Startdato *</label>
                  {calculatedEndDate && (
                    <span className="text-[11px] font-semibold text-primary">
                      Prøveperiode (14 dager): {formatDateDisplay(formData.startDate)} – {formatDateDisplay(calculatedEndDate)}
                    </span>
                  )}
                </div>
                <input
                  id="modal-startdate"
                  required
                  type="date"
                  min={getTodayString()}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full bg-transparent text-lg font-bold outline-none text-foreground cursor-pointer"
                />
              </div>

              <div className="space-y-2 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                <label htmlFor="modal-message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">Melding eller spørsmål (Valgfritt)</label>
                <textarea
                  id="modal-message"
                  placeholder="Skriv inn en melding her..."
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground/30 text-foreground resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                  {errorMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full font-bold py-4 text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-md transition-all whitespace-normal h-auto leading-snug px-4 text-center"
              >
                {status === "loading" ? "Sendes..." : "Meld deg på (2 uker gratis)"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Uforpliktende 14-dagers prøveordning hos Eidsvoll Kampsportklubb.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
        {trigger || (
          <Button size="sm" variant="outline" className="rounded-full px-5 py-2 font-bold border-primary/40 text-foreground hover:bg-primary/10 transition-all">
            Gratis prøveperiode (2 uker)
          </Button>
        )}
      </div>

      {open && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
