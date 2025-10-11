"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowLeft, 
  CheckCircle, 
  Euro,
  FileText
} from 'lucide-react'
import { Medecin, CreneauDisponible } from './PatientAppointmentsPage'
import { creerRendezVousPatient } from '@/services/patients/rendez-vous'

interface AppointmentConfirmationProps {
  medecin: Medecin
  date: string
  creneau: CreneauDisponible
  motif: string
  onMotifChange: (motif: string) => void
  onConfirm: () => void
  onBack: () => void
}

export default function AppointmentConfirmation({
  medecin,
  date,
  creneau,
  motif,
  onMotifChange,
  onConfirm,
  onBack
}: AppointmentConfirmationProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleConfirm = async () => {
    if (!motif.trim()) {
      setError('Veuillez indiquer le motif de votre consultation')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await creerRendezVousPatient({
        medecinId: medecin.id,
        date,
        heure: creneau.heureDebut,
        duree: creneau.duree,
        motif: motif.trim(),
        hopitalId: medecin.hopital.id
      })

      if (result.success) {
        onConfirm()
      } else {
        setError(result.error || 'Erreur lors de la création du rendez-vous')
      }
    } catch (err) {
      setError('Erreur lors de la création du rendez-vous')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Récapitulatif du rendez-vous */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Confirmation du Rendez-vous
          </CardTitle>
          <CardDescription>
            Vérifiez les détails de votre consultation avant de confirmer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Informations du médecin */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">
                Dr. {medecin.prenom} {medecin.nom}
              </h3>
              <p className="text-muted-foreground">{medecin.specialite}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {medecin.hopital.nom}
                </span>
              </div>
            </div>
            <Badge variant="secondary">
              {medecin.note}/5 ⭐
            </Badge>
          </div>

          <Separator />

          {/* Date et heure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Heure</p>
                <p className="text-sm text-muted-foreground">
                  {creneau.heureDebut} - {creneau.heureFin}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informations financières */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Euro className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Tarif de la consultation</span>
            </div>
            <Badge variant="outline" className="text-lg font-semibold">
              {medecin.tarif}€
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire de détails */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Détails de la Consultation
          </CardTitle>
          <CardDescription>
            Ajoutez des informations utiles pour votre médecin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="motif">Motif de la consultation *</Label>
            <Input
              id="motif"
              placeholder="Décrivez brièvement le motif de votre consultation..."
              value={motif}
              onChange={(e) => onMotifChange(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Ex: Consultation de routine, douleur, suivi...
            </p>
          </div>

        </CardContent>
      </Card>

      {/* Informations importantes */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-amber-800">Informations importantes</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Votre rendez-vous sera confirmé par email</li>
              <li>• Vous recevrez un rappel 24h avant la consultation</li>
              <li>• Arrivez 15 minutes avant l'heure prévue</li>
              <li>• Apportez votre carte vitale et pièce d'identité</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Modifier le créneau
        </Button>

        <div className="flex items-center gap-4">
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <Button 
            onClick={handleConfirm}
            disabled={loading || !motif.trim()}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Confirmation...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirmer le rendez-vous
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
