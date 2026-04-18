"use client";

import { useState } from "react";

export function TestLeadAlertButton() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function sendTestAlert() {
    setState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/test-lead-alert", {
        method: "POST"
      });
      const data = await response.json();

      if (!response.ok) {
        setState("error");
        setMessage(data.error ?? "Kunne ikke sende testvarsel.");
        return;
      }

      setState("success");
      setMessage(data.message ?? "Testvarsel sendt.");
    } catch {
      setState("error");
      setMessage("Nettverksfeil ved sending av testvarsel.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <button
        type="button"
        onClick={sendTestAlert}
        disabled={state === "loading"}
        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {state === "loading" ? "Sender testvarsel..." : "Send testvarsel"}
      </button>
      {message ? (
        <p className={state === "error" ? "text-sm text-red-700" : "text-sm text-emerald-700"}>{message}</p>
      ) : null}
    </div>
  );
}
