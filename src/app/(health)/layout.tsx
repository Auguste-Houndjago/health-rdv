
"use server"
import PatientSidebar from '@/components/patient/PatientSidebar';
import UserHeader from '@/components/user/UserHeader';
import { getUserInfo } from '@/services/users';

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await getUserInfo()
  console.log(" LAYOUT")
  
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <PatientSidebar />
      </div>
      <main className="flex-1 overflow-auto p-6">
        <UserHeader avatarUrl={user?.avatar_url} name={user?.nom} />
        {children}
      </main>
    </div>
  )
}
