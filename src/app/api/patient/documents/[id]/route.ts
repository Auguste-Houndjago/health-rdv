import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserInfo } from "@/services/users"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      where: { userId: user.id }
    })

    if (!patient) {
      return NextResponse.json({ error: "Profil patient non trouvé" }, { status: 404 })
    }

    // Vérifier que le document appartient au patient
    const document = await prisma.document.findFirst({
      where: {
        id: params.id,
        patientId: patient.id
      }
    })

    if (!document) {
      return NextResponse.json({ error: "Document non trouvé" }, { status: 404 })
    }

    // Supprimer le document
    await prisma.document.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ 
      success: true, 
      message: "Document supprimé avec succès" 
    })

  } catch (error) {
    console.error("Erreur lors de la suppression du document:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      where: { userId: user.id }
    })

    if (!patient) {
      return NextResponse.json({ error: "Profil patient non trouvé" }, { status: 404 })
    }

    // Récupérer le document
    const document = await prisma.document.findFirst({
      where: {
        id: params.id,
        patientId: patient.id
      }
    })

    if (!document) {
      return NextResponse.json({ error: "Document non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      document: {
        id: document.id,
        titre: document.titre,
        description: document.description,
        url: document.url,
        dateCreation: document.dateCreation
      }
    })

  } catch (error) {
    console.error("Erreur lors de la récupération du document:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
