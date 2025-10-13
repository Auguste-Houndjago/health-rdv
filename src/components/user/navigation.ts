// navigation.ts
import { UserRoles } from '@/types/user'

// Import des icônes Lucide
import { 
  LayoutDashboard,
  Users,
  Hospital,
  Stethoscope,
  Calendar,
  BarChart3,
  Home,
  CalendarPlus,
  ListChecks,
  User,
  LogIn,
  UserPlus,
  Building,
  ClipboardList,
  Clock,
  CheckCircle
} from 'lucide-react'

export type UserRole = keyof typeof UserRoles
// icon-types.ts
import { LucideIcon } from 'lucide-react'

export type IconType = LucideIcon

export interface NavigationItem {
  label: string
  href: string
  icon?: IconType
  children?: NavigationItem[]
  requiresAuth?: boolean
}


export const navigationConfig: Record<UserRole, NavigationItem[]> = {
  ADMIN: [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Utilisateurs',
      href: '/admin/utilisateurs',
      icon: Users
    },
    {
      label: 'Hôpitaux',
      href: '/admin/hopitaux',
      icon: Hospital
    },
    {
      label: 'Médecins',
      href: '/admin/medecins',
      icon: Stethoscope
    },
    {
      label: 'Rendez-vous',
      href: '/admin/rendez-vous',
      icon: Calendar
    },
    {
      label: 'Statistiques',
      href: '/admin/statistiques',
      icon: BarChart3
    }
  ],
  MEDECIN: [
    {
      label: 'Dashboard',
      href: '/medecin',
      icon: LayoutDashboard
    },
    {
      label: 'Mes Patients',
      href: '/medecin/patients',
      icon: Users
    },
    {
      label: 'Rendez-vous',
      href: '/medecin/rendez-vous',
      icon: Clock
    },
  ],
  PATIENT: [
    {
      label: 'Accueil',
      href: '/',
      icon: Home
    },
    {
      label: 'Mes Rendez-vous',
      href: '/patient/rendez-vous',
      icon: ClipboardList
    },
  ],
  GUEST: [
    {
      label: 'Accueil',
      href: '/',
      icon: Home,
      requiresAuth: false
    },
    
    {
      label: 'Connexion',
      href: '/auth/login',
      icon: LogIn,
      requiresAuth: false
    },
  ]
}

// Fonction utilitaire pour obtenir les routes par rôle
export function getNavigationByRole(role: UserRole): NavigationItem[] {
  return navigationConfig[role] || navigationConfig.GUEST
}

// Fonction pour obtenir toutes les routes accessibles (inclut GUEST + rôle spécifique)
export function getAllAccessibleRoutes(role: UserRole): NavigationItem[] {
  const guestRoutes = navigationConfig.GUEST.filter(item => !item.requiresAuth)
  const roleRoutes = navigationConfig[role] || []
  
  // Fusionner et dédupliquer par href
  const allRoutes = [...guestRoutes, ...roleRoutes]
  const uniqueRoutes = allRoutes.filter((route, index, self) => 
    index === self.findIndex(r => r.href === route.href)
  )
  
  return uniqueRoutes
}

// Fonction pour vérifier si une route est accessible pour un rôle
export function isRouteAccessible(href: string, role: UserRole): boolean {
  const accessibleRoutes = getAllAccessibleRoutes(role)
  return accessibleRoutes.some(route => route.href === href)
}

// Routes publiques qui ne nécessitent pas d'authentification
export const publicRoutes = [
  '/',
  '/hopitaux',
  '/medecins',
  '/connexion',
  '/inscription',
  '/mot-de-passe-oublie',
  '/reset-mot-de-passe'
]

// Routes de l'API qui sont publiques
export const publicApiRoutes = [
  '/api/auth/',
  '/api/health'
]

// Route par défaut après connexion selon le rôle
export const defaultRoutes: Record<UserRole, string> = {
  ADMIN: '/admin/dashboard',
  MEDECIN: '/medecin/dashboard',
  PATIENT: '/',
  GUEST: '/'
}

// Fonction pour obtenir la route par défaut selon le rôle
export function getDefaultRoute(role: UserRole): string {
  return defaultRoutes[role] || '/'
}