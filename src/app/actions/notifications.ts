"use server"

import { getUserInfo } from '@/services/users'
import { revalidatePath } from 'next/cache'

export interface Notification {
  id: string
  titre: string
  message: string
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS'
  medecinId: string
  dateCreation: string
  lue: boolean
  priorite: 'BASSE' | 'MOYENNE' | 'HAUTE' | 'URGENTE'
  action?: string
  url?: string
  // Propriétés pour compatibilité avec l'interface existante
  statut?: 'LU' | 'NON_LU'
  date?: string
  emetteur?: string
  patient?: string
}

export async function obtenirNotificationsMedecin() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour récupérer les notifications depuis la base de données
    // const notifications = await prisma.notification.findMany({
    //   where: { medecinId: user.id },
    //   orderBy: { dateCreation: 'desc' }
    // })

    const notifications: Notification[] = []

    return {
      success: true,
      data: notifications
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des notifications"
    }
  }
}

export async function marquerNotificationLue(notificationId: string) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour marquer la notification comme lue en base de données
    // await prisma.notification.update({
    //   where: { 
    //     id: notificationId,
    //     medecinId: user.id
    //   },
    //   data: {
    //     lue: true
    //   }
    // })

    console.log("Notification marquée comme lue:", notificationId)
    
    revalidatePath('/medecin/notifications')
    
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

export async function marquerToutesNotificationsLues() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour marquer toutes les notifications comme lues en base de données
    // await prisma.notification.updateMany({
    //   where: { 
    //     medecinId: user.id,
    //     lue: false
    //   },
    //   data: {
    //     lue: true
    //   }
    // })

    console.log("Toutes les notifications marquées comme lues")
    
    revalidatePath('/medecin/notifications')
    
    return {
      success: true,
      message: "Toutes les notifications marquées comme lues"
    }
    
  } catch (error) {
    console.error("Erreur lors de la mise à jour des notifications:", error)
    return {
      success: false,
      error: "Erreur lors de la mise à jour des notifications"
    }
  }
}

export async function supprimerNotification(notificationId: string) {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour supprimer la notification en base de données
    // await prisma.notification.delete({
    //   where: { 
    //     id: notificationId,
    //     medecinId: user.id
    //   }
    // })

    console.log("Notification supprimée:", notificationId)
    
    revalidatePath('/medecin/notifications')
    
    return {
      success: true,
      message: "Notification supprimée avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la suppression de la notification:", error)
    return {
      success: false,
      error: "Erreur lors de la suppression de la notification"
    }
  }
}

export async function obtenirStatistiquesNotifications() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Ici vous pouvez ajouter la logique pour calculer les statistiques des notifications
    // const stats = await prisma.notification.aggregate({
    //   where: { medecinId: user.id },
    //   _count: {
    //     id: true
    //   }
    // })

    const stats = {
      totalNotifications: 0,
      notificationsNonLues: 0,
      notificationsUrgentes: 0
    }

    return {
      success: true,
      data: stats
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des notifications:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération des statistiques des notifications"
    }
  }
}
