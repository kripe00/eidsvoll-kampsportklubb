import { format } from "date-fns";
import { nb, enUS, pl as plLocale, uk as ukLocale } from "date-fns/locale";
import type { Locale } from "./i18n/types";

const DATE_FNS_LOCALES = {
  no: nb,
  en: enUS,
  pl: plLocale,
  uk: ukLocale,
} as const;

/**
 * Formats an ISO/date string as e.g. "15. november 2026" in the active UI locale.
 */
export function formatNewsDate(dateStr: string, locale: Locale): string {
  return format(new Date(dateStr), "d. MMMM yyyy", {
    locale: DATE_FNS_LOCALES[locale] ?? nb,
  });
}
