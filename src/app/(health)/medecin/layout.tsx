"use server"
import MedecinSidebar from '@/components/medecin/MedecinSidebar';
import UserHeader from '@/components/user/UserHeader';
import { getUserInfo } from '@/services/users';
import { obtenirSpecialiteMedecin } from '@/app/actions/medecin';
import { redirect } from 'next/navigation';

export default async function MedecinLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await getUserInfo()
  if (!user?.medecin) {
    return redirect("/")
  }
  
  // Récupérer la spécialité du médecin via server action
  const specialiteResult = await obtenirSpecialiteMedecin()
  
  // if (!specialiteResult.success) {
  //   return redirect("/")
  // }

  const { data: specialiteInfo } = specialiteResult

  // Validation des données du médecin
  const medecinData = {
    medecinId: user.id,
    nom: user.nom,
    email: user.email,
    specialite: specialiteInfo?.nom || "Non spécifiée",
    hopital: specialiteInfo?.hopital || "Non spécifié"
  }

  console.log(" LAYOUT MEDECIN - Données validées:", medecinData)
  
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <MedecinSidebar />
      </div>
      <main className="flex-1 overflow-auto p-6">
        <UserHeader 
          avatarUrl={user?.avatar_url} 
          name={user?.nom}
        />
        {children}
      </main>
    </div>
  )
}
