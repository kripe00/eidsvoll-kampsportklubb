"use client";

import { useState } from "react";
import { useTina } from "tinacms/dist/react";
import { Clock, User, MapPin, Sparkles } from "lucide-react";
import { tinaField } from "tinacms/dist/react";
import { cn } from "@/lib/utils";

interface Slot {
  time: string;
  activity: string;
  group: string;
  room: string;
  trainer?: string;
}

interface Day {
  day: string;
  slots?: Slot[];
}

interface ScheduleProps {
  days?: Day[];
}

export function SchedulePageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const schedule = (props.query ? data.schedule : props.data.schedule) as ScheduleProps;
  const days = schedule?.days || [];

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const currentDay = days[activeDayIdx];

  // Helper to filter slots by room
  const getSlotsForRoom = (slots: Slot[] = [], roomKey: string) => {
    return slots.filter((slot) => {
      const room = slot.room || "";
      if (roomKey === "sal1") return room.includes("Sal 1");
      if (roomKey === "sal2") return room.includes("Sal 2");
      if (roomKey === "sal3") return room.includes("Sal 3");
      return false;
    });
  };

  // Helper to get sport styles
  const getActivityStyles = (activity: string) => {
    const act = activity.toLowerCase();
    if (act.includes("bjj") || act.includes("jiu")) {
      return {
        card: "border-l-4 border-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-400",
        badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
        text: "text-indigo-200",
      };
    }
    if (act.includes("thai") || act.includes("muay") || act.includes("boks")) {
      return {
        card: "border-l-4 border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-400",
        badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
        text: "text-rose-200",
      };
    }
    if (act.includes("yoga") || act.includes("cross") || act.includes("ct")) {
      return {
        card: "border-l-4 border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-400",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        text: "text-emerald-200",
      };
    }
    return {
      card: "border-l-4 border-slate-500 bg-slate-500/5 hover:bg-slate-500/10 hover:border-slate-400",
      badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",
      text: "text-slate-200",
    };
  };

  // Helper to check if a class is for kids
  const isKidsClass = (group: string) => {
    return group.toLowerCase().includes("barn");
  };

  if (days.length === 0) {
    return (
      <div className="bg-background min-h-screen pt-32 text-center text-muted-foreground">
        Ingen treningstider registrert ennå.
      </div>
    );
  }

  const sal1Slots = getSlotsForRoom(currentDay?.slots, "sal1");
  const sal2Slots = getSlotsForRoom(currentDay?.slots, "sal2");
  const sal3Slots = getSlotsForRoom(currentDay?.slots, "sal3");

  const roomsConfig = [
    { key: "sal3", name: "Sal 3 (BJJ)", desc: "Eget matteareal for BJJ", slots: sal3Slots },
    { key: "sal2", name: "Sal 2 (BJJ & Muay Thai)", desc: "Flerbruksmatte for kampsport", slots: sal2Slots },
    { key: "sal1", name: "Sal 1 (Yoga / CT)", desc: "Rom tilrettelagt for yoga og fysisk fostring", slots: sal1Slots },
  ];

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="pt-32 bg-muted/20 border-b border-border/40 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase">
            Treningstider
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Vi trener i helt nye fasiliteter på Dal. Her ser du planen fordelt over våre 3 saler. Endringer i ferier eller på helligdager varsles i våre lukkede medlemsgrupper.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl mt-12">
        {/* Day Selection Tabs */}
        <div className="flex justify-center gap-2 border-b border-border/40 pb-4 mb-12 overflow-x-auto whitespace-nowrap scrollbar-none">
          {days.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIdx(idx)}
              className={cn(
                "px-6 py-2.5 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 border-b-2",
                activeDayIdx === idx
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              data-tina-field={tinaField(day as any, "day")}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Selected Day Content */}
        {currentDay && (
          <div>
            {/* DESKTOP VIEW (Parallel columns for rooms) */}
            <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8">
              {roomsConfig.map((room) => (
                <div key={room.key} className="flex flex-col">
                  {/* Column Header */}
                  <div className="bg-muted/30 border border-border/40 rounded-xl p-4 mb-6 text-center">
                    <h3 className="font-extrabold text-lg tracking-wide uppercase text-foreground">
                      {room.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {room.desc}
                    </p>
                  </div>

                  {/* Slots in Column */}
                  <div className="space-y-4 flex-grow">
                    {room.slots.length > 0 ? (
                      room.slots.map((slot, idx) => {
                        const styles = getActivityStyles(slot.activity);
                        const kids = isKidsClass(slot.group);
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "border border-border/40 rounded-xl p-5 transition-all duration-300 shadow-sm flex flex-col justify-between h-44",
                              styles.card
                            )}
                            data-tina-field={tinaField(slot as any)}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                                  <Clock className="w-3.5 h-3.5" />
                                  {slot.time}
                                </span>
                                
                                {/* Group Badge */}
                                <span
                                  className={cn(
                                    "text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider",
                                    kids 
                                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30" 
                                      : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                                  )}
                                >
                                  {kids ? "Barn" : "Voksen"}
                                </span>
                              </div>

                              <h4 className="font-black text-xl tracking-tight text-foreground uppercase">
                                {slot.activity}
                              </h4>
                              <p className="text-xs text-muted-foreground/80 mt-1 font-medium">
                                {slot.group}
                              </p>
                            </div>

                            {/* Footer inside card */}
                            {slot.trainer && (
                              <div className="border-t border-border/30 pt-3 mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <User className="w-3.5 h-3.5 text-muted-foreground/60" />
                                <span>Trener: <strong>{slot.trainer}</strong></span>
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="border border-dashed border-border/40 rounded-xl p-8 text-center text-xs text-muted-foreground/50 h-32 flex items-center justify-center">
                        Ingen treninger satt opp i denne salen i dag.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE & TABLET VIEW (Stacked timeline) */}
            <div className="lg:hidden space-y-12">
              {roomsConfig.map((room) => {
                if (room.slots.length === 0) return null;
                return (
                  <div key={room.key} className="space-y-4">
                    {/* Room Subheader */}
                    <div className="flex items-center gap-2 border-b border-border/30 pb-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <h3 className="font-extrabold text-base uppercase tracking-wider text-foreground">
                        {room.name}
                      </h3>
                    </div>

                    {/* Timeline List */}
                    <div className="space-y-3">
                      {room.slots.map((slot, idx) => {
                        const styles = getActivityStyles(slot.activity);
                        const kids = isKidsClass(slot.group);
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "border border-border/40 rounded-xl p-4 transition-all duration-300 shadow-sm flex flex-col justify-between gap-4",
                              styles.card
                            )}
                            data-tina-field={tinaField(slot as any)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold mb-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {slot.time}
                                </span>
                                <h4 className="font-black text-lg text-foreground uppercase tracking-tight">
                                  {slot.activity}
                                </h4>
                                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                                  {slot.group}
                                </p>
                              </div>

                              <span
                                className={cn(
                                  "text-[9px] px-2 py-0.5 rounded border uppercase font-bold tracking-wider shrink-0",
                                  kids 
                                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30" 
                                    : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                                )}
                              >
                                {kids ? "Barn" : "Voksen"}
                              </span>
                            </div>

                            {slot.trainer && (
                              <div className="border-t border-border/30 pt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <User className="w-3.5 h-3.5 text-muted-foreground/60" />
                                <span>Trener: <strong>{slot.trainer}</strong></span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
