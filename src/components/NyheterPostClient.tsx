"use client";

import { useTina } from "tinacms/dist/react";
import { RichText } from "./RichText";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { nb, enUS, pl as plLocale } from "date-fns/locale";
import { CalendarIcon, ArrowLeft, Languages, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function NyheterPostClient(props: {
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

  const post = data?.news || props.data?.news;
  
  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Laster inn...</div>;
  }

  const dateLocale = locale === "pl" ? plLocale : locale === "en" ? enUS : nb;

  const formattedDate = post.date 
    ? format(new Date(post.date), "d. MMMM yyyy", { locale: dateLocale })
    : "";

  const isLogo = post.image && (post.image.includes("sanita") || post.image.includes("logo") || post.image.includes("sponsor"));

  const translateUrl = typeof window !== "undefined"
    ? `https://translate.google.com/translate?sl=no&tl=${locale}&u=${encodeURIComponent(window.location.href)}`
    : `https://translate.google.com/translate?sl=no&tl=${locale}`;

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
              {t.news.back}
            </Link>
            
            {post.category && (
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary text-xs font-black px-3 py-1 uppercase tracking-[0.2em]">
                  {post.category}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[1.0] mb-8 uppercase" data-tina-field={post._tina_metadata?.fields?.title}>
              {post.title}
            </h1>
            
            {post.description && (
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light" data-tina-field={post._tina_metadata?.fields?.description}>
                {post.description}
              </p>
            )}

            {formattedDate && (
              <div className="flex items-center mt-8 text-muted-foreground font-medium text-sm" data-tina-field={post._tina_metadata?.fields?.date}>
                <CalendarIcon className="w-4 h-4 mr-2 opacity-70 text-primary" />
                {t.news.publishedDate}: {formattedDate}
              </div>
            )}

            {locale !== "no" && (
              <div className="mt-8 p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <Languages className="w-4 h-4 text-primary shrink-0" />
                  <span>{t.news.originalNotice}</span>
                </div>
                <a
                  href={translateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline shrink-0"
                >
                  <span>{t.news.translateWithGoogle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {post.image && (
        <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-10" data-tina-field={post._tina_metadata?.fields?.image}>
          <div className={`aspect-[21/9] w-full relative rounded-2xl overflow-hidden shadow-2xl border border-border/40 ${isLogo ? "bg-card flex items-center justify-center p-8 md:p-16" : "bg-muted"}`}>
            <Image
              src={post.image}
              alt={post.title}
              fill={!isLogo}
              width={isLogo ? 500 : undefined}
              height={isLogo ? 220 : undefined}
              className={isLogo ? "max-h-36 md:max-h-52 w-auto object-contain mx-auto" : "object-cover"}
              priority
            />
          </div>
        </div>
      )}

      {/* Body Content */}
      {post.body && (
        <div className="container mx-auto px-4 md:px-6 mt-16 md:mt-24">
          <div className="max-w-3xl mx-auto prose prose-lg md:prose-xl prose-slate dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-a:text-primary prose-a:font-bold prose-p:leading-relaxed prose-p:font-light" data-tina-field={post._tina_metadata?.fields?.body}>
            <RichText content={post.body} />
          </div>
        </div>
      )}
    </article>
  );
}
