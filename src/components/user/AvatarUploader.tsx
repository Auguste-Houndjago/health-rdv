"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAvatarUploader } from "@/hooks/utils/useAvatarUploader";


export default function AvatarUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { avatarUrl, uploading, uploadAvatar } = useAvatarUploader();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-[#1cb0ff] transition-all hover:border-[#3dcaff]"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            fill
            className="rounded-full object-cover transition-opacity group-hover:opacity-50"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
            Photo
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 text-xs text-transparent transition-all group-hover:bg-black/30 group-hover:text-white">
          Modifier
        </div>
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {uploading && (
        <p className="text-xs text-gray-400">Téléversement en cours...</p>
      )}
    </div>
  );
}
