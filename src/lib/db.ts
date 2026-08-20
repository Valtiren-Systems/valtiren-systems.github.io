import { PrismaClient } from "@prisma/client";

// Next.js dev-mode HMR re-evaluates modules; caching on globalThis prevents
// exhausting Postgres connections with a new client per reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
