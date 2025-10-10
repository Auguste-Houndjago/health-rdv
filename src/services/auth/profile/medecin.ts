// src/services/auth/profile/medecin.ts
"use server"
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/services/users/utils";
import { createClient } from "@/utils/supabase/server";

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
        id: userId,
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

  const utilisateur = await prisma.utilisateur.findUnique({ where: { id: userId } })

  // Mettre à jour les métadonnées Supabase avec les données du médecin
  await userInfoMedecin({
    specialiteId,
    numLicence,
    anneeExperience,
    titre
  })

  return utilisateur
}



export async function userInfoMedecin(params: {
  specialiteId: string
  numLicence: string
  anneeExperience?: number
  titre: string
}){
  try {
    const supabase = await createClient();
    const { specialiteId, numLicence, anneeExperience, titre } = params

    // Récupérer l'utilisateur authentifié
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Utilisateur non authentifié");
    }

    // Récupérer les métadonnées existantes
    const currentMetadata = user.user_metadata || {}
    
    // Construire l'objet medecin avec la structure attendue par fetchUserFromSupabase
    const medecinData = {
      specialite: specialiteId, // On utilise l'ID de la spécialité
      numLicence,
      titre,
      isDisponible: currentMetadata.medecin?.isDisponible || false,
      statut: currentMetadata.medecin?.statut || "EN_ATTENTE",
      hopitaux: currentMetadata.medecin?.hopitaux || []
    }

    // Mettre à jour les métadonnées Supabase avec la structure UserInfo
    const { error: userError } = await supabase.auth.updateUser({
      data: {
        medecin: medecinData,
        role: "MEDECIN", // S'assurer que le rôle est bien défini
      },
    });

    if (userError) {
      console.error("Erreur lors de la mise à jour des métadonnées Supabase:", userError);
      throw new Error(`Erreur Supabase: ${userError.message}`);
    }

    return {
      success: true,
      medecin: medecinData
    };
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du profil médecin:", error);
    return {
      success: false,
      error: error.message || "Erreur lors de la mise à jour du profil médecin",
    };
  }

}
