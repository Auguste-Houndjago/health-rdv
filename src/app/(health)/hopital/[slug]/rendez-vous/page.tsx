//src/app/(health)/hopital/[slug]/rendez-vous/page.tsx
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { CalendarPlus, History, CalendarDays } from 'lucide-react'
import { getUserInfo } from '@/services/users'
import {  GetPatientRendezVous, getPatientRendezVous } from '@/services/rendezvous/actions'
import { redirect } from 'next/navigation'


export default async function Page({params}: {params: {slug: string}}) {

  const slug = await  params.slug;


  const user = await getUserInfo();
  if (!user || user?.role !== "PATIENT") {
    return redirect("/")
  }
  // Pour l'exemple, on affiche les rendez-vous à venir du patient connecté
  const rendezVous = await getPatientRendezVous({patientId: user.id, slug: slug })

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background gap-8 p-4">
  
      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6">
        {/* Card : Nouveau rendez-vous */}
        <Card className="flex-1 flex border-2  flex-col items-center justify-center hover:shadow-lg transition-shadow">
          <CardHeader className="flex w-full flex-col items-center">
            <CalendarPlus className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Nouveau rendez-vous</CardTitle>
            <CardDescription>Prendre un rendez-vous avec un médecin</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="./rendez-vous/nouveau">
              <Button size="lg" className="w-full">Prendre rendez-vous</Button>
            </Link>
          </CardContent>
        </Card>
        {/* Card : Historique */}
        <Card className="flex-1 flex border-2 flex-col  items-center justify-center hover:shadow-lg transition-shadow">
          <CardHeader className="flex  w-full flex-col items-center">
            <History className="h-10 w-10 text-muted-foreground mb-2" />
            <CardTitle>Historique</CardTitle>
            <CardDescription className="text-center flex ">Voir mes anciens rendez-vous</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="./patient/rendez-vous">
              <Button variant="outline" size="lg" className="w-full">Voir l'historique</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      {/* Aperçu des rendez-vous à venir */}
      <Card className="w-full max-w-3xl mt-8">
        <CardHeader className="flex flex-row items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" />
          <CardTitle>Mes rendez-vous à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <RendezVousApercu rendezVous={rendezVous} />
        </CardContent>
      </Card>
    </main>
  )
}

function RendezVousApercu({ rendezVous }: { rendezVous: GetPatientRendezVous }) {
  if (!rendezVous?.length) return <div className="text-muted-foreground">Aucun rendez-vous à venir.</div>
  return (
    <ul className="divide-y">
      {rendezVous.slice(0, 5).map(rdv => (
        <li key={rdv.id} className="py-2 flex justify-between items-center">
          <span>{new Date(rdv.date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</span>
          <span className="font-semibold">{rdv.medecin?.utilisateur?.prenom} {rdv.medecin?.utilisateur?.nom}</span>
          <span className="text-xs">{rdv.statut}</span>
        </li>
      ))}
    </ul>
  )
}
