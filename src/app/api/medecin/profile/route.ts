import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    if (user.role !== "MEDECIN") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Récupérer le médecin
    const medecin = await prisma.medecin.findUnique({
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
        },
        specialite: {
          select: {
            id: true,
            nom: true,
            description: true
          }
        }
      }
    })

    if (!medecin) {
      return NextResponse.json({ error: "Profil médecin non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      id: medecin.id,
      utilisateur: medecin.utilisateur,
      specialite: medecin.specialite,
      isDisponible: medecin.isDisponible
    })

  } catch (error) {
    console.error("Erreur lors de la récupération du profil médecin:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
