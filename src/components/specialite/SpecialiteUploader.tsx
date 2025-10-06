// src/components/specialite/SpecialiteUploader.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSpecialiteUploader } from "@/hooks/utils/useSpecialiteUploader";

interface SpecialiteUploaderProps {
  specialiteId: string;
  initialImageUrl?: string | null;
  size?: number;
  className?: string;
  onImageUpdate?: (imageUrl: string) => void;
}

export default function SpecialiteUploader({ 
  specialiteId,
  initialImageUrl, 
  size = 120,
  className = "",
  onImageUpdate
}: SpecialiteUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { imageUrl, uploading, uploadSpecialiteImage, imageKey } = useSpecialiteUploader();

  // Utiliser l'URL initiale ou l'URL uploadée
  const currentImageUrl = imageUrl || initialImageUrl;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = await uploadSpecialiteImage(file, specialiteId);
      if (newImageUrl && onImageUpdate) {
        onImageUpdate(newImageUrl);
      }
    }
    
    // Reset l'input pour permettre de sélectionner le même fichier à nouveau
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        onClick={handleClick}
        className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 transition-all hover:border-[#1cb0ff] hover:bg-gray-50"
        style={{ 
          width: size, 
          height: size 
        }}
      >
        {currentImageUrl ? (
          <Image
            key={imageKey}
            src={currentImageUrl}
            alt="Image de la spécialité"
            fill
            sizes={`${size}px`}
            className="object-cover transition-opacity group-hover:opacity-70"
            priority
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 text-gray-400">
            <svg 
              className="w-8 h-8 mb-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-xs text-center px-2">Ajouter une image</span>
          </div>
        )}
        
        {/* Overlay au hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs text-transparent transition-all group-hover:bg-black/20 group-hover:text-white">
          {currentImageUrl ? "Modifier" : "Ajouter"}
        </div>
        
        {/* Indicateur de chargement */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {uploading && (
        <p className="text-xs text-blue-600 animate-pulse">Téléversement en cours...</p>
      )}
      
      <div className="text-center">
        <p className="text-xs text-gray-500">
          PNG, JPEG, WebP, SVG
        </p>
        <p className="text-xs text-gray-400">
          max. 5MB
        </p>
      </div>
    </div>
  );
}