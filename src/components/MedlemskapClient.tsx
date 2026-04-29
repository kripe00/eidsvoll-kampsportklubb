"use client";

import { useTina } from "tinacms/dist/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, ExternalLink } from "lucide-react";
import { tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { RichText } from "./RichText";

export function MedlemskapClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const page = props.query ? data.page : props.data.page;
  const mainBlock = page.blocks?.find((b: any) => b._template === 'about');

  return (
    <main className="bg-background min-h-screen pb-24">
      <div className="pt-24 bg-muted/30 border-b border-border/40 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8" data-tina-field={tinaField(page, 'title')}>
            {page.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Vi har plass til alle, uansett om du er nybegynner eller har trent kampsport i mange år.
          </p>
          <div className="mt-10">
            <a href="https://minidrett.nif.no" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20">
                Bli Medlem i MinIdrett <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 lg:px-8 max-w-6xl -mt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg border-primary/10 bg-card overflow-hidden transition-all hover:shadow-2xl">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="pt-8 text-center">
              <CardTitle className="text-2xl mb-2">Barn & Ungdom</CardTitle>
              <div className="text-4xl font-bold text-primary mb-2">350,- <span className="text-base font-normal text-muted-foreground">/ mnd</span></div>
              <p className="text-muted-foreground">For utøvere under 13 år</p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 flex-shrink-0" /> Tilgang til alle barnegrupper</li>
                <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 flex-shrink-0" /> Erfarne trenere og trygt miljø</li>
                <li className="flex items-center gap-3"><ShieldCheck className="text-primary w-5 h-5 flex-shrink-0" /> Fokus på mestring og lek</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-primary/20 bg-card overflow-hidden transition-all hover:shadow-2xl">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="pt-8 text-center">
              <CardTitle className="text-2xl mb-2">Voksen / Senior</CardTitle>
              <div className="text-4xl font-bold text-primary mb-2">500,- <span className="text-base font-normal text-muted-foreground">/ mnd</span></div>
              <p className="text-muted-foreground">For utøvere over 13 år</p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 flex-shrink-0" /> BJJ, Muay Thai & Cross-trening</li>
                <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 flex-shrink-0" /> Full tilgang til alle timer</li>
                <li className="flex items-center gap-3"><Check className="text-primary w-5 h-5 flex-shrink-0" /> Ingen bindingstid</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {mainBlock && (
          <div className="mt-20 max-w-4xl mx-auto bg-card p-10 lg:p-14 rounded-3xl border border-border shadow-md" data-tina-field={tinaField(mainBlock)}>
            <h2 className="text-3xl font-bold mb-8">{mainBlock.title}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground">
              <RichText content={mainBlock.body} />
            </div>
            <div className="mt-12 flex justify-center">
              <a href="https://minidrett.nif.no" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="rounded-xl px-8 border-primary/20 hover:bg-primary/5">
                  Gå til MinIdrett <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
