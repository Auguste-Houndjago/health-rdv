"use client"
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {  Award, Calendar, Link } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface HopitalMedecin {
  id: string;
  nom: string;
  prenom: string;
  avatarUrl?: string | null;
  specialite: string;
  anneeExperience?: number | null;
  titre?: string | null;
}

export const HopitalMedecinCard = ({ 
  medecin, 
  index 
}: { 
  medecin: HopitalMedecin; 
  index: number 
}) => {
  const getInitials = (prenom: string, nom: string) => {
    return `${prenom[0]}${nom[0]}`.toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="sticky w-full"
      style={{ top: `${20 + index * 12}px` }}
    >
      <div className={cn(
        "p-6 rounded-xl border transition-all duration-300 hover:shadow-md",
        "bg-card hover:border-primary/50"
      )}>
        {/* Section principale : Image et infos */}       
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-16 w-16 border-2">
            {medecin.avatarUrl ? (
              <AvatarImage 
                src={medecin.avatarUrl} 
                alt={`${medecin.prenom} ${medecin.nom}`}
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {getInitials(medecin.prenom, medecin.nom)}
              </AvatarFallback>
            )}
          </Avatar>

          {/* Informations du médecin */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-foreground truncate">
                  {medecin.titre || 'Dr.'} {medecin.prenom} {medecin.nom}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {medecin.specialite}
                </p>
              </div>
              <Badge variant="secondary" className="flex-shrink-0">
                {medecin.specialite}
              </Badge>
            </div>

            {/* Expérience */}
            {medecin.anneeExperience && (
              <div className="flex items-center gap-2 mt-3 mb-4">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {medecin.anneeExperience} {medecin.anneeExperience > 1 ? 'ans' : 'an'} d&apos;expérience
                </span>
              </div>
            )}

            {/* Actions */}
            <div >
              <Link className="flex gap-2 mt-4" href={`/medecin/${medecin.id}`}>
              <Button size="sm" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Prendre RDV
              </Button>
              </Link>
              <Button size="sm" variant="outline">
                Voir profil
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
