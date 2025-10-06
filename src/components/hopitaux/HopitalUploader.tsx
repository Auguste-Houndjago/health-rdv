// src/components/hopital/HopitalUploader.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useHopitalUploader } from "@/hooks/utils/useHopitalUploader";

interface HopitalUploaderProps {
  hopitalId: string;
  initialImageUrl?: string | null;
  size?: number;
  className?: string;
  onImageUpdate?: (imageUrl: string) => void;
  details?: boolean;
}

export default function HopitalUploader({ 
  hopitalId,
  initialImageUrl, 
  size = 120,
  className = "",
  onImageUpdate,
  details = true,
}: HopitalUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { imageUrl, uploading, uploadHopitalImage, imageKey } = useHopitalUploader();

  const currentImageUrl = imageUrl || initialImageUrl;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = await uploadHopitalImage(file, hopitalId);
      if (newImageUrl && onImageUpdate) {
        onImageUpdate(newImageUrl);
      }
    }
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
        className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-gray-300 transition-all hover:border-[#1cb0ff] hover:bg-gray-50"
        style={{ width: size, height: size }}
      >
        {currentImageUrl ? (
          <Image
            key={imageKey}
            src={currentImageUrl}
            alt="Image de l'hôpital"
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
                d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" 
              />
              <circle cx="9" cy="9" r="2" />
            </svg>
            <span className="text-xs">Hôpital</span>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs text-transparent transition-all group-hover:bg-black/20 group-hover:text-white">
          {currentImageUrl ? "Modifier" : "Ajouter"}
        </div>

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

      {details && (
        <div className="text-center">
          <p className="text-xs text-gray-500">
            PNG, JPEG, WebP, SVG
          </p>
          <p className="text-xs text-gray-400">
            max. 5MB
          </p>
        </div>
      )}
    </div>
  );
}