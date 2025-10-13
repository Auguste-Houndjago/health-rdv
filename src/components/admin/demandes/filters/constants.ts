import { Clock, CheckCircle, XCircle } from "lucide-react";
import { FilterOption } from "./types";

// Configuration réutilisable pour les options de statut
export const STATUT_OPTIONS = [
  { value: "all", label: "Tous les statuts" },
  { 
    value: "EN_ATTENTE", 
    label: "En attente", 
    icon: Clock 
  },
  { 
    value: "APPROUVE", 
    label: "Approuvées", 
    icon: CheckCircle 
  },
  { 
    value: "REJETE", 
    label: "Rejetées", 
    icon: XCircle 
  },
] as const satisfies readonly FilterOption[];

