// hooks/utils/useDocumentUploader.ts
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { createDocument } from "@/services/documents/documents";


const supabase = createClient();
const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

interface DocumentUpload {
  titre: string;
  description?: string;
  file: File;
  patientId: string;
}

export function useDocumentUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadDocument = async ({ titre, description, file, patientId }: DocumentUpload) => {
    if (!file || !patientId) {
      toast.error("Données manquantes", {
        description: "Veuillez sélectionner un fichier"
      });
      return;
    }

    // ✅ Validation du fichier
    if (file.size > 50 * 1024 * 1024) { // 50MB max
      toast.error("Fichier trop volumineux", {
        description: "La taille maximale autorisée est de 50MB"
      });
      return;
    }

    // ✅ Formats autorisés (vous pouvez adapter cette liste)
    const allowedTypes = [
      'application/pdf',
      'image/jpeg', 
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Format non supporté", {
        description: "Formats acceptés: PDF, JPEG, PNG, Word, Excel"
      });
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      // ✅ Vérification de l'authentification
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("Utilisateur non authentifié");
      }

      // ✅ Génération d'un nom de fichier unique
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${timestamp}-${file.name
        .toLowerCase() // Convertir tout en minuscules
        .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
        .normalize('NFD') // Normaliser les caractères accentués (é → e)
        .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
        .replace(/[^a-z0-9.-]/g, '') // Supprimer les caractères spéciaux non autorisés
      }`;
      const filePath = `patients/${patientId}/${fileName}`;

      // ✅ Upload vers Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("file")
        .upload(filePath, file, {
          upsert: false, // Ne pas écraser les fichiers existants
          contentType: file.type,
        });

      if (uploadError) {
        console.error("Erreur upload document:", uploadError);
        throw uploadError;
      }

      // ✅ Construction de l'URL publique
      const documentUrl = `${STORAGE_URL}/file/${filePath}`;

      // ✅ Enregistrement en base de données via server action
      const result = await createDocument({
        titre,
        description,
        url: documentUrl,
        patientId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      if (!result.success) {
        // Si l'enregistrement en base échoue, supprimer le fichier uploadé
        await supabase.storage.from("file").remove([filePath]);
        throw new Error(result.error);
      }

      toast.success("Document téléversé avec succès", {
        description: "Votre document a été enregistré et est maintenant disponible"
      });

      return {
        success: true,
        document: result.document,
        url: documentUrl
      };

    } catch (error: any) {
      console.error("Erreur upload document:", error);
      
      let errorMessage = "Une erreur est survenue lors du téléversement";
      if (error.message?.includes("Bucket not found")) {
        errorMessage = "Erreur de configuration du stockage";
      } else if (error.message?.includes("already exists")) {
        errorMessage = "Un fichier avec ce nom existe déjà";
      }

      toast.error("Erreur de téléversement", {
        description: error.message || errorMessage
      });

      return {
        success: false,
        error: error.message || errorMessage
      };
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // ✅ Fonction pour supprimer un document
  const deleteDocument = async (filePath: string, documentId: string) => {
    try {
      // Supprimer du storage Supabase
      const { error: storageError } = await supabase.storage
        .from("file")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Supprimer de la base de données (vous devrez créer cette server action)
      // await deleteDocumentRecord(documentId);

      toast.success("Document supprimé avec succès");
      return { success: true };
    } catch (error: any) {
      console.error("Erreur suppression document:", error);
      toast.error("Erreur lors de la suppression");
      return { success: false, error: error.message };
    }
  };

  return {
    uploading,
    progress,
    uploadDocument,
    deleteDocument
  };
}