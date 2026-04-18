import type { SiteContent } from "./types";

export const buildStavangerContent: SiteContent = {
  metadata: {
    title: "Regnskap for bygg i Stavanger | Fastpris og prosjektkontroll",
    description:
      "Spesialisert regnskap for bygg og entreprenør i Stavanger. Få kontroll på MVA, prosjektøkonomi og marginer med en statsautorisert regnskapsfører.",
    keywords: [
      "regnskap bygg stavanger",
      "entreprenør regnskap stavanger",
      "prosjektregnskap bygg",
      "mva bygg",
      "statsautorisert regnskapsfører stavanger"
    ]
  },
  hero: {
    label: "Regnskap for byggbedrifter i Stavanger",
    title: "Få kontroll på prosjektøkonomi, MVA og marginer uten stress",
    text: "Vi hjelper entreprenører med tydelig fastpris, bedre prosjektinnsikt og trygg oppfølging av frister. Målet er enklere drift og mer lønnsomme prosjekter.",
    primaryCta: "Bestill gratis 15-min avklaringssamtale",
    primaryHref: "#kontakt",
    secondaryCta: "Ring direkte: 40 00 00 00",
    secondaryHref: "tel:+4740000000"
  },
  trustPoints: [
    "Statsautorisert regnskapsfører",
    "Svar innen 1 arbeidsdag",
    "Fastpris uten skjulte kostnader"
  ],
  resultPoints: [
    "Bedre kontroll på MVA og frister",
    "Prosjektregnskap per byggeplass",
    "Månedlig rapportering som gir beslutningsgrunnlag"
  ],
  processSteps: [
    {
      title: "1. Kort kartlegging (15 min)",
      text: "Vi avklarer dagens utfordringer og hva som haster mest for din byggbedrift."
    },
    {
      title: "2. Konkret forslag",
      text: "Du får en tydelig plan med fastpris, ansvar og anbefalt oppstart."
    },
    {
      title: "3. Ryddig oppstart",
      text: "Vi setter opp flyt for bilag, MVA, lønn og prosjektrapportering uten kaos."
    }
  ],
  whyUs: [
    {
      title: "Bransjespesialisert team",
      text: "Vi jobber med bygg og entreprenør hver uke, og kjenner fallgruvene."
    },
    {
      title: "Tydelig fastpris",
      text: "Du vet hva du betaler for, og hva du får levert hver måned."
    },
    {
      title: "Rask respons på frister",
      text: "Vi holder kontroll på frister for MVA, lønn og årsoppgjør."
    },
    {
      title: "Rapporter som gir handling",
      text: "Du får tall per prosjekt så du kan styre kapasitet, pris og dekningsgrad."
    }
  ],
  faqItems: [
    {
      question: "Hva koster regnskap for en byggbedrift i Stavanger?",
      answer:
        "Pris avhenger av antall bilag, lønnskjøringer og prosjektkompleksitet. De fleste byggkunder velger fastpris med månedlig oppfølging for bedre kontroll."
    },
    {
      question: "Kan dere håndtere prosjektregnskap per byggeplass?",
      answer:
        "Ja. Vi setter opp rapportering per prosjekt så du ser dekning, kostnader og marginer fortløpende."
    },
    {
      question: "Hjelper dere med MVA i bygg og anlegg?",
      answer:
        "Ja. Vi kvalitetssikrer MVA-behandling, frister og dokumentasjon slik at risikoen for feil reduseres betydelig."
    },
    {
      question: "Hvor raskt kan vi komme i gang?",
      answer:
        "Vanligvis innen 3-7 arbeidsdager. Vi starter med et kort kartleggingsmøte og setter opp en konkret plan for overføring."
    }
  ],
  schema: {
    businessName: "MAXAI Regnskap Stavanger",
    locality: "Stavanger",
    serviceType: "Regnskap for bygg og entreprenør",
    phone: "+47 400 00 000"
  }
};
