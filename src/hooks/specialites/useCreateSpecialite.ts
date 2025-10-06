// hooks/specialites/useCreateSpecialite.ts
import { createSpecialite } from '@/services/specialites';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

interface CreateSpecialiteFormData {
  nom: string;
  description?: string;
}

export function useCreateSpecialite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSpecialiteFormData) => {
      const formData = new FormData();
      formData.append('nom', data.nom);
      if (data.description) {
        formData.append('description', data.description);
      }
      
      const result = await createSpecialite(formData);
      
      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la création de la spécialité');
      }
      
      return result.data;
    },
    onSuccess: (data) => {
      // Invalider et refetch la liste des spécialités
      queryClient.invalidateQueries({ queryKey: ['specialites'] });
      
      toast.success('Spécialité créée avec succès', {
        description: `La spécialité "${data.nom}" a été créée.`
      });
    },
    onError: (error: Error) => {
      toast.error('Erreur lors de la création', {
        description: error.message
      });
    },
  });
}