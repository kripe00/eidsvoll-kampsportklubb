import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

export function News({ newsItems = [] }: { newsItems?: any[] }) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Siste Nytt & Aktiviteter</h2>
            <p className="text-lg text-muted-foreground">
              Følg med på hva som skjer i klubben. Her legger vi ut informasjon om graderinger, seminarer og andre hendelser.
            </p>
          </div>
          <Link href="/nyheter" className="group flex items-center gap-2 text-primary font-semibold hover:underline">
            Se alle nyheter
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item: any) => {
            const node = item.node;
            return (
              <Card key={node._sys.filename} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {node.image && (
                    <img 
                      src={node.image} 
                      alt={node.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <Badge className="absolute top-4 left-4 bg-primary text-white border-none">
                    {node.category}
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(node.date).toLocaleDateString("no-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </div>
                  <CardTitle className="text-xl leading-tight" data-tina-field={tinaField(node, 'title')}>{node.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 mb-6">
                    {node.description}
                  </p>
                  <Link href={`/nyheter/${node._sys.filename}`} className="text-sm font-bold text-primary hover:underline">
                    Les mer
                  </Link>
                </CardContent>
              </Card>
            );
          })}
          {newsItems.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
              Ingen nyheter publisert ennå.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
