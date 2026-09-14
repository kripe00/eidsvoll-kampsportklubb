"use client";

import { useState } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { RichText } from "./RichText";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { OptimizedImage } from "./ui/optimized-image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function KontaktPageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { locale, t } = useLanguage();

  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const contact = props.data?.contact || data?.contact;
  const page = props.data?.page || data?.page;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Anti-bot honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage(t.contact.errorMessage);
    }
  };

  const pageTitle = locale === "no" ? (page?.title || t.contact.title) : t.contact.title;

  return (
    <main className="bg-background min-h-screen pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Editorial Header Area */}
        <div className="pt-32 pb-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-8 break-words" data-tina-field={tinaField(page, 'title')}>
            {pageTitle}
          </h1>
          <div className="max-w-3xl text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-light italic" data-tina-field={tinaField(page, 'description')}>
            {locale === "no" ? (
              <>
                <RichText content={page?.description} />
                {!page?.description && (
                  <p>{t.contact.subtitle}</p>
                )}
              </>
            ) : (
              <p>{t.contact.subtitle}</p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-4 space-y-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">
                {t.contact.infoBadge}
              </span>
            </div>

            {contact?.image && (
              <div className="relative aspect-video lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-xl mb-12" data-tina-field={tinaField(contact, 'image')}>
                <OptimizedImage 
                  src={contact.image} 
                  alt="Kontakt" 
                  fill={true}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
              </div>
            )}

            <div className="space-y-12">
              <div className="group" data-tina-field={tinaField(contact, 'address')}>
                <div className="flex items-center gap-3 mb-3 text-primary/40 group-hover:text-primary transition-colors">
                  <MapPin size={20} className="stroke-[1.5px]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{t.contact.visitUs}</h3>
                </div>
                <p className="text-2xl font-bold text-foreground leading-snug">{contact?.address}</p>
              </div>

              <div className="group" data-tina-field={tinaField(contact, 'phone')}>
                <div className="flex items-center gap-3 mb-3 text-primary/40 group-hover:text-primary transition-colors">
                  <Phone size={20} className="stroke-[1.5px]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{t.contact.callUs}</h3>
                </div>
                <p className="text-2xl font-bold text-foreground leading-snug">{contact?.phone}</p>
              </div>

              <div className="group" data-tina-field={tinaField(contact, 'email')}>
                <div className="flex items-center gap-3 mb-3 text-primary/40 group-hover:text-primary transition-colors">
                  <Mail size={20} className="stroke-[1.5px]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{t.contact.emailUs}</h3>
                </div>
                <p className="text-2xl font-bold text-foreground leading-snug break-all">{contact?.email}</p>
              </div>

              {(contact?.facebook || contact?.instagram) && (
                <div className="group pt-4">
                  <div className="flex items-center gap-3 mb-4 text-primary/40">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">{t.contact.followUs}</h3>
                  </div>
                  <div className="flex gap-4">
                    {contact.facebook && (
                      <a 
                        href={contact.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300"
                        aria-label="Facebook"
                        data-tina-field={tinaField(contact, 'facebook')}
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    )}
                    {contact.instagram && (
                      <a 
                        href={contact.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card hover:bg-primary hover:text-white transition-all text-muted-foreground duration-300"
                        aria-label="Instagram"
                        data-tina-field={tinaField(contact, 'instagram')}
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8">
            <div className="bg-muted/30 p-5 sm:p-8 md:p-16 rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-6 sm:mb-10 text-foreground">
                {t.contact.formTitle}
              </h2>
              
              {status === "success" ? (
                <div className="bg-primary/10 border border-primary/20 p-6 sm:p-8 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={48} className="text-primary mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{t.contact.successTitle}</h3>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg">{t.contact.successMessage}</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setStatus("idle")}
                    className="rounded-xl border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-widest font-bold px-6 py-3"
                  >
                    {t.contact.sendAnother}
                  </Button>
                </div>
              ) : (
                <form className="space-y-6 sm:space-y-10" onSubmit={handleSubmit}>
                  {/* Anti-bot honeypot field (hidden from humans) */}
                  <div className="hidden opacity-0 pointer-events-none absolute w-0 h-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="contact-website">Website</label>
                    <input 
                      id="contact-website"
                      type="text" 
                      name="website"
                      tabIndex={-1} 
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
                    <div className="space-y-2 sm:space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                      <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        {t.contact.nameLabel}
                      </label>
                      <input 
                        id="contact-name"
                        type="text" 
                        required
                        className="w-full bg-transparent text-base sm:text-xl font-bold outline-none placeholder:text-muted-foreground/20" 
                        placeholder={t.contact.namePlaceholder} 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="space-y-2 sm:space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                      <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                        {t.contact.emailLabel}
                      </label>
                      <input 
                        id="contact-email"
                        type="email" 
                        required
                        className="w-full bg-transparent text-base sm:text-xl font-bold outline-none placeholder:text-muted-foreground/20" 
                        placeholder={t.contact.emailPlaceholder} 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                    <label htmlFor="contact-subject" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {t.contact.subjectLabel}
                    </label>
                    <input 
                      id="contact-subject"
                      type="text" 
                      required
                      className="w-full bg-transparent text-base sm:text-xl font-bold outline-none placeholder:text-muted-foreground/20" 
                      placeholder={t.contact.subjectPlaceholder} 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                    <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {t.contact.messageLabel}
                    </label>
                    <textarea 
                      id="contact-message"
                      required
                      className="w-full bg-transparent text-base sm:text-xl font-bold outline-none placeholder:text-muted-foreground/20 min-h-[100px] sm:min-h-[120px] resize-none" 
                      placeholder={t.contact.messagePlaceholder} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === "loading"}
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-destructive font-bold text-sm bg-destructive/10 p-4 rounded-lg">
                      <AlertCircle size={16} />
                      {errorMessage}
                    </div>
                  )}

                  <Button 
                    className="w-full sm:w-auto h-14 sm:h-16 md:h-20 px-8 sm:px-12 text-base sm:text-xl font-black rounded-xl bg-foreground text-background hover:bg-primary hover:text-white transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3" 
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t.contact.sending}
                      </>
                    ) : (
                      t.contact.sendButton
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
