// components/documents/DocumentUpload.tsx
"use client";

import React, { useState } from 'react';
import { useDocumentUploader } from '@/hooks/utils/useDocumentUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, File, X, Loader2 } from 'lucide-react';

interface DocumentUploadProps {
  patientId: string;
  onUploadSuccess?: () => void;
}

export function DocumentUpload({ patientId, onUploadSuccess }: DocumentUploadProps) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { uploading, uploadDocument } = useDocumentUploader();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-remplir le titre avec le nom du fichier sans extension
      if (!titre) {
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setTitre(fileNameWithoutExt);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !titre.trim()) {
      return;
    }

    const result = await uploadDocument({
      titre: titre.trim(),
      description: description.trim(),
      file: selectedFile,
      patientId
    });

    if (result?.success) {
      // Reset form
      setTitre('');
      setDescription('');
      setSelectedFile(null);
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Ajouter un document
        </CardTitle>
        <CardDescription>
          Téléversez vos documents médicaux (PDF, images, Word, Excel)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sélection du fichier */}
          <div className="space-y-2">
            <Label htmlFor="document-file">Fichier</Label>
            {!selectedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Input
                  id="document-file"
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                />
                <Label 
                  htmlFor="document-file" 
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <File className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium">
                    Cliquez pour sélectionner un fichier
                  </span>
                  <span className="text-xs text-gray-500">
                    PDF, JPEG, PNG, Word, Excel (max. 50MB)
                  </span>
                </Label>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-medium w-[150px] xl:w-[200px] text-sm truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Titre du document */}
          <div className="space-y-2">
            <Label htmlFor="document-title">Titre du document</Label>
            <Input
              id="document-title"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: Ordonnance du 15 janvier 2024"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="document-description">
              Description <span className="text-gray-500 text-sm">(optionnel)</span>
            </Label>
            <Textarea
              id="document-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description du document..."
              rows={3}
            />
          </div>

          {/* Bouton de soumission */}
          <Button 
            type="submit" 
            disabled={uploading || !selectedFile || !titre.trim()}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Téléversement en cours...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Téléverser le document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}