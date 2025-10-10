"use server"

import { getUserInfo } from '@/services/users'
import { obtenirSpecialiteMedecin } from '@/app/actions/medecin'
import { obtenirStatistiquesRendezVous } from '@/app/actions/rendez-vous'

export interface DashboardStats {
  totalPatients: number
  rendezVousAujourdhui: number
  hopitauxAffilies: number
  specialite: string
  nouveauxPatients: number
  consultationsMois: number
  revenusMois: number
  evolutionPatients: number
  evolutionConsultations: number
  evolutionRevenus: number
}

export interface PatientRecent {
  id: string
  nom: string
  prenom: string
  maladie: string
  derniereVisite: string
  statut: 'ACTIF' | 'INACTIF' | 'EN_ATTENTE'
}

export interface RendezVousAujourdhui {
  id: string
  patient: string
  heure: string
  motif: string
  statut: 'CONFIRME' | 'EN_ATTENTE' | 'ANNULE'
}

export async function obtenirDashboardMedecin() {
  try {
    const user = await getUserInfo({cache:false})
    
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

    // Récupérer les statistiques des rendez-vous
    const rdvStatsResult = await obtenirStatistiquesRendezVous()
    
    if (!rdvStatsResult.success) {
      return {
        success: false,
        error: "Impossible de récupérer les statistiques des rendez-vous"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les données depuis la base de données
    // const patients = await prisma.patient.count({
    //   where: { medecinId: user.id }
    // })
    
    // const hopitaux = await prisma.medecinHopital.count({
    //   where: { medecinId: user.id }
    // })

    const stats: DashboardStats = {
      totalPatients: 0, // patients
      rendezVousAujourdhui: rdvStatsResult.data?.rdvAujourdhui || 0,
      hopitauxAffilies: 0, // hopitaux
      specialite: specialiteResult.data?.nom || "Non spécifiée",
      nouveauxPatients: 0,
      consultationsMois: rdvStatsResult.data?.totalRDV || 0,
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
    console.error("Erreur lors de la récupération du dashboard:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération du dashboard"
    }
  }
}

export async function obtenirPatientsRecents() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les patients récents depuis la base de données
    // const patients = await prisma.patient.findMany({
    //   where: { medecinId: user.id },
    //   include: {
    //     derniereConsultation: true
    //   },
    //   orderBy: { derniereConsultation: { date: 'desc' } },
    //   take: 10
    // })

    const patients: PatientRecent[] = []

    return {
      success: true,
      data: patients
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des patients récents:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des patients récents"
    }
  }
}

export async function obtenirRendezVousAujourdhui() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    const aujourdhui = new Date().toISOString().split('T')[0]

    // Ici vous pouvez ajouter la logique pour récupérer les rendez-vous d'aujourd'hui depuis la base de données
    // const rendezVous = await prisma.rendezVous.findMany({
    //   where: { 
    //     medecinId: user.id,
    //     date: aujourdhui,
    //     statut: { not: 'ANNULE' }
    //   },
    //   include: {
    //     patient: true
    //   },
    //   orderBy: { heure: 'asc' }
    // })

    const rendezVous: RendezVousAujourdhui[] = []

    return {
      success: true,
      data: rendezVous
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous d'aujourd'hui:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des rendez-vous d'aujourd'hui"
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

    // Ici vous pouvez ajouter la logique pour calculer les statistiques avancées
    // const consultationsParMois = await prisma.rendezVous.groupBy({
    //   by: ['date'],
    //   where: {
    //     medecinId: user.id,
    //     statut: 'TERMINE'
    //   },
    //   _count: {
    //     id: true
    //   }
    // })

    const statistiques = {
      consultationsParMois: [],
      classificationMaladies: [],
      tendances: {
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
