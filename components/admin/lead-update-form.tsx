"use client";

import { LeadStatus } from "@/generated/prisma/enums";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  leadId: string;
  initialStatus: LeadStatus;
  initialNotes: string;
};

const statuses: Array<{ value: LeadStatus; label: string }> = [
  { value: LeadStatus.ny, label: "Ny" },
  { value: LeadStatus.kontaktet, label: "Kontaktet" },
  { value: LeadStatus.mote_booket, label: "Møte booket" },
  { value: LeadStatus.kunde, label: "Kunde" },
  { value: LeadStatus.tapt, label: "Tapt" }
];

export function LeadUpdateForm({ leadId, initialStatus, initialNotes }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save() {
    setSaving(true);
    setError("");
    setMessage("");

    const response = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes })
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Kunne ikke lagre.");
      setSaving(false);
      return;
    }

    setMessage("Lagret.");
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-4 rounded-xl bg-white p-5 ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-900">Oppfølging</h2>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Status
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value as LeadStatus)}
          className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
        >
          {statuses.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Notater
        <textarea
          rows={8}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Skriv oppfølging, behov, avtaler og neste steg."
          className="rounded-xl border border-slate-300 px-3 py-2 text-base outline-none ring-blue-700 focus:ring-2"
        />
      </label>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="rounded-xl bg-blue-700 px-4 py-2 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {saving ? "Lagrer..." : "Lagre endringer"}
      </button>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
    </div>
  );
}
