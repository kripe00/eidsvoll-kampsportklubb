"use client";

import React, { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export function AnalyticsWrapper() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    // Initial check
    const savedConsent = localStorage.getItem("cookieConsent");
    setConsent(savedConsent);

    // Listen for updates from CookieBanner
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setConsent(customEvent.detail);
    };

    window.addEventListener("cookieConsentUpdated", handleConsentUpdate);
    return () => window.removeEventListener("cookieConsentUpdated", handleConsentUpdate);
  }, []);

  if (consent !== "granted") {
    return null;
  }

  return <GoogleAnalytics gaId="G-15WBHB4C6F" />;
}
