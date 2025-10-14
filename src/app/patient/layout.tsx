"use server"
import PatientSidebar from '@/components/patient/PatientSidebar';
import UserHeader from '@/components/user/UserHeader';
import { getUserInfo } from '@/services/users';

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();
  console.log("PATIEN LAYOUT");

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* HEADER EN HAUT */}
      <UserHeader 
        avatarUrl={user?.avatar_url}
        name={user?.nom || user?.email?.split('@')[0] || null}
        email={user?.email}
        role={user?.role}
      />

      {/* CONTENU PRINCIPAL : sidebar + contenu */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR À GAUCHE */}
        <PatientSidebar user={user} />

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
