// @/components/patients-table/types.ts
export interface PatientWithUser {
  id: string;
  adresse?: string;
  groupeSanguin?: string;
  poids?: number;
  taille?: number;
  sexe?: string;
  userId: string;
  utilisateur: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    avatarUrl?: string;
    dateNaissance?: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
  };
  rendezVous: Array<{
    id: string;
    date: string;
    duree: number;
    statut: string;
    motif?: string;
    hopitalId: string;
    utilisateurId: string;
    medecinId: string;
    patientId: string;
    createdAt: string;
    updatedAt: string;
    medecin: {
      utilisateur: {
        nom: string;
        prenom: string;
        avatarUrl?: string;
      };
      specialite: {
        id: string;
        nom: string;
      };
    };
  }>;
}

export interface PatientTableFilters {
  sexe?: "Homme" | "Femme" | "Autre" | "all";
  groupeSanguin?: string | "all";
  status?: "ACTIF" | "INACTIF" | "PENDING" | "all";
  searchQuery?: string;
}
