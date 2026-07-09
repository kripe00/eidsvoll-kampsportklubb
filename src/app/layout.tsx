import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { client } from "../../tina/__generated__/client";
import { GlobalClient } from "@/components/GlobalClient";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://kampsporteidsvoll.no"),
  title: {
    default: "Eidsvoll Kampsportklubb | BJJ og Muay Thai i Eidsvoll",
    template: "%s | Eidsvoll Kampsportklubb",
  },
  applicationName: "Eidsvoll Kampsportklubb",
  description:
    "Eidsvoll Kampsportklubb i Eidsvoll – trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai/Thaiboksing for alle nivåer. Bli med i dag!",
  keywords: [
    "kampsport",
    "kampsportklubb",
    "kampsportsenter",
    "eidsvoll",
    "råholt",
    "dal",
    "BJJ",
    "brasiliansk jiu-jitsu",
    "muay thai",
    "thaiboksing",
    "trening",
  ],
  openGraph: {
    title: "Eidsvoll Kampsportklubb | BJJ og Muay Thai i Eidsvoll",
    description:
      "Eidsvoll Kampsportklubb i Eidsvoll – trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai/Thaiboksing for alle nivåer. Bli med i dag!",
    locale: "nb_NO",
    type: "website",
    siteName: "Eidsvoll Kampsportklubb",
    images: [
      {
        url: "/header.jpg",
        width: 1200,
        height: 630,
        alt: "Eidsvoll Kampsportklubb",
      },
    ],
  },
  verification: {
    google: [
      "Xi6GSGP6931IpcFgn6SZX9x2k2mr2LjYxE-sCOM17Po",
      "tJtsciuBX9XZ92_fC4xpP1fef-Dm5dKQ2KzgyHVWDFM",
    ],
  },
  icons: {
    icon: [
      { url: '/org-logo.svg', type: 'image/svg+xml' },
      { url: '/org-logo.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/org-logo.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/org-logo.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let globalData: any = {
    global: {
      clubName: "Eidsvoll Kampsportklubb",
      nav: [
        { label: "Om oss", href: "/om-oss" },
        { label: "Medlemskap", href: "/medlemskap" },
        { label: "Styret", href: "/styret" },
        { label: "Kontakt", href: "/kontakt" }
      ]
    }
  };
  let globalRes: any = { data: globalData, query: "", variables: {} };

  try {
    const res = await client.queries.global({ relativePath: "index.json" });
    if (res?.data?.global) {
      globalRes = res;
    }
  } catch (error) {
    console.error("TinaCMS Global fetch failed:", error);
  }

  return (
    <html lang="no" className={cn("font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsClub",
              "name": "Eidsvoll Kampsportklubb",
              "alternateName": "EKK",
              "url": "https://kampsporteidsvoll.no",
              "logo": "https://kampsporteidsvoll.no/org-logo.svg",
              "image": "https://kampsporteidsvoll.no/header.jpg",
              "description": "Eidsvoll Kampsportklubb i Eidsvoll – trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai/Thaiboksing for alle nivåer.",
              "sport": ["Brasiliansk Jiu-Jitsu", "Muay Thai", "Thaiboksing", "Cross-trening"],
              "email": "post@kampsporteidsvoll.no",
              "telephone": "+4797610229",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dal",
                "addressRegion": "Akershus",
                "addressCountry": "NO"
              },
              "sameAs": []
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-bold"
        >
          Hopp til hovedinnhold
        </a>
        <AnalyticsWrapper />
        <GlobalClient 
          data={globalRes.data} 
          query={globalRes.query} 
          variables={globalRes.variables}
        >
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
        </GlobalClient>
        <CookieBanner />
      </body>
    </html>
  );
}
