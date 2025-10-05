
import PatientSidebar from '@/components/patient/PatientSidebar';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <PatientSidebar />
      </div>
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}
