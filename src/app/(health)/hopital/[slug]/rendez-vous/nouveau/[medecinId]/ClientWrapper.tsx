"use client"

import { MedecinProvider } from "@/contexts/MedecinContext"
import PatientCalendar from "@/components/patient/PatientCalendar"
import { MedecinCard } from "@/components/medecin/MedecinCard"

interface ClientWrapperProps {
  initialData: {
    medecin: any
    hopital: any
    patientId: string
  }
}

export default function ClientWrapper({ initialData }: ClientWrapperProps) {
  const { medecin, hopital } = initialData

  return (
    <MedecinProvider initialData={initialData}>
      <div className="flex flex-col gap-y-20">
        <section className="gap-4 flex flex-col md:flex-row justify-center">
          <div className="flex justify-center">
            <MedecinCard 
              medecin={medecin.utilisateur} 
              specialite={medecin.specialite?.nom} 
              className="" 
            />
          </div>
          <div className="w-full border-2 rounded-md p-2">
            <h1 className="text-2xl font-semibold">{medecin.specialite?.nom}</h1>
            <p className="text-muted-foreground">{medecin.specialite?.description}</p>
          </div>
        </section>

        <section className="flex flex-col h-full">
          <h2 className="text-2xl text-center font-semibold mb-4">
            Disponibilités & prise de rendez-vous
          </h2>
          <PatientCalendar />
        </section>
      </div>
    </MedecinProvider>
  )
}

