1. Types et constantes partagés
typescript
// types/filters.ts
export type FilterStatut = 'all' | 'EN_ATTENTE' | 'APPROUVE' | 'REJETE';

export interface FilterStats {
  total: number;
  enAttente: number;
  approuve: number;
  rejete: number;
}

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
}

export interface FiltersBarProps {
  searchTerm: string;
  statutFilter: FilterStatut;
  stats: FilterStats;
  onSearchChange: (value: string) => void;
  onStatutChange: (value: FilterStatut) => void;
  onClearFilters: () => void;
  searchPlaceholder?: string;
  customFilters?: React.ReactNode;
}
2. Composant de badge de statut réutilisable
typescript
// components/filters/FilterBadge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterBadgeProps {
  label: string;
  count: number;
  isActive: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

export function FilterBadge({
  label,
  count,
  isActive,
  icon: Icon,
  onClick,
  variant = "outline",
  className
}: FilterBadgeProps) {
  return (
    <Badge
      variant={isActive ? "default" : variant}
      className={cn(
        "cursor-pointer transition-colors flex items-center gap-1",
        className
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {label}: {count}
    </Badge>
  );
}
3. Composant de recherche réutilisable
typescript
// components/filters/SearchInput.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Rechercher...",
  className
}: SearchInputProps) {
  return (
    <div className={cn("relative flex-1", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
4. Composant de filtre de statut réutilisable
typescript
// components/filters/StatutFilter.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOption } from "@/types/filters";

interface StatutFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  className?: string;
}

export function StatutFilter({
  value,
  onValueChange,
  options,
  placeholder = "Statut",
  className
}: StatutFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.icon && <option.icon className="w-3 h-3" />}
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
5. Composant principal modulaire
typescript
// components/filters/DemandeFiltersBar.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterX } from "lucide-react";
import { FiltersBarProps, FilterStatut } from "@/types/filters";
import { SearchInput } from "./SearchInput";
import { StatutFilter } from "./StatutFilter";
import { FilterBadge } from "./FilterBadge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

// Configuration réutilisable pour les options de statut
const STATUT_OPTIONS = [
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
] as const;

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
              onClick={() => onStatutChange(statutFilter === "all" ? "all" : "all")}
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
          {hasActiveFilters && <ActiveFiltersIndicator 
            searchTerm={searchTerm}
            statutFilter={statutFilter}
            onSearchChange={onSearchChange}
            onStatutChange={onStatutChange}
          />}
        </div>
      </CardContent>
    </Card>
  );
}

// Composant pour afficher les filtres actifs
interface ActiveFiltersIndicatorProps {
  searchTerm: string;
  statutFilter: FilterStatut;
  onSearchChange: (value: string) => void;
  onStatutChange: (value: FilterStatut) => void;
}

function ActiveFiltersIndicator({
  searchTerm,
  statutFilter,
  onSearchChange,
  onStatutChange
}: ActiveFiltersIndicatorProps) {
  const getStatutLabel = (statut: FilterStatut) => {
    const option = STATUT_OPTIONS.find(opt => opt.value === statut);
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
6. Hook personnalisé pour la gestion des états de filtre
typescript
// hooks/useFilters.ts
import { useState, useMemo } from 'react';
import { FilterStatut, FilterStats } from '@/types/filters';

interface UseFiltersOptions {
  initialSearch?: string;
  initialStatut?: FilterStatut;
}

export function useFilters(options: UseFiltersOptions = {}) {
  const [searchTerm, setSearchTerm] = useState(options.initialSearch || '');
  const [statutFilter, setStatutFilter] = useState<FilterStatut>(options.initialStatut || 'all');

  const hasActiveFilters = useMemo(() => {
    return searchTerm.trim() !== '' || statutFilter !== 'all';
  }, [searchTerm, statutFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatutFilter('all');
  };

  return {
    searchTerm,
    statutFilter,
    setSearchTerm,
    setStatutFilter,
    hasActiveFilters,
    clearFilters
  };
}
7. Exemple d'utilisation
typescript
// Dans votre composant parent
import { DemandeFiltersBar } from "@/components/filters/DemandeFiltersBar";
import { useFilters } from "@/hooks/useFilters";

export function DemandesList() {
  const {
    searchTerm,
    statutFilter,
    setSearchTerm,
    setStatutFilter,
    hasActiveFilters,
    clearFilters
  } = useFilters();

  const stats = {
    total: 150,
    enAttente: 45,
    approuve: 80,
    rejete: 25
  };

  return (
    <div>
      <DemandeFiltersBar
        searchTerm={searchTerm}
        statutFilter={statutFilter}
        stats={stats}
        onSearchChange={setSearchTerm}
        onStatutChange={setStatutFilter}
        onClearFilters={clearFilters}
      />
      
      {/* Votre liste de demandes */}
    </div>
  );
}


🎯 Avantages de cette approche modulaire :
✅ Réutilisable : Les composants peuvent être utilisés dans d'autres parties de l'app

✅ Maintenable : Modifications centralisées dans un seul endroit

✅ Typage fort : TypeScript pour éviter les erreurs

✅ Extensible : Facile d'ajouter de nouveaux types de filtres

✅ Testable : Composants plus petits et plus faciles à tester

✅ Consistent : Même look and feel partout