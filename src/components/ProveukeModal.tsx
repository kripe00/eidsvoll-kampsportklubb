"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Calendar, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

interface ProveukeModalProps {
  trigger?: React.ReactNode;
  defaultDiscipline?: string;
  defaultCategory?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function ProveukeModal({ 
  trigger,
  defaultDiscipline = "BJJ (Brasiliansk Jiu-Jitsu)",
  defaultCategory = "Voksen / Ungdom (fra 14 år)",
  isOpen,
  onOpenChange,
  className
}: ProveukeModalProps) {
  const { t, locale } = useLanguage();
  const isControlled = typeof isOpen === "boolean";
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? isOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (isControlled && onOpenChange) {
      onOpenChange(val);
    } else {
      setInternalOpen(val);
    }
  };

  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const getTodayString = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: defaultCategory || "Voksen / Ungdom (fra 14 år)",
    discipline: defaultDiscipline || "BJJ (Brasiliansk Jiu-Jitsu)",
    startDate: getTodayString(),
    message: "",
    website: "", // Anti-bot honeypot
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (defaultCategory) {
      setFormData((prev) => ({ ...prev, category: defaultCategory }));
    }
  }, [defaultCategory]);

  useEffect(() => {
    if (defaultDiscipline) {
      setFormData((prev) => ({ ...prev, discipline: defaultDiscipline }));
    }
  }, [defaultDiscipline]);

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

  // Beregn sluttdato med tidssone-nøytral UTC-aritmetikk (14 dager / 2 uker etter valgt startdato)
  const calculateEndDate = (startDateStr: string): string => {
    if (!startDateStr) return "";
    const parts = startDateStr.split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return "";
    const [year, month, day] = parts;
    const dateUtc = new Date(Date.UTC(year, month - 1, day));
    if (isNaN(dateUtc.getTime())) return "";
    dateUtc.setUTCDate(dateUtc.getUTCDate() + 14);
    const endYear = dateUtc.getUTCFullYear();
    const endMonth = String(dateUtc.getUTCMonth() + 1).padStart(2, "0");
    const endDay = String(dateUtc.getUTCDate()).padStart(2, "0");
    return `${endYear}-${endMonth}-${endDay}`;
  };

  const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
    const [year, month, day] = parts;
    return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
  };

  const calculatedEndDate = calculateEndDate(formData.startDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const endDate = calculateEndDate(formData.startDate);
      const subjectPrefix = formData.discipline ? `${formData.discipline} - ` : "";

      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `[Gratis Prøveperiode 14 Dager] ${subjectPrefix}${formData.category}`,
        message: `PÅMELDING TIL GRATIS PRØVEPERIODE (14 DAGER / 2 UKER)\n\nNavn: ${formData.name}\nE-post: ${formData.email}\nTelefon: ${formData.phone}\nKategori/Alder: ${formData.category}\nØnsket gren: ${formData.discipline || "Ikke spesifisert"}\nØnsket Startdato: ${formData.startDate} (${formatDateDisplay(formData.startDate)})\nSluttdato prøveperiode: ${endDate} (${formatDateDisplay(endDate)})\n\nEkstra melding/spørsmål:\n${formData.message || "Ingen melding angitt."}`,
        discipline: formData.discipline,
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
        category: defaultCategory || "Voksen / Ungdom (fra 14 år)",
        discipline: defaultDiscipline || "BJJ (Brasiliansk Jiu-Jitsu)",
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md" 
        onClick={() => setOpen(false)}
      />

      {/* Dialog Card matching KontaktPage Client styling */}
      <div className="relative w-full max-w-lg sm:max-w-xl max-h-[96vh] overflow-y-auto bg-card text-card-foreground rounded-2xl border border-border shadow-2xl z-10 p-0">
        
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors border border-border/40"
          aria-label="Lukk dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-border/40 bg-muted/20">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary block mb-0.5">
            Eidsvoll Kampsportklubb
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground leading-tight">
            {t.proveuke.modalTitle}
          </h2>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6">
          {status === "success" ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-foreground">{t.proveuke.successTitle}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                {t.proveuke.successMessage}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                <Link href="/timeplan" onClick={() => setOpen(false)}>
                  <Button className="w-full sm:w-auto font-bold gap-2 rounded-lg h-10 text-xs sm:text-sm">
                    <Calendar className="w-4 h-4" />
                    {t.nav.schedule}
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => { setStatus("idle"); setOpen(false); }} className="w-full sm:w-auto rounded-lg h-10 text-xs sm:text-sm">
                  {t.proveuke.closeButton}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              
              {/* Disciplines badge list */}
              <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg border border-border/50">
                <span className="font-semibold text-foreground">2 ukers gratis prøveperiode</span>
                <span className="text-muted-foreground/80">BJJ · Muay Thai · Crosstrening · Yoga</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-y-3">
                <div className="space-y-1 border-b border-border/60 pb-1 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">{t.proveuke.nameLabel} *</label>
                  <input
                    id="modal-name"
                    required
                    type="text"
                    placeholder={t.proveuke.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-semibold outline-none placeholder:text-muted-foreground/30 text-foreground"
                  />
                </div>
                <div className="space-y-1 border-b border-border/60 pb-1 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">{t.proveuke.emailLabel} *</label>
                  <input
                    id="modal-email"
                    required
                    type="email"
                    placeholder={t.proveuke.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-semibold outline-none placeholder:text-muted-foreground/30 text-foreground"
                  />
                </div>

                <div className="space-y-1 border-b border-border/60 pb-1 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">{t.proveuke.phoneLabel} *</label>
                  <input
                    id="modal-phone"
                    required
                    type="tel"
                    placeholder={t.proveuke.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-semibold outline-none placeholder:text-muted-foreground/30 text-foreground"
                  />
                </div>
                <div className="space-y-1 border-b border-border/60 pb-1 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-category" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">
                    {locale === "uk" ? "Вікова група *" : locale === "pl" ? "Grupa wiekowa *" : locale === "en" ? "Age group *" : "Aldersgruppe *"}
                  </label>
                  <select
                    id="modal-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-semibold outline-none text-foreground cursor-pointer"
                  >
                    <option value="Voksen / Ungdom (fra 14 år)">
                      {locale === "uk" ? "Дорослі / Підлітки (від 14 років)" : locale === "pl" ? "Dorośli / Młodzież (od 14 lat)" : locale === "en" ? "Adults / Youth (14+ yrs)" : "Voksen / Ungdom (fra 14 år)"}
                    </option>
                    <option value="Barneparti 1 (6-9 år)">
                      {locale === "uk" ? "Діти 1 (6-9 років)" : locale === "pl" ? "Dzieci 1 (6-9 lat)" : locale === "en" ? "Kids 1 (6-9 yrs)" : "Barneparti 1 (6-9 år)"}
                    </option>
                    <option value="Barneparti 2 (10-13 år)">
                      {locale === "uk" ? "Діти 2 (10-13 років)" : locale === "pl" ? "Dzieci 2 (10-13 lat)" : locale === "en" ? "Kids 2 (10-13 yrs)" : "Barneparti 2 (10-13 år)"}
                    </option>
                  </select>
                </div>

                <div className="space-y-1 border-b border-border/60 pb-1 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-discipline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">
                    {t.proveuke.disciplineLabel} *
                  </label>
                  <select
                    id="modal-discipline"
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full bg-transparent text-sm sm:text-base font-semibold outline-none text-foreground cursor-pointer"
                  >
                    {Boolean(formData.discipline && ![
                      "BJJ (Brasiliansk Jiu-Jitsu)",
                      "Muay Thai / Thaiboksing",
                      "Crosstrening (CT)",
                      "Yoga (Yinsaya Yoga)",
                      "BJJ & Muay Thai (Begge kampsporter)",
                      "Usikker / Vil prøve alt"
                    ].includes(formData.discipline)) && (
                      <option value={formData.discipline}>{formData.discipline}</option>
                    )}
                    <option value="BJJ (Brasiliansk Jiu-Jitsu)">
                      {t.proveuke.disciplineBjj}
                    </option>
                    <option value="Muay Thai / Thaiboksing">
                      {t.proveuke.disciplineMuayThai}
                    </option>
                    <option value="Crosstrening (CT)">
                      {t.proveuke.disciplineCt}
                    </option>
                    <option value="Yoga (Yinsaya Yoga)">
                      {t.proveuke.disciplineYoga}
                    </option>
                    <option value="BJJ & Muay Thai (Begge kampsporter)">
                      {t.proveuke.disciplineBoth}
                    </option>
                    <option value="Usikker / Vil prøve alt">
                      {t.proveuke.disciplineUnsure}
                    </option>
                  </select>
                </div>

                <div className="space-y-1 border-b border-border/60 pb-1 focus-within:border-primary transition-colors">
                  <div className="flex justify-between items-center">
                    <label htmlFor="modal-startdate" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">
                      {locale === "uk" ? "Startdato *" : locale === "pl" ? "Data rozpoczęcia *" : locale === "en" ? "Start date *" : "Ønsket Startdato *"}
                    </label>
                    {calculatedEndDate && (
                      <span className="text-[10px] font-semibold text-primary">
                        til {formatDateDisplay(calculatedEndDate)}
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
                    className="w-full bg-transparent text-sm sm:text-base font-semibold outline-none text-foreground cursor-pointer"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1 border-b border-border/60 pb-1 focus-within:border-primary transition-colors">
                  <label htmlFor="modal-message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 block">
                    {locale === "uk" ? "Melding eller spørsmål (valgfritt)" : locale === "pl" ? "Wiadomość lub pytania (opcjonalnie)" : locale === "en" ? "Message or questions (optional)" : "Melding eller spørsmål (valgfritt)"}
                  </label>
                  <input
                    id="modal-message"
                    type="text"
                    placeholder={locale === "uk" ? "Введіть повідомлення..." : locale === "pl" ? "Wpisz wiadomość..." : locale === "en" ? "Write a message here..." : "Skriv eventuell beskjed her..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/30 text-foreground"
                  />
                </div>
              </div>

              {status === "error" && (
                <p className="text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg border border-destructive/20">
                  {errorMessage || t.proveuke.errorMessage}
                </p>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full font-bold h-11 text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-md transition-all whitespace-normal leading-snug px-4 text-center"
                >
                  {status === "loading" ? t.proveuke.submitting : t.proveuke.submitButton}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center mt-2">
                  {t.proveuke.card3Desc}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div onClick={() => setOpen(true)} className={cn("cursor-pointer", className || "inline-block")}>
        {trigger || (
          <Button size="sm" variant="outline" className="rounded-full px-5 py-2 font-bold border-primary/40 text-foreground hover:bg-primary/10 transition-all">
            {t.nav.tryFree}
          </Button>
        )}
      </div>

      {open && mounted && createPortal(modalContent, document.body)}
    </>
  );
}
