import { getSessionUser } from "@/lib/auth/session";
import { sendLeadAlertEmail } from "@/lib/notifications/lead-alert";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Ikke autorisert." }, { status: 401 });
  }

  const now = new Date();
  const result = await sendLeadAlertEmail({
    id: `test-${now.getTime()}`,
    name: "Test Lead",
    company: "MAXAI Testfirma",
    email: "testlead@example.com",
    sourcePage: "/admin/test-lead-alert",
    message: "Dette er en testmail for verifisering av lead-varsling.",
    createdAt: now
  });

  if (!result.sent) {
    return NextResponse.json(
      {
        ok: false,
        error: "Lead-varsel er ikke konfigurert. Sett RESEND_API_KEY, LEAD_ALERT_FROM og LEAD_ALERT_TO."
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, message: "Testvarsel sendt." });
}
