import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerUser(input: { name: string; email: string; password: string }) {
  const existing = await prisma.user.findUnique({
    where: { email: input.email }
  });
  if (existing) {
    return { ok: false as const, error: "E-postadressen er allerede registrert." };
  }

  const passwordHash = await hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash
    }
  });

  return { ok: true as const, user };
}

export async function verifyUserCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null;
  }

  const isValid = await compare(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return user;
}

