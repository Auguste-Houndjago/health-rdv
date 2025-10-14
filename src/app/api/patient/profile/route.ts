import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    if (user.role !== "PATIENT") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Récupérer le patient
    const patient = await prisma.patient.findUnique({
      where: { userId: user.id },
      include: {
        utilisateur: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
            telephone: true,
            avatarUrl: true
          }
        }
      }
    })

    if (!patient) {
      return NextResponse.json({ error: "Profil patient non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      id: patient.id,
      utilisateur: patient.utilisateur,
      adresse: patient.adresse,
      groupeSanguin: patient.groupeSanguin,
      poids: patient.poids,
      taille: patient.taille,
      sexe: patient.sexe
    })

  } catch (error) {
    console.error("Erreur lors de la récupération du profil patient:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
