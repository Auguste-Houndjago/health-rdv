import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Stethoscope,
  Calendar
} from "lucide-react"

interface HopitalPageProps {
  params: {
    slug: string
  }
}

export default async function HopitalPage({ params }: HopitalPageProps) {
  const { slug } = params 

  try {
    const hopital = await prisma.hopital.findUnique({
      where: { slug },
      include: {
        specialites: true,
        medecin: {
          include: {
            medecin: {
              include: {
                utilisateur: true,
                specialite: true
              }
            }
          }
        },
        _count: {
          select: {
            medecin: true,
            specialites: true,
            utilisateurHopitals: true,
            rendevous: true
          }
        }
      }
    })

    if (!hopital) {
      notFound()
    }

    return (
      <div className="container mx-auto py-6">
        {/* En-tête */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {hopital.nom}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{hopital.description}</p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {hopital.adresse}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {hopital.contact}
              </div>
              {hopital.url && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={hopital.url} className="hover:underline">
                    Site web
                  </a>
                </div>
              )}
            </div>
          </div>
          {hopital.image && (
            <img
              src={hopital.image}
              alt={hopital.nom}
              className="w-32 h-32 object-cover rounded-lg ml-6"
            />
          )}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Médecins</p>
                <p className="text-2xl font-bold">{hopital._count.medecin}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <Stethoscope className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Spécialités</p>
                <p className="text-2xl font-bold">{hopital._count.specialites}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <Calendar className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Rendez-vous</p>
                <p className="text-2xl font-bold">{hopital._count.rendevous}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <Building2 className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Patients</p>
                <p className="text-2xl font-bold">{hopital._count.utilisateurHopitals}</p>
              </div>
            </CardContent>
          </Card>
        </div>

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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Médecins disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hopital.medecin.map(({ medecin }) => (
                <div key={medecin.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">
                      Dr. {medecin.utilisateur.prenom} {medecin.utilisateur.nom}
                    </h3>
                    <p className="text-sm text-gray-600">{medecin.specialite.nom}</p>
                    <p className="text-xs text-gray-500">
                      {medecin.anneeExperience
                        ? `${medecin.anneeExperience} ans d'expérience`
                        : "Expérience non spécifiée"}
                    </p>
                  </div>
                  <Badge variant="outline">{medecin.specialite.nom}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button size="lg">
            <Calendar className="h-4 w-4 mr-2" />
            Prendre rendez-vous
          </Button>
          <Button variant="outline" size="lg">
            <Phone className="h-4 w-4 mr-2" />
            Nous contacter
          </Button>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Erreur lors du chargement de l'hôpital:", error)
    notFound()
  }
}
