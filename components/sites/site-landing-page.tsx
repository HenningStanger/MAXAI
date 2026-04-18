import { CardsSection } from "@/components/sections/cards-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeadFormSection } from "@/components/sections/lead-form-section";
import { ProcessSection } from "@/components/sections/process-section";
import { WhyUsSection } from "@/components/sections/why-us-section";
import type { SiteContent } from "@/content/sites/types";

type Props = {
  content: SiteContent;
  sourcePage: string;
};

export function SiteLandingPage({ content, sourcePage }: Props) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: content.schema.businessName,
    areaServed: content.schema.locality,
    serviceType: content.schema.serviceType,
    telephone: content.schema.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.schema.locality,
      addressCountry: "NO"
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <HeroSection
        label={content.hero.label}
        title={content.hero.title}
        text={content.hero.text}
        trustPoints={content.trustPoints}
        primaryCta={content.hero.primaryCta}
        primaryHref={content.hero.primaryHref}
        secondaryCta={content.hero.secondaryCta}
        secondaryHref={content.hero.secondaryHref}
      />

      <CardsSection
        items={content.resultPoints}
        text="Praktisk oppfølging for bedrifter som vil ta bedre beslutninger."
      />

      <ProcessSection title="Slik jobber vi sammen" steps={content.processSteps} />

      <WhyUsSection title="Derfor velger bedrifter oss" items={content.whyUs} />

      <FaqSection title="Vanlige spørsmål" items={content.faqItems} />

      <LeadFormSection
        title="Bestill gratis avklaringssamtale"
        description="Kort skjema. Vi kontakter deg innen 1 arbeidsdag med forslag til neste steg."
        sourcePage={sourcePage}
      />
    </main>
  );
}
