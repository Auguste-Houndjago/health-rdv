"use client"

import React, { useState } from "react";
import { useAdminDemandes } from "@/hooks/useAdminDemandes";
import { useDemandeFilters } from "@/hooks/useDemandeFilters";
import { useFilters } from "@/hooks/useFilters";
import { 
  DemandeFiltersBar,
  DemandeTable,
  LoadingState,
  ErrorState,
  EmptyState
} from "./demandes";
import DemandeModal from "./DemandeModal";

interface DemandeMedecinTableProps {
  hopitalId?: string;
}

export default function DemandeMedecinTable({ hopitalId }: DemandeMedecinTableProps) {
  // États
  const [selectedDemande, setSelectedDemande] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Gestion des filtres avec le hook personnalisé
  const {
    searchTerm,
    statutFilter,
    setSearchTerm,
    setStatutFilter,
    clearFilters
  } = useFilters();

  // Récupération des données
  const { 
    demandes,
    isLoading, 
    error,
    refetch 
  } = useAdminDemandes({ hopitalId });

  // Filtrage et statistiques
  const { filteredDemandes, stats, hasActiveFilters } = useDemandeFilters({
    demandes,
    searchTerm,
    statutFilter
  });

  // Handlers
  const handleViewDemande = (demande: any) => {
    setSelectedDemande(demande);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDemande(null);
    refetch();
  };

  // États de chargement
  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  if (demandes.length === 0) {
    return <EmptyState />;
  }

  // Rendu principal
  return (
    <div className="space-y-6">
      {/* Filtres */}
      <DemandeFiltersBar
        searchTerm={searchTerm}
        statutFilter={statutFilter}
        stats={stats}
        onSearchChange={setSearchTerm}
        onStatutChange={setStatutFilter}
        onClearFilters={clearFilters}
      />

      {/* Table */}
      <DemandeTable
        demandes={filteredDemandes}
        stats={stats}
        hasActiveFilters={hasActiveFilters}
        onViewDemande={handleViewDemande}
        onClearFilters={clearFilters}
      />

      {/* Modal */}
      {isModalOpen && selectedDemande && (
        <DemandeModal
          demande={selectedDemande}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
