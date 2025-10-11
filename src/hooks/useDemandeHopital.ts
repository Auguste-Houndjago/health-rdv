"use client"

import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  creerDemandeHopital, 
  getStatutDemandeHopital, 
  annulerDemandeHopital,
  getDemandesMedecin,
  type DemandeHopitalPayload 
} from "@/services/medecins/demande";
import { toast } from "sonner";

interface UseDemandeHopitalProps {
  hopitalId?: string;
}

export function useDemandeHopital({ hopitalId }: UseDemandeHopitalProps = {}) {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  // Query pour récupérer le statut de la demande pour un hôpital spécifique
  const { 
    data: statutDemande, 
    isLoading: isLoadingStatut,
    error: errorStatut 
  } = useQuery({
    queryKey: ["demande-hopital", hopitalId],
    queryFn: () => getStatutDemandeHopital(hopitalId!),
    enabled: !!hopitalId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query pour récupérer toutes les demandes du médecin
  const { 
    data: demandes, 
    isLoading: isLoadingDemandes,
    error: errorDemandes 
  } = useQuery({
    queryKey: ["demandes-medecin"],
    queryFn: getDemandesMedecin,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation pour créer une demande
  const creerDemandeMutation = useMutation({
    mutationFn: ({ hopitalId, message }: { hopitalId: string; message?: string }) =>
      creerDemandeHopital({ hopitalId, message }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Demande envoyée avec succès");
        // Invalider les queries pour rafraîchir les données
        queryClient.invalidateQueries({ queryKey: ["demande-hopital"] });
        queryClient.invalidateQueries({ queryKey: ["demandes-medecin"] });
        setMessage(""); // Reset du message
      } else {
        toast.error(result.error || "Erreur lors de l'envoi de la demande");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la création de la demande:", error);
      toast.error("Erreur lors de l'envoi de la demande");
    },
  });

  // Mutation pour annuler une demande
  const annulerDemandeMutation = useMutation({
    mutationFn: (hopitalId: string) => annulerDemandeHopital(hopitalId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Demande annulée avec succès");
        // Invalider les queries pour rafraîchir les données
        queryClient.invalidateQueries({ queryKey: ["demande-hopital"] });
        queryClient.invalidateQueries({ queryKey: ["demandes-medecin"] });
      } else {
        toast.error(result.error || "Erreur lors de l'annulation de la demande");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de l'annulation de la demande:", error);
      toast.error("Erreur lors de l'annulation de la demande");
    },
  });

  // Fonction pour envoyer une demande
  const envoyerDemande = (hopitalId: string, message?: string) => {
    creerDemandeMutation.mutate({ hopitalId, message });
  };

  // Fonction pour annuler une demande
  const annulerDemande = (hopitalId: string) => {
    annulerDemandeMutation.mutate(hopitalId);
  };

  // Fonction pour obtenir le statut d'une demande pour un hôpital
  const getStatutDemande = (hopitalId: string) => {
    const demande = demandes?.data?.find(d => d.hopitalId === hopitalId);
    return demande;
  };

  // Fonction pour vérifier si une demande existe pour un hôpital
  const hasDemande = (hopitalId: string) => {
    return !!getStatutDemande(hopitalId);
  };

  // Fonction pour obtenir le texte du statut
  const getStatutText = (statut: string) => {
    switch (statut) {
      case "EN_ATTENTE":
        return "En attente";
      case "APPROUVE":
        return "Approuvée";
      case "REJETE":
        return "Rejetée";
      default:
        return "Inconnu";
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "EN_ATTENTE":
        return "text-yellow-600 bg-yellow-100";
      case "APPROUVE":
        return "text-green-600 bg-green-100";
      case "REJETE":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Fonction pour obtenir l'icône du statut
  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "EN_ATTENTE":
        return "⏳";
      case "APPROUVE":
        return "✅";
      case "REJETE":
        return "❌";
      default:
        return "❓";
    }
  };

  return {
    // État
    message,
    setMessage,
    
    // Données
    statutDemande: statutDemande?.data,
    demandes: demandes?.data || [],
    
    // États de chargement
    isLoadingStatut,
    isLoadingDemandes,
    isCreating: creerDemandeMutation.isPending,
    isCancelling: annulerDemandeMutation.isPending,
    
    // Erreurs
    errorStatut,
    errorDemandes,
    
    // Actions
    envoyerDemande,
    annulerDemande,
    getStatutDemande,
    hasDemande,
    
    // Utilitaires
    getStatutText,
    getStatutColor,
    getStatutIcon,
    
    // États des mutations
    isSuccess: creerDemandeMutation.isSuccess,
    isError: creerDemandeMutation.isError,
  };
}
