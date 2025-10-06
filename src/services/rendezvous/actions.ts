// actions/rendezvous/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { StatutRendezVous } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Récupérer tous les rendez-vous


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

    const rendezVous = await prisma.rendezVous.create({
      data,
    });

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
    const rendezVous = await prisma.rendezVous.update({
      where: { id: rendezVousId },
      data: { statut },
    });

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