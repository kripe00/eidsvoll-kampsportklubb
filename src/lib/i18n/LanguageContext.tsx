"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Translations } from './types';
import { no } from './locales/no';
import { en } from './locales/en';
import { pl } from './locales/pl';

const dictionaries: Record<Locale, Translations> = {
  no,
  en,
  pl,
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('no');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ekk_locale') as Locale | null;
      if (saved && (saved === 'no' || saved === 'en' || saved === 'pl')) {
        setLocaleState(saved);
        document.documentElement.lang = saved;
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('pl')) {
          setLocaleState('pl');
          document.documentElement.lang = 'pl';
        } else if (browserLang.startsWith('en')) {
          setLocaleState('en');
          document.documentElement.lang = 'en';
        } else {
          document.documentElement.lang = 'no';
        }
      }
    } catch {
      // Fallback silently if localStorage is restricted
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('ekk_locale', newLocale);
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
