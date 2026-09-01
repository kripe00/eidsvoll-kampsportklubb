"use client";

import { useState } from "react";
import { useTina } from "tinacms/dist/react";
import { Clock, MapPin } from "lucide-react";
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

  const schedule = (props.data?.schedule || data?.schedule) as ScheduleProps;
  const days = schedule?.days || [];

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"day" | "week">("week");
  const currentDay = days[activeDayIdx];

  // Helper to filter slots by room
  const getSlotsForRoom = (slots: Slot[] = [], roomKey: string) => {
    return slots.filter((slot) => {
      const room = slot.room || "";
      if (roomKey === "sal1") return room === "Sal 1" || room === "Hele bruket";
      if (roomKey === "sal2") return room === "Sal 2" || room === "Hele bruket";
      if (roomKey === "ctyoga") return room === "CT/yoga sal" || room === "Hele bruket";
      return false;
    });
  };

  // Helper to get unique start times sorted chronologically
  const getUniqueStartTimes = (slots: Slot[] = []) => {
    const startTimes = slots.map((s) => s.time.split("-")[0].trim());
    return Array.from(new Set(startTimes)).sort((a, b) => a.localeCompare(b));
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
  const ctyogaSlots = getSlotsForRoom(currentDay?.slots, "ctyoga");
  const uniqueStartTimes = getUniqueStartTimes(currentDay?.slots);

  const roomsConfig = [
    { key: "sal1", name: "Sal 1", desc: "Flerbruksmatte for BJJ og Muay Thai", slots: sal1Slots },
    { key: "sal2", name: "Sal 2", desc: "Matteareal kun for BJJ", slots: sal2Slots },
    { key: "ctyoga", name: "CT/yoga sal", desc: "Rom tilrettelagt for yoga og fysisk fostring", slots: ctyogaSlots },
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
            Vi trener i nyopppussede lokaler på Dal. Her ser du planen fordelt over våre 3 saler. Vi følger skoleruta, endringer vil varsles på Spond.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl mt-12">
        {/* Toggle View Mode (Only visible on PC) */}
        <div className="hidden lg:flex justify-end mb-8">
          <div className="inline-flex rounded-lg border border-border/40 p-1 bg-muted/20">
            <button
              onClick={() => setViewMode("week")}
              className={cn(
                "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300",
                viewMode === "week"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Ukesvisning
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={cn(
                "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300",
                viewMode === "day"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Dagsvisning (Saler)
            </button>
          </div>
        </div>

        {/* Day Selection Tabs (Hidden on PC if viewMode is "week") */}
        <div className={cn(
          "flex justify-start lg:justify-center gap-2 border-b border-border/40 pb-4 mb-12 overflow-x-auto whitespace-nowrap scrollbar-none",
          viewMode === "week" && "lg:hidden"
        )}>
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

        {/* WEEK VIEW (Vertical list of days, classes flowing horizontally) */}
        {viewMode === "week" && (
          <div className="hidden lg:flex flex-col space-y-6">
            {days.map((day, idx) => {
              const sortedSlots = [...(day.slots || [])].sort((a, b) => a.time.localeCompare(b.time));
              return (
                <div key={idx} className="border border-border/30 rounded-xl bg-muted/5 p-6 flex flex-col md:flex-row gap-6 items-start">
                  {/* Day Column (Left side) */}
                  <div className="w-full md:w-32 shrink-0 border-b md:border-b-0 md:border-r border-border/40 pb-4 md:pb-0 md:pr-6">
                    <h3 className="font-extrabold text-lg tracking-wider uppercase text-foreground text-primary">
                      {day.day}
                    </h3>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {sortedSlots.length} {sortedSlots.length === 1 ? "time" : "timer"}
                    </span>
                  </div>

                  {/* Classes Flow (Right side) */}
                  <div className="flex-grow w-full">
                    {sortedSlots.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {sortedSlots.map((slot, sIdx) => {
                          const styles = getActivityStyles(slot.activity);
                          const kids = isKidsClass(slot.group);
                          return (
                            <div
                              key={sIdx}
                              className={cn(
                                "border border-border/40 rounded-xl p-4 transition-all duration-300 shadow-sm flex flex-col justify-between h-40 w-[240px] shrink-0",
                                styles.card
                              )}
                              data-tina-field={tinaField(slot as any)}
                            >
                              <div>
                                <span className="text-[10px] text-muted-foreground font-semibold block mb-1">
                                  {slot.time}
                                </span>
                                <h4 className="font-black text-base tracking-tight text-foreground uppercase truncate">
                                  {slot.activity}
                                </h4>
                                <p className="text-xs text-muted-foreground truncate mt-0.5 font-medium">
                                  {slot.group}
                                </p>
                              </div>

                              <div className="mt-2 pt-2 border-t border-border/30 flex items-center justify-between gap-1">
                                {/* Room Tag */}
                                <span className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground font-semibold truncate max-w-[110px]">
                                  {slot.room}
                                </span>
                                
                                {/* Group Badge */}
                                <span
                                  className={cn(
                                    "text-[9px] px-2 py-0.5 rounded border uppercase font-extrabold tracking-wider shrink-0",
                                    kids 
                                      ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20" 
                                      : "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                                  )}
                                >
                                  {kids ? "Barn" : "Voksen"}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground/45 py-4 font-medium italic">
                        Ingen treninger satt opp denne dagen.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected Day Content */}
        {currentDay && (
          <div className={cn(viewMode === "week" && "lg:hidden")}>
            {/* DESKTOP VIEW (Aligned row-by-row by time slots) */}
            <div className="hidden lg:flex flex-col space-y-6">
              {/* Room Headers Row */}
              <div className="grid grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {roomsConfig.map((room) => (
                  <div key={room.key} className="bg-muted/30 border border-border/40 rounded-xl p-4 text-center">
                    <h3 className="font-extrabold text-lg tracking-wide uppercase text-foreground">
                      {room.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {room.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Fallback if no classes */}
              {uniqueStartTimes.length === 0 && (
                <div className="border border-dashed border-border/30 rounded-xl p-8 text-center text-muted-foreground/40 py-16">
                  Ingen faste treninger satt opp denne dagen.
                </div>
              )}

              {/* Rows sorted by Start Time */}
              {uniqueStartTimes.map((startTime) => {
                return (
                  <div key={startTime} className="grid grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {roomsConfig.map((room) => {
                      // Find slot for this room starting at this time
                      const slot = currentDay?.slots?.find((s) => {
                        const sRoom = s.room || "";
                        const sStart = s.time.split("-")[0].trim();
                        
                        // Check room match
                        let roomMatch = false;
                        if (room.key === "sal1") roomMatch = sRoom === "Sal 1" || sRoom === "Hele bruket";
                        if (room.key === "sal2") roomMatch = sRoom === "Sal 2" || sRoom === "Hele bruket";
                        if (room.key === "ctyoga") roomMatch = sRoom === "CT/yoga sal" || sRoom === "Hele bruket";
                        
                        return roomMatch && sStart === startTime;
                      });

                      if (slot) {
                        const styles = getActivityStyles(slot.activity);
                        const kids = isKidsClass(slot.group);
                        return (
                          <div
                            key={room.key}
                            className={cn(
                              "border border-border/40 rounded-xl p-5 transition-all duration-300 shadow-sm flex flex-col justify-between min-h-[160px]",
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
                                      ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20" 
                                      : "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
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


                          </div>
                        );
                      }

                      // Empty Slot Placeholder (Transparent spacer to keep alignment without border "holes")
                      return (
                        <div 
                          key={room.key} 
                          className="min-h-[160px] hidden lg:block"
                        />
                      );
                    })}
                  </div>
                );
              })}
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
                                    ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20" 
                                    : "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                                )}
                              >
                                {kids ? "Barn" : "Voksen"}
                              </span>
                            </div>


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
