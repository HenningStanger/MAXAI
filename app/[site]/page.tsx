import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteLandingPage } from "@/components/sites/site-landing-page";
import { getAllSiteSlugs, getSiteContent } from "@/content/sites";

type Params = {
  params: Promise<{ site: string }>;
};

export async function generateStaticParams() {
  return getAllSiteSlugs().map((site) => ({ site }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { site } = await params;
  const content = getSiteContent(site);
  if (!content) {
    return {};
  }

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    keywords: content.metadata.keywords
  };
}

export default async function SitePage({ params }: Params) {
  const { site } = await params;
  const content = getSiteContent(site);
  if (!content) {
    notFound();
  }

  return <SiteLandingPage content={content} sourcePage={site} />;
}
