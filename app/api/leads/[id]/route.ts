import { getSessionUser } from "@/lib/auth/session";
import { getLeadById, updateLead } from "@/lib/leads/repository";
import { leadUpdateSchema } from "@/lib/leads/schema";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Ikke autorisert." }, { status: 401 });
  }

  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) {
    return NextResponse.json({ ok: false, error: "Lead ikke funnet." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead });
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Ikke autorisert." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = leadUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Ugyldig oppdatering."
      },
      { status: 400 }
    );
  }

  const { id } = await params;
  const lead = await updateLead(id, parsed.data);
  if (!lead) {
    return NextResponse.json({ ok: false, error: "Lead ikke funnet." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lead });
}
