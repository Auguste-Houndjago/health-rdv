"use client"

import { useState, useCallback } from "react"
import { toggleMedecinDisponibilite } from "@/services/medecins/availability-actions"
import { toast } from "sonner"

interface UseMedecinAvailabilityResult {
  toggleAvailability: (isDisponible: boolean) => Promise<boolean>
  loading: boolean
  error: string | null
}

/**
 * Hook client pour gérer la disponibilité du médecin
 * Gère automatiquement l'état de chargement, les erreurs et les notifications
 */
export function useMedecinAvailability(): UseMedecinAvailabilityResult {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleAvailability = useCallback(async (isDisponible: boolean) => {
    setLoading(true)
    setError(null)

    try {
      const result = await toggleMedecinDisponibilite(isDisponible)

      if (result.success) {
        toast.success(result.message || "Disponibilité mise à jour", {
          description: isDisponible 
            ? "Vous apparaissez maintenant dans les recherches des patients"
            : "Vous n'apparaissez plus dans les recherches",
        })
        return true
      } else {
        setError(result.error || "Erreur inconnue")
        toast.error("Erreur", {
          description: result.error || "Impossible de mettre à jour la disponibilité"
        })
        return false
      }
    } catch (err: any) {
      const errorMsg = err?.message || "Erreur lors de la mise à jour"
      setError(errorMsg)
      toast.error("Erreur", {
        description: errorMsg
      })
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    toggleAvailability,
    loading,
    error
  }
}

