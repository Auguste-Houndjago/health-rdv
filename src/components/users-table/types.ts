export type UsersWithRole = {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string | null
  avatarUrl: string | null
  dateNaissance: Date | null
  status: "ACTIF" | "INACTIF" | "PENDING"
  createdAt: Date
  updatedAt: Date
  role: "ADMIN" | "MEDECIN" | "PATIENT"

  medecin: {
    numLicence: string
    statut: "EN_ATTENTE" | "APPROUVE" | "REJETE"
    specialite: {
      nom: string
    }
  } | null

  patient: {
    groupeSanguin: "A_POSITIF" | "A_NEGATIF" | "B_POSITIF" | "B_NEGATIF" | "O_POSITIF" | "O_NEGATIF" | "INCONNU"
    sexe: "Homme" | "Femme" | "Autre"
  } | null
}

export const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  MEDECIN: "Médecin",
  PATIENT: "Patient",
}

export const statusLabels: Record<string, string> = {
  ACTIF: "Actif",
  INACTIF: "Inactif",
  PENDING: "En attente",
}
