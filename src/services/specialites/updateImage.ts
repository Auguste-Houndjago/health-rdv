    // services/specialites/updateImage.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateSpecialiteImageResponse {
  success: boolean;
  data?: {
    id: string;
    image: string | null;
  };
  error?: string;
}

export async function updateSpecialiteImage(
  specialiteId: string,
  imageUrl: string
): Promise<UpdateSpecialiteImageResponse> {
  try {
    if (!specialiteId) {
      return {
        success: false,
        error: "ID de la spécialité requis",
      };
    }

    if (!imageUrl) {
      return {
        success: false,
        error: "URL de l'image requise",
      };
    }

    // Vérifier que la spécialité existe
    const existingSpecialite = await prisma.specialite.findUnique({
      where: { id: specialiteId },
    });

    if (!existingSpecialite) {
      return {
        success: false,
        error: "Spécialité non trouvée",
      };
    }

    // Mettre à jour l'image de la spécialité
    const updatedSpecialite = await prisma.specialite.update({
      where: { id: specialiteId },
      data: { image: imageUrl },
      select: {
        id: true,
        image: true,
      },
    });

    // Revalider les caches
    revalidatePath("/admin/specialites");
    revalidatePath("/specialites");
    revalidatePath(`/admin/specialites/${specialiteId}`);

    return {
      success: true,
      data: updatedSpecialite,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image:", error);
    return {
      success: false,
      error: "Erreur serveur lors de la mise à jour de l'image",
    };
  }
}