import React from 'react'
import ProfileCard from './ProfileCard'
import SpecialtyCard from './SpecialtyCard'
import StatusBadge from './StatusBadge'
import AvailabilityToggle from './AvailabilityToggle'
import { MedecinDashboardProps } from './types'
import QuickStats from './QuickStats'

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
  stats,
  onAvailabilityChange,
  loading = false,
  error = null
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
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Gestion de votre pratique médicale
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge statut={medecinData?.statut} size="lg" />
          <AvailabilityToggle
            isDisponible={medecinData?.isDisponible}
            onToggle={handleAvailabilityToggle}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informations professionnelles</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Numéro de licence:</span>
              <span className="font-medium">{medecinData?.numLicence || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Titre:</span>
              <span className="font-medium">{medecinData?.titre || 'N/A'}</span>
            </div>
            {medecinData?.anneeExperience && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Années d'expérience:</span>
                <span className="font-medium">{medecinData.anneeExperience} ans</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Statut d'approbation:</span>
              <StatusBadge statut={medecinData?.statut} size="sm" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Statut du compte</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Compte créé:</span>
              <span className="font-medium">
                {medecinData?.utilisateur?.createdAt 
                  ? new Date(medecinData.utilisateur.createdAt).toLocaleDateString('fr-FR')
                  : 'N/A'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dernière mise à jour:</span>
              <span className="font-medium">
                {medecinData?.utilisateur?.updatedAt 
                  ? new Date(medecinData.utilisateur.updatedAt).toLocaleDateString('fr-FR')
                  : 'N/A'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rôle:</span>
              <span className="font-medium">{medecinData?.utilisateur?.role || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Statut du compte:</span>
              {medecinData?.utilisateur?.status ? (
                <StatusBadge statut={medecinData.utilisateur.status} size="sm" />
              ) : (
                <span className="text-muted-foreground">N/A</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
