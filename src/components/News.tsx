"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { OptimizedImage } from "./ui/optimized-image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Locale } from "@/lib/i18n/types";

export function News({ newsItems = [] }: { newsItems?: any[] }) {
  const { t, locale } = useLanguage();

  const localeMap: Record<Locale, string> = {
    no: "nb-NO",
    en: "en-US",
    pl: "pl-PL",
    uk: "uk-UA",
  };

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {locale === "en" ? "Club Updates" : locale === "pl" ? "Aktualności" : locale === "uk" ? "Оновлення клубу" : "Siste nytt"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-foreground leading-[0.95] mb-3">
              {t.news.heading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t.news.subheading}
            </p>
          </div>
          <Link href="/nyheter" className="group inline-flex items-center gap-2 text-sm uppercase tracking-wider text-primary font-bold hover:underline shrink-0">
            <span>{t.news.seeAll}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newsItems.map((item: any) => {
            const node = item.node;
            const postHref = `/nyheter/${node._sys.filename}`;
            return (
              <Card key={node._sys.filename} className="group overflow-hidden border-border/70 hover:border-foreground/30 transition-colors flex flex-col justify-between">
                <div>
                  <Link href={postHref} className="block aspect-video relative overflow-hidden bg-muted/60">
                    {node.image ? (
                      <OptimizedImage 
                        src={node.image} 
                        alt={node.title}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img src="/logo.png" alt="Eidsvoll Kampsportklubb" className="w-16 h-16 object-contain opacity-20" />
                      </div>
                    )}
                    {node.category && (
                      <Badge className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-sm text-white border-none uppercase tracking-wider text-[10px] font-bold">
                        {node.category}
                      </Badge>
                    )}
                  </Link>
                  <CardHeader className="pb-3 pt-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                      {new Date(node.date).toLocaleDateString(localeMap[locale] || "nb-NO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </div>
                    <CardTitle className="text-xl font-bold leading-snug tracking-tight" data-tina-field={tinaField(node, 'title')}>
                      <Link href={postHref} className="hover:text-primary transition-colors">
                        {node.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="pt-0 flex flex-col justify-between flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                    {node.description}
                  </p>
                  <Link href={postHref} className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-primary hover:underline mt-auto">
                    <span>{t.news.readMore}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
          {newsItems.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed rounded-xl">
              {t.news.noNews}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
