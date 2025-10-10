"use server"

import { getUserInfo } from '@/services/users'
import { Prisma } from "@prisma/client";

export async function obtenirSpecialiteMedecin() {
  try {
    const user = await getUserInfo()
    
    if (!user?.medecin) {
      return {
        success: false,
        error: "Utilisateur non trouvé ou pas de profil médecin"
      }
    }

    // Récupérer les informations de spécialité du médecin
    const specialiteInfo = {
      id: user.medecin.specialite || user.medecin.specialite,
      nom: user.medecin.specialite || "Non spécifiée",
      medecinId: user.id,
      hopital: user.medecin.hopitaux || "Non spécifié"
    }

    return {
      success: true,
      data: specialiteInfo
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération de la spécialité:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération de la spécialité"
    }
  }
}

export async function obtenirPlanningMedecin(medecinId: string) {
  try {
    // Ici vous pouvez ajouter la logique pour récupérer le planning depuis la base de données
    // const planning = await prisma.planningDisponibilite.findFirst({
    //   where: { medecinId },
    //   include: {
    //     creneaux: true
    //   },
    //   orderBy: { createdAt: 'desc' }
    // })

    return {
      success: true,
      data: null // Pour l'instant, retourner null
    }
    
  } catch (error) {
    console.error("Erreur lors de la récupération du planning:", error)
    return {
      success: false,
      error: "Erreur lors de la récupération du planning"
    }
  }
}


/* module rendez-vous */

const rendezVousPayload = {
  select: {
    id: true,
    date: true,
    duree: true,
    statut: true,
    motif: true,
    createdAt: true,
    updatedAt: true,

    //  Patient associé
    patient: {
      select: {
        id: true,
        groupeSanguin: true,
        sexe: true,
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            avatarUrl: true,
            dateNaissance: true,
          },
        },
      },
    },

    // Utilisateur qui a créé ou gère le RDV
    utilisateur: {
      select: {
        id: true,
        nom: true,
        prenom: true,
        role: true,
      },
    },

    // Hôpital du rendez-vous
    hopital: {
      select: {
        id: true,
        nom: true,
        adresse: true,
        contact: true,
      },
    },
  },
} satisfies Prisma.RendezVousDefaultArgs;

export type MedecinRendezVousType = Prisma.RendezVousGetPayload<typeof rendezVousPayload>;

export async function getRdvByMedecinId({medecinId}: {medecinId?: string}): Promise<MedecinRendezVousType[]> {

  const user = await getUserInfo({cache:false})
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }
  if (user.role !== "MEDECIN") {
    throw new Error("Utilisateur non médecin");
  }

  const targetMedecinId = medecinId ?? user.id;
  const existMedecin = await prisma.medecin.findUnique({
    where: { id: targetMedecinId }
  });

  if (!existMedecin) {
    throw new Error("Médecin non trouvé");
  }

  const rdv = await prisma.rendezVous.findMany({
    where: { medecinId: targetMedecinId },
    ...rendezVousPayload,
    orderBy: { date: "asc" },
  });

  return rdv;
}








export type MedecinInfoPayload = Prisma.MedecinGetPayload<{
  select: {
    id: true;
    numLicence: true;
    anneeExperience: true;
    titre: true;
    isDisponible: true;
    statut: true;
    utilisateur: {
      select: {
        nom: true;
        prenom: true;
        email: true;
        telephone: true;
        avatarUrl: true;
        dateNaissance: true;
        status: true;
        createdAt: true;
        updatedAt: true;
        role: true;
      };
    };
    specialite: {
      select: {
        id: true;
        nom: true;
        description: true;
        image: true;
      };
    };
  };
}>;

export async function getMedecinInfo(): Promise<MedecinInfoPayload> {
  const user = await getUserInfo({ cache: false });

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  if (user.role !== "MEDECIN") {
    throw new Error("Utilisateur non médecin");
  }

  const medecin = await prisma.medecin.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      numLicence: true,
      anneeExperience: true,
      titre: true,
      isDisponible: true,
      statut: true,
      utilisateur: {
        select: {
          nom: true,
          prenom: true,
          email: true,
          telephone: true,
          avatarUrl: true,
          dateNaissance: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          role: true,
        },
      },
      specialite: {
        select: {
          id: true,
          nom: true,
          description: true,
          image: true,
        },
      },
    },
  });

  if (!medecin) {
    throw new Error("Profil médecin non trouvé");
  
  }

  return medecin;
}
