"use client";

import { Calendar, Building2, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  year: string;
  title: string;
  location: string;
  description: string;
  highlight?: boolean;
}

interface TimelineProps {
  title?: string;
  subtitle?: string;
  events?: TimelineEvent[];
}

const defaultEvents: TimelineEvent[] = [
  {
    year: "2013",
    title: "Rambukk åpner på Råholt",
    location: "Råholt",
    description:
      "Rambukk startet som et privatfinansiert aksjeselskap (AS) på Råholt i 2013, og bygde over mange år opp et sterkt og inkluderende kampsportmiljø i lokalsamfunnet.",
  },
  {
    year: "September 2026",
    title: "Eidsvoll Kampsportklubb (EKK) overtar på Dal",
    location: "Dal",
    description:
      "Eidsvoll Kampsportklubb (EKK) – et ideelt idrettslag tilknyttet Norges Idrettsforbund (NIF) – overtok i september 2026 hele driften, medlemsadministrasjonen og lokalleien, og flyttet inn i nye, nyoppussede lokaler på Dal.",
    highlight: true,
  },
];

export function Timeline({
  title = "Vår reise og historie",
  subtitle = "Fra Rambukk på Råholt til Eidsvoll Kampsportklubb (EKK) på Dal",
  events = defaultEvents,
}: TimelineProps) {
  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  return (
    <section className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Central Vertical Line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform -translate-x-1/2 hidden sm:block" />

        <div className="space-y-12 sm:space-y-16">
          {displayEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col sm:flex-row items-center",
                  isEven ? "sm:flex-row-reverse" : ""
                )}
              >
                {/* Timeline Node */}
                <div className="absolute left-6 sm:left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full border-4 flex items-center justify-center shadow-lg transition-transform hover:scale-110",
                      event.highlight
                        ? "bg-primary border-background text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted border-background text-muted-foreground"
                    )}
                  >
                    {event.highlight ? (
                      <ShieldCheck className="w-5 h-5" />
                    ) : (
                      <Building2 className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Event Card */}
                <div
                  className={cn(
                    "w-full sm:w-[calc(50%-2.5rem)] pl-14 sm:pl-0",
                    isEven ? "sm:pr-0" : "sm:pl-0"
                  )}
                >
                  <div
                    className={cn(
                      "p-6 sm:p-8 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md",
                      event.highlight
                        ? "border-primary/40 bg-primary/5 hover:border-primary/60"
                        : "border-border/60 bg-card hover:border-border"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider",
                          event.highlight
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {event.year}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {event.location}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
