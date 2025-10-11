"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Clock, MapPin, ArrowLeft, CheckCircle } from 'lucide-react'
import { Medecin, CreneauDisponible } from './PatientAppointmentsPage'
import { getCreneauxDisponibles } from '@/services/medecins/disponibilites'

interface TimeSlotSelectorProps {
  medecin: Medecin
  onDateSelect: (date: string) => void
  onCreneauSelect: (creneau: CreneauDisponible) => void
  onBack: () => void
}

export default function TimeSlotSelector({ 
  medecin, 
  onDateSelect, 
  onCreneauSelect, 
  onBack 
}: TimeSlotSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [creneaux, setCreneaux] = useState<CreneauDisponible[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Dates non disponibles (weekends, jours fériés, etc.)
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 // Désactiver les dimanches
  }

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return

    setSelectedDate(date)
    setLoading(true)
    setError(null)

    try {
      const dateString = date.toISOString().split('T')[0]
      onDateSelect(dateString)

      const result = await getCreneauxDisponibles(
        medecin.id,
        dateString,
        medecin.hopital.id
      )

      if (result.success) {
        setCreneaux(result.data)
      } else {
        setError(result.error || 'Erreur lors de la récupération des créneaux')
      }
    } catch (err) {
      setError('Erreur lors de la récupération des créneaux')
    } finally {
      setLoading(false)
    }
  }

  const handleCreneauClick = (creneau: CreneauDisponible) => {
    onCreneauSelect(creneau)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Informations du médecin */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                Dr. {medecin.prenom} {medecin.nom}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {medecin.hopital.nom} - {medecin.specialite}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Changer de médecin
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sélection de date */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Choisir une date
            </CardTitle>
            <CardDescription>
              Sélectionnez la date de votre consultation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Sélection de créneau */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Choisir un créneau
            </CardTitle>
            <CardDescription>
              {selectedDate 
                ? `Créneaux disponibles le ${formatDate(selectedDate)}`
                : 'Sélectionnez d\'abord une date'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <p>Sélectionnez une date pour voir les créneaux disponibles</p>
              </div>
            ) : loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Chargement des créneaux...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-500 mb-2">⚠️</div>
                <p className="text-red-500">{error}</p>
              </div>
            ) : creneaux.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4" />
                <p>Aucun créneau disponible pour cette date</p>
                <p className="text-sm">Essayez une autre date</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {creneaux.map((creneau, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-12 flex flex-col items-center justify-center space-y-1"
                      onClick={() => handleCreneauClick(creneau)}
                    >
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">
                          {creneau.heureDebut}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {creneau.duree} min
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>
                      {creneaux.length} créneau{creneaux.length > 1 ? 'x' : ''} disponible{creneaux.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Informations supplémentaires */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Durée moyenne: 30 min</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{medecin.hopital.adresse}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Tarif: {medecin.tarif}€
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
