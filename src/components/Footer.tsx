"use client";

import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

export function Footer({ data }: { data?: any }) {
  const clubName = data?.clubName || "Eidsvoll Kampsportklubb";
  const description =
    data?.footerDescription ||
    "Vi vil gjerne høre fra deg! Enten du har spørsmål om treningstider, medlemskap, eller bare vil slå av en prat før du bestemmer deg for å prøve, er du alltid velkommen til å ta kontakt.";
  const email = data?.footerEmail || "kontakt@kampsporteidsvoll.no";
  const phone = data?.footerPhone || "976 10 229";
  const orgNumber = data?.footerOrgNumber || "";
  const address = data?.footerAddress || "";

  return (
    <footer id="kontakt" className="bg-slate-950 text-slate-300 py-16 md:py-24 border-t border-slate-900">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Kolonne 1 & 2: Klubbinfo & Logo */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-6 text-2xl font-bold tracking-tight text-white hover:text-primary transition-colors"
              data-tina-field={data ? tinaField(data, "clubName") : undefined}
            >
              <img
                src={data?.logo || "/logo.png"}
                alt="Eidsvoll Kampsportklubb Logo"
                className="w-10 h-10 object-contain"
              />
              <span>{clubName}</span>
            </Link>
            <p
              className="text-slate-400 max-w-sm mb-6 leading-relaxed text-sm"
              data-tina-field={data ? tinaField(data, "footerDescription") : undefined}
            >
              {description}
            </p>
          </div>

          {/* Kolonne 3: Trening & Medlemskap */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider text-xs">
              Trening & Medlem
            </h4>
            <nav aria-label="Trening og medlemskap">
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/nyheter" className="hover:text-white transition-colors">
                    Siste nyheter
                  </Link>
                </li>
                <li>
                  <Link href="/timeplan" className="hover:text-white transition-colors">
                    Timeplan & treninger
                  </Link>
                </li>
                <li>
                  <Link href="/medlemskap" className="hover:text-white transition-colors">
                    Bli medlem / Innmelding
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="hover:text-white transition-colors">
                    Kontakt oss
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Kolonne 4: Om klubben & Styret */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider text-xs">
              Klubbinformasjon
            </h4>
            <nav aria-label="Klubbinformasjon">
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/om-oss" className="hover:text-white transition-colors">
                    Om klubben & historie
                  </Link>
                </li>
                <li>
                  <Link href="/styret" className="hover:text-white transition-colors font-medium text-slate-200 hover:underline">
                    Styret og ledelse
                  </Link>
                </li>
                <li>
                  <Link href="/styret/organisasjonsplan" className="hover:text-white transition-colors">
                    Organisasjonsplan
                  </Link>
                </li>
                <li>
                  <Link href="/sponsorer" className="hover:text-white transition-colors font-medium text-slate-200 hover:underline">
                    Våre sponsorer
                  </Link>
                </li>
                <li>
                  <Link href="/samtykke" className="hover:text-white transition-colors text-slate-400">
                    Samtykke bildedeling
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Kolonne 5: Kontakt & Adresse */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider text-xs">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm">
              <li
                className="flex flex-col"
                data-tina-field={data ? tinaField(data, "footerEmail") : undefined}
              >
                <span className="text-slate-500 text-xs">E-post:</span>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors font-medium">
                  {email}
                </a>
              </li>
              <li
                className="flex flex-col"
                data-tina-field={data ? tinaField(data, "footerPhone") : undefined}
              >
                <span className="text-slate-500 text-xs">Tlf:</span>
                <a href={`tel:+47${phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors font-medium">
                  {phone}
                </a>
              </li>
              {orgNumber && (
                <li
                  className="flex flex-col"
                  data-tina-field={data ? tinaField(data, "footerOrgNumber") : undefined}
                >
                  <span className="text-slate-500 text-xs">Org.nr:</span>
                  <span className="text-slate-300">{orgNumber}</span>
                </li>
              )}
              {address && (
                <li
                  className="flex flex-col pt-1"
                  data-tina-field={data ? tinaField(data, "footerAddress") : undefined}
                >
                  <span className="text-slate-500 text-xs">Adresse:</span>
                  <span className="text-slate-300">{address}</span>
                </li>
              )}
            </ul>
          </div>

        </div>
        
        {/* Bunnlinje med sosiale medier og copyright */}
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
                  data-tina-field={tinaField(data, "facebook")}
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
                  data-tina-field={tinaField(data, "instagram")}
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
