"use server"

import AdminSidebar from "@/components/admin/AdminSidebar"

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  console.log("PATIENT LAYOUT")
  
  return (
    <div className="flex h-screen bg-background">

<div className="flex h-screen ">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
