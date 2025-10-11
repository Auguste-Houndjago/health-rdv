"use server"

import { getUserInfo } from '@/services/users'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export interface RendezVous {
  id: string
  patient: {
    id: string
    nom: string
    prenom: string
    telephone: string
    email: string
    adresse?: string
    groupeSanguin?: string
    poids?: number
    taille?: number
    sexe?: string
    userId: string
  }
  date: string
  heure: string
  duree: number
  motif: string
  statut: 'CONFIRME' | 'EN_ATTENTE' | 'ANNULE' | 'TERMINE'
  notes?: string
  medecinId: string
  specialiteId: string
  hopitalId?: string
  utilisateurId?: string
  patientId?: string
  createdAt?: string
  updatedAt?: string
}

export async function obtenirRendezVousMedecin() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }


    const specialiteId = user.medecin.specialite

if(!specialiteId) {
  return {
    success: false,
    error: "Impossible de récupérer la spécialité du médecin"
  }
}

    // Ici vous pouvez ajouter la logique pour récupérer les rendez-vous depuis la base de données
    const rendezVous = await prisma.rendezVous.findMany({
      where: { 
        medecinId: user.id,
        date: { gte: new Date() }
      },
      include: {
        patient: {
          include: {
            utilisateur: true
          }
        }
      },
      orderBy: { date: 'asc' }
    })

    // Transformer les données pour correspondre à l'interface RendezVous
    const transformedRendezVous: RendezVous[] = rendezVous.map(rdv => ({
      id: rdv.id,
      patient: {
        id: rdv.patient.id,
        nom: rdv.patient.utilisateur.nom,
        prenom: rdv.patient.utilisateur.prenom || '',
        telephone: rdv.patient.utilisateur.telephone || '',
        email: rdv.patient.utilisateur.email,
        adresse: rdv.patient.adresse,
        groupeSanguin: rdv.patient.groupeSanguin,
        poids: rdv.patient.poids,
        taille: rdv.patient.taille,
        sexe: rdv.patient.sexe,
        userId: rdv.patient.userId
      },
      date: rdv.date.toISOString().split('T')[0],
      heure: rdv.date.toTimeString().split(' ')[0].substring(0, 5),
      duree: rdv.duree,
      motif: rdv.motif || '',
      statut: rdv.statut,
      medecinId: rdv.medecinId,
      specialiteId: specialiteId,
      hopitalId: rdv.hopitalId,
      utilisateurId: rdv.utilisateurId,
      patientId: rdv.patientId,
      createdAt: rdv.createdAt.toISOString(),
      updatedAt: rdv.updatedAt.toISOString()
    }))

    return {
      success: true,
      data: transformedRendezVous
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des rendez-vous"
    }
  }
}

export async function creerRendezVous(formData: FormData) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    const data = {
      patientId: formData.get('patientId') as string,
      date: formData.get('date') as string,
      heure: formData.get('heure') as string,
      duree: parseInt(formData.get('duree') as string),
      motif: formData.get('motif') as string,
      notes: formData.get('notes') as string,
      medecinId: user.id,
      specialiteId: formData.get('specialiteId') as string
    }

    // Validation des données
    if (!data.patientId || !data.date || !data.heure || !data.duree || !data.motif) {
      return {
        success: false,
        error: "Tous les champs obligatoires doivent être remplis"
      }
    }

    // Vérifier la disponibilité du médecin
    const disponibiliteResult = await verifierDisponibilite(data.medecinId, data.date, data.heure, data.duree)
    
    if (!disponibiliteResult.success) {
      return {
        success: false,
        error: disponibiliteResult.error
      }
    }

    // Ici vous pouvez ajouter la logique pour créer le rendez-vous en base de données
    // const rendezVous = await prisma.rendezVous.create({
    //   data: {
    //     patientId: data.patientId,
    //     medecinId: data.medecinId,
    //     specialiteId: data.specialiteId,
    //     date: new Date(data.date),
    //     heure: data.heure,
    //     duree: data.duree,
    //     motif: data.motif,
    //     notes: data.notes,
    //     statut: 'EN_ATTENTE'
    //   }
    // })

    console.log("Rendez-vous créé:", data)
    
    revalidatePath('/medecin/rendez-vous')
    
    return {
      success: true,
      message: "Rendez-vous créé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la création du rendez-vous"
    }
  }
}

