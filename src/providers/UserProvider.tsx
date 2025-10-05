// providers/UserProvider.tsx
"use client"

import { createContext, useContext, useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import type { UserInfo } from '@/types/user'

interface UserContextType {
  user: Partial<UserInfo> | null
  isLoading: boolean
  isAuthenticated: boolean
  error: Error | null
  refresh: () => Promise<Partial<UserInfo> | null>
  invalidate: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const {
    user,
    isLoading,
    error,
    isAuthenticated,
    refresh,
    invalidate,
  } = useUser()

  // Optionnel: Précharger les données utilisateur au montage
  useEffect(() => {
    // Vous pouvez ajouter du logging ou du monitoring ici
    if (error) {
      console.error('Erreur chargement utilisateur:', error)
    }
  }, [error])

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated,
    refresh,
    invalidate,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// Hook pour utiliser le contexte utilisateur
export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}