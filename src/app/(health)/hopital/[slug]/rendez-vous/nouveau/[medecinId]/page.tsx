import React from "react"
import { redirect, notFound } from "next/navigation"

// Components
import PatientCalendar from "@/components/patient/PatientCalendar"
import { MedecinCard } from "@/components/medecin/MedecinCard"

// Services
import { getMedecinInfoById } from "@/services/medecins/medecins"
import { getUserInfo } from "@/services/users"
import { getHopitalBySlug } from "@/services/hopitaux"

interface PageProps {
  params: Promise<{ medecinId: string; slug: string }>
}

export default async function MedecinPage({ params }: PageProps) {
  // Récupération des paramètres
  const { medecinId, slug } = await params

  // Validation des paramètres
  if (!medecinId || !slug) {
    notFound()
  }

  // Récupération de l'utilisateur (authentification gérée par le layout)
  const user = await getUserInfo({ cache: false })
  
  if (!user) {
    redirect("/login")
  }

  // Vérification du rôle patient
  if (user.role !== "PATIENT") {
    redirect("/")
  }

  // Récupération des données en parallèle
  const [medecinResult, hopitalResult] = await Promise.allSettled([
    getMedecinInfoById({ medecinId }),
    getHopitalBySlug({ slug })
  ])

  // Vérification médecin
  if (medecinResult.status === 'rejected' || !medecinResult.value || !medecinResult.value.utilisateur) {
    console.error('Erreur médecin:', medecinResult.status === 'rejected' ? medecinResult.reason : 'Médecin non trouvé')
    notFound()
  }

  const medecin = medecinResult.value
  const hopital = hopitalResult.status === 'fulfilled' ? hopitalResult.value : null

  return (
    <main className="max-w-6xl w-full flex flex-col gap-y-14 min-h-screen h-full mx-auto lg:px-12 p-6">
      <section className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.utilisateur.prenom} {medecin.utilisateur.nom}
        </h1>
        <p className="text-muted-foreground text-center">
          Choisissez une date et une heure pour votre rendez-vous avec votre spécialiste en{" "}
          <span className="font-bold">{medecin.specialite.nom}</span>.
        </p>
      </section>
    
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
          <PatientCalendar 
            key={medecinId} // Key pour forcer le remount si medecinId change
            patientId={user.id} 
            hopitalId={hopital?.id} 
            hopitalSlug={slug}
            medecinId={medecinId} 
          />
        </section>
      </div>
    </main>
  )
}
