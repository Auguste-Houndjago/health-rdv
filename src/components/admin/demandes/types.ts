/**
 * Types pour le module Demandes Admin
 */

export interface Demande {
  id: string;
  dateDemande: string;
  statut: "EN_ATTENTE" | "APPROUVE" | "REJETE";
  medecin: {
    id: string;
    titre: string;
    anneeExperience?: number;
    utilisateur: {
      prenom: string;
      nom: string;
      email: string;
      telephone?: string;
    };
    specialite?: {
      id: string;
      nom: string;
    };
  };
}

export interface DemandeStats {
  total: number;
  enAttente: number;
  approuve: number;
  rejete: number;
  filtered?: number;
}

export interface DemandeFilters {
  searchTerm: string;
  statutFilter: "all" | "EN_ATTENTE" | "APPROUVE" | "REJETE";
}

export type StatutDemande = "EN_ATTENTE" | "APPROUVE" | "REJETE";



