"use server"

import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"
import { getCreneauxDisponibles } from "@/services/medecins/disponibilites"
import { 
  sendRendezVousCreatedNotification,
  sendRendezVousCancelledNotification 
} from "@/services/notifications/email"
import { RendezVousNotificationData } from "@/services/notifications/types"
import { creerNotification } from "@/services/notifications/notifications-actions"
import { TypeNotification } from "@prisma/client"

export interface MedecinDisponible {
  id: string
  nom: string
  prenom: string
  specialite: string
  hopital: {
    id: string
    nom: string
    adresse: string
  }
  tarif: number
  note: number
  experience: number
}

export interface CreneauDisponible {
  heureDebut: string
  heureFin: string
  duree: number
}

export interface RendezVousPatient {
  id: string
  medecin: {
    id: string
    nom: string
    prenom: string
    specialite: string
    hopital: {
      id: string
      nom: string
      adresse: string
    }
    experience: number
  }
  date: string
  heure: string
  duree: number
  motif: string
  statut: 'CONFIRME' | 'EN_ATTENTE' | 'ANNULE' | 'TERMINE'
  hopitalId?: string
}

export interface SearchMedecinsParams {
  search?: string
  specialite?: string
  hopital?: string
}

export interface CreneauxParams {
  medecinId: string
  date: string
  hopitalId?: string
}

export interface CreerRendezVousParams {
  medecinId: string
  date: string
  heure: string
  duree: number
  motif: string
  hopitalId?: string
}

/**
 * Rechercher des médecins disponibles
 */
export async function getMedecinsDisponibles(params: SearchMedecinsParams) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "PATIENT") {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    const whereClause: any = {
      utilisateur: {
        status: 'ACTIF'
      },
      specialite: {
        isNot: null
      }
    }

    // Filtres de recherche
    if (params.search) {
      whereClause.OR = [
        { utilisateur: { nom: { contains: params.search, mode: 'insensitive' } } },
        { utilisateur: { prenom: { contains: params.search, mode: 'insensitive' } } }
      ]
    }

    if (params.specialite) {
      whereClause.specialite = params.specialite
    }

    if (params.hopital) {
      whereClause.hopitaux = {
        some: {
          hopital: {
            nom: { contains: params.hopital, mode: 'insensitive' }
          }
        }
      }
    }

    const medecins = await prisma.medecin.findMany({
      where: whereClause,
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true
          }
        },
        specialite: {
          select: {
            nom: true
          }
        },
        hopitaux: {
          include: {
            hopital: {
              select: {
                id: true,
                nom: true,
                adresse: true
              }
            }
          },
          take: 1 // Prendre le premier hôpital
        }
      },
      take: 20
    })

    const medecinsFormatted: MedecinDisponible[] = medecins.map(medecin => ({
      id: medecin.id,
      nom: medecin.utilisateur.nom,
      prenom: medecin.utilisateur.prenom || '',
      specialite: medecin.specialite?.nom || 'Non spécifiée',
      hopital: medecin.hopitaux[0]?.hopital || {
        id: '',
        nom: 'Non spécifié',
        adresse: ''
      },
      tarif: 50, // Tarif par défaut (pas de champ tarif dans le modèle)
      note: 4.5, // Note par défaut
      experience: 5 // Expérience par défaut
    }))

    return {
      success: true,
      data: medecinsFormatted
    }

  } catch (error) {
    console.error("Erreur lors de la recherche des médecins:", error)
    return {
      success: false,
      error: "Erreur lors de la recherche des médecins"
    }
  }
}

/**
 * Obtenir les créneaux disponibles pour un médecin
 */
export async function getCreneauxDisponiblesPatient(params: CreneauxParams) {
  try {
    const result = await getCreneauxDisponibles(
      params.medecinId,
      params.date,
      params.hopitalId
    )

    return result

  } catch (error) {
    console.error("Erreur lors de la récupération des créneaux:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des créneaux"
    }
  }
}

/**
 * Créer un rendez-vous pour un patient
 */
