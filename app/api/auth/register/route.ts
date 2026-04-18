import { registerUser } from "@/lib/auth/user-credentials";
import { createUserSession } from "@/lib/auth/user-session";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Navn må ha minst 2 tegn."),
  email: z.email("Ugyldig e-postadresse."),
  password: z.string().min(8, "Passord må ha minst 8 tegn.")
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Ugyldig registrering." },
      { status: 400 }
    );
  }

  const result = await registerUser(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }

  await createUserSession(result.user.id, result.user.email);
  return NextResponse.json({ ok: true, redirectTo: "/onboarding" });
}

