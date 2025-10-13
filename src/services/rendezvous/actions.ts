// actions/rendezvous/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { StatutRendezVous } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendRendezVousCancelledNotification, sendRendezVousConfirmedNotification, sendRendezVousCreatedNotification } from "../notifications/email";


// Créer un nouveau rendez-vous
export async function createRendezVous(data: {
  date: Date;
  duree: number;
  motif: string;
  hopitalId: string;
  utilisateurId: string;
  medecinId: string;
  patientId: string;
}) {
  try {
    // Vérifier la disponibilité du médecin
    const existingRendezVous = await prisma.rendezVous.findFirst({
      where: {
        medecinId: data.medecinId,
        date: data.date,
      },
    });

    if (existingRendezVous) {
      return {
        success: false,
        error: "Le médecin n'est pas disponible à cette date et heure",
      };
    }

    // Créer le rendez-vous avec les relations
    const rendezVous = await prisma.rendezVous.create({
      data,
      include: {
        patient: {
          include: {
            utilisateur: true
          }
        },
        medecin: {
          include: {
            utilisateur: true,
            specialite: true
          }
        },
        hopital: true
      }
    });

    // Envoyer les notifications par email
    try {
      await sendRendezVousCreatedNotification({
        id: rendezVous.id,
        date: rendezVous.date,
        duree: rendezVous.duree,
        motif: rendezVous.motif || '',
        patient: {
          nom: rendezVous.patient.utilisateur.nom,
          prenom: rendezVous.patient.utilisateur.prenom || '',
          email: rendezVous.patient.utilisateur.email,
          telephone: rendezVous.patient.utilisateur.telephone || undefined
        },
        medecin: {
          nom: rendezVous.medecin.utilisateur.nom,
          prenom: rendezVous.medecin.utilisateur.prenom || '',
          email: rendezVous.medecin.utilisateur.email,
          titre: rendezVous.medecin.titre || undefined,
          specialite: rendezVous.medecin.specialite?.nom || undefined
        },
        hopital: {
          nom: rendezVous.hopital.nom,
          adresse: rendezVous.hopital.adresse || undefined
        }
      });
      console.log('✅ Notifications envoyées avec succès');
    } catch (emailError) {
      console.error('⚠️ Erreur lors de l\'envoi des notifications:', emailError);
      // On ne bloque pas la création du RDV si l'email échoue
    }

    return {
      success: true,
      data: rendezVous,
    };
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous:", error);
    return {
      success: false,
      error: "Erreur lors de la création du rendez-vous",
    };
  }
}

// Mettre à jour le statut d'un rendez-vous
export async function updateRendezVousStatut(
  rendezVousId: string,
  statut: StatutRendezVous
) {
  try {
    // Récupérer d'abord le rendez-vous pour avoir l'ancien statut
    const oldRendezVous = await prisma.rendezVous.findUnique({
      where: { id: rendezVousId },
      select: { statut: true }
    });

    // Mettre à jour le statut
    const rendezVous = await prisma.rendezVous.update({
      where: { id: rendezVousId },
      data: { statut },
      include: {
        patient: {
          include: {
            utilisateur: true
          }
        },
        medecin: {
          include: {
            utilisateur: true,
            specialite: true
          }
        },
        hopital: true
      }
    });

    // Envoyer les notifications selon le changement de statut
    try {
      const notificationData = {
        id: rendezVous.id,
        date: rendezVous.date,
        duree: rendezVous.duree,
        motif: rendezVous.motif || '',
        statut: rendezVous.statut,
        patient: {
          nom: rendezVous.patient.utilisateur.nom,
          prenom: rendezVous.patient.utilisateur.prenom || '',
          email: rendezVous.patient.utilisateur.email,
          telephone: rendezVous.patient.utilisateur.telephone || undefined
        },
        medecin: {
          nom: rendezVous.medecin.utilisateur.nom,
          prenom: rendezVous.medecin.utilisateur.prenom || '',
          email: rendezVous.medecin.utilisateur.email,
          titre: rendezVous.medecin.titre || undefined,
          specialite: rendezVous.medecin.specialite?.nom || undefined
        },
        hopital: {
          nom: rendezVous.hopital.nom,
          adresse: rendezVous.hopital.adresse || undefined
        }
      };

      // Notification selon le nouveau statut
      if (statut === 'CONFIRME' && oldRendezVous?.statut !== 'CONFIRME') {
        await sendRendezVousConfirmedNotification(notificationData);
        console.log('✅ Notification de confirmation envoyée');
      } else if (statut === 'ANNULE' && oldRendezVous?.statut !== 'ANNULE') {
        await sendRendezVousCancelledNotification(notificationData);
        console.log('✅ Notifications d\'annulation envoyées');
      }
    } catch (emailError) {
      console.error('⚠️ Erreur lors de l\'envoi des notifications:', emailError);
      // On ne bloque pas la mise à jour si l'email échoue
    }

    revalidatePath("/rendezvous");
    revalidatePath("/medecins");
    revalidatePath("/patients");

    return {
      success: true,
      data: rendezVous,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du rendez-vous:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour du rendez-vous",
    };
  }
}

// Supprimer un rendez-vous
export async function deleteRendezVous(rendezVousId: string) {
  try {
    await prisma.rendezVous.delete({
      where: { id: rendezVousId },
    });



    return {
      success: true,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression du rendez-vous:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression du rendez-vous",
    };
  }
}