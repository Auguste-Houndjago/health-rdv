"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react'
import { RendezVousPatient } from './PatientAppointmentsPage'
import { getRendezVousPatient, annulerRendezVousPatient } from '@/services/patients/rendez-vous'

export default function PatientAppointmentsList() {
  const [rendezVous, setRendezVous] = useState<RendezVousPatient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRendezVous()
  }, [])

  const loadRendezVous = async () => {
    try {
      setLoading(true)
      const result = await getRendezVousPatient()
      
      if (result.success) {
        setRendezVous(result.data)
      } else {
        setError(result.error || 'Erreur lors du chargement')
      }
    } catch (err) {
      setError('Erreur lors du chargement des rendez-vous')
    } finally {
      setLoading(false)
    }
  }

  const handleAnnulerRendezVous = async (rendezVousId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      return
    }

    try {
      const result = await annulerRendezVousPatient(rendezVousId)
      
      if (result.success) {
        await loadRendezVous() // Recharger la liste
      } else {
        setError(result.error || 'Erreur lors de l\'annulation')
      }
    } catch (err) {
      setError('Erreur lors de l\'annulation du rendez-vous')
    }
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'CONFIRME':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Confirmé</Badge>
      case 'EN_ATTENTE':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertCircle className="h-3 w-3 mr-1" />En attente</Badge>
      case 'ANNULE':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Annulé</Badge>
      case 'TERMINE':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" />Terminé</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5)
  }

  const rendezVousFuturs = rendezVous.filter(rdv => 
    new Date(rdv.date) >= new Date() && rdv.statut !== 'ANNULE' && rdv.statut !== 'TERMINE'
  )

  const rendezVousPasses = rendezVous.filter(rdv => 
    new Date(rdv.date) < new Date() || rdv.statut === 'ANNULE' || rdv.statut === 'TERMINE'
  )

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Chargement de vos rendez-vous...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-500">{error}</p>
          <Button onClick={loadRendezVous} className="mt-4">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Mes Rendez-vous</h2>
        <p className="text-muted-foreground">
          Gérez vos consultations médicales
        </p>
      </div>

      <Tabs defaultValue="futurs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="futurs">
            Rendez-vous à venir ({rendezVousFuturs.length})
          </TabsTrigger>
          <TabsTrigger value="passes">
            Historique ({rendezVousPasses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="futurs" className="space-y-4">
          {rendezVousFuturs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun rendez-vous à venir</h3>
                <p className="text-muted-foreground">
                  Vous n'avez pas de rendez-vous programmé
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rendezVousFuturs.map((rdv) => (
                <Card key={rdv.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          Dr. {rdv.medecin.prenom} {rdv.medecin.nom}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {rdv.medecin.hopital.nom}
                        </CardDescription>
                      </div>
                      {getStatusBadge(rdv.statut)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(rdv.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatTime(rdv.heure)} ({rdv.duree} min)</span>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium">Motif:</p>
                      <p className="text-muted-foreground">{rdv.motif}</p>
                    </div>
                    
                    {rdv.notes && (
                      <div className="text-sm">
                        <p className="font-medium">Notes:</p>
                        <p className="text-muted-foreground">{rdv.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline">
                        {rdv.medecin.specialite}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {rdv.statut === 'CONFIRME' && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleAnnulerRendezVous(rdv.id)}
                          >
                            Annuler
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="passes" className="space-y-4">
          {rendezVousPasses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun historique</h3>
                <p className="text-muted-foreground">
                  Vous n'avez pas encore de rendez-vous passés
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rendezVousPasses.map((rdv) => (
                <Card key={rdv.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">
                          Dr. {rdv.medecin.prenom} {rdv.medecin.nom}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {rdv.medecin.hopital.nom}
                        </CardDescription>
                      </div>
                      {getStatusBadge(rdv.statut)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(rdv.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatTime(rdv.heure)} ({rdv.duree} min)</span>
                    </div>
                    
                    <div className="text-sm">
                      <p className="font-medium">Motif:</p>
                      <p className="text-muted-foreground">{rdv.motif}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline">
                        {rdv.medecin.specialite}
                      </Badge>
                      
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
