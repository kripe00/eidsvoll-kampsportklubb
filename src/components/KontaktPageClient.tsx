"use client";

import { useState } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { RichText } from "./RichText";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function KontaktPageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const contact = data?.contact || props.data?.contact;
  const page = data?.page || props.data?.page;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
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
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("Beklager, det oppstod en feil. Vennligst prøv igjen senere.");
    }
  };

  return (
    <main className="bg-background min-h-screen pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Editorial Header Area */}
        <div className="pt-32 pb-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-8 break-words" data-tina-field={tinaField(page, 'title')}>
            {page?.title || "Kontakt oss"}
          </h1>
          <div className="max-w-3xl text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-light italic" data-tina-field={tinaField(page, 'description')}>
            <RichText content={page?.description} />
            {!page?.description && (
              <p>Vi vil gjerne høre fra deg! Enten du har spørsmål om treningstider, medlemskap, eller bare vil slå av en prat før du bestemmer deg for å prøve.</p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          {/* Contact Info Column */}
          <div className="lg:col-span-4 space-y-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Informasjon</span>
            </div>

            {contact?.image && (
              <div className="relative aspect-video lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-xl mb-12" data-tina-field={tinaField(contact, 'image')}>
                <img 
                  src={contact.image} 
                  alt="Kontakt" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
              </div>
            )}

            <div className="space-y-12">
              <div className="group" data-tina-field={tinaField(contact, 'address')}>
                <div className="flex items-center gap-3 mb-3 text-primary/40 group-hover:text-primary transition-colors">
                  <MapPin size={20} className="stroke-[1.5px]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Besøk oss</h3>
                </div>
                <p className="text-2xl font-bold text-foreground leading-snug">{contact?.address}</p>
              </div>

              <div className="group" data-tina-field={tinaField(contact, 'phone')}>
                <div className="flex items-center gap-3 mb-3 text-primary/40 group-hover:text-primary transition-colors">
                  <Phone size={20} className="stroke-[1.5px]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Ring oss</h3>
                </div>
                <p className="text-2xl font-bold text-foreground leading-snug">{contact?.phone}</p>
              </div>

              <div className="group" data-tina-field={tinaField(contact, 'email')}>
                <div className="flex items-center gap-3 mb-3 text-primary/40 group-hover:text-primary transition-colors">
                  <Mail size={20} className="stroke-[1.5px]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]">E-post</h3>
                </div>
                <p className="text-2xl font-bold text-foreground leading-snug break-all">{contact?.email}</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8">
            <div className="bg-muted/30 p-8 md:p-16">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-foreground">Send oss en melding</h2>
              
              {status === "success" ? (
                <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={48} className="text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Melding sendt!</h3>
                  <p className="text-muted-foreground mb-8 text-lg">Takk for din henvendelse. Vi svarer deg så snart vi kan.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setStatus("idle")}
                    className="rounded-none border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-widest font-bold"
                  >
                    Send ny melding
                  </Button>
                </div>
              ) : (
                <form className="space-y-10" onSubmit={handleSubmit}>
                  {/* Temporary notice */}
                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-3 mb-8">
                    <AlertCircle size={20} className="text-amber-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-amber-500 font-bold text-sm">Skjemaet er foreløpig under vedlikehold</p>
                      <p className="text-amber-500/80 text-xs">Vennligst kontakt oss direkte via e-post eller telefon i mellomtiden.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Fullt Navn</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-muted-foreground/20" 
                        placeholder="Ola Nordmann" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={true}
                      />
                    </div>
                    <div className="space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">E-post</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-muted-foreground/20" 
                        placeholder="ola@eksempel.no" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Emne</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-muted-foreground/20" 
                      placeholder="Hva gjelder det?" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      disabled={true}
                    />
                  </div>
                  <div className="space-y-4 border-b border-border/60 pb-2 focus-within:border-primary transition-colors">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Melding</label>
                    <textarea 
                      required
                      className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-muted-foreground/20 min-h-[120px] resize-none" 
                      placeholder="Skriv din melding her..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={true}
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-destructive font-bold text-sm bg-destructive/10 p-4 rounded-lg">
                      <AlertCircle size={16} />
                      {errorMessage}
                    </div>
                  )}

                  <Button 
                    className="h-20 px-12 text-xl font-black rounded-none bg-foreground text-background hover:bg-primary hover:text-white transition-all uppercase tracking-widest opacity-50 cursor-not-allowed" 
                    type="button"
                    disabled={true}
                  >
                    Send Melding (Utilgjengelig)
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
