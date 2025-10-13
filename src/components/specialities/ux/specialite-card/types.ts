

export interface Medecin {
  id: string
  nom: string
  prenom: string
  avatarUrl?: string
  specialite: string
  telephone: string
  isDisponible: boolean
}


export interface Specialite {
  nom: string
  description?: string
  medecins: Medecin[]
}
