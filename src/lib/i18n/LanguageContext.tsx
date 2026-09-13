"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Translations } from './types';
import { no } from './locales/no';
import { en } from './locales/en';
import { pl } from './locales/pl';
import { uk } from './locales/uk';

const dictionaries: Record<Locale, Translations> = {
  no,
  en,
  pl,
  uk,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'no',
  setLocale: () => {},
  t: no,
});

function detectBrowserLocale(): Locale {
  try {
    if (typeof window === 'undefined') return 'no';

    // 1. Check URL query param e.g. ?lang=uk or ?lang=pl
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang')?.toLowerCase();
    if (langParam === 'uk' || langParam === 'pl' || langParam === 'en' || langParam === 'no') {
      return langParam as Locale;
    }

    // 2. Check if user previously made an explicit selection
    const userSelected = localStorage.getItem('ekk_user_selected_locale');
    const saved = localStorage.getItem('ekk_locale') as Locale | null;
    if (userSelected === 'true' && saved && (saved === 'no' || saved === 'en' || saved === 'pl' || saved === 'uk')) {
      return saved;
    }

    // 3. Automatic detection from browser/system language preferences
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      if (!lang) continue;
      const l = lang.toLowerCase();
      if (l.startsWith('uk')) return 'uk';
      if (l.startsWith('pl')) return 'pl';
      if (l.startsWith('en')) return 'en';
      if (l.startsWith('no') || l.startsWith('nb') || l.startsWith('nn')) return 'no';
    }
  } catch {
    // Fallback if environment restricts access
  }
  return 'no';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('no');

  useEffect(() => {
    const detected = detectBrowserLocale();
    setLocaleState(detected);
    try {
      document.documentElement.lang = detected;
    } catch {
      // Ignore DOM access errors
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('ekk_locale', newLocale);
      localStorage.setItem('ekk_user_selected_locale', 'true');
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore storage errors
    }
  };

  const t = dictionaries[locale] || no;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
