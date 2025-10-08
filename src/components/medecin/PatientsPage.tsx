// src/components/medecin/PatientsPage.tsx
"use client"

import PatientsTable from "@/components/patients-table/patients-table"
import { useState } from "react"
import { usePatients } from "@/hooks/patients/usePatients"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RiUserLine, RiHeartLine, RiPulseLine } from "@remixicon/react"

export default function PatientsPage({ medecinId }: { medecinId: string }) {
  const [activeTab, setActiveTab] = useState<"all" | "sexe">("all")
  const [sexeFilter, setSexeFilter] = useState<"all" | "Homme" | "Femme" | "Autre">("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Construction des filtres basée sur l'état
  const filters = {
    sexe: activeTab === "sexe" ? sexeFilter : "all",
    searchQuery: searchQuery.trim() || undefined,
    medecinId
  }

  // Utilisation du hook personnalisé
  const { data, stats, loading, error, filters: { applied } } = usePatients({
    filters,
    sort: { key: "nom", order: "asc" }
  })

  // Récents: 5 derniers patients par utilisateur.updatedAt
  const recentPatients = [...data.items]
    .sort((a, b) => new Date(b.utilisateur.updatedAt).getTime() - new Date(a.utilisateur.updatedAt).getTime())
    .slice(0, 5)

  // Rendez-vous aujourd'hui
  const today = new Date()
  today.setHours(0,0,0,0)
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const todaysAppointments = data.items.filter(p =>
    p.rendezVous?.some(r => {
      const d = new Date(r.date)
      return d >= today && d < tomorrow
    })
  )

  const handleTabChange = (value: string) => {
    const [type, val] = value.split(":")
    setActiveTab(type as "all" | "sexe")
    
    // Reset des sous-filtres quand on change de type
    if (type === "all") {
      setSexeFilter("all")
      setSearchQuery("")
    }
  }

  const handleSexeFilter = (value: string) => {
    setActiveTab("sexe")
    setSexeFilter(value as "all" | "Homme" | "Femme" | "Autre")
    setSearchQuery("")
  }

  // Filtres groupe sanguin et statut retirés

  if (error) {
    console.log("error medecin users", error)
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-red-500">Erreur: {error.message}</div>
          <h1>medecinId: {medecinId}</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Patients</h1>
          <p className="text-muted-foreground mt-2">
            Gestion de vos patients et de leurs informations médicales
          </p>
        </div>

        {/* Récemment mis à jour */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Récents</h2>
          <div className="grid gap-2">
            {recentPatients.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{p.utilisateur.prenom} {p.utilisateur.nom}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Maj: {new Date(p.utilisateur.updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {recentPatients.length === 0 && (
              <div className="text-sm text-muted-foreground">Aucun patient récent.</div>
            )}
          </div>
        </div>

        {/* Rendez-vous aujourd'hui */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Rendez-vous aujourd'hui</h2>
          <div className="grid gap-2">
            {todaysAppointments.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{p.utilisateur.prenom} {p.utilisateur.nom}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {p.rendezVous?.find(r => {
                    const d = new Date(r.date)
                    return d >= today && d < tomorrow
                  })?.heure || "Heure inconnue"}
                </span>
              </div>
            ))}
            {todaysAppointments.length === 0 && (
              <div className="text-sm text-muted-foreground">Aucun rendez-vous aujourd'hui.</div>
            )}
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <RiUserLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Patients suivis
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patients Actifs</CardTitle>
              <RiPulseLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.byStatus.ACTIF}</div>
              <p className="text-xs text-muted-foreground">
                En cours de suivi
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hommes</CardTitle>
              <RiHeartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bySexe.Homme}</div>
              <p className="text-xs text-muted-foreground">
                Patients masculins
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Femmes</CardTitle>
              <RiHeartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.bySexe.Femme}</div>
              <p className="text-xs text-muted-foreground">
                Patients féminines
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Onglets de filtrage */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="sexe">Par Sexe</TabsTrigger>
          </TabsList>

          <TabsContent value="sexe" className="space-y-4">
            <div className="flex gap-2">
              <Badge 
                variant={sexeFilter === "Homme" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSexeFilter("Homme")}
              >
                Hommes ({stats.bySexe.Homme})
              </Badge>
              <Badge 
                variant={sexeFilter === "Femme" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSexeFilter("Femme")}
              >
                Femmes ({stats.bySexe.Femme})
              </Badge>
              <Badge 
                variant={sexeFilter === "Autre" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleSexeFilter("Autre")}
              >
                Autre ({stats.bySexe.Autre})
              </Badge>
            </div>
          </TabsContent>

          {/* Filtres groupe sanguin et statut retirés */}
        </Tabs>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {data.items.length} patient{data.items.length > 1 ? "s" : ""} affiché
              {data.items.length > 1 ? "s" : ""}
              {applied && " (filtrés)"}
            </div>
            
            {loading && (
              <div className="text-sm text-muted-foreground">
                Chargement...
              </div>
            )}
          </div>
        </div>

        <PatientsTable patients={data.items} isLoading={loading} />
      </div>
    </div>
  )
}