export async function creerRendezVousPatient(params: CreerRendezVousParams) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "PATIENT") {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    // Vérifier que le patient existe
    const patient = await prisma.patient.findFirst({
      where: { userId: user.id }
    })

    if (!patient) {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    // Vérifier la disponibilité du médecin
    const disponibiliteResult = await getCreneauxDisponibles(
      params.medecinId,
      params.date,
      params.hopitalId
    )

    if (!disponibiliteResult.success) {
      return {
        success: false,
        error: disponibiliteResult.error
      }
    }

    // Vérifier que le créneau demandé est disponible
    const creneauDisponible = disponibiliteResult.data?.find(
      creneau => creneau.heureDebut === params.heure
    )

    if (!creneauDisponible) {
      return {
        success: false,
        error: "Ce créneau n'est plus disponible"
      }
    }

    // Créer le rendez-vous
    const rendezVous = await prisma.rendezVous.create({
      data: {
        patientId: patient.id,
        medecinId: params.medecinId,
        date: new Date(`${params.date}T${params.heure}:00`),
        duree: params.duree,
        motif: params.motif,
        statut: 'EN_ATTENTE',
        hopitalId: params.hopitalId || '',
        utilisateurId: user.id
      }
    })

    // Récupérer les informations du médecin et de l'hôpital
    const medecinInfo = await prisma.medecin.findUnique({
      where: { id: params.medecinId },
      include: {
        utilisateur: true,
        specialite: true
      }
    })

    const hopitalInfo = params.hopitalId ? await prisma.hopital.findUnique({
      where: { id: params.hopitalId }
    }) : null

    // Récupérer les informations du patient pour la notification
    const patientInfo = await prisma.patient.findUnique({
      where: { id: patient.id },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            telephone: true
          }
        }
      }
    })

    // Envoyer les notifications email
    if (medecinInfo && patientInfo) {
      const notificationData: RendezVousNotificationData = {
        id: rendezVous.id,
        date: rendezVous.date,
        heure: rendezVous.date.toTimeString().slice(0, 5),
        duree: rendezVous.duree,
        motif: rendezVous.motif || '',
        statut: rendezVous.statut,
        patient: {
          nom: patientInfo.utilisateur.nom,
          prenom: patientInfo.utilisateur.prenom || '',
          email: patientInfo.utilisateur.email,
          telephone: patientInfo.utilisateur.telephone || undefined
        },
        medecin: {
          nom: medecinInfo.utilisateur.nom,
          prenom: medecinInfo.utilisateur.prenom || '',
          email: medecinInfo.utilisateur.email,
          titre: medecinInfo.titre,
          specialite: medecinInfo.specialite?.nom
        },
        hopital: hopitalInfo ? {
          nom: hopitalInfo.nom,
          adresse: hopitalInfo.adresse
        } : undefined
      }

      // Envoyer les notifications email (ne pas bloquer si échec)
      try {
        await sendRendezVousCreatedNotification(notificationData)
        console.log('✅ Notifications email envoyées pour le rendez-vous:', rendezVous.id)
      } catch (emailError) {
        console.error('⚠️ Erreur lors de l\'envoi des notifications email:', emailError)
        // Ne pas faire échouer la création du RDV si l'email échoue
      }

      // Créer les notifications en base de données
      try {
        // Notification pour le patient
        await creerNotification({
          titre: "Rendez-vous créé",
          message: `Votre demande de rendez-vous avec Dr. ${medecinInfo.utilisateur.prenom} ${medecinInfo.utilisateur.nom} a été envoyée. Vous recevrez une confirmation par email.`,
          type: TypeNotification.RENDEZ_VOUS,
          utilisateurId: user.id,
          lien: `/patient/appointments`,
          data: {
            rendezVousId: rendezVous.id,
            medecinId: medecinInfo.id,
            date: rendezVous.date,
            statut: rendezVous.statut
          }
        })

        // Notification pour le médecin
        await creerNotification({
          titre: "Nouvelle demande de rendez-vous",
          message: `${patientInfo.utilisateur.prenom} ${patientInfo.utilisateur.nom} a demandé un rendez-vous le ${new Date(rendezVous.date).toLocaleDateString('fr-FR')} à ${rendezVous.date.toTimeString().slice(0, 5)}.`,
          type: TypeNotification.RENDEZ_VOUS,
          utilisateurId: medecinInfo.userId,
          lien: `/medecin/appointments`,
          data: {
            rendezVousId: rendezVous.id,
            patientId: patient.id,
            date: rendezVous.date,
            statut: rendezVous.statut
          }
        })

        console.log('✅ Notifications en base de données créées pour le rendez-vous:', rendezVous.id)
      } catch (notifError) {
        console.error('⚠️ Erreur lors de la création des notifications en BDD:', notifError)
        // Ne pas faire échouer la création du RDV si la notification échoue
      }
    }

    return {
      success: true,
      data: {
        id: rendezVous.id,
        medecin: {
          id: medecinInfo?.id || '',
          nom: medecinInfo?.utilisateur.nom || '',
          prenom: medecinInfo?.utilisateur.prenom || '',
          specialite: medecinInfo?.specialite?.nom || '',
          hopital: {
            id: hopitalInfo?.id || '',
            nom: hopitalInfo?.nom || '',
            adresse: hopitalInfo?.adresse || ''
          },
          experience: 5 // Default experience value
        },
        date: rendezVous.date.toISOString().split('T')[0],
        heure: rendezVous.date.toTimeString().slice(0, 5),
        duree: rendezVous.duree,
        motif: rendezVous.motif || '',
        statut: rendezVous.statut,
        hopitalId: rendezVous.hopitalId,
        patientId: patient.id
      }
    }

  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la création du rendez-vous"
    }
  }
}

