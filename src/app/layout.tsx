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
  title: {
    default: "Eidsvoll Kampsportklubb | BJJ og Muay Thai på Råholt",
    template: "%s | Eidsvoll Kampsportklubb",
  },
  applicationName: "Eidsvoll Kampsportklubb",
  description:
    "Eidsvoll Kampsportklubb på Råholt – trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai/Thaiboksing for alle nivåer. Bli med i dag!",
  keywords: [
    "kampsport",
    "kampsportklubb",
    "kampsportsenter",
    "eidsvoll",
    "råholt",
    "BJJ",
    "brasiliansk jiu-jitsu",
    "muay thai",
    "thaiboksing",
    "trening",
  ],
  openGraph: {
    title: "Eidsvoll Kampsportklubb | BJJ og Muay Thai på Råholt",
    description:
      "Eidsvoll Kampsportklubb på Råholt – trening i Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai/Thaiboksing for alle nivåer. Bli med i dag!",
    locale: "nb_NO",
    type: "website",
    siteName: "Eidsvoll Kampsportklubb",
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
      <body className="flex min-h-screen flex-col">
        <AnalyticsWrapper />
        <GlobalClient 
          data={globalRes.data} 
          query={globalRes.query} 
          variables={globalRes.variables}
        >
          <main className="flex-1 w-full">
            {children}
          </main>
        </GlobalClient>
        <CookieBanner />
      </body>
    </html>
  );
}
