
import React from 'react'
import DemandeMedecinTable from '@/components/admin/DemandeMedecinTable'
import DemandeStats from '@/components/admin/DemandeStats'
import { getHopitaux } from '@/services/hopitaux'

export default async function page() {
  const hopitaux = await getHopitaux()

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Demandes des Médecins
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gérez les demandes d'intégration des médecins dans votre hôpital
        </p>
      </div>
      
      <DemandeStats />
      <DemandeMedecinTable  />
    </div>
  )
}
