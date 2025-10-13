"use client"
import React from 'react'
import MedecinDashboard from './MedecinDashboard'
import { useEntityFilter } from '@/hooks/entity/useEntityFilter'
import { getMedecinInfo, MedecinInfoPayload } from '@/app/actions/medecin'
import { MedecinData, MedecinStats } from './types'
import { useMedecinAvailability } from '@/hooks/useMedecinAvailability'

export default function MedecinDashboardPage() {
  // Hook pour gérer la disponibilité
  const { toggleAvailability, loading: availabilityLoading } = useMedecinAvailability()

  // Gestionnaire pour le changement de disponibilité
  const handleAvailabilityChange = async (available: boolean) => {
    const success = await toggleAvailability(available)
    if (success) {
      // Recharger les données du médecin après le toggle
      window.location.reload() // Temporaire - sera amélioré avec un refetch
    }
  }

  // Fonction adaptée pour useEntityFilter qui attend un tableau
  const fetchMedecinInfo = async (): Promise<MedecinInfoPayload[]> => {
    const result = await getMedecinInfo();
    return [result];
  };

  const {loading, error, data} = useEntityFilter<MedecinInfoPayload>({
    entityName: "getMedecinInfo",
    fetchFn: fetchMedecinInfo,
  });

  // Conversion des données pour le composant
  const convertToMedecinData = (payload: MedecinInfoPayload): MedecinData => ({
    id: payload.id,
    numLicence: payload.numLicence,
    anneeExperience: payload.anneeExperience,
    titre: payload.titre,
    isDisponible: payload.isDisponible,
    statut: payload.statut as any, // Conversion temporaire
    utilisateur: {
      nom: payload.utilisateur.nom,
      prenom: payload.utilisateur.prenom,
      email: payload.utilisateur.email,
      telephone: payload.utilisateur.telephone,
      avatarUrl: payload.utilisateur.avatarUrl,
      dateNaissance: payload.utilisateur.dateNaissance,
      status: payload.utilisateur.status as any,
      createdAt: payload.utilisateur.createdAt,
      updatedAt: payload.utilisateur.updatedAt,
      role: payload.utilisateur.role as any
    },
    specialite: {
      id: payload.specialite.id,
      nom: payload.specialite.nom,
      description: payload.specialite.description,
      image: payload.specialite.image
    }
  });

  const medecinData: MedecinData | undefined = data?.items?.[0] ? convertToMedecinData(data.items[0]) : undefined;

  return (
    <div className="container mx-auto p-6">
      <MedecinDashboard
        medecinData={medecinData}
        onAvailabilityChange={handleAvailabilityChange}
        loading={loading}
        error={error?.message || null}
        availabilityLoading={availabilityLoading}
      />
    </div>
  )
}
