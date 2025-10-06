// @/components/patients-table/types.ts
export interface PatientWithUser {
  id: string;
  adresse?: string;
  groupeSanguin?: string;
  poids?: number;
  taille?: number;
  sexe?: string;
  createdAt: Date;
  updatedAt: Date;
  utilisateur: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    avatarUrl?: string;
    dateNaissance?: Date;
    sexe?: string;
    status: string;
    createdAt: Date;
  };
  rendezVous: Array<{
    id: string;
    date: Date;
    heure: string;
    motif?: string;
    statut: string;
    medecin: {
      utilisateur: {
        nom: string;
        prenom: string;
      };
      specialite?: {
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
