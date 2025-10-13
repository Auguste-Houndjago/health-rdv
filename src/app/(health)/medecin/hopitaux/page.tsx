import React from "react"
import HopitalCards from "@/components/hopital/HopitalCards"

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* En-tête élégante */}
      <section className="border rounded-md bg-muted/30">
        <div className="container mx-auto px-6 py-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Liste des hôpitaux partenaires
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
            Retrouvez ici l’ensemble des établissements disponibles pour vos demandes
            de consultation et de collaboration médicale.
          </p>
        </div>
      </section>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
 
          <HopitalCards className="w-full" />

      </main>
    </div>
  )
}
