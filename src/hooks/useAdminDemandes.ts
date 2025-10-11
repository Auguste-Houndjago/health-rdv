"use client"

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getDemandesHopital, 
  mettreAJourStatutDemande 
} from "@/services/medecins/demande";
import { toast } from "sonner";

interface UseAdminDemandesProps {
  hopitalId?: string;
}

export function useAdminDemandes({ hopitalId }: UseAdminDemandesProps = {}) {
  const queryClient = useQueryClient();

  // Query pour récupérer les demandes
  const { 
    data: demandesResult, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ["getDemandesHopital", hopitalId],
    queryFn: () => getDemandesHopital(hopitalId),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Mutation pour mettre à jour le statut d'une demande
  const updateStatutMutation = useMutation({
    mutationFn: ({ 
      demandeId, 
      statut, 
      reponse 
    }: { 
      demandeId: string; 
      statut: "APPROUVE" | "REJETE"; 
      reponse?: string; 
    }) =>
      mettreAJourStatutDemande({
        demandeId,
        statut,
        reponse
      }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(
          result.data.statut === "APPROUVE" 
            ? "Demande approuvée avec succès" 
            : "Demande rejetée avec succès"
        );
        // Invalider les queries pour rafraîchir les données
        queryClient.invalidateQueries({ queryKey: ["demandes-hopital"] });
        queryClient.invalidateQueries({ queryKey: ["demande-hopital"] });
        queryClient.invalidateQueries({ queryKey: ["demandes-medecin"] });
      } else {
        toast.error(result.error || "Erreur lors de la mise à jour");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour de la demande");
    },
  });

  // Fonction pour approuver une demande
  const approuverDemande = (demandeId: string, reponse?: string) => {
    updateStatutMutation.mutate({
      demandeId,
      statut: "APPROUVE",
      reponse
    });
  };

  // Fonction pour rejeter une demande
  const rejeterDemande = (demandeId: string, reponse?: string) => {
    updateStatutMutation.mutate({
      demandeId,
      statut: "REJETE",
      reponse
    });
  };

  // Fonction pour obtenir les statistiques des demandes
  const getStatistiques = React.useCallback(() => {
    const demandes = demandesResult?.data || [];
    
    return {
      total: demandes.length,
      enAttente: demandes.filter(d => d.statut === "EN_ATTENTE").length,
      approuvees: demandes.filter(d => d.statut === "APPROUVE").length,
      rejetees: demandes.filter(d => d.statut === "REJETE").length,
    };
  }, [demandesResult?.data]);

  // Fonction pour filtrer les demandes par statut
  const getDemandesByStatut = React.useCallback((statut: string) => {
    const demandes = demandesResult?.data || [];
    return demandes.filter(d => d.statut === statut);
  }, [demandesResult?.data]);

  // Fonction pour rechercher dans les demandes
  const rechercherDemandes = React.useCallback((terme: string) => {
    const demandes = demandesResult?.data || [];
    const termeLower = terme.toLowerCase();
    
    return demandes.filter(demande => 
      demande.medecin.utilisateur.nom.toLowerCase().includes(termeLower) ||
      demande.medecin.utilisateur.prenom.toLowerCase().includes(termeLower) ||
      demande.medecin.utilisateur.email.toLowerCase().includes(termeLower) ||
      demande.medecin.specialite?.nom.toLowerCase().includes(termeLower) ||
      demande.medecin.titre.toLowerCase().includes(termeLower)
    );
  }, [demandesResult?.data]);

  return {
    // Données
    demandes: demandesResult?.data || [],
    
    // États de chargement
    isLoading,
    isUpdating: updateStatutMutation.isPending,
    
    // Erreurs
    error,
    
    // Actions
    approuverDemande,
    rejeterDemande,
    refetch,
    
    // Utilitaires
    getStatistiques,
    getDemandesByStatut,
    rechercherDemandes,
    
    // États des mutations
    isSuccess: updateStatutMutation.isSuccess,
    isError: updateStatutMutation.isError,
  };
}
