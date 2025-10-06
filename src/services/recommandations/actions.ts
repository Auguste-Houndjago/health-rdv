// actions/recommandations/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Créer une recommandation
export async function createRecommandation(data: {
  contenu: string;
  medecinId: string;
  documentId?: string;
  file?: string;
}) {
  try {
    const recommandation = await prisma.recommandation.create({
      data,
    });

    revalidatePath("/recommandations");
    revalidatePath(`/medecins/${data.medecinId}`);

    return {
      success: true,
      data: recommandation,
    };
  } catch (error) {
    console.error("Erreur lors de la création de la recommandation:", error);
    return {
      success: false,
      error: "Erreur lors de la création de la recommandation",
    };
  }
}

// Récupérer les recommandations d'un médecin
export async function getRecommandationsByMedecin(medecinId: string) {
 
}