import { defineConfig } from "tinacms";
// Triggering reload for new collection

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch, 
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
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
                      itemProps: (item) => {
                        return { label: item?.name || "Ny trener" };
                      },
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
                      itemProps: (item) => {
                        return { label: item?.name || "Ny sponsor" };
                      },
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
                      itemProps: (item) => {
                        return { label: item?.title || "Nytt argument" };
                      },
                    },
                    fields: [
                      { type: "string", name: "title", label: "Tittel" },
                      { type: "string", name: "text", label: "Tekst", ui: { component: "textarea" } },
                      { type: "string", name: "icon", label: "Ikon (Heart, Eye, Award, etc.)" },
                    ],
                  },
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
          router: () => "/",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "welcomeText", label: "Velkomsttekst (H1)" },
          { type: "string", name: "highlightedText", label: "Uthevet tekst (Blå)" },
          { type: "string", name: "description", label: "Beskrivelse", ui: { component: "textarea" } },
          { type: "image", name: "backgroundImage", label: "Bakgrunnsbilde" },
          { type: "image", name: "backgroundVideo", label: "Bakgrunnsvideo (Valgfritt)" },
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
                label: "Tekstblokk",
                fields: [
                  { type: "string", name: "title", label: "Overskrift" },
                  { type: "string", name: "body", label: "Innhold", ui: { component: "textarea" } },
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
              itemProps: (item) => {
                return { label: item?.name || "Nytt medlem" };
              },
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
              itemProps: (item) => {
                return { label: item?.name || "Ny komité" };
              },
            },
            fields: [
              { type: "string", name: "name", label: "Komiténavn" },
              {
                type: "object",
                list: true,
                name: "people",
                label: "Personer",
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name || "Ny person" };
                  },
                },
                fields: [
                  { type: "string", name: "role", label: "Rolle" },
                  { type: "string", name: "name", label: "Navn" },
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
          router: ({ document }) => `/nyheter/${document._sys.filename}`,
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
                      itemProps: (item) => {
                        return { label: item?.title || "Nytt argument" };
                      },
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
                      itemProps: (item) => {
                        return { label: item?.name || "Ny sponsor" };
                      },
                    },
                    fields: [
                      { type: "string", name: "name", label: "Navn" },
                      { type: "image", name: "logo", label: "Logo" },
                      { type: "string", name: "url", label: "Nettside (URL)" },
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
            ],
          },
        ],
      },
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
                      itemProps: (item) => {
                        return { label: item?.name || "Ny trener" };
                      },
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
          { type: "string", name: "footerDescription", label: "Footer – Beskrivelse", ui: { component: "textarea" } },
          { type: "string", name: "footerEmail", label: "Footer – E-post" },
          { type: "string", name: "footerPhone", label: "Footer – Telefon" },
          { type: "string", name: "footerAddress", label: "Footer – Adresse" },
        ],
      },
    ],
  },
});
