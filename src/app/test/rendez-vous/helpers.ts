"use server";

import { prisma } from "@/lib/prisma";

/**
 * Récupère un patient de test pour les formulaires
 */
export async function getTestPatientId() {
  try {
    const patient = await prisma.patient.findFirst({
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true
          }
        }
      }
    });

    if (!patient) {
      return {
        success: false,
        error: "Aucun patient trouvé dans la base de données"
      };
    }

    return {
      success: true,
      data: {
        id: patient.id,
        nom: patient.utilisateur.nom,
        prenom: patient.utilisateur.prenom,
        email: patient.utilisateur.email
      }
    };
  } catch (error) {
    console.error("Erreur récupération patient:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération du patient"
    };
  }
}

/**
 * Récupère une spécialité de test
 */
export async function getTestSpecialiteId() {
  try {
    const specialite = await prisma.specialite.findFirst({
      select: {
        id: true,
        nom: true,
        description: true
      }
    });

    if (!specialite) {
      return {
        success: false,
        error: "Aucune spécialité trouvée dans la base de données"
      };
    }

    return {
      success: true,
      data: specialite
    };
  } catch (error) {
    console.error("Erreur récupération spécialité:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération de la spécialité"
    };
  }
}

/**
 * Récupère la liste de tous les patients pour un select
 */
export async function getAllPatients() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true
          }
        }
      },
      take: 50,
 
    });

    return {
      success: true,
      data: patients.map(p => ({
        id: p.id,
        nom: p.utilisateur.nom,
        prenom: p.utilisateur.prenom,
        email: p.utilisateur.email,
        label: `${p.utilisateur.prenom} ${p.utilisateur.nom} (${p.utilisateur.email})`
      }))
    };
  } catch (error) {
    console.error("Erreur récupération patients:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des patients",
      data: []
    };
  }
}

/**
 * Récupère la liste de toutes les spécialités
 */
export async function getAllSpecialites() {
  try {
    const specialites = await prisma.specialite.findMany({
      select: {
        id: true,
        nom: true,
        description: true
      },
      orderBy: {
        nom: 'asc'
      }
    });

    return {
      success: true,
      data: specialites
    };
  } catch (error) {
    console.error("Erreur récupération spécialités:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des spécialités",
      data: []
    };
  }
}

