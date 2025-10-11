"use client"

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  creerPlanningDisponibilite,
  getPlanningsDisponibilite,
  modifierPlanningDisponibilite,
  supprimerPlanningDisponibilite,
  verifierDisponibilite,
  getCreneauxDisponibles,
  type PlanningDisponibiliteInput,
  type CreneauDisponibiliteInput
} from "@/services/medecins/disponibilites";
import { toast } from "sonner";

interface UseDisponibilitesProps {
  medecinId?: string;
}

export function useDisponibilites({ medecinId }: UseDisponibilitesProps = {}) {
  const queryClient = useQueryClient();

  // Query pour récupérer les plannings
  const { 
    data: planningsResult, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ["plannings-disponibilite", medecinId],
    queryFn: () => getPlanningsDisponibilite(medecinId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation pour créer un planning
  const createPlanningMutation = useMutation({
    mutationFn: (data: PlanningDisponibiliteInput) => creerPlanningDisponibilite(data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Planning de disponibilité créé avec succès");
        queryClient.invalidateQueries({ queryKey: ["plannings-disponibilite"] });
      } else {
        toast.error(result.error || "Erreur lors de la création du planning");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la création du planning:", error);
      toast.error("Erreur lors de la création du planning");
    },
  });

  // Mutation pour modifier un planning
  const updatePlanningMutation = useMutation({
    mutationFn: ({ planningId, data }: { planningId: string; data: PlanningDisponibiliteInput }) =>
      modifierPlanningDisponibilite(planningId, data),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Planning modifié avec succès");
        queryClient.invalidateQueries({ queryKey: ["plannings-disponibilite"] });
      } else {
        toast.error(result.error || "Erreur lors de la modification du planning");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la modification du planning:", error);
      toast.error("Erreur lors de la modification du planning");
    },
  });

  // Mutation pour supprimer un planning
  const deletePlanningMutation = useMutation({
    mutationFn: (planningId: string) => supprimerPlanningDisponibilite(planningId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Planning supprimé avec succès");
        queryClient.invalidateQueries({ queryKey: ["plannings-disponibilite"] });
      } else {
        toast.error(result.error || "Erreur lors de la suppression du planning");
      }
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression du planning:", error);
      toast.error("Erreur lors de la suppression du planning");
    },
  });

  // Fonction pour créer un planning
  const creerPlanning = (data: PlanningDisponibiliteInput) => {
    createPlanningMutation.mutate(data);
  };

  // Fonction pour modifier un planning
  const modifierPlanning = (planningId: string, data: PlanningDisponibiliteInput) => {
    updatePlanningMutation.mutate({ planningId, data });
  };

  // Fonction pour supprimer un planning
  const supprimerPlanning = (planningId: string) => {
    deletePlanningMutation.mutate(planningId);
  };

  // Fonction pour vérifier la disponibilité
  const verifierDisponibiliteMedecin = React.useCallback(async (
    medecinId: string,
    date: string,
    heure: string,
    duree: number = 30,
    hopitalId?: string
  ) => {
    try {
      const result = await verifierDisponibilite(medecinId, date, heure, duree, hopitalId);
      return result;
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      return { success: false, error: "Erreur lors de la vérification" };
    }
  }, []);

  // Fonction pour obtenir les créneaux disponibles
  const getCreneauxDisponiblesMedecin = React.useCallback(async (
    medecinId: string,
    date: string,
    hopitalId?: string
  ) => {
    try {
      const result = await getCreneauxDisponibles(medecinId, date, hopitalId);
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des créneaux:", error);
      return { success: false, error: "Erreur lors de la récupération des créneaux" };
    }
  }, []);

  // Fonction pour obtenir les statistiques des plannings
  const getStatistiques = React.useCallback(() => {
    const plannings = planningsResult?.data || [];
    
    return {
      total: plannings.length,
      actifs: plannings.filter(p => p.actif).length,
      avecHopital: plannings.filter(p => p.hopitalId).length,
      sansHopital: plannings.filter(p => !p.hopitalId).length,
    };
  }, [planningsResult?.data]);

  // Fonction pour obtenir les plannings par hôpital
  const getPlanningsByHopital = React.useCallback((hopitalId: string) => {
    const plannings = planningsResult?.data || [];
    return plannings.filter(p => p.hopitalId === hopitalId);
  }, [planningsResult?.data]);

  // Fonction pour obtenir les créneaux d'un planning
  const getCreneauxPlanning = React.useCallback((planningId: string) => {
    const plannings = planningsResult?.data || [];
    const planning = plannings.find(p => p.id === planningId);
    return planning?.creneaux || [];
  }, [planningsResult?.data]);

  // Fonction pour valider les créneaux
  const validerCreneaux = React.useCallback((creneaux: CreneauDisponibiliteInput[]) => {
    const erreurs: string[] = [];

    if (creneaux.length === 0) {
      erreurs.push("Au moins un créneau doit être défini");
    }

    creneaux.forEach((creneau, index) => {
      // Vérifier les heures
      const heureDebut = creneau.heureDebut.split(':').map(Number);
      const heureFin = creneau.heureFin.split(':').map(Number);

      if (heureDebut[0] < 0 || heureDebut[0] > 23 || heureDebut[1] < 0 || heureDebut[1] > 59) {
        erreurs.push(`Créneau ${index + 1}: Heure de début invalide`);
      }

      if (heureFin[0] < 0 || heureFin[0] > 23 || heureFin[1] < 0 || heureFin[1] > 59) {
        erreurs.push(`Créneau ${index + 1}: Heure de fin invalide`);
      }

      if (heureDebut[0] * 60 + heureDebut[1] >= heureFin[0] * 60 + heureFin[1]) {
        erreurs.push(`Créneau ${index + 1}: L'heure de fin doit être après l'heure de début`);
      }

      // Vérifier la durée de consultation
      if (creneau.dureeConsultation < 15 || creneau.dureeConsultation > 120) {
        erreurs.push(`Créneau ${index + 1}: La durée de consultation doit être entre 15 et 120 minutes`);
      }

      // Vérifier la pause
      if (creneau.pauseEntreConsultations < 0 || creneau.pauseEntreConsultations > 60) {
        erreurs.push(`Créneau ${index + 1}: La pause doit être entre 0 et 60 minutes`);
      }
    });

    return {
      valide: erreurs.length === 0,
      erreurs
    };
  }, []);

  return {
    // Données
    plannings: planningsResult?.data || [],
    
    // États de chargement
    isLoading,
    isCreating: createPlanningMutation.isPending,
    isUpdating: updatePlanningMutation.isPending,
    isDeleting: deletePlanningMutation.isPending,
    
    // Erreurs
    error,
    
    // Actions
    creerPlanning,
    modifierPlanning,
    supprimerPlanning,
    verifierDisponibiliteMedecin,
    getCreneauxDisponiblesMedecin,
    refetch,
    
    // Utilitaires
    getStatistiques,
    getPlanningsByHopital,
    getCreneauxPlanning,
    validerCreneaux,
    
    // États des mutations
    isCreateSuccess: createPlanningMutation.isSuccess,
    isUpdateSuccess: updatePlanningMutation.isSuccess,
    isDeleteSuccess: deletePlanningMutation.isSuccess,
    isCreateError: createPlanningMutation.isError,
    isUpdateError: updatePlanningMutation.isError,
    isDeleteError: deletePlanningMutation.isError,
  };
}
