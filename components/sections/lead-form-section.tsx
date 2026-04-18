"use client";

import { FormEvent, useState } from "react";

type Props = {
  title: string;
  description: string;
  sourcePage: string;
};

export function LeadFormSection({ title, description, sourcePage }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      message: String(form.get("message") ?? ""),
      sourcePage
    };

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Kunne ikke sende forespørsel.");
      setSubmitting(false);
      return;
    }

    event.currentTarget.reset();
    setMessage("Takk! Vi kontakter deg innen 1 arbeidsdag.");
    setSubmitting(false);
  }

  return (
    <section id="kontakt" className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-8">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="mt-2 text-slate-600">{description}</p>
      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Navn
          <input
            type="text"
            name="name"
            required
            className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
            placeholder="Ola Nordmann"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Firmanavn
          <input
            type="text"
            name="company"
            required
            className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
            placeholder="Eksempel Bygg AS"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          E-post
          <input
            type="email"
            name="email"
            required
            className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
            placeholder="post@firma.no"
          />
        </label>
        <label className="md:col-span-2 flex flex-col gap-2 text-sm font-medium text-slate-700">
          Hva vil du forbedre i regnskapet? (valgfritt)
          <textarea
            name="message"
            rows={4}
            className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
            placeholder="Eks: prosjektregnskap, MVA-rutiner, rapportering eller oppfølging av frister."
          />
        </label>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {submitting ? "Sender..." : "Få forslag til neste steg"}
          </button>
          <p className="mt-3 text-sm text-slate-500">
            Ingen bindingstid. Ingen spam. Kun en konkret avklaring av hva som passer for din
            bedrift.
          </p>
          {error ? <p className="mt-2 text-sm text-red-700">{error}</p> : null}
          {message ? <p className="mt-2 text-sm text-green-700">{message}</p> : null}
        </div>
      </form>
    </section>
  );
}
