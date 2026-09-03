// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "810c085c-dd16-47c3-8ca2-865f4019e4ca",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
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
          allowedActions: { create: false, delete: false }
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
                  { type: "image", name: "video", label: "Video (Valgfritt)" }
                ]
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
                      { label: "Navy (Trygg Idrett)", value: "navy" }
                    ]
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
                      { type: "string", name: "icon", label: "Ikon (Users, Heart, etc.)" }
                    ]
                  }
                ]
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
                  { type: "string", name: "extraInfo", label: "Tilleggsinformasjon (f.eks. utmelding)", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny trener" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "string", name: "role", label: "Rolle" },
                      { type: "image", name: "image", label: "Bilde" },
                      { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny sponsor" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "image", name: "logo", label: "Logo" },
                      { type: "string", name: "url", label: "Nettside (URL)" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt argument" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Heart, Eye, Award, etc.)" }
                    ]
                  }
                ]
              },
              {
                name: "faq",
                label: "FAQ / Ofte stilte sp\xF8rsm\xE5l",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Sp\xF8rsm\xE5l og svar",
                    ui: {
                      itemProps: (item) => ({ label: item?.question || "Nytt sp\xF8rsm\xE5l" })
                    },
                    fields: [
                      { type: "string", name: "question", label: "Sp\xF8rsm\xE5l", required: true },
                      { type: "string", name: "answer", label: "Svar", ui: { component: "textarea" }, required: true }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny pakke" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Pakkenavn", required: true },
                      { type: "string", name: "description", label: "Kort beskrivelse" },
                      { type: "string", list: true, name: "perks", label: "Fordeler (en per linje i UI)" },
                      { type: "boolean", name: "highlighted", label: "Fremhev pakken?" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.year ? `${item.year} - ${item.title}` : "Ny hendelse" })
                    },
                    fields: [
                      { type: "string", name: "year", label: "\xC5r / Tidspunkt" },
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "location", label: "Sted" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "boolean", name: "highlight", label: "Fremhev kort?" }
                    ]
                  }
                ]
              },
              {
                name: "orgSeparation",
                label: "Organisasjonsstruktur (Rambukk vs EKK)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt punkt" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Award, ShieldCheck, Globe, etc.)" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
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
          }
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
                  { type: "image", name: "video", label: "Video (Valgfritt)" }
                ]
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
                      { label: "Navy (Trygg Idrett)", value: "navy" }
                    ]
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
                      { type: "string", name: "icon", label: "Ikon (Users, Heart, etc.)" }
                    ]
                  }
                ]
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
                  { type: "string", name: "extraInfo", label: "Tilleggsinformasjon (f.eks. utmelding)", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny trener" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "string", name: "role", label: "Rolle" },
                      { type: "image", name: "image", label: "Bilde" },
                      { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny sponsor" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "image", name: "logo", label: "Logo" },
                      { type: "string", name: "url", label: "Nettside (URL)" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt argument" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Heart, Eye, Award, etc.)" }
                    ]
                  }
                ]
              },
              {
                name: "faq",
                label: "FAQ / Ofte stilte sp\xF8rsm\xE5l",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Sp\xF8rsm\xE5l og svar",
                    ui: {
                      itemProps: (item) => ({ label: item?.question || "Nytt sp\xF8rsm\xE5l" })
                    },
                    fields: [
                      { type: "string", name: "question", label: "Sp\xF8rsm\xE5l", required: true },
                      { type: "string", name: "answer", label: "Svar", ui: { component: "textarea" }, required: true }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny pakke" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Pakkenavn", required: true },
                      { type: "string", name: "description", label: "Kort beskrivelse" },
                      { type: "string", list: true, name: "perks", label: "Fordeler (en per linje i UI)" },
                      { type: "boolean", name: "highlighted", label: "Fremhev pakken?" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.year ? `${item.year} - ${item.title}` : "Ny hendelse" })
                    },
                    fields: [
                      { type: "string", name: "year", label: "\xC5r / Tidspunkt" },
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "location", label: "Sted" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "boolean", name: "highlight", label: "Fremhev kort?" }
                    ]
                  }
                ]
              },
              {
                name: "orgSeparation",
                label: "Organisasjonsstruktur (Rambukk vs EKK)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt punkt" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Award, ShieldCheck, Globe, etc.)" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "hero",
        label: "Forside / Hero",
        path: "content/hero",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "welcomeText", label: "Velkomsttekst (H1)" },
          { type: "string", name: "highlightedText", label: "Uthevet tekst (Bl\xE5)" },
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
              itemProps: (item) => ({ label: item?.caption || "Nytt bilde" })
            },
            fields: [
              {
                type: "image",
                name: "image",
                label: "Bilde",
                required: true,
                ui: {
                  uploadDir: () => "instagram"
                }
              },
              { type: "string", name: "caption", label: "Bildetekst" },
              { type: "string", name: "postUrl", label: "Lenke til innlegg (Valgfritt)" }
            ]
          }
        ]
      },
      {
        name: "schedule",
        label: "Treningstider / Timeplan",
        path: "content/schedule",
        format: "json",
        ui: {
          router: () => "/timeplan",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "days",
            label: "Dager",
            ui: {
              itemProps: (item) => ({ label: item?.day || "Ny dag" })
            },
            fields: [
              { type: "string", name: "day", label: "Dag (f.eks. Mandag)", required: true },
              {
                type: "object",
                list: true,
                name: "slots",
                label: "Trenings\xF8kter",
                ui: {
                  itemProps: (item) => ({ label: item ? `${item.time || ""} - ${item.activity || ""}` : "Ny \xF8kt" })
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
                      { value: "Muay Thai", label: "Muay Thai" },
                      { value: "Yoga", label: "Yoga" },
                      { value: "Crosstrening", label: "Crosstrening" },
                      { value: "\xC5pen matte", label: "\xC5pen matte / annet" }
                    ]
                  },
                  {
                    type: "string",
                    name: "group",
                    label: "M\xE5lgruppe/Parti",
                    required: true,
                    options: [
                      { value: "Barneparti 1 (6-9 \xE5r)", label: "Barneparti 1 (6-9 \xE5r)" },
                      { value: "Barneparti 2 (10-13 \xE5r)", label: "Barneparti 2 (10-13 \xE5r)" },
                      { value: "Muay Thai", label: "Muay Thai" },
                      { value: "Barn (Felles)", label: "Barn (Felles)" },
                      { value: "Voksne / Ungdom", label: "Voksne / Ungdom" },
                      { value: "Videreg\xE5ende", label: "Videreg\xE5ende" },
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
                      { value: "Hele bruket", label: "Hele bruket" }
                    ]
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
                      { value: "Hele bruket", label: "Hele bruket" }
                    ]
                  },
                  { type: "string", name: "trainer", label: "Instrukt\xF8r (Valgfritt)" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "styret",
        label: "Styret og organisasjon",
        path: "content/styret",
        format: "json",
        ui: {
          router: () => "/styret",
          allowedActions: { create: false, delete: false }
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
                  { type: "image", name: "video", label: "Video (Valgfritt)" }
                ]
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
                      { label: "Navy (Trygg Idrett)", value: "navy" }
                    ]
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
                      { type: "string", name: "icon", label: "Ikon (Users, Heart, etc.)" }
                    ]
                  }
                ]
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
                  { type: "string", name: "extraInfo", label: "Tilleggsinformasjon (f.eks. utmelding)", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny trener" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "string", name: "role", label: "Rolle" },
                      { type: "image", name: "image", label: "Bilde" },
                      { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny sponsor" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "image", name: "logo", label: "Logo" },
                      { type: "string", name: "url", label: "Nettside (URL)" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt argument" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Heart, Eye, Award, etc.)" }
                    ]
                  }
                ]
              },
              {
                name: "faq",
                label: "FAQ / Ofte stilte sp\xF8rsm\xE5l",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Sp\xF8rsm\xE5l og svar",
                    ui: {
                      itemProps: (item) => ({ label: item?.question || "Nytt sp\xF8rsm\xE5l" })
                    },
                    fields: [
                      { type: "string", name: "question", label: "Sp\xF8rsm\xE5l", required: true },
                      { type: "string", name: "answer", label: "Svar", ui: { component: "textarea" }, required: true }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny pakke" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Pakkenavn", required: true },
                      { type: "string", name: "description", label: "Kort beskrivelse" },
                      { type: "string", list: true, name: "perks", label: "Fordeler (en per linje i UI)" },
                      { type: "boolean", name: "highlighted", label: "Fremhev pakken?" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.year ? `${item.year} - ${item.title}` : "Ny hendelse" })
                    },
                    fields: [
                      { type: "string", name: "year", label: "\xC5r / Tidspunkt" },
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "location", label: "Sted" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "boolean", name: "highlight", label: "Fremhev kort?" }
                    ]
                  }
                ]
              },
              {
                name: "orgSeparation",
                label: "Organisasjonsstruktur (Rambukk vs EKK)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt punkt" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Award, ShieldCheck, Globe, etc.)" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            list: true,
            name: "members",
            label: "Styremedlemmer",
            ui: {
              itemProps: (item) => ({ label: item?.name || "Nytt medlem" })
            },
            fields: [
              { type: "string", name: "role", label: "Rolle" },
              { type: "string", name: "name", label: "Navn" },
              { type: "image", name: "image", label: "Bilde" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "committees",
            label: "Komiteer",
            ui: {
              itemProps: (item) => ({ label: item?.name || "Ny komit\xE9" })
            },
            fields: [
              { type: "string", name: "name", label: "Komit\xE9navn" },
              {
                type: "object",
                list: true,
                name: "people",
                label: "Personer",
                ui: {
                  itemProps: (item) => ({ label: item?.name || "Ny person" })
                },
                fields: [
                  { type: "string", name: "role", label: "Rolle" },
                  { type: "string", name: "name", label: "Navn" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "organisasjonsplan",
        label: "Organisasjonsplan",
        path: "content/organisasjonsplan",
        format: "md",
        ui: {
          router: () => "/styret/organisasjonsplan",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { type: "string", name: "title", label: "Overskrift", isTitle: true, required: true },
          { type: "rich-text", name: "body", label: "Innhold", isBody: true }
        ]
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
          { type: "rich-text", name: "body", label: "Innhold", isBody: true }
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w\.\/-\s]/gi, "") || "ny-sak"}`;
            }
          },
          router: ({ document }) => `/nyheter/${document._sys.filename}`,
          allowedActions: { create: true, delete: true }
        }
      },
      {
        name: "sponsorer",
        label: "Sponsorer",
        path: "content/sponsorer",
        format: "md",
        ui: {
          router: () => "/sponsorer",
          allowedActions: { create: false, delete: false }
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
                label: "Om oss / Tekst",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bilde" },
                  { type: "image", name: "video", label: "Video (Valgfritt)" }
                ]
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
                      { label: "Navy (Trygg Idrett)", value: "navy" }
                    ]
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
                      { type: "string", name: "icon", label: "Ikon (Users, Heart, etc.)" }
                    ]
                  }
                ]
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
                  { type: "string", name: "extraInfo", label: "Tilleggsinformasjon (f.eks. utmelding)", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny trener" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "string", name: "role", label: "Rolle" },
                      { type: "image", name: "image", label: "Bilde" },
                      { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny sponsor" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "image", name: "logo", label: "Logo" },
                      { type: "string", name: "url", label: "Nettside (URL)" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt argument" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Heart, Eye, Award, etc.)" }
                    ]
                  }
                ]
              },
              {
                name: "faq",
                label: "FAQ / Ofte stilte sp\xF8rsm\xE5l",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Sp\xF8rsm\xE5l og svar",
                    ui: {
                      itemProps: (item) => ({ label: item?.question || "Nytt sp\xF8rsm\xE5l" })
                    },
                    fields: [
                      { type: "string", name: "question", label: "Sp\xF8rsm\xE5l", required: true },
                      { type: "string", name: "answer", label: "Svar", ui: { component: "textarea" }, required: true }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny pakke" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Pakkenavn", required: true },
                      { type: "string", name: "description", label: "Kort beskrivelse" },
                      { type: "string", list: true, name: "perks", label: "Fordeler (en per linje i UI)" },
                      { type: "boolean", name: "highlighted", label: "Fremhev pakken?" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.year ? `${item.year} - ${item.title}` : "Ny hendelse" })
                    },
                    fields: [
                      { type: "string", name: "year", label: "\xC5r / Tidspunkt" },
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "location", label: "Sted" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "boolean", name: "highlight", label: "Fremhev kort?" }
                    ]
                  }
                ]
              },
              {
                name: "orgSeparation",
                label: "Organisasjonsstruktur (Rambukk vs EKK)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt punkt" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Award, ShieldCheck, Globe, etc.)" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "medlemskap",
        label: "Medlemskap",
        path: "content/medlemskap",
        format: "md",
        ui: {
          router: () => "/medlemskap",
          allowedActions: { create: false, delete: false }
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
                label: "Om oss / Tekst",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bilde" },
                  { type: "image", name: "video", label: "Video (Valgfritt)" }
                ]
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
                      { label: "Navy (Trygg Idrett)", value: "navy" }
                    ]
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
                      { type: "string", name: "icon", label: "Ikon (Users, Heart, etc.)" }
                    ]
                  }
                ]
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
                  { type: "string", name: "extraInfo", label: "Tilleggsinformasjon (f.eks. utmelding)", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny trener" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "string", name: "role", label: "Rolle" },
                      { type: "image", name: "image", label: "Bilde" },
                      { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny sponsor" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "image", name: "logo", label: "Logo" },
                      { type: "string", name: "url", label: "Nettside (URL)" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt argument" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Heart, Eye, Award, etc.)" }
                    ]
                  }
                ]
              },
              {
                name: "faq",
                label: "FAQ / Ofte stilte sp\xF8rsm\xE5l",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Sp\xF8rsm\xE5l og svar",
                    ui: {
                      itemProps: (item) => ({ label: item?.question || "Nytt sp\xF8rsm\xE5l" })
                    },
                    fields: [
                      { type: "string", name: "question", label: "Sp\xF8rsm\xE5l", required: true },
                      { type: "string", name: "answer", label: "Svar", ui: { component: "textarea" }, required: true }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.name || "Ny pakke" })
                    },
                    fields: [
                      { type: "string", name: "name", label: "Pakkenavn", required: true },
                      { type: "string", name: "description", label: "Kort beskrivelse" },
                      { type: "string", list: true, name: "perks", label: "Fordeler (en per linje i UI)" },
                      { type: "boolean", name: "highlighted", label: "Fremhev pakken?" }
                    ]
                  }
                ]
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
                      itemProps: (item) => ({ label: item?.year ? `${item.year} - ${item.title}` : "Ny hendelse" })
                    },
                    fields: [
                      { type: "string", name: "year", label: "\xC5r / Tidspunkt" },
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "location", label: "Sted" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "boolean", name: "highlight", label: "Fremhev kort?" }
                    ]
                  }
                ]
              },
              {
                name: "orgSeparation",
                label: "Organisasjonsstruktur (Rambukk vs EKK)",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "subtitle", label: "Undertittel" },
                  { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } }
                ]
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
                      itemProps: (item) => ({ label: item?.title || "Nytt punkt" })
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Award, ShieldCheck, Globe, etc.)" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "contact",
        label: "Kontaktinformasjon",
        path: "content/contact",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/kontakt"
        },
        fields: [
          { type: "string", name: "email", label: "E-post" },
          { type: "string", name: "phone", label: "Telefon" },
          { type: "string", name: "address", label: "Adresse" },
          { type: "string", name: "facebook", label: "Facebook Link" },
          { type: "string", name: "instagram", label: "Instagram Link" },
          { type: "image", name: "image", label: "Hovedbilde" }
        ]
      },
      {
        name: "global",
        label: "Global / Header & Footer",
        path: "content/global",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
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
              { type: "string", name: "href", label: "Lenke" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "sponsors",
            label: "Globale Sponsorer",
            ui: {
              itemProps: (item) => ({ label: item?.name || "Ny sponsor" })
            },
            fields: [
              { type: "string", name: "name", label: "Navn" },
              { type: "image", name: "logo", label: "Logo" },
              { type: "string", name: "url", label: "Nettside (URL)" }
            ]
          },
          { type: "string", name: "footerDescription", label: "Footer \u2013 Beskrivelse", ui: { component: "textarea" } },
          { type: "string", name: "footerEmail", label: "Footer \u2013 E-post" },
          { type: "string", name: "footerPhone", label: "Footer \u2013 Telefon" },
          { type: "string", name: "footerAddress", label: "Footer \u2013 Adresse" },
          { type: "string", name: "footerOrgNumber", label: "Footer \u2013 Organisasjonsnummer" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
