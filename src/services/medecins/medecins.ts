

"use server";

import { prisma } from "@/lib/prisma";

export async function getMedecinInfoById({medecinId}:{medecinId:string}) {

   
    try {
        const medecin = await prisma.medecin.findUnique({
            where:{id: medecinId },
            include: {
                utilisateur: true,
                specialite: {
                    select: {
                        id: true,
                        nom: true,
                        description: true,
                        image: true,
                    },
                },

              },
        })
        return medecin
    } catch (error) {
        console.error('Erreur lors de la recherche du médicament:', error);
        throw new Error('Impossible de trouver le médicament');
    }
}

