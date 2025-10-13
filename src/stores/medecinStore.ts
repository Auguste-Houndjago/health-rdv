// stores/medecinStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MedecinData {
  id: string
  hopitalSlug?: string
  utilisateur: {
    id: string
    prenom: string
    nom: string
  }
  specialite: {
    nom: string
    description: string
  }
}

interface HopitalData {
  id: string
  nom: string
  slug: string
}

interface MedecinState {
  // Données actuelles
  medecin: MedecinData | null
  hopital: HopitalData | null
  patientId: string | null
  
  // Cache avec timestamp
  cache: Record<string, {
    data: {
      medecin: MedecinData
      hopital: HopitalData
      patientId: string
    }
    timestamp: number
  }>
  
  // Actions
  setMedecinData: (data: { medecin: MedecinData; hopital: HopitalData; patientId: string }) => void
  getCachedData: (key: string) => { medecin: MedecinData; hopital: HopitalData; patientId: string } | null
  clearCache: () => void
  clearExpiredCache: () => void
}

export const useMedecinStore = create<MedecinState>()(
  persist(
    (set, get) => ({
      medecin: null,
      hopital: null,
      patientId: null,
      cache: {},

      setMedecinData: (data) => {
        const cacheKey = `medecin-${data.medecin.id}-${data.hopital?.slug || 'default'}`
        
        set({
          medecin: data.medecin,
          hopital: data.hopital,
          patientId: data.patientId,
          cache: {
            ...get().cache,
            [cacheKey]: {
              data,
              timestamp: Date.now()
            }
          }
        })

        // Nettoyer le cache périodiquement
        get().clearExpiredCache()
      },

      getCachedData: (key: string) => {
        const cached = get().cache[key]
        if (!cached) return null

        // Vérifier si le cache est encore valide (5 minutes)
        const isExpired = Date.now() - cached.timestamp > 5 * 60 * 1000
        if (isExpired) {
          // Supprimer l'entrée expirée
          const newCache = { ...get().cache }
          delete newCache[key]
          set({ cache: newCache })
          return null
        }

        return cached.data
      },

      clearCache: () => {
        set({ cache: {} })
      },

      clearExpiredCache: () => {
        const { cache } = get()
        const now = Date.now()
        const newCache = { ...cache }

        Object.keys(newCache).forEach(key => {
          if (now - newCache[key].timestamp > 5 * 60 * 1000) { // 5 minutes
            delete newCache[key]
          }
        })

        if (Object.keys(newCache).length !== Object.keys(cache).length) {
          set({ cache: newCache })
        }
      }
    }),
    {
      name: 'medecin-storage',
      // Seul le cache est persisté dans le localStorage
      partialize: (state) => ({ cache: state.cache })
    }
  )
)