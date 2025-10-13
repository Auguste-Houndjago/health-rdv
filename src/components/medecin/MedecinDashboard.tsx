import React from 'react'
import ProfileCard from './ProfileCard'
import SpecialtyCard from './SpecialtyCard'
import AvailabilityToggle from './AvailabilityToggle'
import { MedecinDashboardProps } from './types'
import { MedecinAdditionalInfo } from './MedecinAdditionalInfo'

// Composant de chargement
const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
)

// Composant d'erreur
const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="text-red-500 text-xl mb-2">⚠️</div>
      <h3 className="text-lg font-semibold text-red-600 mb-2">Erreur de chargement</h3>
      <p className="text-gray-600">{error}</p>
    </div>
  </div>
)

export default function MedecinDashboard({ 
  medecinData, 
  onAvailabilityChange,
  loading = false,
  error = null,
  availabilityLoading = false
}: MedecinDashboardProps) {
  const handleAvailabilityToggle = (available: boolean) => {
    if (onAvailabilityChange) {
      onAvailabilityChange(available)
    }
  }

  // Gestion des états de chargement et d'erreur
  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  if (!medecinData) {
    return <ErrorDisplay error="Aucune donnée médecin disponible" />
  }

  return (
    <div className="space-y-6">

        
      {/* En-tête avec statut */}
      <div className="flex items-center justify-between">
        <div className='pb-8'>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="hidden lg:inline text-muted-foreground">
            Gestion de votre pratique médicale
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AvailabilityToggle
            isDisponible={medecinData?.isDisponible}
            onToggle={handleAvailabilityToggle}
            loading={availabilityLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileCard
          utilisateur={medecinData?.utilisateur}
          titre={medecinData?.titre}
          numLicence={medecinData?.numLicence}
          anneeExperience={medecinData?.anneeExperience}
        />
        
        <SpecialtyCard specialite={medecinData?.specialite} />
      </div>

      {/* Informations du profil et spécialité */}


      {/* Informations supplémentaires */}
      <MedecinAdditionalInfo medecinData={medecinData} />
    </div>
  )
}
