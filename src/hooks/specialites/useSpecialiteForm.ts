// hooks/specialites/useSpecialiteForm.ts
import { useState } from 'react';
import { useCreateSpecialite } from './useCreateSpecialite';

export interface SpecialiteFormData {
  nom: string;
  description: string;
}

export interface SpecialiteFormErrors {
  nom?: string;
  description?: string;
}

export function useSpecialiteForm() {
  const [formData, setFormData] = useState<SpecialiteFormData>({
    nom: '',
    description: '',
  });
  
  const [errors, setErrors] = useState<SpecialiteFormErrors>({});
  const { mutate: createSpecialite, isPending } = useCreateSpecialite();

  const handleChange = (name: keyof SpecialiteFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SpecialiteFormErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom de la spécialité est requis';
    } else if (formData.nom.trim().length > 100) {
      newErrors.nom = 'Le nom ne doit pas dépasser 100 caractères';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'La description ne doit pas dépasser 500 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (onSuccess?: () => void) => {
    if (!validateForm()) {
      return false;
    }

    createSpecialite({
      nom: formData.nom.trim(),
      description: formData.description.trim() || undefined,
    }, {
      onSuccess: () => {
        resetForm();
        onSuccess?.();
      },
    });

    return true;
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      description: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    isPending,
    handleChange,
    handleSubmit,
    resetForm,
    validateForm,
  };
}