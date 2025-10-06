// hooks/utils/useSpecialiteUploader.ts
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { updateSpecialiteImage } from "@/services/specialites";

const supabase = createClient();
const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export function useSpecialiteUploader() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState(0);

  const uploadSpecialiteImage = async (file: File, specialiteId: string) => {
    if (!file || !specialiteId) return null;

    // Validation du fichier
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fichier trop volumineux", {
        description: "La taille maximale autorisée est de 5MB"
      });
      return null;
    }

    const allowedTypes = [
      "image/png", 
      "image/jpeg", 
      "image/webp", 
      "image/svg+xml"
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format non supporté", {
        description: "Formats acceptés: PNG, JPEG, WebP, SVG"
      });
      return null;
    }

    try {
      setUploading(true);
      
      // Déterminer l'extension du fichier
      const fileExtension = file.type.split('/')[1];
      const fileName = `specialite-${specialiteId}.${fileExtension}`;
      const filePath = `${specialiteId}/${fileName}`;

      // Upload vers Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("specialites")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Erreur upload image spécialité:", uploadError);
        throw uploadError;
      }

      // Générer l'URL publique
      const publicUrl = `${STORAGE_URL}/specialites/${filePath}`;
      
      // Mettre à jour l'état local
      setImageUrl(publicUrl);
      setImageKey(prev => prev + 1);

      // Mettre à jour la spécialité dans la base de données
      const result = await updateSpecialiteImage(specialiteId, publicUrl);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Image mise à jour", {
        description: "L'image de la spécialité a été modifiée avec succès"
      });

      return publicUrl;
    } catch (error: any) {
      console.error("Erreur upload spécialité:", error);
      toast.error("Erreur de téléversement", {
        description: error.message || "Une erreur est survenue lors du téléversement"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    imageUrl,
    uploading,
    uploadSpecialiteImage,
    imageKey,
  };
}