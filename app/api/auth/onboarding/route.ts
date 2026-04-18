import { getUserSession } from "@/lib/auth/user-session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const onboardingSchema = z.object({
  company: z.string().trim().min(2, "Firmanavn må ha minst 2 tegn."),
  website: z.string().trim().optional().or(z.literal("")),
  primaryGoal: z.string().trim().min(5, "Beskriv hovedmålet ditt kort."),
  monthlyBudgetNok: z.number().int().min(0).max(10_000_000)
});

export async function POST(request: Request) {
  const session = await getUserSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Ikke autorisert." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Ugyldig onboarding-data." },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: session.userId },
    data: {
      company: parsed.data.company,
      website: parsed.data.website || null,
      primaryGoal: parsed.data.primaryGoal,
      monthlyBudgetNok: parsed.data.monthlyBudgetNok,
      onboardingComplete: true
    }
  });

  return NextResponse.json({ ok: true, redirectTo: "/admin" });
}

