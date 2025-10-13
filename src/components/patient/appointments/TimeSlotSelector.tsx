"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { 
  Clock, 
  MapPin, 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  User,
  Calendar as CalendarIcon,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Medecin, CreneauDisponible } from './PatientAppointmentsPage'
import { getCreneauxDisponibles } from '@/services/medecins/disponibilites'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface TimeSlotSelectorProps {
  medecin: Medecin
  onDateSelect: (date: string) => void
  onCreneauSelect: (creneau: CreneauDisponible) => void
  onBack: () => void
}

// Composant Skeleton pour le chargement
function TimeSlotSkeleton() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-12 rounded-md" />
        ))}
      </div>
    </div>
  )
}

// Composant pour les informations du médecin
function MedecinInfoCard({ medecin, onBack }: { medecin: Medecin; onBack: () => void }) {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="space-y-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Dr. {medecin.prenom} {medecin.nom}
                </h2>
                <p className="text-blue-600 font-medium">{medecin.specialite}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{medecin.hopital.nom}</span>
                </div>
                {medecin.experience && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{medecin.experience} ans d'expérience</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={onBack} className="shrink-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Changer de médecin
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Composant pour les créneaux horaires
function TimeSlotsGrid({ 
  creneaux, 
  selectedCreneau, 
  onCreneauSelect 
}: { 
  creneaux: CreneauDisponible[]
  selectedCreneau: CreneauDisponible | null
  onCreneauSelect: (creneau: CreneauDisponible) => void
}) {
  // Grouper les créneaux par période de la journée
  const groupedSlots = useMemo(() => {
    const morning: CreneauDisponible[] = []
    const afternoon: CreneauDisponible[] = []
    const evening: CreneauDisponible[] = []

    creneaux.forEach(creneau => {
      const hour = parseInt(creneau.heureDebut.split(':')[0])
      if (hour < 12) morning.push(creneau)
      else if (hour < 17) afternoon.push(creneau)
      else evening.push(creneau)
    })

    return { morning, afternoon, evening }
  }, [creneaux])

  const TimeSlotGroup = ({ 
    title, 
    slots,
    icon 
  }: { 
    title: string
    slots: CreneauDisponible[]
    icon: React.ReactNode
  }) => {
    if (slots.length === 0) return null

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <Badge variant="secondary" className="ml-2">
            {slots.length} créneau{slots.length > 1 ? 'x' : ''}
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {slots.map((creneau, index) => (
            <Button
              key={index}
              variant={selectedCreneau?.heureDebut === creneau.heureDebut ? "default" : "outline"}
              className={cn(
                "h-12 transition-all duration-200",
                selectedCreneau?.heureDebut === creneau.heureDebut && "ring-2 ring-blue-500"
              )}
              onClick={() => onCreneauSelect(creneau)}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="font-semibold text-sm">
                  {creneau.heureDebut}
                </span>
                <span className="text-xs text-muted-foreground">
                  {creneau.duree} min
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <TimeSlotGroup
        title="Matin"
        slots={groupedSlots.morning}
        icon={<div className="w-2 h-2 bg-orange-400 rounded-full" />}
      />
      <TimeSlotGroup
        title="Après-midi"
        slots={groupedSlots.afternoon}
        icon={<div className="w-2 h-2 bg-blue-400 rounded-full" />}
      />
      <TimeSlotGroup
        title="Soir"
        slots={groupedSlots.evening}
        icon={<div className="w-2 h-2 bg-purple-400 rounded-full" />}
      />
    </div>
  )
}

export default function TimeSlotSelector({ 
  medecin, 
  onDateSelect, 
  onCreneauSelect, 
  onBack 
}: TimeSlotSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedCreneau, setSelectedCreneau] = useState<CreneauDisponible | null>(null)
  const [creneaux, setCreneaux] = useState<CreneauDisponible[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Dates non disponibles
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 // Désactiver les dimanches
  }

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return

    setSelectedDate(date)
    setSelectedCreneau(null)
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
    setSelectedCreneau(creneau)
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

  // Prochaines dates disponibles (pour suggestions)
  const suggestedDates = useMemo(() => {
    const dates: Date[] = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (!isDateDisabled(date)) {
        dates.push(date)
        if (dates.length >= 3) break
      }
    }
    
    return dates
  }, [])

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Informations du médecin */}
      <MedecinInfoCard medecin={medecin} onBack={onBack} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Colonne de gauche - Calendrier */}
        <div className="xl:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarIcon className="h-5 w-5" />
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
                initialFocus
              />
            </CardContent>
          </Card>

          {/* Dates suggérées */}
          {suggestedDates.length > 0 && (
            <Card>
              <CardHeader className="">
                <CardTitle className="text-sm font-medium">
                  Dates suggérées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedDates.map((date, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleDateSelect(date)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">
                        {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Colonne de droite - Créneaux horaires */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Choisir un horaire
              </CardTitle>
              <CardDescription>
                {selectedDate ? (
                  <span>
                    Créneaux disponibles le{' '}
                    <span className="font-semibold text-gray-900">
                      {formatDate(selectedDate)}
                    </span>
                  </span>
                ) : (
                  'Sélectionnez d\'abord une date'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedDate ? (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Aucune date sélectionnée</p>
                  <p>Veuillez choisir une date dans le calendrier</p>
                </div>
              ) : loading ? (
                <TimeSlotSkeleton />
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : creneaux.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Aucun créneau disponible</p>
                  <p className="mb-4">Le médecin n'a pas de disponibilités pour cette date</p>
                  <Button variant="outline" onClick={() => setSelectedDate(undefined)}>
                    Choisir une autre date
                  </Button>
                </div>
              ) : (
                <TimeSlotsGrid
                  creneaux={creneaux}
                  selectedCreneau={selectedCreneau}
                  onCreneauSelect={handleCreneauClick}
                />
              )}
            </CardContent>
          </Card>

          {/* Résumé de sélection */}
          {(selectedDate && selectedCreneau) && (
            <Card className="bg-green-50 border-green-200 mt-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-900">
                        Créneau sélectionné
                      </p>
                      <p className="text-sm text-green-700">
                        {formatDate(selectedDate)} à {selectedCreneau.heureDebut}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    Prêt à confirmer
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Informations pratiques */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Durée de consultation</p>
                <p className="text-muted-foreground">30 minutes en moyenne</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Lieu</p>
                <p className="text-muted-foreground">{medecin.hopital.adresse}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Médecin</p>
                <p className="text-muted-foreground">
                  {medecin.experience ? `${medecin.experience} ans d'exp.` : 'Expérience confirmée'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}