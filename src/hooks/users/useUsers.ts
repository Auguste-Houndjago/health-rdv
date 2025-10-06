// @/hooks/users/useUsers.ts
import { useEntityFilter } from "@/hooks/entity/useEntityFilter";
import { getUsersWithRole, UsersWithRole } from "@/services/users/users";

import { useMemo } from "react";

interface UseUsersFilters {
  role?: "ADMIN" | "MEDECIN" | "PATIENT" | "all";
  sexe?: "Homme" | "Femme" | "Autre" | "all";
  status?: "ACTIF" | "INACTIF" | "PENDING" | "all";
  searchQuery?: string;
  medecinStatut?: "EN_ATTENTE" | "APPROUVE" | "REJETE" | "all";
}

interface UseUsersOptions {
  filters?: UseUsersFilters;
  sort?: { key: "nom" | "id" | "prenom" | "email" | "telephone" | "avatarUrl" | "status" | "role" | "medecin.numLicence" | "medecin.statut" | "medecin.specialite.nom" | "patient.groupeSanguin" | "patient.sexe"; order: "asc" | "desc" };
  page?: number;
  limit?: number;
}

export const useUsers = (options: UseUsersOptions = {}) => {
  const { filters = {}, sort, page, limit } = options;

  // Construction du where conditionnel pour useEntityFilter
  const where = useMemo(() => {
    const conditions: any = {};

    // Filtre par rôle
    if (filters.role && filters.role !== "all") {
      conditions.role = filters.role;
    }

    // Filtre par statut
    if (filters.status && filters.status !== "all") {
      conditions.status = filters.status;
    }

    // Filtre par sexe (patient)
    if (filters.sexe && filters.sexe !== "all") {
      conditions.patient = { sexe: filters.sexe };
    }

    // Filtre par statut médecin
    if (filters.medecinStatut && filters.medecinStatut !== "all") {
      conditions.medecin = { statut: filters.medecinStatut };
    }

    // Recherche textuelle (nom, prénom, email)
    if (filters.searchQuery?.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      conditions.$or = [
        { nom: { $contains: query } },
        { prenom: { $contains: query } },
        { email: { $contains: query } },
        { telephone: { $contains: query } }
      ];
    }

    return Object.keys(conditions).length > 0 ? conditions : undefined;
  }, [filters]);

  // Utilisation de useEntityFilter avec nos conditions
  const entityData = useEntityFilter<UsersWithRole>({
    entityName: "users-role",
    fetchFn: getUsersWithRole,
    where,
    sort: sort || { key: "nom" as const, order: "asc" as const },
    page,
    limit
  });

  // Statistiques supplémentaires
  const stats = useMemo(() => {
    const allUsers = entityData.data.allItems;
    
    return {
      total: allUsers.length,
      byRole: {
        ADMIN: allUsers.filter(user => user.role === "ADMIN").length,
        MEDECIN: allUsers.filter(user => user.role === "MEDECIN").length,
        PATIENT: allUsers.filter(user => user.role === "PATIENT").length,
      },
      byStatus: {
        ACTIF: allUsers.filter(user => user.status === "ACTIF").length,
        INACTIF: allUsers.filter(user => user.status === "INACTIF").length,
        PENDING: allUsers.filter(user => user.status === "PENDING").length,
      }
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