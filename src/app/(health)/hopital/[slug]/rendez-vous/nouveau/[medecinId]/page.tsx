//ts-ignore-all

import React from "react"

// import PatientCalendar from "@/components/patient/PatientCalendar"


import { getMedecinInfoById } from "@/services/medecins/medecins";
import { getUserInfo } from "@/services/users";
import { MedecinCard } from "@/components/medecin/MedecinCard";

// Mapping spécialité -> terme adéquat
const SPECIALITE_TERMS: Record<string, string> = {
  MEDECINE_GENERALE: "Généraliste",
  CARDIOLOGIE: "Cardiologue",
  DERMATOLOGIE: "Dermatologue",
  PEDIATRIE: "Pédiatre",
  GYNECOLOGIE: "Gynécologue",
  NEUROLOGIE: "Neurologue",
  OPHTALMOLOGIE: "Ophtalmologue",
  ORTHOPEDIE: "Orthopédiste",
};

// @ts-ignore 

export default async function MedecinPage({
  params,
}: {
  params: Promise<{ medecinId: string }>;
}) {
  // Attente de la résolution de la promesse
  const { medecinId } = await params;
const user = await getUserInfo({cache: false});

if (!user) {
  return("/")
}
const patientId = user?.id!

  const medecin = await getMedecinInfoById({medecinId});

  console.log("medecin: ", medecin);
  if (!medecin || !medecin.utilisateur) {
    return ("/rendez-vous/nouveau")
  }

  return (
    <main className="max-w-6xl w-full flex flex-col gap-y-14  mx-auto lg:px-12 p-6">
      <section className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-4">
          Rendez-vous avec Dr. {medecin.utilisateur.prenom} {medecin.utilisateur.nom}
        </h1>
        <p className="text-muted-foreground">
          Choisissez une date et une heure pour votre rendez-vous avec votre specialiste en <span className="font-bold">{medecin.specialite.nom}</span>.
        </p>

      </section>

      <div className="flex flex-col gap-y-20">
        <section className="gap-4 flex flex-col md:flex-row justify-center  ">
          <div className="flex justify-center">
          
            <MedecinCard medecin={medecin.utilisateur} specialite={medecin?.specialite?.nom} className="" />
          </div>
          <div className="w-full border-2 rounded-md p-2">
            <h1 className="text-2xl font-semibold">{medecin?.specialite?.nom}</h1>
            <p className="text-muted-foreground">{medecin?.specialite?.description}</p>
          </div>
        </section>



        <section className="flex flex-col">
          <h2 className="text-2xl text-center font-semibold mb-4">
            Disponibilités & prise de rendez-vous
          </h2>
       {/* {medecin.id && patientId ? (
            <PatientCalendar patientId={patientId} medecinId={medecin.id} />
          ) : null} */}
    
        </section>
      </div>
    </main>
  )
}
