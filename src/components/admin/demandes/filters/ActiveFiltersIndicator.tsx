import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { FilterStatut } from "./types";

interface ActiveFiltersIndicatorProps {
  searchTerm: string;
  statutFilter: FilterStatut;
  onSearchChange: (value: string) => void;
  onStatutChange: (value: FilterStatut) => void;
  statutOptions: readonly { value: string; label: string }[];
}

export function ActiveFiltersIndicator({
  searchTerm,
  statutFilter,
  onSearchChange,
  onStatutChange,
  statutOptions
}: ActiveFiltersIndicatorProps) {
  const getStatutLabel = (statut: FilterStatut) => {
    const option = statutOptions.find(opt => opt.value === statut);
    return option?.label || statut;
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-md border border-border">
      <span className="text-sm font-medium text-muted-foreground">Filtres actifs:</span>
      
      {searchTerm.trim() && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Search className="w-3 h-3" />
          "{searchTerm}"
          <button 
            className="ml-1 hover:text-destructive" 
            onClick={() => onSearchChange("")}
          >
            ×
          </button>
        </Badge>
      )}
      
      {statutFilter !== "all" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          {getStatutLabel(statutFilter)}
          <button 
            className="ml-1 hover:text-destructive" 
            onClick={() => onStatutChange("all")}
          >
            ×
          </button>
        </Badge>
      )}
    </div>
  );
}


