import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { client } from "../../tina/__generated__/client";
import { GlobalClient } from "@/components/GlobalClient";
import { CookieBanner } from "@/components/CookieBanner";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";

import globalJson from "../../content/global/index.json";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#020617",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kampsporteidsvoll.no"),
  title: {
    default: "Eidsvoll Kampsportklubb | BJJ, Muay Thai & Trening på Dal",
    template: "%s | Eidsvoll Kampsportklubb",
  },
  applicationName: "Eidsvoll Kampsportklubb",
  description:
    "Eidsvoll Kampsportklubb (EKK) – trening i Brasiliansk Jiu-Jitsu (BJJ), Muay Thai/Thaiboksing, Crosstrening og Yoga. Nye lokaler i Trondheimsvegen 71B på Dal med 14 dagers gratis prøveperiode!",
  keywords: [
    "kampsport eidsvoll",
    "kampsport råholt",
    "kampsport dal",
    "bjj eidsvoll",
    "bjj råholt",
    "thaiboksing eidsvoll",
    "muay thai eidsvoll",
    "trening eidsvoll",
    "barnetrening eidsvoll",
    "crosstrening eidsvoll",
    "selvforsvar eidsvoll",
    "trening for barn råholt",
    "bjj barn eidsvoll",
    "kampsportsenter eidsvoll",
    "Eidsvoll Kampsportklubb",
    "EKK",
    "Rambukk",
    "Rambukk Sport",
    "brasiliansk jiu-jitsu",
    "thaiboksing",
    "crosstrening",
    "yoga dal",
    "ullensaker",
    "jessheim",
    "nes",
    "årnes",
    "hurdal",
    "minnesund",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Eidsvoll Kampsportklubb | BJJ, Muay Thai & Trening på Dal",
    description:
      "Eidsvoll Kampsportklubb (EKK) – trening i Brasiliansk Jiu-Jitsu (BJJ), Muay Thai/Thaiboksing, Crosstrening og Yoga. Nye lokaler i Trondheimsvegen 71B på Dal med gratis prøveuke for alle!",
    locale: "nb_NO",
    type: "website",
    siteName: "Eidsvoll Kampsportklubb",
    url: "https://kampsporteidsvoll.no",
    images: [
      {
        url: "/header.jpg",
        width: 1200,
        height: 630,
        alt: "Eidsvoll Kampsportklubb – BJJ, Muay Thai og trening på Dal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eidsvoll Kampsportklubb | BJJ, Muay Thai & Trening på Dal",
    description:
      "Trening i Brasiliansk Jiu-Jitsu (BJJ), Muay Thai, Crosstrening og Yoga i Trondheimsvegen 71B på Dal. Prøv gratis i 2 uker!",
    images: ["/header.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: [
      "Xi6GSGP6931IpcFgn6SZX9x2k2mr2LjYxE-sCOM17Po",
      "tJtsciuBX9XZ92_fC4xpP1fef-Dm5dKQ2KzgyHVWDFM",
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData: any = {
    global: globalJson
  };
  let globalRes: any = { data: globalData, query: "", variables: {} };

  try {
    const res = await client.queries.global({ relativePath: "index.json" });
    if (res?.data?.global) {
      globalRes = {
        ...res,
        data: {
          ...res.data,
          global: {
            ...res.data.global,
            ...globalJson
          }
        }
      };
    }
  } catch (error) {
    console.error("TinaCMS Global fetch failed:", error);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SportsClub", "LocalBusiness"],
        "@id": "https://kampsporteidsvoll.no/#club",
        "name": "Eidsvoll Kampsportklubb",
        "alternateName": ["EKK", "Eidsvoll BJJ", "Eidsvoll Kampsport", "Rambukk Sport"],
        "url": "https://kampsporteidsvoll.no",
        "logo": "https://kampsporteidsvoll.no/logo.png",
        "image": "https://kampsporteidsvoll.no/header.jpg",
        "description": "Eidsvoll Kampsportklubb tilbyr trening i Brasiliansk Jiu-Jitsu (BJJ), Muay Thai (thaiboksing), Crosstrening og Yoga for barn, ungdom og voksne i splitter nye lokaler på Dal.",
        "sport": [
          "Brasiliansk Jiu-Jitsu",
          "BJJ",
          "Muay Thai",
          "Thaiboksing",
          "Crosstrening",
          "Yoga"
        ],
        "email": "kontakt@kampsporteidsvoll.no",
        "telephone": "+4797610229",
        "priceRange": "$$",
        "currenciesAccepted": "NOK",
        "paymentAccepted": "Avtalegiro, Vipps, Kort",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Trondheimsvegen 71B",
          "postalCode": "2072",
          "addressLocality": "Dal",
          "addressRegion": "Akershus",
          "addressCountry": "NO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 60.2483,
          "longitude": 11.2033
        },
        "hasMap": "https://maps.google.com/?q=Trondheimsvegen+71B,+2072+Dal",
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "Gratis parkering på baksiden",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Inngang på baksiden av bygget",
            "value": true
          }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "17:00",
            "closes": "21:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday"],
            "opens": "12:00",
            "closes": "14:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/eidsvollkampsportklubb/",
          "https://www.facebook.com/kampsporteidsvoll"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://kampsporteidsvoll.no/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Hvordan fungerer gratis prøveperiode hos Eidsvoll Kampsportklubb?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vi tilbyr 14 dagers helt gratis og uforpliktende prøveperiode for alle nye utøvere. I prøveperioden har du fri tilgang til alle våre treninger (BJJ, Muay Thai, Crosstrening og Yoga)."
            }
          },
          {
            "@type": "Question",
            "name": "Hvor ligger Eidsvoll Kampsportklubb og hvor parkerer man?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vi holder til i Trondheimsvegen 71B, 2072 Dal. Både inngangen til klubben og gratis parkering finner du på baksiden av bygget."
            }
          },
          {
            "@type": "Question",
            "name": "Hva trenger jeg av utstyr og sko til første trening?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vanlig, rent treningstøy uten glidelåser og en vannflaske er alt du trenger. For kampsport og yoga trener vi barbent på mattene, mens for Crosstrening benyttes rene innesko. Klubben har gratis låneutstyr som boksehansker."
            }
          },
          {
            "@type": "Question",
            "name": "Har dere kampsport og treninger for barn?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, vi har egne tilpassede partier for barn i BJJ (Barneparti 1 for 6–9 år og Barneparti 2 for 10–13 år) samt Muay Thai for barn, med fokus på motorikk, trygghet og mestring."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="no" className={cn("font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
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
