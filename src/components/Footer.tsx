"use client";

import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

export function Footer({ data }: { data?: any }) {
  const clubName = data?.clubName || "Eidsvoll Kampsportklubb";
  const description = data?.footerDescription || "Vi vil gjerne høre fra deg! Enten du har spørsmål om treningstider, medlemskap, eller bare vil slå av en prat før du bestemmer deg for å prøve, er du alltid velkommen til å ta kontakt.";
  const email = data?.footerEmail || "post@kampsporteidsvoll.no";
  const phone = data?.footerPhone || "976 10 229";
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
            </ul>
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
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {clubName}. Med enerett.</p>
        </div>
      </div>
    </footer>
  );
}
