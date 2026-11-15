"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { cn } from "@/lib/utils";
import { RichText } from "./RichText";
import { BlockRenderer } from "./blocks/BlockRenderer";
import Link from "next/link";
import { Mail, ShieldCheck, Calendar, FileText, ArrowRight } from "lucide-react";
import { OptimizedImage } from "./ui/optimized-image";
import { useInView } from "@/lib/hooks";


function BoardMemberCard({ member }: { member: any }) {
  const { ref: cardRef, inView: isVisible } = useInView<HTMLDivElement>();

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
          <OptimizedImage 
            src={member.image} 
            alt={member.name} 
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-700",
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

        {/* Åpenhet, Kontakt & Styringsdokumenter */}
        <div className="mt-28 pt-20 border-t border-border/40 space-y-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-primary" />
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary">
                Åpenhet, kontakt &amp; styring
              </h2>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              Eidsvoll Kampsportklubb (org.nr. 932 716 461) er et demokratisk, medlemsstyrt idrettslag tilsluttet Norges idrettsforbund (NIF) og Norges Kampsportforbund (NKF).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Kontakt styret & utvalg */}
            <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                  Kontakt styret og tillitsvalgte
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Har du innspill til driften, saker til styrebehandling, eller spørsmål til politiattestansvarlig (Helene Løken) eller kontrollutvalget? Ta direkte kontakt med oss.
                </p>
                <div className="space-y-2.5 pt-2 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-foreground">Styreleder (Kristian Sollie Pedersen):</span>
                    <a
                      href="mailto:leder@kampsporteidsvoll.no"
                      className="text-primary font-semibold hover:underline underline-offset-4"
                    >
                      leder@kampsporteidsvoll.no
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-bold text-foreground">Klubb og medlemshenvendelser:</span>
                    <a
                      href="mailto:kontakt@kampsporteidsvoll.no"
                      className="text-primary font-semibold hover:underline underline-offset-4"
                    >
                      kontakt@kampsporteidsvoll.no
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Årsmøte og medlemsdemokrati */}
            <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                  Årsmøte og medlemsdemokrati
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Årsmøtet er klubbens øverste myndighet og avholdes årlig innen utgangen av mars, med innkalling senest én måned før. Her vedtas budsjett, regnskap, kontingent og valg av nytt styre, kontrollutvalg og valgkomité.
                </p>
                <p className="text-xs sm:text-sm text-foreground/90 font-medium bg-muted/40 border border-border/60 rounded-xl p-3.5 leading-relaxed">
                  Alle medlemmer har møte- og forslagsrett. Stemmerett på årsmøtet gjelder fra kalenderåret man fyller 15 år, forutsatt minst én måneds medlemskap og betalt årskontingent i MinIdrett.
                </p>
              </div>
            </div>

            {/* 3. Politiattest og Trygg Idrett */}
            <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                  Politiattest og trygg idrett
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I tråd med NIFs bestemmelser må samtlige trenere, instruktører og tillitsvalgte med ansvar for mindreårige eller personer med utviklingshemming fremvise gyldig politiattest før oppstart.
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  All barne- og ungdomsaktivitet følger NIFs barneidrettsbestemmelser og retningslinjer for trygge, rusfrie og inkluderende idrettsmiljøer.
                </p>
              </div>
            </div>

            {/* 4. Organisasjonsplan, lovnorm og vedtekter */}
            <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 flex flex-col justify-between gap-5 shadow-sm">
              <div className="space-y-4">
                <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
                  Organisasjonsplan og vedtekter
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Klubbens vedtekter (lov) bygger på <strong>NIFs lovnorm for idrettslag</strong>. Ansvarsfordelingen mellom årsmøtet, styret, kontrollutvalget og valgkomiteen er beskrevet i vår organisasjonsplan. Gjeldende vedtekter og siste årsmøteprotokoll kan fås tilsendt ved henvendelse til{" "}
                  <a href="mailto:leder@kampsporteidsvoll.no" className="text-primary font-semibold hover:underline underline-offset-4">
                    leder@kampsporteidsvoll.no
                  </a>
                  .
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/styret/organisasjonsplan"
                  className="inline-flex items-center gap-3 text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-primary border-b-2 border-primary pb-1.5 hover:gap-5 transition-all duration-300"
                >
                  <span>Se klubbens organisasjonsplan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
