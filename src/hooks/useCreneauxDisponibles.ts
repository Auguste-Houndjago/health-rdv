"use client"

import { useState, useCallback } from 'react'
import { TimeSlot } from '@/components/patient/appointments/SimpleTimeSlotSelector'

interface UseCreneauxDisponiblesParams {
  medecinId: string
  hopitalSlug?: string
}

interface CreneauHoraire {
  jour: string
  heureDebut: string
  heureFin: string
  dureeConsultation: number
  pauseEntreConsultations: number
}

export function useCreneauxDisponibles({ medecinId, hopitalSlug }: UseCreneauxDisponiblesParams) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Génère les créneaux horaires disponibles pour une date donnée
   * en tenant compte du planning du médecin et de ses rendez-vous existants
   */
  const getCreneauxForDate = useCallback(async (
    date: Date,
    planning: CreneauHoraire[],
    rendezVousExistants: { date: Date }[]
  ): Promise<TimeSlot[]> => {
    setLoading(true)
    setError(null)

    try {
      const joursSemaine = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI']
      const jourSelectionne = joursSemaine[date.getDay()]

      // Trouver les créneaux configurés pour ce jour
      const creneauxDuJour = planning.filter(c => c.jour === jourSelectionne)

      if (creneauxDuJour.length === 0) {
        return []
      }

      // Générer tous les créneaux possibles
      const creneauxDisponibles: TimeSlot[] = []

      for (const creneau of creneauxDuJour) {
        const [heureDebut, minuteDebut] = creneau.heureDebut.split(':').map(Number)
        const [heureFin, minuteFin] = creneau.heureFin.split(':').map(Number)

        let currentMinutes = heureDebut * 60 + minuteDebut
        const finMinutes = heureFin * 60 + minuteFin

        while (currentMinutes + creneau.dureeConsultation <= finMinutes) {
          const heureDebutStr = `${Math.floor(currentMinutes / 60).toString().padStart(2, '0')}:${(currentMinutes % 60).toString().padStart(2, '0')}`
          const heureFinMinutes = currentMinutes + creneau.dureeConsultation
          const heureFinStr = `${Math.floor(heureFinMinutes / 60).toString().padStart(2, '0')}:${(heureFinMinutes % 60).toString().padStart(2, '0')}`

          // Vérifier si ce créneau n'est pas déjà pris
          const dateTimeDebut = new Date(date)
          const [h, m] = heureDebutStr.split(':').map(Number)
          dateTimeDebut.setHours(h, m, 0, 0)

          const estPris = rendezVousExistants.some(rdv => {
            const rdvDate = new Date(rdv.date)
            return Math.abs(rdvDate.getTime() - dateTimeDebut.getTime()) < 60000 // 1 minute de tolérance
          })

          if (!estPris) {
            creneauxDisponibles.push({
              heureDebut: heureDebutStr,
              heureFin: heureFinStr,
              duree: creneau.dureeConsultation
            })
          }

          currentMinutes += creneau.dureeConsultation + creneau.pauseEntreConsultations
        }
      }

      return creneauxDisponibles
    } catch (err) {
      setError('Erreur lors du calcul des créneaux')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    getCreneauxForDate,
    loading,
    error
  }
}