export async function modifierRendezVous(rendezVousId: string, formData: FormData) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    const data = {
      date: formData.get('date') as string,
      heure: formData.get('heure') as string,
      duree: parseInt(formData.get('duree') as string),
      motif: formData.get('motif') as string,
      notes: formData.get('notes') as string,
      statut: formData.get('statut') as string
    }

    // Validation des données
    if (!data.date || !data.heure || !data.duree || !data.motif) {
      return {
        success: false,
        error: "Tous les champs obligatoires doivent être remplis"
      }
    }

    // Vérifier la disponibilité si la date/heure change
    const disponibiliteResult = await verifierDisponibilite(user.id, data.date, data.heure, data.duree, rendezVousId)
    
    if (!disponibiliteResult.success) {
      return {
        success: false,
        error: disponibiliteResult.error
      }
    }

    // Ici vous pouvez ajouter la logique pour mettre à jour le rendez-vous en base de données
    // const rendezVous = await prisma.rendezVous.update({
    //   where: { 
    //     id: rendezVousId,
    //     medecinId: user.id
    //   },
    //   data: {
    //     date: new Date(data.date),
    //     heure: data.heure,
    //     duree: data.duree,
    //     motif: data.motif,
    //     notes: data.notes,
    //     statut: data.statut
    //   }
    // })

    console.log("Rendez-vous modifié:", data)
    
    revalidatePath('/medecin/rendez-vous')
    
    return {
      success: true,
      message: "Rendez-vous modifié avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la modification du rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la modification du rendez-vous"
    }
  }
}

export async function supprimerRendezVous(rendezVousId: string) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour supprimer le rendez-vous en base de données
    // await prisma.rendezVous.delete({
    //   where: { 
    //     id: rendezVousId,
    //     medecinId: user.id
    //   }
    // })

    console.log("Rendez-vous supprimé:", rendezVousId)
    
    revalidatePath('/medecin/rendez-vous')
    
    return {
      success: true,
      message: "Rendez-vous supprimé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la suppression du rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la suppression du rendez-vous"
    }
  }
}

export async function verifierDisponibilite(medecinId: string, date: string, heure: string, duree: number, rendezVousIdExclu?: string) {
  try {
    // Ici vous pouvez ajouter la logique pour vérifier la disponibilité
    // 1. Récupérer les créneaux de disponibilité du médecin pour ce jour
    // 2. Vérifier que l'heure demandée est dans un créneau de disponibilité
    // 3. Vérifier qu'il n'y a pas de conflit avec d'autres rendez-vous
    
    // Exemple de logique de vérification :
    // const creneauxDisponibilite = await prisma.creneauDisponibilite.findMany({
    //   where: {
    //     planningDisponibilite: {
    //       medecinId: medecinId,
    //       dateDebut: { lte: new Date(date) },
    //       dateFin: { gte: new Date(date) }
    //     },
    //     jour: new Date(date).toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase()
    //   }
    // })
    
    // const rendezVousExistants = await prisma.rendezVous.findMany({
    //   where: {
    //     medecinId: medecinId,
    //     date: new Date(date),
    //     statut: { not: 'ANNULE' },
    //     id: rendezVousIdExclu ? { not: rendezVousIdExclu } : undefined
    //   }
    // })

    // Vérifier les conflits d'horaires
    // ...

    return {
      success: true,
      disponible: true
    }
    
  } catch (error) {
    console.error("Erreur lors de la vérification de disponibilité:", error)
    return {
      success: false,
      error: "Erreur lors de la vérification de disponibilité"
    }
  }
}

export async function obtenirStatistiquesRendezVous() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour calculer les statistiques
    // const stats = await prisma.rendezVous.aggregate({
    //   where: { medecinId: user.id },
    //   _count: {
    //     id: true
    //   }
    // })

    const stats = {
      totalRDV: 0,
      rdvAujourdhui: 0,
      rdvConfirmes: 0,
      rdvEnAttente: 0
    }

    return {
      success: true,
      data: stats
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques"
    }
  }
}
