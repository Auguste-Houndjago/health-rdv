// src/hooks/specialites/useSpecialites.ts
"use client"

import { createSpecialite, getSpecialites, updateSpecialite, deleteSpecialite } from "@/services/specialites";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export interface Specialite {
  id: string;
  nom: string;
  image?: string | null;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  _count: {
    medecins: number;
    hopitaux: number;
  };
}

export interface SpecialiteInput {
  nom: string;
  description?: string;
  image?: string;
}

export const useSpecialites = () => {
  const queryClient = useQueryClient();

  // Récupérer toutes les spécialités
  const { 
    data: specialites = [], 
    isLoading,
    error,
    refetch
  } = useQuery<Specialite[]>({
    queryKey: ["specialites"],
    queryFn: async () => (await getSpecialites()) as unknown as Specialite[],
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Créer une spécialité
  const createSpecialiteMutation = useMutation({
    mutationFn: async (data: SpecialiteInput) => {
      const formData = new FormData();
      formData.append('nom', data.nom);
      if (data.description) formData.append('description', data.description);
      if (data.image) formData.append('image', data.image);

      const result = await createSpecialite(formData);
      
 
      
      return result;
    },
    onMutate: async (newSpecialite) => {
      // Annuler les requêtes en cours
      await queryClient.cancelQueries({ queryKey: ["specialites"] });

      // Snapshot de la valeur précédente
      const previousSpecialites = queryClient.getQueryData<Specialite[]>(["specialites"]);

      // Mise à jour optimiste
      queryClient.setQueryData<Specialite[]>(["specialites"], (old = []) => [
        ...old,
        {
          id: `temp-${Date.now()}`,
          nom: newSpecialite.nom,
          description: newSpecialite.description || null,
          image: newSpecialite.image || null,
          createdAt: new Date(),
          updatedAt: new Date(),
          _count: {
            medecins: 0,
            hopitaux: 0
          }
        } as Specialite
      ]);

      return { previousSpecialites };
    },
    onSuccess: (newSpecialite) => {
      // Remplacer l'élément temporaire par la vraie donnée
      queryClient.setQueryData<Specialite[]>(["specialites"], (old = []) => 
        old.map(specialite => 
          specialite.id.startsWith('temp-') ? (newSpecialite as unknown as Specialite) : specialite
        )
      );
      
      toast.success("Spécialité créée avec succès", {
        description: `"${newSpecialite.nom}" a été ajoutée.`
      });
    },
    onError: (error: Error, _, context) => {
      // Revert en cas d'erreur
      if (context?.previousSpecialites) {
        queryClient.setQueryData(["specialites"], context.previousSpecialites);
      }
      
      toast.error("Erreur lors de la création", {
        description: error.message
      });
    },
    onSettled: () => {
      // Invalider pour potentiellement refetch
      queryClient.invalidateQueries({ queryKey: ["specialites"] });
    }
  });

  // Mettre à jour une spécialité
  const updateSpecialiteMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SpecialiteInput> }) => {
      const updated = await updateSpecialite(id, data);
      return updated;
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["specialites"] });

      const previousSpecialites = queryClient.getQueryData<Specialite[]>(["specialites"]);

      queryClient.setQueryData<Specialite[]>(["specialites"], (old = []) =>
        old.map(specialite =>
          specialite.id === id
            ? { ...specialite, ...data, updatedAt: new Date() }
            : specialite
        )
      );

      return { previousSpecialites };
    },
    onSuccess: (updatedSpecialite) => {
      toast.success("Spécialité mise à jour avec succès", {
        description: `"${updatedSpecialite.nom}" a été modifiée.`
      });
    },
    onError: (error: Error, { id }, context) => {
      if (context?.previousSpecialites) {
        queryClient.setQueryData(["specialites"], context.previousSpecialites);
      }
      
      toast.error("Erreur lors de la mise à jour", {
        description: error.message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["specialites"] });
    }
  });

  // Supprimer une spécialité
  const deleteSpecialiteMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteSpecialite(id);
      if (!result.success) {
        throw new Error("Erreur lors de la suppression");
      }
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["specialites"] });

      const previousSpecialites = queryClient.getQueryData<Specialite[]>(["specialites"]);

      queryClient.setQueryData<Specialite[]>(["specialites"], (old = []) =>
        old.filter(specialite => specialite.id !== id)
      );

      return { previousSpecialites };
    },
    onSuccess: (id) => {
      toast.success("Spécialité supprimée avec succès");
    },
    onError: (error: Error, id, context) => {
      if (context?.previousSpecialites) {
        queryClient.setQueryData(["specialites"], context.previousSpecialites);
      }
      
      toast.error("Erreur lors de la suppression", {
        description: error.message
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["specialites"] });
    }
  });

  return {
    // Données
    specialites,
    isLoading,
    error,
    refetch,
    
    // Mutations
    createSpecialite: createSpecialiteMutation.mutateAsync,
    createSpecialitePending: createSpecialiteMutation.isPending,
    
    updateSpecialite: updateSpecialiteMutation.mutateAsync,
    updateSpecialitePending: updateSpecialiteMutation.isPending,
    
    deleteSpecialite: deleteSpecialiteMutation.mutateAsync,
    deleteSpecialitePending: deleteSpecialiteMutation.isPending,
    
    // États combinés
    isAnyMutationPending: 
      createSpecialiteMutation.isPending || 
      updateSpecialiteMutation.isPending || 
      deleteSpecialiteMutation.isPending
  };
};