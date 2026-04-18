import { getSessionUser } from "@/lib/auth/session";
import { createLead, listLeads } from "@/lib/leads/repository";
import { sendLeadAlertEmail } from "@/lib/notifications/lead-alert";
import { leadCreateSchema } from "@/lib/leads/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Ugyldig skjema."
      },
      { status: 400 }
    );
  }

  const lead = await createLead(parsed.data);

  // Lead-opprettelse skal aldri feile pga varslingskanalen.
  try {
    await sendLeadAlertEmail(lead);
  } catch (error) {
    console.error("Kunne ikke sende lead-varsel:", error);
  }

  return NextResponse.json({
    ok: true,
    leadId: lead.id
  });
}

export async function GET() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Ikke autorisert." }, { status: 401 });
  }

  const leads = await listLeads();
  return NextResponse.json({ ok: true, leads });
}
