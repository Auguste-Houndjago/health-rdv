"use server"

import { getUserInfo } from '@/services/users'

export async function obtenirSpecialiteMedecin() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Récupérer les informations de spécialité du médecin
    const specialiteInfo = {
      id: user.medecin.specialiteId || user.medecin.specialite,
      nom: user.medecin.specialite || "Non spécifiée",
      medecinId: user.id,
      hopital: user.medecin.hopital || "Non spécifié"
    }

    return {
      success: true,
      data: specialiteInfo
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération de la spécialité:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération de la spécialité"
    }
  }
}

export async function obtenirPlanningMedecin(medecinId: string) {
  try {
    // Ici vous pouvez ajouter la logique pour récupérer le planning depuis la base de données
    // const planning = await prisma.planningDisponibilite.findFirst({
    //   where: { medecinId },
    //   include: {
    //     creneaux: true
    //   },
    //   orderBy: { createdAt: 'desc' }
    // })

    return {
      success: true,
      data: null // Pour l'instant, retourner null
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération du planning:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération du planning"
    }
  }
}
