"use server"

import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"

export interface StatistiquesRendezVous {
  totalRDV: number
  rdvAujourdhui: number
  rdvCetteSemaine: number
  rdvCeMois: number
  rdvConfirmes: number
  rdvEnAttente: number
  rdvAnnules: number
  rdvTermines: number
  patientsUniques: number
  consultationsMois: number
  consultationsSemaine: number
  moyenneDuree: number
  tauxConfirmation: number
  tauxAnnulation: number
}

export interface StatistiquesParPeriode {
  periode: string
  rdv: number
  patients: number
  revenus?: number
}

export interface StatistiquesParSpecialite {
  specialite: string
  nombreRDV: number
  pourcentage: number
}

export interface StatistiquesParHopital {
  hopital: string
  nombreRDV: number
  pourcentage: number
}

export interface StatistiquesTendances {
  evolutionRDV: number
  evolutionPatients: number
  evolutionRevenus: number
  periode: string
}

/**
 * Obtenir les statistiques générales des rendez-vous du médecin
 */
export async function getStatistiquesRendezVous() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const maintenant = new Date()
    const debutJour = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate())
    const debutSemaine = new Date(maintenant.setDate(maintenant.getDate() - maintenant.getDay()))
    const debutMois = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1)

    // Récupérer tous les rendez-vous du médecin
    const rendezVous = await prisma.rendezVous.findMany({
      where: { medecinId: medecin.id },
      include: {
        patient: true
      }
    })

    // Calculer les statistiques
    const totalRDV = rendezVous.length
    const rdvAujourdhui = rendezVous.filter(rdv => 
      new Date(rdv.date) >= debutJour && new Date(rdv.date) < new Date(debutJour.getTime() + 24 * 60 * 60 * 1000)
    ).length

    const rdvCetteSemaine = rendezVous.filter(rdv => 
      new Date(rdv.date) >= debutSemaine
    ).length

    const rdvCeMois = rendezVous.filter(rdv => 
      new Date(rdv.date) >= debutMois
    ).length

    const rdvConfirmes = rendezVous.filter(rdv => rdv.statut === 'CONFIRME').length
    const rdvEnAttente = rendezVous.filter(rdv => rdv.statut === 'EN_ATTENTE').length
    const rdvAnnules = rendezVous.filter(rdv => rdv.statut === 'ANNULE').length
    const rdvTermines = rendezVous.filter(rdv => rdv.statut === 'TERMINE').length

    const patientsUniques = new Set(rendezVous.map(rdv => rdv.patientId)).size

    const consultationsMois = rdvCeMois
    const consultationsSemaine = rdvCetteSemaine

    const moyenneDuree = rendezVous.length > 0 
      ? rendezVous.reduce((acc, rdv) => acc + rdv.duree, 0) / rendezVous.length 
      : 0

    const tauxConfirmation = totalRDV > 0 ? (rdvConfirmes / totalRDV) * 100 : 0
    const tauxAnnulation = totalRDV > 0 ? (rdvAnnules / totalRDV) * 100 : 0

    const statistiques: StatistiquesRendezVous = {
      totalRDV,
      rdvAujourdhui,
      rdvCetteSemaine,
      rdvCeMois,
      rdvConfirmes,
      rdvEnAttente,
      rdvAnnules,
      rdvTermines,
      patientsUniques,
      consultationsMois,
      consultationsSemaine,
      moyenneDuree: Math.round(moyenneDuree),
      tauxConfirmation: Math.round(tauxConfirmation * 100) / 100,
      tauxAnnulation: Math.round(tauxAnnulation * 100) / 100
    }

    return {
      success: true,
      data: statistiques
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques"
    }
  }
}

/**
 * Obtenir les statistiques par période (derniers 12 mois)
 */
export async function getStatistiquesParPeriode() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const maintenant = new Date()
    const statistiques: StatistiquesParPeriode[] = []

    // Générer les 12 derniers mois
    for (let i = 11; i >= 0; i--) {
      const date = new Date(maintenant.getFullYear(), maintenant.getMonth() - i, 1)
      const moisSuivant = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      
      const rdv = await prisma.rendezVous.count({
        where: {
          medecinId: medecin.id,
          date: {
            gte: date,
            lt: moisSuivant
          }
        }
      })

      const patients = await prisma.rendezVous.findMany({
        where: {
          medecinId: medecin.id,
          date: {
            gte: date,
            lt: moisSuivant
          }
        },
        select: {
          patientId: true
        }
      })

      const patientsUniques = new Set(patients.map(p => p.patientId)).size

      statistiques.push({
        periode: date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
        rdv,
        patients: patientsUniques
      })
    }

    return {
      success: true,
      data: statistiques
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques par période:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques par période"
    }
  }
}

