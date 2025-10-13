"use server"

import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"

/**
 * Récupérer les rendez-vous futurs du patient avec un médecin spécifique
 */
export async function getRendezVousPatientMedecin(medecinId: string) {
  try {
    const user = await getUserInfo()
    
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié",
        data: []
      }
    }

    const patient = await prisma.patient.findFirst({
      where: { userId: user.id }
    })

    if (!patient) {
      return {
        success: false,
        error: "Profil patient non trouvé",
        data: []
      }
    }

    const now = new Date()
    
    const rendezVous = await prisma.rendezVous.findMany({
      where: {
        patientId: patient.id,
        medecinId: medecinId,
        date: {
          gte: now
        },
        statut: {
          in: ['EN_ATTENTE', 'CONFIRME']
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return {
      success: true,
      data: rendezVous
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des rendez-vous",
      data: []
    }
  }
}

