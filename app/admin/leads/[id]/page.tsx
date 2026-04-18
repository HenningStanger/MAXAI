import { LeadUpdateForm } from "@/components/admin/lead-update-form";
import { statusLabel } from "@/lib/leads/repository";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export default async function LeadDetailPage({ params }: Params) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      activities: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!lead) {
    notFound();
  }

  return (
    <section className="space-y-5">
      <Link href="/admin" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
        ← Tilbake til dashboard
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1.2fr,1fr]">
        <article className="rounded-xl bg-white p-5 ring-1 ring-slate-200">
          <h2 className="text-xl font-bold text-slate-900">{lead.name}</h2>
          <p className="mt-1 text-slate-600">
            {lead.company} · {lead.email}
          </p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500">Status</dt>
              <dd className="font-semibold text-slate-900">{statusLabel(lead.status)}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Kilde</dt>
              <dd className="font-semibold text-slate-900">{lead.sourcePage}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Opprettet</dt>
              <dd className="font-semibold text-slate-900">{formatDate(lead.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Oppdatert</dt>
              <dd className="font-semibold text-slate-900">{formatDate(lead.updatedAt)}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <h3 className="font-semibold text-slate-900">Melding fra lead</h3>
            <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              {lead.message || "Ingen melding registrert."}
            </p>
          </div>

          <div className="mt-5">
            <h3 className="font-semibold text-slate-900">Historikk</h3>
            <ul className="mt-3 space-y-2">
              {lead.activities.map((activity) => (
                <li key={activity.id} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">{activity.message}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatDate(activity.createdAt)}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <LeadUpdateForm
          leadId={lead.id}
          initialStatus={lead.status}
          initialNotes={lead.notes ?? ""}
        />
      </div>
    </section>
  );
}
