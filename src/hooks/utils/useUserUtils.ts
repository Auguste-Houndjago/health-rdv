// hooks/useUserUtils.ts
"use client"

import { useUserContext } from '@/providers/UserProvider'

// Hook pour vérifier les rôles
export function useUserRole() {
  const { user } = useUserContext()
  
  return {
    isAdmin: user?.role === 'ADMIN',
    isMedecin: user?.role === 'MEDECIN',
    isPatient: user?.role === 'PATIENT',
    isGuest: user?.role === 'GUEST',
    hasRole: (role: string) => user?.role === role,
    hasAnyRole: (roles: string[]) => roles.includes(user?.role || ''),
  }
}

// Hook pour les informations d'organisation
export function useUserOrganization() {
  const { user } = useUserContext()
  
  return {
    organization: user?.hopital,
    organizationSlug: user?.hopital?.slug,
    isInOrganization: (orgSlug: string) => user?.hopital?.slug === orgSlug,
    organizations: user?.hopitaux || [],
  }
}

// Hook pour les permissions
export function useUserPermissions() {
  const { user } = useUserContext()
  
  const can = {
    // Exemples de permissions basées sur le rôle
    viewDashboard: ['ADMIN', 'MEDECIN', 'PATIENT'].includes(user?.role || ''),
    manageUsers: ['ADMIN'].includes(user?.role || ''),
    viewMedicalData: ['ADMIN', 'MEDECIN'].includes(user?.role || ''),
    editProfile: ['ADMIN', 'MEDECIN', 'PATIENT'].includes(user?.role || ''),
  }
  
  return can
}