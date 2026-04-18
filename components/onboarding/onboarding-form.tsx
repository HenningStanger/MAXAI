"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function OnboardingForm() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [monthlyBudgetNok, setMonthlyBudgetNok] = useState("25000");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/auth/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        website,
        primaryGoal,
        monthlyBudgetNok: Number(monthlyBudgetNok)
      })
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Kunne ikke lagre onboarding.");
      setSubmitting(false);
      return;
    }

    router.push(data.redirectTo ?? "/admin");
    router.refresh();
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Firmanavn
        <input
          type="text"
          required
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Nettside (valgfritt)
        <input
          type="url"
          placeholder="https://dittdomene.no"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Hva er hovedmålet ditt nå?
        <textarea
          required
          rows={3}
          value={primaryGoal}
          onChange={(event) => setPrimaryGoal(event.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
          placeholder="F.eks. flere kvalifiserte leads fra annonser og organisk trafikk"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Månedlig markedsbudsjett (NOK)
        <input
          type="number"
          min={0}
          step={1000}
          required
          value={monthlyBudgetNok}
          onChange={(event) => setMonthlyBudgetNok(event.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
        />
      </label>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {submitting ? "Lagrer onboarding..." : "Fullfør onboarding"}
      </button>
    </form>
  );
}

