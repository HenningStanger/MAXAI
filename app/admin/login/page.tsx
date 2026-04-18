"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "Innlogging feilet.");
      setSubmitting(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <section className="w-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Adminpanel innlogging</h1>
        <p className="mt-2 text-sm text-slate-600">
          Logg inn for å håndtere leads og oppfølging.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Brukernavn
            <input
              type="text"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
            className="w-full rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {submitting ? "Logger inn..." : "Logg inn"}
          </button>
        </form>
      </section>
    </main>
  );
}
