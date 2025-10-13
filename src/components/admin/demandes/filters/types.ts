import React from "react";

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


