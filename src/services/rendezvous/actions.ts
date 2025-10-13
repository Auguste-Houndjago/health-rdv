// actions/rendezvous/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { StatutRendezVous } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendRendezVousCancelledNotification, sendRendezVousConfirmedNotification, sendRendezVousCreatedNotification } from "../notifications/email";
import { getHopitalIdBySlug } from "../hopitaux";


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


// Anciennes visites du patient (statut TERMINE ou dateDebut < aujourd'hui)




/* 


* Récupére les rendez-vous d'un patient par hopital id si fourni

* make by me : 13/10/2025
*/
export type GetRendezvousById = Awaited<ReturnType<typeof getRendezvousById>>;
export async function getRendezvousById({ 
  visitId, 
  slug 
}: { 
  visitId: string; 
  slug?: string;
}) {
  try {
    const hopital = slug ? await getHopitalIdBySlug({ slug }) : null;

    const rendezVous = await prisma.rendezVous.findUnique({
      where: {
        id: visitId,
        ...(hopital?.id && { hopitalId: hopital.id })
      },
      include: {
        patient: { include: { utilisateur: true } },
        medecin: { include: { utilisateur: true } },
      },
    });

    return rendezVous;
  } catch (error) {
    console.error('Erreur lors de la recherche du rendez-vous:', error);
    throw new Error('Impossible de trouver le rendez-vous');
  }
}

export type GetPatientRendezVous = Awaited<ReturnType<typeof getPatientRendezVous>>;
export async function getPatientRendezVous({patientId, slug}: {patientId: string, slug?: string}) {
  const now = new Date();
  
  // Récupérer l'hôpital si slug est fourni
  const hopital = slug ? await getHopitalIdBySlug({slug}) : null;

  const existingPatient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  if (!existingPatient) {
    throw new Error('Patient non trouvé');
  }

  return prisma.rendezVous.findMany({
    where: {
      patientId,
      date: { gte: now },
      statut: { in: ['EN_ATTENTE', 'CONFIRME'] },
      ...(hopital?.id && { hopitalId: hopital.id }),
    },
    include: {
      medecin: { include: { utilisateur: true } },
    },
    orderBy: { date: 'asc' },
  });
}


export async function getPatientRdvById({patientId, slug}: {patientId: string, slug?: string}) {
  const now = new Date();
  
  // Récupérer l'hôpital si slug est fourni
  const hopital = slug ? await getHopitalIdBySlug({slug}) : null;

  const existingPatient = await prisma.patient.findUnique({
    where: { id: patientId },
  });

  if (!existingPatient) {
    throw new Error('Patient non trouvé');
  }

  return prisma.rendezVous.findMany({
    where: {
      patientId,
      date: { gte: now },
      // statut: { in: ['EN_ATTENTE', 'CONFIRME'] },
      ...(hopital?.id && { hopitalId: hopital.id }),
    },
    include: {
      medecin: { include: { utilisateur: true } },
    },
    orderBy: { date: 'asc' },
  });
}

export async function getPatientMedecins({patientId, slug}: {patientId: string, slug?: string}) {
  const hopital = slug ? await getHopitalIdBySlug({slug}) : null;
  const medecins = await prisma.medecin.findMany({
    where: { 
      rendezVous: { some: { patientId } },
      ...(hopital?.id && { hopitaux: { some: { id: hopital.id } } })
    },
    include: {
      utilisateur: true,
    },
  });
  return medecins;
}

export async function getPatientAnciennesVisites({patientId, slug}: {patientId: string, slug?: string}) {

  const hopital = slug ? await getHopitalIdBySlug({slug}) : null;
  const now = new Date();
    const rendezVous = await prisma.rendezVous.findMany({
    where: {
      patientId,
      OR: [
        { statut: 'TERMINE' },  
        { date: { lt: now } },
      ],
      ...(hopital?.id && { hopitalId: hopital.id }),
    },
    include: {
      medecin: { include: { utilisateur: true } },
    },
    orderBy: { date: 'desc' },
  });

  return rendezVous;
}