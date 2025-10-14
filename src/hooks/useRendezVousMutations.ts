"use client"

import { useState } from 'react'
import { toast } from 'sonner'
import { creerRendezVousPatient, modifierRendezVousPatient, annulerRendezVousPatient } from '@/services/patients/rendez-vous'

interface CreateRendezVousParams {
  medecinId: string
  date: string
  heure: string
  duree: number
  motif: string
  hopitalId: string
}

interface UpdateRendezVousParams {
  rendezVousId: string
  date: string
  heure: string
  duree: number
  motif: string
}

interface CancelRendezVousParams {
  rendezVousId: string
}

export function useRendezVousMutations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createRendezVous = async (params: CreateRendezVousParams) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await creerRendezVousPatient(params)
      
      if (result.success) {
        // Notification d'envoi d'emails
        toast.info("📧 Notifications envoyées a votre addresse email", {
          description: "Des emails de confirmation ont été envoyés à vous et au médecin",
          duration: 4000,
        })
        
        return { success: true, data: result.data }
      } else {
        setError(result.error || 'Erreur lors de la création du rendez-vous')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMsg = 'Erreur lors de la création du rendez-vous'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const updateRendezVous = async (params: UpdateRendezVousParams) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await modifierRendezVousPatient(params)
      
      if (result.success) {
        // Notification d'envoi d'emails
        toast.info("📧 Notifications de modification envoyées a votre addresse email", {
          description: "Des emails ont été envoyés pour informer de la modification du rendez-vous",
          duration: 4000,
        })
        
        return { success: true, data: result.data }
      } else {
        setError(result.error || 'Erreur lors de la modification du rendez-vous')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMsg = 'Erreur lors de la modification du rendez-vous'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const cancelRendezVous = async (params: CancelRendezVousParams) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await annulerRendezVousPatient(params.rendezVousId)
      
      if (result.success) {
        // Notification d'envoi d'emails
        toast.info("📧 Notifications d'annulation envoyées a votre addresse email", {
          description: "Des emails ont été envoyés pour informer de l'annulation du rendez-vous",
          duration: 4000,
        })
        
        return { success: true, data: result }
      } else {
        setError(result.error || 'Erreur lors de l\'annulation du rendez-vous')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMsg = 'Erreur lors de l\'annulation du rendez-vous'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  return {
    createRendezVous,
    updateRendezVous,
    cancelRendezVous,
    loading,
    error,
    clearError: () => setError(null)
  }
}

