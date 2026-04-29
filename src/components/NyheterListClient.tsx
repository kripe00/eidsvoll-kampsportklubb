"use client";

import { useTina } from "tinacms/dist/react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

export function NyheterListClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const hasNews = !!props.data?.newsConnection;
  let data = props.data;

  // useTina might error if data is empty, handle carefully
  if (hasNews && props.query) {
    const tinaData = useTina({
      query: props.query,
      variables: props.variables,
      data: props.data,
    });
    data = tinaData.data;
  }

  const edges = hasNews ? data?.newsConnection?.edges || [] : [];
  
  // Sorter nyheter etter dato, nyeste først
  const sortedEdges = [...edges].sort((a, b) => {
    const dateA = new Date(a?.node?.date || 0).getTime();
    const dateB = new Date(b?.node?.date || 0).getTime();
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Seksjon Header (Lyst design for undersider) */}
      <section className="bg-muted pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-8xl font-black tracking-tighter mb-6 text-foreground uppercase leading-[0.85]">
              Nyheter
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground/80 font-light italic">
              Hold deg oppdatert med det siste fra klubben, viktig informasjon og kommende aktiviteter.
            </p>
          </div>
        </div>
      </section>

      {/* Seksjon Innhold */}
      <section className="py-16 md:py-24 flex-1">
        <div className="container mx-auto px-4 md:px-6">
          {sortedEdges.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-lg border border-border/50">
              <h2 className="text-2xl font-semibold mb-2">Ingen nyheter foreløpig</h2>
              <p className="text-muted-foreground">Det er ikke publisert noen nyheter enda. Sjekk tilbake senere!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedEdges.map((edge: any) => {
                const post = edge?.node;
                if (!post) return null;
                
                const formattedDate = post.date 
                  ? format(new Date(post.date), "d. MMMM yyyy", { locale: nb })
                  : "";

                return (
                  <Link href={`/nyheter/${post._sys.filename}`} key={post.id} className="group">
                    <Card className="h-full overflow-hidden border-border/50 transition-all duration-300 hover:shadow-lg hover:border-primary/30 flex flex-col bg-card">
                      {post.image ? (
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          <Image
                            src={post.image}
                            alt={post.title || "Nyhetsbilde"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground font-medium uppercase tracking-widest text-sm opacity-50">Ingen bilde</span>
                        </div>
                      )}
                      
                      <CardHeader className="flex-1 pb-4">
                        {post.category && (
                          <div className="mb-2">
                            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        )}
                        <CardTitle className="text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        {post.description && (
                          <p className="text-muted-foreground mt-2 line-clamp-3">
                            {post.description}
                          </p>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0 text-sm text-muted-foreground flex items-center mt-auto">
                        <CalendarIcon className="w-4 h-4 mr-1.5 opacity-70" />
                        {formattedDate}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
