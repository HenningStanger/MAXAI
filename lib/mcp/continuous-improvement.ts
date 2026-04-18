import { LeadStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

type Snapshot = {
  generatedAt: string;
  totals: {
    leads: number;
    ny: number;
    kontaktet: number;
    moteBooket: number;
    kunder: number;
    tapt: number;
  };
  rates: {
    contactRate: number;
    meetingRate: number;
    customerRateFromMeetings: number;
  };
  perPage: Array<{
    sourcePage: string;
    leads: number;
    meetings: number;
    customers: number;
    meetingRate: number;
    customerRate: number;
  }>;
  bottlenecks: string[];
  actions: Array<{
    priority: "høy" | "middels" | "lav";
    title: string;
    expectedImpact: string;
    measurementWindow: string;
  }>;
};

function percent(value: number) {
  return Math.round(value * 100);
}

export async function buildImprovementSnapshot(): Promise<Snapshot> {
  const leads = await prisma.lead.findMany({
    select: { status: true, sourcePage: true, createdAt: true }
  });

  const totals = {
    leads: leads.length,
    ny: 0,
    kontaktet: 0,
    moteBooket: 0,
    kunder: 0,
    tapt: 0
  };

  const pageMap = new Map<string, { leads: number; meetings: number; customers: number }>();

  for (const lead of leads) {
    if (lead.status === LeadStatus.ny) totals.ny += 1;
    if (lead.status === LeadStatus.kontaktet) totals.kontaktet += 1;
    if (lead.status === LeadStatus.mote_booket) totals.moteBooket += 1;
    if (lead.status === LeadStatus.kunde) totals.kunder += 1;
    if (lead.status === LeadStatus.tapt) totals.tapt += 1;

    const current = pageMap.get(lead.sourcePage) ?? { leads: 0, meetings: 0, customers: 0 };
    current.leads += 1;
    if (lead.status === LeadStatus.mote_booket || lead.status === LeadStatus.kunde) {
      current.meetings += 1;
    }
    if (lead.status === LeadStatus.kunde) {
      current.customers += 1;
    }
    pageMap.set(lead.sourcePage, current);
  }

  const contactRate = totals.leads > 0 ? (totals.kontaktet + totals.moteBooket + totals.kunder) / totals.leads : 0;
  const meetingRate = totals.leads > 0 ? totals.moteBooket / totals.leads : 0;
  const customerRateFromMeetings = totals.moteBooket > 0 ? totals.kunder / totals.moteBooket : 0;

  const perPage = [...pageMap.entries()].map(([sourcePage, values]) => ({
    sourcePage,
    leads: values.leads,
    meetings: values.meetings,
    customers: values.customers,
    meetingRate: values.leads > 0 ? percent(values.meetings / values.leads) : 0,
    customerRate: values.meetings > 0 ? percent(values.customers / values.meetings) : 0
  }));

  const bottlenecks: string[] = [];
  if (contactRate < 0.6) {
    bottlenecks.push("Lav kontaktgrad: for mange leads står fortsatt som ny.");
  }
  if (meetingRate < 0.2) {
    bottlenecks.push("Lav møtegrad: CTA og kvalifisering i skjema bør forbedres.");
  }
  if (customerRateFromMeetings < 0.3 && totals.moteBooket > 0) {
    bottlenecks.push("Lav kundegrad fra møter: tilbud og oppfølging bør strammes inn.");
  }
  if (bottlenecks.length === 0) {
    bottlenecks.push("Ingen kritiske flaskehalser oppdaget i dagens datagrunnlag.");
  }

  const actions: Snapshot["actions"] = [
    {
      priority: "høy",
      title: "Test ny hero + CTA på primærsiden",
      expectedImpact: "Øke møtegrad med 10-20% i øvre del av trakten",
      measurementWindow: "7 dager"
    },
    {
      priority: "middels",
      title: "Innfør 24t oppfølgingsregel for alle nye leads",
      expectedImpact: "Bedre kontaktgrad og færre tapte leads",
      measurementWindow: "14 dager"
    },
    {
      priority: "lav",
      title: "Utvid FAQ med innvendinger fra faktiske lead-notater",
      expectedImpact: "Mindre friksjon før innsending",
      measurementWindow: "14 dager"
    }
  ];

  return {
    generatedAt: new Date().toISOString(),
    totals,
    rates: {
      contactRate: percent(contactRate),
      meetingRate: percent(meetingRate),
      customerRateFromMeetings: percent(customerRateFromMeetings)
    },
    perPage,
    bottlenecks,
    actions
  };
}

export function snapshotToMarkdown(snapshot: Snapshot) {
  const lines: string[] = [];
  lines.push(`# Daglig forbedringsrapport`);
  lines.push(``);
  lines.push(`Generert: ${snapshot.generatedAt}`);
  lines.push(``);
  lines.push(`## KPI-snapshot`);
  lines.push(`- Totale leads: ${snapshot.totals.leads}`);
  lines.push(`- Kontaktgrad: ${snapshot.rates.contactRate}%`);
  lines.push(`- Møtegrad: ${snapshot.rates.meetingRate}%`);
  lines.push(`- Kundegrad fra møter: ${snapshot.rates.customerRateFromMeetings}%`);
  lines.push(``);
  lines.push(`## Flaskehalser`);
  for (const item of snapshot.bottlenecks) {
    lines.push(`- ${item}`);
  }
  lines.push(``);
  lines.push(`## Prioriterte tiltak`);
  for (const action of snapshot.actions) {
    lines.push(
      `- [${action.priority.toUpperCase()}] ${action.title} (forventet effekt: ${action.expectedImpact}, målevindu: ${action.measurementWindow})`
    );
  }
  lines.push(``);
  lines.push(`## Per side`);
  for (const page of snapshot.perPage) {
    lines.push(
      `- ${page.sourcePage}: ${page.leads} leads, møtegrad ${page.meetingRate}%, kundegrad ${page.customerRate}%`
    );
  }
  return lines.join("\n");
}
