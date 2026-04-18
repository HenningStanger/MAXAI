import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createAdminSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Ugyldig brukernavn eller passord." },
      { status: 400 }
    );
  }

  const isValid = await verifyAdminCredentials(parsed.data.username, parsed.data.password);
  if (!isValid) {
    return NextResponse.json(
      { ok: false, error: "Ugyldig brukernavn eller passord." },
      { status: 401 }
    );
  }

  await createAdminSession(parsed.data.username);
  return NextResponse.json({ ok: true });
}
