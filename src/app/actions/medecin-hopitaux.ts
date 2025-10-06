"use server"

import { getUserInfo } from '@/services/users'
import { revalidatePath } from 'next/cache'

export interface HopitalAffiliation {
  id: string
  nom: string
  adresse: string
  contact: string
  description?: string
  image?: string
  url?: string
  localisation?: string
  specialites: string[]
  statutDemande: 'APPROUVE' | 'EN_ATTENTE' | 'REJETE' | 'NON_DEMANDE'
  dateAffiliation?: string
  dateDemande?: string
  motivation?: string
  specialitesInteret?: string
  disponibilite?: string
}

export interface DemandeAffiliation {
  id: string
  hopitalId: string
  medecinId: string
  motivation: string
  specialitesInteret: string
  disponibilite: string
  statut: 'EN_ATTENTE' | 'APPROUVE' | 'REJETE'
  dateDemande: string
  dateReponse?: string
  reponse?: string
}

export async function obtenirHopitauxMedecin() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les hôpitaux du médecin depuis la base de données
    // const hopitaux = await prisma.medecinHopital.findMany({
    //   where: { medecinId: user.medecin.id },
    //   include: {
    //     hopital: {
    //       include: {
    //         specialites: true
    //       }
    //     }
    //   }
    // })

    const hopitaux: HopitalAffiliation[] = []

    return {
      success: true,
      data: hopitaux
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des hôpitaux du médecin:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des hôpitaux du médecin"
    }
  }
}

export async function obtenirHopitauxDisponibles() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les hôpitaux disponibles depuis la base de données
    // const hopitauxDisponibles = await prisma.hopital.findMany({
    //   where: {
    //     medecin: {
    //       none: {
    //         medecinId: user.medecin.id
    //       }
    //     }
    //   },
    //   include: {
    //     specialites: true
    //   }
    // })

    const hopitauxDisponibles: HopitalAffiliation[] = []

    return {
      success: true,
      data: hopitauxDisponibles
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des hôpitaux disponibles:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des hôpitaux disponibles"
    }
  }
}

export async function creerDemandeAffiliation(formData: FormData) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    const data = {
      hopitalId: formData.get('hopitalId') as string,
      medecinId: user.medecin.id,
      motivation: formData.get('motivation') as string,
      specialitesInteret: formData.get('specialitesInteret') as string,
      disponibilite: formData.get('disponibilite') as string
    }

    // Validation des données
    if (!data.hopitalId || !data.motivation || !data.specialitesInteret || !data.disponibilite) {
      return {
        success: false,
        error: "Tous les champs obligatoires doivent être remplis"
      }
    }

    // Ici vous pouvez ajouter la logique pour créer la demande d'affiliation en base de données
    // const demande = await prisma.demandeAffiliation.create({
    //   data: {
    //     hopitalId: data.hopitalId,
    //     medecinId: data.medecinId,
    //     motivation: data.motivation,
    //     specialitesInteret: data.specialitesInteret,
    //     disponibilite: data.disponibilite,
    //     statut: 'EN_ATTENTE',
    //     dateDemande: new Date()
    //   }
    // })

    console.log("Demande d'affiliation créée:", data)
    
    revalidatePath('/medecin/hopitaux')
    
    return {
      success: true,
      message: "Demande d'affiliation envoyée avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la création de la demande d'affiliation:", error)
    return {
      success: false,
      error: "Erreur lors de la création de la demande d'affiliation"
    }
  }
}

export async function obtenirDemandesAffiliation() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les demandes d'affiliation depuis la base de données
    // const demandes = await prisma.demandeAffiliation.findMany({
    //   where: { medecinId: user.medecin.id },
    //   include: {
    //     hopital: true
    //   },
    //   orderBy: { dateDemande: 'desc' }
    // })

    const demandes: DemandeAffiliation[] = []

    return {
      success: true,
      data: demandes
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes d'affiliation:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des demandes d'affiliation"
    }
  }
}

export async function annulerDemandeAffiliation(demandeId: string) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour annuler la demande d'affiliation en base de données
    // await prisma.demandeAffiliation.update({
    //   where: { 
    //     id: demandeId,
    //     medecinId: user.medecin.id,
    //     statut: 'EN_ATTENTE'
    //   },
    //   data: {
    //     statut: 'ANNULE'
    //   }
    // })

    console.log("Demande d'affiliation annulée:", demandeId)
    
    revalidatePath('/medecin/hopitaux')
    
    return {
      success: true,
      message: "Demande d'affiliation annulée avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de l'annulation de la demande d'affiliation:", error)
    return {
      success: false,
      error: "Erreur lors de l'annulation de la demande d'affiliation"
    }
  }
}

export async function obtenirStatistiquesHopitaux() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour calculer les statistiques des hôpitaux
    // const stats = await prisma.medecinHopital.aggregate({
    //   where: { medecinId: user.medecin.id },
    //   _count: {
    //     id: true
    //   }
    // })

    const stats = {
      hopitauxAffilies: 0,
      demandesEnAttente: 0,
      demandesApprouvees: 0,
      demandesRejetees: 0
    }

    return {
      success: true,
      data: stats
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des hôpitaux:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques des hôpitaux"
    }
  }
}
