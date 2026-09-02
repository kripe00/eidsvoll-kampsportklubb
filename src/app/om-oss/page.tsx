import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";
import { ClubLinks } from "@/components/ClubLinks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eidsvoll Kampsportklubb (EKK) / Rambukk Sport AS | Kampsport på Dal",
  description:
    "Eidsvoll Kampsportklubb (EKK) viderefører kampsportaktiviteten fra Rambukk Sport AS i nye lokaler på Dal. Vi tilbyr BJJ (Checkmat), Muay Thai og Cross-trening.",
  keywords: [
    "Rambukk Sport AS",
    "Rambukk Sport",
    "Rambukk kampsport",
    "Råholt",
    "Eidsvoll Kampsportklubb",
    "EKK",
    "Dal",
    "Checkmat",
    "Leo Vieira",
    "BJJ",
    "Muay Thai",
  ],
};

const fallbackOmOssData = {
  title: "Om oss",
  description:
    "Eidsvoll Kampsportklubb er mer enn bare et sted å trene – vi er et fellesskap. Med dype røtter i Eidsvoll har vi skapt et inkluderende og trygt miljø der folk i alle aldre, og med ulik erfaringsbakgrunn, kan oppleve ekte idrettsglede og mestring.",
  blocks: [
    {
      _template: "timeline",
      title: "Vår reise og historie",
      subtitle: "Fra Rambukk Sport AS på Råholt til Eidsvoll Kampsportklubb (EKK) på Dal",
      events: [
        {
          year: "2013",
          title: "Rambukk Sport AS etableres på Råholt",
          location: "Råholt",
          description:
            "Rambukk Sport AS ble etablert på Råholt i 2013, og bygde over mange år opp et sterkt og inkluderende kampsportmiljø i lokalsamfunnet.",
          highlight: false,
        },
        {
          year: "2023",
          title: "Stiftelsen av Eidsvoll Kampsportklubb (EKK) på Råholt",
          location: "Råholt",
          description:
            "Eidsvoll Kampsportklubb (EKK) ble stiftet på Råholt i 2023 som et ideelt idrettslag tilknyttet Norges Idrettsforbund (NIF) og Norges Kampsportforbund (NKF).",
          highlight: false,
        },
        {
          year: "September 2026",
          title: "EKK samler driften på Dal",
          location: "Dal",
          description:
            "Fra september 2026 viderefører og samler Eidsvoll Kampsportklubb (EKK) hele driften, medlemsadministrasjonen og aktiviteten i nye lokaler på Dal.",
          highlight: true,
        },
      ],
    },
    {
      _template: "about",
      title: "Vårt Tilbud",
      body: `Vårt kjernefokus ligger på kampsportene Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai. Dette er sporter som bygger både fysisk styrke og mental robusthet. Som et viktig supplement til kampsporten tilbyr vi også Cross-trening. Dette er lagt opp for å bygge utholdenhet, styrke og forebygge skader, slik at våre medlemmer får et komplett og helhetlig treningstilbud.\n\nEnten målet ditt er å komme i bedre form, lære selvforsvar, konkurrere, eller bare bli del av et fantastisk miljø, har vi en plass til deg på matta.\n\nEidsvoll Kampsportklubb er stolt medlem av Norges Idrettsforbund (NIF) og Norges Kampsportforbund (NKF). Dette sikrer våre medlemmer trygge rammer, gode forsikringsordninger og idrett på høyeste nivå.\n\nEidsvoll Kampsportklubb holder til i nye, nyoppussede treningslokaler på Dal. Klubben drives nå i sin helhet av idrettslaget.`,
      image: "/PXL_20260211_163724399.jpg",
      video: "/VID_20260209_174201.mp4",
    },
    {
      _template: "orgSeparation",
      title: "Organisasjonsstruktur & Medlemsadministrasjon",
      subtitle: "Eidsvoll Kampsportklubb (EKK) og Rambukk Sport AS",
      description:
        "For å sikre full åpenhet overfor alle våre utøvere og foresatte, ønsker vi å presisere at Eidsvoll Kampsportklubb (EKK) viderefører kampsportaktiviteten fra Rambukk Sport AS i nye lokaler på Dal. Fra og med september 2026 håndteres alle medlemskap og treningsavgifter direkte av idrettslaget (EKK).",
    },
    {
      _template: "checkmat",
      title: "Offisiell Checkmat Affiliate",
      subtitle: "Brasiliansk Jiu-Jitsu i verdensklasse under Leo Vieira",
      description:
        "Eidsvoll Kampsportklubb er stolt offisiell Checkmat-klubb, direkte tilknyttet Checkmats grunnlegger Leo Vieira og det globale hovedkvarteret. Hos oss kombinerer vi elite-BJJ med et kompromissløst fokus på utøvernes trygghet, helse og gode verdier.",
      features: [
        {
          title: "Verdensklasse BJJ-standard",
          description:
            "Strukturert og teknisk BJJ-trening bygd på konseptene fra et av verdens mest fremgangsrike og vinnende kampsportakademier.",
          icon: "Award",
        },
        {
          title: "Internasjonale beltegraderinger",
          description:
            "Alle beltegraderinger hos Eidsvoll Kampsportklubb er offisielt registrert og godkjent under Leo Vieira og Checkmats globale hovedkvarter.",
          icon: "ShieldCheck",
        },
        {
          title: "Åpent globalt nettverk",
          description:
            "Som utøver i en offisiell Checkmat-klubb står dørene åpne for trening ved Checkmat-akademier verden over når du reiser.",
          icon: "Globe",
        },
      ],
    },
    {
      _template: "trainers",
      title: "Våre trenere",
      trainerList: [
        {
          name: "Christer Alfheim",
          role: "Hovedtrener BJJ",
          image: "/IMG_5297-Forbedret-NR-1.JPG",
          bio: "Som hovedtrener for Eidsvoll Kampsportklubb har Christer et brennende engasjement for å utvikle utøvere i alle aldre. Han er opptatt av å skape et treningsmiljø der teknisk presisjon, idrettsglede og trygghet står i fokus. Med solid erfaring sørger Christer for at alle på matta føler seg sett og ivaretatt, og han tilpasser treningen slik at både nybegynnere og erfarne kampsportutøvere får utfordret seg på riktig nivå i trygge rammer.",
        },
        {
          name: "Alexandra Husum Strøm",
          role: "Barnetrener BJJ",
          image: "/Litt juks.JPG",
          bio: "Som barnetrener hos Eidsvoll Kampsportklubb brenner Alexandra for å gi barn og unge en trygg og inspirerende start på matta. Hennes fokus er å kombinere lekende læring med disiplin, slik at treningene er både gøyale og lærerike. Alexandra er opptatt av å skape et inkluderende miljø der barna opplever mestring og idrettsglede, samtidig som de utvikler grunnleggende motoriske ferdigheter. Med stor tålmodighet og omsorg sørger hun for at hvert barn blir sett, støttet og motivert til å bygge selvtillit og gode holdninger i en trygg atmosfære.",
        },
        {
          name: "Pernille Støen",
          role: "Barnetrener BJJ",
          bio: "Som barnetrener i Eidsvoll Kampsportklubb brenner Pernille for å skape treningsglede og samhold fra første stund på matta. Hun kombinerer høyt energinivå og lek med tydelige rammer, slik at barna lærer kampsport i et trygt og forutsigbart miljø. For Pernille er det viktig å bygge et sterkt fundament av balanse, koordinasjon og kroppsbeherskelse hos de yngste utøverne. Med sitt smittende engasjement og varme vesen hjelper hun barna med å tørre å utfordre seg selv, bygge varige vennskap og oppleve gleden av å vokse – både som utøvere og som trygge individer.",
        },
      ],
    },
  ],
};

export default async function OmOssPage() {
  let pageRes: any = { data: { omOss: fallbackOmOssData }, query: "", variables: {} };

  try {
    const res = await client.queries.omOss({ relativePath: "index.md" });
    if (res?.data?.omOss) {
      pageRes = res;
    }
  } catch (error) {
    console.error("TinaCMS OmOss fetch failed (using local fallback data):", error);
  }

  return (
    <GenericPageClient 
      data={pageRes.data} 
      query={pageRes.query} 
      variables={pageRes.variables} 
      extraContent={<ClubLinks />}
    />
  );
}
