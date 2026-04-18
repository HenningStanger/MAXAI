import { getUserSession } from "@/lib/auth/user-session";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

function formatBudget(value: number | null) {
  if (value === null) {
    return "Ikke satt";
  }
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0
  }).format(value);
}

export default async function MinKontoPage() {
  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <section className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Min konto</h1>
          <Link href="/onboarding" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
            Rediger onboarding
          </Link>
        </div>
        <p className="mt-2 text-sm text-slate-600">Her ser du informasjonen vi bruker for å tilpasse leadsmaskinen.</p>

        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Navn</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{user.name}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">E-post</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{user.email}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Firma</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{user.company || "Ikke satt"}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Nettside</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{user.website || "Ikke satt"}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Hovedmål</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{user.primaryGoal || "Ikke satt"}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Månedlig budsjett</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {formatBudget(user.monthlyBudgetNok ?? null)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Onboarding</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {user.onboardingComplete ? "Fullført" : "Ikke fullført"}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

