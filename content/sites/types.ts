export type SiteStep = {
  title: string;
  text: string;
};

export type SiteItem = {
  title: string;
  text: string;
};

export type SiteFaqItem = {
  question: string;
  answer: string;
};

export type SiteContent = {
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    label: string;
    title: string;
    text: string;
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
  };
  trustPoints: string[];
  resultPoints: string[];
  processSteps: SiteStep[];
  whyUs: SiteItem[];
  faqItems: SiteFaqItem[];
  schema: {
    businessName: string;
    locality: string;
    serviceType: string;
    phone: string;
  };
};

export type SiteCatalogItem = {
  slug: string;
  industry: string;
  city: string;
  domainIdea: string;
  sourcePage: string;
  contentKey: string;
};
