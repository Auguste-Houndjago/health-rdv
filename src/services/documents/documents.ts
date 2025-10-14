// services/documents.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateDocumentInput {
  titre: string;
  description?: string;
  url: string;
  patientId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

export async function createDocument(input: CreateDocumentInput) {
  try {
    // ✅ Vérifier que le patient existe
    const patient = await prisma.patient.findUnique({
      where: { id: input.patientId },
      include: { utilisateur: true }
    });

    if (!patient) {
      return {
        success: false,
        error: "Patient non trouvé"
      };
    }

    // ✅ Créer le document en base
    const document = await prisma.document.create({
      data: {
        titre: input.titre,
        description: input.description,
        url: input.url,
        patientId: input.patientId,
       
        // Vous pouvez ajouter des champs supplémentaires si besoin
      },
      include: {
        patient: {
          include: {
            utilisateur: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        }
      }
    });

    // ✅ Revalider le cache pour les pages concernées
    revalidatePath("/patient/documents");
    revalidatePath("/medecin/patient/[id]", "page");

    return {
      success: true,
      document
    };

  } catch (error) {
    console.error("Erreur création document:", error);
    return {
      success: false,
      error: "Erreur lors de la création du document"
    };
  }
}

/**
 * Récupérer les documents d'un patient
 */
export async function getPatientDocuments(patientId: string) {
  try {
    const documents = await prisma.document.findMany({
      where: { patientId },
      orderBy: { 
        dateCreation: 'desc' 
      },
      include: {
        patient: {
          include: {
            utilisateur: {
              select: {
                nom: true,
                prenom: true
              }
            }
          }
        }
      }
    });

    return {
      success: true,
      documents
    };

  } catch (error) {
    console.error("Erreur récupération documents:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des documents",
      documents: []
    };
  }
}