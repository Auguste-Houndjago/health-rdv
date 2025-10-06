"use server"

import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("PATIENT LAYOUT")

  return (
    <div className="flex h-screen w-screen bg-background">
      {/* Sidebar à gauche */}
      <AdminSidebar />

      {/* Main qui prend le reste de la largeur */}
      <main className="flex-1 flex flex-col p-4 overflow-auto">
        {children}
      </main>
    </div>
  )
}