/**
 * Obtenir les rendez-vous d'un patient
 */
export async function getRendezVousPatient() {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "PATIENT") {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    const patient = await prisma.patient.findFirst({
      where: { userId: user.id }
    })

    if (!patient) {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    const rendezVous = await prisma.rendezVous.findMany({
      where: { patientId: patient.id },
      include: {
        medecin: {
          include: {
            utilisateur: true,
            specialite: true
          }
        },
        hopital: true
      },
      orderBy: { date: 'desc' }
    })

    const rendezVousFormatted: RendezVousPatient[] = rendezVous.map(rdv => ({
      id: rdv.id,
      medecin: {
        id: rdv.medecin.id,
        nom: rdv.medecin.utilisateur.nom,
        prenom: rdv.medecin.utilisateur.prenom || '',
        specialite: rdv.medecin.specialite?.nom || '',
        hopital: {
          id: rdv.hopital?.id || '',
          nom: rdv.hopital?.nom || '',
          adresse: rdv.hopital?.adresse || ''
        },
        experience: rdv.medecin.anneeExperience || 1 // Default experience value
      },
      date: rdv.date.toISOString().split('T')[0],
      heure: rdv.date.toTimeString().slice(0, 5),
      duree: rdv.duree,
      motif: rdv.motif || '',
      statut: rdv.statut,
      hopitalId: rdv.hopitalId,
    }))

    return {
      success: true,
      data: rendezVousFormatted
    }

  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des rendez-vous"
    }
  }
}

/**
 * Modifier un rendez-vous
 */
