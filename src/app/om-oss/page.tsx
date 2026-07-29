import { client } from "../../../tina/__generated__/client";
import { GenericPageClient } from "@/components/GenericPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eidsvoll Kampsportklubb (EKK) – Tidligere Rambukk | Kampsport på Dal",
  description:
    "Rambukk har blitt til Eidsvoll Kampsportklubb (EKK). Vi har flyttet til nye, nyoppussede lokaler på Dal. Vi tilbyr BJJ (Checkmat), Muay Thai og Cross-trening.",
  keywords: [
    "Rambukk",
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
      _template: "about",
      title: "Vårt Tilbud",
      body: `Vårt kjernefokus ligger på kampsportene Brasiliansk Jiu-Jitsu (BJJ) og Muay Thai. Dette er sporter som bygger både fysisk styrke og mental robusthet. Som et viktig supplement til kampsporten tilbyr vi også Cross-trening. Dette er lagt opp for å bygge utholdenhet, styrke og forebygge skader, slik at våre medlemmer får et komplett og helhetlig treningstilbud.\n\nEnten målet ditt er å komme i bedre form, lære selvforsvar, konkurrere, eller bare bli del av et fantastisk miljø, har vi en plass til deg på matta.\n\nEidsvoll Kampsportklubb er stolt medlem av Norges Idrettsforbund (NIF) og Norges Kampsportforbund (NKF). Dette sikrer våre medlemmer trygge rammer, gode forsikringsordninger og idrett på høyeste nivå.\n\nEidsvoll Kampsportklubb holder til i nye, nyoppussede treningslokaler på Dal. Klubben drives nå i sin helhet av idrettslaget.`,
      image: "/PXL_20260211_163724399.jpg",
      video: "/VID_20260209_174201.mp4",
    },
    {
      _template: "values",
      title: "Trygghet, respekt og fellesskap",
      description:
        "For oss er kampsport et verktøy for å bygge gode holdninger og sterke mennesker. Vår visjon er å være Eidsvolls mest inkluderende treningsmiljø. For å oppnå dette bygger vi alt vi gjør på noen enkle, men ufravikelige grunnverdier:",
      variant: "asymmetric",
      image: "/PXL_20260211_163724399.jpg",
      items: [
        {
          title: "Respekt",
          text: "Vi bukker for hverandre, vi lytter, og vi behandler alle treningspartnere med like stor respekt – uansett nivå eller bakgrunn.",
          icon: "HeartHandshake",
        },
        {
          title: "Fellesskap",
          text: "Ingen blir gode alene. Vi løfter hverandre frem og feirer hverandres fremgang.",
          icon: "Users",
        },
        {
          title: "Disiplin",
          text: "Vi møter presis, gjør vårt beste, og viser dedikasjon til både sporten og klubben.",
          icon: "Flame",
        },
        {
          title: "Trygghet",
          text: "Alle skal føle seg ivaretatt hos oss. Spesielt for foreldre skal det være en absolutt trygghet i å sende barna sine til trening i våre lokaler.",
          icon: "ShieldCheck",
        },
      ],
    },
    {
      _template: "values",
      title: "Et miljø for alle",
      description:
        "I Eidsvoll Kampsportklubb har vi nulltoleranse for mobbing, rasisme og enhver form for diskriminering. Vi stiller oss også sterkt bak en ren idrett, med absolutt nulltoleranse for doping.",
      variant: "navy",
      image: "/images/club/sparring-action.jpg",
      items: [
        {
          title: "Trygg idrett & Etiske retningslinjer",
          text: "Vi forholder oss til Norges Idrettsforbund (NIF) sine generelle retningslinjer for et trygt og helsefremmende treningsmiljø. Hos oss skal all trening foregå i kontrollerte og trygge rammer, der utøverens helse og velferd alltid kommer i første rekke. Alle våre trenere er innforstått med sitt ansvar som forbilder og veiledere.",
          icon: "ShieldCheck",
        },
      ],
    },
    {
      _template: "timeline",
      title: "Vår reise og historie",
      subtitle: "Fra Rambukk på Råholt til Eidsvoll Kampsportklubb (EKK) på Dal",
      events: [
        {
          year: "2013",
          title: "Rambukk åpner på Råholt",
          location: "Råholt",
          description:
            "Rambukk startet som et privatfinansiert aksjeselskap (AS) på Råholt i 2013, og bygde over mange år opp et sterkt og inkluderende kampsportmiljø i lokalsamfunnet.",
          highlight: false,
        },
        {
          year: "September 2026",
          title: "Eidsvoll Kampsportklubb (EKK) overtar på Dal",
          location: "Dal",
          description:
            "Fra september 2026 overtok Eidsvoll Kampsportklubb (EKK) – et ideelt idrettslag tilknyttet Norges Idrettsforbund (NIF) – hele driften, medlemsadministrasjonen og lokalleien, og flyttet inn i nye, nyoppussede lokaler på Dal.",
          highlight: true,
        },
      ],
    },
    {
      _template: "orgSeparation",
      title: "Organisasjonsstruktur & Medlemsadministrasjon",
      subtitle: "Tydelig skille mellom Rambukk Sport AS og Eidsvoll Kampsportklubb (EKK)",
      description:
        "For å sikre full åpenhet for alle våre utøvere og foresatte, ønsker vi å klargjøre ansvarsfordelingen og endringen i medlemsadministrasjonen fra september 2026. Rambukk Sport AS sto tidligere for utleie og innkreving, mens Eidsvoll Kampsportklubb (EKK) nå håndterer alt direkte.",
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
    />
  );
}
