import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Stethoscope,
  Calendar,
  Phone
} from "lucide-react"
import HospitalStats from "@/components/hopital/HospitalStats"
import HopitalHeader from "@/components/hopital/HopitalHeader"
import { getHopitalInfoBySlugWithMedecins } from "@/services/hopitaux"
import NoiseOverlay from "@/components/design/NoiseOverlay"
import { HopitalMedecinCard } from "@/components/hopital/HopitalMedecinCard"

interface HopitalPageProps {
  params: {
    slug: string
  }
}

export default async function HopitalPage({ params }: HopitalPageProps) {
  const { slug } = await params 

  try {
    const hopital = await getHopitalInfoBySlugWithMedecins({slug});

    if (!hopital) {
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Veuillez recharger la page</h1>
      </div>
    }

    return (
      <div className="flex relative flex-col min-h-screen  mx-auto py-6 px-4 lg:px-20  space-y-6">
                <NoiseOverlay intensity={18} blendMode="difference" />
        {/* En-tête */}
        <HopitalHeader
          slug={slug}
          nom={hopital.nom}
          description={hopital.description}
          adresse={hopital.adresse}
          contact={hopital.contact}
          url={hopital.url}
          image={hopital.image}
          verified={true}
        />

        {/* Statistiques */}
        <HospitalStats
        stats={{
          medecins: hopital._count.medecin,
          specialites: hopital._count.specialites,
          rendezvous: hopital._count.rendevous,
          patients: hopital._count.utilisateurHopitals,
        }}
      />

        {/* Spécialités et Médecins */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2" />
                Spécialités disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hopital.specialites.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{s.nom}</h3>
                    {s.description && (
                      <p className="text-sm text-gray-600">{s.description}</p>
                    )}
                  </div>
                  <Badge variant="outline">{s.nom}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
{/* MEDECINS */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Médecins disponibles ({hopital.medecin.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hopital.medecin.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>Aucun médecin disponible pour le moment</p>
                </div>
              ) : (
                hopital.medecin.map(({ medecin }, index) => (
                  <HopitalMedecinCard
                    key={medecin.id}
                    medecin={{
                      id: medecin.id,
                      nom: medecin.utilisateur.nom,
                      prenom: medecin.utilisateur.prenom || '',
                      avatarUrl: medecin.utilisateur.avatarUrl,
                      specialite: medecin.specialite.nom,
                      anneeExperience: medecin.anneeExperience,
                      titre: medecin.titre
                    }}
                    index={index}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

 
      </div>
    )
  } catch (error) {
    console.error("Erreur lors du chargement de l'hôpital:", error)
    return (
      <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Veuillez recharger la page</h1>
    </div>
    )
  }
}
