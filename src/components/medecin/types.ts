
// Types unifiés pour le système médical

export type StatutApproval = "EN_ATTENTE" | "APPROUVE" | "REJETE" | "SUSPENDU"
export type StatutUtilisateur = "ACTIF" | "INACTIF" | "SUSPENDU" | "EN_ATTENTE"
export type RoleUtilisateur = "MEDECIN" | "PATIENT" | "ADMIN" | "HOPITAL"

export interface Utilisateur {
  nom: string
  prenom: string
  email: string
  telephone?: string
  avatarUrl?: string
  dateNaissance?: Date
  status: StatutUtilisateur
  createdAt: Date
  updatedAt: Date
  role: RoleUtilisateur
}

export interface Specialite {
  id: string
  nom: string
  description?: string
  image?: string
}

export interface MedecinData {
  id: string
  numLicence: string
  anneeExperience?: number
  titre: string
  isDisponible: boolean
  statut: StatutApproval
  utilisateur: Utilisateur
  specialite: Specialite
}

export interface MedecinStats {
  totalPatients?: number
  appointmentsToday?: number
  pendingAppointments?: number
  averageRating?: number
  totalConsultations?: number
  responseTime?: string
}

export interface MedecinDashboardProps {
  medecinData: MedecinData
  stats?: MedecinStats
  onAvailabilityChange?: (available: boolean) => void
  loading?: boolean
  error?: string | null
  availabilityLoading?: boolean
}

// Types pour les états de chargement
export interface LoadingState {
  loading: boolean
  error: string | null
}

// Types pour les données d'entité
export interface EntityData<T> {
  items: T[]
  byId: Record<string, T>
  total: number
}