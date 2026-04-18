import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma 7 + pg på Vercel: unngå at Turbopack/server-bundle utelater nødvendige filer.
  serverExternalPackages: ["@prisma/client", "prisma", "pg", "@prisma/adapter-pg"],
  // Generert klient ligger i ./generated/prisma (ikke node_modules/.prisma).
  outputFileTracingIncludes: {
    "/api/**/*": ["./generated/prisma/**/*"],
    "/*": ["./generated/prisma/**/*"]
  }
};

export default nextConfig;
