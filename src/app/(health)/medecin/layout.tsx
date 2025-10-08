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

  const user = await getUserInfo({cache: false})
  // if (!user?.medecin || user.role !== "MEDECIN") {
  //   return redirect("/")
  // }
  
  
  
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
