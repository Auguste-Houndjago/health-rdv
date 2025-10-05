// src/services/auth/profile/medecin.ts
"use server"
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/services/users/utils";

export async function upsertProfilMedecin(params: {
  specialiteId: string
  numLicence: string
  anneeExperience?: number
  titre: string
}) {
  const { specialiteId, numLicence, anneeExperience, titre } = params
  const user = await getAuthUser()
  if (!user) {
    throw new Error("=== User not found ===")
  }

  const userId = user.id

  const existingMedecin = await prisma.medecin.findUnique({ where: { userId } })
  if (!existingMedecin) {
    await prisma.medecin.create({
      data: {
        userId,
        specialiteId,
        numLicence,
        anneeExperience: anneeExperience ?? null,
        titre,
      },
    })
  } else {
    await prisma.medecin.update({
      where: { userId },
      data: {
        specialiteId,
        numLicence,
        anneeExperience: anneeExperience ?? null,
        titre,
      },
    })
  }

  return prisma.utilisateur.findUnique({ where: { id: userId } })
}