// actions/patients/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Récupérer tous les patients avec leurs informations
export async function getPatients() {
  try {
    const patients = await prisma.patient.findMany({
      where: {
        utilisateur: {
          deletedAt: null,
        },
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            avatarUrl: true,
            dateNaissance: true,
            status: true,
            createdAt: true,
          },
        },
        rendezVous: {
          orderBy: {
            date: "desc",
          },
          take: 5, // Derniers 5 rendez-vous
          include: {
            medecin: {
              select: {
                utilisateur: {
                  select: {
                    nom: true,
                    prenom: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        utilisateur: {
          nom: "asc",
        },
      },
    });

    return {
      success: true,
      data: patients,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des patients:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des patients",
      data: [],
    };
  }
}

// Récupérer un patient spécifique par ID
export async function getPatientById(patientId: string) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            avatarUrl: true,
            dateNaissance: true,
            status: true,
            createdAt: true,
          },
        },
        rendezVous: {
          orderBy: {
            date: "desc",
          },
          include: {
            medecin: {
              select: {
                utilisateur: {
                  select: {
                    nom: true,
                    prenom: true,
                  },
                },
                specialite: {
                  select: {
                    nom: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!patient) {
      return {
        success: false,
        error: "Patient non trouvé",
      };
    }

    return {
      success: true,
      data: patient,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du patient:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération du patient",
    };
  }
}

// Mettre à jour les informations d'un patient
export async function updatePatient(
  patientId: string,
  data: {
    adresse?: string;
    groupeSanguin?: string;
    poids?: number;
    taille?: number;
    sexe?: string;
    utilisateur?: {
      nom?: string;
      prenom?: string;
      telephone?: string;
      dateNaissance?: Date;
    };
  }
) {
  try {
    const updateData: any = {};

    if (data.adresse !== undefined) updateData.adresse = data.adresse;
    if (data.groupeSanguin !== undefined) updateData.groupeSanguin = data.groupeSanguin;
    if (data.poids !== undefined) updateData.poids = data.poids;
    if (data.taille !== undefined) updateData.taille = data.taille;
    if (data.sexe !== undefined) updateData.sexe = data.sexe;

    const patient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        ...updateData,
        ...(data.utilisateur && {
          utilisateur: {
            update: data.utilisateur,
          },
        }),
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            avatarUrl: true,
            dateNaissance: true,
            status: true,
          },
        },
      },
    });

    revalidatePath("/medecin");
    revalidatePath("/admin");

    return {
      success: true,
      data: patient,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du patient:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour du patient",
    };
  }
}

// Récupérer les patients d'un médecin spécifique
export async function getPatientsByMedecin(medecinId: string) {
  try {
    const patients = await prisma.patient.findMany({
      where: {
        rendezVous: {
          some: {
            medecinId: medecinId,
          },
        },
        utilisateur: {
          deletedAt: null,
        },
      },
      include: {
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            avatarUrl: true,
            dateNaissance: true,
          },
        },
        rendezVous: {
          where: {
            medecinId: medecinId,
          },
          orderBy: {
            date: "desc",
          },
          take: 3, // Derniers 3 rendez-vous avec ce médecin
        },
      },
      orderBy: {
        utilisateur: {
          nom: "asc",
        },
      },
    });

    return {
      success: true,
      data: patients,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des patients du médecin:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des patients",
      data: [],
    };
  }
}