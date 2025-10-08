"use client";
import { useEntityFilter } from "@/hooks/entity/useEntityFilter";
import { getPatientsByMedecin, PatientByMedecinPayload } from "@/services/patients/actions";
import { useMemo } from "react";

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
    key: keyof PatientByMedecinPayload[number] | keyof PatientByMedecinPayload[number]["utilisateur"];
    order: "asc" | "desc";
  };
  page?: number;
  limit?: number;
}

export const usePatients = (options: UsePatientsOptions = {}) => {
  const { filters = {}, sort, page, limit } = options;

  const where = useMemo(() => {
    const conditions: any = {};

    if (filters.sexe && filters.sexe !== "all") conditions.sexe = filters.sexe;
    if (filters.groupeSanguin && filters.groupeSanguin !== "all") conditions.groupeSanguin = filters.groupeSanguin;
    if (filters.status && filters.status !== "all") conditions.utilisateur = { status: filters.status };

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

  const fetchPatients = async () => {
    console.log("medecinId fetchPatients", filters.medecinId)
    const result: PatientByMedecinPayload = await getPatientsByMedecin({ medecinId: filters.medecinId });
    return result;
  };

  const entityData = useEntityFilter<PatientByMedecinPayload[number]>({
    entityName: "patients-medecin",
    fetchFn: fetchPatients,
    where,
    sort: sort || { key: "nom" as const, order: "asc" as const },
    page,
    limit
  });

  const stats = useMemo(() => {
    const allPatients = entityData.data.allItems;
    return {
      total: allPatients.length,
      bySexe: {
        Homme: allPatients.filter(p => p.sexe === "Homme").length,
        Femme: allPatients.filter(p => p.sexe === "Femme").length,
        Autre: allPatients.filter(p => p.sexe === "Autre").length,
      },
      byStatus: {
        ACTIF: allPatients.filter(p => p.utilisateur.status === "ACTIF").length,
        INACTIF: allPatients.filter(p => p.utilisateur.status === "INACTIF").length,
        PENDING: allPatients.filter(p => p.utilisateur.status === "PENDING").length,
      },
      byGroupeSanguin: allPatients.reduce((acc, p) => {
        if (p.groupeSanguin) acc[p.groupeSanguin] = (acc[p.groupeSanguin] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [entityData.data.allItems]);

  return {
    ...entityData,
    stats,
    filters: { current: filters, applied: !!where }
  };
};
