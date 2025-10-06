// src/services/specialites/actions.ts
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

// Récupérer toutes les spécialités
export async function getSpecialites() {
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

  return specialites;
}

// Créer une spécialité
export async function createSpecialite(formData: FormData) {
  // Extraire les données du FormData
  const rawData = {
    nom: formData.get("nom") as string,
    image: formData.get("image") as string,
    description: formData.get("description") as string,
  };

  // Validation avec Zod
  const validationResult = createSpecialiteSchema.safeParse(rawData);
  
  if (!validationResult.success) {
    throw new Error("Données invalides: " + JSON.stringify(validationResult.error.flatten().fieldErrors));
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
    throw new Error("Une spécialité avec ce nom existe déjà");
  }

  // Créer la spécialité
  const specialite = await prisma.specialite.create({
    data: {
      nom: nom.trim(),
      description: description?.trim() || null,
    },
    include: {
      _count: {
        select: {
          medecins: true,
          hopitaux: true,
        },
      },
    },
  });

  // Revalider les caches
  revalidatePath("/admin/specialites");
  revalidatePath("/specialites");

  return specialite;
}

// Mettre à jour une spécialité
export async function updateSpecialite(
  id: string,
  data: Partial<CreateSpecialiteData>
) {
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
      throw new Error("Une spécialité avec ce nom existe déjà");
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
    include: {
      _count: {
        select: {
          medecins: true,
          hopitaux: true,
        },
      },
    },
  });

  revalidatePath("/admin/specialites");
  revalidatePath("/specialites");

  return specialite;
}

// Supprimer une spécialité
export async function deleteSpecialite(id: string) {
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
    throw new Error("Impossible de supprimer cette spécialité car elle est utilisée par des médecins");
  }

  await prisma.specialite.delete({
    where: { id },
  });

  revalidatePath("/admin/specialites");
  revalidatePath("/specialites");

  return { success: true };
}