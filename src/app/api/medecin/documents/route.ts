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
      where: { userId: user.id }
    })

    if (!medecin) {
      return NextResponse.json({ error: "Profil médecin non trouvé" }, { status: 404 })
    }

    // Récupérer les documents des patients qui ont eu des rendez-vous avec ce médecin
    const documents = await prisma.document.findMany({
      where: {
        patient: {
          rendezVous: {
            some: {
              medecinId: medecin.id
            }
          }
        }
      },
      include: {
        patient: {
          include: {
            utilisateur: {
              select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                telephone: true
              }
            }
          }
        }
      },
      orderBy: { dateCreation: 'desc' }
    })

    // Pour chaque document, récupérer les rendez-vous du patient avec ce médecin
    const documentsWithRendezVous = await Promise.all(
      documents.map(async (doc) => {
        const rendezVous = await prisma.rendezVous.findMany({
          where: {
            patientId: doc.patientId,
            medecinId: medecin.id
          },
          select: {
            id: true,
            date: true,
            statut: true,
            motif: true
          },
          orderBy: { date: 'desc' }
        })

        return {
          id: doc.id,
          titre: doc.titre,
          description: doc.description,
          url: doc.url,
          dateCreation: doc.dateCreation,
          type: doc.url.split('.').pop()?.toLowerCase(),
          size: null, // Taille non stockée actuellement
          patient: {
            id: doc.patient.id,
            nom: doc.patient.utilisateur.nom,
            prenom: doc.patient.utilisateur.prenom,
            email: doc.patient.utilisateur.email,
            telephone: doc.patient.utilisateur.telephone
          },
          rendezVous: rendezVous.map(rdv => ({
            id: rdv.id,
            date: rdv.date,
            statut: rdv.statut,
            motif: rdv.motif
          }))
        }
      })
    )

    return NextResponse.json({ 
      success: true, 
      documents: documentsWithRendezVous
    })

  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
