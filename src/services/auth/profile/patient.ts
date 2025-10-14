//src/services/auth/profile/patient.ts
"use server"
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/services/users/utils";
import { createClient } from "@/utils/supabase/server";
import { GroupeSanguin, Sexe } from "@prisma/client";

/**
 * Étape 1 — Utilisateur: nom, prenom, telephone
 */
export async function upsertIdentiteUtilisateur(params: {
  nom: string
  prenom?: string
  telephone?: string
}) {
  const { nom, prenom, telephone } = params

  const user = await getAuthUser()
  if (!user) {
    throw new Error("=== User not found ===")
  }
  const supabase = await createClient();

  const userId = user?.id!
  const email = user?.email!

  

  const { error: userError } = await supabase.auth.updateUser({
    data: {
      nom,
      prenom
    },
  });

  
  if (userError) {
    console.error("Erreur lors de la mise à jour des métadonnées Supabase:", userError);
  }

  // Upsert Utilisateur (create if missing, else update)
  return prisma.utilisateur.upsert({
    where: { id: userId },
    update: {
      nom,
      prenom: prenom ?? null,
      telephone: telephone ?? null,
    },
    create: {
      id: userId,
      email,
      nom,
      prenom,
      telephone: telephone ?? null,
    },
  })

  
}

/**
 * Étape 2 — Utilisateur: avatarUrl, dateNaissance
 */
export async function upsertDateAvatar(params: {
  dateNaissance: string // ISO yyyy-mm-dd
  avatarUrl?: string
}) {
  const { dateNaissance, avatarUrl } = params
  const date = new Date(dateNaissance)

  const user = await getAuthUser()
  if (!user) {
    throw new Error("=== User not found ===")
  }

  const userId = user?.id

  // Mettre à jour Utilisateur (avatarUrl, dateNaissance)
  return prisma.utilisateur.update({
    where: { id: userId },
    data: {
      avatarUrl,
      dateNaissance: date,
    },
  })
}

/**
 * Étape 3 — Patient: sexe, groupeSanguin, adresse
 */
export async function upsertProfilUtilisateur(params: {
  sexe: Sexe
  groupeSanguin: GroupeSanguin
  adresse?: string
}) {
  const { sexe, groupeSanguin, adresse } = params
  const user = await getAuthUser()
  if (!user) {
    throw new Error("=== User not found ===")
  }

  const userId = user?.id

  const existingPatient = await prisma.patient.findUnique({ where: { userId } })
  if (!existingPatient) {
    await prisma.patient.create({
      data: {
        id: userId,
        userId,
        sexe,
        groupeSanguin,
        adresse,
      },
    })
  } else {
    await prisma.patient.update({
      where: { userId },
      data: {
        sexe,
        groupeSanguin,
        adresse,
      },
    })
  }

  // Retourner l'utilisateur mis à jour pour cohérence (optionnel)
  return prisma.utilisateur.findUnique({ where: { id: userId } })
}
