
import DisponibilitePage from '@/components/medecin/DisponibilitePage'
import { getUserInfo } from '@/services/users'
import { redirect } from 'next/navigation'

export default async function DisponibilitesPage() {
  const user = await getUserInfo()
  
  if (user?.role !== "MEDECIN") {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestion des disponibilités</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configurez vos créneaux horaires de disponibilité pour les consultations
        </p>
      </div>
      
      <DisponibilitePage />
    </div>
  )
}
