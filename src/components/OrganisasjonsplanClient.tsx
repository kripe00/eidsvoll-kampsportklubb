"use client";

import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function OrganisasjonsplanClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const content = data?.organisasjonsplan || props.data?.organisasjonsplan;

  return (
    <main className="bg-background min-h-screen pb-32">
      {/* Editorial Header */}
      <div className="pt-32 pb-24 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <Link 
            href="/styret" 
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary uppercase mb-12 hover:gap-4 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Tilbake til styret
          </Link>
          
          <div className="max-w-4xl">
            <h1 
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 text-foreground uppercase leading-[0.95] md:leading-[0.85] break-words" 
              data-tina-field={tinaField(content, 'title')}
            >
              {content.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl pt-24 pb-48">
        {/* Main Content Area */}
        <div className="max-w-4xl">
          <div 
            className="prose prose-xl max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-headings:text-foreground prose-headings:uppercase prose-headings:tracking-tighter prose-strong:text-primary prose-strong:font-black prose-h2:mt-24 prose-h2:mb-12 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border/40 prose-ul:my-10 prose-li:my-4"
            data-tina-field={tinaField(content, 'body')}
          >
            <TinaMarkdown content={content.body} />
          </div>
        </div>
      </div>
    </main>
  );
}
