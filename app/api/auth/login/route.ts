import { createUserSession } from "@/lib/auth/user-session";
import { verifyUserCredentials } from "@/lib/auth/user-credentials";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Ugyldig e-postadresse."),
  password: z.string().min(8, "Passord må ha minst 8 tegn.")
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Ugyldig innlogging." },
      { status: 400 }
    );
  }

  const user = await verifyUserCredentials(parsed.data.email, parsed.data.password);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Feil e-post eller passord." }, { status: 401 });
  }

  await createUserSession(user.id, user.email);
  return NextResponse.json({
    ok: true,
    redirectTo: user.onboardingComplete ? "/admin" : "/onboarding"
  });
}

