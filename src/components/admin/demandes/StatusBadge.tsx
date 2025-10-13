import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  statut: string;
}

export function StatusBadge({ statut }: StatusBadgeProps) {
  switch (statut) {
    case "EN_ATTENTE":
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      );
    case "APPROUVE":
      return (
        <Badge variant="default">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approuvée
        </Badge>
      );
    case "REJETE":
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Rejetée
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <AlertCircle className="w-3 h-3 mr-1" />
          Inconnu
        </Badge>
      );
  }
}



