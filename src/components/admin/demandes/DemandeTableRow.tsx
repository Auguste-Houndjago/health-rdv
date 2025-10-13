import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, Eye } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface DemandeTableRowProps {
  demande: any;
  onView: (demande: any) => void;
}

export function DemandeTableRow({ demande, onView }: DemandeTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">
              {demande.medecin.utilisateur.prenom} {demande.medecin.utilisateur.nom}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {demande.medecin.titre}
            </div>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <Badge variant="outline" className="font-normal">
          {demande.medecin.specialite?.nom || "Non spécifiée"}
        </Badge>
      </TableCell>
      
      <TableCell>
        <div className="text-sm">
          {demande.medecin.anneeExperience ? 
            `${demande.medecin.anneeExperience} ans` : 
            <span className="text-muted-foreground">Non spécifiée</span>
          }
        </div>
      </TableCell>
      
      <TableCell>
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span className="truncate max-w-[200px]">
              {demande.medecin.utilisateur.email}
            </span>
          </div>
          {demande.medecin.utilisateur.telephone && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Phone className="w-3 h-3" />
              {demande.medecin.utilisateur.telephone}
            </div>
          )}
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-1 text-sm whitespace-nowrap text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {new Date(demande.dateDemande).toLocaleDateString("fr-FR", {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </TableCell>
      
      <TableCell>
        <StatusBadge statut={demande.statut} />
      </TableCell>
      
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(demande)}
          className="flex items-center gap-1"
        >
          <Eye className="w-3 h-3" />
          Voir
        </Button>
      </TableCell>
    </TableRow>
  );
}



