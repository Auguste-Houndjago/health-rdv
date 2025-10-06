"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, Clock, Calendar } from 'lucide-react'
import { creerPlanningDisponibilite } from '@/app/actions/disponibilites'
import { toast } from 'sonner'

interface CreneauDisponibilite {
  jour: string
  heureDebut: string
  heureFin: string
  dureeConsultation: number
  pauseEntreConsultations?: number
  actif?: boolean
}

interface DisponibiliteFormProps {
  medecinId: string
  specialiteId: string
}

export default function DisponibiliteForm({ medecinId, specialiteId }: DisponibiliteFormProps) {
  const [creneaux, setCreneaux] = useState<CreneauDisponibilite[]>([
    {
      jour: 'lundi',
      heureDebut: '09:00',
      heureFin: '17:00',
      dureeConsultation: 30,
      pauseEntreConsultations: 10,
      actif: true
    }
  ])
  const [dateDebut, setDateDebut] = useState('')
  const [dateFin, setDateFin] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const joursSemaine = [
    'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'
  ]

  const ajouterCreneau = () => {
    setCreneaux([...creneaux, {
      jour: 'lundi',
      heureDebut: '09:00',
      heureFin: '17:00',
      dureeConsultation: 30,
      pauseEntreConsultations: 10,
      actif: true
    }])
  }

  const supprimerCreneau = (index: number) => {
    if (creneaux.length > 1) {
      setCreneaux(creneaux.filter((_, i) => i !== index))
    }
  }

  const modifierCreneau = (index: number, field: keyof CreneauDisponibilite, value: any) => {
    const nouveauxCreneaux = [...creneaux]
    nouveauxCreneaux[index] = { ...nouveauxCreneaux[index], [field]: value }
    setCreneaux(nouveauxCreneaux)
  }

  const validerEtSauvegarder = async () => {
    setErrors([])
    
    const formData = new FormData()
    formData.append('medecinId', medecinId)
    formData.append('specialiteId', specialiteId)
    formData.append('creneaux', JSON.stringify(creneaux))
    formData.append('dateDebut', dateDebut)
    if (dateFin) {
      formData.append('dateFin', dateFin)
    }

    try {
      const result = await creerPlanningDisponibilite(formData)

      if (!result.success) {
        setErrors(result.errors || ["Erreur inconnue"])
        toast.error("Erreurs de validation détectées")
        return
      }

      toast.success(result.message || "Planning de disponibilité sauvegardé avec succès")
      
      // Réinitialiser le formulaire après succès
      setCreneaux([{
        jour: 'lundi',
        heureDebut: '09:00',
        heureFin: '17:00',
        dureeConsultation: 30,
        pauseEntreConsultations: 10,
        actif: true
      }])
      setDateDebut('')
      setDateFin('')
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
      toast.error("Erreur lors de la sauvegarde")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Gestion des créneaux de disponibilité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Période de validité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateDebut">Date de début *</Label>
            <Input
              id="dateDebut"
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="dateFin">Date de fin (optionnel)</Label>
            <Input
              id="dateFin"
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
        </div>

        {/* Créneaux */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Créneaux horaires</h3>
            <Button onClick={ajouterCreneau} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un créneau
            </Button>
          </div>

          {creneaux.map((creneau, index) => (
            <Card key={index} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Jour */}
                <div>
                  <Label>Jour de la semaine</Label>
                  <Select
                    value={creneau.jour}
                    onValueChange={(value) => modifierCreneau(index, 'jour', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {joursSemaine.map(jour => (
                        <SelectItem key={jour} value={jour}>
                          {jour.charAt(0).toUpperCase() + jour.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Heure de début */}
                <div>
                  <Label>Heure de début</Label>
                  <Input
                    type="time"
                    value={creneau.heureDebut}
                    onChange={(e) => modifierCreneau(index, 'heureDebut', e.target.value)}
                  />
                </div>

                {/* Heure de fin */}
                <div>
                  <Label>Heure de fin</Label>
                  <Input
                    type="time"
                    value={creneau.heureFin}
                    onChange={(e) => modifierCreneau(index, 'heureFin', e.target.value)}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-end">
                  {creneaux.length > 1 && (
                    <Button
                      onClick={() => supprimerCreneau(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Durée de consultation */}
                <div>
                  <Label>Durée consultation (min)</Label>
                  <Input
                    type="number"
                    min="15"
                    max="120"
                    value={creneau.dureeConsultation}
                    onChange={(e) => modifierCreneau(index, 'dureeConsultation', parseInt(e.target.value))}
                  />
                </div>

                {/* Pause entre consultations */}
                <div>
                  <Label>Pause entre consultations (min)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="60"
                    value={creneau.pauseEntreConsultations || 0}
                    onChange={(e) => modifierCreneau(index, 'pauseEntreConsultations', parseInt(e.target.value))}
                  />
                </div>

                {/* Statut actif */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`actif-${index}`}
                    checked={creneau.actif || false}
                    onChange={(e) => modifierCreneau(index, 'actif', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor={`actif-${index}`}>Créneau actif</Label>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Affichage des erreurs */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h4 className="text-red-800 font-semibold mb-2">Erreurs de validation :</h4>
            <ul className="list-disc list-inside text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setCreneaux([{
            jour: 'lundi',
            heureDebut: '09:00',
            heureFin: '17:00',
            dureeConsultation: 30,
            pauseEntreConsultations: 10,
            actif: true
          }])}>
            Réinitialiser
          </Button>
          <Button onClick={validerEtSauvegarder} className="bg-blue-600 hover:bg-blue-700">
            <Clock className="h-4 w-4 mr-2" />
            Sauvegarder le planning
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
