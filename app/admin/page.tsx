import { LeadStatus } from "@/generated/prisma/enums";
import { TestLeadAlertButton } from "@/components/admin/test-lead-alert-button";
import { statusLabel } from "@/lib/leads/repository";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

type DashboardSearchParams = {
  period?: string;
  status?: string;
};

const periodOptions = [
  { value: "7d", label: "Siste 7 dager", days: 7 },
  { value: "30d", label: "Siste 30 dager", days: 30 },
  { value: "all", label: "Alle", days: null }
] as const;

function resolvePeriod(value: string | undefined) {
  return periodOptions.find((option) => option.value === value) ?? periodOptions[1];
}

function getSinceDate(days: number | null) {
  if (days === null) {
    return undefined;
  }
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function isFollowUpOverdue(createdAt: Date, status: LeadStatus) {
  if (status !== LeadStatus.ny) {
    return false;
  }
  const ageMs = Date.now() - createdAt.getTime();
  return ageMs > 24 * 60 * 60 * 1000;
}

export default async function AdminDashboardPage({
  searchParams
}: {
  searchParams: Promise<DashboardSearchParams>;
}) {
  const params = await searchParams;
  const selectedPeriod = resolvePeriod(params.period);
  const selectedStatus =
    params.status && Object.values(LeadStatus).includes(params.status as LeadStatus)
      ? (params.status as LeadStatus)
      : "all";
  const since = getSinceDate(selectedPeriod.days);

  const leads = await prisma.lead.findMany({
    where: {
      ...(since
        ? {
            createdAt: {
              gte: since
            }
          }
        : {}),
      ...(selectedStatus !== "all" ? { status: selectedStatus } : {})
    },
    orderBy: { createdAt: "desc" }
  });

  const totals = {
    leads: leads.length,
    ny: leads.filter((lead) => lead.status === LeadStatus.ny).length,
    overdue24h: leads.filter((lead) => isFollowUpOverdue(lead.createdAt, lead.status)).length,
    mote: leads.filter((lead) => lead.status === LeadStatus.mote_booket).length,
    kunder: leads.filter((lead) => lead.status === LeadStatus.kunde).length
  };

  const meetingRate = totals.leads === 0 ? 0 : Math.round((totals.mote / totals.leads) * 100);
  const customerRate = totals.mote === 0 ? 0 : Math.round((totals.kunder / totals.mote) * 100);

  return (
    <section className="space-y-6">
      <TestLeadAlertButton />
      <form className="flex flex-wrap items-end gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:max-w-xs">
          Periode
          <select
            name="period"
            defaultValue={selectedPeriod.value}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-blue-700 focus:ring-2"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 sm:max-w-xs">
          Status
          <select
            name="status"
            defaultValue={selectedStatus}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-blue-700 focus:ring-2"
          >
            <option value="all">Alle</option>
            <option value={LeadStatus.ny}>Ny</option>
            <option value={LeadStatus.kontaktet}>Kontaktet</option>
            <option value={LeadStatus.mote_booket}>Møte booket</option>
            <option value={LeadStatus.kunde}>Kunde</option>
            <option value={LeadStatus.tapt}>Tapt</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Oppdater KPI
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-6">
        <article className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Totale leads</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totals.leads}</p>
        </article>
        <article className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Nye leads</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totals.ny}</p>
        </article>
        <article className="rounded-xl bg-white p-4 ring-1 ring-amber-200">
          <p className="text-sm text-amber-700">Ikke kontaktet &gt; 24t</p>
          <p className="mt-1 text-2xl font-bold text-amber-800">{totals.overdue24h}</p>
        </article>
        <article className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Møter booket</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totals.mote}</p>
        </article>
        <article className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Møtegrad</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{meetingRate}%</p>
        </article>
        <article className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Kundegrad</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{customerRate}%</p>
        </article>
      </div>

      <section className="rounded-xl bg-white ring-1 ring-slate-200">
        <header className="border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-semibold text-slate-900">Leads</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Navn</th>
                <th className="px-4 py-3">Firma</th>
                <th className="px-4 py-3">E-post</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Oppfølging</th>
                <th className="px-4 py-3">Kilde</th>
                <th className="px-4 py-3">Opprettet</th>
                <th className="px-4 py-3">Handling</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">{lead.name}</td>
                  <td className="px-4 py-3 text-slate-700">{lead.company}</td>
                  <td className="px-4 py-3 text-slate-700">{lead.email}</td>
                  <td className="px-4 py-3 text-slate-700">{statusLabel(lead.status)}</td>
                  <td className="px-4 py-3">
                    {isFollowUpOverdue(lead.createdAt, lead.status) ? (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                        Krever oppfølging
                      </span>
                    ) : (
                      <span className="text-slate-400">OK</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{lead.sourcePage}</td>
                  <td className="px-4 py-3 text-slate-700">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-semibold text-blue-700 hover:text-blue-800"
                    >
                      Åpne
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