/**
 * Obtenir les statistiques par spécialité
 */
export async function getStatistiquesParSpecialite() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id },
      include: {
        specialite: true,
        rendezVous: true
      }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const totalRDV = medecin.rendezVous.length
    const statistiques: StatistiquesParSpecialite[] = [{
      specialite: medecin.specialite.nom,
      nombreRDV: totalRDV,
      pourcentage: 100
    }]

    return {
      success: true,
      data: statistiques
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques par spécialité:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques par spécialité"
    }
  }
}

/**
 * Obtenir les statistiques par hôpital
 */
export async function getStatistiquesParHopital() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id },
      include: {
        hopitaux: {
          include: {
            hopital: true
          }
        },
        rendezVous: {
          include: {
            hopital: true
          }
        }
      }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const totalRDV = medecin.rendezVous.length
    const statistiques: StatistiquesParHopital[] = []

    // Grouper par hôpital
    const rdvParHopital = medecin.rendezVous.reduce((acc, rdv) => {
      const hopitalNom = rdv.hopital?.nom || 'Non spécifié'
      acc[hopitalNom] = (acc[hopitalNom] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    Object.entries(rdvParHopital).forEach(([hopital, nombreRDV]) => {
      statistiques.push({
        hopital,
        nombreRDV,
        pourcentage: totalRDV > 0 ? Math.round((nombreRDV / totalRDV) * 100 * 100) / 100 : 0
      })
    })

    return {
      success: true,
      data: statistiques
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques par hôpital:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques par hôpital"
    }
  }
}

/**
 * Obtenir les tendances d'évolution
 */
export async function getTendances() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const medecin = await prisma.medecin.findUnique({
      where: { userId: user.id }
    })

    if (!medecin) {
      return {
        success: false,
        error: "Profil médecin non trouvé"
      }
    }

    const maintenant = new Date()
    const moisActuel = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1)
    const moisPrecedent = new Date(maintenant.getFullYear(), maintenant.getMonth() - 1, 1)

    // RDV ce mois
    const rdvCeMois = await prisma.rendezVous.count({
      where: {
        medecinId: medecin.id,
        date: {
          gte: moisActuel
        }
      }
    })

    // RDV mois précédent
    const rdvMoisPrecedent = await prisma.rendezVous.count({
      where: {
        medecinId: medecin.id,
        date: {
          gte: moisPrecedent,
          lt: moisActuel
        }
      }
    })

    // Patients ce mois
    const patientsCeMois = await prisma.rendezVous.findMany({
      where: {
        medecinId: medecin.id,
        date: {
          gte: moisActuel
        }
      },
      select: {
        patientId: true
      }
    })

    const patientsUniquesCeMois = new Set(patientsCeMois.map(p => p.patientId)).size

    // Patients mois précédent
    const patientsMoisPrecedent = await prisma.rendezVous.findMany({
      where: {
        medecinId: medecin.id,
        date: {
          gte: moisPrecedent,
          lt: moisActuel
        }
      },
      select: {
        patientId: true
      }
    })

    const patientsUniquesMoisPrecedent = new Set(patientsMoisPrecedent.map(p => p.patientId)).size

    const evolutionRDV = rdvMoisPrecedent > 0 
      ? Math.round(((rdvCeMois - rdvMoisPrecedent) / rdvMoisPrecedent) * 100 * 100) / 100 
      : 0

    const evolutionPatients = patientsUniquesMoisPrecedent > 0 
      ? Math.round(((patientsUniquesCeMois - patientsUniquesMoisPrecedent) / patientsUniquesMoisPrecedent) * 100 * 100) / 100 
      : 0

    const tendances: StatistiquesTendances = {
      evolutionRDV,
      evolutionPatients,
      evolutionRevenus: 0, // Pas de données de revenus pour l'instant
      periode: "mois"
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
