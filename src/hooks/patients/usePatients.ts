// @/hooks/patients/usePatients.ts
import { useEntityFilter } from "@/hooks/entity/useEntityFilter";
import { getPatientsByMedecin } from "@/services/patients/actions";
import { useMemo } from "react";

interface PatientWithUser {
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

interface UsePatientsFilters {
  sexe?: "Homme" | "Femme" | "Autre" | "all";
  groupeSanguin?: string | "all";
  status?: "ACTIF" | "INACTIF" | "PENDING" | "all";
  searchQuery?: string;
  medecinId?: string;
}

interface UsePatientsOptions {
  filters?: UsePatientsFilters;
  sort?: { 
    key: "nom" | "prenom" | "email" | "telephone" | "dateNaissance" | "sexe" | "groupeSanguin" | "poids" | "taille" | "createdAt"; 
    order: "asc" | "desc" 
  };
  page?: number;
  limit?: number;
}

export const usePatients = (options: UsePatientsOptions = {}) => {
  const { filters = {}, sort, page, limit } = options;

  // Construction du where conditionnel pour useEntityFilter
  const where = useMemo(() => {
    const conditions: any = {};

    // Filtre par sexe
    if (filters.sexe && filters.sexe !== "all") {
      conditions.sexe = filters.sexe;
    }

    // Filtre par groupe sanguin
    if (filters.groupeSanguin && filters.groupeSanguin !== "all") {
      conditions.groupeSanguin = filters.groupeSanguin;
    }

    // Filtre par statut utilisateur
    if (filters.status && filters.status !== "all") {
      conditions.utilisateur = { status: filters.status };
    }

    // Recherche textuelle (nom, prénom, email)
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      conditions.$or = [
        { "utilisateur.nom": { $contains: query } },
        { "utilisateur.prenom": { $contains: query } },
        { "utilisateur.email": { $contains: query } },
        { "utilisateur.telephone": { $contains: query } }
      ];
    }

    return Object.keys(conditions).length > 0 ? conditions : undefined;
  }, [filters]);

  // Fonction de fetch adaptée pour les patients d'un médecin
  const fetchPatients = async (medecinId: string) => {
    const result = await getPatientsByMedecin(medecinId);
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || "Erreur lors de la récupération des patients");
  };

  // Utilisation de useEntityFilter avec nos conditions
  const entityData = useEntityFilter<PatientWithUser>({
    entityName: "patients-medecin",
    fetchFn: () => fetchPatients(filters.medecinId || ""),
    where,
    sort: sort || { key: "nom" as const, order: "asc" as const },
    page,
    limit
  });

  // Statistiques supplémentaires
  const stats = useMemo(() => {
    const allPatients = entityData.data.allItems;
    
    return {
      total: allPatients.length,
      bySexe: {
        Homme: allPatients.filter(patient => patient.sexe === "Homme").length,
        Femme: allPatients.filter(patient => patient.sexe === "Femme").length,
        Autre: allPatients.filter(patient => patient.sexe === "Autre").length,
      },
      byStatus: {
        ACTIF: allPatients.filter(patient => patient.utilisateur.status === "ACTIF").length,
        INACTIF: allPatients.filter(patient => patient.utilisateur.status === "INACTIF").length,
        PENDING: allPatients.filter(patient => patient.utilisateur.status === "PENDING").length,
      },
      byGroupeSanguin: allPatients.reduce((acc, patient) => {
        if (patient.groupeSanguin) {
          acc[patient.groupeSanguin] = (acc[patient.groupeSanguin] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>)
    };
  }, [entityData.data.allItems]);

  return {
    ...entityData,
    stats,
    filters: {
      current: filters,
      applied: !!where // Indique si des filtres sont actifs
    }
  };
};
