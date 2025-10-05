// src/components/user/AvatarUploader.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAvatarUploader } from "@/hooks/utils/useAvatarUploader";

interface AvatarUploaderProps {
  initialAvatarUrl?: string | null;
  size?: number;
  className?: string;
}

export default function AvatarUploader({ 
  initialAvatarUrl, 
  size = 96,
  className = "" 
}: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { avatarUrl, uploading, uploadAvatar, imageKey } = useAvatarUploader();

  // Utiliser l'URL initiale ou l'URL uploadée
  const currentAvatarUrl = avatarUrl || initialAvatarUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
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
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        onClick={handleClick}
        className="group relative cursor-pointer overflow-hidden rounded-full border-2 border-[#1cb0ff] transition-all hover:border-[#3dcaff]"
        style={{ 
          width: size, 
          height: size 
        }}
      >
        {currentAvatarUrl ? (
          <Image
            key={imageKey} // La clé change à chaque upload, forçant le re-render
            src={currentAvatarUrl}
            alt="Avatar"
            fill
            sizes={`${size}px`}
            className="rounded-full object-cover transition-opacity group-hover:opacity-50"
            priority
          />
        ) : (
          <div 
            className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500 rounded-full"
          >
            Photo
          </div>
        )}
        
        {/* Overlay au hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs text-transparent transition-all group-hover:bg-black/30 group-hover:text-white">
          Modifier
        </div>
        
        {/* Indicateur de chargement */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {uploading && (
        <p className="text-xs text-gray-400 animate-pulse">Téléversement en cours...</p>
      )}
      
      <p className="text-xs text-gray-500 text-center">
        PNG, JPEG max. 5MB
      </p>
    </div>
  );
}