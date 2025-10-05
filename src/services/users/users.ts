"use server";

import { prisma } from "@/lib/prisma"; 


export async function getUsersList() {

    const users = await prisma.utilisateur.findMany({

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
        updatedAt: true,
        medecin: {
          select: {
            specialite: {
              select: {
                nom: true,
              },
            },
            numLicence: true,
            statut: true,
          },
        },
        patient: {
          select: {
            groupeSanguin: true,
            sexe: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc", 
      },
    });

   return users
 

}


