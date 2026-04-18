"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Innlogging feilet.");
      setSubmitting(false);
      return;
    }

    router.push(data.redirectTo ?? "/onboarding");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <section className="w-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Logg inn som bruker</h1>
        <p className="mt-2 text-sm text-slate-600">Gå videre til onboarding eller admin.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            E-post
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Passord
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
            />
          </label>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {submitting ? "Logger inn..." : "Logg inn"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Ny her?{" "}
          <Link href="/ny-bruker" className="font-semibold text-blue-700 hover:text-blue-800">
            Opprett bruker
          </Link>
        </p>
      </section>
    </main>
  );
}

