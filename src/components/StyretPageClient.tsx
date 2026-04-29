"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RichText } from "./RichText";
import { BlockRenderer } from "./blocks/BlockRenderer";
import Link from "next/link";


function BoardMemberCard({ member }: { member: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="flex flex-col group" 
      data-tina-field={tinaField(member)}
    >
      {/* Portrait Container */}
      <div className={cn(
        "aspect-[4/5] bg-muted/30 overflow-hidden mb-6 relative border border-border/40 transition-all duration-700",
        isVisible ? "grayscale-0" : "grayscale",
        "lg:grayscale lg:group-hover:grayscale-0"
      )}>
        {member.image ? (
          <img 
            src={member.image} 
            alt={member.name} 
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isVisible ? "scale-100" : "scale-105",
              "lg:scale-105 lg:group-hover:scale-100"
            )}
            data-tina-field={tinaField(member, 'image')}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <div className="w-24 h-24 border border-foreground/20 rounded-full" />
          </div>
        )}
        {/* Subtle Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>

      <div className="flex flex-col pl-2 border-l border-primary/20">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-2 opacity-80" data-tina-field={tinaField(member, 'role')}>
          {member.role}
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground uppercase leading-none" data-tina-field={tinaField(member, 'name')}>
          {member.name}
        </h3>
      </div>
    </div>
  );
}

export function StyretPageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const boardData = data?.styret || props.data?.styret;

  return (
    <main className="bg-background min-h-screen pb-32">
      {/* Editorial Header */}
      <div className="pt-32 pb-24 border-b border-border/40">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 text-foreground uppercase leading-[0.95] md:leading-[0.85] break-words" data-tina-field={tinaField(boardData, 'title')}>
              {boardData.title}
            </h1>
            {boardData.description && (
              <div className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-light italic" data-tina-field={tinaField(boardData, 'description')}>
                <RichText content={boardData.description} />
              </div>
            )}
          </div>
        </div>
      </div>

      {boardData.blocks && (
        <section className="container mx-auto px-4 lg:px-8 max-w-7xl mt-16">
          <BlockRenderer blocks={boardData.blocks} />
        </section>
      )}

      <section className="container mx-auto px-4 lg:px-8 max-w-7xl mt-24">
        {/* Main Board Members Grid */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[1px] bg-primary" />
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary">Hovedstyret</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {boardData.members?.map((member: any, i: number) => (
              <BoardMemberCard key={i} member={member} />
            ))}
          </div>
        </div>

        {/* Committees & Responsibilities Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
          {boardData.committees?.map((committee: any, i: number) => (
            <div key={i} className="flex flex-col" data-tina-field={tinaField(committee)}>
              <h3 className="text-xl font-black uppercase tracking-widest text-foreground/40 mb-8 pb-4 border-b border-border/50" data-tina-field={tinaField(committee, 'name')}>
                {committee.name}
              </h3>
              <div className="space-y-8">
                {committee.people?.map((person: any, j: number) => (
                  <div key={j} className="group" data-tina-field={tinaField(person)}>
                    <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1 opacity-60 group-hover:opacity-100 transition-opacity" data-tina-field={tinaField(person, 'role')}>
                      {person.role}
                    </p>
                    <p className="text-xl font-bold text-foreground group-hover:text-primary transition-colors" data-tina-field={tinaField(person, 'name')}>
                      {person.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Organization Plan CTA */}
        <div className="mt-40 pt-20 border-t border-border/40 flex flex-col items-center text-center">
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-light text-lg">
            For en dypere innsikt i hvordan klubben vår er strukturert, ansvarsfordeling og våre lovpålagte organer, kan du lese vår fullstendige organisasjonsplan.
          </p>
          <Link 
            href="/styret/organisasjonsplan"
            className="inline-flex items-center gap-4 text-sm font-black tracking-[0.3em] uppercase text-primary border-b-2 border-primary pb-2 hover:gap-8 transition-all duration-500"
          >
            Se klubbens organisasjonsplan
          </Link>
        </div>
      </section>
    </main>
  );
}
