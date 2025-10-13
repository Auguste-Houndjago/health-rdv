import { useMemo } from "react";

interface UseDemandeFiltersProps {
  demandes: any[];
  searchTerm: string;
  statutFilter: string;
}

export function useDemandeFilters({ 
  demandes, 
  searchTerm, 
  statutFilter 
}: UseDemandeFiltersProps) {
  // Logique de filtrage avec useMemo
  const filteredDemandes = useMemo(() => {
    let filtered = [...demandes];

    // Filtre par recherche (nom, email, spécialité)
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(demande => {
        const nomComplet = `${demande.medecin.utilisateur.prenom} ${demande.medecin.utilisateur.nom}`.toLowerCase();
        const email = demande.medecin.utilisateur.email?.toLowerCase() || "";
        const specialite = demande.medecin.specialite?.nom?.toLowerCase() || "";
        const titre = demande.medecin.titre?.toLowerCase() || "";
        
        return nomComplet.includes(searchLower) ||
               email.includes(searchLower) ||
               specialite.includes(searchLower) ||
               titre.includes(searchLower);
      });
    }

    // Filtre par statut
    if (statutFilter !== "all") {
      filtered = filtered.filter(demande => demande.statut === statutFilter);
    }

    return filtered;
  }, [demandes, searchTerm, statutFilter]);

  // Statistiques
  const stats = useMemo(() => ({
    total: demandes.length,
    enAttente: demandes.filter(d => d.statut === "EN_ATTENTE").length,
    approuve: demandes.filter(d => d.statut === "APPROUVE").length,
    rejete: demandes.filter(d => d.statut === "REJETE").length,
    filtered: filteredDemandes.length
  }), [demandes, filteredDemandes]);

  const hasActiveFilters = searchTerm.trim() !== "" || statutFilter !== "all";

  return {
    filteredDemandes,
    stats,
    hasActiveFilters
  };
}



