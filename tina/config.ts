import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "810c085c-dd16-47c3-8ca2-865f4019e4ca",
  token: process.env.TINA_TOKEN || "c05f5e9a3f49d2bf637d361a9384fb627a783e6e",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "omOss",
        label: "Om oss",
        path: "content/om-oss",
        format: "md",
        ui: {
          router: () => "/om-oss",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Tittel", isTitle: true, required: true },
          { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Seksjoner",
            templates: [
              {
                name: "about",
                label: "Om oss / Tekst",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bilde" },
                  { type: "image", name: "video", label: "Video (Valgfritt)" },
                ],
              },
              {
                name: "values",
                label: "Verdier",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "description", label: "Beskrivelse" },
                  {
                    type: "string",
                    name: "variant",
                    label: "Designvariant",
                    options: [
                      { label: "Asymmetrisk (Verdier)", value: "asymmetric" },
                      { label: "Navy (Trygg Idrett)", value: "navy" },
                    ],
                  },
                  { type: "image", name: "image", label: "Bilde" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Verdipunkter",
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Users, Heart, etc.)" },
                    ],
                  },
                ],
              },
              {
                name: "trainers",
                label: "Trenere",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "trainerList",
                    label: "Trenerliste",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.name || "Ny trener" }),
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "string", name: "role", label: "Rolle" },
                      { type: "image", name: "image", label: "Bilde" },
                      { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } },
                    ],
                  },
                ],
              },
              {
                name: "faq",
                label: "FAQ / Ofte stilte spørsmål",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Spørsmål og svar",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.question || "Nytt spørsmål" }),
                    },
                    fields: [
                      { type: "string", name: "question", label: "Spørsmål", required: true },
                      { type: "string", name: "answer", label: "Svar", ui: { component: "textarea" }, required: true },
                    ],
                  },
                ],
              },
              {
                name: "timeline",
                label: "Tidslinje / Klubbens historie",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  {
                    type: "object",
                    list: true,
                    name: "events",
                    label: "Tidshendelser",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.year ? `${item.year} - ${item.title}` : "Ny hendelse" }),
                    },
                    fields: [
                      { type: "string", name: "year", label: "År / Tidspunkt" },
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "location", label: "Sted" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "boolean", name: "highlight", label: "Fremhev kort?" },
                    ],
                  },
                ],
              },
              {
                name: "orgSeparation",
                label: "Organisasjonsstruktur (Rambukk vs EKK)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                ],
              },
              {
                name: "checkmat",
                label: "Checkmat Lineage & Verdier",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                  {
                    type: "object",
                    list: true,
                    name: "features",
                    label: "Fordeler / Punkter",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.title || "Nytt punkt" }),
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Award, ShieldCheck, Globe, etc.)" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Sider",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") return `/`;
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          { type: "string", name: "title", label: "Tittel", isTitle: true, required: true },
          { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Seksjoner",
            templates: [
              {
                name: "about",
                label: "Om oss / Tekst",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bilde" },
                ],
              },
              {
                name: "values",
                label: "Verdier",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "description", label: "Beskrivelse" },
                  {
                    type: "string",
                    name: "variant",
                    label: "Designvariant",
                    options: [
                      { label: "Asymmetrisk (Verdier)", value: "asymmetric" },
                      { label: "Navy (Trygg Idrett)", value: "navy" },
                    ],
                  },
                  { type: "image", name: "image", label: "Bilde" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Verdipunkter",
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Users, Heart, etc.)" },
                    ],
                  },
                ],
              },
              {
                name: "membership",
                label: "Medlemskap (Sign-up)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                  { type: "string", name: "linkUrl", label: "MinIdrett Lenke" },
                  { type: "string", name: "boostLinkUrl", label: "Boost Lenke (Valgfritt)" },
                  { type: "boolean", name: "boostEnabled", label: "Aktiver Boost-knapp?" },
                  { type: "string", name: "extraInfo", label: "Tilleggsinformasjon (f.eks. utmelding)", ui: { component: "textarea" } },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "hero",
        label: "Forside / Hero",
        path: "content/hero",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "welcomeText", label: "Velkomsttekst (H1)" },
          { type: "string", name: "highlightedText", label: "Uthevet tekst (Blå)" },
          { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
          { type: "image", name: "backgroundImage", label: "Bakgrunnsbilde" },
          { type: "image", name: "backgroundVideo", label: "Bakgrunnsvideo (Valgfritt)" },
          { type: "string", name: "instagramTitle", label: "Instagram Seksjonstittel" },
          { type: "string", name: "instagramUsername", label: "Instagram Brukernavn (f.eks. @eidsvoll_kampsportklubb)" },
          { type: "string", name: "instagramLink", label: "Instagram Profil-lenke" },
          {
            type: "object",
            list: true,
            name: "instagramImages",
            label: "Instagram Bilder (Manuelt galleri)",
            ui: {
              itemProps: (item: any) => ({ label: item?.caption || "Nytt bilde" }),
            },
            fields: [
              { 
                type: "image", 
                name: "image", 
                label: "Bilde", 
                required: true,
                ui: {
                  uploadDir: () => "instagram",
                },
              } as any,
              { type: "string", name: "caption", label: "Bildetekst" },
              { type: "string", name: "postUrl", label: "Lenke til innlegg (Valgfritt)" },
            ],
          },
        ],
      },
      {
        name: "schedule",
        label: "Treningstider / Timeplan",
        path: "content/schedule",
        format: "json",
        ui: {
          router: () => "/timeplan",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "days",
            label: "Dager",
            ui: {
              itemProps: (item: any) => ({ label: item?.day || "Ny dag" }),
            },
            fields: [
              { type: "string", name: "day", label: "Dag (f.eks. Mandag)", required: true },
              {
                type: "object",
                list: true,
                name: "slots",
                label: "Treningsøkter",
                ui: {
                  itemProps: (item: any) => ({ label: item ? `${item.time || ""} - ${item.activity || ""}` : "Ny økt" }),
                },
                fields: [
                  { type: "string", name: "time", label: "Klokkeslett (f.eks. 18:00 - 19:30)", required: true },
                  {
                    type: "string",
                    name: "activity",
                    label: "Aktivitet/Gren",
                    required: true,
                    options: [
                      { value: "BJJ", label: "BJJ" },
                      { value: "Thaiboksing", label: "Thaiboksing (Muay Thai)" },
                      { value: "Yoga", label: "Yoga" },
                      { value: "Crosstrening", label: "Crosstrening" },
                      { value: "Åpen matte", label: "Åpen matte / annet" },
                    ],
                  },
                  {
                    type: "string",
                    name: "group",
                    label: "Målgruppe/Parti",
                    required: true,
                    options: [
                      { value: "Barneparti 1 (6-9 år)", label: "Barneparti 1 (6-9 år)" },
                      { value: "Barneparti 2 (10-12 år)", label: "Barneparti 2 (10-12 år)" },
                      { value: "Barn (Felles)", label: "Barn (Felles)" },
                      { value: "Voksne / Ungdom", label: "Voksne / Ungdom" },
                      { value: "Videregående", label: "Videregående" },
                      { value: "Alle", label: "Alle" },
                      { value: "BJJ kids 1", label: "BJJ kids 1" },
                      { value: "BJJ kids 2", label: "BJJ kids 2" },
                      { value: "BJJ no-gi", label: "BJJ no-gi" },
                      { value: "BJJ basic", label: "BJJ basic" },
                      { value: "BJJ advanced", label: "BJJ advanced" },
                      { value: "Dagtrening BJJ", label: "Dagtrening BJJ" },
                      { value: "Sparring BJJ", label: "Sparring BJJ" },
                      { value: "Crosstrening - Kickstart", label: "Crosstrening - Kickstart" },
                      { value: "Yinsaya yoga", label: "Yinsaya yoga" },
                      { value: "Hele bruket", label: "Hele bruket" },
                    ],
                  },
                  {
                    type: "string",
                    name: "room",
                    label: "Sal / Matte",
                    required: true,
                    options: [
                      { value: "Sal 1", label: "Sal 1 (BJJ & Muay Thai)" },
                      { value: "Sal 2", label: "Sal 2 (BJJ)" },
                      { value: "CT/yoga sal", label: "CT/yoga sal" },
                      { value: "Hele bruket", label: "Hele bruket" },
                    ],
                  },
                  { type: "string", name: "trainer", label: "Instruktør (Valgfritt)" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "styret",
        label: "Styret og organisasjon",
        path: "content/styret",
        format: "json",
        ui: {
          router: () => "/styret",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Overskrift" },
          { type: "rich-text", name: "description", label: "Beskrivelse" },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Ekstra seksjoner",
            templates: [
              {
                name: "about",
                label: "Om oss / Tekst",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bilde" },
                ],
              },
            ],
          },
          {
            type: "object",
            list: true,
            name: "members",
            label: "Styremedlemmer",
            ui: {
              itemProps: (item: any) => ({ label: item?.name || "Nytt medlem" }),
            },
            fields: [
              { type: "string", name: "role", label: "Rolle" },
              { type: "string", name: "name", label: "Navn" },
              { type: "image", name: "image", label: "Bilde" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "committees",
            label: "Komiteer",
            ui: {
              itemProps: (item: any) => ({ label: item?.name || "Ny komité" }),
            },
            fields: [
              { type: "string", name: "name", label: "Komiténavn" },
              {
                type: "object",
                list: true,
                name: "people",
                label: "Personer",
                ui: {
                  itemProps: (item: any) => ({ label: item?.name || "Ny person" }),
                },
                fields: [
                  { type: "string", name: "role", label: "Rolle" },
                  { type: "string", name: "name", label: "Navn" },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "organisasjonsplan",
        label: "Organisasjonsplan",
        path: "content/organisasjonsplan",
        format: "md",
        ui: {
          router: () => "/styret/organisasjonsplan",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Overskrift", isTitle: true, required: true },
          { type: "rich-text", name: "body", label: "Innhold", isBody: true },
        ],
      },
      {
        name: "news",
        label: "Nyheter",
        path: "content/news",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Tittel", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Dato", required: true },
          { type: "string", name: "category", label: "Kategori", options: ["Nyheter", "Info", "Aktivitet"] },
          { type: "image", name: "image", label: "Bilde" },
          { type: "string", name: "description", label: "Kort beskrivelse", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Innhold", isBody: true },
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values: any) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w\.\/-\s]/gi, '') || 'ny-sak'}`;
            },
          },
          router: ({ document }: any) => `/nyheter/${document._sys.filename}`,
          allowedActions: { create: true, delete: true },
        },
      },
      {
        name: "sponsorer",
        label: "Sponsorer",
        path: "content/sponsorer",
        format: "md",
        ui: {
          router: () => "/sponsorer",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Tittel", isTitle: true, required: true },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Seksjoner",
            templates: [
              {
                name: "about",
                label: "Intro / Tekst",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bilde" },
                ],
              },
              {
                name: "benefits",
                label: "Fordeler / Argumenter",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Argumenter",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.title || "Nytt argument" }),
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Heart, Eye, Award, etc.)" },
                    ],
                  },
                ],
              },
              {
                name: "sponsors",
                label: "Sponsorer / Logoer",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "sponsorList",
                    label: "Sponsorliste",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.name || "Ny sponsor" }),
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "image", name: "logo", label: "Logo" },
                      { type: "string", name: "url", label: "Nettside (URL)" },
                    ],
                  },
                ],
              },
              {
                name: "packages",
                label: "Sponsorpakker / Priser",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                  {
                    type: "object",
                    list: true,
                    name: "packagesList",
                    label: "Pakker",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.name || "Ny pakke" }),
                    },
                    fields: [
                      { type: "string", name: "name", label: "Pakkenavn", required: true },
                      { type: "string", name: "description", label: "Kort beskrivelse" },
                      { type: "string", list: true, name: "perks", label: "Fordeler (en per linje i UI)" },
                      { type: "boolean", name: "highlighted", label: "Fremhev pakken?" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "medlemskap",
        label: "Medlemskap",
        path: "content/medlemskap",
        format: "md",
        ui: {
          router: () => "/medlemskap",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "title", label: "Tittel", isTitle: true, required: true },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Seksjoner",
            templates: [
              {
                name: "membership",
                label: "Medlemskap (Sign-up)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                  { type: "string", name: "linkUrl", label: "MinIdrett Lenke" },
                  { type: "string", name: "boostLinkUrl", label: "Boost Lenke (Valgfritt)" },
                  { type: "boolean", name: "boostEnabled", label: "Aktiver Boost-knapp?" },
                  { type: "string", name: "extraInfo", label: "Tilleggsinformasjon (f.eks. utmelding)", ui: { component: "textarea" } },
                ],
              },
              {
                name: "about",
                label: "Tekstblokk",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bilde" },
                ],
              },
              {
                name: "faq",
                label: "FAQ / Ofte stilte spørsmål",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Spørsmål og svar",
                    ui: {
                      itemProps: (item: any) => ({ label: item?.question || "Nytt spørsmål" }),
                    },
                    fields: [
                      { type: "string", name: "question", label: "Spørsmål", required: true },
                      { type: "string", name: "answer", label: "Svar", ui: { component: "textarea" }, required: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "contact",
        label: "Kontaktinformasjon",
        path: "content/contact",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/kontakt",
        },
        fields: [
          { type: "string", name: "email", label: "E-post" },
          { type: "string", name: "phone", label: "Telefon" },
          { type: "string", name: "address", label: "Adresse" },
          { type: "string", name: "facebook", label: "Facebook Link" },
          { type: "string", name: "instagram", label: "Instagram Link" },
          { type: "image", name: "image", label: "Hovedbilde" },
        ],
      },
      {
        name: "global",
        label: "Global / Header & Footer",
        path: "content/global",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "clubName", label: "Klubbnavn" },
          { type: "image", name: "logo", label: "Logo" },
          { type: "string", name: "facebook", label: "Facebook Link" },
          { type: "string", name: "instagram", label: "Instagram Link" },
          {
            type: "object",
            list: true,
            name: "nav",
            label: "Navigasjon",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Lenke" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "sponsors",
            label: "Globale Sponsorer",
            ui: {
              itemProps: (item: any) => ({ label: item?.name || "Ny sponsor" }),
            },
            fields: [
              { type: "string", name: "name", label: "Navn" },
              { type: "image", name: "logo", label: "Logo" },
              { type: "string", name: "url", label: "Nettside (URL)" },
            ],
          },
          { type: "string", name: "footerDescription", label: "Footer – Beskrivelse", ui: { component: "textarea" } },
          { type: "string", name: "footerEmail", label: "Footer – E-post" },
          { type: "string", name: "footerPhone", label: "Footer – Telefon" },
          { type: "string", name: "footerAddress", label: "Footer – Adresse" },
          { type: "string", name: "footerOrgNumber", label: "Footer – Organisasjonsnummer" },
        ],
      },
    ],
  },
});
