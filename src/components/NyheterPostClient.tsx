"use client";

import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { CalendarIcon, ArrowLeft } from "lucide-react";

export function NyheterPostClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const post = data.news;
  
  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Laster inn...</div>;
  }

  const formattedDate = post.date 
    ? format(new Date(post.date), "d. MMMM yyyy", { locale: nb })
    : "";

  return (
    <article className="min-h-screen pb-24 bg-background">
      {/* Header Area */}
      <div className="bg-muted pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Link 
              href="/nyheter" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbake
            </Link>
            
            {post.category && (
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary text-xs font-black px-3 py-1 uppercase tracking-[0.2em]">
                  {post.category}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.85] mb-8 uppercase" data-tina-field={post._tina_metadata?.fields?.title}>
              {post.title}
            </h1>
            
            {post.description && (
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed" data-tina-field={post._tina_metadata?.fields?.description}>
                {post.description}
              </p>
            )}

            {formattedDate && (
              <div className="flex items-center mt-8 text-muted-foreground font-medium" data-tina-field={post._tina_metadata?.fields?.date}>
                <CalendarIcon className="w-5 h-5 mr-2 opacity-70" />
                Dato publisert: {formattedDate}
              </div>
            )}
          </div>
        </div>
      </div>

      {post.image && (
        <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-10" data-tina-field={post._tina_metadata?.fields?.image}>
          <div className="aspect-[21/9] w-full relative rounded-xl overflow-hidden shadow-2xl border border-border/20 bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body Content */}
      {post.body && (
        <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-24">
          <div className="max-w-3xl mx-auto prose prose-lg md:prose-xl prose-slate dark:prose-invert" data-tina-field={post._tina_metadata?.fields?.body}>
            <TinaMarkdown content={post.body} />
          </div>
        </div>
      )}
    </article>
  );
}
