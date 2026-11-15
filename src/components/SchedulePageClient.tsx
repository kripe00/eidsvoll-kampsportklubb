"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTina, tinaField } from "tinacms/dist/react";
import { Clock, MapPin, Calendar, ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { ProveukeModal } from "./ProveukeModal";
import type { Locale } from "@/lib/i18n/types";

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

type CategoryFilter = "all" | "bjj" | "muaythai" | "ctyoga" | "kids";

const CLARIFICATIONS: Record<string, Record<Locale, string>> = {
  "bjj|voksne / ungdom": {
    no: "Gi (drakt) · Nybegynner & alle nivåer (14+ år)",
    en: "Gi (uniform) · Beginner & all levels (14+ yrs)",
    pl: "Gi (kimono) · Początkujący i wszystkie poziomy (14+)",
    uk: "Gi (кімоно) · Початківці та всі рівні (14+)",
  },
  "bjj|bjj basic": {
    no: "Gi (drakt) · Grunnkurs / nybegynner (14+ år)",
    en: "Gi (uniform) · Fundamentals / beginners (14+ yrs)",
    pl: "Gi (kimono) · Podstawy / początkujący (14+)",
    uk: "Gi (кімоно) · Основи / початківці (14+)",
  },
  "bjj|bjj advanced": {
    no: "Gi (drakt) · Viderekomne",
    en: "Gi (uniform) · Advanced",
    pl: "Gi (kimono) · Zaawansowani",
    uk: "Gi (кімоно) · Просунуті",
  },
  "bjj|bjj no-gi": {
    no: "No-Gi (uten drakt) · Ungdom & voksne (14+ år)",
    en: "No-Gi (without uniform) · Youth & adults (14+ yrs)",
    pl: "No-Gi (bez kimona) · Młodzież i dorośli (14+)",
    uk: "No-Gi (без кімоно) · Молодь і дорослі (14+)",
  },
  "bjj|dagtrening bjj": {
    no: "Alle nivåer (14+ år)",
    en: "All levels (14+ yrs)",
    pl: "Wszystkie poziomy (14+)",
    uk: "Усі рівні (14+)",
  },
  "bjj|sparring bjj": {
    no: "Fri rulling · Ungdom & voksne",
    en: "Live rolling · Youth & adults",
    pl: "Sparingi · Młodzież i dorośli",
    uk: "Спаринги · Молодь і дорослі",
  },
  "bjj|barneparti 1 (6-9 år)": {
    no: "Trygg barnekampsport uten slag og spark",
    en: "Safe kids grappling — no punches or kicks",
    pl: "Bezpieczne zajęcia dla dzieci bez uderzeń",
    uk: "Безпечні заняття для дітей без ударів",
  },
  "bjj|barneparti 2 (10-13 år)": {
    no: "Trygg barnekampsport · Teknikk & mestring",
    en: "Safe kids grappling · Technique & mastery",
    pl: "Bezpieczne BJJ dla dzieci · Technika i rozwój",
    uk: "Безпечне БЖЖ для дітей · Техніка та розвиток",
  },
  "bjj|barn (felles)": {
    no: "Barn (6–13 år) · Fellesøkt",
    en: "Kids (6–13 yrs) · Combined session",
    pl: "Dzieci (6–13 lat) · Trening wspólny",
    uk: "Діти (6–13 років) · Спільне заняття",
  },
  "muay thai|barn (felles)": {
    no: "6–13 år · Kun puter, ingen hodekontakt",
    en: "6–13 yrs · Pads only, zero head contact",
    pl: "6–13 lat · Tylko tarcze, zero uderzeń na głowę",
    uk: "6–13 років · Лише лапи, без ударів у голову",
  },
  "muay thai|muay thai": {
    no: "Ungdom & voksne (14+ år) · Alle nivåer",
    en: "Youth & adults (14+ yrs) · All levels",
    pl: "Młodzież i dorośli (14+) · Wszystkie poziomy",
    uk: "Молодь і дорослі (14+) · Усі рівні",
  },
  "crosstrening|crosstrening - kickstart": {
    no: "Lavterskel styrke & puls · Rene innesko",
    en: "Accessible strength & cardio · Clean indoor shoes",
    pl: "Siła i kondycja na start · Czyste buty halowe",
    uk: "Сила та кардіо для старту · Чисте взуття для залу",
  },
  "crosstrening|crosstrening": {
    no: "Styrke & intervall (14+ år) · Rene innesko",
    en: "Strength & intervals (14+ yrs) · Clean indoor shoes",
    pl: "Siła i interwały (14+) · Czyste buty halowe",
    uk: "Сила та інтервали (14+) · Чисте взуття для залу",
  },
  "åpen matte|hele bruket": {
    no: "Fri rulling og egentrening for medlemmer i alle saler",
    en: "Open rolling & self-directed training for members across all rooms",
    pl: "Otwarta mata i trening własny dla członków klubu",
    uk: "Відкрите татамі та вільне тренування для членів клубу",
  },
};

function getSlotClarification(slot: Slot, locale: Locale): string | null {
  const key = `${slot.activity.trim().toLowerCase()}|${slot.group.trim().toLowerCase()}`;
  return CLARIFICATIONS[key]?.[locale] ?? null;
}

function isKidsSlot(group: string): boolean {
  const lower = group.toLowerCase();
  return lower.includes("barn") || lower.includes("kids");
}

const emptySubscribe = () => () => {};
const getServerDayIdx = () => 0;

function matchesCategory(slot: Slot, category: CategoryFilter): boolean {
  if (category === "all") return true;
  if (category === "kids") return isKidsSlot(slot.group);
  const act = slot.activity.toLowerCase();
  if (category === "bjj") return act.includes("bjj") || act.includes("åpen matte");
  if (category === "muaythai") return act.includes("thai") || act.includes("muay");
  if (category === "ctyoga") return act.includes("cross") || act.includes("yoga");
  return true;
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

  const { t, locale } = useLanguage();
  const schedule = (data?.schedule || props.data?.schedule) as ScheduleProps;
  const days = schedule?.days || [];

  const [userSelectedDayIdx, setUserSelectedDayIdx] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"day" | "week">("week");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  // Resolve today's weekday on the client without hydration mismatch or setState-in-effect
  const autoDayIdx = useSyncExternalStore(
    emptySubscribe,
    () => {
      const norwegianWeekdayIdx = (new Date().getDay() + 6) % 7; // 0 = Mandag ... 6 = Søndag
      return days[norwegianWeekdayIdx]?.slots?.length ? norwegianWeekdayIdx : 0;
    },
    getServerDayIdx
  );

  const activeDayIdx = userSelectedDayIdx ?? autoDayIdx;
  const setActiveDayIdx = setUserSelectedDayIdx;

  const currentDay = days[activeDayIdx];

  const dayNameMap: Record<string, string> = {
    "Mandag": t.schedule.days.mon,
    "Tirsdag": t.schedule.days.tue,
    "Onsdag": t.schedule.days.wed,
    "Torsdag": t.schedule.days.thu,
    "Fredag": t.schedule.days.fri,
    "Lørdag": t.schedule.days.sat,
    "Søndag": t.schedule.days.sun,
  };

  const getTranslatedDay = (dayName: string) => {
    return dayNameMap[dayName] || dayName;
  };

  const getSlotsForRoom = (slots: Slot[] = [], roomKey: string) => {
    return slots.filter((slot) => {
      const room = slot.room || "";
      if (roomKey === "sal1") return room === "Sal 1" || room === "Hele bruket";
      if (roomKey === "sal2") return room === "Sal 2" || room === "Hele bruket";
      if (roomKey === "ctyoga") return room === "CT/yoga sal" || room === "Hele bruket";
      return false;
    });
  };

  const extractTimeForSort = (timeStr: string) => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      return `${match[1].padStart(2, "0")}:${match[2]}`;
    }
    return timeStr;
  };

  const getUniqueStartTimes = (slots: Slot[] = []) => {
    const startTimes = slots.map((s) => s.time.split("-")[0].trim());
    return Array.from(new Set(startTimes)).sort((a, b) =>
      extractTimeForSort(a).localeCompare(extractTimeForSort(b))
    );
  };

  const getActivityCardClass = (activity: string) => {
    const act = activity.toLowerCase();
    if (act.includes("bjj") || act.includes("jiu")) {
      return "border-l-4 border-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-400";
    }
    if (act.includes("thai") || act.includes("muay") || act.includes("boks")) {
      return "border-l-4 border-rose-500 bg-rose-500/5 hover:bg-rose-500/10 hover:border-rose-400";
    }
    if (act.includes("yoga") || act.includes("cross") || act.includes("ct")) {
      return "border-l-4 border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-400";
    }
    return "border-l-4 border-slate-500 bg-slate-500/5 hover:bg-slate-500/10 hover:border-slate-400";
  };

  const renderGroupBadge = (group: string, sizeClass = "text-[9px] font-bold") => {
    const kids = isKidsSlot(group);
    return (
      <span
        className={cn(
          "px-2 py-0.5 rounded border uppercase tracking-wider shrink-0",
          sizeClass,
          kids
            ? "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800"
            : "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
        )}
      >
        {kids ? t.schedule.kidsBadge : t.schedule.adultBadge}
      </span>
    );
  };

  const renderSlotDetails = (slot: Slot, titleClass: string) => {
    const clarification = getSlotClarification(slot, locale);
    return (
      <>
        <h4 className={titleClass}>{slot.activity}</h4>
        <p className="text-xs text-muted-foreground font-medium mt-0.5">
          {slot.group}
        </p>
        {clarification && (
          <p className="text-[11px] text-foreground/80 font-medium mt-1 leading-snug">
            {clarification}
          </p>
        )}
        {slot.trainer && (
          <p className="mt-1.5 inline-flex items-start gap-1 text-[11px] font-semibold text-primary leading-snug">
            <Info className="w-3 h-3 shrink-0 mt-0.5" />
            <span>{slot.trainer}</span>
          </p>
        )}
      </>
    );
  };

  if (days.length === 0) {
    return (
      <div className="bg-background min-h-screen pt-32 text-center text-muted-foreground">
        {locale === "uk" ? "Розклад ще не опубліковано." : locale === "pl" ? "Brak zarejestrowanych godzin treningów." : locale === "en" ? "No schedule registered yet." : "Ingen treningstider registrert ennå."}
      </div>
    );
  }

  const filteredCurrentDaySlots = (currentDay?.slots || []).filter((slot) =>
    matchesCategory(slot, activeCategory)
  );
  const sal1Slots = getSlotsForRoom(filteredCurrentDaySlots, "sal1");
  const sal2Slots = getSlotsForRoom(filteredCurrentDaySlots, "sal2");
  const ctyogaSlots = getSlotsForRoom(filteredCurrentDaySlots, "ctyoga");
  const uniqueStartTimes = getUniqueStartTimes(filteredCurrentDaySlots);

  const filterOptions: { key: CategoryFilter; label: string }[] = [
    { key: "all", label: t.schedule.filterAll },
    { key: "bjj", label: t.schedule.filterBjj },
    { key: "muaythai", label: t.schedule.filterMuayThai },
    {
      key: "ctyoga",
      label:
        locale === "en"
          ? "Cross Training & Yoga"
          : locale === "pl"
          ? "Crosstrening & Joga"
          : locale === "uk"
          ? "Крос-тренінг & Йога"
          : "Crosstrening & Yoga",
    },
    { key: "kids", label: t.schedule.filterKids },
  ];

  const resetFilterLabel =
    locale === "en"
      ? "Show all classes"
      : locale === "pl"
      ? "Pokaż wszystkie zajęcia"
      : locale === "uk"
      ? "Показати всі заняття"
      : "Vis alle partier";

  const roomsConfig = [
    { 
      key: "sal1", 
      name: locale === "uk" ? "Зал 1" : locale === "pl" ? "Sala 1" : locale === "en" ? "Room 1" : "Sal 1", 
      desc: locale === "uk" ? "Головний татамі для БЖЖ та Муай Тай" : locale === "pl" ? "Mata główna do BJJ i Muay Thai" : locale === "en" ? "Main mat for BJJ and Muay Thai" : "Flerbruksmatte for BJJ og Muay Thai", 
      slots: sal1Slots 
    },
    { 
      key: "sal2", 
      name: locale === "uk" ? "Зал 2" : locale === "pl" ? "Sala 2" : locale === "en" ? "Room 2" : "Sal 2", 
      desc: locale === "uk" ? "Зона татамі для БЖЖ" : locale === "pl" ? "Strefa maty dedykowana dla BJJ" : locale === "en" ? "Mat area dedicated to BJJ" : "Matteareal kun for BJJ", 
      slots: sal2Slots 
    },
    { 
      key: "ctyoga", 
      name: locale === "uk" ? "Зал крос-тренінгу та йоги" : locale === "pl" ? "Sala CT / Jogi" : locale === "en" ? "Cross Training & Yoga Room" : "CT/yoga sal", 
      desc: locale === "uk" ? "Зал для занять йогою та загальної фізичної підготовки" : locale === "pl" ? "Sala przystosowana do jogi i treningu siłowego" : locale === "en" ? "Room tailored for yoga and physical conditioning" : "Rom tilrettelagt for yoga og fysisk fostring", 
      slots: ctyogaSlots 
    },
  ];

  const ctaCopy = {
    no: {
      title: "Fant du en time som passer?",
      subtitle: "Møt opp 10–15 minutter før start i Trondheimsvegen 71B på Dal. Gratis parkering og inngang på baksiden av bygget – og gratis låneutstyr hele prøveperioden.",
      trialBtn: "Prøv gratis i 14 dager",
      guideLink: "Hva trenger du til 1. trening?",
    },
    en: {
      title: "Found a class that fits your week?",
      subtitle: "Show up 10–15 minutes before start at Trondheimsvegen 71B, Dal. Free parking and entrance behind the building — and free loaner gear all trial.",
      trialBtn: "Try 14 days for free",
      guideLink: "What to bring to 1st class?",
    },
    pl: {
      title: "Znalazłeś grupę dla siebie?",
      subtitle: "Przyjdź 10–15 minut przed treningiem do Trondheimsvegen 71B w Dal. Darmowy parking i wejście z tyłu budynku — sprzęt pożyczysz bezpłatnie.",
      trialBtn: "Wypróbuj 14 dni za darmo",
      guideLink: "Co zabrać na 1. trening?",
    },
    uk: {
      title: "Знайшли заняття, яке вам підходить?",
      subtitle: "Приходьте за 10–15 хвилин до початку за адресою Trondheimsvegen 71B, Dal. Безкоштовна парковка і вхід ззаду будівлі — спорядження видається безкоштовно.",
      trialBtn: "Спробувати 14 днів безкоштовно",
      guideLink: "Що взяти на 1-ше тренування?",
    },
  }[locale];

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <div className="pt-32 bg-muted/20 border-b border-border/40 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground uppercase">
            {t.schedule.title}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.schedule.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl mt-10">
        {/* Filter Pills & View Mode Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.schedule.filterAll}>
            {filterOptions.map((option) => {
              const isSelected = activeCategory === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setActiveCategory(option.key)}
                  aria-pressed={isSelected}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/25 text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Toggle View Mode (Only visible on PC) */}
          <div className="hidden lg:flex justify-end shrink-0">
            <div className="inline-flex rounded-lg border border-border/40 p-1 bg-muted/20">
              <button
                type="button"
                onClick={() => setViewMode("week")}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300",
                  viewMode === "week"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.schedule.weekView}
              </button>
              <button
                type="button"
                onClick={() => setViewMode("day")}
                className={cn(
                  "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300",
                  viewMode === "day"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.schedule.dayRoomsView}
              </button>
            </div>
          </div>
        </div>

        {/* Day Selection Tabs (Hidden on PC if viewMode is "week") */}
        <div className={cn(
          "flex justify-start lg:justify-center gap-2 border-b border-border/40 pb-4 mb-10 overflow-x-auto whitespace-nowrap scrollbar-none",
          viewMode === "week" && "lg:hidden"
        )}>
          {days.map((day, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveDayIdx(idx)}
              className={cn(
                "px-5 sm:px-6 py-2.5 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 border-b-2 shrink-0",
                activeDayIdx === idx
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              data-tina-field={tinaField(day as any, "day")}
            >
              {getTranslatedDay(day.day)}
            </button>
          ))}
        </div>

        {/* WEEK VIEW (Vertical list of days, classes flowing horizontally) */}
        {viewMode === "week" && (
          <div className="hidden lg:flex flex-col space-y-6">
            {days.map((day, idx) => {
              const sortedSlots = [...(day.slots || [])]
                .filter((slot) => matchesCategory(slot, activeCategory))
                .sort((a, b) =>
                  extractTimeForSort(a.time).localeCompare(extractTimeForSort(b.time))
                );
              return (
                <div key={idx} className="border border-border/30 rounded-xl bg-muted/5 p-6 flex flex-col md:flex-row gap-6 items-start">
                  {/* Day Column (Left side) */}
                  <div className="w-full md:w-32 shrink-0 border-b md:border-b-0 md:border-r border-border/40 pb-4 md:pb-0 md:pr-6">
                    <h3 className="font-extrabold text-lg tracking-wider uppercase text-primary">
                      {getTranslatedDay(day.day)}
                    </h3>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {sortedSlots.length} {locale === 'uk' ? (sortedSlots.length === 1 ? 'тренування' : 'тренувань') : locale === 'pl' ? (sortedSlots.length === 1 ? 'zajęcia' : 'treningi') : locale === 'en' ? (sortedSlots.length === 1 ? 'class' : 'classes') : (sortedSlots.length === 1 ? 'time' : 'timer')}
                    </span>
                  </div>

                  {/* Classes Flow (Right side) */}
                  <div className="flex-grow w-full">
                    {sortedSlots.length > 0 ? (
                      <div className="flex flex-wrap gap-4">
                        {sortedSlots.map((slot, sIdx) => (
                          <div
                            key={sIdx}
                            className={cn(
                              "border border-border/40 rounded-xl p-3.5 transition-all duration-300 shadow-sm flex flex-col justify-between w-[240px] shrink-0",
                              getActivityCardClass(slot.activity)
                            )}
                            data-tina-field={tinaField(slot as any)}
                          >
                            <div>
                              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold mb-1">
                                <Clock className="w-3.5 h-3.5" />
                                {slot.time}
                              </span>
                              {renderSlotDetails(slot, "font-black text-sm text-foreground uppercase tracking-tight")}
                            </div>

                            <div className="mt-3 pt-2 border-t border-border/30 flex items-center justify-between gap-1">
                              <span className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground font-semibold truncate max-w-[120px]">
                                {slot.room}
                              </span>
                              {renderGroupBadge(slot.group, "text-[9px] font-extrabold")}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground/60 py-4 font-medium italic">
                        {activeCategory !== "all"
                          ? locale === "en"
                            ? "No matching classes for this filter."
                            : locale === "pl"
                            ? "Brak pasujących zajęć dla wybranego filtra."
                            : locale === "uk"
                            ? "Немає занять за вибраним фільтром."
                            : "Ingen treninger matcher valgt filter denne dagen."
                          : locale === "uk"
                          ? "На цей день тренувань немає."
                          : locale === "pl"
                          ? "Brak treningów w tym dniu."
                          : locale === "en"
                          ? "No classes scheduled for this day."
                          : "Ingen treninger satt opp denne dagen."}
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
                <div className="border border-dashed border-border/40 rounded-xl p-8 text-center text-muted-foreground py-16 space-y-3">
                  <p>
                    {activeCategory !== "all"
                      ? locale === "en"
                        ? "No classes match the selected filter on this day."
                        : locale === "pl"
                        ? "Brak zajęć pasujących do wybranego filtra w tym dniu."
                        : locale === "uk"
                        ? "У цей день немає занять за вибраним фільтром."
                        : "Ingen treninger matcher valgt filter denne dagen."
                      : locale === "en"
                      ? "No fixed classes scheduled on this day."
                      : "Ingen faste treninger satt opp denne dagen."}
                  </p>
                  {activeCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory("all")}
                      className="text-xs font-bold uppercase tracking-wider text-primary underline underline-offset-4"
                    >
                      {resetFilterLabel}
                    </button>
                  )}
                </div>
              )}

              {/* Rows sorted by Start Time */}
              {uniqueStartTimes.map((startTime) => (
                <div key={startTime} className="grid grid-cols-3 gap-6 lg:gap-8 items-stretch">
                  {roomsConfig.map((room) => {
                    const matchingSlots = room.slots.filter(
                      (s) => s.time.split("-")[0].trim() === startTime
                    );

                    if (matchingSlots.length > 0) {
                      return (
                        <div key={room.key} className="flex flex-col gap-3">
                          {matchingSlots.map((slot, mIdx) => (
                            <div
                              key={mIdx}
                              className={cn(
                                "border border-border/40 rounded-xl p-5 transition-all duration-300 shadow-sm flex flex-col justify-between min-h-[160px] flex-1",
                                getActivityCardClass(slot.activity)
                              )}
                              data-tina-field={tinaField(slot as any)}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                                    <Clock className="w-3.5 h-3.5" />
                                    {slot.time}
                                  </span>
                                  {renderGroupBadge(slot.group, "text-[10px] font-bold")}
                                </div>
                                {renderSlotDetails(slot, "font-black text-xl tracking-tight text-foreground uppercase")}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={room.key}
                        className="min-h-[160px] hidden lg:block"
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* MOBILE & TABLET VIEW (Stacked timeline) */}
            <div className="lg:hidden space-y-10">
              {filteredCurrentDaySlots.length === 0 ? (
                <div className="border border-dashed border-border/40 rounded-xl p-8 text-center text-muted-foreground space-y-3">
                  <p className="text-sm">
                    {activeCategory !== "all"
                      ? locale === "en"
                        ? "No classes match this filter on the selected day."
                        : locale === "pl"
                        ? "Brak zajęć dla wybranego filtra w tym dniu."
                        : locale === "uk"
                        ? "Немає занять за цим фільтром у вибраний день."
                        : "Ingen treninger matcher filteret denne dagen."
                      : locale === "uk"
                      ? "На цей день тренувань немає."
                      : locale === "pl"
                      ? "Brak treningów w tym dniu."
                      : locale === "en"
                      ? "No classes scheduled for this day."
                      : "Ingen faste treninger satt opp denne dagen."}
                  </p>
                  {activeCategory !== "all" && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory("all")}
                      className="text-xs font-bold uppercase tracking-wider text-primary underline underline-offset-4"
                    >
                      {resetFilterLabel}
                    </button>
                  )}
                </div>
              ) : (
                roomsConfig.map((room) => {
                  if (room.slots.length === 0) return null;
                  const sortedRoomSlots = [...room.slots].sort((a, b) =>
                    extractTimeForSort(a.time).localeCompare(extractTimeForSort(b.time))
                  );
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
                        {sortedRoomSlots.map((slot, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "border border-border/40 rounded-xl p-4 transition-all duration-300 shadow-sm flex flex-col justify-between gap-4",
                              getActivityCardClass(slot.activity)
                            )}
                            data-tina-field={tinaField(slot as any)}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold mb-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {slot.time}
                                </span>
                                {renderSlotDetails(slot, "font-black text-lg text-foreground uppercase tracking-tight")}
                              </div>

                              {renderGroupBadge(slot.group, "text-[9px] font-bold")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Bottom Conversion Card */}
        <div className="mt-16 rounded-2xl bg-slate-950 text-white border border-slate-800 p-6 sm:p-8 md:p-10 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Trondheimsvegen 71B, 2072 Dal</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                {ctaCopy.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {ctaCopy.subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <ProveukeModal
                trigger={
                  <Button
                    size="lg"
                    spring={true}
                    className="w-full sm:w-auto h-12 px-6 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/25 gap-2"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{ctaCopy.trialBtn}</span>
                  </Button>
                }
              />
              <Link
                href="/forste-trening"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs sm:text-sm font-bold text-slate-100 transition-colors whitespace-nowrap"
              >
                <span>{ctaCopy.guideLink}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
