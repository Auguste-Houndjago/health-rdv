"use server"

import { getUserInfo } from '@/services/users'
import { Prisma } from "@prisma/client"
import { prisma } from '@/lib/prisma'


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

/**
 * Récupérer tous les médecins pour la recherche
 */
export async function getAllMedecins() {
  try {
    const medecins = await prisma.medecin.findMany({
      where: {  
        utilisateur: {
          status: 'ACTIF'
        }
      },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            telephone: true
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
          }
        }
      },
      orderBy: {
        utilisateur: {
          nom: 'asc'
        }
      }
    })

    // Transformer les données pour correspondre à l'interface Medecin
    const medecinsFormatted = medecins.map(medecin => ({
      id: medecin.id,
      nom: medecin.utilisateur.nom,
      prenom: medecin.utilisateur.prenom || '',
      email: medecin.utilisateur.email,
      telephone: medecin.utilisateur.telephone,
      specialite: medecin.specialite?.nom ,
      experience: medecin.anneeExperience || 1, 
      hopitaux: medecin.hopitaux.map(h => ({
        id: h.hopital.id,
        nom: h.hopital.nom,
        adresse: h.hopital.adresse
      }))
    }))

    return medecinsFormatted

  } catch (error) {
    console.error("Erreur lors de la récupération des médecins:", error)
    throw new Error("Erreur lors de la récupération des médecins")
  }
}
