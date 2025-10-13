import React from "react"
import { redirect, notFound } from "next/navigation"

// Components
import ClientWrapper from "./ClientWrapper"
import NoiseOverlay from "@/components/design/NoiseOverlay"

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

  // Récupération de l'utilisateur
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

  // Préparer les données pour le contexte
  const initialData = {
    medecin: {
      ...medecin,
      hopitalSlug: slug
    },
    hopital,
    patientId: user.id
  }

  return (
    <div className="max-w-6xl relative w-full flex flex-col gap-y-14  h-full mx-auto lg:px-12 p-6">
      <section className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.utilisateur.prenom} {medecin.utilisateur.nom}
        </h1>
        <p className="text-muted-foreground text-center">
          Choisissez une date et une heure pour votre rendez-vous avec votre spécialiste en{" "}
          <span className="font-bold">{medecin.specialite.nom}</span>.
        </p>
      </section>

      <ClientWrapper initialData={initialData} />
    </div>
  )
}
