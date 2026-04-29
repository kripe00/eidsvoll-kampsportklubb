"use client";

import { useTina } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { tinaField } from "tinacms/dist/react";

export function KontaktClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const contact = props.query ? data.contact : props.data.contact;

  return (
    <main className="bg-background min-h-screen pb-24">
      <div className="pt-24 bg-muted/30 border-b border-border/40 pb-16 text-center">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">Kontakt Oss</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Har du spørsmål eller ønsker du en gratis prøvetime? Ikke nøl med å ta kontakt med oss. Vi gleder oss til å høre fra deg!
          </p>
        </div>
      </div>
      
      <section className="container mx-auto px-4 lg:px-8 max-w-6xl -mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-md border-border/50 bg-card overflow-hidden">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Besøksadresse</h3>
                  <p className="text-muted-foreground leading-relaxed" data-tina-field={tinaField(contact, 'address')}>{contact.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-border/50 bg-card overflow-hidden">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Telefon</h3>
                  <p className="text-muted-foreground leading-relaxed" data-tina-field={tinaField(contact, 'phone')}>{contact.phone}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-border/50 bg-card overflow-hidden">
              <CardContent className="p-8 flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">E-post</h3>
                  <p className="text-muted-foreground leading-relaxed break-all" data-tina-field={tinaField(contact, 'email')}>{contact.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-border/50 bg-card h-full">
              <CardContent className="p-10 lg:p-14">
                <h2 className="text-3xl font-bold mb-8">Send oss en melding</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="navn" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Navn</label>
                    <input id="navn" type="text" className="w-full h-14 p-4 border rounded-xl bg-background/50 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Ditt navn" />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="epost" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">E-postadresse</label>
                    <input id="epost" type="email" className="w-full h-14 p-4 border rounded-xl bg-background/50 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="din@epost.no" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label htmlFor="melding" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Din melding</label>
                    <textarea id="melding" rows={6} className="w-full p-4 border rounded-xl bg-background/50 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="Hva kan vi hjelpe deg med?"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <Button type="button" className="w-full md:w-auto px-12 h-14 text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all">Send Melding</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
