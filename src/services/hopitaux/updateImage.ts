// services/hopitaux/updateImage.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateHopitalImageResponse {
  success: boolean;
  data?: {
    id: string;
    image: string | null;
  };
  error?: string;
}

export async function updateHopitalImage(
  hopitalId: string,
  imageUrl: string
): Promise<UpdateHopitalImageResponse> {
  try {
    if (!hopitalId) {
      return {
        success: false,
        error: "ID de l'hôpital requis",
      };
    }

    if (!imageUrl) {
      return {
        success: false,
        error: "URL de l'image requise",
      };
    }

    // Vérifier que l'hôpital existe
    const existingHopital = await prisma.hopital.findUnique({
      where: { id: hopitalId },
    });

    if (!existingHopital) {
      return {
        success: false,
        error: "Hôpital non trouvé",
      };
    }

    // Mettre à jour l'image de l'hôpital
    const updatedHopital = await prisma.hopital.update({
      where: { id: hopitalId },
      data: { image: imageUrl },
      select: {
        id: true,
        image: true,
      },
    });

    // Revalider les caches

    return {
      success: true,
      data: updatedHopital,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'image hôpital:", error);
    return {
      success: false,
      error: "Erreur serveur lors de la mise à jour de l'image",
    };
  }
}