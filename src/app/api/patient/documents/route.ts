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
      where: { userId: user.id }
    })

    if (!patient) {
      return NextResponse.json({ error: "Profil patient non trouvé" }, { status: 404 })
    }

    // Récupérer les documents du patient
    const documents = await prisma.document.findMany({
      where: { patientId: patient.id },
      orderBy: { dateCreation: 'desc' }
    })

    return NextResponse.json({ 
      success: true, 
      documents: documents.map(doc => ({
        id: doc.id,
        titre: doc.titre,
        description: doc.description,
        url: doc.url,
        dateCreation: doc.dateCreation,
        type: doc.url.split('.').pop()?.toLowerCase(),
        size: null // Taille non stockée actuellement
      }))
    })

  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserInfo({ cache: false })
    
    if (!user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 })
    }

    if (user.role !== "PATIENT") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const body = await request.json()
    const { titre, description, url } = body

    // Récupérer le patient
    const patient = await prisma.patient.findUnique({
      where: { userId: user.id }
    })

    if (!patient) {
      return NextResponse.json({ error: "Profil patient non trouvé" }, { status: 404 })
    }

    // Créer le document
    const document = await prisma.document.create({
      data: {
        titre,
        description,
        url,
        patientId: patient.id
      }
    })

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
    console.error("Erreur lors de la création du document:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
