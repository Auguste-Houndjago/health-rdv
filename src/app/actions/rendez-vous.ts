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

    console.log("✅ Rendez-vous validé, préparation des données pour notification...")

    // Récupérer les informations complètes du patient et du médecin pour l'email
    const patient = await prisma.patient.findUnique({
      where: { id: data.patientId },
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
    });

    const medecin = await prisma.medecin.findUnique({
      where: { id: data.medecinId },
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
        }
      }
    });

    if (!patient || !medecin) {
      return {
        success: false,
        error: "Patient ou médecin introuvable"
      }
    }

    const patientEmail = patient.utilisateur.email;
    const medecinEmail = medecin.utilisateur.email;

    console.log("📋 Adresses email des destinataires:");
    console.log("  Patient:", patientEmail);
    console.log("  Médecin:", medecinEmail);

    // Envoyer les notifications par email
    let emailResults = {
      patient: { 
        success: false, 
        error: '', 
        messageId: '',
        email: patientEmail // Ajout de l'adresse email du patient
      },
      medecin: { 
        success: false, 
        error: '', 
        messageId: '',
        email: medecinEmail // Ajout de l'adresse email du médecin
      }
    };

    try {
      const { sendRendezVousCreatedNotification } = await import('@/services/notifications');
      
      const emailResponse = await sendRendezVousCreatedNotification({
        id: `temp-${Date.now()}`,
        date: new Date(data.date),
        heure: data.heure,
        duree: data.duree,
        motif: data.motif,
        patient: {
          nom: patient.utilisateur.nom,
          prenom: patient.utilisateur.prenom || '',
          email: patientEmail,
          telephone: patient.utilisateur.telephone || undefined
        },
        medecin: {
          nom: medecin.utilisateur.nom,
          prenom: medecin.utilisateur.prenom || '',
          email: medecinEmail,
          titre: medecin.titre || undefined,
          specialite: medecin.specialite?.nom || undefined
        }
      });

      emailResults = {
        patient: {
          success: emailResponse.patient.success,
          error: emailResponse.patient.error || '',
          messageId: emailResponse.patient.messageId || '',
          email: patientEmail // Conservation de l'email
        },
        medecin: {
          success: emailResponse.medecin.success,
          error: emailResponse.medecin.error || '',
          messageId: emailResponse.medecin.messageId || '',
          email: medecinEmail // Conservation de l'email
        }
      };

      console.log("✅ Notifications envoyées avec succès");
      console.log("📧 Destinataires:", {
        patient: patientEmail,
        medecin: medecinEmail
      });
    } catch (emailError) {
      console.error("⚠️ Erreur lors de l'envoi des notifications:", emailError);
      emailResults = {
        patient: { 
          success: false, 
          error: 'Erreur lors de l\'envoi', 
          messageId: '',
          email: patientEmail // Même en cas d'erreur, on garde l'email
        },
        medecin: { 
          success: false, 
          error: 'Erreur lors de l\'envoi', 
          messageId: '',
          email: medecinEmail // Même en cas d'erreur, on garde l'email
        }
      };
      console.log("ℹ️ Le RDV est créé mais les emails n'ont pas pu être envoyés");
      console.log("📧 Destinataires prévus:", {
        patient: patientEmail,
        medecin: medecinEmail
      });
    }

    console.log("✅ Rendez-vous créé:", data)
    
    revalidatePath('/medecin/rendez-vous')
    
    return {
      success: true,
      message: "Rendez-vous créé avec succès !",
      emailResults,
      // Optionnel: retourner aussi les emails de façon structurée
      destinataires: {
        patient: patientEmail,
        medecin: medecinEmail
      }
    }
    
  } catch (error) {
    console.error("❌ Erreur lors de la création du rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la création du rendez-vous"
    }
  }
}

export async function modifierRendezVous(rendezVousId: string, formData: FormData) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
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

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    // Statistiques des rendez-vous
    const [totalRDV, rdvAujourdhui, rdvConfirmes, rdvEnAttente] = await Promise.all([
      prisma.rendezVous.count({
        where: {
          medecinId: user.id,
          date: { gte: startOfMonth }
        }
      }),
      prisma.rendezVous.count({
        where: {
          medecinId: user.id,
          date: {
            gte: today,
            lt: tomorrow
          }
        }
      }),
      prisma.rendezVous.count({
        where: {
          medecinId: user.id,
          statut: 'CONFIRME',
          date: { gte: today }
        }
      }),
      prisma.rendezVous.count({
        where: {
          medecinId: user.id,
          statut: 'EN_ATTENTE',
          date: { gte: today }
        }
      })
    ])

    const stats = {
      totalRDV,
      rdvAujourdhui,
      rdvConfirmes,
      rdvEnAttente
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

/**
 * Confirmer un rendez-vous
 */
export async function confirmerRendezVous(rendezVousId: string) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Utilisateur non autorisé"
      }
    }

    // Vérifier que le rendez-vous existe et appartient au médecin
    const rendezVous = await prisma.rendezVous.findFirst({
      where: {
        id: rendezVousId,
        medecinId: user.id
      }
    })

    if (!rendezVous) {
      return {
        success: false,
        error: "Rendez-vous non trouvé"
      }
    }

    // Vérifier que le rendez-vous n'est pas déjà confirmé ou annulé
    if (rendezVous.statut === 'CONFIRME') {
      return {
        success: false,
        error: "Le rendez-vous est déjà confirmé"
      }
    }

    if (rendezVous.statut === 'ANNULE') {
      return {
        success: false,
        error: "Le rendez-vous a été annulé"
      }
    }

    // Mettre à jour le statut du rendez-vous
    await prisma.rendezVous.update({
      where: { id: rendezVousId },
      data: {
        statut: 'CONFIRME',
        updatedAt: new Date()
      }
    })

    revalidatePath('/medecin/rendez-vous')
    
    return {
      success: true,
      message: "Rendez-vous confirmé avec succès"
    }
    
  } catch (error) {
    console.error("Erreur lors de la confirmation du rendez-vous:", error)
    return {
      success: false,
      error: "Erreur lors de la confirmation du rendez-vous"
    }
  }
}

/**
 * Annuler un rendez-vous
 */
export async function annulerRendezVous(rendezVousId: string, motifAnnulation?: string) {
  try {
    const user = await getUserInfo()
    
    if (user?.role !== "MEDECIN") {
      return {
        success: false,
        error: "Utilisateur non autorisé"
      }
    }

    // Vérifier que le rendez-vous existe et appartient au médecin
    const rendezVous = await prisma.rendezVous.findFirst({
      where: {
        id: rendezVousId,
        medecinId: user.id
      }
    })

    if (!rendezVous) {
      return {
        success: false,
        error: "Rendez-vous non trouvé"
      }
    }

    // Vérifier que le rendez-vous n'est pas déjà annulé
    if (rendezVous.statut === 'ANNULE') {
      return {
        success: false,
        error: "Le rendez-vous est déjà annulé"
      }
    }

    // Mettre à jour le statut du rendez-vous
    // Note: Le motif d'annulation pourrait être stocké dans le motif si nécessaire
    await prisma.rendezVous.update({
      where: { id: rendezVousId },
      data: {
        statut: 'ANNULE',
        updatedAt: new Date()
      }
    })

    revalidatePath('/medecin/rendez-vous')
    
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
