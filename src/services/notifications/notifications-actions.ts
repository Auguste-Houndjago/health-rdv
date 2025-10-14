"use server"

import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"
import { TypeNotification, StatutNotification } from "@prisma/client"

export interface NotificationData {
  titre: string
  message: string
  type: TypeNotification
  utilisateurId: string
  lien?: string
  data?: any
  expiresAt?: Date
}

/**
 * Créer une nouvelle notification
 */
export async function creerNotification(params: NotificationData) {
  try {
    const notification = await prisma.notification.create({
      data: {
        titre: params.titre,
        message: params.message,
        type: params.type,
        utilisateurId: params.utilisateurId,
        statut: StatutNotification.NON_LU,
        lien: params.lien,
        data: params.data,
        expiresAt: params.expiresAt,
      }
    })

    return {
      success: true,
      data: notification
    }
  } catch (error) {
    console.error("Erreur lors de la création de la notification:", error)
    return {
      success: false,
      error: "Erreur lors de la création de la notification"
    }
  }
}

/**
 * Obtenir toutes les notifications de l'utilisateur connecté
 */
export async function obtenirNotifications() {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié"
      }
    }

    const notifications = await prisma.notification.findMany({
      where: {
        utilisateurId: user.id,
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } }
        ]
      },
      orderBy: {
        dateEnvoi: 'desc'
      }
    })

    // Ajouter des propriétés calculées
    const notificationsAvecDetails = notifications.map(notif => ({
      ...notif,
      lue: notif.statut !== StatutNotification.NON_LU,
      priorite: notif.type === TypeNotification.URGENCE ? 'URGENTE' : 'NORMALE',
      emetteur: 'Système',
      patient: null, // Peut être enrichi selon les besoins
      dateCreation: notif.dateEnvoi
    }))

    return {
      success: true,
      data: notificationsAvecDetails
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des notifications"
    }
  }
}

/**
 * Marquer une notification comme lue
 */
export async function marquerNotificationLue(notificationId: string) {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié"
      }
    }

    // Vérifier que la notification appartient à l'utilisateur
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        utilisateurId: user.id
      }
    })

    if (!notification) {
      return {
        success: false,
        error: "Notification non trouvée"
      }
    }

    await prisma.notification.update({
      where: { id: notificationId },
      data: {
        statut: StatutNotification.LU,
        dateLecture: new Date()
      }
    })

    return {
      success: true,
      message: "Notification marquée comme lue"
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la notification:", error)
    return {
      success: false,
      error: "Erreur lors de la mise à jour de la notification"
    }
  }
}

/**
 * Marquer toutes les notifications comme lues
 */
export async function marquerToutesNotificationsLues() {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié"
      }
    }

    await prisma.notification.updateMany({
      where: {
        utilisateurId: user.id,
        statut: StatutNotification.NON_LU
      },
      data: {
        statut: StatutNotification.LU,
        dateLecture: new Date()
      }
    })

    return {
      success: true,
      message: "Toutes les notifications ont été marquées comme lues"
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des notifications:", error)
    return {
      success: false,
      error: "Erreur lors de la mise à jour des notifications"
    }
  }
}

/**
 * Supprimer une notification
 */
export async function supprimerNotification(notificationId: string) {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié"
      }
    }

    // Vérifier que la notification appartient à l'utilisateur
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        utilisateurId: user.id
      }
    })

    if (!notification) {
      return {
        success: false,
        error: "Notification non trouvée"
      }
    }

    await prisma.notification.delete({
      where: { id: notificationId }
    })

    return {
      success: true,
      message: "Notification supprimée"
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la notification:", error)
    return {
      success: false,
      error: "Erreur lors de la suppression de la notification"
    }
  }
}

/**
 * Obtenir les statistiques des notifications
 */
export async function obtenirStatistiquesNotifications() {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié"
      }
    }

    const [total, nonLues, urgentes] = await Promise.all([
      prisma.notification.count({
        where: { utilisateurId: user.id }
      }),
      prisma.notification.count({
        where: {
          utilisateurId: user.id,
          statut: StatutNotification.NON_LU
        }
      }),
      prisma.notification.count({
        where: {
          utilisateurId: user.id,
          type: TypeNotification.URGENCE,
          statut: StatutNotification.NON_LU
        }
      })
    ])

    return {
      success: true,
      data: {
        totalNotifications: total,
        notificationsNonLues: nonLues,
        notificationsUrgentes: urgentes
      }
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
 * Archiver une notification
 */
export async function archiverNotification(notificationId: string) {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return {
        success: false,
        error: "Utilisateur non authentifié"
      }
    }

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        utilisateurId: user.id
      }
    })

    if (!notification) {
      return {
        success: false,
        error: "Notification non trouvée"
      }
    }

    await prisma.notification.update({
      where: { id: notificationId },
      data: {
        statut: StatutNotification.ARCHIVE
      }
    })

    return {
      success: true,
      message: "Notification archivée"
    }
  } catch (error) {
    console.error("Erreur lors de l'archivage de la notification:", error)
    return {
      success: false,
      error: "Erreur lors de l'archivage de la notification"
    }
  }
}

