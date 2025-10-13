"use server"

import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"

/**
 * Récupère l'ID du patient connecté
 */
export async function getPatientId() {
  try {
    const user = await getUserInfo()
    
    if (!user?.id || user.role !== "PATIENT") {
      return {
        success: false,
        error: "Utilisateur non authentifié ou n'est pas un patient"
      }
    }

    // Récupérer le patient depuis la base de données
    const patient = await prisma.patient.findUnique({
      where: { userId: user.id },
      select: { id: true }
    })

    if (!patient) {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    return {
      success: true,
      patientId: patient.id
    }

  } catch (error) {
    console.error("Erreur lors de la récupération du patient ID:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération du profil patient"
    }
  }
}


