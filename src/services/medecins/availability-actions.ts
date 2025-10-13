"use server"

import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"
import { revalidatePath } from "next/cache"

/**
 * Toggle la disponibilité d'un médecin
 * Seul le médecin propriétaire peut modifier sa disponibilité
 */
export async function toggleMedecinDisponibilite(isDisponible: boolean) {
  try {
    // Récupérer l'utilisateur connecté
    const user = await getUserInfo({ cache: false })

    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié"
      }
    }

    if (user.role !== "MEDECIN") {
      return {
        success: false,
        error: "Accès non autorisé. Vous devez être médecin."
      }
    }

    // Récupérer le profil médecin
    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    // Mettre à jour la disponibilité
    const updatedMedecin = await prisma.medecin.update({
      where: { id: medecin.id },
      data: { isDisponible },
      include: {
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true
          }
        },
        specialite: {
          select: {
            nom: true
          }
        }
      }
    })

    // Revalider les pages concernées
    revalidatePath("/medecin")
    revalidatePath("/medecin/dashboard")
    
    return {
      success: true,
      data: updatedMedecin,
      message: isDisponible 
        ? "Vous êtes maintenant disponible pour les patients" 
        : "Vous êtes maintenant indisponible"
    }

  } catch (error) {
    console.error("Erreur lors de la mise à jour de la disponibilité:", error)
    return {
      success: false,
      error: "Erreur lors de la mise à jour de la disponibilité"
    }
  }
}

/**
 * Récupérer le statut de disponibilité actuel du médecin
 */
export async function getMedecinDisponibilite() {
  try {
    const user = await getUserInfo({ cache: false })

    if (!user || user.role !== "MEDECIN") {
      return {
        success: false,
        error: "Accès non autorisé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id },
      select: {
        isDisponible: true
      }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    return {
      success: true,
      data: medecin.isDisponible
    }

  } catch (error) {
    console.error("Erreur lors de la récupération de la disponibilité:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération de la disponibilité"
    }
  }
}

