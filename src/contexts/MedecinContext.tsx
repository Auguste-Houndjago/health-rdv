// contexts/MedecinContext.tsx
'use client'

import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import { useMedecinStore } from '@/stores/medecinStore'

interface MedecinContextType {
  medecin: any | null
  hopital: any | null
  patientId: string | null
  isLoading: boolean
  setMedecinData: (data: { medecin: any; hopital: any; patientId: string }) => void
}

const MedecinContext = createContext<MedecinContextType | undefined>(undefined)

export function MedecinProvider({ 
  children, 
  initialData 
}: { 
  children: ReactNode
  initialData: {
    medecin: any
    hopital: any
    patientId: string
  }
}) {
  const { medecin, hopital, patientId, setMedecinData } = useMedecinStore()

  // Initialiser les données au montage
  useEffect(() => {
    if (initialData) {
      setMedecinData(initialData)
    }
  }, [initialData, setMedecinData])

  const value = {
    medecin,
    hopital,
    patientId,
    isLoading: !medecin && !initialData,
    setMedecinData
  }

  return (
    <MedecinContext.Provider value={value}>
      {children}
    </MedecinContext.Provider>
  )
}

export function useMedecin() {
  const context = useContext(MedecinContext)
  if (context === undefined) {
    throw new Error('useMedecin must be used within a MedecinProvider')
  }
  return context
}