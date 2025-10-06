import DisponibiliteForm from '@/components/medecin/DisponibiliteForm'
import TestDisponibilite from '@/components/medecin/TestDisponibilite'
import { getUserInfo } from '@/services/users'
import { obtenirSpecialiteMedecin } from '@/app/actions/medecin'
import { redirect } from 'next/navigation'

export default async function DisponibilitesPage() {
  const user = await getUserInfo()
  
  if (!user?.medecin) {
    redirect("/")
  }

  // Récupérer la spécialité du médecin via server action
  const specialiteResult = await obtenirSpecialiteMedecin()
  
  if (!specialiteResult.success) {
    redirect("/")
  }

  const { data: specialiteInfo } = specialiteResult

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des disponibilités</h1>
        <p className="text-gray-600 mt-2">
          Configurez vos créneaux horaires de disponibilité pour les consultations
        </p>
        {specialiteInfo && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Spécialité :</strong> {specialiteInfo.nom} | 
              <strong> Hôpital :</strong> {specialiteInfo.hopital}
            </p>
          </div>
        )}
      </div>
      
      <DisponibiliteForm
        medecinId={user.id}
        specialiteId={specialiteInfo?.id || ""}
      />
      
      {/* Composant de test pour vérifier la fonctionnalité */}
      <div className="mt-8">
        <TestDisponibilite />
      </div>
    </div>
  )
}
