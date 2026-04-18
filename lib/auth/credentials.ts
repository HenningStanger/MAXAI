import "dotenv/config";
import { compare } from "bcryptjs";

export async function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUser || !passwordHash) {
    throw new Error("ADMIN_USERNAME eller ADMIN_PASSWORD_HASH mangler i miljøvariabler.");
  }

  if (username !== expectedUser) {
    return false;
  }

  return compare(password, passwordHash);
}
