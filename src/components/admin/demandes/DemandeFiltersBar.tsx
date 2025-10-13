"use client"

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterX, Clock, CheckCircle, XCircle } from "lucide-react";
import { FiltersBarProps } from "./filters/types";
import { SearchInput } from "./filters/SearchInput";
import { StatutFilter } from "./filters/StatutFilter";
import { FilterBadge } from "./filters/FilterBadge";
import { ActiveFiltersIndicator } from "./filters/ActiveFiltersIndicator";
import { STATUT_OPTIONS } from "./filters/constants";

export function DemandeFiltersBar({
  searchTerm,
  statutFilter,
  stats,
  onSearchChange,
  onStatutChange,
  onClearFilters,
  searchPlaceholder = "Rechercher par nom, email, spécialité...",
  customFilters
}: FiltersBarProps) {
  const hasActiveFilters = searchTerm.trim() !== "" || statutFilter !== "all";

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Barre de recherche et filtres principaux */}
          <div className="flex gap-2">
            <SearchInput
              value={searchTerm}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
            
            <StatutFilter
              value={statutFilter}
              onValueChange={onStatutChange}
              options={STATUT_OPTIONS}
              className="w-[180px]"
            />

            {customFilters}

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearFilters}
                title="Effacer les filtres"
              >
                <FilterX className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Statistiques cliquables */}
          <div className="flex flex-wrap gap-2">
            <FilterBadge
              label="Total"
              count={stats.total}
              isActive={statutFilter === "all"}
              onClick={() => onStatutChange("all")}
            />
            <FilterBadge
              label="En attente"
              count={stats.enAttente}
              isActive={statutFilter === "EN_ATTENTE"}
              icon={Clock}
              onClick={() => onStatutChange(statutFilter === "EN_ATTENTE" ? "all" : "EN_ATTENTE")}
            />
            <FilterBadge
              label="Approuvées"
              count={stats.approuve}
              isActive={statutFilter === "APPROUVE"}
              icon={CheckCircle}
              onClick={() => onStatutChange(statutFilter === "APPROUVE" ? "all" : "APPROUVE")}
            />
            <FilterBadge
              label="Rejetées"
              count={stats.rejete}
              isActive={statutFilter === "REJETE"}
              icon={XCircle}
              onClick={() => onStatutChange(statutFilter === "REJETE" ? "all" : "REJETE")}
            />
          </div>

          {/* Indicateurs de filtres actifs */}
          {hasActiveFilters && (
            <ActiveFiltersIndicator 
              searchTerm={searchTerm}
              statutFilter={statutFilter}
              onSearchChange={onSearchChange}
              onStatutChange={onStatutChange}
              statutOptions={STATUT_OPTIONS}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
