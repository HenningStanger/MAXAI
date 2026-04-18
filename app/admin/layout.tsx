import { LogoutButton } from "@/components/admin/logout-button";
import { getSessionUser } from "@/lib/auth/session";
import Link from "next/link";

export default async function AdminLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSessionUser();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">MAXAI Adminpanel</h1>
          <p className="text-sm text-slate-600">
            {session ? `Innlogget som ${session.username}` : "Logg inn for a handtere leads."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Dashboard
          </Link>
          {session ? <LogoutButton /> : null}
        </div>
      </header>
      {children}
    </main>
  );
}
