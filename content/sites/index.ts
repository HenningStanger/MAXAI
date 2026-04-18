import { buildStavangerContent } from "./build-stavanger";
import { siteCatalog } from "./site-catalog";
import type { SiteCatalogItem, SiteContent } from "./types";

const templateContent: SiteContent = {
  metadata: {
    title: "Regnskapstjenester | Side under klargjoring",
    description:
      "Denne landingssiden er klargjort i multisite-strukturen og fylles med nisjetilpasset innhold i neste steg.",
    keywords: ["regnskap", "regnskapsforer", "regnskapstjenester"]
  },
  schema: {
    businessName: "MAXAI Regnskap",
    locality: "Norge",
    serviceType: "Regnskapstjenester",
    phone: "+47 400 00 000"
  },
  hero: {
    label: "Ny nisjeside under produksjon",
    title: "Vi klargjorer innhold for din bransje og by",
    text: "Siden er teknisk klar i samme lead- og adminflyt som MVP-siden, og fylles med spesifikk tekst i neste leveranse.",
    primaryCta: "Book avklaringssamtale",
    primaryHref: "#kontakt",
    secondaryCta: "Ring direkte",
    secondaryHref: "tel:+4740000000"
  },
  trustPoints: ["Statsautorisert regnskapsforer", "Svar innen 1 arbeidsdag", "Fastpris uten binding"],
  resultPoints: ["Forenklet drift", "Bedre rapportering", "Tydelig oppfolging"],
  processSteps: [
    { title: "1. Kartlegging", text: "Vi avklarer behov og prioriteringer for bransjen." },
    { title: "2. Plan", text: "Du far en tydelig oppstartsplan med ansvar og tidslinje." },
    { title: "3. Leveranse", text: "Vi setter opp flyt for bilag, frister og rapportering." }
  ],
  whyUs: [
    { title: "Spisset kompetanse", text: "Vi bygger side og leveranse rundt din nisje." },
    { title: "Enkel oppfolging", text: "Du far tydelige neste steg uten komplisert oppsett." }
  ],
  faqItems: [
    {
      question: "Nar blir denne siden ferdigstilt?",
      answer: "Siden er planlagt i lanseringsrekkefolgen og oppdateres med full tekstpakke fortlopende."
    }
  ]
};

const contentByKey: Record<string, SiteContent> = {
  "build-stavanger": buildStavangerContent,
  template: templateContent
};

export const primarySiteSlug = "regnskap-bygg-stavanger";

export function getSiteBySlug(slug: string): { catalog: SiteCatalogItem; content: SiteContent } {
  const catalog = siteCatalog.find((item) => item.slug === slug) ?? siteCatalog[0];
  return {
    catalog,
    content: contentByKey[catalog.contentKey] ?? templateContent
  };
}

export function getSiteContent(slug: string) {
  return getSiteBySlug(slug).content;
}

export function getAllSites() {
  return siteCatalog;
}

export function getAllSiteSlugs() {
  return siteCatalog.map((site) => site.slug);
}
