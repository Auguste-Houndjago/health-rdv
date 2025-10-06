"use server";

import { prisma } from "@/lib/prisma"; 

import type { Prisma } from "@prisma/client"

export type UsersWithRole = Prisma.UtilisateurGetPayload<{
  select: {
    id: true
    nom: true
    prenom: true
    email: true
    telephone: true
    avatarUrl: true
    dateNaissance: true
    status: true
    createdAt: true
    updatedAt: true
    role: true
    medecin: {
      select: {
        specialite: { select: { nom: true } }
        numLicence: true
        statut: true
      }
    }
    patient: {
      select: {
        groupeSanguin: true
        sexe: true
      }
    }
    
  }
}>

export async function getUsersWithRole(): Promise<UsersWithRole[]> {
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
      role: true,
      medecin: {
        select: {
          specialite: { select: { nom: true } },
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
      role: "asc",
    },
  })

  return users
}


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
        role:true,
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
        role:"asc" 
      },
    });

   return users

}


