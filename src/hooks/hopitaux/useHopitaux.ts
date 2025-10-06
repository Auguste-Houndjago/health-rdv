// src/hooks/hopitaux/useHopitaux.ts
"use client";

import { createHopital, deleteHopital, getHopitaux, updateHopital } from "@/services/hopitaux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Hopital {
  id: string;
  nom: string;
  adresse: string;
  contact: string;
  description?: string | null;
  image?: string | null;
  url?: string | null;
  localisation?: string | null;
  fuseauHoraire?: string;
  _count: {
    medecin: number;
    specialites: number;
    utilisateurHopitals: number;
    rendevous: number;
  };
}

export interface HopitalInput {
  nom: string;
  adresse: string;
  contact: string;
  description?: string;
  image?: string;
  url?: string;
  localisation?: string;
  fuseauHoraire?: string;
}

export const useHopitaux = () => {
  const queryClient = useQueryClient();

  const { data: hopitaux = [], isLoading, error, refetch } = useQuery<Hopital[]>({
    queryKey: ["hopitaux"],
    queryFn: async () => (await getHopitaux()) as unknown as Hopital[],
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: async (data: HopitalInput) => {
      const formData = new FormData();
      formData.append("nom", data.nom);
      formData.append("adresse", data.adresse);
      formData.append("contact", data.contact);
      if (data.description) formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);
      if (data.url) formData.append("url", data.url);
      if (data.localisation) formData.append("localisation", data.localisation);
      if (data.fuseauHoraire) formData.append("fuseauHoraire", data.fuseauHoraire);
      return await createHopital(formData);
    },
    onMutate: async (newHopital) => {
      await queryClient.cancelQueries({ queryKey: ["hopitaux"] });
      const previous = queryClient.getQueryData<Hopital[]>(["hopitaux"]);
      queryClient.setQueryData<Hopital[]>(["hopitaux"], (old = []) => [
        ...old,
        {
          id: `temp-${Date.now()}`,
          nom: newHopital.nom,
          adresse: newHopital.adresse,
          contact: newHopital.contact,
          description: newHopital.description || null,
          image: newHopital.image || null,
          url: newHopital.url || null,
          localisation: newHopital.localisation || null,
          fuseauHoraire: newHopital.fuseauHoraire,
          _count: { medecin: 0, specialites: 0, utilisateurHopitals: 0, rendevous: 0 },
        } as Hopital,
      ]);
      return { previous };
    },
    onSuccess: (created) => {
      queryClient.setQueryData<Hopital[]>(["hopitaux"], (old = []) =>
        old.map((h) => (h.id.startsWith("temp-") ? (created as unknown as Hopital) : h))
      );
      toast.success("Hôpital créé avec succès", { description: `"${created.nom}" a été ajouté.` });
    },
    onError: (err: Error, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["hopitaux"], ctx.previous);
      toast.error("Erreur lors de la création", { description: err.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["hopitaux"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HopitalInput> }) => {
      return await updateHopital(id, data);
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["hopitaux"] });
      const previous = queryClient.getQueryData<Hopital[]>(["hopitaux"]);
      queryClient.setQueryData<Hopital[]>(["hopitaux"], (old = []) =>
        old.map((h) => (h.id === id ? { ...h, ...data } : h))
      );
      return { previous };
    },
    onSuccess: (updated) => {
      toast.success("Hôpital mis à jour", { description: `"${updated.nom}" a été modifié.` });
    },
    onError: (err: Error, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["hopitaux"], ctx.previous);
      toast.error("Erreur lors de la mise à jour", { description: err.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["hopitaux"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteHopital(id);
      if (!(res as any).success) throw new Error((res as any).error || "Erreur suppression");
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["hopitaux"] });
      const previous = queryClient.getQueryData<Hopital[]>(["hopitaux"]);
      queryClient.setQueryData<Hopital[]>(["hopitaux"], (old = []) => old.filter((h) => h.id !== id));
      return { previous };
    },
    onSuccess: () => {
      toast.success("Hôpital supprimé avec succès");
    },
    onError: (err: Error, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["hopitaux"], ctx.previous);
      toast.error("Erreur lors de la suppression", { description: err.message });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["hopitaux"] });
    },
  });

  return {
    hopitaux,
    isLoading,
    error,
    refetch,

    createHopital: createMutation.mutateAsync,
    createHopitalPending: createMutation.isPending,

    updateHopital: updateMutation.mutateAsync,
    updateHopitalPending: updateMutation.isPending,

    deleteHopital: deleteMutation.mutateAsync,
    deleteHopitalPending: deleteMutation.isPending,

    isAnyMutationPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
};


