import { Building, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import HopitalIntegration from "../medecin/HopitalIntegration";

interface HopitalCardMProps {
  id?: string;
  nom: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
  slug?:string;
}

export default function HopitalCardM({
  id,
  nom,
  adresse,
  description,
  contact,
  
  localisation,
  slug
}: HopitalCardMProps) {
  return (
    <div className="w-72 xl:scale-90  bg-card rounded-2xl shadow-lg border border-gray-200 dark:border-zinc-600 p-5 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* En-tête avec gradient */}
      <div className="flex flex-col items-center gap-2 h-24 rounded-xl p-3 bg-gradient-to-r from-blue-100 to-purple-200 dark:from-zinc-200 dark:to-zinc-400">
  
        <Link href={`/hopital/${slug}`} className="text-xl font-bold text-center dark:text-accent-foreground">{nom} </Link>
      </div>

      {/* Adresse */}
      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
        <MapPin size={18} className="text-red-500" />
        <p className="text-sm">{adresse}</p>
      </div>
      <div className="flex justify-center">
        <HopitalIntegration 
          hopitalId={id || ""} 
          hopitalNom={nom} 
        />
      </div>
      {/* Description */}
      {description && (
        <p className="text-sm text-gray-700 text-center  font-semibold dark:text-gray-200 line-clamp-3">
          {description}
        </p>
      )}

      {/* Contact & Localisation sous forme de petites cartes */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-lg p-2">
          <Phone size={18} className="text-green-500" />
          <span className="font-medium text-sm">Contact:</span>
          <span className="text-sm text-gray-700 dark:text-gray-200">{contact}</span>
        </div>

        {localisation && (
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-lg p-2">
            <MapPin size={18} className="text-red-500" />
            <span className="font-medium text-sm">Localisation:</span>
            <span className="text-sm text-gray-700 dark:text-gray-200">{localisation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
