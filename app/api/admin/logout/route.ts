import { destroyAdminSession, getSessionUser } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ ok: true });
  }

  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
