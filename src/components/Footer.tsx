"use client";

import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

export function Footer({ data }: { data?: any }) {
  const clubName = data?.clubName || "Eidsvoll Kampsportklubb";
  const description = data?.footerDescription || "Vi vil gjerne høre fra deg! Enten du har spørsmål om treningstider, medlemskap, eller bare vil slå av en prat før du bestemmer deg for å prøve, er du alltid velkommen til å ta kontakt.";
  const email = data?.footerEmail || "post@kampsporteidsvoll.no";
  const phone = data?.footerPhone || "976 10 229";
  const orgNumber = data?.footerOrgNumber || "";
  const address = data?.footerAddress || "";
  const navItems = data?.nav || [];
  
  return (
    <footer id="kontakt" className="bg-slate-950 text-slate-300 py-16 md:py-24 border-t border-slate-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block mb-6 text-2xl font-bold tracking-tight text-white hover:text-primary transition-colors" data-tina-field={data ? tinaField(data, 'clubName') : undefined}>
              {clubName}
            </Link>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed" data-tina-field={data ? tinaField(data, 'footerDescription') : undefined}>
              {description}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Snarveier</h4>
            <nav aria-label="Bunntekst-navigasjon">
            <ul className="space-y-3 text-sm">
              {navItems.length > 0 ? (
                navItems.map((item: any, i: number) => (
                  <li key={i} data-tina-field={data ? tinaField(item) : undefined}>
                    <Link href={item.href || "/"} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/om-oss" className="hover:text-white transition-colors">Om oss</Link></li>
                  <li><Link href="/medlemskap" className="hover:text-white transition-colors">Bli medlem</Link></li>
                  <li><Link href="/styret" className="hover:text-white transition-colors">Styret og organisasjon</Link></li>
                </>
              )}
              <li>
                <Link href="/samtykke" className="hover:text-white transition-colors">
                  Samtykke bildedeling
                </Link>
              </li>
            </ul>
            </nav>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3" data-tina-field={data ? tinaField(data, 'footerEmail') : undefined}>
                <span className="text-slate-500 font-medium w-16">E-post:</span>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
              <li className="flex items-start gap-3" data-tina-field={data ? tinaField(data, 'footerPhone') : undefined}>
                <span className="text-slate-500 font-medium w-16">Tlf:</span>
                <a href={`tel:+47${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              {orgNumber && (
                <li className="flex items-start gap-3" data-tina-field={data ? tinaField(data, 'footerOrgNumber') : undefined}>
                  <span className="text-slate-500 font-medium w-16">Org.nr:</span>
                  <span className="text-slate-300">{orgNumber}</span>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3" data-tina-field={data ? tinaField(data, 'footerAddress') : undefined}>
                  <span className="text-slate-500 font-medium w-16">Adresse:</span>
                  <span className="text-slate-300">{address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {clubName}. Med enerett.</p>
          {(data?.facebook || data?.instagram) && (
            <div className="flex items-center gap-4">
              {data.facebook && (
                <Link 
                  href={data.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 hover:text-white transition-colors p-2 rounded-full border border-slate-900 hover:border-slate-800 bg-slate-950 flex items-center justify-center"
                  aria-label="Følg oss på Facebook"
                  data-tina-field={tinaField(data, 'facebook')}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
              )}
              {data.instagram && (
                <Link 
                  href={data.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 hover:text-white transition-colors p-2 rounded-full border border-slate-900 hover:border-slate-800 bg-slate-950 flex items-center justify-center"
                  aria-label="Følg oss på Instagram"
                  data-tina-field={tinaField(data, 'instagram')}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
