// hooks/utils/useAvatarUploader.ts
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { updateAvatar } from "@/services/users";

const supabase = createClient();
const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export function useAvatarUploader() {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState(0); // Clé pour forcer le re-render

  const uploadAvatar = async (file: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fichier trop volumineux", {
        description: "La taille maximale autorisée est de 5MB"
      });
      return;
    }

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("Format non supporté", {
        description: "Seuls les formats PNG et JPEG sont acceptés"
      });
      return;
    }

    try {
      setUploading(true);
      
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("Utilisateur non authentifié");
      }

      const filePath = `${user.id}/avatar.png`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Erreur upload image:", uploadError);
        throw uploadError;
      }

      const avatar_url = `${STORAGE_URL}/avatars/${filePath}`;
      
      // Mettre à jour l'URL ET la clé
      setAvatarUrl(avatar_url);
      setImageKey(prev => prev + 1); // Incrémenter la clé pour forcer le rechargement

      // Appeler la server action pour mettre à jour l'avatar
      const result = await updateAvatar(avatar_url);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Photo de profil mise à jour", {
        description: "Votre avatar a été modifié avec succès"
      });

      return avatar_url;
    } catch (error: any) {
      console.error("Erreur upload:", error);
      toast.error("Erreur de téléversement", {
        description: error.message || "Une erreur est survenue lors du téléversement"
      });
    } finally {
      setUploading(false);
    }
  };

  return {
    avatarUrl,
    uploading,
    uploadAvatar,
    imageKey, // Exposer la clé
  };
}