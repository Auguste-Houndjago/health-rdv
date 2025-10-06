"use server"

import { getUserInfo } from '@/services/users'
import { obtenirSpecialiteMedecin } from '@/app/actions/medecin'

export interface StatistiquesGenerales {
  totalPatients: number
  nouveauxPatients: number
  consultationsMois: number
  revenusMois: number
  evolutionPatients: number
  evolutionConsultations: number
  evolutionRevenus: number
}

export interface ConsultationParMois {
  mois: string
  consultations: number
  revenus: number
}

export interface ClassificationMaladie {
  maladie: string
  pourcentage: number
  nombre: number
}

export interface Tendances {
  nouveauxPatients: number
  rdvSemaine: number
  patientsActifs: number
  enAttente: number
}

export async function obtenirStatistiquesGenerales() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Récupérer la spécialité du médecin
    const specialiteResult = await obtenirSpecialiteMedecin()
    
    if (!specialiteResult.success) {
      return {
        success: false,
        error: "Impossible de récupérer la spécialité du médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour calculer les statistiques depuis la base de données
    // const stats = await prisma.patient.aggregate({
    //   where: { medecinId: user.id },
    //   _count: { id: true }
    // })

    const stats: StatistiquesGenerales = {
      totalPatients: 0,
      nouveauxPatients: 0,
      consultationsMois: 0,
      revenusMois: 0,
      evolutionPatients: 0,
      evolutionConsultations: 0,
      evolutionRevenus: 0
    }

    return {
      success: true,
      data: stats
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques générales:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques générales"
    }
  }
}

export async function obtenirConsultationsParMois() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les consultations par mois depuis la base de données
    // const consultations = await prisma.rendezVous.groupBy({
    //   by: ['date'],
    //   where: {
    //     medecinId: user.id,
    //     statut: 'TERMINE'
    //   },
    //   _count: {
    //     id: true
    //   }
    // })

    const consultations: ConsultationParMois[] = []

    return {
      success: true,
      data: consultations
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des consultations par mois:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des consultations par mois"
    }
  }
}

export async function obtenirClassificationMaladies() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer la classification des maladies depuis la base de données
    // const maladies = await prisma.diagnostic.groupBy({
    //   by: ['maladie'],
    //   where: {
    //     medecinId: user.id
    //   },
    //   _count: {
    //     id: true
    //   }
    // })

    const maladies: ClassificationMaladie[] = []

    return {
      success: true,
      data: maladies
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération de la classification des maladies:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération de la classification des maladies"
    }
  }
}

export async function obtenirTendances() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour calculer les tendances depuis la base de données
    const tendances: Tendances = {
      nouveauxPatients: 0,
      rdvSemaine: 0,
      patientsActifs: 0,
      enAttente: 0
    }

    return {
      success: true,
      data: tendances
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des tendances:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des tendances"
    }
  }
}

export async function obtenirStatistiquesAvancees() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Récupérer toutes les statistiques en parallèle
    const [statsResult, consultationsResult, maladiesResult, tendancesResult] = await Promise.all([
      obtenirStatistiquesGenerales(),
      obtenirConsultationsParMois(),
      obtenirClassificationMaladies(),
      obtenirTendances()
    ])

    if (!statsResult.success) {
      return {
        success: false,
        error: statsResult.error
      }
    }

    const statistiques = {
      generales: statsResult.data,
      consultationsParMois: consultationsResult.success ? consultationsResult.data : [],
      classificationMaladies: maladiesResult.success ? maladiesResult.data : [],
      tendances: tendancesResult.success ? tendancesResult.data : {
        nouveauxPatients: 0,
        rdvSemaine: 0,
        patientsActifs: 0,
        enAttente: 0
      }
    }

    return {
      success: true,
      data: statistiques
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques avancées:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques avancées"
    }
  }
}
