// src/utils/prisma.ts
import { PrismaClient } from "@prisma/client";

// Fonction pour créer une instance Prisma (singleton)
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Déclaration globale pour éviter plusieurs instances en dev
declare global {

  var prisma: PrismaClient | undefined;
}

// Utilisation de l'instance globale si elle existe
export const prisma: PrismaClient = globalThis.prisma ?? prismaClientSingleton();

// Affectation globale en dev pour hot reload
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