export async function modifierRendezVousPatient(params: {
  rendezVousId: string
  date: string
  heure: string
  duree: number
  motif: string
}) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "PATIENT") {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    const patient = await prisma.patient.findFirst({
      where: { userId: user.id }
    })

    if (!patient) {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    // Vérifier que le rendez-vous appartient au patient
    const rendezVous = await prisma.rendezVous.findFirst({
      where: {
        id: params.rendezVousId,
        patientId: patient.id
      }
    })

    if (!rendezVous) {
      return {
        success: false,
        error: "Rendez-vous non trouvé ou accès non autorisé"
      }
    }

    // Vérifier que le rendez-vous peut être modifié
    if (rendezVous.statut === 'ANNULE') {
      return {
        success: false,
        error: "Impossible de modifier un rendez-vous annulé"
      }
    }

    if (rendezVous.statut === 'TERMINE') {
      return {
        success: false,
        error: "Impossible de modifier un rendez-vous terminé"
      }
    }

    // Créer la nouvelle date avec l'heure
    const [heures, minutes] = params.heure.split(':').map(Number)
    const dateRendezVous = new Date(params.date)
    dateRendezVous.setHours(heures, minutes, 0, 0)

    // Modifier le rendez-vous
    const updatedRendezVous = await prisma.rendezVous.update({
      where: { id: params.rendezVousId },
      data: {
        date: dateRendezVous,
        duree: params.duree,
        motif: params.motif
      }
    })

    // Récupérer les informations complètes pour la notification
    const rendezVousComplet = await prisma.rendezVous.findUnique({
      where: { id: params.rendezVousId },
      include: {
        medecin: {
          include: {
            utilisateur: true,
            specialite: true
          }
        },
        patient: {
          include: {
            utilisateur: true
          }
        },
        hopital: true
      }
    })

    // Envoyer une notification de modification (utilise le template de création avec indication de modification)
    if (rendezVousComplet) {
      const notificationData: RendezVousNotificationData = {
        id: rendezVousComplet.id,
        date: rendezVousComplet.date,
        heure: rendezVousComplet.date.toTimeString().slice(0, 5),
        duree: rendezVousComplet.duree,
        motif: rendezVousComplet.motif || '',
        statut: rendezVousComplet.statut,
        patient: {
          nom: rendezVousComplet.patient.utilisateur.nom,
          prenom: rendezVousComplet.patient.utilisateur.prenom || '',
          email: rendezVousComplet.patient.utilisateur.email,
          telephone: rendezVousComplet.patient.utilisateur.telephone || undefined
        },
        medecin: {
          nom: rendezVousComplet.medecin.utilisateur.nom,
          prenom: rendezVousComplet.medecin.utilisateur.prenom || '',
          email: rendezVousComplet.medecin.utilisateur.email,
          titre: rendezVousComplet.medecin.titre,
          specialite: rendezVousComplet.medecin.specialite?.nom
        },
        hopital: rendezVousComplet.hopital ? {
          nom: rendezVousComplet.hopital.nom,
          adresse: rendezVousComplet.hopital.adresse
        } : undefined
      }

      // Envoyer les notifications email (ne pas bloquer si échec)
      try {
        await sendRendezVousCreatedNotification(notificationData)
        console.log('✅ Notifications email de modification envoyées pour le rendez-vous:', params.rendezVousId)
      } catch (emailError) {
        console.error('⚠️ Erreur lors de l\'envoi des notifications email de modification:', emailError)
        // Ne pas faire échouer la modification si l'email échoue
      }

      // Créer les notifications en base de données
      try {
        // Notification pour le patient
        await creerNotification({
          titre: "Rendez-vous modifié",
          message: `Votre rendez-vous avec Dr. ${rendezVousComplet.medecin.utilisateur.prenom} ${rendezVousComplet.medecin.utilisateur.nom} a été modifié pour le ${new Date(rendezVousComplet.date).toLocaleDateString('fr-FR')} à ${rendezVousComplet.date.toTimeString().slice(0, 5)}.`,
          type: TypeNotification.RENDEZ_VOUS,
          utilisateurId: user.id,
          lien: `/patient/appointments`,
          data: {
            rendezVousId: rendezVousComplet.id,
            medecinId: rendezVousComplet.medecinId,
            date: rendezVousComplet.date,
            statut: rendezVousComplet.statut
          }
        })

        // Notification pour le médecin
        await creerNotification({
          titre: "Rendez-vous modifié",
          message: `Le rendez-vous avec ${rendezVousComplet.patient.utilisateur.prenom} ${rendezVousComplet.patient.utilisateur.nom} a été modifié pour le ${new Date(rendezVousComplet.date).toLocaleDateString('fr-FR')} à ${rendezVousComplet.date.toTimeString().slice(0, 5)}.`,
          type: TypeNotification.RENDEZ_VOUS,
          utilisateurId: rendezVousComplet.medecin.userId,
          lien: `/medecin/appointments`,
          data: {
            rendezVousId: rendezVousComplet.id,
            patientId: rendezVousComplet.patientId,
            date: rendezVousComplet.date,
            statut: rendezVousComplet.statut
          }
        })

        console.log('✅ Notifications en base de données de modification créées pour le rendez-vous:', params.rendezVousId)
      } catch (notifError) {
        console.error('⚠️ Erreur lors de la création des notifications en BDD de modification:', notifError)
      }
    }

    return {
      success: true,
      data: updatedRendezVous,
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

/**
 * Annuler un rendez-vous
 */
export async function annulerRendezVousPatient(rendezVousId: string) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "PATIENT") {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    const patient = await prisma.patient.findFirst({
      where: { userId: user.id }
    })

    if (!patient) {
      return {
        success: false,
        error: "Profil patient non trouvé"
      }
    }

    // Vérifier que le rendez-vous appartient au patient
    const rendezVous = await prisma.rendezVous.findFirst({
      where: {
        id: rendezVousId,
        patientId: patient.id
      }
    })

    if (!rendezVous) {
      return {
        success: false,
        error: "Rendez-vous non trouvé ou accès non autorisé"
      }
    }

    // Vérifier que le rendez-vous peut être annulé
    if (rendezVous.statut === 'ANNULE') {
      return {
        success: false,
        error: "Ce rendez-vous est déjà annulé"
      }
    }

    if (rendezVous.statut === 'TERMINE') {
      return {
        success: false,
        error: "Impossible d'annuler un rendez-vous terminé"
      }
    }

    // Annuler le rendez-vous
    await prisma.rendezVous.update({
      where: { id: rendezVousId },
      data: { statut: 'ANNULE' }
    })

    // Récupérer les informations complètes pour la notification
    const rendezVousComplet = await prisma.rendezVous.findUnique({
      where: { id: rendezVousId },
      include: {
        medecin: {
          include: {
            utilisateur: true,
            specialite: true
          }
        },
        patient: {
          include: {
            utilisateur: true
          }
        },
        hopital: true
      }
    })

    // Envoyer les notifications d'annulation
    if (rendezVousComplet) {
      const notificationData: RendezVousNotificationData = {
        id: rendezVousComplet.id,
        date: rendezVousComplet.date,
        heure: rendezVousComplet.date.toTimeString().slice(0, 5),
        duree: rendezVousComplet.duree,
        motif: rendezVousComplet.motif || '',
        statut: 'ANNULE',
        patient: {
          nom: rendezVousComplet.patient.utilisateur.nom,
          prenom: rendezVousComplet.patient.utilisateur.prenom || '',
          email: rendezVousComplet.patient.utilisateur.email,
          telephone: rendezVousComplet.patient.utilisateur.telephone || undefined
        },
        medecin: {
          nom: rendezVousComplet.medecin.utilisateur.nom,
          prenom: rendezVousComplet.medecin.utilisateur.prenom || '',
          email: rendezVousComplet.medecin.utilisateur.email,
          titre: rendezVousComplet.medecin.titre,
          specialite: rendezVousComplet.medecin.specialite?.nom
        },
        hopital: rendezVousComplet.hopital ? {
          nom: rendezVousComplet.hopital.nom,
          adresse: rendezVousComplet.hopital.adresse
        } : undefined
      }

      // Envoyer les notifications email (ne pas bloquer si échec)
      try {
        await sendRendezVousCancelledNotification(notificationData)
        console.log('✅ Notifications email d\'annulation envoyées pour le rendez-vous:', rendezVousId)
      } catch (emailError) {
        console.error('⚠️ Erreur lors de l\'envoi des notifications email d\'annulation:', emailError)
        // Ne pas faire échouer l'annulation si l'email échoue
      }

      // Créer les notifications en base de données
      try {
        // Notification pour le patient
        await creerNotification({
          titre: "Rendez-vous annulé",
          message: `Votre rendez-vous avec Dr. ${rendezVousComplet.medecin.utilisateur.prenom} ${rendezVousComplet.medecin.utilisateur.nom} prévu le ${new Date(rendezVousComplet.date).toLocaleDateString('fr-FR')} a été annulé.`,
          type: TypeNotification.RENDEZ_VOUS,
          utilisateurId: rendezVousComplet.patient.userId,
          lien: `/patient/appointments`,
          data: {
            rendezVousId: rendezVousComplet.id,
            medecinId: rendezVousComplet.medecinId,
            date: rendezVousComplet.date,
            statut: 'ANNULE'
          }
        })

        // Notification pour le médecin
        await creerNotification({
          titre: "Rendez-vous annulé",
          message: `Le rendez-vous avec ${rendezVousComplet.patient.utilisateur.prenom} ${rendezVousComplet.patient.utilisateur.nom} prévu le ${new Date(rendezVousComplet.date).toLocaleDateString('fr-FR')} a été annulé.`,
          type: TypeNotification.RENDEZ_VOUS,
          utilisateurId: rendezVousComplet.medecin.userId,
          lien: `/medecin/appointments`,
          data: {
            rendezVousId: rendezVousComplet.id,
            patientId: rendezVousComplet.patientId,
            date: rendezVousComplet.date,
            statut: 'ANNULE'
          }
        })

        console.log('✅ Notifications en base de données d\'annulation créées pour le rendez-vous:', rendezVousId)
      } catch (notifError) {
        console.error('⚠️ Erreur lors de la création des notifications en BDD d\'annulation:', notifError)
      }
    }

    return {
      success: true,
      message: "Rendez-vous annulé avec succès"
    }

  } catch (error) {
    console.error("Erreur lors de l'annulation du rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de l'annulation du rendez-vous"
    }
  }
}
