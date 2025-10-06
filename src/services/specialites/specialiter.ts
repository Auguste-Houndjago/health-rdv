"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schéma de validation avec Zod
const createSpecialiteSchema = z.object({
  nom: z.string().min(1, "Le nom est requis").max(100, "Le nom est trop long"),
  description: z.string().max(500, "La description est trop longue").optional(),
});

export type CreateSpecialiteData = z.infer<typeof createSpecialiteSchema>;

interface CreateSpecialiteResponse {
  success: boolean;
  data?: {
    id: string;
    nom: string;
    image?: string | null;
    description?: string | null;
  };
  error?: string;
  fieldErrors?: {
    nom?: string[];
    image?: string[];
    description?: string[];
  };
}

export async function createSpecialite(
  formData: FormData
): Promise<CreateSpecialiteResponse> {
  try {
    // Extraire les données du FormData
    const rawData = {
      nom: formData.get("nom") as string,
      image: formData.get("image") as string,
      description: formData.get("description") as string,
    };

    // Validation avec Zod
    const validationResult = createSpecialiteSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      return {
        success: false,
        error: "Données invalides",
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    const { nom, description } = validationResult.data;

    // Vérifier si la spécialité existe déjà
    const existingSpecialite = await prisma.specialite.findFirst({
      where: {
        nom: {
          equals: nom.trim(),
          mode: "insensitive",
        },
      },
    });

    if (existingSpecialite) {
      return {
        success: false,
        error: "Une spécialité avec ce nom existe déjà",
      };
    }

    // Créer la spécialité
    const specialite = await prisma.specialite.create({
      data: {
        nom: nom.trim(),
        description: description?.trim() || null,

      },
    });

    // Revalider les caches
    revalidatePath("/admin/specialites");
    revalidatePath("/specialites");

    return {
      success: true,
      data: specialite,
    };
  } catch (error) {
    console.error("Erreur lors de la création de la spécialité:", error);
    
    // Gestion d'erreurs spécifiques Prisma
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return {
          success: false,
          error: "Une spécialité avec ce nom existe déjà",
        };
      }
    }

    return {
      success: false,
      error: "Une erreur est survenue lors de la création de la spécialité",
    };
  }
}

// Fonction pour récupérer toutes les spécialités
export async function getSpecialites() {
    try {
      const specialites = await prisma.specialite.findMany({
        orderBy: { nom: "asc" },
        include: {
          _count: {
            select: {
              medecins: true,
              hopitaux: true,
            },
          },
        },
      });
  
      return {
        success: true,
        data: specialites,
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des spécialités:", error);
      return {
        success: false,
        error: "Erreur lors de la récupération des spécialités",
        data: [],
      };
    }
  }
  

// Fonction pour supprimer une spécialité
export async function deleteSpecialite(id: string) {
  try {
    // Vérifier si la spécialité est utilisée par des médecins
    const specialiteWithMedecins = await prisma.specialite.findUnique({
      where: { id },
      include: {
        medecins: {
          take: 1,
        },
      },
    });

    if (specialiteWithMedecins && specialiteWithMedecins.medecins.length > 0) {
      return {
        success: false,
        error: "Impossible de supprimer cette spécialité car elle est utilisée par des médecins",
      };
    }

    await prisma.specialite.delete({
      where: { id },
    });

    revalidatePath("/admin/specialites");
    revalidatePath("/specialites");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de la spécialité:", error);
    return {
      success: false,
      error: "Erreur lors de la suppression de la spécialité",
    };
  }
}

// Fonction pour mettre à jour une spécialité
export async function updateSpecialite(
  id: string,
  data: Partial<CreateSpecialiteData>
) {
  try {
    if (data.nom) {
      // Vérifier si le nouveau nom existe déjà (pour un autre enregistrement)
      const existingSpecialite = await prisma.specialite.findFirst({
        where: {
          nom: {
            equals: data.nom.trim(),
            mode: "insensitive",
          },
          NOT: {
            id: id,
          },
        },
      });

      if (existingSpecialite) {
        return {
          success: false,
          error: "Une spécialité avec ce nom existe déjà",
        };
      }
    }

    const specialite = await prisma.specialite.update({
      where: { id },
      data: {
        ...(data.nom && { nom: data.nom.trim() }),
        ...(data.description !== undefined && { 
          description: data.description.trim() || null 
        }),
      },
    });

    revalidatePath("/admin/specialites");
    revalidatePath("/specialites");

    return {
      success: true,
      data: specialite,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la spécialité:", error);
    return {
      success: false,
      error: "Erreur lors de la mise à jour de la spécialité",
    };
  }
}