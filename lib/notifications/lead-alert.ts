type LeadAlertPayload = {
  id: string;
  name: string;
  company: string;
  email: string;
  sourcePage: string;
  message: string | null;
  createdAt: Date;
};

function formatLeadText(lead: LeadAlertPayload) {
  return [
    "Ny lead mottatt i MAXAI:",
    `Lead-ID: ${lead.id}`,
    `Navn: ${lead.name}`,
    `Firma: ${lead.company}`,
    `E-post: ${lead.email}`,
    `Kilde: ${lead.sourcePage}`,
    `Tidspunkt: ${lead.createdAt.toISOString()}`,
    `Melding: ${lead.message || "(ingen melding)"}`
  ].join("\n");
}

export async function sendLeadAlertEmail(lead: LeadAlertPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_ALERT_FROM;
  const to = process.env.LEAD_ALERT_TO;

  if (!apiKey || !from || !to) {
    return { sent: false, reason: "missing-config" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Ny lead: ${lead.company} (${lead.name})`,
      text: formatLeadText(lead)
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lead-varsel feilet: ${response.status} ${errorText}`);
  }

  return { sent: true as const };
}
