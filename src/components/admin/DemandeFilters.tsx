"use client"

import React, { useState } from "react";
import { useAdminDemandes } from "@/hooks/useAdminDemandes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  X,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

interface DemandeFiltersProps {
  onFilterChange: (filteredDemandes: any[]) => void;
  hopitalId?: string;
}

export default function DemandeFilters({ onFilterChange, hopitalId }: DemandeFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statutFilter, setStatutFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const { demandes, getDemandesByStatut, rechercherDemandes } = useAdminDemandes({ hopitalId });

  // Appliquer les filtres
  React.useEffect(() => {
    let filtered = demandes;

    // Filtre par recherche
    if (searchTerm.trim()) {
      filtered = rechercherDemandes(searchTerm);
    }

    // Filtre par statut
    if (statutFilter !== "all") {
      filtered = filtered.filter(demande => demande.statut === statutFilter);
    }

    onFilterChange(filtered);
  }, [searchTerm, statutFilter, demandes, onFilterChange, rechercherDemandes]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatutFilter("all");
  };

  const hasActiveFilters = searchTerm.trim() || statutFilter !== "all";

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Barre de recherche */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, email, spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtres
            </Button>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <Label htmlFor="statut">Statut</Label>
                <Select value={statutFilter} onValueChange={setStatutFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="EN_ATTENTE">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        En attente
                      </div>
                    </SelectItem>
                    <SelectItem value="APPROUVE">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Approuvées
                      </div>
                    </SelectItem>
                    <SelectItem value="REJETE">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-3 h-3" />
                        Rejetées
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Effacer les filtres
                </Button>
              </div>
            </div>
          )}

          {/* Indicateurs de filtres actifs */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchTerm.trim() && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Recherche: "{searchTerm}"
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              {statutFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Statut: {statutFilter}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setStatutFilter("all")}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
